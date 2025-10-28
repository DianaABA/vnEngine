import { VNEpisode } from './types';
import { SceneManager } from './SceneManager';

export function parseEpisode(json: string): VNEpisode {
  return JSON.parse(json);
}

export function loadEpisodeToSceneManager(episode: VNEpisode, sceneManager: SceneManager) {
  episode.scenes.forEach(scene => {
    sceneManager.addScene({
      id: scene.id,
      name: scene.id,
      data: scene
    });
  });
  if (episode.scenes.length > 0) {
    sceneManager.goToScene(episode.scenes[0].id);
  }
}
