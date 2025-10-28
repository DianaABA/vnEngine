# VNEngine Monorepo Milestone Summary & Roadmap

## 1. Core Modules Status
- ✅ Core engine (`VNEngine`, node system, snapshot/save)
- ✅ Script loader (JSON + DSL stubs, Zod schema)
- ✅ Renderer-web (React VNPlayer, GameCanvas, assets integration)
- ✅ Storage adapter (SaveAdapter, LocalStorageAdapter)
- ✅ Demo app (web example, GameCanvas, VNPlayer)

## 2. Progress Checklist
- ✅ Core engine: modular, node-based, snapshot/hydrate
- ✅ Script loader: JSON, DSL stub, schema validation
- ✅ Renderer-web: dialogue, choices, commands, assets, keyboard UX
- ✅ Storage: slot-based save/load, local adapter
- ✅ Demo: playable web scene, UI integration
- ❌ Commands system: full bg/music/flags/port abstraction
- ❌ Native portability: React Native port, AsyncStorageAdapter
- ❌ Authoring tools: split-pane editor, live preview, DSL parser
- ❌ Advanced tests: branching, integrity, error reporting

## 3. Minimal Test Scenes & CI Checks
- Test scenes:
	- Dialogue with choices, branching, commands (bg/music/flag)
	- Save before choice, load, pick alternate path
- CI checks:
	- Build: `npx tsc --build`
	- Lint: `npx eslint .`
	- Tests: `npx vitest run`

## 4. Release Roadmap
- **v0.1.0**: Playable demo, save/load, basic branching
- **v0.2.0**: Full commands system (background, music, flags, port abstraction)
- **v0.3.0**: Authoring tools (split-pane editor, DSL parser, live preview)
- **v0.4.0**: React Native port prototype, AsyncStorageAdapter

## 5. Architecture & Contribution Workflow

### Architecture Overview
- **Core**: Modular VN engine, node system, script loader, snapshot/save API
- **Renderer**: Platform-specific UI (web, native), asset and command ports
- **Storage**: Abstract save/load adapters (local, async, etc.)
- **Authoring**: Tools for script editing, validation, preview

### Contribution Workflow
1. Fork & clone repo, install dependencies (`npm install`)
2. Build all packages (`npx tsc --build`)
3. Run demo app (`npm start` or via Vite)
4. Add features/tests in modular packages
5. Submit PRs with clear checklist, tests, and documentation

# vnEngine

A scalable, modular Visual Novel engine built with React, TypeScript, and Turborepo monorepo structure.

## Features
- Modular engine core
- Scene, dialogue, choice, save/load systems
- Platform-agnostic logic
- Demo web app

## Getting Started
See the monorepo structure and packages for usage examples.
