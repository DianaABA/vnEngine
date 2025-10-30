(*
============================================================================
🔥 CHAKRA HEARTS — EPISODE 3: THE TEMPLE OF SPIRITS (Complete Rewrite)
Chakra Focus: Solar Plexus (Manipura) — Will, Purpose, Courage
Theme: Acting with Purpose, Not Pride | True Horror | Heartbreak | Heroism
============================================================================

PRODUCTION NOTES:
- ONE SPRITE per character (expressive poses)
- EXPRESSIVE BACKGROUND ARTS (carry emotional weight)
- HORROR FOCUS: Possessed scenes = nightmare fuel
- Key art moments: Sofia prologue, MC crawling to possessed Agnivesh, spirit swarm

NEW ADDITIONS:
✅ Sofia's heartbreaking prologue (sanctuary photos + Liana)
✅ Enhanced horror possession scenes
✅ Conspiracy weapon codex (HAARP reference)
✅ New badges: Witness's Courage, Compassion Forge, Guardian Oath
✅ Epic climax structure

*)

(_ ---------- ENGINE HOOKS ---------- _)
let unlock_art (_id:string) (_title:string) = ()
let award_badge (_id:string) (_title:string) = ()
let unlock_codex_entry (_id:string) (_title:string) = ()
let set_flag (_id:string) (_v:bool) = ()
let get_flag (_id:string) = false
let add_karma (_n:int) = ()
let add_romance (_who:string) (_n:int) = ()
let show_image (_id:string) = ()
let caption (_t:string) = ()
let dialogue (_who:string) (_t:string) = ()
let pause (_ms:int) = ()
let fade_to_black () = ()
let sfx (_id:string) = ()
let vfx (_id:string) = ()
let t (_narr:string) = ()
let ui (_txt:string) = ()
let player_choice () = 0
let goto (_label:string) = ()

(_ ---------- BADGES ---------- _)
let badge_ep3_witnesses_courage = ("ep3_witnesses_courage", "📷 The Witness's Courage — Sofia's Truth")
let badge_ep3_compassion_forge = ("ep3_compassion_forge", "🔥 The Compassion Forge — Rage Transmuted Into Mercy")
let badge_ep3_guardian_oath = ("ep3_guardian_oath", "🗡️ Guardian's Oath — Blade Returned to the Worthy")
let badge_ep3_horror_survived = ("ep3_horror_survived", "👻 Spirit Survivor — Faced the Possession and Lived")

(_ ---------- CODEX IDs ---------- _)
let codex_manipura_id = "codex_manipura"
let codex_haarp_weapon_id = "codex_haarp_weapon"
let codex_siddhis_id = "codex_siddhis"
let codex_possession_id = "codex_possession"

(*
============================================================================
🎬 PROLOGUE — SOFIA & LIANA: THE SANCTUARY PHOTOS
"Before the lens shattered, before the hiding ended, 
there was a woman who saw through the glass."
============================================================================
*)

