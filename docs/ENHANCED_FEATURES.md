# vnEngine Enhanced Features Integration Guide

🎉 **Welcome to the enhanced vnEngine!** This guide covers all the powerful new features ported from ChakraHearts to make vnEngine a comprehensive visual novel development platform.

## 🚀 What's New

### Core Enhancements
- **Advanced Audio System** with crossfading, volume control, and scene-based music
- **Comprehensive VFX System** with screen shake, overlays, and cinematic effects  
- **Enhanced Game State Management** with save/load, progression tracking, and rollback
- **Rich Episode Script Format** supporting complex choices, effects, and unlockables
- **Progression Systems** including codex, badges, achievements, and relationships

---

## 🎵 Enhanced Audio System

### Basic Usage

```typescript
import { useAudio } from '@vn/renderer-web';

function MyVNComponent() {
  const audio = useAudio();

  // Play background music with crossfading
  const playBattleMusic = () => {
    audio.playBGM('combat_theme', true); // true = crossfade
  };

  // Play sound effects
  const playSlashSound = () => {
    audio.playSFX('sword_slash');
  };

  // Volume controls
  const adjustVolume = () => {
    audio.setBGMVolume(0.7);
    audio.setSFXVolume(0.8);
  };

  return (
    <div>
      <button onClick={playBattleMusic}>Start Battle</button>
      <button onClick={playSlashSound}>Slash!</button>
    </div>
  );
}
```

### Audio Registry Setup

```typescript
// Define your audio tracks
const audioTracks = [
  {
    id: 'combat_theme',
    name: 'Epic Battle Music',
    path: './audio/combat.mp3',
    loop: true,
    volume: 0.8,
    category: 'bgm'
  },
  {
    id: 'sword_slash',
    name: 'Sword Slash SFX',
    path: './audio/slash.wav',
    loop: false,
    volume: 1.0,
    category: 'sfx'
  }
];

// Preload tracks
await audioManager.preloadTracks(audioTracks);
```

### Scene-Based Music

```typescript
const { playSceneBGM } = useAudio();

// Automatically choose music based on scene context
playSceneBGM({
  mood: 'battle',     // Will play combat_theme
  location: 'temple', // Will play temple_ambient
  scene: 'dramatic'   // Will play tension_theme
});
```

---

## ✨ VFX System

### Basic VFX Usage

```typescript
import { useVFX } from '@vn/renderer-web';

function BattleScene() {
  const vfx = useVFX();

  const triggerEarthquake = () => {
    vfx.screenShake('extreme', 2000); // Intense shake for 2 seconds
  };

  const showEmberGlow = () => {
    vfx.showOverlay('ember-glow', 3000); // Glow effect for 3 seconds
  };

  return (
    <div className={vfx.vfxState.screenShake.intensity}>
      <button onClick={triggerEarthquake}>Earthquake!</button>
      <button onClick={showEmberGlow}>Fire Effect!</button>
    </div>
  );
}
```

### Advanced VFX Effects

```typescript
// Execute complex VFX sequences
vfx.executeEffect({
  id: 'battle_impact',
  type: 'screen_shake',
  intensity: 'intense',
  duration: 1200
});

vfx.executeEffect({
  id: 'mystical_aura',
  type: 'overlay',
  duration: 4000,
  properties: { class: 'mystical-shimmer' }
});

// Cinematic transitions
vfx.fadeToBlack(1000);
setTimeout(() => vfx.fadeIn(1000), 2000);
```

### VFX CSS Classes

Include the VFX stylesheet in your project:

```css
@import '@vn/renderer-web/styles/vfx-effects.css';
```

Available effect classes:
- `.screen-shake-subtle` - Light camera shake
- `.screen-shake-intense` - Heavy camera shake  
- `.ember-glow` - Fire/combat atmosphere
- `.mystical-shimmer` - Magical effects
- `.dust-particles` - Environmental particles

---

## 🎮 Game State Management

### Setup Game State

```typescript
import { GameStateManager } from '@vn/core';

// Initialize for your project
const gameState = GameStateManager.getInstance('my-visual-novel');

// Register your episodes
gameState.registerEpisodes([
  { id: 'ep1-prologue', title: 'The Beginning' },
  { id: 'ep2-conflict', title: 'Rising Action' },
  { id: 'ep3-climax', title: 'The Confrontation' }
]);
```

### Variable Management

