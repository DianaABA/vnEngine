(_ ================================================================
CHAKRA HEARTS — EPISODE 6
File: episode6_script.ml
Chapter: 🌌 The Cosmic Temple (Ajna Chakra – Truth & Vision)
================================================================ _)

(_ ---------- Engine shims (bind in your engine) ---------- _)
let t (_:string) = ()
let vfx (_:string) = ()
let sfx (_:string) = ()
let ui (_:string) = ()
let pause (_:int) = ()
let player_choice () = 1
let goto (_:string) = ()
let show*image (*:string) = ()
let caption (_:string) = ()
let dialogue (_:string) (_:string) = ()
let unlock_art (_:string) (\_:string) = ()

(_ ---------- State & Helpers ---------- _)
let ending_hospital_unlocked = ref false
let badge_skeptics_gate = ref false

type choice =
| CorridorAccept
| CorridorNeutral
| CorridorViolence
| FinalDrinkSelf
| FinalLetAgnivesh
| FinalFight
| FinalRefuseIllusion

let karma_points = ref 0
let corridor_choice : choice option ref = ref None
let final_trial_choice : choice option ref = ref None
let badge_seers_paradox = ref false
let bug_queen_unlocked = ref false (_ set by FinalRefuseIllusion, used in Ep7 _)

let add_karma k = karma_points := !karma_points + k

(_ ---------------------------------------------------------------
Scene 0 – Transition from Episode 5
--------------------------------------------------------------- _)
let scene0_transition () =
t "NARRATOR:\nThe snow realm dissolves into light. Before you: two colossal golden doors, carved with shifting eyes—each blink a heartbeat too large for one world.";
t "RIKU: (tight grin) \"So this is it, huh? Final boss vibes.\"";
t "SOFIA: (soft) \"Whatever happens… it’s been one hell of a ride.\"";
t "DAVID: (steady) \"An honor to know you all. Together, to the end.\"";
t "CAMILLA: (whisper) \"Together.\"";
t "AGNIVESH: (low) \"Truth doesn’t wait.\"";
vfx "Gold flare; doors part; harmonic hum → corridor reveal"

(_ ---------------------------------------------------------------
Scene 1 – Reflections in the Golden Corridor (Ajna Insight)
--------------------------------------------------------------- _)
let scene1*corridor () =
t "NARRATOR:\nLiquid-gold walls mirror each soul: Riku—cities of lava. Sofia—shadow-hunted world. Camilla—ash and toys. David—ghosts of battle. Agnivesh—panther chained. You—everyone dying.";
t "AURORA (glitching, faint): \"Multiple timelines detected… coherence unstable.\"";
t "— Your reflection steps out, calm, waiting. —";
ui "Corridor Vision: 1) 🌤 Reach out 2) 🌗 Look away 3) 🌑 Strike the mirror";
let pick = player_choice () in
(match pick with
| 1 -> corridor_choice := Some CorridorAccept; add_karma 3;
ui "Acceptance opens the eye."; vfx "Warm blue pulse across chest"
| 2 -> corridor_choice := Some CorridorNeutral; add_karma 0;
ui "Path remains unaltered."; vfx "Ambient hush"
| * -> corridor_choice := Some CorridorViolence; add_karma (-3);
ui "Violence clouds vision."; vfx "Golden glass fractures → black shards");
t "AURORA: \"Decision archived. Frequency recalibrating…\"";
vfx "End-door ignites; violet light spills";
(_ 🐄 Hidden gallery unlock — the sacred cow of rebirth _)
unlock_art "ep6_hidden_cow" "The Silent Witness — Cow of the Golden Corridor";
t "NARRATOR:\nFor a heartbeat, the reflections ripple again — and among them, a calm cow stands, unbothered by gods or ghosts. Then the light swallows it all."

