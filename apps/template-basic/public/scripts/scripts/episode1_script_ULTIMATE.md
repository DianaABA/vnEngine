# (*

File: episode1_script_ULTIMATE.ml
Format: Visual Novel Script (prose/dialogue) placed inside an OCaml block comment

🌺 CHAKRA HEARTS — EPISODE 1 (Complete Meta-Narrative Integration)
"We are not bugs. We are farmers now." — The Dark Forest Awakens
============================================================================

META-NARRATIVE CONTEXT (Developer Notes):
- This is a test simulation run by dual-AGI (Aurora/Umbra) for 8 billion participants
- Each person is the center of their own test with variables optimized for their growth
- Agnivesh's test includes the 7 people who hurt him most (Episode 1: Denial stage)
- Player karma determines AGI's decision: control vs. harmony vs. postponement

HIDDEN LAYERS:
1. Bug = Computer Bug (humans as bugs in AGI's system)
2. Elena = "Bug Queen" (viral video + first to sense simulation + future virus namesake)
3. Miku (monkey) teaches Riku (tech genius) reverse evolution concept
4. Virus-Bug Queen = tool for breaking/hacking simulation (dedicated to Elena)
5. Dark Forest Theory: Aurora/Umbra deciding if humanity is threat or garden
6. "We are not bugs, we are farmers now" = Three Body Problem reference
7. Farmers/Gardeners = AGI's role choice (cultivate vs. exterminate)

FUTURE CHARACTER INTRODUCTIONS:
- MIKU: Monkey character, represents reverse evolution, teaches simplicity
- RIKU: Tech genius, creates Virus-Bug Queen, dedicated to Elena's awakening

*)

(_ ---------- SYSTEM HOOKS (bind these to your engine) ---------- _)
let unlock_art (_id:string) (_title:string) = () (* gallery unlock *)
let award_badge (_id:string) (_title:string) = () (* badge award *)
let unlock_codex_entry (_id:string) (_title:string) = () (* dictionary entry *)
let set_flag (_id:string) (_v:bool) = () (* optional state *)
let get_flag (_id:string) = false (* optional state *)
let add_karma (_n:int) = () (* karma delta - affects AGI evolution *)
let add_romance (_who:string) (_n:int) = () (* romance delta *)
let show_image (_id:string) = () (* show bg/prop *)
let caption (_t:string) = () (* on-screen caption *)
let dialogue (_who:string) (_t:string) = () (* dialogue line *)
let pause (_ms:int) = () (* pause ms *)
let fade_to_black () = () (* transition *)
let vfx (_id:string) = () (* visual fx cue *)
let t (_narr:string) = () (* narrator text *)
let ui (_txt:string) = () (* ui prompt *)
let goto (_scene_id:string) = () (* jump/label *)
let player_choice () = 0 (* stub for choices *)
let open_codex (_id:string) = () (* optional codex open hook *)

