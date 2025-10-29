# Publishing (Web & Mobile)

Your story can be shipped as a website (PWA) or as a native phone app.

## Web (Vite static build / PWA)

Use the clean app `apps/chakrahearts-zero` as a starting point.

1) Build the engine packages (once):
```powershell
cd path\to\vnEngine
npm install
npm run build:packages
```

2) Wire your script into the zero app
- Replace the sample script in `apps/chakrahearts-zero/src/test/App.tsx` with your own (JSON or compiled DSL).

3) Build the site
```powershell
npm run -w chakrahearts-zero build
```
- Deploy the `apps/chakrahearts-zero/dist` folder to any static host (GitHub Pages, Netlify, Vercel, S3, Firebase Hosting).
- Optional PWA: add a web app manifest and a service worker (workbox) for offline support.

## Mobile (React Native / Expo)

There is a prototype `renderer-native` and `apps/native-demo`. For a friendly path, use Expo:

1) Create a new Expo app
```powershell
npx create-expo-app my-vn --template
cd my-vn
```

2) Add local engine packages
```powershell
npm install "@vn/core@file:..\\vnEngine\\packages\\core" "@vn/renderer-native@file:..\\vnEngine\\packages\\renderer-native"
```

3) Import and render your script
```tsx
import { VNPlayerNative } from '@vn/renderer-native'
import type { GameScript } from '@vn/core'

export default function App() {
  const script: GameScript = /* your JSON */
  return <VNPlayerNative script={script} />
}
```

4) Run on device
```powershell
npx expo start
```
Scan the QR code to open on iOS/Android via Expo Go.

5) Build binaries
```powershell
npx expo prebuild
npx expo run:android
npx expo run:ios
```

## Packaging tips
- Keep image assets under 2048px for mobile performance; use WebP/AVIF when possible
- Use looped OGG/MP3 for music; short WAV/OGG for SFX
- Test on both light and dark environments; include a safe area on mobile UIs

## Coming soon
- One-click Export in the Author App (build web and mobile packages from a single project)
- Asset manifest tool (copy/optimize images, generate sprite atlases)
