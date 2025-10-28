import { GameScript } from "./vnEngineNodeSystem";

/**
 * Validates and loads a JSON object into a strongly typed GameScript.
 * Throws errors if 'startScene' or scene data is missing or invalid.
 */
export function loadScript(json: any): GameScript {
  if (!json || typeof json !== "object") {
    throw new Error("Script must be a valid object");
  }
  if (!json.startScene || typeof json.startScene !== "string") {
    throw new Error("Missing or invalid 'startScene' property");
  }
  if (!Array.isArray(json.scenes) || json.scenes.length === 0) {
    throw new Error("Missing or empty 'scenes' array");
  }
  for (const scene of json.scenes) {
    if (!scene.id || typeof scene.id !== "string") {
      throw new Error("Each scene must have a valid 'id'");
    }
    if (!Array.isArray(scene.nodes) || scene.nodes.length === 0) {
      throw new Error(`Scene '${scene.id}' is missing or has empty 'nodes' array`);
    }
    for (const node of scene.nodes) {
      if (!node.id || typeof node.id !== "string") {
        throw new Error(`Node in scene '${scene.id}' is missing a valid 'id'`);
      }
      if (!node.type || typeof node.type !== "string") {
        throw new Error(`Node '${node.id}' in scene '${scene.id}' is missing a valid 'type'`);
      }
    }
  }
  // Cast to GameScript
  return json as GameScript;
}