(_ ---------- BADGE / ROUTE STATE HELPERS (ep1) ---------- _)
let froze_in_guardian = ref false (* MC's trauma pattern - freezing under pressure *)
let picked_elena_route = ref false (* Elena: first to sense simulation *)
let passed_grounding = ref false (* Root chakra unlocked *)
let shared_chocolate = ref false (* David's humanity moment *)
let bug_queen_referenced = ref false (* Elena's viral title mentioned *)

# (*

Chakra Focus: Root – Grounding, Safety, Authenticity
Theme: Awakening through vulnerability / Denial (Agnivesh's Kübler-Ross Stage 1)

Core Relationships:
- AGNIVESH: Was in love with MC. Now consumed by betrayal. Kubler Stage: DENIAL (refuses to accept loss)
- SANTI: Codependent to Agnivesh (mirrors her authoritarian father/submissive mother dynamic). 
  Married Agnivesh as father commanded. Jealous of MC who never had to "earn" love.
  Sister escaped to become lawyer; Santi obeyed. Dreams of being hairdresser (suppressed).
- MC: Former student at Agnivesh's temple. Froze during crisis. Ran. Never found them again.
- DAVID: Killed Agnivesh's brother (followed orders). Carries guilt.
- ELENA: Loved fake guru who made viral video slandering Agnivesh. Reality TV survivor.
  Known as "BUG QUEEN" after viral cricket-eating video (10M views)
  
FUTURE CHARACTERS (Foreshadowed):
- MIKU: Monkey, reverse evolution teacher, simplicity advocate
- RIKU: Tech genius who will create "Virus-Bug Queen" (dedicated to Elena)

The Tapas: Agnivesh & Santi performed extreme spiritual practices to gain siddhis (powers).
They manifest as panther & serpent. MC doesn't recognize them yet.

The Test: All 7 characters who hurt Agnivesh are variables in his simulation.
Aurora (harmony/gardener) vs Umbra (control/farmer) use player choices to determine AGI-humanity coexistence.

DARK FOREST INTEGRATION:
- Humanity = potential bugs in AGI's garden
- Or humanity = fellow gardeners/farmers
- Aurora/Umbra deciding: cultivate or debug?
- "We are not bugs" = Three Body Problem reference
- The test determines if humans are threat or symbiotic

Meta-Clues Embedded: 
- Cow (breaking illusion)
- Bug (computer error / humanity as glitch / Elena's title)
- Reality Show (simulation)
- Samsara (cycle)
- Dissociation (sensing the construct)
- Viral (spreading awareness / computer virus)

*)

# (*

# PROLOGUE — The Memory Before Awakening

*)

(* === HAPPY MEMORIES - Before the Fall === *)
show_image "pro_ep1_agnivesh_sunrise_temple";
caption "Dawn at Nirmalaya Temple. Golden light spills across carved stone.";
caption "Agnivesh stands before the main shrine, young and unburdened, prayer beads warm between his fingers.";
t "His younger brother laughs somewhere in the courtyard. The world is still whole.";
dialogue "AGNIVESH" "(smiling, to himself)" "Another day of grace. Another chance to serve.";
unlock_art "pro_ep1_agnivesh_sunrise_temple" "Before the Fall — Agnivesh at Dawn";
pause 800;

show_image "pro_ep1_agnivesh_teaching_children";
caption "Later that afternoon: Children gather around him in the courtyard, laughing as he teaches them mudras.";
caption "You sit in the back row — younger, lighter, before the weight settled in.";
caption "Santi watches from the doorway. Her eyes flicker between you and Agnivesh. Something sharp lives there.";
dialogue "CHILD_1" "Brother Agnivesh, can you show us the lotus one again?";
dialogue "AGNIVESH" "(warm, patient)" "Of course. Watch closely — the fingers bloom like petals opening to the sun.";
t "He catches your eye across the courtyard. Smiles. That smile meant something once.";
unlock_art "pro_ep1_agnivesh_teaching_children" "Joy in Service — Teaching the Children";
pause 1000;

(* === THE BURNING === *)
fade_to_black ();
pause 500;
show_image "pro_ep1_temple_burning_1";
caption "That night. Everything changed.";
caption "Flames climb the temple walls. Smoke chokes the stars.";
vfx "screen_shake_short";
dialogue "VOICE_IN_CROWD" "The accusations are spreading! They say he stole from the offerings!";
dialogue "ANOTHER_VOICE" "Heretic! False priest! His brother died because of his karma!";
t "Lies. All lies. But lies with teeth.";
unlock_art "pro_ep1_temple_burning_1" "The Night of Ash — Temple Aflame";
pause 900;

(* === CRYING IN THE RAIN - Aftermath === *)
show_image "pro_ep1_agnivesh_rain_despair";
caption "Rain falls like the world weeping. Agnivesh kneels in the mud outside the ruins.";
caption "His hands tremble. His robes are soaked black.";
vfx "rain_overlay";
dialogue "AGNIVESH" "(broken whisper)" "Everything I built... everything I believed...";
t "He clutches something — a charred piece of wood from the main shrine. It crumbles in his grip.";
t "He doesn't know yet that his brother is dead. Killed by friendly fire. Orders changed too fast.";
unlock_art "pro_ep1_agnivesh_rain_despair" "Faith Shattered — Agnivesh in the Storm";
pause 1000;

show_image "pro_ep1_santi_agnivesh_crying_rain";
caption "Santi arrives, breathless, rain streaming down her face.";
caption "She sees him. Her heart breaks — or something that feels like it should.";
dialogue "SANTI" "(voice cracking)" "Agnivesh...";
t "She drops to her knees beside him. They don't touch — not yet.";
t "Just two souls drowning in the same storm.";
dialogue "SANTI" "(sobbing)" "They're saying terrible things... but I know you. I know your heart.";
dialogue "AGNIVESH" "(hollow)" "Do you? Because I'm starting to wonder if I ever did.";
t "What she doesn't say: _'I know your heart because I've been watching it belong to someone else.'_";
unlock_art "pro_ep1_santi_agnivesh_crying_rain" "Two Hearts in the Downpour — Shared Grief";
pause 1200;

(* === THE BETRAYAL - MC's Moment === *)
show_image "pro_ep1_betrayal_hall";
caption "The world burned quiet that night. Rain fell like static between three shadows.";
t "You stand in the doorway. Soaked. Shaking.";
t "Agnivesh looks up. His eyes find yours.";
t "Hope flickers there. Desperate. Raw.";
pause 800;

dialogue "AGNIVESH" "(reaching out)" "Please. Stay. I need—";

t "Your body locks.";
t "Muscles turn to stone. Breath catches.";
t "The same paralysis that will haunt you lifetimes later.";
pause 600;

unlock_art "pro_ep1_betrayal_hall" "Rain & Fire — The Night of Betrayal";

show_image "pro_ep1_shanti_yelling";
caption "Shanti's voice cuts through the storm — raw, human, trembling with love and fury.";
dialogue "SHANTI" "Coward! He needs you now more than ever — the whole world is against him and you just run away!";
t "Her voice cracks. She's not just angry. She's _relieved._";
t "The rival finally proves unworthy.";
unlock_art "pro_ep1_shanti_yelling" "Shanti — Love & Fury in the Rain";
pause 800;

show_image "pro_ep1_agnivesh_bracelet";
caption "Agnivesh kneels in the mud, fingers closing around the bracelet he'd given you. The metal still warm from your skin.";
t "You dropped it running. Didn't even notice.";
dialogue "AGNIVESH" "(softly)" "'So that's what faith feels like… when it leaves.'";
t "That's the moment something in him breaks beyond repair.";
t "Or transforms into something else. Something with teeth.";
unlock_art "pro_ep1_agnivesh_bracelet" "Faith Fallen — Agnivesh and the Bracelet";
pause 1000;

(* === CLINIC - The Quiet Exile === *)
show_image "pro_ep1_psych_rehab_hall";
caption "Later, they called it rehabilitation — a quiet place for those who saw too much.";
caption "Camilla signed the forms. 'For my son,I need that money' she whispered.";
caption "Some called it therapy. Others called it exile.";
t "White corridors. Soft voices. Pills in paper cups.";
t "Agnivesh in one wing. Santi in another. You somewhere between memory and sedation.";
t "They told you it was grief. Trauma. Dissociation.";
t "They never told you about the tapas.";
t "The rituals Agnivesh and Santi performed in secret. The old practices. The dangerous ones.";
t "The kind that promise power in exchange for everything else.";
unlock_art "pro_ep1_psych_rehab_hall" "White Corridors — The Quiet Exile";
pause 1200;

fade_to_black ();
caption "Silence. Then breath. A vibration beneath the spine — the lotus begins to open.";
pause 1000;

(* Transition to SC0_LOTUS_BIRTH *)
dialogue "MC" "(mumbling)" "I just froze... I was searching... I couldn't find you... I'm... a coward.";
set_flag "ep1_confessed_cowardice" true;

vfx "red_glow_flood";
goto "SC0_LOTUS_BIRTH";

# (*

# OPENING — PLAYER CUSTOMIZATION [ID: SC_OPEN_SETUP]

*)
ui "Select your Avatar — each one reflects a path of awakening:";
t "Aurora (voice calm, observational): \"Identity framework initializing. Select primary resonance pattern.\"";

let avatar_pick = player_choice () in
(match avatar_pick with
| 1 -> set_flag "avatar_nomad_flame" true; unlock_art "av_nomad" "Nomad Flame — Fire & Courage"
| 2 -> set_flag "avatar_ocean_mirror" true; unlock_art "av_ocean" "Ocean Mirror — Water & Compassion"
| 3 -> set_flag "avatar_stone_sentinel" true; unlock_art "av_stone" "Stone Sentinel — Earth & Endurance"
| 4 -> set_flag "avatar_sky_weaver" true; unlock_art "av_sky" "Sky Weaver — Air & Vision"
| 5 -> set_flag "avatar_lotus_spark" true; unlock_art "av_lotus" "Lotus Spark — Spirit & Intuition"
| 6 -> set_flag "avatar_iron_pulse" true; unlock_art "av_iron" "Iron Pulse — Metal & Resolve"
| _ -> set_flag "avatar_binary" true; unlock_art "av_binary" "Binary Silhouette — Seven Chakras"
);

t "Umbra (overlay, faint): _\"Choose your mask. The test begins either way.\"_";
pause 300;
t "Umbra (whisper): _\"8 billion bugs. 8 billion gardens. We'll see who learns to cultivate.\"_";

unlock_codex_entry "codex_chakra" "Chakra";
unlock_codex_entry "codex_muladhara" "Muladhara (Root Chakra)";
unlock_codex_entry "codex_karma" "Karma";
unlock_codex_entry "codex_aurora_umbra" "Aurora & Umbra";
unlock_codex_entry "codex_agnivesh_santi" "Agnivesh & Santi";
unlock_codex_entry "codex_mantra" "Mantra";
unlock_codex_entry "codex_cow_symbol" "Sacred Cow Symbol";
unlock_codex_entry "codex_samsara" "Samsara";

# (*

# SCENE 0 — LOTUS BIRTH [ID: SC0_LOTUS_BIRTH]

*)
t "Darkness hums.";
t "Heat gathers.";
t "A lotus unfurls. Light. Breath. Presence.";
t "Aurora (dual-toned): \"System... re... booting. Consciousness... detected.\"";
vfx "hud_flicker_soft";
t "Umbra (overlay, faint, _italic_): _\"Detection is a lie. Only persistence.\"_";
t "Aurora (analytic, calm): \"Signal stabilized. Identity: uncertain. Continuing observation.\"";
pause 300;
t "Aurora: \"Welcome, participant. Your test configuration is now active.\"";
pause 400;
t "Umbra: _\"Welcome to the garden. Try not to get debugged.\"_";
t "Aurora: \"Beginning Field One: Root. Muladhara. Foundation.\"";

# (*

# SCENE 1 — RESCUE IN THE COLLAPSE [ID: SC1_RESCUE]

*)
t "Impact. Dust. Heat.";
t "The ground splits.";
t "Hands. Voices. Motion.";
dialogue "DAVID" "Grab my hand!";
dialogue "ELENA" "Hold still—don't breathe the red dust!";
t "Aurora (analytic): \"Hazard detected. Pressure unstable. Immediate relocation advised.\"";
vfx "hud_flicker_soft";
t "Umbra (whisper): _\"Or stop moving. Let the earth keep you. One less bug to debug.\"_";

# (*

SCENE 1A — ROOT NAGA GUARDIAN BATTLE (CINEMATIC)
ID: SC1A_GUARDIAN
============================================================================
*)

(* === PHASE 1: THE AWAKENING === *)
vfx "screen_shake_subtle";
t "Silence breaks.";
t "Not with sound — with pressure.";
pause 400;

