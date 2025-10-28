export interface Asset {
  id: string;
  type: 'image' | 'audio' | 'sprite';
  src: string;
}

export class AssetManager {
  private assets: Map<string, Asset> = new Map();
  onAssetLoaded?: (asset: Asset) => void;

  preload(assets: Asset[]) {
    assets.forEach(asset => {
      this.assets.set(asset.id, asset);
      this.onAssetLoaded?.(asset);
    });
  }

  getAsset(id: string): Asset | undefined {
    return this.assets.get(id);
  }
}
