# Convenciones del proyecto

## TypeScript

- **Interfaces**: prefijo `I` — `IPodcast`, `IEpisode`, `IApplePodcastEntry`
- **Types**: prefijo `T` — `TPodcastFilter`, `TApiStatus`
- **Enums**: PascalCase — `LoadingState`
- Preferir `interface` sobre `type` para objetos; `type` para unions y aliases

## Nombrado

- **Archivos de componentes**: PascalCase — `PodcastCard.tsx`
- **Archivos de hooks**: camelCase con prefijo `use` — `useTopPodcasts.ts`
- **Archivos de utilidades**: camelCase — `formatDate.ts`
- **Archivos de tipos**: PascalCase — `Podcast.ts`, `Apple.ts`
- **Archivos de tests**: mismo nombre del archivo + `.test.ts` — `formatDate.test.ts`

## CSS / Estilos

- MUI como framework base
- Clases personalizadas con metodología **BEM**:
  - Bloque: `podcast-card`
  - Elemento: `podcast-card__image`
  - Modificador: `podcast-card--loading`

## Imports

- Usar aliases de path definidos en `vite.config.ts` y `tsconfig.json`
- Orden: externos → internos por alias → relativos
- No usar rutas relativas profundas (`../../..`)

## Componentes

- Un componente por archivo
- Props tipadas con `interface` — `IPodcastCardProps`
- Evitar `any` — usar `unknown` si es necesario

## Formato

- Sin punto y coma al final de línea
- Comillas simples para strings
- 2 espacios de indentación