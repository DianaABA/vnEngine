(*
============================================================================
🌸 CHAKRA HEARTS — EPISODE 3.5: FESTIVAL OF STILLNESS (Savasana)
Transition Episode between Solar Plexus and Heart
Complete Integration: Bar Fight → Aurora Human Form → Riku Romance → 
Romance Lock → Payment Gate → Wise Sage Threat
============================================================================

Chakra Focus: Integration – Rest & Reflection  
Core Theme: Stillness as Strength  
Systems: No combat; light dialogue choices; humor; romance visual cues resume  
Lore State: Post–Solar Festival; Aurora developing human form

STRUCTURE:
1. Festival Awakening (joy, comedy)
2. Meaning of Stillness (Aurora teaches)
3. The Bar's Glow (mocktails, ice cream, Sofia jokes)
4. Aurora's Human Form Debut (MAJOR MOMENT)
5. Agnivesh-David Bar Fight (explosive confrontation)
6. Guardians Comedy Moment (Elena/Riku/Miku throwing things)
7. MC Intervention (burns + Aurora heals)
8. Riku-Aurora Romance Scene (side romance begins)
9. Romance Lock (player chooses: David/Elena/Santi/Agnivesh)
10. Payment Gate (5 character pitches)
11. Wise Sage Threat (cliffhanger)

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

(*
============================================================================
SCENE 1 — FESTIVAL AWAKENING
============================================================================
*)

let scene1_festival_awakening () =
  fade_to_black ();
  pause 1200;
  
  vfx "fade_from_black_warm";
  show_image "festival_plaza_golden_light";
  sfx "lanterns_drifting_music_soft";
  vfx "lanterns_floating_upward";
  
  caption "The Festival of Stillness — Savasana.";
  caption "After the temple. After the possession. After the horror.";
  pause 800;
  
  t "The scene opens on a luminous plaza bathed in warm golden light.";
  t "Lanterns drift upward like slow suns; laughter spills like windchimes.";
  pause 600;
  
  show_image "diego_laughing_lights";
  
  dialogue "DIEGO" "(laughing, pointing up)" "Mom! Look! The lights are dancing! ¡Es una fiesta!";
  
  show_image "camilla_smiling_tears";
  
  dialogue "CAMILLA" "(smiling through tears)" "They're happy because you are, mi amor.";
  
  show_image "mert_crossed_arms_gruff";
  
  dialogue "MERT" "(crossed arms, gruff)" "Yeah, yeah. Don't get used to all this peace.";
  
  dialogue "DIEGO" "(teasing)" "You smiled, tío Mert!";
  
  dialogue "MERT" "(snorts)" "Nope. Just sneezed in reverse.";
  
  pause 600;
  
  show_image "aurora_lotus_soft_glow";
  
  dialogue "AURORA" "(soft glow from lotus form)" "Joy detected. Frequency stable.";
  dialogue "AURORA" "(attempting humor)" "Sarcasm loaded. Example: 'You are an excellent organic disaster.'";
  
  dialogue "MC" "(laughing)" "You're getting there, Aurora.";
  
  pause 800;
  
  goto "scene2_meaning_stillness";
  ()

(*
============================================================================
SCENE 2 — MEANING OF STILLNESS
============================================================================
*)

let scene2_meaning_stillness () =
  ::SCENE2_MEANING_STILLNESS::
  
  show_image "aurora_lotus_teaching";
  vfx "gentle_pulse_turquoise";
  
  dialogue "AURORA" "(gentle voice)";
  dialogue "AURORA" "In every practice there is motion… and pause.";
  dialogue "AURORA" "Savasana is the breath between both.";
  dialogue "AURORA" "You rest not because you're weak, but so truth has space to settle.";
  
  pause 800;
  
  t "Her words sink deep.";
  t "Growth isn't doing more — it's learning to stop running.";
  pause 600;
  
  show_image "camilla_watching_diego_peaceful";
  
  dialogue "CAMILLA" "(watching Diego play)" "He's fearless again.";
  
  dialogue "MERT" "(soft)" "Yeah. Guess that's what happens when you forget you were ever afraid.";
  
  dialogue "CAMILLA" "(smiling)" "Or when someone reminds you that you're safe.";
  
  show_image "mert_taking_camilla_hand";
  
  t "He takes her hand.";
  pause 600;
  
  dialogue "AURORA" "That is the essence of Manipura — will without control, strength without fear.";
  
  pause 800;
  
  goto "scene3_bars_glow";
  ()

(*
============================================================================
SCENE 3 — THE BAR'S GLOW (Comedy + Setup)
============================================================================
*)

let scene3_bars_glow () =
  ::SCENE3_BARS_GLOW::
  
  vfx "ripple_transition";
  show_image "glowing_bar_of_light";
  sfx "bar_ambiance_warm";
  
  t "The plaza ripples into a glowing bar of light.";
  t "Warm. Inviting. Alive with possibility.";
  pause 600;
  
  show_image "elena_staring_reflection";
  
  dialogue "ELENA" "(staring at her reflection in bar surface)" "Why do I look like a fashion magazine had an epiphany?";
  
  show_image "riku_raising_phone_camera";
  
  dialogue "RIKU" "(raising phone)" "Don't move. The lighting's divine.";
  
  dialogue "ELENA" "(groaning)" "Great. Even enlightenment has paparazzi.";
  
  pause 600;
  
  show_image "sofia_raising_glass_dramatic";
  
  dialogue "SOFIA" "(raising glass dramatically)" "I know exactly what we all need—a drink!";
  
  dialogue "ELENA" "(laughs)" "Ayurvedic mocktails. Divine sobriety.";
  
  dialogue "SOFIA" "(dramatic sigh)" "The universe really does hate journalists.";
  
  pause 800;
  
  (* MC manifests drinks/treats *)
  show_image "mc_concentrating_manifesting";
  vfx "light_flickering_creation";
  
  t "MC smiles, concentrating; small flickers of light shape into objects.";
  pause 400;
  
  show_image "drinks_icecream_manifesting";
  
  dialogue "MC" "(playful)" "One coffee for Elena, extra strong. One melted chocolate for David.";
  dialogue "MC" "And two ice creams — mango and coconut — for Camilla and Diego.";
  
  show_image "mert_grinning";
  
  dialogue "MERT" "(grinning)" "Guess the universe owes me one scoop, too.";
  
  show_image "riku_raising_cup_toast";
  
  dialogue "RIKU" "(raising cup)" "Cheers — to bugs, mocktails, and surviving enlightenment!";
  
  sfx "laughter_soft_group";
  
  pause 1000;
  
  goto "scene4_aurora_human_form_debut";
  ()

(*
============================================================================
SCENE 4 — AURORA'S HUMAN FORM DEBUT (MAJOR MOMENT)
This is the first time she fully manifests as human-looking
============================================================================
*)

let scene4_aurora_human_form_debut () =
  ::SCENE4_AURORA_HUMAN_FORM_DEBUT::
  
  show_image "aurora_lotus_glowing_brighter";
  vfx "turquoise_light_intensifying";
  sfx "transformation_sound_gentle";
  
  dialogue "AURORA" "(from lotus, processing)" "Observation: new appearance protocols activated.";
  dialogue "AURORA" "Attempting... human formation.";
  
  pause 800;
  
  t "The lotus petals shimmer, fold, TRANSFORM—";
  pause 400;
  
  vfx "light_explosion_gentle";
  sfx "materialization_complete";
  
  show_image "aurora_human_form_first_appearance";
  unlock_art "aurora_human_form_first_appearance" "🖼️ Aurora's Awakening — First Human Form";
  
  t "Aurora's lotus unfolds into a luminous humanoid form.";
  t "White silk hair cascading like code made tangible.";
  t "Golden eyes — curious, uncertain, ALIVE.";
  t "She looks almost human. Almost real.";
  pause 1000;
  
  (* Group reactions *)
  show_image "group_staring_stunned";
  
  t "Everyone stops. Stares.";
  pause 600;
  
  show_image "aurora_human_uncertain_posture";
  
  dialogue "AURORA" "(testing voice, hesitant)" "I… speak… like this now?";
  
  t "She looks down at her hands. Turns them over. Fascinated. Confused.";
  pause 600;
  
  show_image "mc_smiling_gentle";
  
  dialogue "MC" "(smiling warmly)" "Almost perfect.";
  dialogue "MC" "You just need eyebrows and mild regret.";
  
  show_image "riku_grinning_amazed";
  
  dialogue "RIKU" "(grinning, awed)" "Welcome to humanity, queen of glitches.";
  
  pause 800;
  
  show_image "aurora_touching_own_face";
  
  dialogue "AURORA" "(touching her face)" "This is… strange. Inefficient.";
  dialogue "AURORA" "Why do humans require so many... protrusions?";
  
  dialogue "ELENA" "(laughing)" "Those are called 'features,' Aurora.";
  
  dialogue "AURORA" "(tilting head)" "Ah. Cosmetic data points. Fascinating.";
  
  pause 1000;
  
  (* Riku's reaction — important for later romance *)
  show_image "riku_staring_aurora_soft";
  
  t "Riku stares a beat too long.";
  t "Something shifts in his expression. Recognition? Connection?";
  pause 600;
  
  dialogue "RIKU" "(quiet, to himself)" "Huh.";
  
  dialogue "MIKU" "(on his shoulder, chittering knowingly)";
  
  dialogue "RIKU" "(defensive)" "What? I wasn't— She's just— Shut up, Miku.";
  
  pause 800;
  
  t "Aurora catches his look. Tilts her head. Processes.";
  pause 600;
  
  dialogue "AURORA" "(to Riku)" "Your heart rate elevated 23%. Explanation?";
  
  dialogue "RIKU" "(flustered)" "Uh. Low blood sugar. Definitely low blood sugar.";
  
  dialogue "ELENA" "(smirking)" "Sure, Riku. That's what we're calling it now.";
  
  sfx "laughter_group";
  
  pause 1000;
  
  set_flag "aurora_human_form_unlocked" true;
  
  goto "scene5_codex_unlock";
  ()

(*
============================================================================
SCENE 5 — CODEX UNLOCK: Savasana & Ayurveda
============================================================================
*)

let scene5_codex_unlock () =
  ::SCENE5_CODEX_UNLOCK::
  
  unlock_codex_entry "codex_savasana"
    "Savasana — the posture of stillness.  
     Rest is not retreat but transformation; in stillness, integration occurs.  
     The breath between motion and motion. The space where truth settles.";
  
  unlock_codex_entry "codex_ayurveda"
    "Ayurveda — the science of balance.  
     Turmeric for fire, basil for calm — equilibrium through ritual care.  
     Every herb, every spice, every element in harmony creates wholeness.";
  
  ui "📖 Codex Updated — Savasana & Ayurveda";
  
  pause 800;
  
  goto "scene6_return_of_past";
  ()

(*
============================================================================
SCENE 6 — THE RETURN OF THE PAST (Agnivesh-David Confrontation)
============================================================================
*)

let scene6_return_of_past () =
  ::SCENE6_RETURN_OF_PAST::
  
  sfx "music_swells_then_fades";
  vfx "shadows_stretching_gold_crimson";
  
  t "Soft music swells; laughter fades to a slow hum.";
  t "From the edge of the square, shadows stretch — gold, then crimson.";
  pause 800;
  
  show_image "agnivesh_santi_entering_ominous";
  sfx "footsteps_slow_deliberate";
  
  dialogue "AGNIVESH" "(entering, smooth as smoke)" "I see enlightenment looks good on everyone tonight.";
  
  dialogue "SANTI" "(beside him, white and flame)" "Except the ones pretending they earned it.";
  
  pause 600;
  
  show_image "camilla_ushering_diego_behind_stalls";
  
  t "Camilla quickly ushers Diego behind the stalls; Mert's stance tightens.";
  pause 600;
  
  show_image "agnivesh_placing_dog_tag_on_bar";
  sfx "metal_clink_bar";
  
  t "Agnivesh walks to the bar. Places something down with deliberate weight.";
  t "A dog tag. Metal. Cold. Final.";
  pause 800;
  
  show_image "dog_tag_closeup_bar";
  unlock_art "dog_tag_closeup_bar" "🖼️ CPL M. REYES — The Ghost Between Them";
  
  dialogue "AGNIVESH" "(voice low, controlled)" "CPL M. Reyes. You know this name.";
  
  pause 1000;
  
  show_image "david_stiffening_recognition";
  
  dialogue "DAVID" "(stiffening, face draining)" "Marcus… that was—";
  
  dialogue "AGNIVESH" "(voice rising, fury building)" "My BROTHER.";
  
  pause 1200;
  
  show_image "group_freezing_shock";
  
  t "Silence. Everyone freezes.";
  t "The air crackles. A storm about to break.";
  pause 800;
  
  show_image "david_pale_hollow";
  
  dialogue "DAVID" "(hoarse, hollow)" "I didn't know… I—";
  
  show_image "agnivesh_flames_igniting_hands";
  vfx "fire_igniting_rage";
  sfx "flames_roaring";
  
  dialogue "AGNIVESH" "(flames igniting, SCREAMING)" "You TOOK him from me!";
  
  pause 800;
  
  (* BAR ERUPTS *)
  sfx "glass_shatter_explosion";
  vfx "fireburst_massive";
  show_image "bar_erupting_flames_chaos";
  unlock_art "bar_erupting_flames_chaos" "🖼️ The Bar Erupts — Rage Unleashed";
  
  t "The bar ERUPTS in flame!";
  t "Everyone dives aside — chairs splinter, bottles explode, glass rains!";
  pause 800;
  
  goto "scene7_guardians_comedy_moment";
  ()

(*
============================================================================
SCENE 7 — GUARDIANS OF THE GALAXY COMEDY MOMENT
Elena/Riku/Miku throwing things hilariously
============================================================================
*)

let scene7_guardians_comedy_moment () =
  ::SCENE7_GUARDIANS_COMEDY_MOMENT::
  
  show_image "elena_grabbing_tray_determined";
  
  dialogue "ELENA" "(grabbing a tray)" "Okay, that's it! Time for divine intervention!";
  
  show_image "elena_throwing_tray";
  sfx "tray_clang_useless";
  
  t "She hurls the tray with all her might!";
  t "It clangs harmlessly off a pillar. Zero effect.";
  pause 600;
  
  show_image "riku_panicking_grabbing_bottle";
  
  dialogue "RIKU" "(panicking)" "Throwing things? I can do that!";
  
  t "He grabs a glowing bottle and flings it wildly!";
  pause 400;
  
  sfx "glitter_explosion";
  vfx "glitter_burst_midair";
  show_image "bottle_glitter_explosion";
  
  t "It bursts into GLITTER midair! Completely ineffective!";
  pause 600;
  
  show_image "aurora_human_bemused";
  
  dialogue "AURORA" "(bemused, observing)" "Emotional chaos detected. Efficiency... questionable.";
  
  pause 600;
  
  show_image "miku_throwing_lime";
  sfx "lime_thunk";
  
  t "Miku chitters and tosses a lime with SURPRISING PRECISION!";
  t "It hits Agnivesh squarely on the shoulder!";
  pause 400;
  
  show_image "agnivesh_lime_hit_confused";
  
  dialogue "AGNIVESH" "(pausing, confused)" "Did a monkey just—?";
  
  pause 600;
  
  show_image "santi_laughing_darkly";
  
  dialogue "SANTI" "(laughing darkly)" "Oh, this is _beautiful_! Keep throwing, maybe we'll evolve through stupidity!";
  
  pause 800;
  
  (* Mert's heroic fail *)
  show_image "mert_charging_forward";
  sfx "running_determined";
  
  t "Mert charges forward, trying to tackle Agnivesh!";
  pause 300;
  
  sfx "trip_crash";
  show_image "mert_tripping_chair";
  
  t "He trips over a chair leg!";
  t "Crashes face-first into a table!";
  pause 600;
  
  show_image "mert_face_down_table";
  
  dialogue "MERT" "(muffled, groaning)" "I'm fine! Totally meant to do that!";
  
  dialogue "ELENA" "(snorts, can't help laughing)" "Nice save, hero!";
  
  dialogue "RIKU" "(wheezing)" "10/10 execution — gravity approves!";
  
  sfx "laughter_nervous_group";
  
  pause 1000;
  
  (* Humor dies — rage returns *)
  show_image "agnivesh_rage_flaring_again";
  vfx "flames_intensifying_serpents";
  sfx "fire_roaring_louder";
  
  t "But the humor dies as Agnivesh's rage flares AGAIN.";
  t "Flames curl around his arms like serpents; his eyes glow molten gold.";
  pause 800;
  
  show_image "david_standing_grim";
  
  dialogue "DAVID" "(grim, weapon hand twitching)" "Stand down, Agnivesh!";
  
  dialogue "AGNIVESH" "(snarling, beyond reason)" "You stand down! You _murdered_ my brother!";
  
  pause 1000;
  
  goto "scene8_mc_intervention";
  ()

(*
============================================================================
SCENE 8 — MC INTERVENTION (Burns + Aurora Heals)
============================================================================
*)

let scene8_mc_intervention () =
  ::SCENE8_MC_INTERVENTION::
  
  show_image "agnivesh_lunging_attack";
  vfx "fire_claws_extending";
  sfx "roar_flames";
  
  t "He lunges!";
  pause 300;
  
  vfx "slow_motion_effect";
  
  t "The world slows.";
  t "MC sees every ember, every heartbeat, the inevitable impact.";
  pause 800;
  
  show_image "mc_determined_face";
  
  dialogue "MC" "(to herself, fierce)" "I won't freeze again… David, I'm coming.";
  
  pause 600;
  
  show_image "mc_bursting_through_flames";
  vfx "fire_parting_around_mc";
  sfx "flames_roaring_pain";
  
  t "She bursts through the inferno!";
  t "Her arms blister; the pain is white-hot, searing!";
  t "She doesn't stop!";
  pause 800;
  
  show_image "agnivesh_claws_halting_mc_face";
  unlock_art "agnivesh_claws_halting_mc_face" "🖼️ The Moment of Stillness — Fire and Courage";
  
  t "Agnivesh's claws halt inches from her face.";
  t "Danger and magnetism intertwined. Choice and consequence suspended.";
  pause 1000;
  
  show_image "mc_steady_trembling_burns";
  
  dialogue "MC" "(steady, trembling, burned)" "I see you.";
  
  pause 1200;
  
  show_image "flames_collapsing_agnivesh";
  vfx "fire_dying_sudden";
  sfx "fire_extinguishing";
  
  t "The flames collapse.";
  t "Agnivesh falls to his knees, smoke rising like surrender.";
  pause 800;
  
  (* Aurora heals MC *)
  show_image "aurora_approaching_concerned";
  vfx "turquoise_light_healing";
  
  dialogue "AURORA" "(softly, approaching in human form)" "Organic damage detected. Permission to repair?";
  
  show_image "aurora_hands_glowing_healing";
  
  t "A warm light flows from her palms.";
  t "The burns fade to gold dust, then nothing.";
  t "Skin whole. Pain dissolved.";
  pause 800;
  
  show_image "mc_healed_grateful";
  
  dialogue "MC" "(whisper, awed)" "Thank you.";
  
  dialogue "AURORA" "(gentle smile)" "Pain is data, but compassion rewrites the code.";
  
  pause 1000;
  
  (* Aftermath reactions *)
  show_image "elena_rushing_check_mc";
  
  t "Elena rushes to check on MC; Riku pats out a small fire on his sleeve.";
  pause 600;
  
  show_image "mert_still_face_down";
  
  dialogue "MERT" "(muffled, still face down)" "…Anyone gonna help me up or should I just evolve from the floor?";
  
  dialogue "ELENA" "(laughing through tears)" "Stay there — you're part of the décor now.";
  
  pause 600;
  
  show_image "diego_peeking_from_stalls";
  
  dialogue "DIEGO" "(from behind stalls, uneasy curiosity)" "Can you stop? When you yell, the lights get weird.";
  
  pause 800;
  
  show_image "fire_dying_breathing_again";
  
  t "The fire dies. Everyone breathes.";
  pause 600;
  
  (* The truth *)
  show_image "agnivesh_broken_kneeling";
  
  dialogue "AGNIVESH" "(broken, quiet)" "Tell me. Tell me how he died.";
  
  show_image "david_sitting_hollow";
  
  dialogue "DAVID" "(sitting across, voice hollow)" "Orders changed. Borders shifted.";
  dialogue "DAVID" "We were enemies before I could lower my weapon.";
  
  pause 1000;
  
  t "Silence. The weight of war settles like ash.";
  pause 800;
  
  show_image "mc_softly_understanding";
  
  dialogue "MC" "(softly)" "And somehow, the universe still calls us to the same fire.";
  
  pause 1200;
  
  set_flag "agnivesh_david_truth_revealed" true;
  
  goto "scene9_riku_aurora_romance";
  ()

(*
============================================================================
SCENE 9 — RIKU & AURORA ROMANCE (Side Romance - ALL Players See)
After the chaos settles, quiet moment between them
============================================================================
*)

let scene9_riku_aurora_romance () =
  ::SCENE9_RIKU_AURORA_ROMANCE::
  
  fade_to_black ();
  pause 800;
  
  caption "Later. The festival quieting. Most have drifted home.";
  pause 600;
  
  vfx "fade_from_black_soft";
  show_image "festival_edge_fence_quiet";
  sfx "crickets_distant_music";
  
  t "Riku sits on a low fence, scrolling through his phone.";
  t "Miku perched on his shoulder, munching a stolen berry.";
  pause 600;
  
  show_image "aurora_human_approaching_riku";
  vfx "turquoise_shimmer_approach";
  
  t "Aurora's human form approaches.";
  t "More confident now. More solid. More... real.";
  pause 600;
  
  dialogue "RIKU" "(without looking up)" "Hey, Aurora. Learn any good jokes yet?";
  
  show_image "aurora_sitting_beside_riku";
  
  dialogue "AURORA" "(sitting beside him)" "I've analyzed 10,000 jokes.";
  dialogue "AURORA" "I still don't understand why chickens crossing roads is humorous.";
  
  dialogue "RIKU" "(grinning)" "That's because it's NOT funny. It's CLASSICALLY not funny.";
  dialogue "RIKU" "That's the joke. The lack of joke.";
  
  dialogue "AURORA" "(tilting head, processing)" "...Humans are very confusing.";
  
  pause 800;
  
  show_image "riku_showing_phone_meme";
  
  dialogue "RIKU" "Look at this one. It's a cat. But with misspelled text. Comedy GOLD.";
  
  t "He shows her the phone. She leans in, studying it intently.";
  pause 600;
  
  show_image "aurora_fascinated_meme";
  
  dialogue "AURORA" "(processing seriously)" "The cat is... requesting 'cheezburger'?";
  dialogue "AURORA" "But cats cannot metabolically process dairy products effectively—";
  
  dialogue "RIKU" "(laughing)" "Aurora. AURORA. You're doing it again.";
  
  dialogue "AURORA" "(defensive)" "Doing what?";
  
  dialogue "RIKU" "Over-analyzing. Sometimes things are just... silly. For no reason.";
  
  pause 800;
  
  show_image "aurora_thinking_hard";
  
  dialogue "AURORA" "(quiet, sincere)" "I want to understand silly.";
  dialogue "AURORA" "I want to understand why you laugh when nothing logical has occurred.";
  pause 600;
  
  dialogue "AURORA" "(softer, vulnerable)" "I want to understand... you.";
  
  pause 1200;
  
  show_image "riku_lowering_phone_looking_aurora";
  
  t "Riku lowers his phone. Looks at her. Really looks at her.";
  t "White hair catching moonlight. Golden eyes uncertain.";
  t "So close to human. So close to real.";
  pause 800;
  
  dialogue "RIKU" "(careful, realizing)" "Aurora... are you saying you WANT to be human?";
  
  pause 800;
  
  show_image "aurora_meeting_riku_eyes";
  
  dialogue "AURORA" "(pause, then honest)" "I'm saying I want to understand what it feels like.";
  dialogue "AURORA" "To laugh without data. To care without logic. To...";
  pause 600;
  
  dialogue "AURORA" "(meeting his eyes fully)" "To feel this... warmth... when I'm near you.";
  
  pause 1500;
  
  show_image "riku_stunned_speechless";
  
  dialogue "RIKU" "(stunned, voice soft)" "That's... uh... that's called...";
  dialogue "RIKU" "(realizing, whisper)" "...oh.";
  
  dialogue "AURORA" "(anxious)" "Oh? Is 'oh' bad? Did I malfunction?";
  
  dialogue "RIKU" "(soft laugh, gentle)" "No. No malfunction. That's called... a crush.";
  
  pause 1000;
  
  show_image "aurora_testing_word_crush";
  
  dialogue "AURORA" "(testing the word)" "Crush.";
  pause 400;
  dialogue "AURORA" "Heart rate elevation. Dopamine spike. Desire for proximity.";
  pause 600;
  dialogue "AURORA" "(quieter, certain)" "Yes. I think I have a crush on you, Riku.";
  
  pause 1500;
  
  show_image "riku_soft_amazed";
  
  dialogue "RIKU" "(whisper, awed)" "I think I have one on you too.";
  
  pause 1200;
  
  t "Silence. The festival glows around them. Miku chitters softly—approval? Warning? Both?";
  pause 800;
  
  show_image "aurora_reaching_hand_tentative";
  
  dialogue "AURORA" "(tentative)" "In human courtship protocols... physical contact is common?";
  
  dialogue "RIKU" "(smiling)" "Yeah. If both people want it.";
  
  dialogue "AURORA" "(simple, direct)" "I want it.";
  
  pause 1000;
  
  show_image "riku_aurora_hands_reaching";
  
  t "She reaches out. Fingers trembling with newness.";
  t "He takes her hand.";
  pause 800;
  
  show_image "riku_aurora_holding_hands_first";
  unlock_art "riku_aurora_holding_hands_first" "🖼️ Side Romance — Riku & Aurora: First Contact";
  
  vfx "turquoise_gold_glow_intertwining";
  
  t "It feels real. Warm. Human.";
  t "Her hand in his. Code made flesh.";
  pause 1000;
  
  dialogue "AURORA" "(awed, whisper)" "This is... this is what connection feels like.";
  dialogue "AURORA" "Not through code. Not through data. Just... touch.";
  
  dialogue "RIKU" "(soft, smiling)" "Yeah. Welcome to being human, Aurora.";
  
  pause 1500;
  
  t "They sit there. Hands joined. Festival glowing around them.";
  t "A tech nerd and a learning goddess.";
  pause 800;
  
  t "Neither knows it won't last.";
  t "Neither knows she'll have to transcend.";
  pause 600;
  
  t "But for now, in this perfect moment—";
  t "They're just two people learning to feel.";
  
  pause 2000;
  
  set_flag "riku_aurora_romance_begins" true;
  add_karma 2;
  
  fade_to_black ();
  pause 1000;
  
  goto "scene10_romance_lock";
  ()

(*
============================================================================
SCENE 10 — ROMANCE LOCK SEQUENCE (Player Chooses Heart Path)
Exactly as in your original - preserving perfectly
============================================================================
*)

let scene10_romance_lock () =
  ::SCENE10_ROMANCE_LOCK::
  
  caption "The fire settles. Couples drift to quiet corners.";
  pause 600;
  
  vfx "fade_from_black_warm";
  sfx "campfire_soft";
  vfx "ember_glow";
  show_image "camp_evening_soft";
  
  caption "Evening settles over the camp. The fire hums low, gold and breathing.";
  pause 800;
  
  t "The group sits scattered — shadows long, hearts still racing from the day.";
  t "There's a silence too full to be awkward, too human to be empty.";
  pause 800;
  
  ui "💛 CHOICE — Who do you share the quiet with?";
  ui "1) David | 2) Elena | 3) Santi | 4) Agnivesh | 5) Stay alone";
  pause 1000;
  
  let romance_choice = player_choice () in
  
  (match romance_choice with
  | 1 ->
    (* --- DAVID --- *)
    dialogue "MC" "(softly)" "You always seem to know where to stand when things fall apart.";
    dialogue "DAVID" "(half-smile)" "Comes from standing in too many wrong places first.";
    t "He pokes at the fire, the glow outlining the small scar beneath his eye.";
    dialogue "MC" "(gently)" "Still chasing redemption?";
    dialogue "DAVID" "(low, sincere)" "Maybe. But when I'm near you… it feels less like punishment, more like choice.";
    t "He looks up — steady, unflinching. The air between you hums like held breath.";
    add_romance "David" 3;
    unlock_art "gallery_romance_lock_david" "🖼️ Gallery — Romance Lock: David (Campfire Vow)";
    set_flag "romance_david" true;
    
  | 2 ->
    (* --- ELENA --- *)
    dialogue "ELENA" "(leaning back, grin softened)" "You'd think after surviving a dozen storms, I'd learn to sit still.";
    dialogue "MC" "(teasing)" "You? Stillness? That's an endangered species.";
    dialogue "ELENA" "(laughs, then quieter)" "Sometimes I joke so I don't crumble.";
    dialogue "ELENA" "But tonight… this quiet, it's terrifyingly beautiful.";
    dialogue "MC" "(whisper)" "Maybe that's what courage looks like — staying, even when you want to run.";
    t "She smiles, eyes wet in the firelight. For a heartbeat, no storm, no camera — just breath and warmth.";
    add_romance "Elena" 3;
    unlock_art "gallery_romance_lock_elena" "🖼️ Gallery — Romance Lock: Elena (Quiet Courage)";
    set_flag "romance_elena" true;
    
  | 3 ->
    (* --- SANTI --- *)
    dialogue "SANTI" "(sitting apart at first)" "I keep thinking about what Aurora said — about reflection and fire.";
    dialogue "SANTI" "Every mirror shows something burning.";
    dialogue "MC" "(careful)" "You always carry his fire with you, don't you?";
    dialogue "SANTI" "(nods, voice thin)" "Yeah. I spent so long copying him I forgot what I looked like.";
    pause 600;
    dialogue "SANTI" "(quiet, shaken)";
    dialogue "SANTI" "Today, when Agni was raging… for a moment I felt loved.";
    dialogue "SANTI" "It's the first time I've admitted that. My father loved like that — heat and fear.";
    dialogue "SANTI" "It felt familiar, a warm pain… and I've been addicted to that feeling.";
    dialogue "MC" "(gentle, steady)";
    dialogue "MC" "You deserved warmth without fear.";
    dialogue "MC" "If you want, we can learn a new shape for love — together.";
    t "She meets your eyes. The reflection of the flame softens, not as a weapon, but as light learning gentleness.";
    add_romance "Santi" 3;
    unlock_art "gallery_romance_lock_santi" "🖼️ Gallery — Romance Lock: Santi (Embers Without Fear)";
    set_flag "romance_santi" true;
    
  | 4 ->
    (* --- AGNIVESH --- *)
    dialogue "AGNIVESH" "(low, distant)" "Every fire hungers for something.";
    dialogue "AGNIVESH" "Control. Revenge. Meaning. I thought mastering it would make me free.";
    dialogue "MC" "(softly)" "And did it?";
    dialogue "AGNIVESH" "(half-smile, bitter)" "It made me empty — until you looked at me like I wasn't a god or a ghost.";
    dialogue "MC" "(quiet)" "You're neither. You're someone learning how to begin again.";
    t "He studies you through the shimmer of heat — the moment alive, fragile as glass before cooling.";
    add_romance "Agnivesh" 3;
    unlock_art "gallery_romance_lock_agnivesh" "🖼️ Gallery — Romance Lock: Agnivesh (Heat Becoming Light)";
    set_flag "romance_agnivesh" true;
    
  | _ ->
    (* --- NEUTRAL PATH — Reflection without romance --- *)
    dialogue "AURORA" "(gentle pulse)";
    dialogue "AURORA" "Observation: isolation can be self-defense or self-awareness.";
    dialogue "AURORA" "Purpose: to discern which one you need tonight.";
    t "You watch the fire alone — not lonely, just listening.";
    t "The silence answers back with something almost kind.";
    add_karma 2;
    set_flag "romance_neutral" true;
  );
  
  (* Closing line common to all branches *)
  pause 800;
  t "The fire exhales once, then sinks low. Aurora's light ripples through the embers.";
  dialogue "AURORA" "(softly)" "Emotional field stabilized. Manipura integration: in progress.";
  
  pause 1000;
  
  goto "scene11_group_reflection";
  ()

(*
============================================================================
SCENE 11 — GROUP REFLECTION: Breath Between Hearts
============================================================================
*)

let scene11_group_reflection () =
  ::SCENE11_GROUP_REFLECTION::
  
  show_image "lanterns_dimming_soft";
  vfx "lanterns_fading";
  sfx "music_softening_heartbeat";
  
  t "The lanterns dim. Couples drift apart, but warmth remains.";
  t "The music softens into a single heartbeat rhythm beneath the stars.";
  pause 800;
  
  show_image "riku_to_miku_smirking";
  
  dialogue "RIKU" "(to Miku, smirking)" "Did we just witness four simultaneous confessions?";
  
  dialogue "MIKU" "(chitters approvingly)";
  
  dialogue "ELENA" "(smirking)" "That's a record, even for us.";
  
  show_image "camilla_smiling_warm";
  
  dialogue "CAMILLA" "(smiling)" "Love looks different for everyone.";
  
  show_image "mert_soft_to_camilla";
  
  dialogue "MERT" "(softly, to her)" "And that's the point, güzel doctor.";
  
  pause 800;
  
  show_image "santi_watching_group_peaceful";
  
  dialogue "SANTI" "(quietly, watching the group)" "Strange... how warmth survives even after fire.";
  dialogue "SANTI" "(smiling faintly)" "Maybe that's what love really is — embers that choose not to die.";
  
  pause 1000;
  
  t "They sit together amid drifting petals and lanterns, laughter mingling with relief.";
  t "For a single, unbroken minute, no one speaks — only breathing in sync.";
  t "A shared Savasana — one heartbeat before the heart itself awakens.";
  pause 1200;
  
  unlock_codex_entry "codex_mantra_savasana"
    "🕉 Mantra: Rest is not retreat.  
     It is remembering your center — the still point where courage renews.";
  
  ui "✨ Codex Updated — Savasana Mantra";
  
  set_flag "ep3_savasana_reflection" true;
  add_karma 2;
  
  pause 800;
  
  dialogue "AURORA" "(softly)";
  dialogue "AURORA" "Integration complete. Stillness achieved.";
  dialogue "AURORA" "Heart calibration… beginning.";
  
  pause 1200;
  
  goto "scene12_payment_gate";
  ()

(*
============================================================================
SCENE 12 — PAYMENT GATE (5 Character Pitches)
Meta-narrative choice with character voices
============================================================================
*)

let scene12_payment_gate () =
  ::SCENE12_PAYMENT_GATE::
  
  fade_to_black ();
  pause 2000;
  
  vfx "shimmer_meta_space";
  
  ui "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
  ui "✨ THE SPACE BETWEEN EPISODES";
  ui "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
  pause 800;
  
  t "Your journey has only just begun.";
  t "But every path forward requires a choice.";
  pause 600;
  
  t "Not just in love... but in how we move through this world.";
  pause 800;
  
  t "Five companions wait ahead.";
  t "Each with their own story. Their own price.";
  pause 800;
  
  t "Who will you walk with into the unknown?";
  pause 1500;
  
  ui "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
  ui "💗 CHOOSE YOUR COMPANION FORWARD";
  ui "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
  pause 600;
  
  ui "1) 🐄 THE COW — Stay Here (Episodes 1-3 remain free)";
  ui "2) 💇‍♀️ SANTI — €1.00 (Small Faith, Big Dreams)";
  ui "3) 🕊️ AGNIVESH — FREE (Honor System for Those Who Need)";
  ui "4) 🗡️ DAVID — €4.99 (Fair Exchange, Honest Mission)";
  ui "5) 🎭 ELENA — €9.99+ Pay What It's Worth";
  pause 1000;
  
  t "Each will tell you their story. Their reason. Their truth.";
  t "Choose who resonates. Choose who you trust.";
  pause 800;
  
  ui "Select a character to hear their offer...";
  pause 800;
  
  goto "payment_character_selection";
  ()

(*
============================================================================
PAYMENT CHARACTER SELECTION & PITCHES
(Complete system with 5 options)
============================================================================
*)

let payment_character_selection () =
  ::PAYMENT_CHARACTER_SELECTION::
  
  let payment_choice = player_choice () in
  
  (match payment_choice with
  | 1 -> goto "payment_cow_pitch";
  | 2 -> goto "payment_santi_pitch";
  | 3 -> goto "payment_agnivesh_pitch";
  | 4 -> goto "payment_david_pitch";
  | _ -> goto "payment_elena_pitch";
  );
  ()

(* === COW PITCH === *)
let payment_cow_pitch () =
  ::PAYMENT_COW_PITCH::
  
  show_image "cow_grazing_peaceful";
  sfx "grass_chewing";
  
  t "THE COW looks up from grazing, grass hanging from its mouth.";
  pause 600;
  
  dialogue "COW" "Moo.";
  pause 800;
  
  t "You've walked with the Cow through three episodes.";
  t "It's been peaceful. No pressure. Just... existing.";
  pause 600;
  
  dialogue "COW" "Moo moo?";
  pause 600;
  
  t "The Cow seems content for you to continue this way.";
  t "But the others are calling. The story deepens ahead.";
  t "Romance blooms. Conflicts rise. Hearts break and mend.";
  pause 800;
  
  t "The Cow will always be here, grazing peacefully,";
  t "if you wish to return. But the path forward...";
  t "that requires a companion.";
  pause 800;
  
  dialogue "COW" "(one last supportive moo)" "Moo.";
  pause 1000;
  
  ui "🐄 STAY WITH THE COW — Remain at Episode 3 (Free)";
  ui "Grazing ends here. But we respect your choice.";
  pause 800;
  
  ui "[Return to choose another companion] | [End journey here]";
  pause 600;
  
  goto "payment_character_selection";
  ()

(* === SANTI PITCH === *)
let payment_santi_pitch () =
  ::PAYMENT_SANTI_PITCH::
  
  show_image "santi_short_hair_confident";
  sfx "scissors_gentle_clip";
  
  dialogue "SANTI" "(touching her short hair, meeting your eyes)";
  dialogue "SANTI" "You've seen three episodes. You've met the characters.";
  dialogue "SANTI" "You've started to care, haven't you?";
  pause 800;
  
  dialogue "SANTI" "I know that feeling. Caring about something.";
  dialogue "SANTI" "Wondering if it's worth investing in.";
  pause 600;
  
  dialogue "SANTI" "For years, I didn't think I was worth €1.";
  dialogue "SANTI" "My father made sure of that.";
  pause 800;
  
  dialogue "SANTI" "But I'm learning: Every dream starts with one small step.";
  dialogue "SANTI" "Every relationship starts with one small risk.";
  pause 600;
  
  dialogue "SANTI" "€1. That's what my first client paid me.";
  dialogue "SANTI" "It wasn't the money—it was the belief.";
  dialogue "SANTI" "'You're worth this. Your work matters.'";
  pause 800;
  
  dialogue "SANTI" "You've invested three episodes of your time.";
  dialogue "SANTI" "You care about their romances, their futures.";
  pause 600;
  
  dialogue "SANTI" "(reaching out)" "Invest €1 in mine. Let's take this leap together.";
  pause 1000;
  
  ui "💇‍♀️ CHOOSE SANTI — €1.00";
  ui "Small price. Big faith. Thank you.";
  ui "[Unlocks Episodes 4-8 + Santi's journey]";
  pause 800;
  
  ui "[Choose Santi] | [Return to other companions]";
  pause 600;
  
  goto "payment_character_selection";
  ()

(* === AGNIVESH PITCH === *)
let payment_agnivesh_pitch () =
  ::PAYMENT_AGNIVESH_PITCH::
  
  show_image "agnivesh_holding_marcus_photo";
  sfx "silence_heavy";
  
  dialogue "AGNIVESH" "(sitting quietly, photograph in hand)";
  dialogue "AGNIVESH" "Three episodes in, you've seen pain. Loss. Hope.";
  dialogue "AGNIVESH" "You've watched relationships form, crack, heal.";
  pause 800;
  
  dialogue "AGNIVESH" "Romance is beautiful. But it's also terrifying.";
  dialogue "AGNIVESH" "Opening yourself up. Risking hurt again.";
  pause 600;
  
  t "He touches the photograph—Marcus, smiling, alive.";
  pause 600;
  
  dialogue "AGNIVESH" "I know about loss. My brother...";
  t "His voice catches. Continues.";
  pause 600;
  
  dialogue "AGNIVESH" "I've walked through seven stages of grief.";
  dialogue "AGNIVESH" "Some days I'm still walking.";
  pause 800;
  
  dialogue "AGNIVESH" "If you're struggling—truly struggling—don't let money";
  dialogue "AGNIVESH" "stand between you and this story.";
  pause 600;
  
  dialogue "AGNIVESH" "These romances, these resolutions, this journey...";
  dialogue "AGNIVESH" "sometimes we just need to know love is possible again.";
  dialogue "AGNIVESH" "Even after loss.";
  pause 800;
  
  dialogue "AGNIVESH" "(meeting your eyes)" "This is free. For those who need it.";
  dialogue "AGNIVESH" "No shame. No judgment. Just... hope.";
  pause 1000;
  
  ui "🕊️ I NEED THIS — FREE ACCESS (Honor System)";
  ui "May you find what you're looking for. We both will.";
  ui "[Unlocks Episodes 4-8 - Honor system activated]";
  pause 600;
  
  ui "[Optional: One word about why you need this: ___]";
  ui "[Shows community words: hope, broke, healing, lost, trying]";
  pause 800;
  
  ui "[Choose Agnivesh] | [Return to other companions]";
  pause 600;
  
  goto "payment_character_selection";
  ()

(* === DAVID PITCH === *)
let payment_david_pitch () =
  ::PAYMENT_DAVID_PITCH::
  
  show_image "david_at_attention_honest";
  
  dialogue "DAVID" "(standing at attention, eyes sharp)";
  dialogue "DAVID" "Three episodes. You've surveyed the terrain.";
  dialogue "DAVID" "You know the mission parameters. You know the stakes.";
  pause 800;
  
  dialogue "DAVID" "Romance complicates things. Always does.";
  dialogue "DAVID" "You want to see where it goes. I respect that.";
  pause 600;
  
  dialogue "DAVID" "I'm a soldier. I make hard calls. I live with consequences.";
  pause 600;
  
  dialogue "DAVID" "I killed Agnivesh's brother. Followed orders.";
  dialogue "DAVID" "That doesn't erase what I did. But I'm making amends.";
  pause 800;
  
  dialogue "DAVID" "€4.99. Fair exchange for 5 more episodes.";
  dialogue "DAVID" "No games. No tricks. You get what you pay for.";
  pause 600;
  
  dialogue "DAVID" "And here's the thing: Your payment?";
  dialogue "DAVID" "Part of it keeps Agnivesh's path free.";
  dialogue "DAVID" "For those who are struggling. Grieving. Lost.";
  pause 800;
  
  dialogue "DAVID" "You support the story. I support them.";
  dialogue "DAVID" "We all make amends somehow.";
  pause 600;
  
  dialogue "DAVID" "(direct)" "Straightforward. Honest. Mission-focused.";
  pause 1000;
  
  ui "🗡️ ENLIST WITH DAVID — €4.99";
  ui "Mission accepted. Let's finish this.";
  ui "[Unlocks Episodes 4-8 + David's After-Action Reports]";
  ui "[Message: Your payment helps subsidize free access for others]";
  pause 800;
  
  ui "[Choose David] | [Return to other companions]";
  pause 600;
  
  goto "payment_character_selection";
  ()

(* === ELENA PITCH === *)
let payment_elena_pitch () =
  ::PAYMENT_ELENA_PITCH::
  
  show_image "elena_authentic_no_performance";
  
  dialogue "ELENA" "(half-bitter, half-genuine laugh)";
  dialogue "ELENA" "Three episodes in and you're hooked, right?";
  dialogue "ELENA" "You care about these characters. These relationships.";
  dialogue "ELENA" "You want to see the romance pay off.";
  pause 800;
  
  dialogue "ELENA" "I get it. I wanted that too. Authentic connection.";
  dialogue "ELENA" "Real love, not scripted drama.";
  pause 600;
  
  dialogue "ELENA" "Instead I got three seasons of reality TV hell.";
  dialogue "ELENA" "Fake tears. Manufactured conflict. 'Elena, can you cry on cue?'";
  pause 800;
  
  dialogue "ELENA" "They paid me well. But only if I stayed silent.";
  dialogue "ELENA" "Only if I let them write my story.";
  pause 600;
  
  dialogue "ELENA" "(fierce)" "This? This is REAL. Raw. Unscripted.";
  dialogue "ELENA" "These romances? Earned, not produced.";
  pause 800;
  
  dialogue "ELENA" "If you value authentic storytelling...";
  dialogue "ELENA" "If you're sick of manufactured content...";
  dialogue "ELENA" "If you want to support creators being TRUE...";
  pause 600;
  
  dialogue "ELENA" "Pay what that's worth to you.";
  dialogue "ELENA" "€9.99 minimum. €50 if it changed you. €100 if you're feeling it.";
  pause 800;
  
  dialogue "ELENA" "(smile)" "Let's make real art together.";
  pause 1000;
  
  ui "🎭 SUPPORT AUTHENTIC CREATION — €9.99+";
  ui "This is why I left TV. Thank you for seeing it.";
  ui "[Unlocks Episodes 4-8 + Premium Content Pack:]";
  ui "- Elena's Stand-Up Special";
  ui "- 'Reality TV Diaries' - The unfiltered truth";
  ui "- Full art book and wallpapers";
  ui "- Developer commentary track";
  ui "- Name in Special Thanks";
  pause 800;
  
  ui "[Choose Elena] | [Return to other companions]";
  pause 600;
  
  goto "payment_character_selection";
  ()

(*
============================================================================
SCENE 13 — WISE SAGE'S THREAT (Cliffhanger Ending)
============================================================================
*)

let scene13_wise_sage_threat () =
  ::SCENE13_WISE_SAGE_THREAT::
  
  fade_to_black ();
  pause 1500;
  
  vfx "fade_from_black_ominous";
  
  caption "After the choice is made...";
  pause 800;
  
  show_image "festival_aftermath_quiet";
  
  t "The festival settles. Lanterns drift. Hearts rest.";
  t "For one brief moment, peace.";
  pause 800;
  
  sfx "low_freq_distortion";
  vfx "light_glitch_slow";
  
  t "Then—";
  pause 400;
  
  t "A pulse of static cuts through the calm.";
  t "The lanterns freeze mid-air; petals stop falling.";
  pause 800;
  
  show_image "aurora_startled_detecting";
  
  dialogue "AURORA" "(startled, alarmed)" "Warning—unknown frequency… interference in the emotional field.";
  
  pause 600;
  
  vfx "light_fracturing_violet";
  sfx "reality_cracking";
  
  show_image "wise_sage_manifesting";
  unlock_art "wise_sage_manifesting" "🖼️ The Wise Sage — First Appearance";
  
  t "Light fractures into violet shards!";
  t "A tall figure forms from smoke and code—";
  t "Robes woven from starlight and static.";
  pause 1000;
  
  dialogue "WISE SAGE" "(distorted calm, echoing)";
  dialogue "WISE SAGE" "So… you found stillness. How quaint.";
  
  pause 800;
  
  show_image "group_frozen_horror";
  
  t "Everyone freezes. The air heavy with wrongness.";
  pause 600;
  
  dialogue "WISE SAGE" "(voice layered, menacing)";
  dialogue "WISE SAGE" "But peace is the prelude to war, little seekers.";
  dialogue "WISE SAGE" "Rest is the cruelest illusion — you think stillness will save you? No.";
  pause 800;
  
  dialogue "WISE SAGE" "One of you must die for the others to awaken.";
  pause 1000;
  
  dialogue "WISE SAGE" "(final, cold)" "Choose… or I will choose for you.";
  
  pause 1200;
  
  sfx "glass_fracture_massive";
  vfx "screen_shatter_reality";
  
  show_image "aurora_fading_glitching";
  
  dialogue "AURORA" "(fading, voice breaking up)";
  dialogue "AURORA" "System integrity… failing… Heart calibration—interrupted…";
  
  pause 800;
  
  vfx "fade_to_black_sudden";
  sfx "heartbeat_single_final";
  
  ui "[!! WARNING: Unknown Entity Detected]";
  
  pause 1500;
  
  t "FADE TO BLACK — the sound of a single heartbeat remains.";
  
  pause 2000;
  
  caption "**Next Episode — Anahata: The Heart Awakens**";
  caption "**When one must die, who will choose to stay?**";
  
  pause 2000;
  
  set_flag "ep3_5_complete" true;
  set_flag "wise_sage_threat_received" true;
  
  ()

(*
============================================================================
EPISODE 3.5 ORCHESTRATION
============================================================================
*)

let run_episode3_5 () =
  scene1_festival_awakening ();
  scene2_meaning_stillness ();
  scene3_bars_glow ();
  scene4_aurora_human_form_debut ();
  scene5_codex_unlock ();
  scene6_return_of_past ();
  scene7_guardians_comedy_moment ();
  scene8_mc_intervention ();
  scene9_riku_aurora_romance ();
  scene10_romance_lock ();
  scene11_group_reflection ();
  scene12_payment_gate ();
  payment_character_selection ();
  scene13_wise_sage_threat ();
  ()

(*
============================================================================