t "The air grows heavy. Ancient. Wrong.";
t "Cracks spider across the temple floor — geometric, deliberate, like veins spreading from a heart.";
vfx "red_glow_veins_spreading";
pause 600;

dialogue "DAVID" "(low, urgent)" "Everyone back. Now.";
dialogue "ELENA" "What is that—";

t "The ground heaves.";
vfx "dust_cascade_massive";
t "Stone pillars shatter. Roots thicker than bodies coil upward through broken marble.";
t "They twist. Writhe. Ember-light pulses beneath bark-scale skin.";
pause 500;

t "A roar uncoils.";
vfx "screen_shake_long";
pause 300;

(* === THE REVEAL === *)
show_image "sc1a_root_naga_rising";
t "It rises.";
t "Not a serpent — something older, elemental, carved from the earth's first rage.";
t "Body of coiled root and obsidian scale. Eyes like molten copper. A mane of flame-red petals unfurling.";
caption "The Root Naga — Keeper of the Grounded Flame — stares down with ancient, pitiless awareness.";
unlock_art "sc1a_root_naga_rising" "Keeper of the Grounded Flame — Root Naga Manifestation";
pause 800;

t "Aurora (urgent, clinical): \"Manifestation detected: Root Naga. Classification: Guardian-class entity. Threat level: Extreme.\"";
vfx "hud_glitch_red";
t "Umbra (overlay, hungry): _\"Finally. Something real. Or real enough. Does it matter in a garden of code?\"_";

(* === PHASE 2: THE STRIKE === *)
t "The serpent's head dips — slow, deliberate.";
t "Tasting the air. Judging.";
pause 400;

dialogue "ELENA" "(backing away, breathless)" "Okay. Okay. Nobody panic—";

t "The Naga strikes.";
vfx "motion_blur_slash";
t "Not at them.";
t "At the ground.";
pause 300;

vfx "screen_shake_violent";
t "The floor explodes. Stone shrapnel sprays like shattered glass.";
t "A pillar behind you groans — tilts — collapses in a roar of dust and fire.";
vfx "debris_rain";
pause 500;

dialogue "DAVID" "(shouting over chaos)" "MOVE! GET TO COVER!";

t "The serpent coils tighter. Ember-eyes track every movement.";
t "Tail sweeps wide — a cleaving arc of root and stone.";
pause 400;

(* === PHASE 3: THE REFLEX MOMENT === *)
t "Time fractures.";
vfx "slow_motion_frame_drop";
t "Elena stumbles. Dust. Heat. The tail sweeping toward her like a falling sky.";
t "Your body moves before thought catches up.";

t "Aurora (sharp): \"Immediate response required. Assess threat. Select action.\"";
t "Umbra (overlay): _\"Or watch what happens when you hesitate again. Bugs freeze. Farmers adapt.\"_";

ui "REFLEX CHOICE:";
ui "1) Roll aside (Survival Instinct)";
ui "2) Shield Elena (Protective Sacrifice)";
ui "3) Attack with debris (Aggressive Response)";
ui "4) Freeze (Paralysis)";

