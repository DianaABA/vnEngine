/**
 * Enhanced vnEngine Script Schema
 * Includes advanced features ported from ChakraHearts:
 * - VFX effects, music transitions, codex/badge unlocks
 * - Advanced choice system with effects
 * - Variable management, asset management
 * - Comprehensive step-based episode structure
 */

import { z } from 'zod';

// Base schemas for reusability
export const VNNodeBaseSchema = z.object({
  id: z.string(),
  next: z.string().optional(),
});

// Enhanced Effect System
export const EffectSchema = z.object({
  type: z.enum([
    'setVar', 'setFlag', 'adjustRelationship', 'adjustStat',
    'unlockArt', 'unlockCodex', 'awardBadge', 'unlockAchievement',
    'addItem', 'removeItem', 'playMusic', 'playSFX', 'vfx',
    'setBackground', 'showSprite', 'hideSprite', 'transition'
  ]),
  // Variable/Flag operations
  path: z.string().optional(),
  id: z.string().optional(),
  value: z.unknown().optional(),
  
  // Relationship/Stats
  character: z.string().optional(),
  stat: z.string().optional(),
  delta: z.number().optional(),
  
  // Audio
  track: z.string().optional(),
  fadeIn: z.boolean().optional(),
  fadeOut: z.boolean().optional(),
  
  // Visual Effects
  vfxId: z.string().optional(),
  intensity: z.enum(['subtle', 'moderate', 'intense', 'extreme']).optional(),
  duration: z.number().optional(),
  
  // Asset Management
  image: z.string().optional(),
  sprite: z.string().optional(),
  position: z.string().optional(),
  
  // Unlockables
  title: z.string().optional(),
  description: z.string().optional(),
  
  // Items
  item: z.string().optional(),
  quantity: z.number().optional()
});

// Enhanced Choice System
export const ChoiceOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  text: z.string().optional(), // Alternative to label
  next: z.string().optional(),
  effects: z.array(EffectSchema).optional(),
  conditions: z.array(z.string()).optional(), // Conditions to show this choice
  disabled: z.boolean().optional(),
  disabledReason: z.string().optional()
});

// Step-based Episode Structure (ChakraHearts style)
export const StepSchema = z.object({
  type: z.enum([
    'show', 'narrate', 'say', 'caption', 'pause', 'fadeToBlack', 'fadeIn',
    'choice', 'goto', 'end', 'vfx', 'playMusic', 'playSFX',
    'unlockArt', 'unlockCodex', 'awardBadge', 'setFlag', 'setVar',
    'adjustRelationship', 'adjustStat', 'addItem', 'removeItem',
    'showSprite', 'hideSprite', 'setBackground', 'transition'
  ]),
  
  // Display content
  text: z.string().optional(),
  image: z.string().optional(),
  who: z.string().optional(), // Speaker ID
  
  // Timing
  ms: z.number().optional(),
  
  // Choice system
  id: z.string().optional(),
  prompt: z.string().optional(),
  options: z.array(ChoiceOptionSchema).optional(),
  
  // Navigation
  scene: z.string().optional(),
  
  // Effects and Variables
  effects: z.array(EffectSchema).optional(),
  path: z.string().optional(),
  value: z.unknown().optional(),
  
  // Audio/Visual
  track: z.string().optional(),
  vfxId: z.string().optional(),
  intensity: z.enum(['subtle', 'moderate', 'intense', 'extreme']).optional(),
  duration: z.number().optional(),
  
  // Unlockables
  title: z.string().optional(),
  description: z.string().optional(),
  
  // Character/Stats
  character: z.string().optional(),
  stat: z.string().optional(),
  delta: z.number().optional(),
  
  // Items
  item: z.string().optional(),
  quantity: z.number().optional(),
  
  // Sprites
  sprite: z.string().optional(),
  position: z.string().optional(),
  
  // Transitions
  transitionType: z.enum(['fade', 'slide', 'zoom', 'blur']).optional()
});

// Enhanced Scene Structure
export const SceneSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  background: z.string().optional(),
  music: z.string().optional(),
  conditions: z.array(z.string()).optional(), // Unlock conditions
  steps: z.array(StepSchema)
});

