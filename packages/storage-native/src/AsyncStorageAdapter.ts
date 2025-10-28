import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Snapshot } from '@vn/core';

export interface SaveAdapter {
  save(slot: string, snap: Snapshot): Promise<void> | void;
  load(slot: string): Promise<Snapshot | null> | Snapshot | null;
  list?(): Promise<string[]> | string[];
}

export class AsyncStorageAdapter implements SaveAdapter {
  constructor(private prefix: string = 'vn_save_') {}

  async save(slot: string, snap: Snapshot) {
    await AsyncStorage.setItem(this.prefix + slot, JSON.stringify(snap));
  }
  async load(slot: string): Promise<Snapshot | null> {
    const raw = await AsyncStorage.getItem(this.prefix + slot);
    return raw ? JSON.parse(raw) : null;
  }
  async list(): Promise<string[]> {
    const keys = await AsyncStorage.getAllKeys();
    return keys
      .filter((k: string) => k.startsWith(this.prefix))
      .map((k: string) => k.replace(this.prefix, ''));
  }
}