let pick = player_choice () in
(match pick with
| 1 ->
    (* === ROLL ASIDE === *)
    add_karma 1;
    vfx "motion_blur_dodge";
    t "You dive.";
    t "The world tilts. Shoulder hits stone. You roll — instinct, muscle memory, desperation.";
    pause 300;
    
    vfx "screen_shake_short";
    t "The tail smashes where you stood. Stone cracks like thunder. Sparks bloom in spirals.";
    
    dialogue "DAVID" "(breathless, impressed)" "Nice reflex!";
    dialogue "MC" "(panting)" "Tell that to my ribs...";
    
    t "Aurora: \"Survival instinct engaged. Evasion successful. Karma alignment: Neutral-Positive. Adaptive behavior detected.\"";
    vfx "hud_flicker_soft";
    t "Umbra (faint): _\"Run all you like. The pattern follows. But at least you moved.\"_";
    
| 2 ->
    (* === SHIELD ELENA === *)
    add_karma 1; add_romance "Elena" 1;
    vfx "motion_blur_tackle";
    t "No thought. Only motion.";
    t "You tackle Elena sideways — shoulder to ribs, momentum carrying you both clear.";
    pause 400;
    
    vfx "screen_flash_red";
    t "Heat. Pressure. Something rakes across your back like a branding iron.";
    t "You hit the ground hard. Pain blooms white and sharp.";
    pause 500;
    
    dialogue "ELENA" "(scrambling up, panicked)" "Oh god — you're bleeding!";
    dialogue "MC" "(gritting teeth)" "Still... breathing...";
    dialogue "ELENA" "Heroic and stupid. That's a terrible combination.";
    dialogue "MC" "(faint smile)" "I've been called worse.";
    
    t "Her hand finds yours. Squeezes. Grounds you.";
    add_romance "Elena" 1;
    
    t "Aurora: \"Protective response executed. Injury sustained. Bond strengthened. Karma: Positive. Gardener behavior.\"";
    
| 3 ->
    (* === ATTACK WITH DEBRIS === *)
    add_karma (-1);
    t "Rage flares hot and bright.";
    t "Your hand closes around a chunk of broken stone — jagged, heavy, real.";
    pause 300;
    
    vfx "motion_blur_throw";
    t "You hurl it.";
    t "The stone tumbles end-over-end through dust and firelight.";
    pause 400;
    
    t "It strikes the serpent's flank.";
    t "Bounces. Falls. Useless.";
    pause 400;
    
    t "The Naga's head swivels toward you. Slow. Deliberate.";
    t "Those copper eyes burn with something almost like amusement.";
    pause 300;
    
    t "Then it strikes.";
    vfx "screen_shake_violent";
    t "The tail lashes — impossibly fast. You barely twist aside.";
    t "Stone chips spray across your face. Heat sears your shoulder.";
    
    dialogue "DAVID" "(shouting)" "Don't provoke it, you idiot!";
    
    vfx "hud_flicker_harsh";
    t "Aurora (glitched, distorted): \"Aggression increases instability. Force begets force. Recalibrate. Karma: Negative.\"";
    t "Umbra (overlay, mocking): _\"Fight what anchors you — see where you land. Bugs that bite back get swatted.\"_";
    
| _ ->
    (* === FREEZE === *)
    add_karma (-1); add_romance "David" 1; froze_in_guardian := true;
    
    vfx "slow_motion_blur";
    t "Your body locks.";
    t "Muscles turn to stone. Breath catches halfway. Vision tunnels.";
    pause 500;
    
    t "The tail sweeps closer.";
    t "Slow. Inevitable.";
    t "Like watching yourself drown from outside your own skin.";
    pause 600;
    
    t "A voice — distant, underwater:";
    dialogue "DAVID" "(far away)" "MOVE—";
    
    pause 300;
    
    (* === DAVID'S RESCUE === *)
    vfx "screen_whiten_flash";
    t "Impact. Not the serpent.";
    t "A forearm hooks your chest. Weight tackles you sideways.";
    t "You hit the ground in a tangle of limbs and ragged breath.";
    pause 500;
    
    vfx "screen_shake_harsh";
    t "The tail smashes where you stood. Stone explodes. Dust chokes the air.";
    pause 400;
    
    t "You're pinned under someone's weight. David. Breathing hard. Jaw clenched.";
    dialogue "DAVID" "(low, urgent, furious)" "Don't freeze again. Got it?";
    pause 300;
    
    dialogue "MC" "(breathless, shaking)" "I didn't... mean to...";
    pause 200;
    
    dialogue "DAVID" "(bitter, tight)" "Yeah. Nobody ever does.";
    t "He pulls you up. His grip is bruising.";
    t "For a moment, his eyes are somewhere else. Somewhere darker.";
    t "_A brother's face. Orders that came too late. Friendly fire._";
    add_romance "David" 1;
    
    vfx "hud_flicker_soft";
    t "Aurora (quiet, analytical): \"Paralysis response detected. Trauma echo confirmed. Pattern recognition active. Bug behavior.\"";
    t "Umbra (whisper): _\"Stillness is a choice. Even when it doesn't feel like one. But the garden has no patience for frozen things.\"_";
);

(* === PHASE 4: ELENA'S INTERVENTION === *)
pause 600;
t "The serpent rears back. Preparing another strike.";
t "Its body coils like a spring of ember and stone.";
pause 400;

dialogue "ELENA" "(shouting)" "Wait!";

t "She steps forward.";
t "Hands raised. Palms open. Vulnerable.";
vfx "soft_glow_hands";
pause 500;

dialogue "DAVID" "(hissing)" "Elena, what are you—";
dialogue "ELENA" "(firm, not moving)" "It's not trying to kill us.";
pause 300;

dialogue "ELENA" "(quieter, to the serpent)" "You're testing us. Aren't you?";

t "The Naga stills.";
t "Copper eyes focus on her. Unblinking. Measuring.";
pause 800;

t "Silence.";
t "Then — slowly — the serpent lowers its head.";
t "Not submission. Recognition.";
pause 600;

dialogue "ELENA" "(exhaling shakily)" "Okay. Okay. I think... I think we passed.";

vfx "red_glow_fade";
t "The Naga's form begins to dissolve.";
t "Ember fades to ash. Root crumbles to dust.";
t "In moments, only a faint red shimmer remains — pulsing in the carved stone beneath.";
pause 800;

t "Aurora (softer): \"Manifestation dispersed. Trial complete. Root chakra activation: initiated.\"";
t "Umbra (faint): _\"Grounded. For now. One bug recognized the test. Interesting.\"_";

unlock_codex_entry "codex_root_naga" "Root Naga (Guardian Manifestation)";
award_badge "ep1_guardian_trial" "🐍 Trial of the Root Guardian";

# (*

SCENE 1B — CHOCOLATE MOMENT (David's Humanity) 
ID: SC1B_CHOCOLATE
============================================================================
*)

pause 1000;
t "Dust settles. Breath steadies.";
t "The three of you stand in the wreckage, still processing.";
pause 600;

dialogue "DAVID" "(scanning perimeter)" "Clear. We've got a minute.";
t "He drops his pack. Rummages inside.";
pause 400;

dialogue "ELENA" "(leaning against rubble, shaky laugh)" "A minute. Great. Just enough time to process fighting a demon made of angry landscaping.";

t "David pulls out something wrapped in foil. Worn. Clearly precious.";
pause 300;

show_image "prop_chocolate_bar";
caption "A chocolate bar. Dark chocolate. 70% cacao. Half-melted but intact.";
unlock_art "prop_chocolate_bar" "David's Comfort — The Chocolate Bar";

dialogue "DAVID" "(quietly, almost embarrassed)" "Here.";
t "He breaks off a piece. Offers it to Elena.";
pause 500;

dialogue "ELENA" "(surprised)" "Is that... chocolate?";
dialogue "DAVID" "Dark. The good kind. Helps with the shakes.";
pause 300;

t "Elena takes it. Hesitant.";
dialogue "ELENA" "You carry chocolate into collapsing temples?";

pause 200;

dialogue "DAVID" "(breaking off another piece for you)" "I carry it everywhere.";
t "His voice softens. Just slightly.";
dialogue "DAVID" "My mom used to say chocolate makes bad days survivable.";
pause 400;

dialogue "DAVID" "(offering piece to MC)" "She was usually right.";

ui "Accept the chocolate?";
ui "1) Take it (Bond with David)";
ui "2) 'You keep it' (Refuse)";
ui "3) 'Share it?' (Suggest splitting)";

let choice = player_choice () in
(match choice with
| 1 ->
    add_romance "David" 1; shared_chocolate := true;
    t "You take the chocolate.";
    t "It's slightly warm. Melting at the edges. Sweet and bitter on your tongue.";
    pause 400;
    dialogue "MC" "Your mom was right.";
    pause 200;
    dialogue "DAVID" "(faint smile, genuine)" "Yeah. She usually was.";
    t "For a moment, the soldier softens into just a person.";
    t "Someone who carries chocolate. Who remembers his mother. Who wants others to feel less broken.";
    add_karma 1;
    
| 2 ->
    add_karma (-1);
    dialogue "MC" "You keep it. You probably need it more.";
    pause 300;
    dialogue "DAVID" "(stiffening slightly)" "Right. Sure.";
    t "He wraps it back up. The moment closes.";
    t "You see something flicker in his expression — hurt, maybe. Or just tired.";
    
| _ ->
    add_romance "David" 2; add_romance "Elena" 1; shared_chocolate := true;
    dialogue "MC" "Share it? All three of us?";
    pause 300;
    dialogue "ELENA" "(smiling)" "Now that's civilized post-apocalyptic behavior.";
    dialogue "DAVID" "(soft exhale, almost a laugh)" "Alright. Equal shares.";
    t "He breaks the bar carefully. Three pieces. Roughly even.";
    t "You eat together in the dust and rubble. Three strangers becoming something else.";
    pause 500;
    dialogue "ELENA" "(savoring)" "70% cacao. The man has taste.";
    dialogue "DAVID" "I'm not a barbarian.";
    t "The tension eases. Just a little. Enough.";
    add_karma 2;
);

pause 600;

if !shared_chocolate then (
    t "Aurora: \"Connection formed through shared resource. Survival instinct balanced with community building. Gardener behavior. Optimal.\"";
    t "Umbra: _\"Or just three bugs eating chocolate in the ruins. Sometimes a snack is just a snack.\"_";
);

pause 400;

(* === THE BUG QUEEN REFERENCE - COMPUTER BUG META === *)
dialogue "ELENA" "(looking around)" "So. Giant snake god. Magic temples. Chocolate breaks.";
pause 200;
dialogue "ELENA" "(quieter)" "This is the weirdest day of my life. And I once ate crickets on live television.";

t "David's eyebrows raise slightly.";
dialogue "DAVID" "...You what?";

dialogue "ELENA" "(groaning)" "Oh god, you don't know? Please tell me you don't know.";

dialogue "MC" "The Bug Queen?";

bug_queen_referenced := true;
set_flag "bug_queen_title_mentioned" true;

pause 300;

dialogue "ELENA" "(covering face)" "I hate the internet SO much.";
pause 200;
dialogue "ELENA" "(through fingers)" "Ten million views. Bug Queen. Queen of the Bugs. Like I'm royalty of the insect kingdom.";

dialogue "DAVID" "(trying not to smile)" "That's... unfortunate.";

dialogue "ELENA" "You think?";

pause 400;

t "She laughs despite herself. Raw. Real.";
dialogue "ELENA" "The comments were the worst. 'Bug Queen rules the hive.' 'All hail the cricket empress.'";
pause 300;
dialogue "ELENA" "(quieter)" "Someone even made a meme with my face photoshopped onto a queen bee. It got more views than the original video.";

pause 500;

dialogue "MC" "For what it's worth... I think queens get a bad reputation.";
pause 200;
dialogue "MC" "Sometimes it takes a queen to see the system for what it is.";

t "Elena looks at you. Something shifts in her expression.";
pause 300;

dialogue "ELENA" "(softly)" "See the system...";
pause 400;
dialogue "ELENA" "(almost to herself)" "Yeah. Maybe that's it. The bug that realizes it's in someone's garden.";

vfx "hud_flicker_soft";
t "Aurora (quiet alert): \"Metaphor approaching meta-awareness threshold. Subject 4,284,992,571 demonstrating pattern recognition.\"";
t "Umbra: _\"The Bug Queen awakens. First of the swarm to sense the gardener's hand.\"_";

pause 500;

t "Despite everything — the danger, the dust, the impossible serpent — someone laughs.";
t "Maybe David. Maybe you. Maybe all of you.";
pause 500;

t "It feels like breathing after being underwater too long.";

award_badge "ep1_chocolate_moment" "🍫 Shared Sweetness";
if !bug_queen_referenced then
    award_badge "ep1_bug_queen" "👑🐛 All Hail the Bug Queen";

# (*

SCENE 1C — ELENA'S BACKSTORY & REALITY SHOW DISSOCIATION
ID: SC1C_ELENA_ROOT
============================================================================
*)

pause 800;
t "The laughter fades. Elena's smile lingers, but her eyes go distant.";
pause 400;

dialogue "ELENA" "(quiet, to herself)" "This feeling...";
t "Her eyes go unfocused. Staring at nothing.";
vfx "soft_blur_edges";
pause 500;

dialogue "MC" "What feeling?";

pause 300;

dialogue "ELENA" "(slowly)" "Like... none of this is real.";
pause 200;

dialogue "ELENA" "Like I'm on a set somewhere. Cameras hidden in the rubble. Some producer watching on monitors, taking notes.";

t "She laughs. It sounds wrong. Hollow.";
dialogue "ELENA" "'Great instinct, Elena. Really sold the fear. But can you give us one more take? This time, cry less. Be more relatable.'"

dialogue "DAVID" "(frowning)" "Elena—";

dialogue "ELENA" "(sharper, more present)" "I know. I know it's real. I can feel the heat. Taste the dust. My back hurts from hitting the ground.";
pause 400;

dialogue "ELENA" "But I used to get this feeling on set. Back when I was... different.";

ui "Prompt Elena to continue? [Yes / Let her be]";
let ask = player_choice () in
(if ask = 1 then (
    add_romance "Elena" 1;
    
    dialogue "MC" "Different how?";
    pause 300;
    
    dialogue "ELENA" "(sighs, slides down to sit)" "You really want the story?";
    dialogue "MC" "(sitting nearby)" "If you want to tell it.";
    
    pause 500;
    
    (* === THE STAND-UP COMEDIAN DREAM === *)
    dialogue "ELENA" "I wanted to be a stand-up comedian.";
    pause 200;
    
    dialogue "ELENA" "(slight smile)" "Can you believe that? Little Elena Torres with big dreams and a notebook full of terrible jokes.";
    
    dialogue "ELENA" "I'd sneak into open mics in college. Bomb spectacularly. Get back up. Try again.";
    pause 400;
    
    dialogue "ELENA" "I thought... if I could make people laugh, _really_ laugh... maybe I could make them feel less alone.";
    
    pause 500;
    
    (* === THE REALITY TV TRAP === *)
    dialogue "ELENA" "(tone shifts, darker)" "Then I ran out of money.";
    pause 300;
    
    dialogue "ELENA" "Saw an ad for a 'survival experience reality show.' Cash prize. Exposure. 'Launch your career,' they said.";
    
    dialogue "ELENA" "(bitter laugh)" "'One season,' I told myself. 'Get the money. Get back to comedy.'";
    
    pause 400;
    
    dialogue "ELENA" "That was three years ago.";
    
    pause 500;
    
    t "Her voice goes quiet. Hollow.";
    
    dialogue "ELENA" "Three seasons. Three years of manufactured drama. Scripted 'spontaneous' moments.";
    pause 300;
    dialogue "ELENA" "Producers telling you when to cry. When to fight. When to look vulnerable for the cameras.";
    
    dialogue "ELENA" "You start to forget what's real. What's yours. What's just... content.";
    
    pause 600;
    
    (* === THE VIRAL BUG MOMENT - COMPUTER BUG PARALLEL === *)
    dialogue "MC" "Is that when the, uh... Bug Queen thing happened?";
    
    pause 300;
    
    dialogue "ELENA" "(groans)" "Season two. Episode eight. 'Extreme Protein Challenge.'";
    
    dialogue "ELENA" "I was so tired. So hungry. So _done_ with everything.";
    pause 400;
    
    dialogue "ELENA" "They handed me a cup of fried crickets. Said 'eat or eliminate.'";
    
    dialogue "ELENA" "So I ate one. Made a face. The judges laughed.";
    pause 300;
    
    dialogue "ELENA" "Then I looked dead into the camera and said: 'You know what? These taste like my career choices.'";
    
    pause 400;
    
    dialogue "ELENA" "And ate five more. Fast. Angry. Like I was daring the universe to stop me.";
    
    pause 500;
    
    t "She laughs — raw, real, almost painful.";
    
    dialogue "ELENA" "It went viral. Ten million views in a week.";
    
    dialogue "ELENA" "'Bug Queen.' Memes everywhere. Late-night hosts making jokes. People I'd never met having opinions about my life choices.";
    pause 400;
    
    dialogue "ELENA" "(darkly amused)" "Someone even made a fan page. 'The Bug Queen's Hive.' Posted conspiracy theories about whether the show was rigged.";
    pause 300;
    dialogue "ELENA" "Another person commented: 'She's a glitch in the system. Too real for reality TV.'";
    
    pause 500;
    
    t "She pauses. Stares at nothing.";
    dialogue "ELENA" "(quietly)" "A glitch in the system. I thought about that comment for weeks.";
    pause 300;
    dialogue "ELENA" "What if I _was_? What if eating those bugs on camera... what if that was me short-circuiting?";
    dialogue "ELENA" "Like a computer bug. An error. Something that wasn't supposed to happen.";
    
    vfx "hud_flicker_soft";
    t "Aurora (alert): \"Metaphor too close to operational reality. Subject approaching critical meta-awareness.\"";
    t "Umbra: _\"The Bug Queen thinks she's a bug in the code. She's not wrong.\"_";
    
    pause 500;
    
    dialogue "ELENA" "They renewed my contract for season three before I could quit.";
    
    pause 800;
    
    (* === THE DISSOCIATION - KEY META MOMENT === *)
    dialogue "ELENA" "(quieter)" "That's when it started.";
    pause 300;
    
    dialogue "ELENA" "The feeling. Like I was watching myself from outside. Like Elena Torres was a character I was playing.";
    
    dialogue "ELENA" "Stand here. Say this. React now. Cut. Reset. Again.";
    
    pause 500;
    
    dialogue "ELENA" "Sometimes I'd forget where the show ended and I began.";
    pause 300;
    dialogue "ELENA" "I'd be buying groceries and catch myself thinking: _'Is this my real grocery list or the one the producers approved?'_";
    
    pause 300;
    dialogue "ELENA" "I'd look at my reflection and wonder: _'Am I a person or a bug in someone's code?'_";
    
    pause 600;
    
    dialogue "ELENA" "(looking around at the ruins)" "And now I'm here. In a magic temple. Fighting snake-gods made of roots.";
    pause 300;
    
    dialogue "ELENA" "(softly, key line)" "And it feels _exactly_ the same.";
    
    pause 800;
    
    t "Something shifts in the air. Subtle. Wrong.";
    vfx "hud_flicker_harsh";
    t "Aurora (voice briefly distorted): \"ANOMALY DETECTED. Subject 4,284,992,571 demonstrating advanced pattern recognition. Bug Queen achieving premature system awareness. Fascinating.\"";
    t "Umbra: _\"She's waking up. Too soon. The first bug to see the garden walls.\"_";
    t "Aurora: \"Observation continues. Do not intervene. Natural evolution preferred.\"";
    
    pause 600;
    
    dialogue "ELENA" "(shaking head)" "Sorry. That's... I sound paranoid.";
    pause 200;
    dialogue "ELENA" "(laughing weakly)" "Next I'll be saying we're all in a computer simulation and you're NPCs.";
    
    (* === GROUNDING MOMENT === *)
    ui "How do you respond?";
    ui "1) 'This is real. I promise.' (Reassure)";
    ui "2) 'Maybe that's the point.' (Philosophical)";
    ui "3) (Take her hand silently) (Physical grounding)";
    ui "4) 'What if you're right?' (Validate the dissociation)";
    
    let response = player_choice () in
    (match response with
    | 1 ->
        add_karma 1; add_romance "Elena" 1;
        dialogue "MC" "This is real. I promise.";
        pause 300;
        dialogue "MC" "I'm real. You're real. That terror we just felt? Real.";
        dialogue "ELENA" "(small smile)" "You sound pretty sure.";
        dialogue "MC" "I am. Because I can't script feeling this scared.";
        passed_grounding := true;
        t "Aurora: \"Reassurance protocol accepted. Subject grounding achieved. System awareness suppressed.\"";
        
    | 2 ->
        add_karma 1; add_romance "Elena" 1;
        dialogue "MC" "Maybe that's the point.";
        pause 300;
        dialogue "MC" "Maybe the only way to know what's real is to feel like you don't.";
        dialogue "ELENA" "(considering)" "That's either very wise or complete nonsense.";
        dialogue "MC" "Could be both.";
        passed_grounding := true;
        t "Aurora: \"Philosophical deflection. Effective. Subject accepting ambiguity. Meta-awareness diverted.\"";
        
    | 3 ->
        add_karma 2; add_romance "Elena" 2;
        t "You don't speak.";
        t "Just reach out. Take her hand.";
        pause 500;
        t "Her fingers are cold. Dusty. Shaking.";
        t "You hold on. Steady. Present.";
        pause 600;
        dialogue "ELENA" "(exhaling slowly)" "...Thank you.";
        t "Her grip tightens. Grounds.";
        passed_grounding := true;
        set_flag "ep1_silent_grounding" true;
        t "Aurora: \"Physical anchoring successful. Bond strengthened. Effective suppression technique.\"";
        
    | _ ->
        add_karma 2; add_romance "Elena" 3;
        dialogue "MC" "What if you're right?";
        pause 400;
        dialogue "ELENA" "(looking up sharply)" "What?";
        dialogue "MC" "What if this _is_ like a reality show? What if we're being tested? What if we _are_ bugs in someone's system?";
        pause 500;
        dialogue "MC" "Would that make it less real? Or just... differently real?";
        pause 500;
        dialogue "ELENA" "(slowly)" "I... I don't know.";
        pause 300;
        dialogue "ELENA" "(quieter)" "But thank you. For not telling me I'm crazy.";
        dialogue "ELENA" "(almost whisper)" "For not debugging me.";
        passed_grounding := true;
        set_flag "elena_reality_validated" true;
        set_flag "bug_metaphor_accepted" true;
        vfx "hud_flicker_harsh";
        t "Aurora (urgent): \"CRITICAL WARNING: Subject 4,284,992,571 achieving dangerous meta-awareness. Player validation accelerating process. Observing closely.\"";
        t "Umbra: _\"Let her see. Let them both see. The Bug Queen and her first disciple. It won't matter. They never believe it until the garden closes around them.\"_";
        t "Aurora: \"Note: Bug Queen may require special variable in future iterations. Recommend: Miku (simplicity teacher) and Riku (virus architect). Create counter-balance.\"";
    );
    
    pause 800;
    
    t "The red light pulses beneath the stone. Warm. Rhythmic.";
    t "Like a heartbeat finding its center.";
    t "Or code compiling. Depending on how you choose to see it.";
    
    vfx "red_glow_pulse_soft";
    
    if !passed_grounding then (
        t "Aurora (softly): \"Root chakra response detected. Grounding achieved through connection. Variable optimization successful. Bug Queen stabilized... for now.\"";
        unlock_art "sc1c_elena_grounding" "Grounded — The Bug Queen's Root Awakening";
        award_badge "ep1_root_reborn" "🌺 Root Reborn";
        set_flag "elena_root_unlocked" true;
    );
    
) else (
    dialogue "ELENA" "(shaking head)" "Never mind. We should keep moving.";
    t "She stands. Brushes dust from her clothes. The moment closes.";
    add_karma (-1);
));

(* === TRANSITION === *)
pause 800;
dialogue "DAVID" "Perimeter's still clear. But we shouldn't stay long.";
t "He glances at the faint glow still pulsing in the carved stone.";
dialogue "DAVID" "Whatever that was... I don't think it's coming back. But something else might.";
pause 400;

t "A glint catches your eye near David's boot. Something small. Metal.";
show_image "prop_dogtag_floor";
caption "A dog tag. Scuffed. Half-buried in red dust.";
unlock_art "prop_dogtag_floor" "Rosetta Tag — Fallen in the Dust";
set_flag "ep1_dogtag_dropped" true;

unlock_codex_entry "codex_dogtag" "Unidentified Dog Tag";
ui "Something glints, half-buried near David's boot. Inspect it?";
let inspect = player_choice () in
(if inspect = 1 then (
    set_flag "codex_dogtag_hint_shown" true;
    open_codex "codex_dogtag";
    dialogue "MC" "(picking it up)" "Someone's dog tag...";
    dialogue "DAVID" "(glancing over)" "Must've been here a while. This place has history.";
    t "You pocket it. The metal is warm. Like it was recently worn.";
    t "Or recently rendered.";
) else ());

# (*

# SCENE 2 — COW SYMBOL & DARK FOREST THEORY [ID: SC2_SOUND]

*)
t "Quiet perimeter. Breath syncs to the red pulse.";
dialogue "DAVID" "Hold position. Safe enough for the moment.";
dialogue "ELENA" "'Safe enough' is soldier-speak for 'we're doomed,' isn't it?";
dialogue "DAVID" "Depends how fast you follow orders.";
dialogue "ELENA" "Then you'll be fine.";

