import { Snapshot } from '@vn/core';

export interface SaveAdapter {
  save(slot: string, snap: Snapshot): Promise<void> | void;
  load(slot: string): Promise<Snapshot | null> | Snapshot | null;
  list?(): Promise<string[]> | string[];
}
