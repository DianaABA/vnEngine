import { loadScriptFromJSON } from './json';
import { loadScriptFromDSL } from './dsl';
// Enhanced imports from ChakraHearts
import { 
  loadEpisodeScriptFromJSON, 
  validateEpisodeScript, 
  validateGameScript,
  convertChakraHeartsEpisode,
  processEffects 
} from './enhanced-json';

export function loadScript(input: string | object, kind?: 'json' | 'dsl') {
  if (!kind) {
    if (typeof input === 'string') {
      try {
        const parsed = JSON.parse(input);
        return loadScriptFromJSON(parsed);
      } catch {
        return loadScriptFromDSL(input);
      }
    }
    return loadScriptFromJSON(input);
  }
  if (kind === 'json') {
    return loadScriptFromJSON(typeof input === 'string' ? JSON.parse(input) : input);
  }
  return loadScriptFromDSL(typeof input === 'string' ? input : JSON.stringify(input));
}

// Enhanced script loading functions
export function loadEpisodeScript(input: string | object) {
  const parsed = typeof input === 'string' ? JSON.parse(input) : input;
  return validateEpisodeScript(parsed);
}

export function loadGameScript(input: string | object) {
  const parsed = typeof input === 'string' ? JSON.parse(input) : input;
  return validateGameScript(parsed);
}

// Export enhanced utilities
export { 
  loadEpisodeScriptFromJSON, 
  validateEpisodeScript, 
  validateGameScript,
  convertChakraHeartsEpisode,
  processEffects 
};

// Export enhanced schemas (renamed to avoid conflicts)
export { 
  EpisodeScriptSchema,
  SceneSchema,
  StepSchema,
  ChoiceOptionSchema as EnhancedChoiceOptionSchema,
  EffectSchema,
  CharacterSchema
} from './enhanced-schema';

// Export legacy schemas (keep original names for backward compatibility)
export {
  VNNodeBaseSchema,
  DialogueNodeSchema,
  ChoiceNodeSchema as LegacyChoiceNodeSchema,
  ChoiceOptionSchema,
  CommandNodeSchema,
  BranchNodeSchema,
  EndNodeSchema,
  VNNodeSchema,
  VNSceneSchema,
  GameScriptSchema
} from './schema';