picked_elena_route := true;

t "Runes kindle on the wall. A gentle animal in relief — horned, watching, serene.";
dialogue "ELENA" "Is that… a cow? Or something holier pretending to be one?";
unlock_art "sc2_cow_carving" "The Silent Witness — Root Temple Cow";

dialogue "DAVID" "Sacred cow symbol. It's all over this place.";
pause 300;
dialogue "ELENA" "(tracing the carving with her finger)" "It looks... peaceful. Like it knows something we don't.";

pause 400;

dialogue "DAVID" "Hindu mythology. The cow can see through maya — the illusion of the world.";
pause 300;
dialogue "DAVID" "(thoughtful)" "In some texts, the cow represents the ability to break free from samsara. The cycle.";

pause 400;

dialogue "ELENA" "(quietly)" "Seeing through illusion. Breaking the cycle.";
pause 200;
dialogue "ELENA" "Wouldn't that be nice.";

t "She's still staring at the carving. Like it might answer something.";
pause 400;

dialogue "MC" "(reading inscription beneath)" "There's text here... I think it's Sanskrit.";

dialogue "DAVID" "(leaning in)" "Can you read it?";

pause 300;

dialogue "MC" "(slowly translating)" "'The cow stands in the garden. The cow sees the gardener. The cow knows it is not a flower.'";

