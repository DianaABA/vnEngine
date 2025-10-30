import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3102
  },
  resolve: {
    alias: {
      '@vn/core': path.resolve(__dirname, '../../packages/core'),
      '@vn/renderer-web': path.resolve(__dirname, '../../packages/renderer-web')
    }
  }
})
