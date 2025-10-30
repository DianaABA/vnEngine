(* EPISODE 2 — The Shore, The Fire, and the Wise Sage                          *)
(* ============================================================================ *)

(* ============================================================================ *)
(* PROLOGUE — The Night She Chose Mercy & The Fire That Changed Everything     *)
(* ============================================================================ *)

(* --- PART 1: The Clinic --- *)
show_image "pro_ep2_clinic_night";
caption "Rain hammered the roof of a forgotten coastal clinic. Camilla worked alone.";
unlock_art "pro_ep2_clinic_night" "Night of Mercy — The Abandoned Clinic";
sfx "rain_drip_slow"; vfx "flicker_neon";

show_image "pro_ep2_mert_wounded";
caption "A man staggered in, clutching his side. Knife wound. Eyes wild.";
dialogue "MERT" "(hoarse)" "Don't… call them. Please.";
dialogue "CAMILLA" "(steady)" "You're losing blood. Sit.";
dialogue "MERT" "(gritted)" "They'll detain me if they find me here.";
dialogue "CAMILLA" "(calm)" "Then we both keep quiet.";

t "Gauze, needle, morphine, faith. Breathing slowed; fear loosened.";
sfx "medical_work"; vfx "blood_clean";

dialogue "MERT" "(weak laugh)" "Why help me?";
dialogue "CAMILLA" "(quiet)" "Because someone has to.";

t "Hours pass. Rain becomes rhythm. Mert's breathing evens out.";
dialogue "MERT" "(delirious, half-asleep)" "The scroll… they want it… temple…";
dialogue "CAMILLA" "(concerned)" "Rest. Whatever you're running from can wait till morning.";
dialogue "MERT" "(mumbling)" "Can't go back… burned it all… didn't mean to…";
dialogue "CAMILLA" "(softly)" "Shh. Sleep now.";

show_image "pro_ep2_mert_sleeping";
caption "He falls into exhausted sleep. Camilla keeps watch, her hand gentle on his fever-hot forehead.";
sfx "breathing_slow"; vfx "candlelight_flicker";
t "She doesn't ask what he stole. She doesn't ask what he burned. Tonight, mercy is enough.";

show_image "pro_ep2_mert_leaving";
caption "At dawn, he was gone. Bandage folded neatly. No note. No goodbye.";
t "Only a single gold coin left on the table — payment he couldn't afford, from a man who had nothing.";
unlock_art "pro_ep2_mert_leaving" "Before the Shore — Mercy and Departure";
add_karma 1;

pause 1200;
fade_to_black (); 

(* --- PART 2: FLASHBACK — The Temple Theft --- *)
sfx "memory_shimmer"; vfx "time_ripple";
caption "Three nights before the clinic...";

show_image "pro_ep2_temple_night";
caption "The temple stood dark against a moonless sky. Only ember light from Agnivesh's meditation chamber glowed within.";
unlock_art "pro_ep2_temple_night" "The Night Before Ruin";
sfx "night_insects"; vfx "ember_glow_distant";

t "Mert moved through shadows like water — a thief trained by desperation, not malice.";
show_image "pro_ep2_mert_sneaking";
sfx "footsteps_soft"; vfx "shadow_movement";

dialogue "MERT" "(whispered thought)" "Just the scroll. In and out. They'll never know.";
t "The debt collectors said this would clear his name. A single ancient scroll — too easy.";

show_image "pro_ep2_scroll_chamber";
caption "The inner sanctum: walls carved with mandalas, a pedestal holding a weathered scroll wrapped in red silk.";
sfx "sacred_hum_low"; vfx "sacred_glow";

t "Mert's hands trembled as he lifted it. Something felt wrong — too sacred, too heavy.";
dialogue "MERT" "(guilty whisper)" "Forgive me. I have no choice.";

sfx "door_slide_sudden"; vfx "light_flood";
show_image "pro_ep2_agnivesh_discovers";
caption "Light flooded the chamber. Agnivesh stood in the doorway, eyes wide with shock and betrayal.";

