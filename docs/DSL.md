# Script DSL (Friendly Syntax)

This DSL abstracts the engine’s node graph into an easy-to-read script. It compiles to `GameScript` JSON.

## Basics
- Scenes use labels: `@label`
- Dialogue: `Character: Line of dialogue`
- Narration: `"Narration text"` (or use a special character name like `Narrator:`)
- Background: `BG <key> [transition: <type> <ms>]`
- Music: `MUSIC play <key> [fadeIn: <ms>]` / `MUSIC stop [fadeOut: <ms>]`
- Sprites:
  - `SHOW <id> <pose?> [at: x=<0-100>% y=<0-100>% z=<int> anchor=<center|bottom>] [transition: <type> <ms>]`
  - `HIDE <id> [transition: <type> <ms>]`
- Choices:
  - `? Question text`
  - `- Choice text -> @label`
- End: `[end]`

## Example
```
@intro
BG classroom_day [transition: crossfade 600ms]
MUSIC play main_theme [fadeIn: 1000]
SHOW Ava smile [at: x=25% y=100% anchor=bottom] [transition: fade 300ms]

Ava: Welcome to ChakraHearts!
Kai: Shall we begin?

? What do you do?
- Yes! -> @end
- Maybe later -> @end

@end
[END]
```

## Transitions (suggested)
- Background: `fade`, `crossfade`, `slideLeft|Right|Up|Down`, `panZoom`
- Sprites: `fade`, `move`, `scale`

## Audio behavior defaults (engine)
- Smooth fades: Music/SFX playback and stop calls are standardized to use gentle fades/crossfades by default in the web renderer.
- Soft limiter: Output volume uses a soft limiter to avoid clipping. Keep source files below 0 dBFS; engine caps final gain around -2 dB.
- Auto-music is opt-in: Automatic per-scene music helpers in the web renderer are disabled by default. Apps must opt in when using `useEpisodeAudio`/`useSceneAudio` helpers.

## Variables and Conditions (planned)
- Set variable: `[set var karma = 1]`
- Increment: `[inc var karma by 1]`
- Conditional branch: `IF karma >= 3 -> @secret`
- Lock a choice: `- Secret Path (locked: need karma 3)`

## Mapping to GameScript
- Each `@label` becomes a `scene.id`
- Dialogue lines become `dialogue` nodes
- Choices become `choice` nodes with `choices[]`
- `BG/MUSIC/SHOW/HIDE` map to `runCommand` nodes of corresponding types
- `[END]` maps to `end` node

## Validation rules (minimum)
- All `-> @label` targets must exist
- Asset keys referenced by BG/MUSIC/SHOW must be present in your manifest
- Choice lists must have at least 1 item
- A scene must have a `start` node reachable from entry
