import { DialogueManager, DialogueLine } from './DialogueManager';

export class ScenePlayer {
  private dialogueManager: DialogueManager;

  constructor(lines: DialogueLine[]) {
    this.dialogueManager = new DialogueManager(lines);
  }

  getCurrentScene() {
    return this.dialogueManager.getCurrentLine();
  }

  next(choiceIndex?: number) {
    this.dialogueManager.next(choiceIndex);
  }

  isEnd() {
    return this.dialogueManager.isEnd();
  }
}