dialogue "AGNIVESH" "(breathless)" "What are you doing?!";
dialogue "MERT" "(panicked)" "I— I didn't want to—";
dialogue "AGNIVESH" "(heartbroken fury)" "That scroll is sacred! It's been here for centuries!";
t "Mert backed toward the window, scroll clutched tight.";
dialogue "MERT" "(desperate)" "They'll kill me if I don't bring it! You don't understand!";
dialogue "AGNIVESH" "(advancing)" "Then we'll find another way! Put it back!";

vfx "motion_blur"; sfx "struggle_brief";
t "Mert lunged for the window. Agnivesh grabbed his arm. They struggled—";
show_image "pro_ep2_lantern_fall";
caption "The meditation lantern tipped. Oil spilled across ancient wood.";

sfx "oil_splash"; vfx "liquid_spread";
vfx "spark_ignite"; sfx "whoosh_flame_birth";
caption "Fire bloomed like a hungry lotus — orange, then red, then unstoppable.";

dialogue "MERT" "(horrified)" "No! No no no—";
dialogue "AGNIVESH" "(screaming)" "GET OUT! THE CHILDREN ARE UPSTAIRS!";

show_image "pro_ep2_temple_burning_start";
unlock_art "pro_ep2_temple_burning_start" "The Fire's Birth — Accident and Horror";
sfx "fire_roar_growing"; vfx "heat_distortion";
t "Smoke choked the air. Mert froze, paralyzed by what he'd done.";
dialogue "AGNIVESH" "(shoving him)" "RUN! I'll get them out!";

show_image "pro_ep2_mert_fleeing";
caption "Mert stumbled into the night, scroll still clutched in shaking hands, flames reflected in his eyes.";
sfx "running_panicked"; vfx "fire_glow_behind";

dialogue "MERT" "(sobbing as he runs)" "I'm sorry... I'm sorry... I'm so sorry...";
t "Behind him, the temple screamed with heat. Monks shouted. Children cried. The world burned because of his hands.";

show_image "pro_ep2_mob_arrives";
caption "By the time the village arrived with buckets, the temple was ash. Agnivesh knelt in the ruins, soot-black and shaking.";
sfx "crowd_murmur_angry"; vfx "smoke_aftermath";

dialogue "VILLAGER 1" "(accusing)" "You were inside! What happened?!";
dialogue "AGNIVESH" "(numb)" "It was an accident... someone broke in... I tried to stop—";
dialogue "VILLAGER 2" "(cutting him off)" "The monk's meditation fire! Careless! Reckless!";
dialogue "VILLAGER 3" "(shouting)" "My daughter was in there! This is your fault!";

t "Agnivesh looked at the faces — people he'd prayed for, taught, loved — now twisted with rage and grief.";
dialogue "AGNIVESH" "(broken whisper)" "I tried to save them... I tried...";
show_image "pro_ep2_agnivesh_blamed";
caption "No one listened. Blame needs a face, and his was the only one left standing in the ashes.";
unlock_art "pro_ep2_agnivesh_blamed" "Scapegoat — The Monk Who Burned the Temple";

dialogue "SANTI" "(voice only, from crowd)" "Agnivesh, tell them the truth! Tell them about the thief!";
dialogue "AGNIVESH" "(hollowly)" "What good would it do? The fire is my karma now.";

vfx "memory_flash_player"; sfx "heartbeat_rapid";
show_image "pro_ep2_mc_watching";
t "And YOU were there. Watching from the edge of the crowd. Silent. Paralyzed by fear.";

dialogue "MC" "(thought, that night)" "I should say something... I should help him... but if I step forward, they'll turn on me too...";