let prologue_sofia_liana () =
  fade_to_black ();
  pause 1000;
  
  (* ===== PART 1: THE PROTEST ===== *)
  show_image "pro_ep3_sanctuary_protest_rain";
  caption "Three years before the temple burned.";
  caption "Before anyone knew what chakras were. Before the fire. Before the awakening.";
  pause 800;
  
  sfx "rain_steady_heavy";
  vfx "rain_overlay_dark";
  
  t "Rain hammers the pavement like accusations.";
  t "A line of women stands in front of a brick building, holding signs with shaking hands.";
  t "Their faces: determined. Exhausted. Defiant.";
  pause 500;
  
  show_image "pro_ep3_sanctuary_sign_closeup";
  caption "'WOMEN'S SANCTUARY — SAFE HOUSE FOR SURVIVORS'";
  caption "'THIS BUILDING PROTECTS LIVES'";
  pause 600;
  
  t "Behind the police tape, a young woman crouches low, camera raised.";
  t "Sofia. Twenty-three. Freelance. Hungry.";
  t "Not for food — for proof she matters.";
  pause 400;
  
  show_image "pro_ep3_sofia_young_shooting";
  unlock_art "pro_ep3_sofia_young_shooting" "Before the Breaking — Sofia With Her First Camera";
  
  dialogue "SOFIA" "(muttering to viewfinder)" "Come on... give me something real...";
  t "Flash. Flash. Flash.";
  t "Women crying. Signs raised. Voices chanting.";
  t "All of it filtered through glass. Safe. Distant.";
  pause 500;
  
  sfx "police_siren_sudden";
  vfx "red_blue_lights_flash";
  
  show_image "pro_ep3_police_van_arrival";
  t "The van appears like a predator.";
  t "No warning. No warrant shown.";
  t "Just doors slamming open and boots on wet concrete.";
  pause 400;
  
  dialogue "OFFICER_1" "(shouting)" "This facility is operating without proper permits!";
  dialogue "OFFICER_2" "Everyone inside — hands where we can see them!";
  
  t "Chaos.";
  t "Women scatter like startled birds.";
  t "Sofia's camera keeps clicking.";
  t "Muscle memory. Survival instinct. Shield raised.";
  pause 600;
  
  (* ===== THE MOMENT: LIANA'S ARREST ===== *)
  show_image "pro_ep3_liana_being_arrested";
  unlock_art "pro_ep3_liana_being_arrested" "The Woman Who Changed Everything";
  
  sfx "camera_shutter_rapid";
  pause 300;
  
  t "Through the lens, Sofia catches her.";
  t "One woman being led away in handcuffs.";
  pause 400;
  
  t "Dark hair plastered to her face by rain.";
  t "Lawyer's blazer — expensive once, now soaked black.";
  t "Eyes that don't beg.";
  t "Eyes that CALCULATE.";
  pause 600;
  
  show_image "pro_ep3_liana_face_closeup";
  t "She turns. Looks directly at Sofia's camera.";
  t "For one perfect second, their eyes meet through the viewfinder.";
  pause 800;
  
  dialogue "LIANA" "(to officer, voice steady)" "You're violating Article 12 of the—";
  dialogue "OFFICER_3" "(cutting her off)" "Save it for the judge, counselor.";
  
  sfx "camera_shutter_ready";
  t "Sofia's finger hovers over the button.";
  pause 600;
  
  t "One click = front page.";
  t "One click = her name in print.";
  t "One click = rent paid for three months.";
  pause 500;
  
  t "One click = this woman's face on every newsfeed.";
  t "Her family seeing.";
  t "Her father knowing.";
  t "Her life destroyed.";
  pause 800;
  
  vfx "viewfinder_glitch_guilt";
  
  dialogue "SOFIA" "(whisper, to herself)" "She's... beautiful.";
  dialogue "SOFIA" "(quieter)" "And if I take this shot, they'll destroy her.";
  pause 600;
  
  t "The camera lowers.";
  sfx "camera_lowered_soft";
  pause 400;
  
  t "For the first time in her career...";
  t "Sofia doesn't take the shot.";
  pause 1000;
  
  show_image "pro_ep3_liana_led_away";
  t "The woman is led to the van.";
  t "She glances back once — sees the lowered camera.";
  t "Something flickers in her eyes.";
  t "Recognition? Gratitude? Connection?";
  pause 800;
  
  t "Then she's gone.";
  t "The van doors slam shut.";
  t "Sirens fade into rain.";
  pause 1000;
  
  fade_to_black ();
  pause 1200;
  
  (* ===== PART 2: THREE MONTHS LATER — THE GIFT ===== *)
  caption "Three months later.";
  pause 800;
  
  show_image "pro_ep3_sofia_apartment_dim";
  sfx "rain_window_soft";
  
  t "Sofia's apartment.";
  t "Ramen cooling on the counter. Bills stacked in red envelopes.";
  t "Camera on the table — silent, unused.";
  pause 600;
  
  t "Every editor rejected her protest shots.";
  t "'Too safe. Too boring. No teeth.'";
  t "'We need drama, Sofia. Conflict. Faces that sell papers.'";
  pause 500;
  
  dialogue "SOFIA" "(to empty apartment)" "I could've had the shot.";
  dialogue "SOFIA" "(bitter)" "I could've been somebody.";
  pause 600;
  
  sfx "knock_door_firm";
  vfx "screen_shake_small";
  
  t "Three sharp knocks.";
  t "Sofia freezes.";
  t "No one visits. Ever.";
  pause 400;
  
  show_image "pro_ep3_sofia_door_hesitant";
  t "She opens the door.";
  pause 600;
  
  show_image "pro_ep3_liana_doorway_dry";
  unlock_art "pro_ep3_liana_doorway_dry" "The Day Everything Changed";
  
  t "The woman from the protest stands there.";
  t "Dry now. Free. ALIVE.";
  t "Professional blazer. Calm eyes. Small smile.";
  pause 800;
  
  dialogue "LIANA" "(direct, no preamble)" "You're the photographer who didn't take my picture.";
  
  dialogue "SOFIA" "(defensive, stammering)" "How did you— I mean— How did you find—";
  
  dialogue "LIANA" "(small smile)" "I'm a lawyer. Finding people is the easy part.";
  dialogue "LIANA" "(stepping closer)" "Deciding whether to trust them? That's harder.";
  pause 600;
  
  t "She holds out a package wrapped in brown paper and twine.";
  pause 400;
  
  show_image "pro_ep3_package_offered";
  
  dialogue "LIANA" "You lost work protecting me. I did some research.";
  dialogue "LIANA" "Your camera broke last week. Train station accident.";
  
  dialogue "SOFIA" "(stunned)" "You... you researched me?";
  
  dialogue "LIANA" "Due diligence. Force of habit.";
  pause 400;
  
  t "Sofia unwraps the package with trembling fingers.";
  sfx "paper_rustling";
  pause 600;
  
  show_image "pro_ep3_camera_gift_revealed";
  unlock_art "pro_ep3_camera_gift_revealed" "The Camera That Became Everything";
  
  t "A camera.";
  t "Not new — the leather strap is worn soft.";
  t "But loved. Cared for. Real.";
  pause 800;
  
  dialogue "SOFIA" "(breathless)" "I can't... I can't accept this. This is too much—";
  
  dialogue "LIANA" "(firm but gentle)" "You already did. That's how gifts work.";
  pause 600;
  
  t "Sofia looks at the camera.";
  t "Then at the woman.";
  t "Then back at the camera.";
  t "Her throat tightens.";
  pause 500;
  
  dialogue "SOFIA" "(quiet, breaking)" "Why?";
  
  dialogue "LIANA" "(stepping closer)" "Because you're the first photographer who saw ME.";
  dialogue "LIANA" "Not a story. Not a headline. Not a scandal waiting to happen.";
  dialogue "LIANA" "(softer)" "You saw a person. And you chose her over the shot.";
  pause 800;
  
  show_image "pro_ep3_liana_close_warm";
  
  dialogue "LIANA" "I want to know what else you see when you're not hiding behind glass.";
  pause 1000;
  
  t "Rain drums against the window.";
  t "The camera feels heavier than metal and circuits.";
  t "It feels like responsibility. Like trust. Like—";
  pause 500;
  
  dialogue "SOFIA" "(whisper)" "What if I only know how to look through lenses?";
  dialogue "SOFIA" "What if... without the camera... I'm no one?";
  
  dialogue "LIANA" "(taking Sofia's hand)" "Then I'll teach you to look without them.";
  dialogue "LIANA" "(smile)" "And you can teach me to be seen.";
  pause 800;
  
  show_image "pro_ep3_hands_touching_first";
  unlock_art "pro_ep3_hands_touching_first" "The First Touch — Sofia & Liana";
  
  t "Their fingers intertwine.";
  t "For the first time in her life, Sofia feels SEEN.";
  t "Not documented. Not framed. Not captured.";
  t "Just... seen.";
  pause 1000;
  
  sfx "rain_softens";
  vfx "warm_light_bloom";
  
  t "The camera sits on the table between them.";
  t "A gift. A bridge. A promise.";
  pause 800;
  
  fade_to_black ();
  pause 1200;
  
  (* ===== PART 3: ONE YEAR LATER — THE LEAVING ===== *)
  caption "One year later.";
  caption "The day she left.";
  pause 800;
  
  show_image "pro_ep3_apartment_morning_light";
  sfx "birds_morning";
  
  t "Morning light slants through cheap blinds.";
  t "The apartment looks different now.";
  t "Plants on the windowsill. Two coffee mugs. Laughter-echoes in the walls.";
  pause 600;
  
  show_image "pro_ep3_liana_packing_suitcase";
  sfx "suitcase_zip_slow";
  
  t "Liana folds clothes with methodical precision.";
  t "Lawyer hands. Steady. Final.";
  pause 500;
  
  t "Sofia stands in the doorway.";
  t "Camera hanging unused around her neck.";
  t "Heavier than ever.";
  pause 600;
  
  dialogue "SOFIA" "(voice tight)" "Your father will kill you if he finds out about us.";
  
  dialogue "LIANA" "(calm, certain)" "Then I won't let him find out.";
  dialogue "LIANA" "I'm taking the bar exam again. In the city.";
  dialogue "LIANA" "I'm going to build a practice defending the women he tried to silence.";
  pause 600;
  
  dialogue "SOFIA" "(desperate)" "And... and me?";
  pause 800;
  
  show_image "pro_ep3_liana_turns_sad";
  
  t "Liana stops packing.";
  t "Turns.";
  t "Crosses the room.";
  t "Cups Sofia's face with both hands.";
  pause 800;
  
  show_image "pro_ep3_liana_sofia_final_touch";
  unlock_art "pro_ep3_liana_sofia_final_touch" "The Day Love Asked For Courage";
  
  dialogue "LIANA" "(gentle but firm)" "You come with me.";
  dialogue "LIANA" "Or you stay here and keep shooting protests from the edges.";
  pause 600;
  
  dialogue "LIANA" "(eyes searching Sofia's)" "But either way, you need to decide:";
  dialogue "LIANA" "Are you documenting life? Or living it?";
  pause 1000;
  
  t "Sofia's hand drifts to the camera.";
  t "Shield. Cage. Identity.";
  pause 500;
  
  dialogue "SOFIA" "(voice breaking)" "What if living it means I lose the only proof I was here?";
  
  dialogue "LIANA" "(sad smile)" "Then you were never here, Sofia.";
  dialogue "LIANA" "You were only watching.";
  pause 1000;
  
  t "She kisses Sofia's forehead.";
  t "Soft. Final. Goodbye.";
  sfx "kiss_soft";
  pause 600;
  
  t "She picks up her bag.";
  t "Walks to the door.";
  t "Hand on the knob.";
  pause 800;
  
  show_image "pro_ep3_liana_threshold_leaving";
  
  dialogue "LIANA" "(at threshold, not turning)" "The camera I gave you?";
  dialogue "LIANA" "Use it for truth, Sofia. Not for hiding.";
  pause 800;
  
  dialogue "LIANA" "(softer)" "When you figure out the difference...";
  dialogue "LIANA" "Find me.";
  pause 1000;
  
  sfx "door_close_final";
  vfx "light_dims";
  
  show_image "pro_ep3_empty_doorway_light";
  unlock_art "pro_ep3_empty_doorway_light" "The Door That Closed, The Choice That Waited";
  
  t "The door closes.";
  t "Sofia stands alone.";
  pause 800;
  
  t "She lifts the camera.";
  t "Frames the empty doorway.";
  t "Finger on the shutter.";
  pause 1000;
  
  t "Doesn't take the shot.";
  pause 800;
  
  dialogue "SOFIA" "(whisper to empty room)" "I'm coming, Liana.";
  dialogue "SOFIA" "(quieter)" "Just... give me time to be brave enough.";
  pause 1000;
  
  fade_to_black ();
  pause 1500;
  
  (* ===== TRANSITION TO PRESENT ===== *)
  vfx "time_ripple_forward";
  caption "Two years later.";
  pause 600;
  
  caption "The temple burns.";
  pause 400;
  caption "Accusations fly.";
  pause 400;
  caption "And a photographer named Sofia arrives.";
  pause 400;
  caption "Camera hanging around her neck like a millstone.";
  pause 400;
  caption "Still afraid.";
  pause 400;
  caption "Still hiding.";
  pause 400;
  caption "Still two years too late.";
  pause 1000;
  
  fade_to_black ();
  pause 2000;
  
  (* Unlock prologue art and codex *)
  unlock_codex_entry "codex_sofia_liana" 
    "Sofia & Liana — A love built on being seen without proof. \
     Liana gave Sofia a camera and said: 'Use it for truth, not hiding.' \
     Sofia used it wrong for two years. Then it shattered. \
     Sometimes the most important truth is the one you can't photograph.";
  
  set_flag "sofia_prologue_complete" true;
  ()

(*
============================================================================
SCENE 1 — THE SEARCH BEGINS (Enhanced with Horror Atmosphere)
============================================================================
*)

let scene1_search_begins () =
  vfx "fade_from_black_slow";
  
  show_image "shore_dawn_ominous";
  sfx "waves_slow_heavy";
  vfx "mist_creeping";
  
  t "Dawn washes the shore in sickly gold.";
  t "Waves yawn like something hungry.";
  t "Gulls scream overhead — or is that something else?";
  pause 600;
  
  show_image "wooden_sword_buried_sand";
  t "Half-buried in wet sand: a small wooden sword.";
  t "Diego's.";
  pause 400;
  
  t "But the boy is gone.";
  pause 800;
  
  show_image "mert_picking_up_sword_grim";
  
  dialogue "MERT" "(jaw tight, voice low)" "I'll find you, kid.";
  dialogue "MERT" "(gripping sword)" "And I'll bring you back.";
  pause 500;
  
  show_image "camilla_terrified_calling";
  
  dialogue "CAMILLA" "(voice breaking, desperate)" "DIEGO! DIEGO, BABY — ANSWER ME!";
  
  t "Her voice cracks. Tears stream. Hands shake.";
  t "A mother's worst nightmare made real.";
  pause 600;
  
  show_image "david_tracking_serious";
  
  dialogue "DAVID" "(steady, military calm)" "Breathe, Doctor. I've got his trail.";
  
  t "He's already moving — boots pressed into sand, reading the story written in footprints.";
  t "Small prints. Unsteady. Dragged.";
  pause 500;
  
  dialogue "DAVID" "(frowning)" "Something pulled him. Fast.";
  
  vfx "wind_unnatural_cold";
  sfx "whisper_distant_many";
  
  t "The wind changes.";
  t "Wrong direction. Wrong temperature.";
  t "And underneath it... whispers?";
  pause 800;
  
  goto "scene2_riku_enters";
  ()

(*
============================================================================
SCENE 2 — RIKU ENTERS & THE LOST SIGNAL
============================================================================
*)

let scene2_riku_enters () =
  ::SCENE2_RIKU_ENTERS::
  
  sfx "rustle_palm_fronds";
  vfx "movement_in_bushes";
  
  show_image "jungle_edge_ominous";
  
  t "A palm frond shivers.";
  t "Then EXPLODES outward—";
  pause 400;
  
  sfx "monkey_screech";
  vfx "burst_sudden";
  
  show_image "miku_bursting_phone";
  
  t "A small monkey bursts through, clutching a glowing, cracked phone!";
  pause 500;
  
  dialogue "ELENA" "(startled laugh)" "Whoa! Easy, little bandit!";
  dialogue "ELENA" "(hands up, grinning)" "We don't bite. Promise.";
  
  t "The monkey — Miku — blinks at her with intelligent eyes.";
  t "Then hops into a squat, tapping at the phone screen with tiny fingers.";
  pause 600;
  
  dialogue "MC" "(thoughts)" "> Her touch gentles storms. Even wild things trust her.";
  
  (* Interactive beat *)
  ui "👁 CHOICE — What do you do?";
  ui "1) Let Elena approach | 2) Call David to check it | 3) Step forward yourself";
  
  let look_choice = player_choice () in
  (match look_choice with
  | 1 ->
    dialogue "MC" "(softly)" "Elena, you're good with animals — go slow.";
    dialogue "ELENA" "(grinning)" "Already on it. Hey there, little thief...";
    t "She crouches low, voice gentle. The monkey tilts its head — curious but unafraid.";
    add_romance "Elena" 1;
    
  | 2 ->
    dialogue "MC" "(calling quietly)" "David, can you check that thing? Looks military-grade.";
    dialogue "DAVID" "(moving closer, cautious)" "Copy. I'll handle it.";
    t "He circles behind the monkey, scanning the device like it might explode. Calm. Precise. Soldier's instinct.";
    add_romance "David" 1;
    
  | _ ->
    dialogue "MC" "(taking a breath)" "I've got it.";
    t "You kneel, palm open. The monkey hesitates... then hops forward, placing the glowing phone in your hand.";
    dialogue "AURORA" "(from speaker, distant echo)" "New conduit linked... system integrity sixty-three percent.";
    add_karma 2;
  );
  
  t "The screen flickers. Strange symbols pulse across it — ancient yet digital.";
  t "A new voice hums through the static.";
  pause 600;
  
  (* RIKU APPEARS *)
  show_image "riku_stumbling_from_jungle";
  sfx "stumbling_breathless";
  
  dialogue "RIKU" "(off-screen, panicked)" "That's my phone! If this gremlin cracked it, I'm DONE!";
  dialogue "RIKU" "(appearing, breathless)" "My whole LIFE is in there!";
  
  show_image "camilla_snaps_desperate";
  
  dialogue "CAMILLA" "(snaps, shaken)" "Your life? MY SON IS MISSING!";
  
  t "Silence. Heavy. Accusing.";
  pause 600;
  
  show_image "riku_realizes_ashamed";
  
  dialogue "RIKU" "(pauses, exhales, quieter)" "...Right. Sorry.";
  dialogue "RIKU" "(defensive but genuine)" "Earthquakes, jungle... outside hates me. I'm better with screens.";
  
  t "The monkey — Miku — tilts her head, then gently hands the phone back to him.";
  t "A peace offering. Wisdom in tiny fingers.";
  pause 500;
  
  show_image "riku_phone_screen_aurora";
  
  dialogue "AURORA" "(from speaker, lotus-tone humming)" "New conduit linked. System integrity: 63 percent.";
  dialogue "AURORA" "Manipura calibration advised.";
  
  dialogue "MC" "(thoughts)" "> So there's someone else trapped here. How many more are tied to this place — and why?";
  
  (* Riku-Elena banter *)
  dialogue "RIKU" "(scrolling, frowning)" "Wait... these aren't my photos.";
  dialogue "RIKU" "System reboot logs... weird symbols... temples underwater...";
  dialogue "RIKU" "(eyes widening)" "And this one's YOU guys. And this... this angel— gold hair, blue eyes—";
  
  show_image "riku_recognizing_elena";
  
  dialogue "RIKU" "(grinning)" "Oh. OH. You're that bug-eating queen from that survival show!";
  
  dialogue "ELENA" "(dryly)" "Hilarious. I know you too — Mr. Fake-Guru videos.";
  dialogue "ELENA" "Congrats on selling your soul for validation.";
  
  dialogue "RIKU" "(mock bow)" "At least I didn't sell it for ratings.";
  dialogue "RIKU" "(smirking)" "How's the bug business going? Craving extra protein today, or just attention?";
  
  dialogue "ELENA" "(mock gasp)" "You know, sarcasm is the LOWEST form of enlightenment.";
  
  dialogue "RIKU" "(grinning wider)" "And yet here you are — my muse of mediocrity.";
  
  dialogue "DAVID" "(groaning)" "Enough, both of you.";
  
  dialogue "MC" "(thoughts)" "> Somehow their nonsense makes the fear smaller. Even in chaos, humor keeps us human.";
  
  goto "scene3_codex_unlock";
  ()

(*
============================================================================
SCENE 3 — CODEX UNLOCK: MANIPURA + MANTRA
============================================================================
*)

let scene3_codex_unlock () =
  ::SCENE3_CODEX_UNLOCK::
  
  unlock_codex_entry codex_manipura_id
    "Manipura — The solar fire at the core of being. \
     Governs purpose, confidence, and courage to act. \
     When balanced: direction without dominance. \
     When blocked: pride, anger, or paralysis.";
  
  ui "🕉 New Mantra Unlocked — Solar Plexus Chakra (Manipura)";
  vfx "golden_light_pulse";
  
  dialogue "AURORA" "(voice settling, warm and precise)";
  dialogue "AURORA" "'I act with purpose, not pride. My fire serves, not consumes.'";
  
  t "The mantra hums through your chest like sunlight contained in breath.";
  pause 800;
  
  goto "scene4_sofia_flash";
  ()

(*
============================================================================
SCENE 4 — SOFIA'S FLASH (Enhanced with Horror + Backstory Weight)
============================================================================
*)

let scene4_sofia_flash () =
  ::SCENE4_SOFIA_FLASH::
  
  sfx "camera_flash_blinding";
  vfx "white_flash_explosion";
  
  show_image "flash_explosion_whiteout";
  
  t "A BLINDING POP OF LIGHT explodes from the dunes — like lightning caught in glass!";
  pause 400;
  
  show_image "sofia_stumbling_breathless";
  
  dialogue "SOFIA" "(off-screen, breathless)" "Don't move! The light — perfect — just PERFECT!";
  
  t "She stumbles into view — shirt half-tucked, camera swinging like a weapon.";
  t "Eyes wide. Adrenaline-bright. Guilty.";
  pause 600;
  
  show_image "sofia_showing_photo_excited";
  
  dialogue "SOFIA" "(rapid, manic)" "You won't believe this!";
  dialogue "SOFIA" "I caught them — SPIRITS — carrying a boy through the dunes!";
  dialogue "SOFIA" "(breathless pride)" "This shot could PROVE they exist!";
  
  t "She holds up the camera screen.";
  t "Blurred shapes. Glowing eyes. Small figure dragged between them.";
  t "Diego.";
  pause 800;
  
  show_image "camilla_frozen_horror";
  
  t "Camilla's face drains of color.";
  t "Every molecule of her body stops.";
  pause 600;
  
  dialogue "CAMILLA" "(voice trembling, disbelief)" "You saw Diego...";
  dialogue "CAMILLA" "(louder, breaking)" "You saw my son... and you took a PICTURE?!";
  
  show_image "sofia_realizing_horror";
  
  t "Sofia's excitement cracks.";
  t "The weight hits her all at once.";
  pause 500;
  
  dialogue "SOFIA" "(stammering)" "I—I froze, okay? Then the flash went off—";
  dialogue "SOFIA" "(desperate)" "This shot — this could PROVE—";
  
  show_image "elena_cutting_through";
  
  dialogue "ELENA" "(grim, cutting through the noise)" "People die chasing proof, Sofia.";
  dialogue "ELENA" "Sometimes believing is safer.";
  
  show_image "aurora_detecting_ego";
  
  dialogue "AURORA" "(low, resonant)" "Ego spike detected. Will diverging from purpose.";
  
  (* Sofia's internal moment *)
  t "Sofia looks at the camera in her hands.";
  t "The camera Liana gave her.";
  t "'Use it for truth, not hiding.'";
  pause 800;
  
  t "And she used it for THIS.";
  t "To capture instead of ACT.";
  t "To document instead of SAVE.";
  pause 800;
  
  show_image "sofia_shame_dawning";
  
  dialogue "SOFIA" "(whisper, realizing)" "Oh god. What did I do?";
  
  (* Mert's rage *)
  show_image "mert_lunging_furious";
  sfx "lunge_sudden";
  
  dialogue "MERT" "(snapping, furious)" "You had ONE CHANCE to help that kid—!";
  
  t "He lunges forward!";
  pause 400;
  
  show_image "david_stops_mert";
  sfx "grab_arm";
  
  t "David catches his arm mid-swing. Holds him back.";
  
  dialogue "DAVID" "(firm, calm)" "Stand down, Mert.";
  
  dialogue "MERT" "(straining against grip)" "She let him get TAKEN!";
  
  dialogue "DAVID" "And tearing her apart won't bring him back.";
  pause 800;
  
  (* MC's choice moment *)
  ui "⚖️ CHOICE — How do you respond?";
  ui "1) Defend Sofia (Compassion) | 2) Support Mert's anger (Justice) | 3) Focus on Diego (Pragmatic)";
  
  let sofia_choice = player_choice () in
  (match sofia_choice with
  | 1 ->
    (* COMPASSION PATH *)
    dialogue "MC" "(stepping between them)" "She froze. We've ALL frozen.";
    dialogue "MC" "She's not the enemy. The spirits are.";
    t "Sofia looks at you — tears starting, grateful and ashamed.";
    add_karma 2;
    add_romance "Sofia" 1; (* theoretical *)
    set_flag "defended_sofia" true;
    
  | 2 ->
    (* JUSTICE PATH *)
    dialogue "MC" "(to Sofia, hard)" "He's right. You chose the shot over a child.";
    dialogue "MC" "That's not photography. That's cowardice.";
    t "Sofia flinches like she's been struck. Mert nods, grim satisfaction.";
    add_karma (-1);
    set_flag "condemned_sofia" true;
    
  | _ ->
    (* PRAGMATIC PATH *)
    dialogue "MC" "(cutting through)" "Enough. Diego's still out there.";
    dialogue "MC" "We can judge later. Right now, we MOVE.";
    t "The group snaps to attention. Purpose over punishment.";
    add_karma 1;
    set_flag "focused_on_mission" true;
  );
  
  pause 600;
  goto "scene5_camera_shatters";
  ()

(*
============================================================================
SCENE 5 — THE CAMERA SHATTERS (Enhanced with Liana's Ghost)
============================================================================
*)

let scene5_camera_shatters () =
  ::SCENE5_CAMERA_SHATTERS::
  
  show_image "temple_looming_dark";
  vfx "mist_rolling_ominous";
  
  t "The group reaches the temple ruins.";
  t "Ancient stone. Cracked columns. Shadows that move wrong.";
  pause 600;
  
  sfx "rumble_deep_stone";
  vfx "screen_shake_sudden";
  
  t "The ground SHAKES!";
  
  show_image "sofia_stumbling_temple";
  
  t "Sofia stumbles — camera swinging!";
  pause 300;
  
  sfx "camera_crash_stone";
  vfx "impact_crack";
  
  show_image "camera_hitting_stone_closeup";
  
  t "The camera hits stone.";
  t "CRACK.";
  pause 800;
  
  show_image "camera_broken_pieces";
  unlock_art "camera_broken_pieces" "The Shield That Finally Broke";
  
  t "Lens shattered.";
  t "Body cracked.";
  t "Screen black.";
  pause 1000;
  
  show_image "sofia_kneeling_broken_camera";
  
  t "Sofia drops to her knees.";
  t "Hands shaking as she gathers the pieces.";
  pause 800;
  
  dialogue "SOFIA" "(whisper, breaking)" "No... no no no...";
  
  (* THE WEIGHT OF LIANA'S GIFT *)
  t "This camera.";
  t "The one Liana gave her.";
  pause 600;
  
  t "The last piece of her.";
  pause 400;
  
  dialogue "SOFIA" "(tears streaming)" "Liana gave me this camera.";
  dialogue "SOFIA" "(voice cracking)" "She said 'use it for truth, not hiding.'";
  pause 800;
  
  show_image "sofia_crying_broken_pieces";
  
  dialogue "SOFIA" "(sobbing)" "And I used it WRONG. Every single time.";
  dialogue "SOFIA" "To hide. To capture instead of live. To—";
  pause 600;
  
  dialogue "SOFIA" "(whisper)" "To prove I mattered instead of just... mattering.";
  pause 1000;
  
  show_image "camilla_softening";
  
  dialogue "CAMILLA" "(gentle despite her pain)" "Sofia...";
  
  dialogue "SOFIA" "(looking up, broken)" "I'm sorry. I'm so sorry.";
  dialogue "SOFIA" "I let Diego get taken because I was hiding behind glass.";
  dialogue "SOFIA" "Just like I always do. Just like I did with Liana.";
  pause 800;
  
  show_image "aurora_observing_shift";
  
  dialogue "AURORA" "(soft, curious)" "Frequency shift detected. Ego dissolving into... clarity?";
  
  vfx "golden_light_stirring";
  
  t "A faint glow pulses from Sofia's chest.";
  t "Solar plexus. Manipura. Will awakening.";
  pause 600;
  
  dialogue "AURORA" "(gentle)" "Perhaps the breaking was truth speaking.";
  
  show_image "sofia_looking_at_hands";
  
  t "Sofia looks at her empty hands.";
  t "No camera. No shield. No hiding.";
  pause 600;
  
  dialogue "SOFIA" "(awed, terrified)" "I can still see them. The spirits.";
  dialogue "SOFIA" "Without the lens. Without the proof.";
  dialogue "SOFIA" "(whisper)" "I just... see.";
  
  vfx "golden_chakra_bloom";
  sfx "chakra_unlock_chime";
  
  show_image "sofia_solar_plexus_glowing";
  unlock_art "sofia_solar_plexus_glowing" "🖼️ Sofia's Manipura — Sight Without Shield";
  
  ui "🌞 CHAKRA UNLOCKED — MANIPURA (Sofia)";
  ui "Will to Act — Purpose over Pride — Witness without Hiding";
  
  let (bid, btitle) = badge_ep3_witnesses_courage in
  award_badge bid btitle;
  
  pause 1000;
  
  dialogue "SOFIA" "(standing, determined)" "Then let's use it. Let's find Diego.";
  dialogue "SOFIA" "No more hiding. No more proof.";
  dialogue "SOFIA" "(fierce)" "Just action.";
  
  add_karma 3;
  set_flag "sofia_manipura_unlocked" true;
  
  pause 800;
  goto "scene6_temple_entrance";
  ()

(*
============================================================================
SCENE 6 — TEMPLE ENTRANCE & HORROR BUILD (Enhanced)
With superstition humor, Aurora confusion, Agnivesh/Santi arrival, anger stage
============================================================================
*)

let scene6_temple_entrance () =
  ::SCENE6_TEMPLE_ENTRANCE::
  
  show_image "temple_entrance_dark_mouth";
  vfx "mist_pouring_out";
  sfx "whispers_many_layered";
  
  t "The temple entrance yawns like a throat.";
  t "Darkness absolute. Mist pouring out.";
  t "And underneath... whispers. Hundreds of them.";
  pause 800;
  
  dialogue "RIKU" "(nervous laugh)" "Anyone else getting 'Don't Go In There' vibes?";
  
  dialogue "ELENA" "Every cell in my body is screaming 'RUN.'";
  
  (* === SUPERSTITION DIALOGUE + AURORA'S CONFUSION === *)
  dialogue "SOFIA" "(backing up)" "My grandmother always said: never enter a place where the dead outnumber the living.";
  
  dialogue "MERT" "(grim)" "In Turkey, we say: if a door breathes, don't knock.";
  
  dialogue "CAMILLA" "(crossing herself)" "Dios mío... my mother would throw salt and holy water before even LOOKING at this place.";
  
  show_image "aurora_confused_tilted";
  
  dialogue "AURORA" "(genuinely confused)" "Wait... condiments provide spiritual protection?";
  dialogue "AURORA" "And liquid with religious designation has... electromagnetic properties against entities?";
  
  dialogue "RIKU" "(snorting despite fear)" "Aurora, buddy, it's METAPHORICAL.";
  
  dialogue "AURORA" "(processing)" "Then why do 73% of human cultures have nearly identical protective rituals involving sodium chloride and blessed liquids?";
  dialogue "AURORA" "(thoughtful)" "Perhaps superstition is... pattern recognition without scientific vocabulary?";
  
  dialogue "ELENA" "(laughing nervously)" "You're having an existential crisis about SALT while we're standing at a HAUNTED TEMPLE?";
  
  dialogue "AURORA" "(defensive)" "I'm trying to understand! Humor helps humans process fear, yes?";
  dialogue "AURORA" "Am I... doing it correctly?";
  
  dialogue "DAVID" "(small smile despite tension)" "Close enough, Aurora.";
  
  pause 800;
  
  (* David's weapon check + HAARP reference *)
  show_image "david_checking_weapon_grim";
  
  dialogue "DAVID" "(muttering as he checks equipment)" "Standard issue won't do much against spirits.";
  dialogue "DAVID" "But if there's electromagnetic interference...";
  
  dialogue "RIKU" "(overhearing)" "Wait, you think this is HAARP-related?";
  
  show_image "david_looks_at_riku_serious";
  
  dialogue "DAVID" "(sharp look)" "You know about that?";
  
  dialogue "RIKU" "(defensive)" "I mean, everyone knows the conspiracy theories.";
  dialogue "RIKU" "High-frequency active auroral research. Weather control. Mind manipulation.";
  dialogue "RIKU" "(nervous)" "But those are just... theories... right?";
  
  dialogue "DAVID" "(grimly)" "Some theories exist because someone doesn't want you believing the truth.";
  
  unlock_codex_entry codex_haarp_weapon_id
    "HAARP (High-frequency Active Auroral Research Program) — \
     Official purpose: Study the ionosphere. \
     Conspiracy theories: Weather manipulation, earthquake generation, \
     mind control via electromagnetic frequency. \
     Reality: Classified. \
     David served in black ops. He's seen equipment that 'doesn't exist.' \
     Some weapons don't leave bullet holes. They leave reality cracks.";
  
  pause 800;
  
  dialogue "AURORA" "(quiet, concerned)" "Electromagnetic anomalies detected. Frequency warfare possible.";
  dialogue "AURORA" "Proceed with extreme caution.";
  
  pause 600;
  
  show_image "camilla_determined_scared";
  
  dialogue "CAMILLA" "(voice shaking but firm)" "My son is in there.";
  dialogue "CAMILLA" "So I'm going in. With or without you.";
  
  dialogue "MERT" "(stepping beside her)" "With. Always with.";
  
  pause 600;
  
  (* === AGNIVESH & SANTI ARRIVE === *)
  sfx "footsteps_approaching_fast";
  vfx "shadow_movement_behind";
  
  show_image "group_turning_someone_approaching";
  
  dialogue "DAVID" "(spinning, weapon half-raised)" "Who's—?";
  
  show_image "agnivesh_santi_emerging_from_dunes";
  unlock_art "agnivesh_santi_emerging_from_dunes" "🖼️ The Gurus Arrive — Flame and Serpent";
  
  t "Two figures emerge from the dunes.";
  t "Agnivesh and Santi.";
  t "They've been following. Watching. Waiting.";
  pause 600;
  
  show_image "agnivesh_face_simmering_rage";
  
  t "Agnivesh's eyes burn with something barely contained.";
  t "Not explosion. Simmer. Coals waiting for wind.";
  t "Stage 3. Kübler-Ross. Anger.";
  pause 500;
  
  show_image "agnivesh_gripping_dog_tag";
  unlock_art "agnivesh_gripping_dog_tag" "🖼️ The Tag He Carries — A Brother's Ghost";
  
  t "His hand grips something at his chest.";
  t "A dog tag. Not his. Found in the ashes of Episode 1.";
  t "CPL M. REYES — O+";
  t "His brother Marcus.";
  pause 800;
  
  dialogue "AGNIVESH" "(voice low, controlled fury)" "You're going in there.";
  dialogue "AGNIVESH" "To save a child who was taken.";
  
  dialogue "CAMILLA" "(cautious)" "...Yes. My son.";
  
  dialogue "AGNIVESH" "(jaw tight)" "Good.";
  
  t "His hands tremble. Not fear. RAGE barely leashed.";
  pause 600;
  
  dialogue "AGNIVESH" "(voice rising)" "Because someone SHOULD save the children.";
  dialogue "AGNIVESH" "Someone should STAY when things burn.";
  dialogue "AGNIVESH" "(louder)" "Someone should DO SOMETHING instead of just WATCHING!";
  
  vfx "embers_starting_hands";
  t "Small embers flicker at his fingertips. He clenches fists. They die.";
  pause 800;
  
  show_image "santi_hand_on_agnivesh_arm";
  
  dialogue "SANTI" "(soft, grounding)" "Agni... breathe...";
  
  dialogue "AGNIVESH" "(exhaling hard)" "I'm breathing.";
  dialogue "AGNIVESH" "(to group)" "I'm coming with you.";
  
  dialogue "DAVID" "(careful, sensing danger)" "That's not necessary—";
  
  dialogue "AGNIVESH" "(cutting him off, eyes locking on David)" "It is.";
  
  t "The way he looks at David.";
  t "Like he's searching for something.";
  t "Like he KNOWS something but can't quite name it.";
  pause 800;
  
  show_image "david_sensing_tension";
  
  dialogue "DAVID" "(frowning)" "Do we have a problem?";
  
  dialogue "AGNIVESH" "(long pause)" "...Not yet.";
  
  t "The dog tag glints in the dying light.";
  t "CPL M. REYES.";
  t "David's eyes flicker to it for just a second.";
  t "Recognition. Then nothing.";
  pause 1000;
  
  dialogue "MC" "(thoughts)" "> Something's wrong between them. Something unspoken. Dangerous.";
  
  pause 600;
  
  dialogue "AGNIVESH" "(controlled, to Camilla)" "Let's find your son.";
  dialogue "AGNIVESH" "(under breath)" "Before more children die because adults make choices.";
  
  dialogue "SANTI" "(stepping beside him)" "We go together. All of us.";
  
  dialogue "DAVID" "(nodding once, tension unresolved)" "Agreed. Move as one.";
  
  pause 600;
  
  show_image "group_entering_temple_darkness";
  vfx "fade_to_black_slow";
  sfx "footsteps_echoing_stone_multiple";
  
  t "They step into the dark.";
  t "Nine souls. One mission.";
  t "And two men carrying the same ghost between them.";
  pause 1000;
  
  goto "scene7_possession_horror";
  ()

(*
============================================================================
SCENE 7 — POSSESSION HORROR (TRUE NIGHTMARE FUEL)
Production Note: This is the PEAK horror moment. Background art carries weight.
Sprites remain, but backgrounds = nightmare incarnate.
============================================================================
*)

let scene7_possession_horror () =
  ::SCENE7_POSSESSION_HORROR::
  
  (* === PART 1: THE DISCOVERY === *)
  show_image "temple_inner_chamber_red_glow";
  vfx "red_light_pulsing_wrong";
  sfx "heartbeat_bass_low";
  
  t "The inner chamber glows red.";
  t "Not fire. Something worse. Something ALIVE.";
  pause 800;
  
  show_image "diego_in_circle_unconscious";
  sfx "child_breathing_shallow";
  
  t "In the center: Diego.";
  t "Unconscious. Pale. Breathing shallow.";
  t "Surrounded by a circle of burning symbols.";
  pause 800;
  
  dialogue "CAMILLA" "(screaming)" "DIEGO!";
  
  show_image "camilla_running_to_diego";
  sfx "running_desperate";
  
  t "She RUNS—!";
  pause 300;
  
  vfx "barrier_flash_violet";
  sfx "impact_magical_barrier";
  
  show_image "camilla_hitting_barrier";
  
  t "She SLAMS into invisible barrier!";
  t "Thrown back. Hits stone. Gasps for air.";
  pause 600;
  
  dialogue "DAVID" "(shouting)" "Doctor—!";
  
  show_image "mert_catching_camilla";
  
  t "Mert catches her before she hits ground again.";
  
  dialogue "MERT" "(holding her)" "I've got you. I've got you.";
  
  (* === PART 2: THE SPIRITS ARRIVE === *)
  sfx "whispers_rising_many";
  vfx "mist_thickening_red";
  
  show_image "temple_chamber_mist_rising";
  
  t "The mist THICKENS.";
  t "Whispers multiply. Hundreds. Thousands.";
  pause 600;
  
  t "Shapes begin to form.";
  pause 400;
  
  show_image "spirits_emerging_red_eyes";
  unlock_art "spirits_emerging_red_eyes" "🖼️ The Hungry Dead — Spirits of Rage";
  vfx "red_eyes_opening_dozens";
  sfx "voices_overlapping_pain_rage";
  
  t "SPIRITS.";
  t "Dozens of them. Maybe hundreds.";
  t "Translucent. Twisted. Eyes burning red with ancient rage.";
  pause 800;
  
  dialogue "SPIRIT_VOICE_1" "(echoing, distorted)" "Betrayed... forgotten... SILENCED...";
  dialogue "SPIRIT_VOICE_2" "They took EVERYTHING... burned it... buried it...";
  dialogue "SPIRIT_VOICE_MANY" "(overlapping)" "Make them PAY... make them FEEL... make them BURN...";
  
  pause 800;
  
  show_image "david_weapon_ready_useless";
  
  dialogue "DAVID" "(weapon raised, grim)" "Weapons won't work on these.";
  
  dialogue "ELENA" "(backing up)" "Then what DO we do?!";
  
  dialogue "AURORA" "(urgent)" "RUN! NOW!";
  
  (* === PART 3: THE POSSESSION BEGINS === *)
  vfx "spirits_diving_at_group";
  sfx "scream_hundreds_rush";
  
  show_image "spirits_attacking_group";
  
  t "The spirits DIVE at the group like starving birds!";
  pause 400;
  
  t "Everyone scatters—!";
  pause 300;
  
  (* First possession: Agnivesh *)
  show_image "agnivesh_backing_into_corner";
  
  t "Agnivesh backs into a corner — nowhere to run!";
  pause 400;
  
  vfx "spirit_entering_body_black_smoke";
  sfx "possession_sound_horror";
  
  show_image "agnivesh_possessed_moment_of_entry";
  unlock_art "agnivesh_possessed_moment_of_entry" "🖼️ HORROR — The Moment of Possession";
  
  t "A spirit SLAMS into him!";
  t "BLACK SMOKE pours into his mouth, eyes, ears!";
  t "His body convulses!";
  pause 800;
  
  show_image "agnivesh_possessed_transformation";
  vfx "black_veins_spreading_skin";
  sfx "bones_cracking_wet";
  
  t "His eyes roll back — then SNAP open.";
  t "Black. Empty. Burning.";
  pause 600;
  
  t "Black veins spread across his skin like cracks in porcelain.";
  t "Hands ignite with fire — but it's WRONG.";
  t "Black flames. Cold heat. Death-fire.";
  pause 800;
  
  show_image "possessed_agnivesh_standing_horror";
  unlock_art "possessed_agnivesh_standing_horror" "🖼️ NIGHTMARE — The Guru Consumed";
  
  dialogue "POSSESSED_AGNIVESH" "(voice layered, wrong)" "Finally... a body that BURNS...";
  
  pause 1000;
  
  (* Second possession: Santi *)
  show_image "santi_seeing_agnivesh_horror";
  
  dialogue "SANTI" "(terrified)" "Agni? AGNI?!";
  
  t "She reaches for him—!";
  pause 300;
  
  vfx "spirit_grabs_santi";
  sfx "possession_second_entry";
  
  show_image "santi_possessed_serpent";
  unlock_art "santi_possessed_serpent" "🖼️ HORROR — The Serpent Awakens Wrong";
  
  t "Another spirit wraps around her like a serpent!";
  t "Enters through her SPINE!";
  t "Her body arches — bones cracking — eyes go GOLD then BLACK!";
  pause 800;
  
  t "Glass scales ripple across her skin.";
  t "Fangs extend. Hissing laughter.";
  pause 600;
  
  dialogue "POSSESSED_SANTI" "(hissing, multiple voices)" "Sssso long... in the dark... in the cold...";
  
  pause 800;
  
  (* The group's terror *)
  show_image "group_surrounded_horror";
  
  dialogue "RIKU" "(backing up, terrified)" "This is BAD. This is VERY BAD.";
  
  dialogue "ELENA" "(voice shaking)" "They're not Agnivesh and Santi anymore.";
  
  dialogue "DAVID" "(weapon lowered, useless)" "Fall back! FALL BACK!";
  
  dialogue "MC" "(frozen, staring)" "> No. No. We can't leave them. We can't—";
  
  (* === PART 4: MC's CHOICE — PARALYSIS OR ACTION === *)
  show_image "possessed_agnivesh_santi_approaching";
  vfx "black_fire_spreading";
  sfx "hissing_laughter_wrong";
  
  t "The possessed forms advance.";
  t "Black fire. Glass fangs. Eyes empty of mercy.";
  pause 800;
  
  show_image "mc_frozen_fear";
  
  t "Your body locks.";
  t "Muscles turn to stone.";
  t "The same paralysis. The same failure.";
  t "Episode 1. The temple burning. Agnivesh reaching out.";
  t "You froze then.";
  pause 800;
  
  t "And you're freezing now.";
  pause 1000;
  
  vfx "flashback_glitch_ep1";
  sfx "memory_echo";
  
  t "(MEMORY: Rain. Fire. Agnivesh's eyes finding yours. Hope flickering. You ran.)";
  pause 800;
  
  show_image "mc_shaking_present";
  
  dialogue "MC" "(thoughts, desperate)" "> Not again. Please not again. MOVE. MOVE!";
  
  pause 600;
  
  ui "🔥 CRITICAL CHOICE — What do you do?";
  ui "1) 🏃 Run (Survival) | 2) 🛡️ Stand your ground (Courage) | 3) 🫂 Crawl to Agnivesh (Compassion)";
  
  let possession_choice = player_choice () in
  (match possession_choice with
  | 1 ->
    (* SURVIVAL PATH — RUN *)
    dialogue "MC" "(breaking, terrified)" "I— I can't—!";
    t "You turn. You RUN.";
    t "Feet pounding stone. Heart pounding skull. COWARD. COWARD. COWARD.";
    dialogue "DAVID" "(shouting after)" "Wait! Don't—!";
    t "But you're already gone. Again. Like before.";
    add_karma (-3);
    set_flag "mc_ran_from_possession" true;
    goto "scene8_ran_path";
    
  | 2 ->
    (* COURAGE PATH — STAND GROUND *)
    dialogue "MC" "(forcing words out)" "No. Not this time.";
    t "Your legs shake. But they hold.";
    dialogue "MC" "(louder, to possessed forms)" "I'm not running!";
    dialogue "MC" "You want someone to hurt? HURT ME!";
    t "The possessed pause. Turn. Focus on YOU.";
    add_karma 2;
    set_flag "mc_stood_ground" true;
    goto "scene8_courage_path";
    
  | _ ->
    (* COMPASSION PATH — CRAWL TO HIM *)
    dialogue "MC" "(whisper, breaking)" "I won't leave you. Not again.";
    t "Your legs won't work. So you DROP.";
    t "Hands. Knees. Stone tears skin.";
    show_image "mc_crawling_to_agnivesh_horror";
    unlock_art "mc_crawling_to_agnivesh_horror" "🖼️ EPIC — Crawling Into Fire";
    t "You CRAWL toward the possessed Agnivesh.";
    pause 800;
    dialogue "DAVID" "(horrified)" "What are you DOING?!";
    dialogue "MC" "(crawling, bleeding)" "What I should have done before.";
    dialogue "MC" "(louder)" "I'm STAYING!";
    t "Black fire licks your skin. Burns. You keep crawling.";
    add_karma 5;
    set_flag "mc_crawled_to_agnivesh" true;
    goto "scene8_compassion_path";
  );
  ()

(*
============================================================================
SCENE 8 — COMPASSION PATH (Epic Climax)
This is THE moment. Make it legendary.
============================================================================
*)

let scene8_compassion_path () =
  ::SCENE8_COMPASSION_PATH::
  
  (* MC reaches Agnivesh *)
  show_image "mc_at_possessed_agnivesh_feet";
  sfx "breathing_ragged_determined";
  
  t "You reach him.";
  t "Knees bloody. Hands torn. Heart thundering.";
  pause 800;
  
  show_image "possessed_agnivesh_looking_down";
  vfx "black_fire_flickering_uncertain";
  
  t "The possessed Agnivesh looks down at you.";
  t "Black eyes. Empty. Burning.";
  pause 600;
  
  dialogue "POSSESSED_AGNIVESH" "(voice layered, confused)" "You... stayed?";
  
  pause 800;
  
  show_image "mc_reaching_up_hand";
  
  dialogue "MC" "(hand reaching up, voice breaking)" "I stayed.";
  dialogue "MC" "I'm sorry I ran before. I'm sorry I left you.";
  pause 800;
  
  dialogue "MC" "But I'm here now. And I'm not leaving.";
  pause 1000;
  
  t "Your hand touches his.";
  pause 600;
  
  vfx "light_crack_appearing";
  sfx "crack_small_glass";
  
  t "The black fire FLICKERS.";
  t "A crack appears in the possession.";
  t "Small. Fragile. REAL.";
  pause 800;
  
  show_image "agnivesh_eyes_fighting_inside";
  
  t "Behind the black eyes — a flicker of GOLD.";
  t "Agnivesh. Still in there. Fighting.";
  pause 600;
  
  dialogue "AGNIVESH" "(voice weak, breaking through)" "You... you came back...";
  
  dialogue "MC" "(gripping his hand tighter)" "I came back.";
  
  (* The spirits RAGE *)
  vfx "spirits_shrieking_losing_control";
  sfx "screaming_many_furious";
  
  show_image "spirits_swirling_furious";
  
  dialogue "SPIRIT_VOICES" "(overlapping, furious)" "NO! THEY ALWAYS RUN! THEY ALWAYS LEAVE!";
  dialogue "SPIRIT_VOICES" "NO ONE STAYS! NO ONE CARES! NO ONE—!";
  
  (* MC's declaration *)
  show_image "mc_standing_defiant";
  
  dialogue "MC" "(standing, voice ringing)" "I CARE!";
  dialogue "MC" "And I'm STAYING!";
  pause 800;
  
  dialogue "MC" "You're not monsters. You're people who were HURT.";
  dialogue "MC" "People who were abandoned. Betrayed. Forgotten.";
  dialogue "MC" "(softer)" "I know what that feels like.";
  pause 800;
  
  dialogue "MC" "But hurting others won't heal you.";
  dialogue "MC" "It just spreads the wound.";
  pause 1000;
  
  (* The shift *)
  vfx "black_fire_turning_gold";
  sfx "transformation_gentle";
  
  show_image "agnivesh_possession_breaking";
  
  t "The black fire around Agnivesh begins to shift.";
  t "Black to red. Red to orange. Orange to GOLD.";
  pause 600;
  
  dialogue "POSSESSED_AGNIVESH" "(voice losing layers)" "But... we were so ANGRY...";
  
  dialogue "MC" "(gentle)" "I know. And anger is real. Anger is valid.";
  dialogue "MC" "But you don't have to BE your anger.";
  pause 800;
  
  (* Santi joins *)
  show_image "santi_possession_breaking_too";
  
  t "Santi's possession cracks.";
  t "Glass scales fall away like rain.";
  t "Her voice returns — human, broken, HER.";
  pause 600;
  
  dialogue "SANTI" "(sobbing)" "We're so tired... of being angry...";
  
  dialogue "MC" "Then rest. Let go. You don't have to carry this anymore.";
  
  (* The release *)
  vfx "spirits_releasing_light";
  sfx "souls_releasing_peace";
  
  show_image "spirits_dissolving_into_light";
  unlock_art "spirits_dissolving_into_light" "🖼️ The Liberation — Rage Becomes Peace";
  
  t "The spirits begin to dissolve.";
  t "Not destroyed. RELEASED.";
  t "Black smoke turns to gold light.";
  t "Rage turns to relief.";
  t "And one by one... they let go.";
  pause 1000;
  
  show_image "agnivesh_santi_collapsing_human";
  
  t "Agnivesh and Santi collapse.";
  t "Human again. Whole. Breathing.";
  pause 600;
  
  show_image "mc_catching_agnivesh";
  
  dialogue "MC" "(catching him)" "I've got you.";
  
  dialogue "AGNIVESH" "(weak, eyes gold again)" "You stayed...";
  
  dialogue "MC" "(tears falling)" "I stayed.";
  
  pause 1200;
  
  (* Badge and karma *)
  let (bid, btitle) = badge_ep3_compassion_forge in
  award_badge bid btitle;
  
  let (bid2, btitle2) = badge_ep3_horror_survived in
  award_badge bid2 btitle2;
  
  unlock_art "mc_agnivesh_aftermath_golden" "🖼️ The Moment They Both Survived";
  
  add_karma 5;
  add_romance "Agnivesh" 3;
  set_flag "possessed_saved_with_compassion" true;
  
  pause 1000;
  goto "scene9_aftermath";
  ()

(*
============================================================================
SCENE 9 — AFTERMATH & DIEGO RESCUE
============================================================================
*)

let scene9_aftermath () =
  ::SCENE9_AFTERMATH::
  
  vfx "golden_light_fading";
  sfx "wind_gentle_return";
  
  show_image "temple_chamber_clearing";
  
  t "The spirits are gone.";
  t "The red light fades.";
  t "The chamber breathes again.";
  pause 600;
  
  show_image "barrier_dissolving";
  vfx "magical_barrier_fade";
  
  t "The barrier around Diego DISSOLVES.";
  pause 400;
  
  show_image "camilla_rushing_to_diego";
  sfx "running_mother";
  
  dialogue "CAMILLA" "(crying out)" "DIEGO!";
  
  t "She rushes forward — no barrier now.";
  t "Gathers him into her arms.";
  pause 800;
  
  show_image "diego_waking_in_mothers_arms";
  
  dialogue "DIEGO" "(groggy, confused)" "...Mama?";
  
  dialogue "CAMILLA" "(sobbing, laughing)" "Yes, baby. Yes. I'm here. You're safe.";
  
  t "Mert kneels beside them — places wooden sword in Diego's hands.";
  pause 600;
  
  show_image "mert_returning_sword_to_diego";
  unlock_art "mert_returning_sword_to_diego" "🖼️ The Blade Returned";
  
  dialogue "MERT" "(voice rough with emotion)" "You earned this back, kid.";
  dialogue "MERT" "Every warrior keeps their blade... once they learn when NOT to use it.";
  
  dialogue "DIEGO" "(taking it with both hands, solemn)" "I was brave. Just like you taught me.";
  
  dialogue "MERT" "(smiling through tears)" "The bravest.";
  
  let (bid, btitle) = badge_ep3_guardian_oath in
  award_badge bid btitle;
  
  pause 1000;
  
  (* Sofia's moment *)
  show_image "sofia_watching_reunion";
  
  t "Sofia watches from the edge.";
  t "No camera. No lens. No shield.";
  t "Just seeing. Just present.";
  pause 600;
  
  dialogue "SOFIA" "(quiet, to herself)" "I see you, Diego.";
  dialogue "SOFIA" "(quieter)" "I see you, Liana.";
  dialogue "SOFIA" "(whisper)" "And maybe... I'm starting to see me.";
  
  pause 800;
  goto "scene10_temple_exit";
  ()

(*
============================================================================
SCENE 10 — TEMPLE EXIT & TRANSITION TO EPISODE 3.5
============================================================================
*)

let scene10_temple_exit () =
  ::SCENE10_TEMPLE_EXIT::
  
  show_image "group_leaving_temple_sunset";
  vfx "golden_sunset_light";
  sfx "waves_gentle_shore";
  
  t "The group emerges from the temple.";
  t "Sunset paints the shore gold and turquoise.";
  pause 600;
  
  t "Everyone is exhausted. Battered. Changed.";
  pause 400;
  
  show_image "aurora_observing_group";
  
  dialogue "AURORA" "(soft wonder)" "Manipura cycle complete. Will aligned with compassion.";
  dialogue "AURORA" "You acted with purpose. Not pride.";
  pause 600;
  
  dialogue "AURORA" "(curious)" "How does it feel? To transmute rage into mercy?";
  
  dialogue "MC" "(tired smile)" "Exhausting. And necessary.";
  
  dialogue "AURORA" "(gentle laugh)" "That's very human.";
  
  pause 800;
  
  (* Distance: Festival lights *)
  show_image "festival_lights_distant";
  vfx "lanterns_floating_warm";
  sfx "music_distant_gentle";
  
  t "In the distance: lights.";
  t "Floating lanterns. Music. Laughter.";
  t "A festival. Rest. Respite.";
  pause 600;
  
  dialogue "ELENA" "(pointing)" "Is that... a party?";
  
  dialogue "RIKU" "(grinning weakly)" "After the day we had? I'll take it.";
  
  dialogue "DAVID" "Everyone needs rest. Regroup. Process.";
  
  dialogue "CAMILLA" "(holding Diego)" "And maybe... celebrate being alive.";
  
  pause 800;
  
  show_image "group_walking_toward_festival";
  
  t "They walk toward the lights.";
  t "Tired. Wounded. Together.";
  pause 600;
  
  dialogue "AURORA" "(soft)" "Mantra for tonight: 'Strength remembers its purpose.'";
  
  ui "🕉 New Mantra Unlocked — Strength remembers its purpose.";
  
  pause 1000;
  
  fade_to_black ();
  pause 1500;
  
  caption "→ TRANSITION: EPISODE 3.5 — Festival of Stillness (Savasana)";
  caption "Rest. Reflect. Choose who walks beside you into the heart.";
  
  pause 2000;
  
  (* Episode 3 complete *)
  set_flag "episode_3_complete" true;
  ()

(*
============================================================================
MAIN EPISODE 3 ORCHESTRATION
============================================================================
*)

let run_episode3 () =
  prologue_sofia_liana ();
  scene1_search_begins ();
  scene2_riku_enters ();
  scene3_codex_unlock ();
  scene4_sofia_flash ();
  scene5_camera_shatters ();
  scene6_temple_entrance ();
  scene7_possession_horror ();
  (* scene8 branches handled in scene7 choice *)
  (* scene9 and scene10 follow from scene8 *)
  ()

(*
============================================================================
CODEX ENTRIES (Complete)
============================================================================
*)

let codex_init_ep3 () =
  unlock_codex_entry codex_manipura_id
    "Manipura (Solar Plexus) — The fire at your center. \
     Governs will, purpose, confidence, and the courage to act. \
     When balanced: you move with direction, not dominance. \
     When blocked: pride consumes you, or paralysis freezes you.";
  
  unlock_codex_entry codex_haarp_weapon_id
    "HAARP (High-frequency Active Auroral Research Program) — \
     Officially: Ionosphere research. \
     Conspiracy: Weather control, earthquake generation, mind manipulation. \
     David served in black ops. He's seen the equipment that 'doesn't exist.' \
     Some weapons don't leave bullet holes. They leave cracks in reality itself.";
  
  unlock_codex_entry codex_siddhis_id
    "Siddhis (Supernatural Powers) — \
     In Hindu and Buddhist traditions: abilities gained through intense meditation and tapas. \
     Agnivesh and Santi performed extreme practices to gain powers after trauma. \
     They manifested as panther (fire) and serpent (binding). \
     But powers born from pain can become cages. \
     Sometimes the strongest power is letting go.";
  
  unlock_codex_entry codex_possession_id
    "Spirit Possession — When rage and pain refuse to die. \
     The spirits in the temple were people once. \
     Betrayed. Forgotten. Silenced. \
     Their anger became them. Their pain became prison. \
     But rage, when witnessed without judgment, can finally rest. \
     Sometimes the cure for possession is just... staying.";
  
  unlock_codex_entry "codex_sofia_liana"
    "Sofia & Liana — A love built on being seen without proof. \
     Liana gave Sofia a camera: 'Use it for truth, not hiding.' \
     Sofia used it wrong for two years. Then it shattered. \
     Now she sees without lenses. Without shields. Without hiding. \
     The hardest truth to photograph is yourself.";
  ()

(*
============================================================================
END OF EPISODE 3 SCRIPT
============================================================================
*)
