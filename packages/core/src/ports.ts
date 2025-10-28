// Abstract interfaces for cross-platform rendering
export interface AudioPort {
  playMusic(track: string): void;
  stopMusic(): void;
  playSound(effect: string): void;
}

export interface BgPort {
  setBackground(image: string): void;
  clearBackground(): void;
}

export interface SpritePort {
  showSprite(id: string, image: string, position?: string): void;
  hideSprite(id: string): void;
  moveSprite(id: string, position: string): void;
}

// Example: VNEngine can accept these ports for platform-specific rendering
export interface VNEnginePorts {
  audio: AudioPort;
  background: BgPort;
  sprite: SpritePort;
}
