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
