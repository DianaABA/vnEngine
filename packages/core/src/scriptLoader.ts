import { GameScript, VNNode } from "./vnEngineNodeSystem";

/**
 * Load/normalize a script JSON into the engine's internal GameScript shape.
 *
 * Supported input top-level shapes:
 *  A) Authoring-friendly (array form):
 *     {
 *       startScene: string,                      // optional; defaults to first scene id
 *       scenes: [
 *         {
 *           id: string,
 *           start?: string,                      // optional; defaults to first node id
 *           nodes: Array<
 *             | { type: 'dialogue', id, speaker?, text, next? }
 *             | { type: 'choice',   id, options?: { id?: string, text: string, next: string }[], choices?: { text: string, next: string, condition?: string, visibleIf?: string, enabledIf?: string }[] }
 *             | { type: 'command',  id, command?: string, name?: string, args?: Record<string, unknown>, next?: string }
 *             | { type: 'branch',   id, condition: string, trueNext?: string, falseNext?: string, then?: string, else?: string }
 *             | { type: 'end',      id }
 *           >
 *         }
 *       ]
 *     }
 *
 *  B) Already-normalized engine shape (record form):
 *     { startScene: string, scenes: Record<id, { id, start, nodes: Record<id, VNNode> }> }
 */
export function loadScript(input: any): GameScript {
  if (!input || typeof input !== "object") {
    throw new Error("Script must be a valid object");
  }

  // If it already looks like the engine shape (record of scenes), return as-is after basic checks
  if (
    typeof (input as any).scenes === "object" && !Array.isArray((input as any).scenes)
  ) {
    const startScene = (input as any).startScene;
    if (!startScene || typeof startScene !== "string") {
      throw new Error("Missing or invalid 'startScene' property");
    }
    return input as GameScript;
  }

  // Authoring array form → normalize
  const json = input as any;
  if (!Array.isArray(json.scenes) || json.scenes.length === 0) {
    throw new Error("Missing or empty 'scenes' array");
  }

  const scenesRecord: Record<string, { id: string; start: string; nodes: Record<string, VNNode> }> = Object.create(null);

  for (const scene of json.scenes) {
    if (!scene || typeof scene !== "object") {
      throw new Error("Scene must be an object");
    }
    const sceneId = scene.id;
    if (!sceneId || typeof sceneId !== "string") {
      throw new Error("Each scene must have a valid 'id'");
    }
    if (!Array.isArray(scene.nodes) || scene.nodes.length === 0) {
      throw new Error(`Scene '${sceneId}' is missing or has empty 'nodes' array`);
    }

    const nodesRecord: Record<string, VNNode> = Object.create(null);
    for (const node of scene.nodes) {
      if (!node || typeof node !== "object") {
        throw new Error(`Node in scene '${sceneId}' must be an object`);
      }
      const id = node.id;
      if (!id || typeof id !== "string") {
        throw new Error(`Node in scene '${sceneId}' is missing a valid 'id'`);
      }
      const type = node.type;
      if (!type || typeof type !== "string") {
        throw new Error(`Node '${id}' in scene '${sceneId}' is missing a valid 'type'`);
      }

      if (type === "dialogue") {
        nodesRecord[id] = {
          type: "dialogue",
          id,
          speaker: node.speaker,
          text: String(node.text ?? ""),
          next: node.next,
        };
      } else if (type === "choice") {
        const options = Array.isArray(node.options) ? node.options : Array.isArray(node.choices) ? node.choices : [];
        nodesRecord[id] = {
          type: "choice",
          id,
          choices: options.map((opt: any) => ({
            text: String(opt.text ?? ""),
            next: String(opt.next ?? ""),
            condition: opt.condition,
            visibleIf: opt.visibleIf ?? opt.condition,
            enabledIf: opt.enabledIf,
          })),
        } as any;
      } else if (type === "command") {
        // Accept both 'command' and 'name' for the command identifier
        const name = node.name ?? node.command;
        if (!name || typeof name !== "string") {
          throw new Error(`Command node '${id}' in scene '${sceneId}' is missing 'name'/'command'`);
        }
        nodesRecord[id] = {
          type: "command",
          id,
          name,
          args: node.args,
          next: node.next,
        } as any;
      } else if (type === "branch") {
        const condition = String(node.condition ?? "");
        nodesRecord[id] = {
          type: "branch",
          id,
          condition,
          then: node.then ?? node.trueNext,
          else: node.else ?? node.falseNext,
        } as any;
      } else if (type === "end") {
        nodesRecord[id] = { type: "end", id } as any;
      } else {
        throw new Error(`Unknown node type '${type}' in scene '${sceneId}'`);
      }
    }

    const start: string = scene.start && typeof scene.start === "string"
      ? scene.start
      : scene.nodes[0]?.id;
    if (!start || !nodesRecord[start]) {
      throw new Error(`Scene '${sceneId}' is missing a valid 'start' node`);
    }
    scenesRecord[sceneId] = { id: sceneId, start, nodes: nodesRecord };
  }

  const startScene: string = typeof json.startScene === "string" ? json.startScene : json.scenes[0].id;
  if (!startScene || !scenesRecord[startScene]) {
    throw new Error("Missing or invalid 'startScene' property");
  }

  return { scenes: scenesRecord, startScene } as GameScript;
}