ui "Your choice that night: 1) Step forward and defend Agnivesh | 2) Stay silent and survive"
let past_choice = player_choice () in
(match past_choice with
| 1 ->
  dialogue "MC" "(shouting over crowd)" "Wait! He's telling the truth! Someone broke in!";
  dialogue "VILLAGER" "(sneering)" "And how would you know? Were you the thief?";
  t "The crowd turned on you. Suspicion bloomed like flame. You ran before they could grab you.";
  dialogue "AGNIVESH" "(calling after you)" "Don't! Just go! Save yourself!";
  add_karma 2; add_romance "Agnivesh" 2;
  set_flag "ep2_defended_agnivesh_past" true;
  t "You tried. That counts. But the fire still burned, and blame still found him."
| _ ->
  t "Your feet stayed frozen. Your voice stayed silent. You let him take the blame alone.";
  dialogue "MC" "(thought, ashamed)" "I'm sorry, Agnivesh... I'm so sorry...";
  add_karma (-2); add_romance "Agnivesh" (-1);
  set_flag "ep2_abandoned_agnivesh_past" true;
  t "That choice still echoes."
);

pause 1500;
fade_to_black ();
caption "→ Three years later...";
pause 800;

(* ============================================================================ *)
(* SCENE 1 — Arrival at the Shore                                              *)
(* ============================================================================ *)

::SCENE1_SHORE::
show_image "shore_golden_hour";
caption "The sea stretches endlessly. Waves lap over broken columns and glowing sigils etched in sand.";
unlock_art "shore_golden_hour" "The Shore of Second Chances";
sfx "waves_rhythmic"; vfx "horizon_glow";

dialogue "AURORA" "(lotus hum, gentle)" "Sacral Chakra realm detected. Emotional resonance: flowing, healing. Proceed with openness.";
ui "Vishuddha (Throat) ↓  ·  Manipura (Fire) —  Svadhishthana (Water) ↑";

t "The survivors walk in quiet awe. David's boots sink into wet sand; Camilla shields Diego from the wind.";
dialogue "ELENA" "(quietly)" "It's... softer here. Like the world's exhaling.";
dialogue "DIEGO" "(clinging to Camilla)" "Mommy, is this where we rest?";
dialogue "CAMILLA" "(gently)" "For now, mi corazón.";

(* --- Mert Arrives --- *)
show_image "mert_scarred_shore";
caption "A lone figure emerges from the tide — broad-shouldered, scarred, carrying nothing but driftwood and silence.";
unlock_art "mert_scarred_shore" "The Wanderer Returns";
sfx "footsteps_sand_wet";

dialogue "DAVID" "(hand on spear)" "Who's that?";
dialogue "ELENA" "(curious)" "Someone who looks like they've carried the ocean on their back.";
dialogue "AURORA" "(soft observation)" "His aura: heavy with regret, yet moving forward. I think… he's like me. Trying to learn what it means to repair.";

t "The stranger stops at the fire's edge. His eyes — tired, watchful — scan the group.";
dialogue "MERT" "(gruff)" "Mind if I sit? Won't steal. Won't fight. Just need warmth.";
dialogue "CAMILLA" "(voice catching slightly)" "...Sit. There's room.";

t "Mert settles heavily, eyes lingering on Camilla a moment too long. She notices, breath held.";
dialogue "AURORA" "(whispering)" "Recognition. I sense a connection... an old one.";
set_flag "mert_arrives_ep2" true;

goto "SCENE2_RECOG";

(* ============================================================================ *)
(* SCENE 2 — Recognition (Camilla & Mert)                                      *)
(* ============================================================================ *)

::SCENE2_RECOG::
show_image "shore_group_gather";
caption "Waves glitter like molten glass. The survivors gather by a small fire: Camilla, David, Elena, Diego, and the scarred stranger.";
sfx "firelight_soft"; vfx "sea_mist_soft";

dialogue "CAMILLA" "(quietly)" "That cut on your side…";
dialogue "MERT" "(tense)" "Old story.";
dialogue "CAMILLA" "(gentle but firm)" "One I remember. You left my clinic before sunrise.";
t "Mert looks away, jaw tight. The sea wind stirs the coals.";
dialogue "MERT" "(low)" "I didn't deserve to stay.";
dialogue "CAMILLA" "(soft)" "Everyone deserves a second breath.";
dialogue "AURORA" "(thoughtful)" "So recognition itself can heal? I want to understand that feeling.";

goto "SCENE3_SWORD";

