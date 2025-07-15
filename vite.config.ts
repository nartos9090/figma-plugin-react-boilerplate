import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  root: 'ui',
  base: '',
  build: {
    outDir: '../dist',
    assetsInlineLimit: Infinity,
    cssCodeSplit: false,
    rollupOptions: {
      input: 'ui/index.html',
      output: {
        entryFileNames: 'ui.js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
  plugins: [react(), viteSingleFile()],
})
