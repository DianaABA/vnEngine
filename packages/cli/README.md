# @vn/cli (experimental)

Minimal CLI to help authors:

Commands:
- `vn help` – show help
- `vn validate <script.json>` – validate an author-friendly script against the engine loader
- `vn init <dir>` – scaffold a bare folder with `scripts/main.json` and `assets/backgrounds`

Usage (from repo root while developing locally):

```powershell
npm run cli
# or
node packages/cli/bin/vn.js help
node packages/cli/bin/vn.js validate apps/template-basic/public/scripts/main.json
node packages/cli/bin/vn.js init MyNovel
```

Note: This CLI imports `@vn/core`. Build packages first if you change the core:

```powershell
npm run build:packages
```