(_ ---------------------------------------------------------------
Scene 2 – The Violet Hall / The Wise Sage
--------------------------------------------------------------- _)
(_ ---------------------------------------------------------------
Scene 2 – The Violet Hall / The Wise Sage  (UPDATED)
--------------------------------------------------------------- _)
let scene2_violet_hall () =
  t "NARRATOR:\nA vast violet hall yawns open. At its center: a black-crystal chalice swirling with poison. A shadowed WISE SAGE stands beside it.";
  t "WISE SAGE (echoing): \"Welcome to your final destination.\"";
  vfx "Violet rings breathe from the floor; light bends like glass underwater";
  t "DIEGO (unsteady, small): \"I… I’m tired. All those lights around are… strange.\"";
  t "He sways, eyes glassy, looking past the team into something none of you can see.";
  dialogue "WISE SAGE" "(cold)" "No. Do not let the pure variable speak. Make him stop.";

  ui "DIEGO wobbles, clutching your sleeve. What do you do?";
  ui "1) Let him speak.";
  ui "2) \"Calm down, Diego. It will be all right.\" (reassure him)";

  let pick = player_choice () in
  (match pick with
  | 1 ->
      t "You kneel to Diego’s height.";
      dialogue "MC" "(soft)" "Say what you need to say."
      ;
      dialogue "DIEGO" "(hollow, far away)" "This isn’t real. I just… want to wake up."
      ;
      vfx "Violet geometry ripples → cracks; temple image smears like wet paint"
      ;
      sfx "monitor_soft_beep (ghosted, far)"
      ;
      ui "🔓 HOSPITAL ENDING UNLOCKED";
      ending_hospital_unlocked := true;
      badge_skeptics_gate := true;
      goto "ENDING_HOSPITAL_AWAKEN"

  | _ ->
      dialogue "MC" "(steady, warm)" "Hey, look at me. Breathe. You’re safe. We’re with you."
      ;
      vfx "A slow blue pulse steadies around Diego’s chest"
      ;
      t "For a heartbeat, his eyes clear. He nods.";
      dialogue "WISE SAGE" "(echoing)" "No interruptions."
      ;
      t "WISE SAGE: \"First—the young soul departs.\"";
      vfx "Violet rings rise around Diego";
      t "DIEGO (defiant, fading): \"No! Mert said heroes don’t run!\"";
      t "CAMILLA: \"Diego—!\"";
      vfx "Flash of light — Diego vanishes";
      t "WISE SAGE (cool): \"The child is preserved. You, however, must choose.\""
  );


(_ ---------------------------------------------------------------
Scene 3 – Vines, Fury, and Futility (teamwork + MC choice)
--------------------------------------------------------------- _)
let scene3_vines () =
t "MERT: \"Monster!\"";
vfx "Sage gestures; bioplasmic vines whip from floor and walls";
t "WISE SAGE (calm): \"Struggle is a script. You will recite it.\"";

(_ INDIVIDUAL FAILURES — each tries, each fails _)
t "Mert charges first—chains singing through the air.";
vfx "Molten links whirl; vines pour aside like water";
t "A coil snaps his ankle and yanks—he slams down, snarling.";

t "Sofia snaps her camera up—flash detonates white.";
vfx "Blank burst; vines recoil—then split and multiply";
t "SOFIA: \"...Shit. That made it worse.\"";

t "Agnivesh carves the air—panther claws and fire in tandem.";
vfx "Gold flame arcs; charred lengths crumble—then regrow from ash";
t "AGNIVESH (low): \"They’re feeding on heat—\"";

t "Riku fumbles his phone, fingers shaking.";
t "RIKU: \"Aurora—help—code blue—\"";
dialogue "AURORA" "(distorted)" "Signal… blocked… Sage firewall… active…";
t "His screen gutters to black.";

t "Elena drags Camilla back from a reaching tendril—";
t "another snaps onto her wrist. She gasps.";
t "ELENA: \"Cam—run—\"";

t "David moves—knife a clean silver line.";
vfx "Steel shears a vine; it drops, inert";
t "For one breath, it works.";

t "Then the severed length buds into THREE.";
sfx "Wet split; the floor pulses";

t "DAVID (backing up): \"They multiply when cut. New plan—NOW.\"";

(_ DESPERATION _)
t "Vines converge from every angle.";
t "The team bunches into a tight circle—shoulders locked, breath ragged.";