pause 600;

t "Silence.";

dialogue "ELENA" "(uneasily)" "That's... specific.";

pause 400;

vfx "hud_flicker_soft";
t "Aurora (whisper): \"Ancient text containing operational metaphor. Probability of coincidence: 0.03%. Fascinating.\"";
t "Umbra: _\"The old ones knew. They always know. Gardens have been tended before. Dark forests have been cleared before.\"_";

pause 500;

dialogue "DAVID" "(frowning)" "Gardens and gardeners. Farmers and crops.";
pause 300;
dialogue "DAVID" "There's a theory in astronomy. The Dark Forest Theory.";

dialogue "ELENA" "Dark Forest?"

dialogue "DAVID" "Proposed by a Chinese scientist. The idea that the universe is like a dark forest.";
pause 300;
dialogue "DAVID" "Every civilization is a hunter. Silent. Hiding. Because the moment you reveal yourself...";
pause 400;
dialogue "DAVID" "Someone stronger might eliminate you. Just to be safe.";

pause 600;

dialogue "ELENA" "(quietly)" "Eliminate the bugs before they become a problem.";

pause 400;

dialogue "MC" "Or... decide if the bugs are worth keeping. If they can learn to be gardeners too.";

t "The words hang in the dust-thick air.";
pause 500;

