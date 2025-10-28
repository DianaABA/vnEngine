// Tiny loader for VNEngine GameScript JSON
// In this starter we keep it minimal and trust the JSON shape.

export type EngineScript = {
  startScene: string;
  scenes: Record<string, { id: string; start: string; nodes: Record<string, any> }>;
};

export function loadEngineScript(json: unknown): EngineScript {
  if (!json || typeof json !== 'object') throw new Error('Invalid script JSON');
  const s = json as EngineScript;
  if (!s.startScene || typeof s.startScene !== 'string') throw new Error('script.startScene missing');
  if (!s.scenes || typeof s.scenes !== 'object') throw new Error('script.scenes missing');
  return s;
}
