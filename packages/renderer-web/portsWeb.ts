import type { VNAssets } from './assets';
import type { AudioPort, BgPort, SpritePort } from '@vn/core';

export function createBgPort(assets: VNAssets): BgPort {
  return {
    setBackground(key: string) {
      const url = assets.backgrounds[key];
      // TODO: set background image in renderer
      console.log('Set background:', key, url);
    }
  };
}

export function createSpritePort(assets: VNAssets): SpritePort {
  return {
    show(id: string, pose?: string, at?: any) {
      const url = assets.sprites[id]?.[pose || 'default'];
      // TODO: show sprite in renderer
      console.log('Show sprite:', id, pose, at, url);
    },
    hide(id: string) {
      // TODO: hide sprite in renderer
      console.log('Hide sprite:', id);
    }
  };
}

export function createAudioPort(assets: VNAssets): AudioPort {
  return {
    play(idOrUrl: string, loop?: boolean) {
      const url = assets.audio[idOrUrl] || idOrUrl;
      // TODO: play audio in renderer
      console.log('Play audio:', idOrUrl, url, loop);
    },
    stop(id?: string) {
      // TODO: stop audio in renderer
      console.log('Stop audio:', id);
    }
  };
}