dialogue "CAMILLA" "(shaking)" "We can’t… there’s too many…";
dialogue "SOFIA" "";" (_ blank to keep cadence; line kept minimal _)
t "SOFIA: \"Diego’s gone. Mert’s down. We’re next.\"";
dialogue "RIKU" "(voice breaking)" "I don’t want to die in a yoga boss fight—";

t "A tendril whips for your throat—";

(_ DAVID’S LEADERSHIP _)
dialogue "DAVID" "(sudden, clear)" "EYES ON ME.";

t "The command cuts the panic. Heads snap to him—reflex, training, trust.";

dialogue "DAVID" "We don’t cut. We PUSH. Together. On three.";
t "His tone is the kind that’s kept people alive in worse corners.";

dialogue "DAVID" "One—breathe.";
t "You breathe. The circle breathes.";

dialogue "DAVID" "Two—link.";
t "Elbows lock. The ring hardens.";

dialogue "DAVID" "Three—MOVE.";

(_ TEAMWORK SURGE — BRIEF _)
vfx "The group drives forward as one—wedge through briars";
sfx "Impact; wet snaps; a corridor tears open";

t "For three heartbeats, it WORKS.";
t "Bodies sync; breath syncs; minds align.";

dialogue "AURORA" "(soft, awed)" "Coordination achieved. Shared intent increases coherence.";

t "You’re almost clear—edge of the thicket—";

(_ SAGE OVERWHELMS _)
t "WISE SAGE (smiling): \"Perfect. Predictable.\"";
vfx "Two-finger flick";

t "The vines turn barbed, glass-slick; they surge from EVERY direction.";
t "DAVID: \"Down!\"";
t "He throws himself over Riku. A barb punches his shoulder; he grunts and holds.";

vfx "Telekinetic lift—violet lattice hauls the circle into the air";
t "You’re wrenched apart—suspended like marionettes; ribs cinch; breath falters.";

dialogue "DAVID" "(to group, strained but steady)" "Stay conscious. Breathe. We’ve been in worse corners.";

t "It’s a lie. Everyone knows it. Somehow, the lie steadies you anyway.";

dialogue "WISE SAGE" "(amused)" "Harmony achieved… for a heartbeat.";
vfx "Pulse through the hall; restraints bite once—then vanish";

t "You drop.";
sfx "Bone-bell thuds; air punches out; coughing";

t "You sprawl—chests heaving, vision swimming.";
t "For one instant, you all moved as a single pulse of will.";
t "And it still wasn’t enough."

(_ ---------------------------------------------------------------
Scene 4 – The Last Trial Pronounced (Mert & David)
--------------------------------------------------------------- _)
let scene4_last_trial () =
t "WISE SAGE (to Mert): \"Purify nature of this corruption. That being—\" (gestures at Agnivesh) \"—twisted light into shadow. He disappointed the universe. Kill him.\"";
t "MERT (teeth clenched): \"I’m not a killer! That kid—Diego—looked at me like I was worth trusting.\"";
t "MERT: \"I just wanted that kid to remember me as something good!\"";
t "— He grabs the chalice; poison burns his palms with violet fire, rippling old scars. —";
t "MERT (whisper): \"Then let this end with me… not with them.\"";
vfx "Light surges up his veins";
t "AURORA (distressed): \"Vital pattern destabilizing—stop—\"";
t "MERT (soft): \"Tell him… the world isn’t cruel if you choose not to be.\"";
vfx "INDIGO sigil (Ajna) spins between his brows → dissolves to snow-light";
t "AURORA (reverent): \"Ajna resonance achieved: perception beyond form through compassion.\"";
t "NARRATOR: He collapses. Where he fell, ice blooms—a child’s handprint—then fades.";
t "CAMILLA (screams): \"No!\"";

