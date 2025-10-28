// SaveAdapter interface for VN save/load system
export interface SaveAdapter {
  save(slot: string, data: any): void;
  load(slot: string): any | null;
  list(): string[];
}

// LocalStorageAdapter implementation
export class LocalStorageAdapter implements SaveAdapter {
  private prefix = 'vn_save_';

  save(slot: string, data: any): void {
    try {
      localStorage.setItem(this.prefix + slot, JSON.stringify(data));
    } catch (e) {
      // Optionally handle quota exceeded or serialization errors
      console.error('Save failed:', e);
    }
  }

  load(slot: string): any | null {
    const raw = localStorage.getItem(this.prefix + slot);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error('Load failed:', e);
      return null;
    }
  }

  list(): string[] {
    const slots: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        slots.push(key.substring(this.prefix.length));
      }
    }
    return slots;
  }
}
