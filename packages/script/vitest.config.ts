import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/*.{test,spec}.ts', '**/*.{test,spec}.tsx'],
    coverage: {
      reporter: ['text', 'lcov'],
    },
    globals: true,
  },
});
