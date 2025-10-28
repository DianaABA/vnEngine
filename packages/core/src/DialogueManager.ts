export type DialogueLine = {
  character: string;
  text: string;
  choices?: { text: string; next: number }[];
};

export class DialogueManager {
  private lines: DialogueLine[];
  private current: number = 0;

  constructor(lines: DialogueLine[]) {
    this.lines = lines;
  }

  getCurrentLine(): DialogueLine {
    return this.lines[this.current];
  }

  next(choiceIndex?: number) {
    const line = this.getCurrentLine();
    if (line.choices && choiceIndex !== undefined) {
      this.current = line.choices[choiceIndex].next;
    } else {
      this.current++;
    }
  }

  isEnd(): boolean {
    return this.current >= this.lines.length;
  }
}
