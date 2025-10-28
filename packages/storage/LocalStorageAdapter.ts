import { SaveAdapter } from './SaveAdapter';
import { Snapshot } from '@vn/core/src/snapshot';

export class LocalStorageAdapter implements SaveAdapter {
  constructor(private prefix: string = 'vn_save_') {}

  save(slot: string, snap: Snapshot): void {
    localStorage.setItem(this.prefix + slot, JSON.stringify(snap));
  }

  load(slot: string): Snapshot | null {
    const raw = localStorage.getItem(this.prefix + slot);
    return raw ? JSON.parse(raw) : null;
  }

  list(): string[] {
    return Object.keys(localStorage)
      .filter(k => k.startsWith(this.prefix))
      .map(k => k.replace(this.prefix, ''));
  }
}
