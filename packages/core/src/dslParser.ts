// Simple DSL parser for VN scripts
// Example lines:
// Camilla: Another stormy night...
// * choice: Open door -> n3

import { GameScript, VNScene, VNNode, DialogueNode, ChoiceNode, ChoiceOption } from "./vnEngineNodeSystem";

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
          options: [{ id: `opt${nodeId}`, text, next }]
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
    if (!nodes[i].next) nodes[i].next = nodes[i + 1].id;
  }

  const scene: VNScene = {
    id: "scene1",
    nodes
  };
  return { scenes: [scene] };
}
