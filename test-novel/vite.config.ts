import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@vn/core': path.resolve(__dirname, '../vnEngine/packages/core'),
      '@vn/renderer-web': path.resolve(__dirname, '../vnEngine/packages/renderer-web')
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          engine: ['@vn/core', '@vn/renderer-web']
        }
      }
    }
  }
})
