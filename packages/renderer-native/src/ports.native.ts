// TODO: Implement React Native adapters for VNEngine rendering ports
// Example types for native platform
import { AudioPort, BgPort, SpritePort } from '@vn/core';

// AudioPort implementation for React Native
export class NativeAudioPort implements AudioPort {
  play(_idOrUrl: string, _loop?: boolean): void {
    // TODO: Use react-native-sound or expo-av
  }
  stop(_id?: string): void {
    // TODO: Stop playback
  }
}

// BgPort implementation for React Native
export class NativeBgPort implements BgPort {
  setBackground(_key: string): void {
    // TODO: Set background image in RN view
  }
}

// SpritePort implementation for React Native
export class NativeSpritePort implements SpritePort {
  show(_id: string, _pose?: string, _at?: { x?: number; y?: number; z?: number }): void {
    // TODO: Show sprite in RN view
  }
  hide(_id: string): void {
    // TODO: Hide sprite
  }
}
