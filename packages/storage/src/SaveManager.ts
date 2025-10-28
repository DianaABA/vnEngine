export class SaveManager {
  save(key: string, state: any) {
    localStorage.setItem(key, JSON.stringify(state));
  }

  load(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  clear(key: string) {
    localStorage.removeItem(key);
  }
}
