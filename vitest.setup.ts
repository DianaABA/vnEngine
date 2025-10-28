/// <reference types="vitest/globals" />
/* eslint-env jest, node */

import '@testing-library/jest-dom';

beforeAll(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.warn as any).mockRestore?.();
  (console.error as any).mockRestore?.();
});
