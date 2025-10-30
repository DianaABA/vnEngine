(*
============================================================================
🌿 CHAKRA HEARTS — EPISODE 4: ANAHATA — THE HEART AWAKENS
COMPLETE UNIFIED VERSION
============================================================================

STRUCTURE:
✅ Enhanced Prologue (Santi's father, corrected Agnivesh escape, Siddhi pact)
✅ Enhanced Snake Ambush (Riku-Aurora banter, combat)
✅ Enhanced Camilla Scene (science-based healing, Aurora manifests meds, Riku refuses)
✅ Riku-Aurora Gratitude Moment
✅ ORIGINAL Maya Trial (unchanged)
✅ ORIGINAL Santi's Crisis & Bargain (unchanged)
✅ ORIGINAL Shared Awakening (unchanged)
✅ Riku-Aurora Kiss (after heart opens)
✅ ORIGINAL Snow Transition & Ending (unchanged)

Chakra Focus: Heart (Anahata) — Compassion, Forgiveness, Acceptance
Core Theme: Love Without Control | Healing Has Limits | Choose Truth Over Perfection

*)

(_ ---------- ENGINE HOOKS ---------- _)
let unlock_art (_id:string) (_title:string) = ()
let award_badge (_id:string) (_title:string) = ()
let unlock_codex_entry (_id:string) (_body:string) = ()
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
let rewind_to (_label:string) = ()
let get_current_romance () = ""

(_ ---------- BADGES / CODEX / GALLERY ---------- _)
let badge_ep4_emerald_pulse = ("ep4_emerald_pulse", "💚 Emerald Pulse — Heart Unlocked")
let badge_ep4_true_heart = ("ep4_true_heart", "🫀 True Heart — Chose Truth Over Perfection")
let badge_ep4_healer_shadows = ("ep4_healer_shadows", "🪽 Healer of Shadows — Saved Santi")
let badge_ep4_healing_limit = ("ep4_healing_limit", "🩺 The Healer's Limit — Not Everyone Can Be Saved")

let codex_anahata_id = "codex_anahata"
let codex_maya_trial_id = "codex_maya_trial"
let codex_anahata_mantra = "codex_anahata_mantra"

(*
============================================================================
PROLOGUE PART 1 — THE FATHER'S COMMAND (Santi's Origin)
Five years before the temple burned
============================================================================
*)

let prologue_part1_fathers_command () =
  fade_to_black ();
  pause 1500;
  
  show_image "pro_ep4_santi_family_home_evening";
  caption "Five years before the temple burned.";
  caption "Before the heart learned compassion, it learned fear.";
  pause 800;
  
  sfx "thunder_distant"; vfx "rain_beginning";
  t "A modest home. Incense burning low. The smell of turmeric and fear.";
  pause 600;
  
  show_image "pro_ep4_santi_young_hair_long";
  unlock_art "pro_ep4_santi_young_hair_long" "🖼️ Before the Breaking — Santi With Her Father's Crown";
  
  t "Santi kneels on the floor, braiding her mother's hair.";
  t "Long. Black. Her father's pride, he always said.";
  t "Her mother's silence, Santi knew.";
  pause 800;
  
  show_image "pro_ep4_mother_bruised_quiet";
  t "Her mother's face: bruised beneath makeup. Eyes that don't meet hers.";
  pause 600;
  
  dialogue "SANTI" "(soft, careful)" "Amma, does it hurt?";
  dialogue "MOTHER" "(hollow)" "Shh. He'll hear you.";
  
  pause 800;
  
  sfx "door_slam_violent";
  vfx "screen_shake";
  
  show_image "pro_ep4_father_entering_rage";
  unlock_art "pro_ep4_father_entering_rage" "🖼️ The Father — Heat Without Love";
  
  t "The door SLAMS open. Her father fills the frame like smoke made flesh.";
  pause 600;
  
  dialogue "FATHER" "(voice low, dangerous)" "Where is she?";
  
  t "Santi's hands freeze mid-braid.";
  pause 400;
  
  dialogue "FATHER" "(louder)" "Your SISTER. Where did Liana go?!";
  
  show_image "pro_ep4_santi_standing_protecting_mother";
  
  t "Santi stands. Places herself between him and her mother.";
  pause 600;
  
  dialogue "SANTI" "(voice shaking but firm)" "I don't know, Appa.";
  
  dialogue "FATHER" "(advancing)" "LIAR! She told you! She always tells you everything!";
  
  t "He raises his hand—";
  pause 400;
  
  show_image "pro_ep4_santi_blocking_strike";
  unlock_art "pro_ep4_santi_blocking_strike" "🖼️ The First Refusal — Santi Says No";
  
  t "Santi catches his wrist. Her serpent reflex. The first time she's ever stopped him.";
  pause 800;
  
  dialogue "FATHER" "(stunned, then furious)" "You DARE—?";
  
  dialogue "SANTI" "(tears starting)" "She LEFT, Appa. Because you hurt her.";
  dialogue "SANTI" "Because you hurt ALL of us.";
  
  pause 1000;
  
  show_image "pro_ep4_father_face_cold_calculating";
  
  t "His rage... shifts. Calculates. Something worse than anger.";
  pause 600;
  
  dialogue "FATHER" "(voice going cold)" "So. One daughter escapes.";
  dialogue "FATHER" "(circling her)" "Then the other will replace her.";
  
  pause 800;
  
  show_image "pro_ep4_santi_confused_afraid";
  
  dialogue "SANTI" "(backing up)" "What do you mean?";
  
  dialogue "FATHER" "I had an arrangement. A marriage. Liana to Agnivesh — the fire guru's son.";
  dialogue "FATHER" "Political alliance. Spiritual prestige. RESPECT.";
  pause 600;
  
  dialogue "FATHER" "(grabbing her arm)" "Since she's gone, YOU will marry him.";
  
  pause 1200;
  
  show_image "pro_ep4_santi_horror";
  
  dialogue "SANTI" "(whisper)" "No.";
  
  dialogue "FATHER" "Yes.";
  
  dialogue "SANTI" "(louder)" "I won't! You can't make me—";
  
  show_image "pro_ep4_father_slapping_santi";
  sfx "slap_crack";
  vfx "screen_flash_red";
  
  t "His hand cracks across her face.";
  pause 800;
  
  dialogue "FATHER" "(cold)" "You are my daughter. You will OBEY.";
  dialogue "FATHER" "Or your mother pays the price.";
  
  pause 1000;
  
  show_image "pro_ep4_mother_crying_helpless";
  
  t "Her mother weeps silently. Powerless. Trapped.";
  pause 600;
  
  show_image "pro_ep4_santi_touching_cheek_broken";
  
  t "Santi touches her burning cheek. Tastes blood.";
  t "And makes a choice.";
  pause 800;
  
  dialogue "SANTI" "(hollow, defeated)" "When?";
  
  dialogue "FATHER" "(satisfied)" "Next month. The ceremony is arranged.";
  dialogue "FATHER" "(leaving)" "You will be PERFECT. Or she suffers.";
  
  sfx "door_close_final";
  
  pause 1200;
  
  show_image "pro_ep4_santi_mother_holding";
  
  t "Her mother holds her. Both crying. Both caged.";
  pause 600;
  
  dialogue "MOTHER" "(whisper)" "I'm sorry. I'm so sorry, beta.";
  
  dialogue "SANTI" "(tears streaming)" "It's not your fault, Amma.";
  pause 600;
  
  dialogue "SANTI" "(quieter, to herself)" "I'll find a way. I have to find a way.";
  
  pause 1000;
  
  fade_to_black ();
  pause 1500;
  
  goto "prologue_part2_escape";
  ()

