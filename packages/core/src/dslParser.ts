// Simple DSL parser for VN scripts
// Example lines:
// Camilla: Another stormy night...
// * choice: Open door -> n3

import { GameScript, VNScene, VNNode, DialogueNode, ChoiceNode } from "./vnEngineNodeSystem";

export function parseDSL(dsl: string): GameScript {
  const lines = dsl.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const nodes: VNNode[] = [];
  let nodeId = 1;

  for (const line of lines) {
    if (line.startsWith("* choice:")) {
      // Parse choice: * choice: Open door -> n3
      const match = line.match(/\* choice: (.+?) -> (\w+)/);
      if (match) {
        const [, text, next] = match;
        const choiceNode: ChoiceNode = {
          id: `n${nodeId++}`,
          type: "choice",
          choices: [{ text, next }]
        };
        nodes.push(choiceNode);
        continue;
      }
    }
    // Parse dialogue: Camilla: Another stormy night...
    const dialogueMatch = line.match(/^(\w+): (.+)$/);
    if (dialogueMatch) {
      const [, speaker, text] = dialogueMatch;
      const dialogueNode: DialogueNode = {
        id: `n${nodeId++}`,
        type: "dialogue",
        speaker,
        text
      };
      nodes.push(dialogueNode);
      continue;
    }
    // Parse narration: Just text
    if (line.length > 0) {
      const dialogueNode: DialogueNode = {
        id: `n${nodeId++}`,
        type: "dialogue",
        text: line
      };
      nodes.push(dialogueNode);
    }
  }

  // Link nodes sequentially
  for (let i = 0; i < nodes.length - 1; i++) {
    const node = nodes[i];
    if ((node.type === 'dialogue' || node.type === 'command') && !node.next) {
      node.next = nodes[i + 1].id;
    }
  }

  // Convert array of nodes to Record<NodeID, VNNode>
  const nodeMap: Record<string, VNNode> = {};
  for (const node of nodes) {
    nodeMap[node.id] = node;
  }

  const scene: VNScene = {
    id: "scene1",
    start: nodes[0]?.id ?? "",
    nodes: nodeMap
  };
  return { scenes: { scene1: scene }, startScene: "scene1" };
}
