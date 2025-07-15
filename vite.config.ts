import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  root: 'ui',
  build: {
    outDir: '../dist', // final ui.html goes in ./dist
    emptyOutDir: false,
    assetsDir: '', // required for single HTML output
    rollupOptions: {
      input: 'ui/index.html', // entry HTML
    },
  },
  plugins: [react(), viteSingleFile()],
})
