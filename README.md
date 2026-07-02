# Podcast Platform

![CI](https://github.com/Afgamboa/podcast-platform/actions/workflows/ci.yml/badge.svg)

Mini plataforma web para descubrir, consultar y reproducir episodios de podcasts musicales usando la API pública de Apple Podcasts.

## Stack

- **React 19** + **TypeScript** (strict)
- **Vite** — bundler y dev server
- **React Router v7** — routing del lado del cliente
- **TanStack Query v5** — caché, fetching y sincronización de datos
- **Zustand** — estado global del cliente (filtro de búsqueda)
- **MUI (Material UI)** — componentes y estilos, con BEM en clases personalizadas
- **DOMPurify** — sanitización de HTML en descripciones de episodios
- **Vitest** + **React Testing Library** — testing
- **i18next** — internacionalización (EN / ES)

## Requisitos

- Node.js >= 18
- npm >= 9

## Instalación

```bash
npm install
```

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Arranca el servidor de desarrollo en `localhost:5173` con hot reload |
| `npm run build` | Verifica tipos con TypeScript y genera el bundle de producción en `dist/` |
| `npm run preview` | Sirve el build de producción localmente para revisión |
| `npm run typecheck` | Verifica que todos los tipos TypeScript del proyecto sean correctos sin generar archivos |
| `npm run lint` | Analiza el código con ESLint buscando errores y malas prácticas |
| `npm run test` | Ejecuta los tests en modo watch con Vitest |
| `npm run test:coverage` | Ejecuta los tests una vez y genera reporte de cobertura en `coverage/` |

## Git hooks (Husky)

Los hooks se instalan automáticamente al correr `npm install`.

- **pre-commit** — corre `typecheck` y `lint` antes de cada commit
- **pre-push** — corre los tests antes de cada push

## Variables de entorno

Esta app no requiere variables de entorno para desarrollo — el proxy CORS está configurado directamente en `vite.config.ts`. En producción, la URL de la API dependería de la estrategia de hosting elegida (Vercel Functions, backend propio, etc.).

## Arquitectura

Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para decisiones técnicas y trade-offs.

## Limitaciones conocidas

- El proxy CORS solo funciona en desarrollo. En producción se requiere una solución de servidor (Vercel function, etc.)
- La API de Apple limita los episodios a 20 por podcast
- La duración de algunos episodios no está disponible en la API y se muestra como N/A

## Posibles mejoras futuras

- Persistencia del caché en localStorage con `@tanstack/query-persist-client` para que los datos sobrevivan recargas de página
- Proxy de producción con Vercel Serverless Functions para resolver CORS sin depender del proxy de Vite
- Virtualización de listas largas de episodios con `react-virtual` para mejorar performance con muchos items
- Mensajes de error diferenciados por código HTTP (404, 500, sin conexión)
- Lighthouse report integrado en CI
- Storybook para documentación visual de componentes