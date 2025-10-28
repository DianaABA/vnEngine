export class SaveManager {
  save(key: string, state: any) {
    return JSON.stringify(state);
  }

  load(json: string) {
    return JSON.parse(json);
  }
}
