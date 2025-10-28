import { SceneManager } from './SceneManager';
import type { Scene } from './SceneManager';
import { DialogueManager } from './DialogueManager';
import { ChoiceManager, Choice } from './ChoiceManager';
import { SaveManager } from './SaveManager';
import { AssetManager } from './AssetManager';
import type { Asset } from './AssetManager';

export class VNEngine {
  sceneManager: SceneManager;
  dialogueManager: DialogueManager;
  choiceManager: ChoiceManager;
  saveManager: SaveManager;
  assetManager: AssetManager;

  constructor() {
    this.sceneManager = new SceneManager();
    this.dialogueManager = new DialogueManager([]);
    this.choiceManager = new ChoiceManager();
    this.saveManager = new SaveManager();
    this.assetManager = new AssetManager();

    // Example event wiring
    this.sceneManager.onSceneChange = (_scene: Scene) => {
      // Load scene data, update dialogue, choices, etc.
    };
    this.choiceManager.onChoiceSelected = (choice: Choice) => {
      if (choice.nextSceneId) {
        this.sceneManager.goToScene(choice.nextSceneId);
      }
    };
    this.assetManager.onAssetLoaded = (_asset: Asset) => {
      // Handle asset ready (e.g., notify renderer)
    };
  }

  saveGame(): string {
    const state = {
      scene: this.sceneManager.getCurrentScene(),
      dialogue: this.dialogueManager,
      choices: this.choiceManager.getChoices(),
      assets: Array.from(this.assetManager['assets'].values()),
    };
    return this.saveManager.save('vn_save', state);
  }

  loadGame(json: string) {
    const state = this.saveManager.load(json);
    if (state.scene) this.sceneManager.goToScene(state.scene.id);
    // Restore other state as needed
  }
}
