
export class ScriptError extends Error {
  code: string;
  sceneId?: string;
  nodeId?: string;
  constructor(code: string, message: string, sceneId?: string, nodeId?: string) {
    super(message);
    this.code = code;
    this.sceneId = sceneId;
    this.nodeId = nodeId;
  }
}

export function validateGraph(graph: { scenes: any[] }) {
  const warnings: Array<{ code: string; sceneId: string; nodeId?: string; message: string }> = [];
  for (const scene of graph.scenes) {
    const nodeIds = new Set(scene.nodes.map((n: any) => n.id));
    for (const node of scene.nodes) {
      if (node.next && !nodeIds.has(node.next)) {
        throw new ScriptError('NODE_NEXT_NOT_FOUND', `Node '${node.id}' in scene '${scene.id}' has invalid next: '${node.next}'`, scene.id, node.id);
      }
      // Check then/else/trueNext/falseNext
      ['then', 'else', 'trueNext', 'falseNext'].forEach((key) => {
        if (node[key] && !nodeIds.has(node[key])) {
          throw new ScriptError('MISSING_NODE', `Node '${node.id}' in scene '${scene.id}' has invalid ${key}: '${node[key]}'`, scene.id, node.id);
        }
      });
      // For choices/options
      if (node.options) {
        node.options.forEach((opt: any) => {
          if (opt.next && !nodeIds.has(opt.next)) {
            throw new ScriptError('NODE_NEXT_NOT_FOUND', `Choice option in node '${node.id}' in scene '${scene.id}' has invalid next: '${opt.next}'`, scene.id, node.id);
          }
        });
      }
    }
    if (scene.start && !nodeIds.has(scene.start)) {
      throw new ScriptError('SCENE_START_NOT_FOUND', `Scene '${scene.id}' missing start node: '${scene.start}'`, scene.id);
    }
    // Unreachable nodes
    const reachable = new Set<string>();
    function dfs(id: string) {
      if (reachable.has(id)) return;
      reachable.add(id);
      const node = scene.nodes.find((n: any) => n.id === id);
      if (!node) return;
      if (node.next) dfs(node.next);
      if (node.options) node.options.forEach((opt: any) => dfs(opt.next));
      if (node.trueNext) dfs(node.trueNext);
      if (node.falseNext) dfs(node.falseNext);
      if (node.then) dfs(node.then);
      if (node.else) dfs(node.else);
    }
    dfs(scene.start || scene.nodes[0]?.id);
    const unreachable = Array.from(nodeIds as Set<string>).filter(id => !reachable.has(id));
    if (unreachable.length) {
      warnings.push({ code: 'UNREACHABLE', sceneId: scene.id, message: `Unreachable nodes in scene '${scene.id}': ${unreachable.join(', ')}` });
    }
    // Cycles (simple detection)
    // ...can be added here...
  }
  return { valid: true, warnings };
}
