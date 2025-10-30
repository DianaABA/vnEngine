/**
 * Auto Asset Loader for Template Basic
 * Automatically discovers and loads assets from the public folder
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

    console.log('📁 Loaded assets:', Object.keys(assets.backgrounds).length, 'backgrounds,', 
                Object.keys(assets.sprites).length, 'sprites,', 
                Object.keys(assets.audio).length, 'audio files')
    return assets
  }

  private async loadAssetFolder(folderName: string): Promise<Record<string, string>> {
    const assets: Record<string, string> = {}
    
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

    // Get extensions for this asset type
    const extensions = this.getExtensionsForType(folderName)
    const commonNames = this.getCommonAssetNames(folderName)
    
    // Auto-discover assets by trying common filenames
    for (const name of commonNames) {
      for (const ext of extensions) {
        const url = `${this.baseUrl}/assets/${folderName}/${name}.${ext}`
        
        if (await this.assetExists(url)) {
          assets[name] = url
          break // Found this asset, move to next name
        }
      }
    }

    return assets
  }

  private getExtensionsForType(folderName: string): string[] {
    switch (folderName) {
      case 'audio':
        return ['mp3', 'ogg', 'wav', 'aac', 'm4a']
      case 'backgrounds':
      case 'sprites':
      default:
        return ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp']
    }
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
          // Default template assets
          'room', 'street',
          // Common VN backgrounds
          'school', 'classroom', 'library', 'cafeteria', 'hallway',
          'bedroom', 'living_room', 'kitchen', 'bathroom', 'garden', 'park',
          'city', 'beach', 'forest', 'mountain', 'desert',
          'office', 'hospital', 'shop', 'restaurant', 'cafe', 'gym',
          // Time variations
          'day', 'night', 'sunset', 'sunrise', 'cloudy', 'rainy',
          // Generic numbered
          'bg1', 'bg2', 'bg3', 'bg4', 'bg5',
          'background1', 'background2', 'background3'
        ]
      
      case 'sprites':
        return [
          // Character references
          'character1', 'character2', 'character3', 'character4', 'character5',
          'protagonist', 'antagonist', 'friend', 'teacher', 'student', 
          'parent', 'sibling', 'rival', 'mentor',
          // Named characters (common names)
          'alex', 'sam', 'morgan', 'casey', 'riley', 'jordan',
          'ava', 'kai', 'emma', 'noah', 'sophia', 'liam',
          // Expression variations
          'happy', 'sad', 'angry', 'surprised', 'neutral', 'thinking',
          'speaking', 'listening', 'walking', 'standing',
          // Generic numbered
          'sprite1', 'sprite2', 'sprite3', 'sprite4', 'sprite5'
        ]
      
      case 'audio':
        return [
          // Music
          'music', 'bgm', 'theme', 'background', 'intro', 'menu', 'credits',
          'happy_music', 'sad_music', 'tense_music', 'romantic_music', 
          'action_music', 'peaceful_music',
          // Sound effects
          'click', 'select', 'confirm', 'cancel', 'error', 'notification',
          'footstep', 'door', 'phone', 'bell', 'nature', 'ambient',
          // Generic numbered
          'track1', 'track2', 'track3', 'sfx1', 'sfx2', 'sfx3'
        ]
      
      default:
        return []
    }
  }

  // Helper method for developers to generate manifests
  static logDiscoveredAssets(assets: Record<string, Record<string, string>>) {
    console.group('📋 Asset Discovery Report')
    
    Object.entries(assets).forEach(([type, typeAssets]) => {
      if (Object.keys(typeAssets).length > 0) {
        console.group(`${type.charAt(0).toUpperCase() + type.slice(1)} (${Object.keys(typeAssets).length})`)
        Object.entries(typeAssets).forEach(([key, url]) => {
          console.log(`${key}: ${url}`)
        })
        console.groupEnd()
      }
    })
    
    console.groupEnd()
  }
}