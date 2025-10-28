import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { validateGraph } from './validateGraph';

describe('validateGraph property-based', () => {
  it('never throws for well-formed graphs', () => {
    fc.assert(
      fc.property(
        fc.array(fc.record({
          id: fc.string({ minLength: 1, maxLength: 4 }),
          next: fc.option(fc.string({ minLength: 1, maxLength: 4 }), { nil: undefined }),
        }), { minLength: 1, maxLength: 10 }),
        (nodes: Array<{ id: string; next?: string }>) => {
          const nodeIds = nodes.map((n: { id: string; next?: string }) => n.id);
          // Only allow nexts that exist or undefined
          nodes.forEach((n: { id: string; next?: string }) => {
            if (n.next && !nodeIds.includes(n.next)) n.next = undefined;
          });
          const graph = { scenes: [{ id: 's', nodes, start: nodeIds[0] }] };
          expect(() => validateGraph(graph)).not.toThrow();
        }
      )
    );
  });
});