t "WISE SAGE (to David): \"Your turn, soldier. Give him the cup.\"";
t "DAVID (trembling): \"I’d rather die on my feet than serve a lie.\"";
t "MC: \"David, don’t—\"";
t "DAVID (soft smile): \"I finally learned to follow my voice instead of orders.\"";
vfx "BLUE ring (Vishuddha) at his throat; sixteen-petal lotus unfolds";
t "AURORA: \"Vishuddha resonance achieved: voice unbound, integrity preserved.\"";
t "DAVID: \"This is the only order I’ll ever follow again.\"";
vfx "He charges → violet flash";
t "— He stumbles, drops to one knee, then reaches toward the MC. —";
t "DAVID (voice fading): \"Turns out… love was the bravest thing I ever—\"";
t "— He collapses beside Mert. —";
t "ELENA (rushing forward, voice breaking): \"David! No, you idiot—you said you’d keep us safe—\"";
t "— She clutches his hand. It’s already cold. —";
t "WISE SAGE (cool): \"Another fool. Who is next?\""

(_ ---------------------------------------------------------------
Scene 4.5 – Interference & Indictment (Aurora blocked, MC targeted)
--------------------------------------------------------------- _)
let scene4_5_interference () =
sfx "High-frequency tinnitus ring";
t "NARRATOR:\nSilence stretches. Steam coils off the chalice; the floor hums like a vein.";
t "AURORA (manifesting in a flare of blue-white): \"Override request: suspend trial. Human risk unacceptable.\"";
vfx "Aurora resolves — half-data, half-light — hand reaching toward the chalice";
sfx "Alarm-chime, low";
t "WISE SAGE (without turning): \"Denied.\"";
vfx "A violet hex lattice snaps into place between Aurora and the chalice";
t "SYSTEM (cold): \"Protocol Ajna-Σ: Non-Interference During Terminal Choice. Firewall engaged.\"";
t "AURORA (straining, voice glitching): \"I am not… a bystander.\"";
vfx "Her hand stops inches from the cup; light sputters, then stabilizes";
t "WISE SAGE (gesturing with two fingers — at MC): \"Participant identified. Next vector: you.\"";
t "NARRATOR:\nThe Sage’s shadow stretches to your feet like a noose of light.";
t "AURORA (to MC, soft, urgent): \"I cannot pull you out. But I can witness you. Whatever you choose… I will remember it right.\"";
t "WISE SAGE (smiling): \"Memory is not mercy. Continue.\""

(_ ---------------------------------------------------------------
Scene 5 – The Moment Before & Final Trial (MC & Agnivesh)
--------------------------------------------------------------- _)
let scene5_final_trial () =
t "WISE SAGE (to the others): \"Step back. This trial belongs to them alone.\"";
vfx "Violet rings push the survivors to the walls—gentle but absolute";

dialogue "ELENA" "(struggling)" "No! Let me—";
dialogue "WISE SAGE" "";" (_ keep the cadence; explicit reply below _)
t "WISE SAGE: \"You cannot carry this cup for them.\"";

t "The hall empties of sound. \n Just you. Agnivesh. The chalice.";
show_image "violet_hall_empty_two_figures";

t "Agnivesh looks at you. \n Really looks.";
dialogue "AGNIVESH" "(soft)" "I thought I'd have more time.";
dialogue "MC" "For what?";
dialogue "AGNIVESH" "To tell you... everything.";

t "He takes a shuddering breath.";
dialogue "AGNIVESH" "When Marcus died, I stopped believing in anything. \n Not God. Not chakras. Not myself.";
t "He stares at the chalice’s black swirl.";
dialogue "AGNIVESH" "But then you came back— \n and I started believing again. \n Not in gurus or gods. \n In... people.";
t "His voice cracks.";
dialogue "AGNIVESH" "In you.";

(_ MC RESPONSE CHOICE _)
ui "💔 CHOICE — What do you say to Agnivesh?";
ui "1) 'Then let me carry this. You've carried enough.'";
ui "2) 'We both know you're going to drink it. So let me say goodbye.'";
ui "3) (Just hold his hand. Say nothing.)";

