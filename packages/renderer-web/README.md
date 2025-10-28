# @vn/renderer-web

Web renderer for the Visual Novel engine. Provides a React component `VNPlayer` and helpers.

## Install

```
npm install @vn/renderer-web @vn/core react react-dom
```

## Usage

```tsx
import { VNPlayer } from '@vn/renderer-web';
import { VNEngine } from '@vn/core';

const engine = new VNEngine(script);

export default function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <VNPlayer engine={engine} assets={{ backgrounds: {}, sprites: {}, audio: {} }} />
    </div>
  );
}
```
