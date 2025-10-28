import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
  '@vn/core': '../../packages/core/dist/index.js',
  '@vn/script': '../../packages/script/dist/index.js',
  '@vn/storage': '../../packages/storage/dist/index.js',
  '@vn/renderer-web': '../../packages/renderer-web/dist/index.js'
    }
  }
});
