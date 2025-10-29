// Flat ESLint config for monorepo (ESLint v9)
// Minimal setup to unblock pre-commit hooks; can be expanded per package.

const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const globals = require('globals');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    files: [
      'packages/**/*.{ts,tsx,js,jsx}',
      'apps/**/*.{ts,tsx,js,jsx}',
      'src/**/*.{ts,tsx,js,jsx}',
      '*.js',
    ],
    ignores: ['**/dist/**', '**/node_modules/**'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'off',
      'no-console': 'off',
    },
  },
];
