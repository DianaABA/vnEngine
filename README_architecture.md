## Architecture Overview: Modular Visual Novel Engine

This project is a scalable, modular visual novel engine built with React and TypeScript, designed for extensibility and cross-platform compatibility. The architecture separates core runtime logic from platform-specific rendering, enabling future ports to native platforms (e.g., React Native, desktop, mobile).

### Key Components

#### 1. Core Runtime (`@vn/core`)
- **Node-Based System:** Visual novel scripts are parsed into a graph of nodes (`DialogueNode`, `ChoiceNode`, `CommandNode`, `BranchNode`, `EndNode`). Each node represents a unit of story logic, dialogue, choice, or command.
- **VNEngine Class:** Central engine class manages script loading, node traversal, branching, and state. It exposes methods for advancing the story, handling choices, and evaluating conditions.
- **Script Loader & DSL Parser:** Utilities for validating JSON scripts and parsing custom DSL formats into the node graph structure.
- **Save/Load System:** Abstracted save adapters (e.g., `LocalStorageAdapter`) allow for flexible save slot management across platforms.
- **Cross-Platform Ports:** Abstract interfaces (`AudioPort`, `BgPort`, `SpritePort`) define rendering and media operations, decoupling engine logic from UI implementation.

#### 2. Web Frontend (`@vn/web`)
- **React UI Components:** Components like `VNPlayer` and `GameCanvas` render dialogue, choices, backgrounds, and sprites. They interact with the core engine via props and callbacks.
- **State Management:** React hooks manage engine state, user input, and save/load actions, ensuring a responsive and interactive experience.
- **Asset Integration:** JSON scripts and media assets are loaded and mapped to engine nodes and UI elements.

#### 3. Extensibility & Portability
- **Platform-Agnostic Core:** All game logic, branching, and state management reside in the core package, with no direct dependencies on React or browser APIs.
- **Port Interfaces:** By implementing the abstract port interfaces, the engine can be adapted to React Native, Electron, or other platforms with minimal changes.
- **Modular Design:** New node types, adapters, and UI features can be added without disrupting the core runtime.

### Architectural Benefits
- **Separation of Concerns:** Clean division between story logic, rendering, and platform-specific code.
- **Scalability:** Supports large, branching stories and multiple episodes via modular node graphs and script files.
- **Maintainability:** Strong TypeScript typing, clear interfaces, and modular file structure make the codebase easy to extend and refactor.
- **Future-Proofing:** Ready for native ports and advanced features (e.g., audio, animation, save/load, branching logic).

### Example Flow
1. **Script Loading:** JSON or DSL script is parsed and validated into a node graph.
2. **Engine Initialization:** `VNEngine` loads the script and starts at the initial scene/node.
3. **UI Rendering:** React components query the engine for the current node and render dialogue, choices, or commands.
4. **User Interaction:** Choices and actions are sent to the engine, which updates state and advances the story.
5. **Save/Load:** State can be saved and restored via adapters, supporting multiple save slots and platforms.

---
This architecture enables rapid development of rich, interactive visual novels with a clear path to cross-platform deployment and feature expansion.
