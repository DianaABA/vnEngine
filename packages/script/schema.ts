import { z } from 'zod';

export const VNNodeBaseSchema = z.object({
  id: z.string(),
  next: z.string().optional(),
});

export const DialogueNodeSchema = VNNodeBaseSchema.extend({
  type: z.literal('dialogue'),
  speaker: z.string().optional(),
  text: z.string(),
});

export const ChoiceOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  next: z.string(),
});

export const ChoiceNodeSchema = VNNodeBaseSchema.extend({
  type: z.literal('choice'),
  options: z.array(ChoiceOptionSchema),
});

export const CommandNodeSchema = VNNodeBaseSchema.extend({
  type: z.literal('command'),
  command: z.enum([
    'setBackground', 'playMusic', 'stopMusic', 'setFlag', 'showSprite', 'hideSprite',
    // Enhanced commands from ChakraHearts
    'vfx', 'unlockArt', 'unlockCodex', 'awardBadge', 'setVar', 'adjustRelationship',
    'adjustStat', 'addItem', 'removeItem', 'playSFX', 'fadeToBlack', 'fadeIn'
  ] as const),
  args: z.record(z.string(), z.unknown()).optional(),
  // Enhanced properties
  effects: z.array(z.object({
    type: z.string(),
    path: z.string().optional(),
    value: z.unknown().optional(),
    id: z.string().optional(),
    character: z.string().optional(),
    delta: z.number().optional()
  })).optional(),
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

export const VNSceneSchema = z.object({
  id: z.string(),
  nodes: z.array(VNNodeSchema),
});

export const GameScriptSchema = z.object({
  scenes: z.array(VNSceneSchema),
});
