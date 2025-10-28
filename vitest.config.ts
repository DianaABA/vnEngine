import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: [
      'packages/core/**/*.{spec,test}.{ts,js}',
      'packages/renderer-web/**/*.{spec,test}.{ts,js}',
      'packages/web/**/*.{spec,test}.{ts,js}',
      'apps/author/**/*.{spec,test}.{ts,js}'
    ],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'text'],
      include: ['packages/core/src/**/*.ts'],
      exclude: ['**/*.d.ts', 'packages/core/tests/utils.ts'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80
      },
    }
  }
});