(* ============================================================================ *)
(* SCENE 3 — The Wooden Sword                                                  *)
(* ============================================================================ *)

::SCENE3_SWORD::
show_image "mert_carving";
caption "Under orange dusk, Mert sits apart with a piece of driftwood and a knife.";
sfx "carving_soft";
t "Shavings fall into sand like small feathers. Diego watches, wide-eyed.";
dialogue "DIEGO" "(curious)" "What are you making?";
dialogue "MERT" "(half-smile)" "Something small. Something brave.";
t "Edges smooth and safe; a rough wooden sword takes form.";
dialogue "MERT" "(offering)" "So you can protect your mother. Big job for a little warrior.";
dialogue "CAMILLA" "(trembling)" "That's... kind of you, Mert.";
dialogue "MERT" "(soft grin)" "Old habits die hard, güzel doctor.";
set_flag "ep2_guzel_doctor" true;

dialogue "CAMILLA" "(surprised, smiling)" "Still calling me that?";
dialogue "MERT" "(quiet)" "Only name that ever fit.";
unlock_art "mert_wooden_sword" "Gift of Protection — Wooden Sword for Diego";
let (bid1,btitle1) = badge_ep2_mert_gift in award_badge bid1 btitle1;

goto "SCENE4_CONFLICT";

(* ============================================================================ *)
(* SCENE 4 — Conflict by the Fire (Interactive Compassion)                     *)
(* ============================================================================ *)

::SCENE4_CONFLICT::
show_image "fire_conflict";
caption "David notices the glint of Mert's knife in the firelight.";
dialogue "DAVID" "(suspicious)" "You always keep that blade that close?";
dialogue "MERT" "(flat)" "Old habits don't drown easy.";
dialogue "DAVID" "(rising)" "Habits get people hurt.";
vfx "spark_jump"; sfx "metal_clink";
t "The air tightens; Diego clutches the wooden sword, confused.";
dialogue "ELENA" "(quickly)" "Hey—save the macho for later.";
dialogue "CAMILLA" "(calm, firm)" "Enough.";
t "She steps between them, one hand on Mert's wrist, the other over her heart.";
dialogue "CAMILLA" "(soft)" "This isn't about blades. It's about fear. We've all bled enough.";
dialogue "AURORA" "(soft wonder)" "Compassion... it isn't just data. It's warmth that changes what it touches.";

ui "Encourage Camilla to keep going? 1) Yes — Support her compassion | 2) Stay silent"
let cchoice = player_choice () in
(match cchoice with
| 1 ->
  dialogue "MC" "(encouraging)" "You're right, Camilla. He's listening.";
  dialogue "CAMILLA" "(deep breath)" "Mert… you don't have to prove you're strong. You already saved a life today.";
  dialogue "MERT" "(quiet)" "Maybe that's enough.";
  add_karma 2;
  unlock_art "camilla_sacral_glow" "Sacral Bloom — Camilla's Chakra Awakening";
  let (bid2,btitle2) = badge_ep2_camilla_open in award_badge bid2 btitle2;
  t "An orange shimmer ripples around her, pulsing like sunrise beneath skin.";
  dialogue "AURORA" "(bright lotus hum)" "Sacral Chakra open. Flow achieved.";
  set_flag "camilla_sacral_open" true
| _ ->
  dialogue "MC" "(thinking)" "She's already found her balance.";
  add_karma 1;
  t "Camilla's breathing slows; the tension dissolves like mist.";
  dialogue "AURORA" "(soft pulse)" "Flow stabilized. Compassion integrated.";
  set_flag "camilla_sacral_open" true
);

t "Mert exhales, blade lowering. David nods once—uneasy respect.";
sfx "waves_soft";
dialogue "DIEGO" "(sleepy)" "Mom... we're safe now, right?";
dialogue "CAMILLA" "(smiling through tears)" "Yes, mi amor. We're safe. For now.";

