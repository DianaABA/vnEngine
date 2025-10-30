import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths for deployment
  resolve: {
    alias: {
      '@vn/core': path.resolve(__dirname, '../vnEngine/packages/core'),
      '@vn/renderer-web': path.resolve(__dirname, '../vnEngine/packages/renderer-web')
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true // Allow access from network
  },
  preview: {
    port: 3001,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable for production
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          engine: ['@vn/core', '@vn/renderer-web']
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return 'assets/images/[name].[hash][extname]'
          }
          if (/mp3|wav|ogg|aac|m4a/i.test(ext)) {
            return 'assets/audio/[name].[hash][extname]'  
          }
          return 'assets/[name].[hash][extname]'
        }
      }
    },
    target: 'es2015', // Better browser compatibility
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
