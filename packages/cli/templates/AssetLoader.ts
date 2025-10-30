/**
 * Auto Asset Loader - Automatically discovers and loads assets from the public folder
 */

export class AutoAssetLoader {
  private baseUrl = ''

  constructor(baseUrl = '') {
    this.baseUrl = baseUrl
  }

  async loadAll() {
    const assets = {
      backgrounds: await this.loadAssetFolder('backgrounds'),
      sprites: await this.loadAssetFolder('sprites'), 
      audio: await this.loadAssetFolder('audio')
    }

    console.log('Loaded assets:', assets)
    return assets
  }

  private async loadAssetFolder(folderName: string): Promise<Record<string, string>> {
    const assets: Record<string, string> = {}
    
    // Common image extensions
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp']
    // Common audio extensions
    const audioExtensions = ['mp3', 'ogg', 'wav', 'aac', 'm4a']
    
    const extensions = folderName === 'audio' ? audioExtensions : imageExtensions

    // Try to load a manifest file first (if it exists)
    try {
      const manifestResponse = await fetch(`${this.baseUrl}/assets/${folderName}/manifest.json`)
      if (manifestResponse.ok) {
        const manifest = await manifestResponse.json()
        return this.processManifest(manifest, folderName)
      }
    } catch {
      // No manifest file, continue with auto-discovery
    }

    // Auto-discover assets by trying common filenames
    const commonNames = this.getCommonAssetNames(folderName)
    
    for (const name of commonNames) {
      for (const ext of extensions) {
        const url = `${this.baseUrl}/assets/${folderName}/${name}.${ext}`
        
        if (await this.assetExists(url)) {
          // Use name without extension as key
          assets[name] = url
          break // Found this asset, move to next name
        }
      }
    }

    // Also try to discover any additional assets by checking index files
    await this.discoverAdditionalAssets(assets, folderName, extensions)

    return assets
  }

  private processManifest(manifest: any, folderName: string): Record<string, string> {
    const assets: Record<string, string> = {}
    
    if (Array.isArray(manifest)) {
      // Simple array of filenames
      for (const filename of manifest) {
        const key = this.getAssetKey(filename)
        assets[key] = `${this.baseUrl}/assets/${folderName}/${filename}`
      }
    } else if (typeof manifest === 'object') {
      // Object mapping keys to filenames
      for (const [key, filename] of Object.entries(manifest)) {
        assets[key] = `${this.baseUrl}/assets/${folderName}/${filename}`
      }
    }

    return assets
  }

  private getAssetKey(filename: string): string {
    // Remove extension and return as key
    return filename.replace(/\.[^/.]+$/, '')
  }

  private async assetExists(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      return response.ok
    } catch {
      return false
    }
  }

  private getCommonAssetNames(folderName: string): string[] {
    switch (folderName) {
      case 'backgrounds':
        return [
          'room', 'school', 'classroom', 'library', 'cafeteria', 'hallway',
          'bedroom', 'living_room', 'kitchen', 'bathroom', 'garden', 'park',
          'street', 'city', 'beach', 'forest', 'mountain', 'desert',
          'office', 'hospital', 'shop', 'restaurant', 'cafe', 'gym',
          'day', 'night', 'sunset', 'sunrise', 'cloudy', 'rainy'
        ]
      
      case 'sprites':
        return [
          'character1', 'character2', 'character3', 'protagonist', 'antagonist',
          'friend', 'teacher', 'student', 'parent', 'sibling',
          'happy', 'sad', 'angry', 'surprised', 'neutral', 'thinking',
          'speaking', 'listening', 'walking', 'standing'
        ]
      
      case 'audio':
        return [
          'music', 'bgm', 'theme', 'background', 'intro', 'menu',
          'happy', 'sad', 'tense', 'romantic', 'action', 'peaceful',
          'click', 'select', 'confirm', 'cancel', 'error', 'notification',
          'footstep', 'door', 'phone', 'bell', 'nature', 'ambient'
        ]
      
      default:
        return []
    }
  }

  private async discoverAdditionalAssets(
    assets: Record<string, string>, 
    folderName: string, 
    extensions: string[]
  ): Promise<void> {
    // Try to find an index or directory listing
    // This is a fallback and may not work on all servers
    try {
      const indexResponse = await fetch(`${this.baseUrl}/assets/${folderName}/`)
      if (indexResponse.ok) {
        const text = await indexResponse.text()
        
        // Simple regex to find file links in directory listings
        const filePattern = new RegExp(`href="([^"]+\\.(${extensions.join('|')}))"`, 'gi')
        let match
        
        while ((match = filePattern.exec(text)) !== null) {
          const filename = match[1]
          const key = this.getAssetKey(filename)
          
          if (!assets[key]) {
            assets[key] = `${this.baseUrl}/assets/${folderName}/${filename}`
          }
        }
      }
    } catch {
      // Directory listing not available or not accessible
    }
  }

  // Helper method to create asset manifests
  static createManifest(folderPath: string, assets: string[]): void {
    const manifest = assets.reduce((acc, filename) => {
      const key = filename.replace(/\.[^/.]+$/, '')
      acc[key] = filename
      return acc
    }, {} as Record<string, string>)

    console.log('Generated manifest for', folderPath)
    console.log(JSON.stringify(manifest, null, 2))
  }
}

// Utility function to help users create manifests
export function generateAssetManifest(assets: { [key: string]: string }): string {
  return JSON.stringify(assets, null, 2)
}