import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageAdapter {
  async save(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  }
  async load(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
  }
  async list(): Promise<string[]> {
    const keys = await AsyncStorage.getAllKeys();
    return Array.from(keys);
  }
}