```typescript
// Set nested variables
gameState.setVariable('player.name', 'Alex');
gameState.setVariable('relationships.elena', 75);
gameState.setVariable('inventory.sword.enchanted', true);

// Get variables with defaults
const playerName = gameState.getVariable('player.name', 'Unknown');
const elenaRelation = gameState.getVariable('relationships.elena', 0);
```

### Flags and Progression

```typescript
// Set story flags
gameState.setFlag('defeated_dragon', true);
gameState.setFlag('chose_mercy', true);

// Check flags
if (gameState.getFlag('defeated_dragon')) {
  // Dragon is defeated, show victory scene
}

// Unlock progression content
gameState.unlockCodex('dragon_lore');
gameState.unlockBadge('dragon_slayer');
gameState.unlockAchievement('first_boss');
```

### Save/Load System

```typescript
// Save game
const saveData = gameState.saveGame(1, 'manual'); // Slot 1, manual save

// Quick save/load
gameState.quickSave();
gameState.quickLoad();

// Auto-save configuration
gameState.toggleAutoSave(true); // Enable auto-save every 5 minutes
```

---

## 📜 Enhanced Episode Scripts

### New Episode Format

```json
{
  "metadata": {
    "id": "ep1-root-chakra",
    "title": "Episode 1: The Root of Denial",
    "description": "Journey begins with awakening",
    "characters": [
      {
        "id": "ELENA",
        "name": "Elena",
        "avatars": {
          "neutral": "./avatars/elena-neutral.png",
          "surprised": "./avatars/elena-surprised.png"
        }
      }
    ]
  },
  "scenes": [
    {
      "id": "PROLOGUE",
      "name": "The Awakening",
      "steps": [
        { "type": "show", "image": "temple_sunrise" },
        { "type": "playMusic", "track": "peaceful" },
        { "type": "narrate", "text": "The temple awakens with the dawn..." },
        { "type": "say", "who": "ELENA", "text": "Something feels different today." },
        {
          "type": "choice",
          "prompt": "How do you respond?",
          "options": [
            {
              "label": "Investigate the feeling",
              "effects": [
                { "type": "adjustStat", "stat": "curiosity", "delta": 10 }
              ],
              "next": "INVESTIGATE"
            },
            {
              "label": "Ignore it for now",  
              "effects": [
                { "type": "setFlag", "id": "ignored_premonition", "value": true }
              ],
              "next": "CONTINUE"
            }
          ]
        }
      ]
    }
  ]
}
```

### Advanced Choice System

```json
{
  "type": "choice",
  "prompt": "The dragon blocks your path. What do you do?",
  "options": [
    {
      "label": "⚔️ Attack with sword",
      "conditions": ["has_sword"],
      "effects": [
        { "type": "vfx", "vfxId": "screen_shake_intense" },
        { "type": "playMusic", "track": "battle" },
        { "type": "adjustStat", "stat": "combat", "delta": 5 }
      ],
      "next": "BATTLE_SCENE"
    },
    {
      "label": "🛡️ Defend and wait",
      "effects": [
        { "type": "adjustStat", "stat": "wisdom", "delta": 3 }
      ],
      "next": "DEFENSIVE_SCENE"  
    },
    {
      "label": "🕊️ Try to communicate",
      "conditions": ["learned_dragon_speech"],
      "disabled": false,
      "effects": [
        { "type": "unlockAchievement", "id": "dragon_whisperer" },
        { "type": "adjustRelationship", "character": "DRAGON", "delta": 20 }
      ],
      "next": "PEACEFUL_RESOLUTION"
    }
  ]
}
```

### VFX Integration in Scripts

```json
{
  "type": "vfx",
  "vfxId": "screen_shake_earthquake",
  "intensity": "extreme",
  "duration": 2000
},
{
  "type": "vfx", 
  "vfxId": "ember_glow",
  "duration": 3000
}
```

---

## 🏆 Progression Systems

### Codex System

```typescript
// Unlock lore entries
gameState.unlockCodex('ancient_magic');
gameState.unlockCodex('dragon_history');

// Check what's unlocked
const unlockedEntries = gameState.getCodexUnlocked();
const hasEntry = gameState.isCodexUnlocked('ancient_magic');
```

### Badge/Achievement System

