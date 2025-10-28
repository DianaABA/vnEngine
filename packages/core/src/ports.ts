// Abstract interfaces for cross-platform rendering
export interface AudioPort {
  play(idOrUrl: string, loop?: boolean): void;
  stop(id?: string): void;
}

export interface BgPort {
  setBackground(key: string): void;
}

export interface SpritePort {
  show(id: string, pose?: string, at?: { x?: number; y?: number; z?: number }): void;
  hide(id: string): void;
}

// Platform adapters should implement these interfaces for each platform (web, native, etc.)