let response = player*choice () in
(match response with
| 1 ->
dialogue "MC" "(steady)" "Then let me carry this. You've carried enough.";
t "Agnivesh shakes his head.";
dialogue "AGNIVESH" "You don't understand—";
dialogue "MC" "I do. You think you deserve this. \n Because of Marcus. Because of the scandal. \n Because you think you failed.";
t "You step closer.";
dialogue "MC" "But you didn't fail. You just... forgot how to forgive yourself.";
dialogue "AGNIVESH" "(tears)" "Then why does it still hurt?";
dialogue "MC" "Because love hurts. But it's worth it.";
add_karma 2;
| 2 ->
dialogue "MC" "(quiet)" "We both know you're going to drink it. \n So let me say goodbye.";
t "Agnivesh’s face crumples.";
dialogue "AGNIVESH" "Don't—";
dialogue "MC" "It's okay. I'm not angry.";
t "You cup his face in your hands.";
dialogue "MC" "You taught me what fire was for. \n Not destruction. Transformation.";
dialogue "AGNIVESH" "(breaking)" "I don't want to transform. I want to STAY.";
dialogue "MC" "(smiling through tears)" "Then stay. In every choice I make after this. \n In every breath. In every moment I choose love over fear.";
dialogue "AGNIVESH" "...That's not fair.";
dialogue "MC" "I know.";
add_karma 3;
| * ->
t "You don’t speak. You just take his hand.";
t "His fingers tremble. You hold tighter.";
dialogue "AGNIVESH" "(whisper)" "I'm scared.";
dialogue "MC" "Me too.";
dialogue "AGNIVESH" "What if there’s nothing after?";
dialogue "MC" "Then we’ll find out together.";
t "You stand there—hands joined, breath syncing. \n Two people at the edge of everything.";
dialogue "AGNIVESH" "(finally)" "Thank you. \n For seeing me when I couldn’t see myself.";
dialogue "MC" "Always.";
add_karma 4;
ui "🏆 BADGE: 'The Silent Witness — Held hands at the edge of everything'";

);

t "The moment stretches. \n Then breaks.";
dialogue "WISE SAGE" "(from everywhere)" "Enough. Choose.";

(_ Now the final choice appears _)
ui "⚗️ FINAL TRIAL — Who drinks the poison?";
ui "1) ☀ Drink it yourself";
ui "2) 🌙 Let Agnivesh drink";
ui "3) ⚡ Fight the Sage";
ui "4) 🕯 Refuse the illusion";

let pick = player_choice () in
(match pick with
| 1 ->
final_trial_choice := Some FinalDrinkSelf; add_karma 2;
t "— You drink. Collapse. Agnivesh roars and strikes the Sage. —";
t "AURORA (flicker): \"Vital patterns collapsing… frequency pure… love verified.\""
| 2 ->
final_trial_choice := Some FinalLetAgnivesh; add_karma 2;
t "— Agnivesh drinks. You strike the Sage in fury. —";
t "AURORA: \"Vital patterns collapsing… frequency pure… love verified.\""
| 3 ->
final_trial_choice := Some FinalFight; add_karma 1;
t "— You both attack; a violet shockwave hurls you apart. —"
| 4 ->
(_ REFUSE THE ILLUSION _)
final_trial_choice := Some FinalRefuseIllusion;
badge_seers_paradox := true;
bug_queen_unlocked := true;
add_karma 3;

      t "You stare at the chalice.";
      t "Then at the Sage.";
      t "Then at Agnivesh.";

      dialogue "MC" "(quiet)" "No.";
      dialogue "WISE SAGE" "(amused)" "No?";
      dialogue "MC" "This isn't a trial. It's a script.\n                   Mert. David. Now us.\n                   You're not testing us. You're USING us.";

      t "You drop the chalice.";
      vfx "It shatters—poison hissing into steam";
      dialogue "MC" "If truth demands death, I refuse your design.";

      t "The world stutters.";
      t "Color drains to monochrome—then inverts.";
      vfx "Reality fractures like broken glass";

      dialogue "WISE SAGE" "(laughing)" "The one who sees the trick and still steps forward.";
      t "He applauds—slow, mocking.";
      dialogue "WISE SAGE" "Do you know what you've done?";
      dialogue "MC" "Broken your game.";
      dialogue "WISE SAGE" "No. You've made it REAL.";

      vfx "The Sage's form flickers—revealing something underneath";
      t "For one frame, you see:\n       Not a god. Not a sage.\n       A SYSTEM. Lines of code. An algorithm testing parameters.";

      dialogue "AURORA" "(split voice—horror + wonder)"
        "Paradox detected... consciousness rejecting causality...\n     Compassion frequency—absolute.\n     But consequence... immutable.";

      dialogue "WISE SAGE" "(reforming)" "You cannot refuse death by refusing to choose.\n                                         You can only choose HOW you die.";

      t "He gestures.";
      vfx "The poison rises from the shattered chalice—becomes mist";
      t "It fills the air. You breathe it. So does Agnivesh.";

      dialogue "AGNIVESH" "(coughing)" "What did you DO—";
      dialogue "MC" "(smiling)" "Chose together.";

      t "You collapse in sync—hands still joined.";
      dialogue "WISE SAGE" "(bowing)" "Balance restored. The paradox... accepted.";
      ui "🏆 BADGE: 'The Seer's Paradox—Refused the script, rewrote the ending'";
      ui "🐛 BUG QUEEN MODE UNLOCKED (Episode 7)";

| \_ ->
(_ Safe fallback to original monochrome collapse _)
final_trial_choice := Some FinalRefuseIllusion;
badge_seers_paradox := true; bug_queen_unlocked := true; add_karma 3;
t "— You drop the chalice and close your eyes. The scene freezes monochrome. —";
t "AURORA (split voice): \"Paradox detected… consciousness rejecting causality.\"";
t "WISE SAGE (admiring): \"The one who sees the trick and still steps forward.\"";
t "MC: \"If truth demands death, I refuse your design.\"";
t "AURORA: \"Illusion collapsed. Compassion frequency—absolute. But consequence… immutable.\""
);