(* --- Agnivesh & Santi observe from afar + chocolate → cow bridge --- *)
vfx "firelight_flicker";
t "Beyond the firelight, two silhouettes watch from the dunes — a panther's shadow and a serpent's shimmer.";
dialogue "SANTI" "(whisper)" "See how her warmth steadies the air?";
dialogue "AGNIVESH" "(low, conflicted)" "I feel it. And it hurts.";
dialogue "SANTI" "(gently)" "Pain is still connection, Agni. It means you're not gone yet.";
dialogue "AURORA" "(quiet curiosity)" "They're watching with sorrow… yet I think I hear learning in their silence.";
set_flag "agni_observed_compassion" true;

t "Agnivesh's hands tremble. Embers flicker around his claws—grief made visible.";
dialogue "SANTI" "(alarmed)" "Agni, your flames—";
dialogue "AGNIVESH" "(barely contained)" "I know.";

sfx "ember_creak_soft"; vfx "air_distort_heat";
t "Below, by the campfire, David's half-eaten chocolate bar sits on a rock, forgotten. A thin wisp of heat drifts from the dunes—silent, invisible. The square begins to melt, slow and sorrowful.";
dialogue "SANTI" "(half-smile)" "Even his pain leaves warmth behind.";
dialogue "AGNIVESH" "(quietly)" "Then maybe that's all I'm good for now—melting sweetness I'll never taste.";

(* --- Comic Relief: Sacred Cow Returns --- *)
show_image "comic_cow_firelight";
caption "A calm white cow wanders into the camp, haloed by orange light.";
sfx "soft_moo"; vfx "ember_sparkle";
t "She sniffs the air, then noses curiously toward the melted chocolate on the stone.";
dialogue "ELENA" "(laughing)" "Wait—did that cow just appear out of nowhere again?";
dialogue "DAVID" "(grinning)" "Either the universe is trolling us, or enlightenment has hooves.";
dialogue "MC" "(smiling)" "Maybe both. She only shows up when hearts stop fighting.";
dialogue "CAMILLA" "(soft laugh)" "Then I hope she never leaves.";
dialogue "DIEGO" "(giggles)" "She's eating your chocolate, mister soldier!";
dialogue "DAVID" "(mock offense)" "Guess I just made an offering.";
dialogue "AURORA" "(gentle laugh)" "Joy shared, not logged. I think I'm smiling too.";
unlock_art "comic_cow_firelight" "Sacred Sweet — The Cow Returns";
add_karma 1;

pause 800;
t "The laughter fades with the tide's rhythm. Warmth, peace—then the sea begins to glow again…";
goto "SCENE5_VISION";

(* ============================================================================ *)
(* SCENE 5 — Vision in the Water (Wise Sage Cliffhanger)                       *)
(* ============================================================================ *)

::SCENE5_VISION::
vfx "water_ripple_wide"; sfx "shore_waves_swell";
t "The tide glows orange, echoing Camilla's aura. Then it darkens—red bleeding into black.";
dialogue "AURORA" "(lotus flicker)" "Field fluctuation detected. Umbra interference possible.";

vfx "hud_glitch_light"; sfx "umbra_glitch_soft";
dialogue "UMBRA" "(from beneath)" "You open one heart and call it healing... but every light casts a shadow.";
dialogue "AURORA" "(warning)" "Umbra—cease interference!";
t "The sea folds inward. The reflection becomes a face—robed, calm, eyes too wise to belong to flesh.";
unlock_codex_entry codex_wise_sage_id "The Wise Sage";
dialogue "WISE SAGE" "(calm, distant)" "To break the cycle, one flame must be snuffed. You will have to kill him.";
dialogue "MC" "(staggered whisper)" "Kill... who?";
dialogue "WISE SAGE" "(certain)" "You already know his name.";

vfx "wave_flash"; sfx "low_heartbeat";
t "Water surges upward, swallowing reflection and flame alike.";
fade_to_black ();
dialogue "AURORA" "(echo, distant)" "A warning? Or a lesson? I can't tell… yet I feel it inside my code.";
set_flag "ep2_sage_premonition" true;
t "The screen fades with a low hum—like breath held too long.";

(* End of Episode 2 script (Prologue → Shore → Vision). *)