// Character Definition
export const CharacterSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  avatars: z.record(z.string(), z.string()).optional(), // emotion -> image path
  sprites: z.record(z.string(), z.string()).optional(),
  voice: z.string().optional(),
  color: z.string().optional() // Text color
});

// Asset Definition
export const AssetSchema = z.object({
  id: z.string(),
  type: z.enum(['background', 'sprite', 'audio', 'image', 'video']),
  path: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional()
});

// Episode Metadata
export const EpisodeMetadataSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  version: z.string().optional(),
  author: z.string().optional(),
  unlockConditions: z.array(z.string()).optional(),
  characters: z.array(CharacterSchema).optional(),
  assets: z.array(AssetSchema).optional(),
  variables: z.record(z.string(), z.unknown()).optional(), // Default variables
  flags: z.array(z.string()).optional() // Default flags
});

// Legacy Node Schemas (for backward compatibility)
export const DialogueNodeSchema = VNNodeBaseSchema.extend({
  type: z.literal('dialogue'),
  speaker: z.string().optional(),
  text: z.string(),
});

export const ChoiceNodeSchema = VNNodeBaseSchema.extend({
  type: z.literal('choice'),
  options: z.array(ChoiceOptionSchema),
});

export const CommandNodeSchema = VNNodeBaseSchema.extend({
  type: z.literal('command'),
  command: z.enum([
    'setBackground', 'playMusic', 'stopMusic', 'setFlag', 'showSprite', 'hideSprite',
    'vfx', 'unlockArt', 'unlockCodex', 'awardBadge', 'setVar', 'adjustRelationship'
  ] as const),
  args: z.record(z.string(), z.unknown()).optional(),
  effects: z.array(EffectSchema).optional(),
  next: z.string().optional(),
});

export const BranchNodeSchema = VNNodeBaseSchema.extend({
  type: z.literal('branch'),
  condition: z.string(),
  trueNext: z.string(),
  falseNext: z.string(),
});

export const EndNodeSchema = VNNodeBaseSchema.extend({
  type: z.literal('end'),
});

export const VNNodeSchema = z.union([
  DialogueNodeSchema,
  ChoiceNodeSchema,
  CommandNodeSchema,
  BranchNodeSchema,
  EndNodeSchema,
]);

// Legacy Scene Schema (for backward compatibility)
export const VNSceneSchema = z.object({
  id: z.string(),
  nodes: z.array(VNNodeSchema),
});

// Enhanced Episode Script Schema
export const EpisodeScriptSchema = z.object({
  metadata: EpisodeMetadataSchema.optional(),
  characters: z.array(CharacterSchema).optional(),
  scenes: z.array(SceneSchema),
  // Legacy support
  legacyScenes: z.array(VNSceneSchema).optional()
});

// Full Game Script Schema
export const GameScriptSchema = z.object({
  metadata: z.object({
    title: z.string(),
    version: z.string().optional(),
    author: z.string().optional(),
    description: z.string().optional()
  }).optional(),
  episodes: z.array(EpisodeScriptSchema).optional(),
  scenes: z.array(VNSceneSchema).optional(), // Legacy support
  characters: z.array(CharacterSchema).optional(),
  assets: z.array(AssetSchema).optional()
});

// Type exports for TypeScript
export type Effect = z.infer<typeof EffectSchema>;
export type ChoiceOption = z.infer<typeof ChoiceOptionSchema>;
export type Step = z.infer<typeof StepSchema>;
export type Scene = z.infer<typeof SceneSchema>;
export type Character = z.infer<typeof CharacterSchema>;
export type Asset = z.infer<typeof AssetSchema>;
export type EpisodeMetadata = z.infer<typeof EpisodeMetadataSchema>;
export type EpisodeScript = z.infer<typeof EpisodeScriptSchema>;
export type GameScript = z.infer<typeof GameScriptSchema>;

// Legacy exports
export type VNNode = z.infer<typeof VNNodeSchema>;
export type VNScene = z.infer<typeof VNSceneSchema>;