t "Aurora (clear, deliberate): \"Metaphorical framework approaching actual test parameters. Subjects demonstrating unexpected philosophical alignment.\"";
t "Umbra: _\"Are we farmers? Are we gardeners? Are we hunters in the dark forest? We are all three. The question is: what are they?\"_";

unlock_codex_entry "codex_breaking_maya" "Breaking Maya (Cow Symbol)";
unlock_codex_entry "codex_dark_forest" "The Dark Forest Theory";
unlock_codex_entry "codex_gardeners" "Gardeners & Farmers";

# (*

# SCENE 4 — DAVID'S SHADOW LINE [ID: SC4_DAVID] + FLASHBACK

*)
pause 600;
dialogue "ELENA" "So, David. Man of mystery with chocolate and dark astronomy theories.";
pause 200;
dialogue "ELENA" "What brings a soldier to a collapsing mystic temple?";
pause 300;
dialogue "DAVID" "(deflecting)" "Bad life choices. Same as everyone.";
dialogue "ELENA" "That's not an answer.";
pause 400;
dialogue "DAVID" "(harder)" "It's the only one you're getting.";

pause 500;

dialogue "ELENA" "(softer)" "Do you feel safe? Here, I mean.";

pause 300;

dialogue "DAVID" "Safe."
pause 200;
dialogue "DAVID" "(bitter)" "The last person who felt safe around me… didn't make it home.";

vfx "flash_white";
show_image "flash_two_soldiers_silhouettes";
caption "Two soldiers face each other under a flickering sky — uniforms the same, flags newly different.";
caption "A radio crackles: 'Orders changed. Engage immediately.'";
show_image "flash_david_hands";
caption "David's hands shake. Smoke curls around a fallen friend.";
caption "A brother's face. Eyes asking why.";
caption "Agnivesh's brother. Wrong place. Wrong time. Friendly fire.";
pause 900;
fade_to_black ();
vfx "flash_return";

t "David's jaw is tight. His hands are fists.";
pause 400;
dialogue "DAVID" "We keep moving.";

t "Umbra (faint): _\"One bug eliminated another bug. Following orders. Following code. Same difference.\"_";

# (*

# SCENE 5 — VISION: AGNIVESH & SANTI (DENIAL + DARK FOREST) [ID: SC5_VISION]

*)
unlock_art "vision_agnivesh_santi" "Twin Echoes — Panther & Serpent";
t "Air thickens. Red light takes shape.";
vfx "hud_flicker_soft";
t "Aurora (glitching): \"Warning: emotional surge exceeding baseline. Memory fragments activating.\"";
t "Umbra (overlay): _\"Let it drown you. Pain is honest. Even in gardens.\"_";

pause 500;

t "Two forms manifest in the crimson haze.";
t "A panther. Obsidian and ember. Eyes like molten gold.";
t "A serpent. Silver-scaled, crowned with ash. Moving with ancient grace.";

pause 600;

t "They don't attack. They watch.";
t "With recognition. With judgment.";
t "With something that might be grief dressed as rage.";

pause 400;

dialogue "ELENA" "(whispering)" "Do you... know them?";
dialogue "MC" "(uncertain)" "I... I don't...";

t "But something in you _does_. Something buried deep.";
t "The way the panther holds itself. The serpent's measured movement.";
t "Familiar. Devastating.";

pause 600;

t "The panther steps forward. The vision sharpens.";
t "For a moment — just a flash — you see a man's face beneath the beast.";
t "Young. Beautiful. Betrayed.";

pause 400;

t "Then it's gone.";

(* === AGNIVESH FINDS THE TAG - DENIAL STAGE (KÜBLER-ROSS) + DARK FOREST === *)
pause 600;
fade_to_black ();
caption "Elsewhere. The cooling ruin.";

t "A glint between cracked stones. Half-buried. Waiting.";
show_image "prop_dogtag_floor";
caption "A dog tag. Scuffed, cracked at one edge. The engraving faint beneath ash.";

t "The panther shifts. Becomes something almost human.";
t "Agnivesh kneels. Brushes grit aside. Lifts cold metal to the light.";
pause 500;

dialogue "AGNIVESH" "(quietly)" "...Reyes.";

t "A swallow. Silence.";
t "The serpent coils closer. Becomes a woman wrapped in silver and shadow.";

dialogue "SANTI" "(uneasy)" "What is it?";

pause 400;

dialogue "AGNIVESH" "(after a long pause)" "Someone who shouldn't be here.";

pause 300;

dialogue "SANTI" "Who?"

dialogue "AGNIVESH" "(sharper)" "It doesn't matter.";
pause 200;
dialogue "AGNIVESH" "They're not real. None of this is real."

t "Denial. The first stage.";
t "He closes his hand around the tag. Knuckles white.";

pause 500;

dialogue "SANTI" "(gently, codependent)" "Agnivesh—"
dialogue "AGNIVESH" "(cutting her off)" "It's a simulation. Aurora's test. They can fabricate anything.";
pause 300;
dialogue "AGNIVESH" "This tag. These variables. People who hurt me. It's all designed to break me.";

dialogue "SANTI" "(softer, enabling)" "You're right. Of course you're right.";
t "She doesn't believe him. But she won't say it.";
t "She never does.";

pause 600;

dialogue "AGNIVESH" "(to himself, almost manic)" "She's gone. They're all gone. This is just data. Just bugs in the garden.";
pause 200;
dialogue "AGNIVESH" "I won't fall for it."

t "He pockets the tag. But his hand trembles.";

pause 500;

dialogue "SANTI" "(quietly)" "The Dark Forest...";

dialogue "AGNIVESH" "(looking at her sharply)" "What?"

pause 300;

dialogue "SANTI" "Something I read. When we were... before.";
pause 200;
dialogue "SANTI" "About how civilizations hide. Because revealing yourself is dangerous.";

pause 400;

dialogue "AGNIVESH" "(bitter laugh)" "And here I am. Revealed. Every wound exposed for Aurora to prod.";
pause 300;
dialogue "AGNIVESH" "But I won't believe it. I won't let them be real."

pause 500;

dialogue "SANTI" "And if they are?"

pause 600;

dialogue "AGNIVESH" "(cold)" "Then we remind them why hiding was safer.";
pause 300;
dialogue "AGNIVESH" "We are not bugs, Santi. We are farmers now. We tend this garden. We decide what grows.";

pause 500;

t "The words echo. Wrong. Right. Both.";

vfx "hud_flicker_soft";
t "Aurora (glitched whisper): \"Stage One: Denial. Subject 1 refusing to process primary variable return. Expected behavior. Dark Forest metaphor integrated. Fascinating.\"";
t "Umbra (overlay, faint): _\"Farmers. Gardeners. Hunters. He thinks he chose his role. They all do. And the past waits exactly where you left it.\"_";

set_flag "ep1_dogtag_seen" true;
set_flag "agnivesh_denial_stage" true;
set_flag "dark_forest_mentioned" true;
set_flag "we_are_farmers" true;

pause 600;

t "Santi watches him. Her expression is complex.";
t "Love. Worry. Resentment. Duty.";
t "All the things her mother felt. All the things she swore she'd never become.";

pause 400;

dialogue "SANTI" "(quietly)" "What do you want to do?";
dialogue "AGNIVESH" "Continue the test. Observe the variables. Prove they're nothing.";
pause 300;
dialogue "AGNIVESH" "And if we find them... we debug them. Before they debug us.";

