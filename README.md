# Podcast Platform

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

## Requisitos

- Node.js >= 18
- npm >= 9

## Instalación

```bash
npm install