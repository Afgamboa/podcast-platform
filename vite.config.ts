import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': resolve(__dirname, 'src/api'),
      '@adapters': resolve(__dirname, 'src/adapters'),
      '@models': resolve(__dirname, 'src/types'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@store': resolve(__dirname, 'src/store'),
      '@router': resolve(__dirname, 'src/router'),
      '@styles': resolve(__dirname, 'src/styles'),
    },
  },
  server: {
    proxy: {
      '/api/top-podcasts': {
        target: 'https://itunes.apple.com',
        changeOrigin: true,
        rewrite: () => '/us/rss/toppodcasts/limit=100/genre=1310/json',
      },
      '/api/lookup': {
        target: 'https://itunes.apple.com',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api/lookup', '/lookup'),
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
})