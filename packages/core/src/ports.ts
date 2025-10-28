// Copilot prompt — ports (types only)
// Export AudioPort, BgPort, SpritePort interfaces. Do not import them in engine; renderer packages implement them.
export interface AudioPort {
  play(_idOrUrl: string, _loop?: boolean): void;
  stop(_id?: string): void;
}

export interface BgPort {
  setBackground(_key: string): void;
}

export interface SpritePort {
  show(_id: string, _pose?: string, _at?: { x?: number; y?: number; z?: number }): void;
  hide(_id: string): void;
}
