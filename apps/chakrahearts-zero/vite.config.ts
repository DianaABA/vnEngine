import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@vn/core': path.resolve(__dirname, '../../packages/core'),
      '@vn/renderer-web': path.resolve(__dirname, '../../packages/renderer-web'),
    },
  },
  server: {
    port: 3100,
    open: true,
  },
});