```typescript
// Award badges for player actions
gameState.unlockBadge('first_choice');
gameState.unlockBadge('dragon_slayer');
gameState.unlockAchievement('completionist');

// Track progress
const badges = gameState.getBadgesUnlocked();
const achievements = gameState.getAchievements();
```

### Relationship Tracking

```typescript
// Adjust character relationships
gameState.adjustRelationship('ELENA', 10); // Increase by 10
gameState.adjustRelationship('VILLAIN', -15); // Decrease by 15

// Get relationship levels
const elenaLevel = gameState.getRelationship('ELENA'); // 0-100
```

---

## 🎯 Migration Guide

### From Basic vnEngine

1. **Update imports:**
```typescript
// Old
import { VNPlayer } from '@vn/renderer-web';

// New - Enhanced features
import { VNPlayer, useAudio, useVFX } from '@vn/renderer-web';
import { GameStateManager } from '@vn/core';
```

2. **Initialize enhanced systems:**
```typescript
// Set up game state
const gameState = GameStateManager.getInstance('your-project');

// Set up audio with preloaded tracks
const audioManager = new AudioManager();
await audioManager.preloadTracks(yourAudioTracks);
```

3. **Convert scripts to enhanced format:**
```typescript
import { convertChakraHeartsEpisode } from '@vn/script';

// Convert your existing scripts
const enhancedScript = convertChakraHeartsEpisode(yourLegacyScript);
```

### From ChakraHearts

Your existing ChakraHearts scripts should work with minimal changes! The enhanced vnEngine maintains full compatibility with the ChakraHearts episode format.

---

## 🛠️ Best Practices

### Performance
- Preload audio tracks at app startup
- Use `useVFXClasses` for automatic CSS class management  
- Limit simultaneous VFX effects to 3-4 for mobile devices

### Accessibility  
- Provide options to disable screen shake and particle effects
- Use semantic HTML for choice options
- Include alt text for background images

### State Management
- Use nested variable paths for complex data: `player.stats.strength`
- Set meaningful flag names: `defeated_boss_level_1` not `flag_001`
- Regular auto-saves prevent progress loss

### Audio Design
- Keep music loops smooth with proper fade points
- Use different volume levels for different audio categories
- Test crossfading transitions between contrasting tracks

---

## 🔧 API Reference

### Audio Manager
```typescript
interface AudioManager {
  playBGM(trackId: string, crossfade?: boolean): Promise<void>;
  stopBGM(fadeOut?: boolean): Promise<void>;
  playSFX(trackId: string): Promise<void>;
  setVolume(category: 'bgmVolume' | 'sfxVolume', volume: number): void;
  preloadTracks(tracks: AudioTrack[]): Promise<void>;
}
```

### VFX Manager  
```typescript
interface VFXManager {
  executeEffect(effect: VFXEffect): void;
  clearAllEffects(): void;
  screenShake(intensity: 'subtle' | 'intense', duration?: number): void;
  showOverlay(className: string, duration?: number): void;
}
```

### Game State Manager
```typescript
interface GameStateManager {
  setVariable(path: string, value: any): void;
  getVariable(path: string, defaultValue?: any): any;
  setFlag(id: string, value?: boolean): void;
  getFlag(id: string): boolean;
  saveGame(slotId: number, type?: 'manual' | 'auto'): SaveData;
  loadGame(slotId: number): boolean;
}
```

---

## 🎊 Examples

Check out these example implementations:

- **Basic VN with Audio**: `apps/basic-audio-demo/`
- **VFX Showcase**: `apps/vfx-showcase/`  
- **Full RPG Elements**: `apps/rpg-vn-demo/`
- **ChakraHearts Migration**: `apps/chakrahearts-port/`

---

## 🐛 Troubleshooting

### Audio Issues
- **Music not playing**: Check if tracks are preloaded and paths are correct
- **No crossfading**: Ensure `crossfade: true` parameter is set
- **Volume issues**: Verify category volumes and master volume settings

### VFX Issues  
- **Screen shake not working**: Import VFX CSS and check CSS class names
- **Performance problems**: Reduce effect intensity on mobile devices
- **Effects not clearing**: Call `clearAllEffects()` when changing scenes

### State Issues
- **Variables not persisting**: Check localStorage permissions and quotas
- **Save/load failing**: Ensure proper JSON serialization of custom objects

---

## 🤝 Contributing

Want to add more features? Check out our contribution guidelines and help make vnEngine even more powerful!

**Happy visual novel development!** 🎮✨