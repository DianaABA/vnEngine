export interface Scene {
  id: string;
  name: string;
  data?: any;
}

export class SceneManager {
  private scenes: Map<string, Scene> = new Map();
  private currentSceneId: string | null = null;

  onSceneChange?: (scene: Scene) => void;

  addScene(scene: Scene) {
    this.scenes.set(scene.id, scene);
  }

  goToScene(id: string) {
    const scene = this.scenes.get(id);
    if (scene) {
      this.currentSceneId = id;
      this.onSceneChange?.(scene);
    }
  }

  getCurrentScene(): Scene | null {
    return this.currentSceneId ? this.scenes.get(this.currentSceneId) || null : null;
  }
}
