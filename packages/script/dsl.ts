import { GameScript } from '@vn/core/src/vnEngineNodeSystem';

// Very basic DSL to JSON compiler for VN scripts
export function compileDSL(dsl: string): GameScript {
  // TODO: Implement robust parsing and error handling
  // For now, use the simple parser from core
  // You can replace this with a more advanced parser as needed
  // Example: parseDSL(dsl)
  return { scenes: [] };
}
