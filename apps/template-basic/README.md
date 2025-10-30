# VN Template: Basic

A minimal Vite + React app that runs the VN engine and loads an author-friendly JSON script from `public/scripts/main.json`.

What you can do now:
- Put backgrounds in `public/assets/backgrounds` and map keys in `src/App.tsx` under `assets.backgrounds`.
- Edit `public/scripts/main.json` to write your story (dialogue, choices, and simple commands).
- Run the app:

```powershell
npm run dev -w apps/template-basic
```

## Script Format (Author-Friendly)

Top-level:
- `startScene`: string – defaults to first scene id if omitted
- `scenes`: array of scenes

Scene:
- `id`: string
- `start`: optional node id (defaults to first node id)
- `nodes`: array of nodes

Node types:
- Dialogue: `{ "type": "dialogue", "id", "speaker?", "text", "next?" }`
- Choice: `{ "type": "choice", "id", "choices": [{ "text", "next", "visibleIf?", "enabledIf?" }] }`
- Command: `{ "type": "command", "id", "name", "args?", "next?" }`
- Branch: `{ "type": "branch", "id", "condition", "then?", "else?" }`
- End: `{ "type": "end", "id" }`

The engine normalizes this format automatically.

## Assets

- Background keys map to image paths under `public/assets/backgrounds`.
- If an asset is missing, the renderer will fall back to a solid background.

## Notes

This template uses local workspace packages `@vn/core` and `@vn/renderer-web`. Make sure to build them once from the repo root:

```powershell
npm run build:packages
```
