/**
 * Enhanced JSON Script Loader for vnEngine
 * Supports both legacy format and new ChakraHearts-style episode scripts
 */

import { GameScriptSchema, EpisodeScriptSchema } from './schema';
import { EpisodeScript, GameScript } from './enhanced-schema';
import { ZodError } from 'zod';

export function loadScriptFromJSON(raw: unknown): GameScript {
  const result = GameScriptSchema.safeParse(raw);
  if (result.success) {
    return result.data;
  }
  const errors = result.error.issues.map((e: any) => `${e.path.join('.')}: ${e.message}`);
  throw new Error(`Script validation failed:\n${errors.join('\n')}`);
}

export function loadEpisodeScriptFromJSON(raw: unknown): EpisodeScript {
  const result = EpisodeScriptSchema.safeParse(raw);
  if (result.success) {
    return result.data;
  }
  const errors = result.error.issues.map((e: any) => `${e.path.join('.')}: ${e.message}`);
  throw new Error(`Episode script validation failed:\n${errors.join('\n')}`);
}

// Converter to migrate legacy scripts to enhanced format
export function migrateLegacyScript(legacyScript: any): GameScript {
  const migratedScript: GameScript = {
    metadata: {
      title: legacyScript.title || 'Untitled Visual Novel',
      version: legacyScript.version || '1.0.0',
      author: legacyScript.author || 'Unknown',
      description: legacyScript.description || ''
    },
    scenes: legacyScript.scenes || [],
    characters: legacyScript.characters || [],
    assets: legacyScript.assets || []
  };

  // Convert legacy nodes to enhanced format if needed
  if (legacyScript.scenes) {
    migratedScript.scenes = legacyScript.scenes.map((scene: any) => ({
      id: scene.id,
      nodes: scene.nodes || []
    }));
  }

  return migratedScript;
}

// Helper to convert ChakraHearts episode format to vnEngine format
export function convertChakraHeartsEpisode(chakraScript: any): EpisodeScript {
  const converted: EpisodeScript = {
    metadata: {
      id: chakraScript.episodeId || 'unknown-episode',
      title: chakraScript.title || 'Untitled Episode',
      description: chakraScript.description || '',
      characters: chakraScript.characters || [],
      assets: []
    },
    characters: chakraScript.characters || [],
    scenes: []
  };

  // Convert scenes from ChakraHearts format
  if (chakraScript.scenes) {
    converted.scenes = chakraScript.scenes.map((scene: any) => ({
      id: scene.id,
      name: scene.name || scene.id,
      description: scene.description || '',
      steps: scene.steps || []
    }));
  }

  return converted;
}

// Validation helpers
export function validateEpisodeScript(script: unknown): EpisodeScript {
  try {
    return loadEpisodeScriptFromJSON(script);
  } catch (error) {
    // Try to migrate if it's a legacy format
    if (script && typeof script === 'object' && 'scenes' in script) {
      const migrated = migrateLegacyScript(script);
      return migrated.episodes?.[0] || { scenes: migrated.scenes || [] };
    }
    throw error;
  }
}

export function validateGameScript(script: unknown): GameScript {
  try {
    return loadScriptFromJSON(script);
  } catch (error) {
    // Try to migrate if it's a legacy format
    if (script && typeof script === 'object') {
      return migrateLegacyScript(script);
    }
    throw error;
  }
}

// Asset path resolver
export function resolveAssetPath(assetId: string, assets: any[]): string | null {
  const asset = assets.find(a => a.id === assetId);
  return asset?.path || null;
}

// Character resolver
export function resolveCharacter(characterId: string, characters: any[]): any | null {
  return characters.find(c => c.id === characterId) || null;
}

// Effect processor
export function processEffects(effects: any[], gameState: any): void {
  for (const effect of effects) {
    switch (effect.type) {
      case 'setVar':
        if (effect.path && effect.value !== undefined) {
          setNestedValue(gameState.variables, effect.path, effect.value);
        }
        break;
      case 'setFlag':
        if (effect.id) {
          if (effect.value !== false) {
            gameState.flags.add(effect.id);
          } else {
            gameState.flags.delete(effect.id);
          }
        }
        break;
      case 'adjustRelationship':
        if (effect.character && effect.delta !== undefined) {
          const current = gameState.characterRelationships[effect.character] || 0;
          gameState.characterRelationships[effect.character] = Math.max(0, Math.min(100, current + effect.delta));
        }
        break;
      case 'unlockArt':
      case 'unlockCodex':
      case 'awardBadge':
        if (effect.id) {
          const listName = effect.type === 'unlockArt' ? 'galleryUnlocked' :
                          effect.type === 'unlockCodex' ? 'codexUnlocked' : 'badgesUnlocked';
          if (!gameState[listName]) gameState[listName] = [];
          if (!gameState[listName].includes(effect.id)) {
            gameState[listName].push(effect.id);
          }
        }
        break;
    }
  }
}

// Utility function to set nested object values
function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current)) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = value;
}