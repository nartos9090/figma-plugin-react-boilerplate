import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import tailwind from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'ui',
  build: {
    outDir: '../dist',
    emptyOutDir: false,
    assetsDir: '',
    rollupOptions: {
      input: 'ui/index.html',
    },
  },
  plugins: [react(), viteSingleFile(), tailwind()],
  resolve: {
    alias: {
      '@ui': resolve(__dirname, 'ui'),
    },
  },
})
