import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

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
  plugins: [react(), viteSingleFile()],
})
