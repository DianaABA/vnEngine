import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['**/*.{test,spec}.ts', '**/*.{test,spec}.tsx'],
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
});
