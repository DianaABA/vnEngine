export interface Choice {
  id: string;
  text: string;
  nextSceneId?: string;
}

export class ChoiceManager {
  private choices: Choice[] = [];
  onChoiceSelected?: (choice: Choice) => void;

  setChoices(choices: Choice[]) {
    this.choices = choices;
  }

  getChoices(): Choice[] {
    return this.choices;
  }

  selectChoice(id: string) {
    const choice = this.choices.find(c => c.id === id);
    if (choice) {
      this.onChoiceSelected?.(choice);
    }
  }
}
