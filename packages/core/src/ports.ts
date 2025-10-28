// Copilot prompt — ports (types only)
// Export AudioPort, BgPort, SpritePort interfaces. Do not import them in engine; renderer packages implement them.
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
