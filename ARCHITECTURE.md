# Architecture Decisions

## Stack

### React + TypeScript (strict)

Se define `strict: true` lo cual fuerza el modelado de datos y elimina errores durante la compilacion.

### Vite
Es la opcion mas limpia y sencilla para el manejo de una SPA como esta la cual no necesita SSR o derivados.

### React Router v7
URLs limpias sin hash, navegación del lado del cliente, soporte de recarga directa en cualquier ruta mediante la configuración del servidor. Lazy loading de vistas integrado con `React.lazy`.

### TanStack Query v5
Elegido sobre SWR por mayor control sobre el ciclo de vida del caché, soporte de persistencia oficial y API más expresiva. Resuelve de forma declarativa:
- TTL de 24h con `staleTime: 24 * 60 * 60 * 1000`
- Deduplicación automática de requests por `queryKey`
- Estados `loading`, `error`, `stale` y `success` sin boilerplate
- Retry automático en errores de red

### Zustand
Usado exclusivamente para el estado del filtro de búsqueda en Home. Elegido sobre Redux Toolkit (over-engineering para un solo valor) y Context API (re-renders en todos los consumers al cambiar cualquier valor). Zustand re-renderiza solo los componentes que leen el valor que cambió.

### MUI (Material UI)
Framework de componentes con sistema de diseño maduro y accesible. Clases personalizadas con BEM para estilos que van más allá del sistema de MUI.

### DOMPurify
Sanitización de HTML en descripciones de episodios antes de usar `dangerouslySetInnerHTML`. Previene XSS eliminando scripts, event handlers y atributos peligrosos del HTML recibido de la API. Ver sección de Seguridad.

---

## Arquitectura de capas

```
API de Apple
     
src/api/           fetch HTTP puro, lanza errores de red/status
     
src/adapters/      transforma JSON externo → tipos de dominio propios
     
src/hooks/         TanStack Query: caché, TTL, loading/error
     
src/pages/         orquesta hooks y compone componentes
     
src/components/    UI pura, sin conocimiento de APIs ni hooks de datos
```

**Regla fundamental**: ningún componente importa nada de `src/api/` directamente. Solo consumen hooks. Si al API de apple cambia, el cambio se separa en `api/` y `adapters/`.

---

## Caché y revalidación

- **Estrategia**: TanStack Query en memoria con `staleTime` de 24 horas.
- **Persistencia**: los datos viven en memoria mientras la app está abierta. Al recargar la página, se revalidan automáticamente.
- **TTL**: `staleTime: 86_400_000` (24h en milisegundos). Pasado este tiempo, el siguiente acceso dispara una revalidación en background.
- **Deduplicación**: dos componentes que usan el mismo `queryKey` comparten el mismo request — TanStack Query no hace fetch dos veces.
- **Trade-off**: sin persistencia a localStorage/IndexedDB, recargar la página hace un nuevo fetch. Aceptable para esta app; se documentaría como mejora futura con `@tanstack/query-persist-client`.

### ¿Por qué no otras opciones?

Se evaluaron `localStorage`, `IndexedDB`, `SWR` y una solución propia. `localStorage` requiere serialización manual y no tiene TTL nativo. `IndexedDB` es más potente pero overkill para este volumen de datos. `SWR` tiene menos control sobre el caché y no tiene soporte oficial de persistencia. Una solución propia sería reinventar lo que TanStack Query ya resuelve. Se eligió TanStack Query en memoria porque los datos de Apple no son críticos — perderlos al recargar no afecta la UX de forma grave — y el volumen (100 podcasts + ~20 episodios) cabe perfectamente en memoria. Agregar persistencia con `@tanstack/query-persist-client` queda documentado como mejora futura.

---

## CORS

La API de Apple Podcasts no permite requests desde el browser por CORS.

**Desarrollo**: proxy en Vite (`vite.config.ts`). El browser habla con `localhost`, Vite reenvía la petición a Apple server-to-server sin restricciones CORS.

```
Browser → localhost:5173/api/top-podcasts → Vite Proxy → itunes.apple.com
```

**Producción**: pendiente de implementar. La opción recomendada es una Vercel Serverless Function — hace el fetch a Apple desde el servidor, sin restricciones de CORS, sin dependencias de terceros y gratis en el tier de Vercel. Se dejó pendiente para priorizar la funcionalidad core.

---

## Seguridad (XSS)

Las descripciones de episodios de Apple Podcasts contienen HTML arbitrario. Usar `dangerouslySetInnerHTML` sin sanitizar es una vulnerabilidad XSS crítica.

