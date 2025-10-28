# Visual Novel Engine Monorepo

A modular, scalable TypeScript engine for visual novels. Includes core logic, script parsing, storage adapters, and platform-agnostic renderers (web, native, etc).

## Install

Clone the repo and install dependencies:

```sh
npm install
```

## Usage: Imports

Import from workspace packages:

```ts
import { VNEngine } from '@vn/core';
import { loadScriptFromJSON } from '@vn/script';
import { LocalStorageAdapter } from '@vn/storage';
import { VNPlayer } from '@vn/renderer-web';
```

## Quick Example (Web)

```tsx
import React from 'react';
import { VNEngine } from '@vn/core';
import { VNPlayer } from '@vn/renderer-web';

const engine = new VNEngine();

export default function App() {
  return <VNPlayer engine={engine} assets={{}} />;
}
```

## Portability

- Core engine and script logic are platform-agnostic (no DOM imports).
- Renderer packages implement platform-specific UI (web, native, etc).
- Storage adapters can be extended for browser, native, or custom backends.

---
MIT License

## Quickstart (repo layout and publishing)

Recommended structure:

- packages/
  - core: platform-agnostic engine logic (exports runtime + types)
  - renderer-web: React web bindings/components (peerDeps: react, react-dom)
  - renderer-native: React Native adapter (peerDeps: react-native)
  - storage: browser storage adapter(s)
  - storage-native: native storage adapter(s)
- examples/: optional example apps
- .github/workflows/: CI and release workflows

Build outputs per package: ESM + CJS + types (.d.ts). Consumers choose the variant.

### CI & releases

- CI (`.github/workflows/ci.yml`): runs lint, typecheck, builds packages, and tests on PRs/commits.
- Changesets release (`.github/workflows/release.yml` on master): versions and publishes to npmjs.org using Changesets when you add an NPM_TOKEN.
- GitHub Packages release (`.github/workflows/gh-packages-release.yml` on tags `v*.*.*`):
  - Builds packages and uploads npm pack artifacts to a GitHub Release.
  - Optionally publishes to GitHub Packages using the built-in GITHUB_TOKEN if your package scope matches the repo owner (e.g., `@DianaABA/pkg`).

Note: Current package scope is `@vn/*`. To publish to GitHub Packages, rename packages to `@<owner>/*` (e.g., `@DianaABA/core`) or use the GitHub Release artifacts instead.

### Checklist

- [ ] Lint/typecheck/build pass (`npm run lint`, `npm run typecheck`, `npm run build:packages`).
- [ ] Fill in package READMEs and public exports.
- [ ] Add `NPM_TOKEN` secret to publish to npmjs via Changesets workflow (optional).
- [ ] Push a tag like `v0.1.0` to trigger GitHub Packages release workflow (artifacts + optional GH Packages publish).
- [ ] Open PR from `release/packaging-ci` to `master` and merge when CI is green.

