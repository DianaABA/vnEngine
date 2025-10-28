

import { ScriptError } from './validateGraph';

let nodeIdCounter = 0;
function stableId() {
  return `node_${++nodeIdCounter}`;
}
export const loadScriptFromDSL = parseDSL;

export function parseDSL(source: string) {
  nodeIdCounter = 0;
  const lines = source.split(/\r?\n/);
  const nodes: any[] = [];
  const ids = new Set<string>();
  let lastId = '';
  lines.forEach((raw, idx) => {
    const line = raw.trim();
    if (!line) return;
    // Speaker: text
    const speakerMatch = line.match(/^([A-Za-z_][\w]*)\s*:\s*(.*)$/);
    if (speakerMatch) {
      const id = stableId();
      if (ids.has(id)) {
        throw new ScriptError('DUPLICATE_NODE_ID', `Duplicate node ID at line ${idx + 1}`, undefined, id);
      }
      ids.add(id);
      nodes.push({ id, type: 'dialogue', speaker: speakerMatch[1], text: speakerMatch[2], line: idx + 1 });
      lastId = id;
      return;
    }
    // * choice: text -> id
    const choiceMatch = line.match(/^\*\s+choice\s*:\s*(.+?)\s*->\s*([A-Za-z_][\w]*)$/);
    if (choiceMatch) {
      const id = stableId();
      if (ids.has(id)) {
        throw new ScriptError('DUPLICATE_NODE_ID', `Duplicate node ID at line ${idx + 1}`, undefined, id);
      }
      ids.add(id);
      nodes.push({ id, type: 'choice', text: choiceMatch[1], next: choiceMatch[2], line: idx + 1 });
      lastId = id;
      return;
    }
    // @command args
    const commandMatch = line.match(/^@([A-Za-z_][\w]*)\b(.*)$/);
    if (commandMatch) {
      const id = stableId();
      if (ids.has(id)) {
        throw new ScriptError('DUPLICATE_NODE_ID', `Duplicate node ID at line ${idx + 1}`, undefined, id);
      }
      ids.add(id);
      nodes.push({ id, type: 'command', command: commandMatch[1], args: commandMatch[2].trim().split(/\s+/), line: idx + 1 });
      lastId = id;
      return;
    }
    // :label
    const labelMatch = line.match(/^:([A-Za-z_][\w]*)$/);
    if (labelMatch) {
      const id = labelMatch[1];
      if (ids.has(id)) {
        throw new ScriptError('DUPLICATE_NODE_ID', `Duplicate node ID at line ${idx + 1}`, undefined, id);
      }
      ids.add(id);
      nodes.push({ id, type: 'label', line: idx + 1 });
      lastId = id;
      return;
    }
    // -> next
    const nextMatch = line.match(/^->\s*([A-Za-z_][\w]*)$/);
    if (nextMatch) {
      if (!lastId) {
        throw new ScriptError('BAD_NEXT', `No previous node for next at line ${idx + 1}`, undefined, undefined);
      }
      nodes[nodes.length - 1].next = nextMatch[1];
      return;
    }
    // Comment
    if (line.startsWith('#')) return;
    // Malformed line
    throw new ScriptError(
      'MALFORMED_LINE',
      `Malformed line ${idx + 1}: '${line}' | token: '${line.split(/\s+/)[0]}' | hint: Check syntax`,
      undefined,
      undefined
    );
  });
  // Return normalized graph
  return {
    scenes: [{
      id: 'main',
      nodes,
      start: nodes[0]?.id || '',
    }],
  };
}
