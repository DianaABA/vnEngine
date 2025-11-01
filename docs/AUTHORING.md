# Authoring Guide (No-Code Friendly)

Goal: Anyone (writers, educators, therapists, coaches, marketers) can turn scripts into a playable Visual Novel for web or mobile without coding.

## What you need
- Text script (you can write it in our friendly DSL or JSON)
- A few assets (background images, character sprites, music/SFX) — optional
- This repository cloned, or a starter app (see Publishing)

## The simple workflow
1. Write your story
   - Use the DSL (recommended) or JSON.
   - Focus on dialogue, choices, and simple commands (change background, show a character, play music).
2. Validate the script
   - Use the CLI (coming soon) or author app prototype (apps/author) to check for typos and missing assets.
3. Preview the story
   - Run the clean preview app: `npm run dev:zero` and replace the sample script with yours.
4. Add assets (optional)
   - Put backgrounds and sprites in your app’s assets folder. Reference them by key in your script.
5. Export and publish
   - Web: build a static site and host it anywhere.
   - Mobile: use React Native/Expo to package as a phone app.

## Accessibility and reading options (built-in)
- Text size: Readers can scale text globally. Exposed as `preferences.textScale` and applied by the web renderer via a CSS variable.
- High contrast: Toggle stronger contrast and outlines for better readability.
- Dyslexic-friendly font: Toggle a dyslexic typeface if your app includes one.
- Speaker focus: Dim non-speaking portraits and vision layers to draw attention to the current speaker.

How to enable in a web app:
- Use the renderer-web hook `useAccessibility` to apply classes and the font scale CSS variable to `document.documentElement`.
- The CSS utilities for speaker focus are included; wrap your portrait area in `.speaker-focus` and mark the active portrait with `.speaking`.

Minimal wiring example (React):
```tsx
import { useAccessibility } from '@vn/renderer-web'

export function App({ engine }) {
  const prefs = engine.getPreferences() // includes textScale, highContrast, dyslexicFont, speakerFocus
  useAccessibility(prefs)
  return /* your VNPlayer and UI */
}
```

CSS expectations (renderer-web ships defaults):
- `html.high-contrast` and `html.dyslexic-font` classes are toggled.
- `--font-size-scale` is set on `:root` (1.0 = 100%).
- Speaker focus utilities dim `.portrait:not(.speaking)` and blend `.vision-layer` when `.speaker-focus` is present.

## Writing in the DSL (friendly)
See `docs/DSL.md` for the full syntax. A quick example:

```
@intro
BG classroom day [transition: crossfade 600ms]
Ava: Welcome to ChakraHearts!
Kai: Shall we begin?

? What do you do?
- Yes! -> end
- Maybe later -> end

@end
[end]
```

- `@intro` defines a scene label.
- `BG classroom day` changes the background (with a crossfade).
- `Ava:` and `Kai:` are dialogue lines.
- `?` starts a choice; `-` lists options.
- `@end` + `[end]` finishes the story.

## JSON alternative
You can also write JSON directly (advanced users, or exported from tools). The renderer reads a `GameScript` with scenes, nodes, and a start scene.

```json
{
  "scenes": [
    {
      "id": "intro",
      "nodes": {
        "start": { "id": "start", "kind": "dialogue", "speaker": "Ava", "text": "Welcome!", "next": "end" },
        "end":   { "id": "end",   "kind": "end" }
      },
      "start": "start"
    }
  ],
  "startScene": "intro"
}
```

## Tips for great stories
- Keep choices meaningful and few at a time.
- Use background changes and music to set tone.
- Keep each line short for readability on phones.
- Save often before big choices if playtesting.

## Save/Load and quick slots
- Autosave: The engine can keep an autosave with the latest progress.
- Quick Saves: Three dedicated quick slots (1–3) are available for fast save/load during playtests and in apps that expose them.
- Labels: Saves include a scene title with line numbers for clarity.
- Thumbnails: Web apps can attach a small screenshot thumbnail when saving.

In code, the core exposes `quickSave(slot: 1|2|3)` and `quickLoad(slot: 1|2|3)`. Apps may also provide manual save slots in addition to quick slots.

## Coming soon (0.2–0.3)
- One-click Validate and Build (CLI and Author App)
- Timed choices, locked choices, variables/conditions
- Background and sprite transitions, audio fades and crossfades
- Export to Web (PWA) and Mobile (Expo) from the Author App