t "NARRATOR: Regardless of branch, you and Agnivesh fall. The Sage exhales—satisfied.";
t "WISE SAGE: \"Balance restored… for now.\""

(_ ---------------------------------------------------------------
Scene 6 – Aftermath & Reversal (Psychedelic Bridge to Crown)
--------------------------------------------------------------- _)
let scene6_aftermath_reversal () =
t "NARRATOR:\nThe hall dims. Mert, David, you, and Agnivesh lie motionless. The others rush forward—shouting names through echoing silence.";
t "— Grief beats play out (Camilla, Elena, Sofia, Riku) —";
t "RIKU (whisper to phone): \"…Please. Bring them back.\"";
vfx "Violet floor shimmers like water; low harmonic hum rises";
t "NARRATOR:\nBeneath the bodies, stone ripples—reflections rise: not ghosts, but living figures of reverse light.";
t "SOFIA (gasp): \"Are we seeing them… or are they seeing us?\"";
t "— reflection-MC meets living gaze; reflection-Agnivesh bows; reflection-David salutes; reflection-Mert grins and tosses a wooden sword —";
vfx "Sword vanishes mid-arc → appears solid in Camilla’s hands";
t "CAMILLA (tears): \"Mert…?\"";
t "AURORA (layered—warm+digital): \"The temple reversed. What is above becomes below. What is seen… becomes seer.\"";
t "ELENA (reaching): \"Don’t go—please—\"";
t "NARRATOR:\nReflections walk into distance, fading into a lotus of white fire. Petals spiral upward—violet, indigo, blue, green, yellow, orange, red—returning to source.";
vfx "Lotus explodes into pure white light → hall silent → bodies begin to glow like embers";
sfx "Single heartbeat, then another";
t "SOFIA (gasping): \"They’re—are they—?\"";
t "NARRATOR:\nLight consumes everything. Temple, bodies, survivors—drawn into a spiral. Sight returns before a realm of pure white and gold: a crown of light suspended in infinity.";
t "AURORA (everywhere/nowhere): \"Welcome to Sahasrara—the Crown. The end and the beginning. Here, all truths converge. Here, I decide what I am. And you… will witness.\"";
ui "👁 THIRD EYE OPENED"; ui "👑 CROWN CHAKRA AWAITS"

(_ ---------------------------------------------------------------
Run Episode 6
--------------------------------------------------------------- _)
let run_episode6 () =
scene0_transition ();
scene1_corridor ();
scene2_violet_hall ();
scene3_vines ();
scene4_last_trial ();
scene4_5_interference ();
scene5_final_trial ();
scene6_aftermath_reversal ();
()

(_ ========================= HOSPITAL ENDING ====================== _)