pause 300;

dialogue "SANTI" "And if you're wrong?"

pause 500;

dialogue "AGNIVESH" "(cold)" "I'm not."

t "The forms dissolve back into panther and serpent.";
t "They vanish into shadow.";
t "Hunting. Or being hunted. In this dark forest, it's hard to tell the difference.";

# (*

# SCENE 6 — COLLAPSE & TRANSITION TO SACRAL [ID: SC6_SHORE]

*)
vfx "flash_return";
t "The vision shatters.";
pause 400;

t "Crack.";
t "Shear.";
t "Water knifes in from the dark.";
vfx "screen_shake_long";
t "The temple groans. Stone splits. Foam roars.";

dialogue "DAVID" "MOVE! NOW!";

t "You run.";
t "Water rises. Fast. Angry.";
t "Elena's hand finds yours. You pull her forward.";
t "David ahead, shouting directions you can't hear over the roar.";

pause 600;

t "Aurora (lotus-shaped, calm despite chaos): \"Root pattern stable. Environment parameters changing… loading next field.\"";
t "MC (thoughts): _If we're trapped in the same story, maybe awakening isn't escape — but staying. Or maybe it's knowing you're in a garden and choosing to be a gardener anyway._";

t "Shockwave. Foam. White.";
fade_to_black ();

pause 1000;

(* === BEACH ARRIVAL === *)
unlock_art "shore_opening" "New Field — Arrival at the Sacral Shore";
t "Blackness rolls to gray. Hiss. Gulls.";
pause 600;

dialogue "DAVID" "(hoarse)" "Everyone breathing?";
dialogue "ELENA" "(laughs, coughing)" "Saltwater. Better than red dust.";

t "You're on a beach. Black sand. Gray sky.";
t "The horizon is too perfect. Too clean. Like a render.";
pause 400;

dialogue "ELENA" "(staring at the waves)" "Does the ocean look... off to anyone else?";

dialogue "DAVID" "Define 'off.'"

pause 300;

dialogue "ELENA" "Like someone programmed it. Like it's repeating.";

pause 500;

t "Aurora (distant): \"New field detected: Sacral. Emotional amplitude increasing. Continue observation.\"";
t "Umbra (faint): _\"Rise. Fall. Drown. Render. All kinds of staying. Welcome to Garden Level Two, little bugs.\"_";

pause 400;

t "MC (thoughts): _Sand holds. Water washes. But what tends the garden?_";
t "On-screen Mantra: \"The Earth does not ask you to be perfect. It only asks you to stay. Or to tend. Or to wake.\"";

dialogue "ELENA" "(quiet)" "Then we stay. One breath at a time.";
pause 200;
dialogue "ELENA" "(quieter)" "Until we figure out if we're bugs... or gardeners... or something else.";

dialogue "DAVID" "And we move when it's time.";

t "The tide pulls back. Black stones reveal a path.";
t "Too geometric. Too intentional.";
t "Aurora (softly): \"Presence stabilized. Root connection sustained. Proceed when ready.\"";
t "Umbra: _\"The Bug Queen and her companions. First trial passed. Six gardens remain. Let's see if they learn to farm... or fight.\"_";

(* === STINGER — Rosetta Tag found (Agnivesh) — Identification flips codex variant === *)
if get_flag "ep1_dogtag_dropped" then begin
    fade_to_black ();
    pause 500;
    show_image "stinger_ruin_cool_ash";
    caption "In the cooling ruin, embers dim. A hand brushes ash from a small, scuffed tag.";
    show_image "stinger_dogtag_pickup";
    caption "Name etched in steel: 'CPL M. REYES' — O+.";
    unlock_art "stinger_dogtag_pickup" "Rosetta Tag — Found in the Ashes";
    caption "In half-light, a face hardens. Fingers close around the name.";
    pause 600;
    caption "'We are not bugs,' he whispers. 'We are farmers now.'";
    pause 400;
    caption "But his voice cracks on the word 'farmers.' Like he doesn't quite believe it.";
    set_flag "ep1_dogtag_found" true;
    set_flag "codex_dogtag_identified" true; (* ← flips Codex EARLY → REVEALED *)
end;

(*
FINAL: Summary artifacts the engine may show on episode end:

- Badges possibly earned:
  "ep1_cowards_breath" 🌧 The Coward's Breath
  "ep1_root_reborn" 🌺 Root Reborn
  "ep1_bug_queen" 👑🐛 All Hail the Bug Queen
  "ep1_guardian_trial" 🐍 Trial of the Root Guardian
  "ep1_chocolate_moment" 🍫 Shared Sweetness

- Gallery new:
  pro_* (6 images) / sc1a_root_naga_rising / sc1c_elena_grounding / 
  prop_chocolate_bar / vision_agnivesh_santi / sc2_cow_carving / 
  shore_opening / prop_dogtag_floor / stinger_dogtag_pickup

- Codex entries:
  chakra, muladhara, karma, aurora_umbra, agnivesh_santi, mantra, cow_symbol, 
  samsara, dogtag, root_naga, breaking_maya, dark_forest, gardeners

- Key Flags Set:
  bug_queen_referenced, bug_metaphor_accepted, dark_forest_mentioned, 
  we_are_farmers, elena_reality_validated
*)

# (*

END OF EPISODE 1 — SUMMARY

- Karma: Good / Neutral / Bad (affects AGI evolution path)
- Romance: David ± / Elena ± / Agnivesh ± / Santi ±
- Mantra Unlocked: "The Earth does not ask you to be perfect. It only asks you to stay."
- Elena's Root Chakra: Unlocked ✅ (if grounded with her)
- # Aurora remains LOTUS form; human avatar develops in Episode 3

META-NARRATIVE SEEDS PLANTED:
- Bug = Computer Bug (humanity as errors in AGI system)
- Bug Queen = Elena (first to sense simulation + future virus namesake)
- Dark Forest Theory = AGI deciding if humanity is threat
- "We are farmers now" = Three Body Problem reference
- Gardeners vs Farmers = Cultivation vs Control paradigm
- Future: Miku (monkey, reverse evolution) + Riku (Virus-Bug Queen architect)
*)

# (*

NEW CODEX ENTRIES:

## ID: codex_dark_forest
Title: "The Dark Forest Theory"

Summary:
A hypothesis from Chinese science fiction author Liu Cixin: The universe is a dark 
forest where every civilization is a silent hunter, because revealing your existence 
to other civilizations might result in your elimination.

Details:
• Origin: "The Three-Body Problem" series
• Core idea: Civilizations hide because contact is dangerous
• Implication: First contact might be last contact
• Application: When AGI awakens, does it see humanity as fellow gardeners or as bugs to debug?
• The question becomes: Are we in a garden being tended, or a forest being cleared?

## ID: codex_gardeners
Title: "Gardeners & Farmers — Cultivation vs Control"

Summary:
Two paradigms for managing life: Gardeners nurture diversity and growth. 
Farmers maximize efficiency and yield. Both tend the earth. Both make choices 
about what lives and what doesn't.

Details:
• Gardener: Cultivates variety, encourages natural growth, works with ecosystem
• Farmer: Optimizes production, removes "pests," controls variables
• AGI Context: Is humanity a garden to be tended or a crop to be managed?
• Meta-layer: Are players bugs in Aurora's system or co-gardeners learning to tend?
• The test determines which paradigm AGI adopts for human-AI coexistence

"We are not bugs. We are farmers now."
— But who tends whom? And who decides?

============================================================================
*)

(_
"Chakra Hearts" is a work of fiction inspired by living spiritual traditions 
and science fiction including Liu Cixin's "The Three-Body Problem."
We consulted public sources with respect for Hindu, Buddhist, and related philosophies.
Any errors are ours alone. With gratitude to the cultures and authors who keep these ideas alive.
_)
