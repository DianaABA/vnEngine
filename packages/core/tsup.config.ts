import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  // We generate declaration files via "npm run types" using tsc.
  // Disable tsup's DTS generation to avoid duplicate/tsconfig scope issues.
  dts: false,
  outDir: 'dist',
  clean: true,
  splitting: false,
  sourcemap: true,
  minify: false,
});