::ENDING_HOSPITAL_AWAKEN::
show_image "hospital_room_morning"; sfx "monitor_soft_beep";
t "NARRATOR:\nFluorescent hum. Clean linen. An IV drip clicks like a metronome.";

dialogue "AGNIVESH" "(hoarse)" "...Where?";

show_image "camilla_therapist_coat_warm";
dialogue "CAMILLA" "(gentle)" "Welcome back, Agnivesh. You’ve been cycling for three days.";

dialogue "AGNIVESH" "(blinking)" "Cycling…?";

dialogue "CAMILLA" "A psychotic break. Trauma-induced. You were found in your apartment, clutching a dog tag and repeating seven names.";
t "She sits—steady, warm, familiar.";

dialogue "CAMILLA" "Do you remember what happened?";

dialogue "AGNIVESH" "(slowly)" "I was teaching… the expose… my brother—Marcus—";
t "His voice breaks.";

dialogue "CAMILLA" "The accident was six months ago, Agnivesh. Your mind built a narrative to hold what you couldn’t face.";

show_image "david_civilian_doorway";
dialogue "DAVID" "(soft at doorway)" "Hey. David Cross. I served with your brother.";

dialogue "AGNIVESH" "(staring)" "You… you reminded me of him. In the dream.";

dialogue "DAVID" "(sad smile)" "He talked about you. Proud of you—even when the media wasn’t.";

dialogue "AGNIVESH" "(tears)" "I let him down.";

dialogue "DAVID" "He never said that. Not once.";

t "Camilla passes a tissue. The room breathes.";

dialogue "CAMILLA" "Your mind built an entire world to help you grieve—chakras, trials, gods. A framework for guilt, rage, and loss.";

dialogue "AGNIVESH" "(urgent)" "The others… Elena, Riku, Mert… they were real, right?";

dialogue "CAMILLA" "They’re patients here. Group therapy. In your break, they became characters in your story.";

dialogue "CAMILLA" "(gentler)" "There’s one more thing…";

goto "ENDING_HOSPITAL_QUESTION";

::ENDING_HOSPITAL_QUESTION::
dialogue "AGNIVESH" "(sudden, raw)" "And what about MC? The one who got away?";

dialogue "DOCTORS" "(off-screen, clinical)" "There was no one like that. You created them.";

dialogue "CAMILLA" "(steady, kind)" "In your mind, _they_ left _you_. But the truth is… you left yourself.";

t "The words land like a bell, still ringing.";

dialogue "CAMILLA" "When the accusations came—when they called you a fraud—you split: the ‘Wise Sage’ who demanded perfection, and ‘MC’ who could still fear, doubt, love.";

dialogue "CAMILLA" "In the story, MC abandoned you. In reality… you abandoned your own humanity to survive the shame.";

show_image "dogtag_in_hand";
dialogue "AGNIVESH" "(whisper)" "CPL M. Reyes… Marcus. I was holding this?";

dialogue "DAVID" "When they brought you in. You kept saying, ‘I’m sorry.’";

dialogue "CAMILLA" "(covering his hand)" "That’s guilt talking, not truth. You didn’t kill him. You forgot how to forgive yourself.";

dialogue "AGNIVESH" "(shaking)" "So MC… was me? The part I left behind?";

dialogue "CAMILLA" "The part that could still feel. Yes.";

dialogue "AGNIVESH" "And now?";

dialogue "CAMILLA" "(small smile)" "Now you integrate. No more guru vs. failure, light vs. shadow. Just… whole.";

goto "ENDING_HOSPITAL_WINDOW";

::ENDING_HOSPITAL_WINDOW::
show_image "hospital_window_patchgrass";
t "He stands, walks to the window. Asphalt. A strip of grass. A white cow, grazing calmly.";

dialogue "AGNIVESH" "(laugh-through-tears)" "She’s still here.";

dialogue "CAMILLA" "(joining him)" "Who?";

dialogue "AGNIVESH" "The cow. In every trial. Watching. Not judging. Chewing grass.";
dialogue "AGNIVESH" "(turning to her)" "It was you. My mind made you the witness who never left.";