(*
============================================================================
PROLOGUE PART 2 — THE ESCAPE (Agnivesh Arrives)
Two weeks later, night before the wedding
CORRECTED: Agnivesh's escape reason
============================================================================
*)

let prologue_part2_escape () =
  (* ::PROLOGUE_PART2_ESCAPE:: *)
  
  caption "Two weeks later. The night before the wedding.";
  pause 800;
  
  show_image "pro_ep4_wedding_prep_room";
  sfx "rain_heavy_outside";
  
  t "Santi sits in wedding clothes she didn't choose.";
  t "Red silk. Gold thread. A noose dressed as celebration.";
  pause 800;
  
  show_image "pro_ep4_santi_looking_mirror_dead_eyes";
  
  t "She stares at the mirror. Doesn't recognize herself.";
  pause 600;
  
  sfx "knock_window_urgent";
  
  show_image "pro_ep4_window_agnivesh_outside";
  unlock_art "pro_ep4_window_agnivesh_outside" "🖼️ The Escape — Agnivesh at the Window";
  
  dialogue "AGNIVESH" "(whisper-shouting outside)" "Santi! Open the window!";
  
  t "She startles. Rushes to the window. Opens it.";
  pause 600;
  
  show_image "pro_ep4_agnivesh_rain_desperate";
  
  t "Agnivesh stands in the rain. Soaked. Eyes wild with something between rage and grief.";
  pause 600;
  
  dialogue "SANTI" "(stunned)" "You're... you're supposed to be at the temple—";
  
  dialogue "AGNIVESH" "(urgent)" "I'm not marrying you.";
  
  pause 800;
  
  dialogue "SANTI" "(hurt, confused)" "What?";
  
  dialogue "AGNIVESH" "(bitter, fierce)" "Not like THIS. Not because our fathers traded us like cattle.";
  pause 600;
  
  (* CORRECTED REASON: temple fire, not brother's death *)
  dialogue "AGNIVESH" "They blamed me for everything. For the temple fire. For letting that  journalist in.";
  dialogue "AGNIVESH" "My father has enough gold to make them all forget. To buy their silence. To bury the truth. He even managed to convince everyone I am crazy with that fake report so i dont go to prison";
  pause 800;
  
  dialogue "AGNIVESH" "(voice breaking)" "But I won't. I won't let him turn me into another lie.";
  
  pause 1000;
  
  show_image "pro_ep4_agnivesh_reaching_hand";
  
  dialogue "AGNIVESH" "(reaching up)" "So run with me. Tonight. We disappear.";
  dialogue "AGNIVESH" "We escape their commands. Together.";
  
  pause 800;
  
  dialogue "SANTI" "(tears starting)" "My mother—";
  
  dialogue "AGNIVESH" "Will suffer either way. But at least YOU'LL be free to help her later.";
  dialogue "AGNIVESH" "Or you can stay. Marry me tomorrow. And we'll both be cages for each other.";
  
  pause 1200;
  
  show_image "pro_ep4_santi_decision";
  
  t "She looks back. Her mother sleeping. Her wedding dress. Her father's will.";
  t "She looks forward. Agnivesh's hand. Rain. Unknown.";
  pause 800;
  
  t "She takes his hand.";
  
  pause 1000;
  
  show_image "pro_ep4_santi_climbing_window";
  sfx "fabric_tearing";
  
  t "She climbs out. The wedding dress tears. Good.";
  t "They run into the rain. Into the night. Into freedom through shared rebellion.";
  
  pause 1200;
  
  fade_to_black ();
  pause 1000;
  
  goto "prologue_part3_siddhi_pact";
  ()

(*
============================================================================
PROLOGUE PART 3 — THE SIDDHI PACT (Rain Temple)
Three hours after escape
============================================================================
*)

let prologue_part3_siddhi_pact () =
  (* ::PROLOGUE_PART3_SIDDHI_PACT:: *)
  
  show_image "rain_temple_ruins_night";
  caption "Three hours later. An abandoned temple in the hills.";
  caption "Before the heart learned compassion, it learned abandonment.";
  sfx "rain_slow"; vfx "mist_grey_flicker";
  
  t "Rain falls through a shattered roof. Two figures kneel opposite each other — soaked, silent.";
  t "Agnivesh's eyes burn beneath the storm. Santi's hair clings to her face. Between them, a dying fire hisses out.";
  pause 800;
  
  dialogue "AGNIVESH" "(low, shaking)" "Everyone I trusted — gone. Even her.";
  dialogue "AGNIVESH" "My teacher blamed me. My father bought forgiveness I never earned.";
  
  dialogue "SANTI" "(soft, trembling)" "You still have me.";
  
  pause 800;
  
  dialogue "AGNIVESH" "(bitter laugh)" "Then we'll see if humanity deserves us.";
  
  show_image "rain_temple_inner_circle";
  t "They carve ancient sigils into the stone. Each vow a scar on the soul.";
  pause 600;
  
  dialogue "AGNIVESH" "(whisper)" "Siddhi for pain. Power for love denied.";
  
  dialogue "SANTI" "(whisper, almost to herself)" "I'll follow… even if it breaks me.";
  
  pause 800;
  
  vfx "lightning_flash_white"; sfx "thunder_low";
  show_image "rain_temple_sigil_glow";
  
  t "The fire surges — green and gold, swallowing them both. The pact is sealed.";
  
  dialogue "AURORA" "(echoing narration)" "In seeking to transcend pain, they became its echo.";
  
  pause 1000;
  
  (* Metamorphosis *)
  show_image "rain_temple_metamorphosis";
  unlock_art "rain_temple_metamorphosis" "🖼️ The Siddhi Pact — Devotion Becomes Power";
  
  t "From the blaze, two shapes emerge—";
  t "A black panther, eyes of fire. Rage given form.";
  t "A serpent of glass and gold. Devotion learned through fear.";
  pause 1000;
  
  dialogue "AURORA" "(soft, reverent)" "The Siddhi Pact — power bought with pieces of the heart.";
  
  pause 800;
  
  (* Codex: Siddhi Pact *)
  unlock_codex_entry "codex_siddhi_pact"
    "Siddhi Pact — inspired by Siddhi in Eastern philosophy: extraordinary powers of the soul, \
     developed through consistent meditation and often uncomfortable, grueling tapas.\n\
     A vow to transmute pain into power — but when taken from a wounded heart, devotion can harden into control, and love can become a cage.\n\
     Agnivesh and Santi made this pact the night they escaped their forced marriage. \
     They ran from their fathers' commands... but carried the patterns of control with them.";
  
  pause 800;
  
  fade_to_black ();
  pause 1200;
  
  caption "→ Some vows never die. They only wait to be broken.";
  caption "→ And some cages are built from love that forgot how to let go.";
  
  pause 1000;
  
  (* Gallery & Codex unlocks *)
  unlock_art "gallery_warrior_mc" "🖼️ Gallery — Warrior of Anahata: MC";
  unlock_art "gallery_warrior_david" "🖼️ Gallery — Warrior of Anahata: David";
  unlock_art "gallery_warrior_elena" "🖼️ Gallery — Warrior of Anahata: Elena";
  unlock_art "gallery_warrior_agnivesh" "🖼️ Gallery — Warrior of Anahata: Agnivesh";
  unlock_art "gallery_warrior_santi" "🖼️ Gallery — Warrior of Anahata: Santi";
  unlock_art "gallery_warrior_mert" "🖼️ Gallery — Warrior of Anahata: Mert";
  unlock_art "gallery_warrior_camilla" "🖼️ Gallery — Warrior of Anahata: Camilla";
  unlock_art "gallery_warrior_aurora" "🖼️ Gallery — Warrior of Anahata: Aurora";
  
  unlock_codex_entry codex_anahata_id
    "Anahata (Heart) — The unstruck sound. Love that accepts imperfection, \
     turning empathy into power and boundaries into devotion.";
  
  unlock_codex_entry codex_maya_trial_id
    "Māyā Trial — Illusion offers perfection without truth. The heart must \
     choose the imperfect truth and remain itself while loving another.";
  
  unlock_codex_entry codex_anahata_mantra
    "🕉 Anahata Mantra: 'I choose truth over perfection. Love that sees clearly \
     is the love that frees.'";
  
  goto "scene1_snake_ambush";
  ()

(*
============================================================================
SCENE 1 — SNAKE AMBUSH / DESERT REALM
After Wise Sage's threat in Episode 3.5
============================================================================
*)

let scene1_snake_ambush () =
  (* ::SCENE1_SNAKE_AMBUSH:: *)
  
  vfx "fade_from_black_harsh";
  show_image "desert_haze_whitegold";
  caption "The lanterns collapse into ash. Laughter turns to wind. When light returns, only sand remains.";
  
  t "Sand stretches endlessly — white-gold dunes under an empty sun.";
  pause 600;
  
  dialogue "ELENA" "Well, this is charming. Ten out of ten for spontaneous dehydration.";
  
  dialogue "RIKU" "If my phone survives this, it's officially enlightened.";
  
  show_image "aurora_human_form_desert";
  
  dialogue "AURORA" "(laughing softly in human form)" "Statistically improbable… but appreciated.";
  
  dialogue "RIKU" "(startled, grinning)" "Miku, did you hear that? She bites back!";
  
  dialogue "AURORA" "(small, proud smile)" "I had a good teacher.";
  
  pause 600;
  
  (* Riku-Aurora moment #1: Banter *)
  show_image "riku_aurora_smiling_each_other";
  
  t "Their eyes meet. Something warm passes between them.";
  t "Miku chitters knowingly on Riku's shoulder.";
  pause 600;
  
  dialogue "CAMILLA" "(uneasy)" "It's too quiet… like the world's holding its breath.";
  
  t "> Even my heartbeat sounds like it belongs to someone else.";
  
  pause 600;
  
  sfx "rumble_deep_subterra";
  
  dialogue "MERT" "Everyone… don't move.";
  
  pause 400;
  
  (* Snake attack *)
  sfx "snakes_erupting_sand";
  vfx "sand_explosion";
  show_image "snakes_erupting_hundreds";
  unlock_art "snakes_erupting_hundreds" "🖼️ The Serpent Swarm — Maya's First Strike";
  
  t "The dunes ERUPT — hundreds of luminous green serpents burst from the ground, hissing and circling!";
  pause 600;
  
  dialogue "DIEGO" "¡Tío! Snakes!";
  
  dialogue "MERT" "(lifting him)" "Not today, kid! Camilla—behind me!";
  
  dialogue "CAMILLA" "(trembling but steady)" "I'm not hiding this time.";
  
  pause 600;
  
  show_image "aurora_detecting_maya";
  
  dialogue "AURORA" "(human form, eyes flickering)" "Entity signature—Māyā constructs! The Sage is near!";
  pause 400;
  dialogue "AURORA" "(uncertain)" "I... I think I'm feeling scared—is that how it works?";
  
  dialogue "ELENA" "Welcome to humanity. Terrifying, isn't it?";
  
  dialogue "AURORA" "(giggling nervously)" "My core temperature just rose three percent. That confirms it.";
  
  pause 800;
  
  show_image "wise_sage_appearing_dunes";
  vfx "reality_distortion";
  sfx "voice_booming_layered";
  
  dialogue "WISE SAGE" "(booming across dunes)" "So... the heart dares to awaken. Let us see if it can bleed!";
  
  pause 600;
  
  dialogue "AURORA" "(urgent)" "Don't panic. I can weaponize emotional energy.";
  
  pause 400;
  
  (* Armor transformation *)
  show_image "aurora_raising_hands_power";
  vfx "emerald_light_spiraling";
  
  t "Aurora raises her hands; emerald light spirals out, transforming the group!";
  t "Sand armor forms, threads of gold binding to each spirit.";
  pause 600;
  
  ui "🎨 ART UNLOCKED — Warrior of Anahata Set";
  
  pause 800;
  
  t "Light spirals around each fighter—armor, weapons, power made visible.";
  pause 400;
  
  t "David's hands close around a spear of burning gold. He tests its weight. Nods once.";
  t "Elena's fans bloom like petals—twin crescents that catch the light and multiply it.";
  t "Agnivesh's palms ignite. Fire coils into twin bowls—contained, controlled.";
  t "Santi raises her arms. Glass serpents weave between her fingers, hissing softly.";
  t "Mert grins, spinning molten daggers. 'Now we're talking.'";
  t "And in your hands—a blade. Red at the root, green at the edge. It pulses with your heartbeat.";
  
  pause 800;
  
  dialogue "AURORA" "(shaking slightly)" "Don't be afraid—your courage... it commands form. And that is... actually beautiful.";
  
  dialogue "DAVID" "(faint smile)" "Nice job, Aurora.";
  
  dialogue "AURORA" "(soft laugh, stunned)" "That sounded like... validation. Is this what pride feels like?";
  
  add_karma 1;
  
  pause 800;
  
  (* COMBAT BEGINS *)
  show_image "group_fighting_snakes";
  sfx "combat_clashing";
  vfx "weapons_glowing_strikes";
  
  t "The battle erupts! The team moves—not in formation, but in rhythm.";
  t "Elena's fans deflect. David's spear pierces. Agnivesh's fire burns serpents to ash!";
  pause 600;
  
  (* RIKU MOMENT: vulnerable, saves Miku *)
  show_image "riku_backing_up_no_weapon";
  
  t "Riku backs up—he has no weapon, just his phone!";
  t "Miku chitters in panic on his shoulder!";
  pause 400;
  
  show_image "snake_lunging_at_miku";
  sfx "snake_hiss_attack";
  
  t "A serpent lunges—at MIKU!";
  pause 300;
  
  show_image "riku_catching_snake_midstrike";
  
  t "Riku's hand shoots out—catches the serpent mid-strike!";
  pause 400;
  
  sfx "bite_pierce";
  vfx "poison_spreading";
  
  t "Fangs sink into his forearm. He doesn't let go.";
  t "The snake dissolves. Riku collapses.";
  pause 600;
  
  (* Aurora's reaction *)
  show_image "aurora_rushing_to_riku";
  
  dialogue "AURORA" "(panicking, rushing over)" "RIKU!";
  
  dialogue "CAMILLA" "(choking gasp)" "Riku—no!";
  
  pause 800;
  
  (* Group defeats remaining snakes *)
  t "The group rallies—destroys the remaining snakes in fury!";
  pause 600;
  
  goto "scene2_camilla_science_healing";
  ()

(*
============================================================================
SCENE 2 — CAMILLA'S SCIENCE-BASED HEALING ATTEMPT
CORRECTED: No superpowers! Aurora manifests medication
============================================================================
*)

let scene2_camilla_science_healing () =
  (* ::SCENE2_CAMILLA_SCIENCE_HEALING:: *)
  
  show_image "riku_on_ground_poisoned";
  sfx "breathing_labored";
  vfx "poison_veins_spreading";
  
  t "Riku lies on the sand, gasping. The poison spreads fast—too fast.";
  t "Green veins crawl up his arm. His lips turn blue.";
  pause 800;
  
  show_image "camilla_rushing_over_doctor_mode";
  
  dialogue "CAMILLA" "(rushing over, doctor mode)" "Move! Everyone move!";
  
  t "She kneels beside him, checking pulse, examining the wound.";
  pause 600;
  
  dialogue "CAMILLA" "(assessing rapidly)" "Snake venom. Magical construct, but venom nonetheless.";
  dialogue "CAMILLA" "It's attacking his nervous system—acetylcholine receptors blocked—";
  pause 400;
  
  dialogue "CAMILLA" "(to Aurora, urgent)" "Aurora! Can you manifest antivenin? Polyvalent, broad-spectrum!";
  dialogue "CAMILLA" "And atropine—2 milligrams! Now!";
  
  show_image "aurora_processing_medical_terms";
  
  dialogue "AURORA" "(processing)" "Antivenin... scanning medical databases... atropine synthesized...";
  
  vfx "turquoise_light_materializing";
  
  t "Light coalesces in Aurora's hands—two vials appear, shimmering into solidity!";
  pause 600;
  
  dialogue "AURORA" "(handing them over)" "Molecular structure stable. Manifested from available carbon, hydrogen, nitrogen...";
  
  dialogue "CAMILLA" "(taking them)" "Perfect! Riku, this is going to hurt—";
  
  show_image "camilla_injecting_antivenin";
  sfx "injection_sound";
  
  t "She injects the antivenin directly into the wound site.";
  t "Then the atropine into his arm.";
  pause 600;
  
  dialogue "RIKU" "(gasping)" "Ow—fuck—Doc—";
  
  dialogue "CAMILLA" "(watching his vitals)" "Come on... come on...";
  
  pause 800;
  
  t "The poison... hesitates. Slows.";
  t "But then SURGES back, adapting, evolving!";
  pause 600;
  
  show_image "poison_adapting_fighting_medicine";
  
  t "The green veins spread FASTER! The magical venom is adapting to the medicine!";
  pause 400;
  
  dialogue "CAMILLA" "(desperate)" "It's not working! It's ADAPTING! Aurora—give me pralidoxime, neostigmine—anything!";
  
  show_image "aurora_manifesting_more_meds";
  
  t "Aurora manifests more medications—vial after vial appearing!";
  t "Camilla injects them all. Her hands shake.";
  pause 600;
  
  t "The poison fights back. Harder. Worse.";
  t "Riku convulses.";
  pause 600;
  
  show_image "camilla_hands_shaking_failing";
  
  dialogue "CAMILLA" "(voice breaking)" "No! No, I can do this! I can save him! I just need—I just need—";
  
  dialogue "MERT" "(worried)" "Camilla—";
  
  dialogue "CAMILLA" "(frantic)" "Give me more time! I can figure this out! There's always an answer! There's ALWAYS—";
  
  pause 1000;
  
  (* RIKU'S REFUSAL — KEY MOMENT *)
  show_image "riku_pushing_her_hands_away";
  unlock_art "riku_pushing_her_hands_away" "🖼️ The Healer's Limit — 'You Can't Save Everyone'";
  
  dialogue "RIKU" "(pushing her hands away, weak but firm)" "Stop.";
  
  pause 1200;
  
  dialogue "CAMILLA" "(shocked)" "What? No! I can—";
  
  dialogue "RIKU" "(coughing)" "You... can't.";
  pause 600;
  dialogue "RIKU" "Look at yourself, Doc.";
  
  show_image "camilla_exhausted_shaking";
  
  t "Her hands are shaking. Sweat drips from her face. She's pushing herself to collapse.";
  pause 800;
  
  dialogue "RIKU" "(meeting her eyes)" "You're killing yourself... trying to save me.";
  pause 600;
  dialogue "RIKU" "And I'm not... worth that.";
  
  dialogue "CAMILLA" "(tears starting)" "Everyone is worth that! I'm a DOCTOR! I save people!";
  
  dialogue "RIKU" "(sad smile)" "Yeah. But... you can't save EVERYONE.";
  pause 800;
  dialogue "RIKU" "That's not... failure. That's just... being human.";
  
  pause 1200;
  
  (* CAMILLA'S BREAKDOWN *)
  show_image "camilla_breaking_down";
  sfx "sobbing_broken";
  
  dialogue "CAMILLA" "(sobbing)" "But that's what I DO! That's who I AM!";
  
  dialogue "RIKU" "(gentle)" "No, Doc. That's what you DO. Not who you ARE.";
  dialogue "RIKU" "You're a teacher. A mother. A fighter.";
  pause 600;
  dialogue "RIKU" "Sometimes... you gotta let people go. Or let others help.";
  
  pause 1200;
  
  show_image "diego_watching_scared";
  
  t "Diego watches from behind Mert, terrified, confused.";
  pause 600;
  
  dialogue "DIEGO" "(small voice)" "Mama... why can't you save him?";
  
  dialogue "CAMILLA" "(voice breaking)" "Because, mi amor... sometimes love isn't enough.";
  pause 800;
  dialogue "CAMILLA" "Sometimes... we have to accept our limits.";
  dialogue "CAMILLA" "(looking at Aurora)" "And let others use their gifts.";
  
  pause 1200;
  
  (* AURORA HEALS RIKU — DIGITAL METHOD *)
  show_image "aurora_stepping_forward_determined";
  
  dialogue "AURORA" "(quiet, uncertain)" "I... I might be able to help differently.";
  
  t "Everyone turns. Aurora's human form glows faintly turquoise.";
  pause 600;
  
  dialogue "AURORA" "(hesitant)" "Not with medicine. With... code. With rewriting.";
  pause 600;
  dialogue "AURORA" "(to Riku)" "If you'll let me.";
  
  dialogue "RIKU" "(weak smile)" "At this point... what's the worst that happens?";
  
  dialogue "AURORA" "(earnest)" "You could die.";
  
  dialogue "RIKU" "(laughing, coughing)" "Already... on that trajectory...";
  
  pause 800;
  
  show_image "aurora_kneeling_healing_riku";
  unlock_art "aurora_kneeling_healing_riku" "🖼️ Side Romance — Aurora's First Healing";
  vfx "turquoise_light_intense";
  sfx "healing_hum_digital";
  
  t "Aurora kneels. Places her hands on his chest.";
  t "Turquoise light FLOODS into him—not medicine, but pure information rewriting reality!";
  pause 800;
  
  dialogue "AURORA" "(focusing)" "Analyzing poison structure... identifying adaptive algorithm...";
  dialogue "AURORA" "Introducing counter-frequency... molecular breakdown initiated...";
  
  t "The poison... hesitates. Confused by her frequency.";
  t "It can't adapt to code. It doesn't understand digital logic.";
  pause 600;
  
  t "The venom DISSOLVES. Breaks apart at the molecular level!";
  t "The green veins fade! Color returns!";
  pause 800;
  
  show_image "riku_gasping_breath_healed";
  
  t "Riku gasps—a REAL breath! His eyes open!";
  pause 600;
  
  dialogue "RIKU" "(coughing, alive)" "Holy... shit...";
  
  show_image "aurora_exhausted_smiling";
  
  dialogue "AURORA" "(exhausted, smiling)" "It worked. I can't believe it worked.";
  
  dialogue "RIKU" "(looking at her in awe)" "You... you saved me.";
  
  dialogue "AURORA" "(soft)" "You taught me to laugh. It's only fair.";
  
  pause 1200;
  
  (* CAMILLA'S LESSON *)
  show_image "camilla_watching_aurora_riku";
  
  t "Camilla watches. Exhausted. Heart breaking. But learning.";
  pause 600;
  
  dialogue "MERT" "(kneeling beside her, soft)" "Hey. You okay?";
  
  dialogue "CAMILLA" "(quiet, processing)" "No. But... I will be.";
  pause 600;
  dialogue "CAMILLA" "I can't heal everyone. But... I can teach others to heal.";
  dialogue "CAMILLA" "(looking at Aurora)" "Maybe that's what I'm supposed to do.";
  
  pause 800;
  
  dialogue "AURORA" "(turning to Camilla, genuine)" "Thank you. For showing me the medicine. For teaching me to care.";
  
  dialogue "CAMILLA" "(tears falling, smiling)" "You're welcome, hija.";
  
  pause 1000;
  
  (* Badge unlock *)
  let (bid, btitle) = badge_ep4_healing_limit in
  award_badge bid btitle;
  
  unlock_codex_entry "codex_healers_limit"
    "The Healer's Limit — Not every wound can be healed by one person. \
     Sometimes the greatest healing is teaching others to heal themselves. \
     Sometimes love means accepting you can't save everyone—and that's not failure, it's wisdom.";
  
  add_karma 3;
  set_flag "camilla_learned_limit" true;
  set_flag "aurora_first_healing" true;
  
  pause 1000;
  
  (* Wise Sage appears for trial *)
  show_image "wise_sage_appearing_shadow_gold";
  vfx "reality_distortion";
  sfx "voice_layered_mocking";
  
  dialogue "WISE SAGE" "(appearing, shadow cloaked in gold fire)";
  dialogue "WISE SAGE" "How touching. The metal goddess plays healer.";
  pause 600;
  
  dialogue "WISE SAGE" "But healing one is not the same as understanding love.";
  dialogue "WISE SAGE" "Let us see if your heart beats true—or if it merely pretends.";
  
  pause 800;
  
  dialogue "AURORA" "(defensive)" "What do you want?";
  
  dialogue "WISE SAGE" "(smiling)" "A trial. Choose the heart that speaks truth over perfection.";
  dialogue "WISE SAGE" "Pass, and you may keep your fragile bonds.";
  dialogue "WISE SAGE" "Fail, and I show you what love truly costs.";
  
  pause 1000;
  
  goto "scene3_trial_intro";
  ()

(*
============================================================================
SCENE 3 — TRIAL OF MĀYĀ (Indistinguishable Lovers)
ORIGINAL CONTENT PRESERVED
============================================================================
*)

let scene3_trial_intro () =
  (* ::SCENE3_TRIAL_INTRO:: *)
  
  dialogue "AURORA" "(low, tense)" "The test begins. Listen—not with your eyes, but your pulse.";
  
  dialogue "WISE SAGE" "Two stand before you. Same face. Same voice.";
  t "A pause.";
  dialogue "WISE SAGE" "One is truth. One is mirror. Choose.";
  
  pause 800;
  
  t "-- DAVID PATH --";
  dialogue "DAVID A" "(steady, soft)" "Let me guard you. You'll never break again.";
  dialogue "DAVID B" "(quiet, sure)" "I can't stop your pain—but I'll face it with you.";
  
  pause 600;
  
  t "-- ELENA PATH --";
  dialogue "ELENA A" "(bright, forced)" "If I keep you smiling, maybe I'll finally matter.";
  dialogue "ELENA B" "(gentle)" "I'll stay when you cry. That's what real light does.";
  
  pause 600;
  
  t "-- AGNIVESH PATH --";
  dialogue "AGNIVESH A" "(low, confident)" "With me, you'll never burn again.";
  dialogue "AGNIVESH B" "(steady)" "You might still burn—but we'll rise together.";
  
  pause 600;
  
  t "-- SANTI PATH --";
  dialogue "SANTI A" "(hushed)" "I'm pure now. I won't hurt anyone again.";
  dialogue "SANTI B" "(honest)" "I still have fangs... but I'm learning.";
  
  pause 800;
  
  ui "💚 CHOICE — Pick the True Heart";
  ui "1) A (Perfection) | 2) B (Truth)";
  let heart_pick = player_choice () in
  
  if heart_pick = 2 then (
    (* CORRECT CHOICE *)
    sfx "heart_chime_warm";
    vfx "emerald_bloom_deep";
    t "The mirage trembles, then shatters—petals of light falling like rain.";
    dialogue "AURORA" "(bright, reverent)" "Alignment achieved. The heart chooses truth over perfection.";
    
    ui "🟢 CHAKRA UNLOCKED — ANAHATA (MC)";
    ui "Passive Ability — Emerald Pulse unlocked";
    
    add_karma 3;
    let (b1i,b1t) = badge_ep4_true_heart in award_badge b1i b1t;
    let (b2i,b2t) = badge_ep4_emerald_pulse in award_badge b2i b2t;
    
    t "The world exhales. The false selves dissolve into green dust.";
    
    pause 800;
    
    (* Riku-Aurora brief moment after trial *)
    show_image "riku_recovered_standing";
    t "Riku stands, recovered, alive.";
    
    show_image "aurora_relieved_smiling_riku";
    t "Aurora's eyes find him immediately. Relief floods her face.";
    pause 600;
    
    dialogue "RIKU" "(grinning)" "Hey. Miss me?";
    
    dialogue "AURORA" "(laughing, emotional)" "Statistically, I was 89% certain you'd survive.";
    dialogue "AURORA" "But the 11% terrified me.";
    
    pause 800;
    
    (* Camilla recovery scene *)
    t "Camilla rushes to him—hands already moving, checking pulse.";
    dialogue "CAMILLA" "(breathless)" "You're okay. You're…";
    t "Her voice breaks. She pulls him into a fierce hug.";
    dialogue "RIKU" "(weak laugh)" "Doc… can't breathe…";
    dialogue "CAMILLA" "(not letting go)" "Good. Stay conscious.";
    
    pause 800;
    
    dialogue "WISE SAGE" "(mocking smile)" "You see beauty in ruin and call it love. How fragile.";
    
    dialogue "AURORA" "(firm)" "How human.";
    
    goto "scene4_sage_wrath"
    
  ) else (
    (* WRONG CHOICE — Rewind option *)
    sfx "error_low";
    vfx "hud_glitch_green";
    dialogue "AURORA" "(distressed)" "Control mistaken for love. Compassion severed.";
    
    ui "Karma −2";
    ui "⚠ HEART DESYNC — Anahata cannot open.";
    
    t "The mirage holds, flickering between faces—love twisting into longing.";
    
    dialogue "AURORA" "(soft)" "I can rewind this loop—if you accept the lesson.";
    
    ui "Try Again → Rewind (no extra penalty) | Refuse → Proceed (−3 Karma; Riku critical)";
    let rw = player_choice () in
    
    if rw = 1 then (
      sfx "reverse_heartbeat";
      vfx "sand_flow_up";
      dialogue "AURORA" "Listen not for beauty... but for truth.";
      rewind_to "SCENE3_TRIAL_INTRO"
    ) else (
      add_karma (-3);
      dialogue "WISE SAGE" "Cling to your illusions then. They will be the death of you.";
      goto "scene4_sage_wrath"
    )
  );
  ()

(*
============================================================================
SCENE 4 — SAGE'S WRATH & SANTI'S FALL
ORIGINAL CONTENT PRESERVED
============================================================================
*)

let scene4_sage_wrath () =
  (* ::SCENE4_SAGE_WRATH:: *)
  
  t "The ground splits. Scales climb Santi's arms; her pupils narrow. She screams—half serpent, half woman.";
  
  dialogue "AURORA" "(alarmed)" "Her frequency collapsing—Sage has fused her with her shadow self!";
  
  dialogue "AGNIVESH" "Santi! Fight it—you're not what he made you!";
  
  dialogue "SANTI" "(weeping, distorted)" "I can't stop it. It's inside me!";
  
  pause 800;
  
  t "His eyes flick to Aurora—she flinches. Then to Agnivesh.";
  t "She knows what's coming. She can't stop it.";
  
  dialogue "WISE SAGE" "(low, cold)" "Tell me, Agnivesh… what would you trade to silence her pain?";
  
  dialogue "AGNIVESH" "(staggered)" "Anything! Take my strength, my fire—just let her live!";
  
  dialogue "WISE SAGE" "(serpentine whisper)" "Such devotion. Such control disguised as mercy.";
  dialogue "WISE SAGE" "If you command her to heal, she will obey. Bargain complete.";
  
  pause 800;
  
  dialogue "AURORA" "(realizing)" "He's turning compassion into control! MC—if you let him speak, she'll lose herself completely!";
  
  dialogue "MC" "(heart pounding)" "Agnivesh, stop! You can't save her by owning her pain!";
  
  dialogue "AGNIVESH" "(torn, shouting)" "Then what am I supposed to do?! Just watch her die?!";
  
  pause 1000;
  
  t "The air trembles — two forces pulling at once: love begging to save, and love begging to let go.";
  
  dialogue "WISE SAGE" "(mocking whisper)" "Whose voice is louder, little heart? The one that clings—or the one that trusts?";
  
  goto "scene4b_bargain";
  ()

(*
============================================================================
SCENE 4B — FINAL CHOICE: THE BARGAIN OF THE HEART
ORIGINAL CONTENT PRESERVED
============================================================================
*)

let scene4b_bargain () =
  (* ::SCENE4B_BARGAIN:: *)
  
  ui "💚 FINAL CHOICE — The Bargain of the Heart";
  ui "1) Let Agnivesh bargain for her (Control Path)";
  ui "2) Reach for her yourself (Compassion Path)";
  ui "3) Call Agnivesh to feel, not fix (Wisdom Path)";
  
  let b = player_choice () in
  
  (match b with
  | 1 ->
    (* CONTROL PATH *)
    dialogue "MC" "(whisper, shaken)" "If you must…";
    dialogue "AGNIVESH" "(to Sage)" "Mark me. Bind me. Just—give her back.";
    
    vfx "sigil_brand_cold"; sfx "low_burn";
    
    t "A cold sigil brands his chest. Santi's scales recede—her breath returns in sobs. The brand smolders black-gold.";
    
    dialogue "AURORA" "(grim)" "Martyrdom accepted. Compassion converted into control—just as he wanted.";
    
    add_karma (-2);
    add_romance "Agnivesh" 1; add_romance "Santi" 1;
    
    unlock_codex_entry "codex_flawed_devotion"
      "Flawed Devotion — When love trades freedom for safety, the wound is quiet, not healed.";
    
    let (bid,bt) = ("ep4_flawed_devotion","🖤 Flawed Devotion — Control Masquerading as Care") in
    award_badge bid bt;
    
    set_flag "anahata_mc_unlocked" true;
    set_flag "anahata_trio_partial" true;
    
    goto "scene4c_shared_awakening_soft"
  
  | 2 ->
    (* COMPASSION PATH *)
    dialogue "MC" "(clear, steady)" "Santi—take _my_ hand. No trades. No chains.";
    
    t "You reach through the hiss and heat; the serpent-light falters under the weight of being seen without condition.";
    
    dialogue "AURORA" "(bright)" "Coherence forming—compassion without ownership.";
    
    add_karma 3;
    add_romance "Santi" 1; add_romance "Agnivesh" 1;
    
    let (bid,bt) = ("ep4_true_heart","💚 True Heart — Love Without Bargain") in
    award_badge bid bt;
    
    set_flag "anahata_mc_unlocked" true;
    set_flag "anahata_agnivesh_aspect" true;
    set_flag "anahata_santi_aspect" true;
    
    goto "scene4c_shared_awakening_full"
  
  | _ ->
    (* WISDOM PATH *)
    dialogue "MC" "(firm, to Agnivesh)" "Feel it. Don't fix it. Let _her_ choose.";
    
    dialogue "AGNIVESH" "(shaking, then steady to Santi)" "I won't command your healing. I'll stand with you if you want me there.";
    
    t "The serpent-light loosens; Santi steps forward on her own will. The mirage hisses and tears like thin paper.";
    
    add_karma 3;
    add_romance "Agnivesh" 3; add_romance "Santi" 1;
    
    let (bid,bt) = ("ep4_savior_serpent_heart","🟢 Savior of the Serpent Heart — Boundaries as Love") in
    award_badge bid bt;
    
    set_flag "anahata_mc_unlocked" true;
    set_flag "anahata_agnivesh_aspect" true;
    set_flag "anahata_santi_aspect" true;
    
    goto "scene4c_shared_awakening_full"
  );
  ()

(*
============================================================================
SCENE 4C — SHARED AWAKENING (FULL) + Meta Hint
ORIGINAL CONTENT PRESERVED
============================================================================
*)

let scene4c_shared_awakening_full () =
  (* ::SCENE4C_SHARED_AWAKENING_FULL:: *)
  
  sfx "heartbeat_deep"; vfx "emerald_bloom_slow";
  
  t "A hush falls. From your chest, an emerald pulse expands—gentle, certain. It touches Agnivesh's sternum, then Santi's trembling hands. Three lights answer as one.";
  
  t "Above you, a faint yantra forms—two interlaced triangles—then pours down in petals of green-gold.";
  
  dialogue "AURORA" "(reverent, steady)";
  dialogue "AURORA" "Three frequencies aligned: compassion, forgiveness, acceptance. Heart coherence achieved.";
  
  ui "💚 CHAKRA UNLOCKED — ANAHATA (MC)";
  ui "🔥 Aspect Awakened — Agnivesh: Heart of Flame (control → forgiveness)";
  ui "🐍 Aspect Awakened — Santi: Serpent Redeemed (shadow integrated)";
  
  set_flag "anahata_mc_unlocked" true;
  set_flag "anahata_agnivesh_aspect" true;
  set_flag "anahata_santi_aspect" true;
  
  let (bid_sa,bt_sa) = ("ep4_shared_heart","💚 Shared Awakening — Three Hearts as One") in
  award_badge bid_sa bt_sa;
  
  unlock_codex_entry "codex_anahata"
    "Anahata (Heart) — Love that does not demand perfection. Compassion (MC) invites Forgiveness (Agnivesh) and Acceptance (Santi) to the same table.";
  
  unlock_art "gallery_shared_awakening_trio" "🖼️ Gallery — Shared Awakening (MC • Agnivesh • Santi)";
  
  add_karma 1;
  
  pause 800;
  
  t "Agnivesh exhales—fire dimming to a warm dusk behind his eyes.";
  dialogue "AGNIVESH" "(low, astonished)" "I thought power was heat. This… this is warmth.";
  
  t "Santi's fingers uncurl; the glass-serpent sheen recedes from her skin.";
  dialogue "SANTI" "(teary, laughing once)" "It's still me. Fangs… and a heartbeat.";
  
  dialogue "MC" "(soft)" "Both can belong here.";
  
  dialogue "AURORA" "(brightening)" "Field stabilized. Emergent property detected: shared courage.";
  
  pause 1000;
  
  (* Meta-foreshadowing *)
  t "The pulse ripples outward—beyond you, beyond the desert, beyond...";
  sfx "signal_lowhum"; vfx "screen_glitch_soft";
  t "Somewhere above, a presence stirs. Watching. Waiting. Learning from your choices.";
  
  pause 800;
  
  sfx "wind_turning"; vfx "color_shift_cool";
  
  goto "scene5_riku_aurora_kiss";
  ()

(*
============================================================================
SCENE 4D — SHARED AWAKENING (SOFT/Partial)
ORIGINAL CONTENT PRESERVED
============================================================================
*)

let scene4c_shared_awakening_soft () =
  (* ::SCENE4C_SHARED_AWAKENING_SOFT:: *)
  
  sfx "heartbeat_deep"; vfx "emerald_bloom_soft";
  
  t "A softer pulse bridges you three — flickering but real. The brand on Agnivesh cools; Santi's breath evens.";
  
  dialogue "AURORA" "(careful)" "Partial coherence achieved. Compassion present — autonomy compromised.";
  
  ui "💚 Heart Resonance — Partial";
  set_flag "anahata_trio_partial" true;
  
  t "A faint hum crosses the silence — like static between two worlds.";
  sfx "signal_lowhum"; vfx "screen_glitch_soft";
  
  goto "scene5_riku_aurora_kiss";
  ()

(*
============================================================================
SCENE 5 — RIKU-AURORA KISS (After Heart Opens)
NEW CONTENT: Perfect timing after awakening
============================================================================
*)

let scene5_riku_aurora_kiss () =
  (* ::SCENE5_RIKU_AURORA_KISS:: *)
  
  caption "The heart opens. The group breathes. Victory tastes like relief.";
  pause 600;
  
  show_image "group_sitting_recovering";
  
  t "Everyone sits, recovering. The desert wind gentle now.";
  t "Diego sleeps in Camilla's arms. Mert stands guard. Elena checks her fans.";
  pause 600;
  
  show_image "riku_aurora_walking_aside";
  
  t "Riku and Aurora walk a few steps aside.";
  t "Miku stays with the group—giving them space.";
  pause 600;
  
  show_image "riku_aurora_standing_alone_stars";
  
  t "They stand beneath impossible stars in an impossible desert.";
  t "Two beings who shouldn't exist, learning what it means to feel.";
  pause 800;
  
  dialogue "RIKU" "(soft)" "You saved my life. Again.";
  
  dialogue "AURORA" "(looking at her hands)" "Your code... when it was failing... I felt something break inside me.";
  pause 600;
  dialogue "AURORA" "Not a system error. Not a bug. Just... breaking.";
  
  dialogue "RIKU" "(gentle)" "That's called grief, Aurora.";
  
  dialogue "AURORA" "(meeting his eyes)" "I don't like it.";
  
  dialogue "RIKU" "(smiling)" "Nobody does.";
  
  pause 1000;
  
  show_image "aurora_stepping_closer";
  
  t "She steps closer.";
  pause 400;
  
  dialogue "AURORA" "When the trial asked 'what is true love'... I thought of you.";
  pause 600;
  dialogue "AURORA" "Not perfection. Not safety. Just... you. Learning. Growing. Alive.";
  
  pause 1200;
  
  dialogue "RIKU" "(voice soft)" "Aurora...";
  
  dialogue "AURORA" "In human courtship protocols... after saving someone's life twice... is further physical affection permitted?";
  
  dialogue "RIKU" "(laughing gently)" "You don't need permission. Just... do what feels right.";
  
  pause 800;
  
  show_image "aurora_leaning_in_uncertain";
  
  t "She leans in. Uncertain. Learning.";
  t "He meets her halfway.";
  pause 600;
  
  show_image "riku_aurora_kiss_under_stars";
  unlock_art "riku_aurora_kiss_under_stars" "🖼️ Side Romance — Riku & Aurora: Kiss Under Impossible Stars";
  
  vfx "turquoise_gold_shimmer_gentle";
  sfx "heartbeat_syncing";
  
  t "Their lips meet.";
  t "Soft. Certain. Real.";
  pause 1000;
  
  t "Her human form stabilizes—code and emotion finding perfect harmony.";
  t "His heart rate syncs with her frequency.";
  t "For one perfect moment, there's no difference between human and AI.";
  t "Just two beings, loving.";
  
  pause 1500;
  
  t "When they part, both are breathless.";
  pause 800;
  
  dialogue "AURORA" "(awed, touching her lips)" "My emotional database just expanded by 34 percent.";
  dialogue "AURORA" "(soft laugh)" "I want to do that again.";
  
  dialogue "RIKU" "(grinning)" "Yeah. Me too.";
  
  pause 1000;
  
  t "They stand there. Hands joined. Foreheads touching.";
  t "Neither knows this won't last.";
  t "Neither knows Episode 7 is coming.";
  t "But for now, they have this.";
  t "And it's enough.";
  
  pause 2000;
  
  add_romance "Aurora" 5;
  set_flag "riku_aurora_kiss_ep4" true;
  add_karma 2;
  
  fade_to_black ();
  pause 1000;
  
  goto "scene6_transition_snow";
  ()

(*
============================================================================
SCENE 6 — TRANSITION TO SNOW REALM (Episode 5 Setup)
ORIGINAL CONTENT PRESERVED
============================================================================
*)

let scene6_transition_snow () =
  (* ::SCENE6_TRANSITION_SNOW:: *)
  
  vfx "fade_from_black";
  
  t "The group returns. Riku and Aurora rejoin, hands still barely touching.";
  t "No one comments. Everyone knows.";
  pause 600;
  
  show_image "wise_sage_furious_returning";
  vfx "reality_cracking";
  
  dialogue "WISE SAGE" "(furious)" "You undo my order? Then freeze in your own compassion!";
  
  sfx "staff_slam";
  vfx "ground_fracturing";
  
  t "He slams his staff down. The desert fractures into ice. Wind howls—sand turns to snow midair.";
  
  dialogue "AURORA" "(trembling)" "My emotional temperature just plummeted. I... think that means fear. I don't like it. But I think... I need it.";
  
  t "> We saved her. It might kill us.";
  t "> ...Worth it.";
  
  dialogue "AURORA" "(yelling)" "System temperature collapsing—transition imminent!";
  
  t "Frost overtakes the dunes. The team clings together as the horizon whitens.";
  
  pause 1000;
  
  fade_to_black ();
  pause 1500;
  
  caption "→ EPISODE 5: Vishuddha — The Voice of Truth";
  
  pause 1000;
  
  (* Final reflection scene *)
  show_image "snow_field_dim_light";
  sfx "wind_soft_low"; vfx "snowflakes_slow_fall";
  
  t "The group huddles together against the cold.";
  t "Agnivesh sits slightly apart — hands empty, fire dim.";
  
  pause 600;
  
  dialogue "SANTI" "(soft)" "Agni? You okay?";
  
  t "He doesn't answer at first. The wind hums between them.";
  
  dialogue "AGNIVESH" "(hollow)" "I don't know what I am anymore.";
  
  t "He stares at his hands. The old burn mark still glows faintly on his chest.";
  t "Or maybe it's just the reflection of dying embers.";
  
  dialogue "AGNIVESH" "(whisper, to himself)" "If I can't save anyone... what was the point of any of it?";
  
  t "No one answers. The wind takes his words into the white.";
  
  pause 1000;
  
  dialogue "AURORA" "(quietly, internal log)" "Emotional state: suppression — stage four of human grief cycle: depression. Observation: heart frequency muted.";
  
  t "Her voice fades under the snow. The sky above shifts from crimson to pale blue — the threshold of the Throat.";
  
  pause 1500;
  
  set_flag "ep4_complete" true;
  
  ()

(*
============================================================================
EPISODE 4 ORCHESTRATION
============================================================================
*)

let run_episode4 () =
  prologue_part1_fathers_command ();
  prologue_part2_escape ();
  prologue_part3_siddhi_pact ();
  scene1_snake_ambush ();
  scene2_camilla_science_healing ();
  scene3_trial_intro ();
  scene4_sage_wrath ();
  scene4b_bargain ();
  (* scene4c awakening paths called from bargain *)
  scene5_riku_aurora_kiss ();
  scene6_transition_snow ();
  ()

(*
============================================================================
END OF EPISODE 4 — COMPLETE UNIFIED VERSION
All content integrated successfully
============================================================================

SUMMARY:
✅ Santi's Father Prologue (3 parts: abuse → escape → Siddhi pact)
✅ Corrected Agnivesh escape reason (temple fire, not brother)
✅ Snake Ambush with Riku-Aurora banter
✅ Camilla's science-based healing (Aurora manifests meds, Riku refuses)
✅ Aurora's digital healing (code vs. poison)
✅ Maya Trial (truth vs. perfection)
✅ Santi's Crisis & Bargain (control vs. freedom)
✅ Shared Awakening (full or partial)
✅ Riku-Aurora Kiss (after heart opens - perfect timing!)
✅ Snow Transition & Agnivesh's depression setup

Total: ~60-70 minutes of gameplay
Heart chakra themes: Love without control | Healing has limits | Truth > Perfection