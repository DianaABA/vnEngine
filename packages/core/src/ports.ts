// Abstract interfaces for cross-platform rendering
export type Transition = {
  type: 'fade' | 'crossfade' | 'slide' | 'move' | 'scale';
  durationMs: number;
  direction?: 'left' | 'right' | 'up' | 'down';
};

export interface AudioPort {
  play(idOrUrl: string, loop?: boolean, volume?: number, fadeInMs?: number): void;
  stop(id?: string, fadeOutMs?: number): void;
}

export interface BgPort {
  setBackground(key: string, transition?: Transition): void;
}

export interface SpritePort {
  show(
    id: string,
    pose?: string,
    at?: { x?: number; y?: number; z?: number; anchor?: 'center' | 'bottom' },
    transition?: Transition
  ): void;
  hide(id: string, transition?: Transition): void;
}

// Platform adapters should implement these interfaces for each platform (web, native, etc.)
