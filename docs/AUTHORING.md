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

## Coming soon (0.2–0.3)
- One-click Validate and Build (CLI and Author App)
- Timed choices, locked choices, variables/conditions
- Background and sprite transitions, audio fades and crossfades
- Export to Web (PWA) and Mobile (Expo) from the Author App