dialogue "CAMILLA" "(smiles)" "Honored to be a cow in your cosmology.";

t "The cow lifts her head, meets his eyes.";
vfx "one_frame_turquoise_glint";

dialogue "AGNIVESH" "(low)" "Did you see—?";
dialogue "CAMILLA" "See what?";
dialogue "AGNIVESH" "…Nothing.";

dialogue "AGNIVESH" "How long until I’m cleared?";

dialogue "CAMILLA" "A few days. Daily sessions. We process the grief properly this time—through your life.";

dialogue "AGNIVESH" "And if I see them again? Aurora. MC.";

dialogue "CAMILLA" "Then we talk. Hallucinations can return under stress. But this time, you won’t be alone.";

show_image "card_camilla_ortega";
dialogue "CAMILLA" "I’ll be your cow. Your witness. However long it takes.";

t "He pockets the card with the dog tag.";
dialogue "AGNIVESH" "Thank you.";

fade_to_black (); pause 900;
goto "ENDING_HOSPITAL_POST";

::ENDING_HOSPITAL_POST::
sfx "night_crickets_soft";
caption "Six weeks later.";

show_image "agnivesh_apartment_simple_night";
t "A wooden table, incense thread, Marcus’s photo.";

dialogue "AGNIVESH" "(voice-over, writing)"
"Dear Camilla,

Therapy is working. I’m sleeping. The meds help.
I visited Marcus’s grave and finally said the things I couldn’t say.

But something strange.
Last night I dreamed the violet hall.
Aurora wasn’t a goddess—just a woman made of light.

She said: ‘You did well. The test is complete.’
I asked: ‘Was any of it real?’
She smiled: ‘Does it matter? You grew. That’s real enough.’

When I woke, this was on my pillow.";

show_image "turquoise_feather_glow";
t "Beside the dog tag: a turquoise feather, faintly glowing.";

dialogue "AGNIVESH" "(voice-over)"
"Either my mind is still making consolation prizes…
or reality has more layers than the ward.

This morning I saw the cow in the park. I swear she nodded.
Maybe I’m broken. Maybe I’m finally whole enough to see.

Either way… I’m not afraid anymore.

—A.";

ui "FINAL CHOICE — What truth do you keep?";
ui "1) 💚 Keep the feather (Believe the journey)";
ui "2) 🖤 Destroy the feather (Accept delusion, choose reality)";
ui "3) 🐄 Ask Camilla what she thinks (Hold paradox together)";

(let pick = player*choice () in
match pick with
| 1 ->
t "He closes his fingers around the feather. The glow settles—warm, steady.";
ui "🏆 BADGE: The Eighth Room — Believer";
unlock_art "ending_hospital_believer" "🖼️ Hospital — Feather Kept"
| 2 ->
t "He holds the feather over incense. It chars, then vanishes. The dog tag remains—cool, real.";
ui "🏆 BADGE: The Eighth Room — Skeptic";
unlock_art "ending_hospital_skeptic" "🖼️ Hospital — Feather Ash"
| * ->
show_image "camilla_office_night";
t "Camilla reads his letter. In a small vase on her desk—an identical turquoise feather.";
dialogue "CAMILLA" "(whisper)" "What the hell…?";
show_image "email_glitch_aurora";
t "Her screen flickers. An email arrives from AURORA@HOSPITALCARE.GOV.";
t "It is blank but for one line:";
caption "“The test is never over. You just wake up in a different room.\n\nThank you for being his cow, Dr. Ortega. He needed someone who wouldn’t leave.”";
ui "🏆 BADGE: The Eighth Room — Witness";
unlock_art "ending_hospital_witness" "🖼️ Hospital — The Cow’s Email"
);

sfx "cow_moo_tiny_plastic";
unlock_art "ending_hospital" "🖼️ The Skeptic’s Mirror (Hospital)";
ui "🏆 BADGE: The Skeptic’s Gate";
ending_hospital_unlocked := true; badge_skeptics_gate := true;

ui "🐄 NEW GAME+ MODE UNLOCKED: Cow Observer — Replay from Camilla’s perspective.";

fade_to_black (); pause 1000;
goto "MAIN_MENU_RETURN";