**Solución**: wrapper `sanitizeHtml` en `src/utils/sanitizeHtml.ts` usando DOMPurify:

```ts
import DOMPurify from 'dompurify'
export const sanitizeHtml = (dirty: string): string => DOMPurify.sanitize(dirty)
```

DOMPurify elimina `<script>`, event handlers (`onclick`, `onerror`), atributos `javascript:` y otras cargas XSS conocidas, manteniendo el HTML legítimo (negritas, enlaces, párrafos).

Esta función tiene tests unitarios explícitos.

---

## Configuración del bundler (Vite)

### Aliases de rutas
Definidos tanto en `vite.config.ts` (para que Vite los resuelva en runtime) como en `tsconfig.json` (para que TypeScript los entienda en tiempo de desarrollo). Ambos deben estar sincronizados.

| Alias | Ruta |
|---|---|
| `@api` | `src/api` |
| `@adapters` | `src/adapters` |
| `@models` | `src/types` |
| `@hooks` | `src/hooks` |
| `@components` | `src/components` |
| `@pages` | `src/pages` |
| `@utils` | `src/utils` |
| `@store` | `src/store` |
| `@router` | `src/router` |

### Code splitting
Cada vista se importa con `React.lazy()` en el router. Vite genera un chunk separado por ruta, reduciendo el bundle inicial.

### Tree shaking
Imports selectivos de MUI (`import Button from '@mui/material/Button'` en lugar de `import { Button } from '@mui/material'`) para eliminar componentes no usados del bundle final.

### Variables de entorno
Gestionadas con `.env`, `.env.development` y `.env.production`. Solo variables con prefijo `VITE_` son expuestas al bundle del cliente. Claves privadas nunca deben usar este prefijo.

---

## Trade-offs

### Caché en memoria sin persistencia
Se decidió usar TanStack Query con caché en memoria. Ganamos simplicidad y cero configuración extra. Perdemos que al recargar la página los datos se van y toca hacer fetch de nuevo. Para esta app es aceptable — si se necesitara persistencia real, usaríamos `@tanstack/query-persist-client`. Queda documentado como mejora futura.

### Proxy CORS solo en desarrollo
El proxy de Vite resuelve CORS en desarrollo sin necesidad de infraestructura adicional. El trade-off es que en producción esta solución no sirve y se necesita una Vercel Function u otro proxy server-side. Decisión consciente para avanzar rápido en dev, con la solución de prod documentada.

### `httpClient` propio en lugar de Axios
Se optó por un wrapper sobre `fetch` nativo para no añadir dependencias innecesarias. Perdemos interceptors, cancelación de requests y timeout automático que Axios daría gratis. Defendible porque la app hace pocos requests sin necesidades complejas — y si eso cambia, migrar el `httpClient` a Axios es un cambio de un solo archivo.

### Adapter dentro del `queryFn` del hook
El hook llama directamente al adapter para transformar los datos. Los componentes siempre reciben tipos limpios sin ver el JSON de Apple. El trade-off es que el hook conoce tanto la API como el adapter. Podría separarse más, pero para este tamaño de app añadir otra capa sería over-engineering sin beneficio real.

### Zustand para el filtro en lugar de `useState`
Se usó Zustand para el texto de búsqueda en Home en lugar de `useState` local. Ganamos que el filtro persiste si el usuario navega a un podcast y vuelve. El trade-off es una dependencia extra para algo que técnicamente podría ser estado local. Se justifica por UX — el usuario no espera que el filtro se borre al navegar hacia atrás.

---

## Decisiones pendientes / Mejoras futuras

- Diferenciar mensajes de error por código HTTP: el `httpClient` ya captura y lanza cualquier error no 2xx (400, 404, 500, etc.) y TanStack Query lo expone via `isError`. Sin embargo, el mensaje que ve el usuario es genérico. La mejora sería mostrar mensajes distintos según el código.
- Persistencia de caché en localStorage con `@tanstack/query-persist-client`
- Proxy de producción con Vercel Serverless Function para resolver CORS sin el proxy de Vite
- Virtualización de listas largas de episodios con `react-virtual`
- Mensajes de error diferenciados por código HTTP (404, 500, sin red)


## Test unitarios

- se crearon los test unitarios a nivel de cada archivo correspondiente debido al tiempo y al numero de archivos dentro de esta SPA, se puede tener como mejora furuta mover dichos test a una carpeta /test a nivel de src y allí replicar la estructura de carpetas de /src, de esa forma si el proyecto crece podemos tener mas orden en los test de cada archivo