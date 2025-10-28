/// <reference types="vitest/globals" />
/* eslint-env node */

// Use the Vitest-compatible matcher extensions
import '@testing-library/jest-dom/vitest';

beforeAll(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.warn as any).mockRestore?.();
  (console.error as any).mockRestore?.();
});
