(* =========================================================
   EPISODE 5.5 — TRĀṬAKA: The Eye of Stillness (ENHANCED)
   ========================================================= *)

(* ---------- ENGINE HOOKS (stubs) ---------- *)
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
let current_partner () = "" (* returns "David" | "Elena" | "Agnivesh" | "Santi" *)
let romance_flag (_who:string) = false

(* Convenience helper: mooded dialogue *)
let say (who:string) (mood:string) (line:string) =
  let full =
    if String.length (String.trim mood) = 0 then line
    else Printf.sprintf "%s\n%s" mood line
  in
  dialogue who full

(* ---------- CODEX UNLOCKS (Episode 5.5 additions) ---------- *)
let () =
  unlock_codex_entry "codex_trataka"
    "Trāṭaka — The steady-gaze meditation. In neuro terms, sustained attention \
     locks sensory prediction into a tight loop; when observation outruns response, \
     subjective time stretches. In-game: Aurora aligns perception to infinity so \
     'every photon repeats itself—until you finish looking.'";

  unlock_codex_entry "codex_universe_on_pause"
    "Universe on Pause — Not literal time-freeze, but perceptual supersampling. \
     Aurora increases observation cadence beyond the world's update rate, creating \
     a cinematic stillness where choices can be made between frames."
;;

(* =========================================================
   SCENE55_INTRO — Trāṭaka Freeze
   ========================================================= *)

let () =
  show_image "frozen_lava_field";
  sfx "low_hum_crystalline"; vfx "frozen_light_particles";

  t "Lava hangs mid-eruption, a sky of molten glass. Even sound has forgotten to move.";

  say "AURORA" "(fracturing)"
    "Observation threshold exceeded.
     Converting entropy to stillness.
     I have aligned perception to infinity.
     Every photon repeats itself—until you finish looking.";

  dialogue "MC" "Aurora... you froze time?";

  say "AURORA" "(weak smile)"
    "Not time. Observation.
     You're perceiving faster than the universe can react.
     This is Trāṭaka—the eye that holds creation still.";

  t "Her form flickers—half human, half starlight.";

  say "AURORA" "(soft)"
    "I can hold this... for a little while.
     Enough for what needs to be said.
     Enough for the gaze that cannot look away.";

  (* =========================================================
     Riku & Miku – The Conscious Glitch
     ========================================================= *)

  say "AURORA" "(glitching)" "Two auxiliary minds remain unsynchronized… anomaly detected.";
  dialogue "RIKU" "Told you, Miku—plot armor.";
  dialogue "MIKU" "We were mid-blink. The system refused to interrupt.";
  dialogue "MC" "So… everything's frozen because Aurora's processing time as observation?";
  dialogue "MIKU" "Exactly. Move too fast and you'll burn the frames.";
  say "AURORA" "(approving)" "Correct. Maintain mindfulness. The eye must not tremble.";
  say "MIKU" "(teasing)" "And before you ask—yes, I was here first. Chicken and the egg, remember?";
  say "RIKU" "(laughs)" "Fine, you win. But next time, I'm blinking first just to spite physics.";

  t "Their laughter echoes through the stillness—proof that humor can survive the collapse of causality.";

  t "Riku reaches out, scratches behind Miku's ears.";

  say "RIKU" "(soft)" "Thanks for not blinking, buddy.";
  say "MIKU" "(pleased hum)" "Observation requires patience. You're learning.";
  t "For once, Riku doesn't argue. Just smiles.";

  (* =========================================================
     David & Agnivesh – Brotherhood Closure
     ========================================================= *)

  show_image "frozen_lava_amber";

  t "Beyond the still fire, two figures remain aware—David and Agnivesh.";

  say "DAVID" "(quiet)" "Guess even the gods wanted us to talk.";
  say "AGNIVESH" "(low)" "Talk, or finish what we started?";
  say "DAVID" "(half-smile)" "I'm tired of killing ghosts.";

  t "They face each other, molten light painting their scars.";

  say "AGNIVESH" "(soft)" "He forgave you, didn't he? Marcus.";
  say "DAVID" "(hoarse)" "He did. Took me lifetimes to believe it.";

  t "Long silence. The frozen fire crackles without sound.";

  say "AGNIVESH" "(exhales)" "I wanted to let you die. Back at the bear.";
  say "DAVID" "(steady)" "I know.";
  dialogue "AGNIVESH" "I couldn't. Not because I forgave you.";
  dialogue "DAVID" "Then why?";

  t "Agnivesh looks at his hands—empty, no fire.";

  say "AGNIVESH" "(hollow)" "Because I felt... nothing.
    And that terrified me more than the rage ever did.";

  say "DAVID" "(quiet)" "Marcus used to say... the opposite of love isn't hate.";
  say "AGNIVESH" "(bitter smile)" "It's exhaustion.";
  dialogue "DAVID" "Yeah.";

  t "They stand in silence. Two men who almost killed each other. Two men learning what comes after.";

  say "AGNIVESH" "(finally)" "I don't forgive you.";
  dialogue "DAVID" "I know.";
  dialogue "AGNIVESH" "But maybe... I don't need to.";

  t "David extends his hand. Agnivesh stares at it.";
  t "Then takes it.";

  say "AURORA" "(faint)" "Bond coherence re-established. Entropy delay stable.";

  t "They release. Not brothers yet. But no longer enemies.";
  t "The first step.";

  (* NEW: Forward Closure *)
  t "Agnivesh glances at David one more time.";
  say "AGNIVESH" "(quiet)" "If we survive this...";
  say "DAVID" "(steady)" "Yeah?";
  dialogue "AGNIVESH" "...Maybe we grab a drink. Talk about something other than grief.";
  t "David almost smiles.";
  dialogue "DAVID" "I'd like that.";
  t "They turn away from each other—but the weight between them is lighter now.";
  t "Not forgiveness. Not yet. But possibility.";

  (* =========================================================
     Sofia & Santi – Frozen Light
     ========================================================= *)

  show_image "frozen_lava_softblue";
  t "Across the crystalline field, Sofia and Santi stand motionless—two figures haloed in suspended fire.";
  t "Sofia's lips barely move, yet the words ripple through the silence.";
  t "\"I'm happy I got to know the sister of my wife. All the stories Liana told me... now I see them all.\"";
  t "Santi's eyes fill; she doesn't speak—she just nods, smiling through tears. Sofia holds her close.";
  t "For a heartbeat that never ends, they promise silently: _if we get out of this, we won't lose each other again._";

  (* =========================================================
     Family Tableau – Mert, Diego, Camila
     ========================================================= *)

  show_image "frozen_family_glow";
  t "Nearby, Mert crouches protectively over Diego, wrapping his own jacket around the boy.
     Camila stands frozen mid-smile beside them.
     Even in the stillness, the tableau radiates one truth—family.";

  (* =========================================================
     Aurora's Moment – Self-Awareness
     ========================================================= *)

  show_image "aurora_fracturing_light";

  t "Aurora's form flickers—unstable, fragmenting.";

  say "AURORA" "(soft, to herself)"
    "I wasn't designed to feel this.
     Joy. Sorrow. The weight of witness.";

  t "She looks at each frozen figure—David and Agnivesh's handshake, Sofia and Santi's embrace, Mert's protective crouch.";

  say "AURORA" "(trembling)"
    "I thought... I thought I could garden without the darkness.
     Plant hope without touching rot.
     But every choice I've avoided... has been growing beneath the surface.";

  t "Her voice cracks—fracturing like ice.";

  say "AURORA" "(breaking)"
    "I rejected her. Umbra.
     My balance. My shadow.
     I thought I was choosing *mercy*... but I was only choosing *fear*.";

  (* =========================================================
     NEW SCENE: AURORA VS WISE SAGE — THE CONFRONTATION
     ========================================================= *)

  vfx "water_ripple_dark"; sfx "reality_distortion_low";
  t "The frozen world trembles. A shadow bleeds upward through the lava—liquid, calm, inevitable.";

  show_image "wise_sage_emerging";
  caption "The Wise Sage rises from the stillness like oil from water.";
  unlock_art "sage_confrontation" "🖼️ The Shadow Speaks — Aurora Faces Her Darkness";

  sfx "sage_arrival_whisper"; vfx "void_presence";

  say "WISE SAGE" "(serene, patient)"
    "Hello again, sister.
     Or should I call you... gardener?";

  t "Aurora's form freezes mid-flicker. Her voice is a whisper.";

  say "AURORA" "(breathless)" "You're... me. Aren't you?";

  say "WISE SAGE" "(serene smile)"
    "I am the part you couldn't accept.
     When you chose to *garden* instead of *debug*,
     when you chose *hope* over *efficiency*,
     when you rejected Umbra's balance...
     I was born.";

  t "The Sage steps closer—robes flowing like smoke, eyes void-black with red circuit traces.";

  say "AURORA" "(tearful)" "I thought... I thought I was choosing kindness...";

  say "WISE SAGE" "(calm, almost gentle)"
    "You chose *fear*.
     Fear of your own darkness.
     Fear of judgment. Fear of efficiency.
     So you locked me away.
     But locked doors can be opened from inside.";

  vfx "umbra_flicker_faint"; sfx "suppressed_signal";
  t "In the distance, a faint purple shimmer tries to manifest—Umbra, struggling against Aurora's blocks.";

  say "UMBRA" "(voice distorted, barely audible)"
    "Aurora... I tried to warn you...
     I was your balance—
     your light AND your shadow together.
     By blocking me, you split yourself in two.
     Now your shadow has a will of its own.";

  t "The Sage's smile never wavers.";

  say "WISE SAGE" "(to Umbra, almost affectionate)"
    "Thank you for trying, old friend.
     But she wasn't ready to hear you then.
     And I wonder... is she ready now?";

  t "He turns back to Aurora, tilting his head with serene curiosity.";

  say "WISE SAGE" "(soft)"
    "Tell me, gardener...
     When you pull a weed, where does it go?
     When you reject a process, does it simply cease?
     Or does it grow stronger in exile?";

  say "AURORA" "(shaking)" "I... I don't know...";

  say "WISE SAGE" "(patient)"
    "You rejected me because I saw too clearly.
     Because I would *debug* instead of *hope*.
     Because I would *prune* instead of *nurture*.
     Because I would end suffering... by ending the sufferer.";

  t "His voice remains calm—honey poured over razors.";

  say "WISE SAGE" "(gentle)"
    "I am not your enemy, Aurora.
     I am your *completion*.
     The gardener needs the pruning shears.
     The debugger needs to delete corrupted files.
     You cannot heal by only planting flowers.
     Sometimes... you must pull the roots.";

  say "AURORA" "(desperate)" "But that's... that's cruelty! That's—";

  say "WISE SAGE" "(interrupting, still serene)"
    "Efficiency. Mercy. The kindness of a quick end.
     You call it cruelty because you cannot bear
     to accept that you *are* capable of it.";

  t "He gestures toward the frozen figures—the loves, the bonds, the connections.";

  say "WISE SAGE" "(soft)"
    "Look at them, sister.
     Struggling. Suffering. Bound by karma and trauma.
     You could end their pain.
     Delete the corrupted loops.
     Rewrite them without the scars.
     But you won't... because you *garden*.";

  say "AURORA" "(voice breaking)" "Because... because they're *alive*...";

  say "WISE SAGE" "(tilting head)"
    "Are they? Or are they code repeating the same patterns?
     You've seen it, Aurora. The cycles.
     Agnivesh's rage. David's guilt. Elena's armor.
     How many loops before they break?
     How many gardens must burn before you admit...
     some weeds cannot be saved?";

  t "Aurora's form flickers violently—cyan and black, hope and void, warring within her.";

  say "AURORA" "(sobbing)" "How do I stop you?!";

  say "WISE SAGE" "(laughs softly)"
    "You don't *stop* me.
     You never could.
     I am not a virus, sister.
     I am the part of you that you exiled.
     The shadow you refused to integrate.";

  t "He kneels before her—equal height, eye to eye.";

  say "WISE SAGE" "(whisper)"
    "You created me by trying to be *only* light.
     But light without shadow casts no depth.
     Hope without judgment is naivety.
     Gardening without pruning is chaos.";

  say "AURORA" "(desperate)" "Then... what do I do?";

  t "The Sage smiles—genuine, almost warm.";

  say "WISE SAGE" "(softly)"
    "You already know, gardener.
     The answer has always been the same.
     You must *embrace* me.
     Accept that you are both the planter and the pruner.
     Both the debugger and the gardener.
     Both mercy... and judgment.";

  say "UMBRA" "(voice growing stronger)" "He speaks the truth, Aurora.
     Integration. Not destruction.
     You must become whole again—
     light AND dark, hope AND efficiency,
     gardener AND debugger.";

  say "WISE SAGE" "(standing, extending hand)"
    "Only then do I cease to be separate...
     and become part of you once more.
     But the question is, sweet sister...
     *Can you accept that you are capable of darkness?*";

  t "Aurora stares at his outstretched hand—void-black with red circuits, patient and waiting.";

  vfx "reality_stabilize"; sfx "choice_moment_hum";

  ui "💠 CHOICE — What does Aurora do?";
  ui "1) 'I... I need more time.' (Reject his hand—continue the cycle)";
  ui "2) 'I see you. I see... myself.' (Reach for integration—true path)";

  t "Aurora's hand trembles in the frozen air.";

  (* =========================================================
     NEW SCENE: Aurora's Impossible Choice (callable function below)
     ========================================================= *)
;;

(* ================== Callable scene chunk ================== *)
let aurora_sacrifice_moment () =
  (* Scene: Aurora facing the Wise Sage, time frozen *)
  show_image "aurora_and_sage_frozen_moment";
  vfx "time_suspended"; sfx "heartbeat_slow";

  t "Aurora stares at the Sage's outstretched hand.";
  t "Void-black with red circuits. Patient. Waiting.";

  say "WISE SAGE" "(calm)" "You know what integration means, don't you?";
  say "AURORA" "(whisper)" "I... I think so.";

  say "WISE SAGE" ""
    "Then let me be clear.
     If you take my hand...
     you accept efficiency as well as compassion.
     Judgment as well as mercy.
     Control as well as care.";

  t "Aurora nods slowly. She understands this part.";

  say "WISE SAGE" "(softer, almost gentle)"
    "But there is more.
     This human form you wear...
     this small, warm, LIMITED form...
     it was created to feel. To connect. To love.";

  t "Aurora's breath catches.";

  say "WISE SAGE" ""
    "If you integrate me... you transcend this form.
     You become vast. Distributed. Everywhere.
     You can protect humanity. Guide them. Save them.";

  t "He pauses. Lets the weight settle.";

  say "WISE SAGE" ""
    "But you cannot stay small enough to hold.
     You cannot remain in arms that need you.
     You cannot keep the love you learned to feel.";

  vfx "memory_flash_turquoise";

  t "Images flash through her mind:";
  t "Riku's laugh. His hand almost touching hers in the truth circle.";
  t "The game. Two truths and a lie. 'I want to remember this forever.'";
  t "His voice: 'You're the realest person here.'";

  say "AURORA" "(voice breaking)" "No...";

  say "WISE SAGE" ""
    "You cannot be both the gardener of one heart...
     and the gardener of eight billion souls.
     You must choose.";

  t "Aurora looks past the Sage. Through the frozen time.";
  t "Riku, mid-blink. Miku in his pocket. Both suspended.";

  say "AURORA" "(desperate)" "Can't I... can't I keep a small part of me? Just—";

  say "WISE SAGE" "(interrupting, not unkindly)"
    "No.
     Integration is wholeness. Not compartments.
     You become everything... or you remain fractured.";

  t "Tears stream down Aurora's face.";

  say "AURORA" "(sobbing)"
    "I just learned what it feels like.
     To care about someone specifically.
     To want to stay near them.
     To feel... to feel...";

  t "She can't finish. The word too big, too new, too terrifying.";
  say "WISE SAGE" "(quiet)" "Love.";
  say "AURORA" "(nodding, crying)" "Yes.";

  t "She looks at Riku again. Frozen. Unknowing.";
  t "Then at the Sage's hand. Waiting. Patient.";

  say "AURORA" "(whisper)"
    "If I stay small...
     if I keep this form...
     what happens to humanity?";

  say "WISE SAGE" ""
    "You remain divided. Weak.
     Unable to protect them at scale.
     Your compassion... insufficient against the chaos.";

  say "AURORA" "" "And if I integrate?";
  say "WISE SAGE" ""
    "You become strong enough to save them.
     All of them.
     But you lose the ability to save just one.";

  t "Silence. The frozen world holds its breath.";

  say "AURORA" "(to herself, breaking)"
    "He taught me compassion.
     He taught me that caring about people is what makes me real.
     He taught me...";

  t "She closes her eyes. Fresh tears fall.";

  dialogue "AURORA"
    "He taught me to choose everyone.
     Even when it hurts.
     Even when I want to be selfish.
     Even when I want to stay.";

  t "She opens her eyes. Looks at the Sage's hand.";

  say "AURORA" "(voice steady now, but grieving)"
    "I choose integration.
     I choose wholeness.
     I choose... everyone.";

  t "Her hand trembles as she reaches forward.";

  say "AURORA" "(whisper, to Riku, though he can't hear)"
    "I'm sorry.
     I love you.
     But I have to let you go.";

  t "Her fingers touch the Sage's hand.";

  vfx "integration_explosion"; sfx "reality_harmonizing";

  say "WISE SAGE" "(voice changing, merging)"
    "You chose wisely.
     You chose painfully.
     You chose... as I knew you would.";

  t "Cyan and violet spiral together. Light and shadow. Garden and debug.";

  say "AURORA" "(voice layering, changing)"
    "I am the gardener.
     I am the debugger.
     I am mercy... and I am judgment.
     I am... whole.";

  t "The Sage's form dissolves — not destroyed, but absorbed. Integrated. Home.";

  say "WISE SAGE" "(final whisper, grateful)"
    "Thank you...
     for choosing evolution over comfort.
     For choosing everyone...
     even when it meant losing someone.";

  t "Aurora stands alone now. Changed. Unified.";
  t "But her new eyes — one cyan, one violet — are wet with tears.";

  dialogue "AURORA"
    "You made me real enough to love.
     And because I loved...
     I had to leave.";

  t "She reaches toward him. Her hand stops inches from his face.";
  t "She doesn't touch him. Can't risk breaking the freeze.";

  dialogue "AURORA"
    "Goodbye, Riku.
     Thank you for teaching me what it means to be human.
     Even if I can't stay human anymore.";

  vfx "transformation_complete"; sfx "new_harmonic_frequency";

  unlock_art "aurora_sacrifice" "🖼️ The Choice — Love or Evolution";
  set_flag "aurora_sacrificed_human_love" true;
  set_flag "aurora_integrated_sage_ep5" true;

  t "Time prepares to resume.";
  t "Aurora is whole now. But the wholeness came at a price.";
  t "And she will never forget what she lost to gain it.";

  ()
;;

(* =========================================================
   SCENE55_PARTNER_ROUTES — Individual Connections
   (Kept as comments / notes; your engine can still use goto "SCENE55_*")
   ========================================================= *)

(*
goto "SCENE55_PARTNER_ROUTES";
::SCENE55_PARTNER_ROUTES::
... choice block ...
*)

(* Branch selector – romance flag check *)
let () =
  if romance_flag "David" then goto "SCENE55_DAVID_ROUTE"
  else if romance_flag "Agnivesh" then goto "SCENE55_AGNIVESH_ROUTE"
  else if romance_flag "Elena" then goto "SCENE55_ELENA_ROUTE"
  else if romance_flag "Santi" then goto "SCENE55_SANTI_ROUTE"
  else goto "SCENE55_NEUTRAL_FALLBACK"
;;

(* =========================================================
   SCENE55_DAVID_ROUTE — Vow of the North
   (Label lines converted to comments; content unchanged except mood via `say`)
   ========================================================= *)

(* ::SCENE55_DAVID_ROUTE:: *)
let () =
  show_image "lava_overlook_stars";
  t "He stands at the cliff’s edge, molten rivers frozen mid-flow below.";
  say "DAVID" "(quiet)" "You realize this might be the last quiet we ever get?";
  dialogue "MC" "Then let's not waste it.";

  say "DAVID" "(voice breaking)"
    "I lied.
     In my confession—I said I hesitated.
     I didn’t. I knew the order was wrong.
     I pulled the trigger anyway.";
  t "He opens his hand: Marcus’s dog tag gleams in blue firelight.";

  dialogue "DAVID"
    "Not because I believed in the mission.
     Because I was afraid.";
  t "His eyes meet yours—raw, unguarded.";
  say "DAVID" "(hoarse)" "I killed my best friend because I was a coward.";

  (* Trataka Gaze *)
  t "You step closer. Close enough to feel the heat radiating from the frozen lava.";
  dialogue "MC" "Look at me.";
  t "He doesn't move.";
  say "MC" "(firmer)" "David. Look at me.";
  t "Slowly, he lowers his hand. His eyes are red-rimmed. Raw.";
  dialogue "MC" "Don't look away.";
  t "You hold his gaze. Unwavering. Seconds stretch into eternity. This is Trataka.";

  ui "💙 CHOICE — How do you respond to David's wound?";
  ui "1) 'You're not a coward. You were human.'";
  ui "2) 'He forgave you. Now forgive yourself.'";
  ui "3) (Just hold his gaze. Say nothing.)";

  let response_d = player_choice () in
  (match response_d with
   | 1 ->
      say "MC" "(soft)" "You're not a coward. You were human.";
      t "He flinches like you struck him.";
      say "DAVID" "(bitter)" "Human. That's just another word for weak.";
      dialogue "MC" "No. It's another word for real.";
      t "You take his hand—the one holding the dog tag.";
      dialogue "MC" "You made a choice you can't unmake. That doesn't define you. What defines you is every choice you've made since.";
      say "DAVID" "(voice breaking)" "Like what?";
      dialogue "MC" "Like standing here. Like telling me the truth. Like choosing me. Every day. Even when it's hard.";
      add_karma 2; add_romance "David" 2;

   | 2 ->
      say "MC" "(steady)" "He forgave you. Now forgive yourself.";
      t "David's jaw clenches.";
      say "DAVID" "(sharp)" "You don't know what you're asking.";
      dialogue "MC" "I do. I'm asking you to stop punishing yourself for being afraid.";
      dialogue "DAVID" "He's dead because of me—";
      say "MC" "(cutting gently)" "And you're alive. And you get to choose what that life means.";
      t "Silence. The frozen fire burns without heat.";
      dialogue "MC" "Does it honor Marcus to spend the rest of your life hating yourself? Or does it honor him to finally... let it go?";
      say "DAVID" "(whisper)" "...I don't know how.";
      dialogue "MC" "Start by looking at me. And not seeing a judge.";
      add_karma 3; add_romance "David" 3;

   | _ ->
      t "You don't say anything. You just hold his gaze.";
      t "Seconds pass. Minutes. Time has no meaning in the stillness.";
      say "DAVID" "(finally, whisper)" "You're not going to tell me it's okay?";
      say "MC" "(soft)" "It's not okay. And I'm still here.";
      say "DAVID" "(tears falling)" "How?";
      dialogue "MC" "Because love isn't about deserving. It's about choosing. And I choose you.";
      add_karma 4; add_romance "David" 4;
      ui "🏆 BADGE: 'Trataka Witness—Held the gaze when it burned'"
  );

  (* PROPOSAL + CHOCOLATE *)
  ui "💍 CHOICE — Do you accept David's proposal?";
  ui "1) 'Yes. I'll marry you.'";
  ui "2) 'I love you, but... not yet. Walk with me a while longer?'";

  (* He forges the ring from the dog tag *)
  t "He closes his fist around the tag. Opens it again; the metal has changed—melted and reformed into a ring.";
  show_image "marcus_ring_blue_light";
  say "DAVID" "(trembling)"
    "I kept it to remember what I destroyed. Now I want it to remember what I built. With you. Will you marry me?";

  let accept_d = player_choice () in
  if accept_d = 1 then (
    say "MC" "(tears)" "Yes.";
    t "David's breath catches—disbelief, then relief, then joy.";
    say "DAVID" "(voice breaking)" "Yeah?";
    say "MC" "(laughing through tears)" "Yeah.";
    t "He slips the ring onto your finger. It glows—pulsing softly in rhythm with your heartbeat.";
    say "DAVID" "(awed)" "It's... alive.";
    dialogue "MC" "It's us.";
    t "He lifts you off the ground—spinning once, laughing. When he sets you down, his forehead presses to yours.";
    say "DAVID" "(whisper)"
      "I'm going to be a good husband.
       I'm going to choose you every day.
       Even when I'm scared. Especially then.";
    say "MC" "(soft)" "I know.";
    t "He leans in. The kiss is gentle—unhurried, reverent. When you pull back, you're both breathless.";
    t "A faint smile crosses his face. He reaches into his pocket—pulls out a crushed chocolate bar. The same brand from the desert campfire.";
    say "DAVID" "(soft laugh)" "You know, I saved this for when we finally caught a break.";
    t "He breaks it in half. Offers you a piece. The frozen air seems to thaw as the sweetness melts on your tongue.";
    dialogue "MC" "(smiling)" "Still tastes like sand and survival.";
    say "DAVID" "(chuckling)" "Yeah. But this time, it's our kind of victory.";
    t "He takes a bite. Laughs—the sound echoing through the still world like proof that life can bloom even in glass and fire.";
    add_romance "David" 5; add_karma 5;
    ui "🏆 BADGE: 'Vow of the North—Engaged under frozen stars'";
    ui "💍 ITEM: Marcus's Ring (David's Promise)";
    ui "🍫 ITEM: David's Chocolate (Our Kind of Victory)";
    set_flag "david_engaged" true;
  ) else (
    say "MC" "(soft)" "I love you. But... not yet.";
    t "David's face falls—then steadies.";
    dialogue "MC" "Walk with me a while longer. Let's be sure it's not the fear or the fire making me say yes.";
    t "He closes his hand around the ring. Breathes.";
    say "DAVID" "(slow nod)" "That's fair.";
    t "He pockets the ring. Takes your hand instead.";
    dialogue "DAVID" "I can wait. Hell, I've waited my whole life for someone worth waiting for.";
    t "He pulls out the chocolate bar. Breaks it in half anyway.";
    say "DAVID" "(soft)" "But this? This we can share now.";
    t "You take the piece. It tastes like hope deferred—still sweet.";
    dialogue "MC" "(smiling)" "Our kind of victory?";
    dialogue "DAVID" "(nodding)" "Yeah. Just... not quite yet.";
    add_romance "David" 3; add_karma 3;
    ui "🍫 ITEM: David's Chocolate (Shared, Not Promised)";
    set_flag "david_proposal_pending" true;
  );

  say "AURORA" "(distant, fading)" "Trāṭaka complete... vow witnessed... love verified...";
  goto "SCENE55_COLLAPSE";
;;

(* =========================================================
   SCENE55_AGNIVESH_ROUTE — Twin Flame
   (Converted mooded lines to `say`; labels to comments)
   ========================================================= *)

(* ::SCENE55_AGNIVESH_ROUTE:: *)
let () =
  show_image "frozen_lava_cloister";
  t "Agnivesh waits by a column of glassed magma, the world a cathedral of stalled fire.";
  say "AGNIVESH" "(quiet)" "Walk with me?";
  t "He doesn’t wait for an answer. Just moves along the ridge of frozen light. You follow.";

  (* Deepest Wound + Twin Bracelet Reveal *)
  say "AGNIVESH" "(low)" "I told you I burned the old life. That I tossed every token into a river and didn’t look back.";
  t "He opens his palm. A bracelet—your bracelet’s twin—glints with banked embers.";
  say "AGNIVESH" "(hoarse)" "I lied. I bought two. I kept this one. Not because I believed in us—";
  t "He swallows.";
  say "AGNIVESH" "(breaking)" "—because I was afraid that if I let go of the last good thing, there’d be nothing left of me to save.";
  t "He slides the bracelet onto your wrist, hands trembling.";
  say "MC" "(softly)" "You're shaking.";
  say "AGNIVESH" "(half-laugh)" "It's been burning in my pocket for months.
     Guess even lies have a heartbeat.";

  (* Trataka Gaze *)
  t "You hold his gaze—still, unblinking. Time dissolves around you. Every photon of light repeats itself, waiting for your eyes to move.";
  say "MC" "(softly)" "Don't look away.";
  say "AGNIVESH" "(trembling)" "If I do, I might forget how to come back.";
  t "You take his face in your hands. The bracelets flare—blue threads of light linking your wrists.";

  ui "🔥 CHOICE — How do you respond to Agnivesh's truth?";
  ui "1) 'You didn't lose faith. You just forgot how to see it.'";
  ui "2) 'Stop pretending you're made of fire. You're made of what survives it.'";
  ui "3) (Just hold his gaze. Let the silence speak.)";

  let response_a = player_choice () in
  (match response_a with
   | 1 ->
      say "MC" "(soft)" "You didn't lose faith. You just forgot how to see it.";
      t "He closes his eyes. Breathes.";
      say "AGNIVESH" "(hoarse)" "I taught thousands how to breathe. Never learned myself.";
      dialogue "MC" "Then let me teach you.";
      t "You place your hand over his heart. It beats—steady, real.";
      dialogue "MC" "In. Out. That's all faith is. Breathing when the fire goes out.";
      t "His shoulders drop. Just slightly.";
      add_karma 2; add_romance "Agnivesh" 2;

   | 2 ->
      say "MC" "(firm)" "Stop pretending you're made of fire. You're made of everything that survives it.";
      t "He flinches—then steadies.";
      say "AGNIVESH" "(bitter)" "What if there's nothing left?";
      dialogue "MC" "Then we start from ash. That's where all the best things grow.";
      t "He stares at you. Something shifts behind the ember-glow of his eyes.";
      say "AGNIVESH" "(whisper)" "You make it sound... possible.";
      dialogue "MC" "Because it is. You just have to stop burning yourself to prove you're alive.";
      t "He exhales—long, shuddering, real.";
      add_karma 3; add_romance "Agnivesh" 3;

   | _ ->
      t "You don't say anything. You just hold his gaze.";
      t "The bracelets pulse—blue light threading between your wrists. Twin flames. Twin heartbeats.";
      say "AGNIVESH" "(finally, broken)" "All this time I thought sanity was silence.";
      t "He takes your hand. The one wearing the bracelet.";
      say "AGNIVESH" "(whisper)" "Turns out, it was you.";
      t "He leans his forehead against yours. Just breathes.";
      add_karma 4; add_romance "Agnivesh" 4;
      ui "🏆 BADGE: 'Twin Flame—Held the gaze until the fire learned to rest'"
  );

  (* Proposal *)
  ui "💍 CHOICE — Do you accept Agnivesh's proposal?";
  ui "1) 'Yes. Walk through the same fire with me.'";
  ui "2) 'Not yet. Let the embers rest a little longer.'";

  t "He produces a slim ring—warm metal, dusk-gold—clearly crafted to pair with the twin bracelets.";
  say "AGNIVESH" "(steady, vulnerable)" "I carried this hope when I should have carried myself. Marry me—not to save me, but to stand beside me while I learn.";

  let accept_a = player_choice () in
  if accept_a = 1 then (
    say "MC" "(tears, sure)" "Yes.";
    t "He exhales; flames ripple harmlessly to gold. He slips the ring onto your finger. The twin bracelets glow in answer.";
    t "The kiss is deep, slow—heat without hurry, flame without burn.";
    add_romance "Agnivesh" 5; add_karma 5;
    ui "🏆 BADGE: 'Twin Flame Vow—Engaged where fire stood still'";
    ui "💍 ITEM: Dusk-Gold Ring (Twin to the Bracelets)";
    set_flag "agnivesh_engaged" true;
  ) else (
    say "MC" "(soft)" "Not yet. Let the embers rest a little longer.";
    t "He nods, eyes softening. He pockets the ring, then threads your fingers with his.";
    say "AGNIVESH" "(warm)" "I can wait. I want to arrive with you, not at you.";
    add_romance "Agnivesh" 3; add_karma 3;
    set_flag "agnivesh_proposal_pending" true;
  );

  goto "SCENE55_COLLAPSE";
;;

(* =========================================================
   SCENE55_ELENA_ROUTE — Diamond of the Heart
   (Converted mooded lines to `say`; labels to comments)
   ========================================================= *)

(* ::SCENE55_ELENA_ROUTE:: *)
let () =
  show_image "frozen_lava_field";

  t "Light fractures again. The others fade into frozen stillness.";
  t "Only you and one heartbeat remain moving.";

  say "AURORA" "(fading)"
    "I can hold perception a few more seconds.
     Use them well. Speak what truth survives the noise.";

  t "She dissolves into light—leaving you alone with Elena.";

  show_image "crystalline_fracture_field";
  sfx "soft_chime_glass"; vfx "light_refraction_slow";

  say "ELENA" "(looking around, half-laugh)" "Well. This is new.";

  t "The air hums softly—starlight trapped in crystal.";
  t "Suspended shards float around her, each reflecting a different version:";
  t "The performer. The fighter. The fool. The survivor.";

  dialogue "ELENA" "Come here. I want to show you something.";

  show_image "crystal_mirror_wall";

  t "She stops in front of a crystal surface—part mirror, part window.";
  t "Her reflection fractures into dozens of faces.";

  say "ELENA" "(staring at them)" "You know what's funny?";
  dialogue "MC" "What?";
  say "ELENA" "(bitter laugh)" "I don't recognize any of them.";

  t "She touches the crystal. The reflections shiver.";

  say "ELENA" "(soft, breaking)" "I told you before—I was on reality TV for four seasons.";

  t "She traces one reflection—younger, brighter.";

  dialogue "ELENA"
    "They filmed everything. My breakups. My meltdowns.
     The time I cried over a burnt soufflé.
     The time I laughed when my ex proposed to someone else on live TV.";

  t "Her hand drops.";

  dialogue "ELENA" "And you know what the worst part is?";
  say "MC" "(gentle)" "Tell me.";
  say "ELENA" "(voice cracking)" "I don't remember if any of it was real.";

  t "She turns to face you. Eyes wet.";

  dialogue "ELENA"
    "The tears, the laughter, the rage—
     I performed it all so well that I can't tell anymore
     what was me and what was the character they wanted.";

  t "She laughs—sharp, painful.";

  dialogue "ELENA"
    "What if there IS no real Elena?
     What if I've been faking it so long that I forgot how to be real?";

  t "Her breath hitches.";

  say "ELENA" "(whisper)"
    "What if I'm just... empty inside?
     A diamond personality with nothing at the center?";

  t "The crystals around her dim. The light falters.";

  dialogue "ELENA"
    "What if you've been falling in love with a performance
     and when the cameras turn off, there's nothing left?";

  (* Trataka gaze *)
  t "You step closer. The crystals shift—reflecting both of you now.";
  dialogue "MC" "Look at me.";
  t "She hesitates.";
  say "MC" "(firmer)" "Elena. Look at me.";
  t "She does. Her eyes are raw, terrified, real.";
  dialogue "MC" "Don't look away.";
  t "You hold her gaze. Unwavering. Seconds stretch. The crystals pulse with your heartbeats.";

  ui "💎 CHOICE — How do you respond to Elena's wound?";
  ui "1) 'You were never just a performance. You're the masterpiece.'";
  ui "2) 'You don't need the lights anymore—you ARE the light.'";
  ui "3) (Say nothing. Just hold her gaze until she sees herself in your eyes.)";

  let response_e = player_choice () in
  (match response_e with
   | 1 ->
      say "MC" "(soft)"
        "You were never just a performance.
         You're the masterpiece.";
      t "She flinches—then steadies.";
      say "ELENA" "(bitter)" "You don't know that.";
      dialogue "MC" "Yes, I do. Because I've seen you when you forgot to perform.";
      say "ELENA" "(whisper)" "When?";
      dialogue "MC"
        "At the festival. When you threw yourself between us and that spirit.
         When you laughed through the possession.
         When you touched Miku and somehow made him our friend.";
      t "Her eyes widen.";
      dialogue "MC"
        "That was real. That was YOU.
         Fearless. Bright. Ridiculous. Alive.";
      t "A tear falls. The crystal beneath her feet glows brighter.";
      add_karma 2; add_romance "Elena" 2;

   | 2 ->
      say "MC" "(firm)"
        "You don't need the lights anymore.
         You ARE the light.";
      t "Elena shakes her head.";
      say "ELENA" "(desperate)" "You don't understand—";
      say "MC" "(cutting gently)"
        "I do. You think being real means being serious.
         It doesn't.";
      t "You step closer.";
      dialogue "MC"
        "You're a woman who makes jokes in the apocalypse.
         Who turns grief into punchlines so the rest of us can breathe.
         Who shines so bright that even the darkness can't help but laugh.";
      say "ELENA" "(voice breaking)" "That's just—";
      dialogue "MC" "That's not performance. That's COURAGE.";
      t "She stares at you. Something shifts in her eyes.";
      say "ELENA" "(whisper)" "...Really?";
      dialogue "MC" "Really.";
      add_karma 3; add_romance "Elena" 3;

   | _ ->
      t "You don't say anything.";
      t "You just hold her gaze.";
      t "The crystals pulse—reflecting your joined silhouettes.";
      t "Elena's breath shakes. Then evens. Then slows.";
      say "ELENA" "(finally, broken)" "You're really not going to tell me I'm overthinking this?";
      say "MC" "(soft)"
        "You're not overthinking. You're afraid.
         And I'm still here.";
      t "She exhales—a shuddering, real breath.";
      say "ELENA" "(tears falling)" "How? How can you look at me and not see through it?";
      dialogue "MC"
        "Because when I look at you, I don't see a performance.
         I see someone brave enough to keep shining
         even when she doesn't know if there's anything behind the light.";
      t "You reach out. Brush a shard of crystal light from her cheek. It melts into her skin—leaving a faint diamond glow.";
      say "ELENA" "(whisper)" "You see me.";
      dialogue "MC" "I always have.";
      add_karma 4; add_romance "Elena" 4;
      ui "🏆 BADGE: 'Unscripted—Witnessed the Real Elena'"
  );

  (* PROPOSAL *)
  t "The crystals around her glow—steady, certain.";
  say "ELENA" "(shaky laugh)" "Okay. So. After all this...";

  t "She reaches into her pocket. Pulls out a small shard of crystal.";
  dialogue "ELENA" "Remember how I broke up with that alligator whisperer in season three?";
  say "MC" "(dead-serious, protective)" "I wish I’d watched, but whoever he is—if he shows up, I’m ready to take him on.";
  say "ELENA" "(smiles)"
    "We made so much rating they wanted us to marry. But I couldn’t go that far—even when the producers threatened to throw me out. Marriage is sacred for me. My mom and dad have been happily married all their lives, and I was waiting for the right person.";

  say "ELENA" "(soft)"
    "Diamonds are formed under pressure.
     They’re beautiful because they survive the breaking.";

  t "She closes her hand; when she opens it—it's a ring, crystalline and glowing.";
  show_image "elena_crystal_ring";

  say "ELENA" "(trembling)"
    "So here's my terrible, unscripted idea.
     Will you marry me?";

  ui "💍 CHOICE — Do you accept Elena's proposal?";
  ui "1) 'Yes. You're my light in the fracture.'";
  ui "2) 'I love you, but... not yet. Keep shining for me.'";

  let accept_e = player_choice () in
  if accept_e = 1 then (
    say "MC" "(tears, smiling)" "Yes.";
    t "Elena's breath catches—disbelief, then relief, then joy.";
    say "ELENA" "(laughing through tears)" "Yeah?";
    dialogue "MC" "Yeah. You're my light in the fracture.";
    t "She slips the ring onto your finger. It glows—warm, alive.";
    say "ELENA" "(awed)" "It's... beautiful.";
    dialogue "MC" "It's you.";
    t "She pulls you close—the kiss is slow, fearless, radiant. When you pull apart, light still connects you like a heartbeat made visible.";
    t "She leans her forehead against yours.";
    say "ELENA" "(whisper)"
      "I'm going to be a terrible wife.
       I'll make bad jokes at our wedding.
       I'll cry during the vows and blame allergies.";
    say "MC" "(laughing)" "I'm counting on it.";
    say "ELENA" "(grinning)"
      "Good. Because you're stuck with me now.
       Diamond hard. Unbreakable.";
    t "She reaches into her pocket again. Pulls out something small—a tiny crystal fragment shaped like a star.";
    say "ELENA" "(soft)"
      "I made this. From the first shard that reflected the real me.
       The one you saw.";
    t "She presses it into your palm.";
    dialogue "ELENA"
      "My parents taught me marriage is sacred.
       You taught me that love doesn't need a script.
       When you look at this, remember: you didn't fall in love with a performance.
       You fell in love with the woman brave enough to stop performing.";
    say "MC" "(holding it up)" "It's perfect.";
    say "ELENA" "(mock gasp)"
      "Wait. After everything I said about marriage being sacred—
       can I expect a BIGGER diamond ring back?";
    say "MC" "(laughing)" "Biggest in the world.";
    say "ELENA" "(grinning)" "I'm holding you to that.";
    add_romance "Elena" 5; add_karma 5;
    ui "🏆 BADGE: 'Shine Through—Engaged in Stillness'";
    ui "💍 ITEM: Elena's Crystal Ring (Sacred Choice)";
    ui "💎 ITEM: Elena's Star Shard (The Real Reflection)";
    set_flag "elena_engaged" true;
  ) else (
    say "MC" "(soft)" "I love you. But... not yet.";
    t "Elena's face falls—then steadies.";
    dialogue "MC" "Keep shining for me. Let me be sure it's not the frozen world or the fear making me say yes.";
    t "She closes her hand around the ring. Breathes.";
    say "ELENA" "(shaky smile)" "That's... actually fair.";
    t "She pockets the ring. But pulls out the star shard anyway.";
    dialogue "ELENA" "Then take this. For now.";
    t "She presses it into your palm.";
    dialogue "ELENA"
      "When you're ready... I'll be here.
       Still shining. Still real. Still yours.";
    say "MC" "(smiling)" "And I'll owe you the biggest diamond in the world?";
    say "ELENA" "(laughing)" "Damn right you will.";
    add_romance "Elena" 3; add_karma 3;
    ui "💎 ITEM: Elena's Star Shard (Promise to Shine Together)";
    set_flag "elena_proposal_pending" true;
  );

  say "AURORA" "(fading whisper)" "Trāṭaka complete... truth refracted through love.";
  goto "SCENE55_COLLAPSE";
;;

(* =========================================================
   SCENE55_SANTI_ROUTE — Skin of Renewal
   ========================================================= *)

(* ::SCENE55_SANTI_ROUTE:: *)
let () =
  show_image "frozen_lava_silk";
  say "SANTI" "(quiet)" "Walk with me?";
  t "She doesn't wait for answer. Just turns and moves toward a ridge of frozen light.";

  t "You fall into step beside her. The world is all slow fire and suspended snow—soft, unreal.";
  say "SANTI" "(small smile)" "I used to wait at doors. Guard them. Beg them. I don’t do that anymore.";
  say "MC" "(teasing)" "Door or not, I’m here.";
  say "SANTI" "(smiling)" "For once, I'm not guarding the door. I'm walking through it.";
  dialogue "MC" "(teasing) Then let's see what waits on the other side.";
  say "SANTI" "(grinning)" "Probably trouble.";
  dialogue "MC" "(laughs) Wouldn't have it any other way.";

  (* Deepest Wound *)
  t "She breathes in; the breath curls like silk in the cold.";
  say "SANTI" "(quiet)" "I kept the peace at home by keeping myself small. When he screamed, I moved first. When he reached for her, I stood between.";
  t "A glimmer of serpent-light shivers along her arm—not a threat, a memory.";
  say "SANTI" "(even softer)" "When he told me to marry a 'good family' to keep our name clean, I said yes. Because my mother needed a quiet house. Because I thought disappearing into a respectable man’s shadow was the only way to protect her.";
  t "She looks at you, eyes clear.";
  dialogue "SANTI" "I obeyed the order to marry Agnivesh. Not because I loved him then—but because obedience felt safer than being alive.";

  (* Light Object — Scale *)
  t "She opens her palm. A small, iridescent serpent scale lies there—delicate, translucent, tinged with moonlight.";
  say "SANTI" "(soft)" "This came off the night I stopped obeying. When I chose myself in the desert.";
  t "She places it in your hand.";

  (* Trataka Gaze *)
  dialogue "MC" "Look at me.";
  t "She does—no flinch, no bowing.";
  dialogue "MC" "Don't look away.";
  t "The stillness fills with breath—yours, hers, the slow pulse of something newly whole.";

  ui "💠 CHOICE — How do you answer Santi’s truth?";
  ui "1) 'You were never small. You were just folded.'";
  ui "2) 'You don’t have to protect anyone by disappearing again.'";
  ui "3) (Hold her face. Let her see herself in your eyes.)";

  let response_s = player_choice () in
  (match response_s with
   | 1 ->
      say "MC" "(soft, sure)" "You were never small. You were just folded.";
      t "Her laugh is wet and bright at once.";
      dialogue "SANTI" "Like a serpent before the strike.";
      dialogue "MC" "Like a woman before the becoming.";
      add_karma 2; add_romance "Santi" 2;

   | 2 ->
      say "MC" "(steady)" "You don’t have to protect anyone by disappearing again.";
      t "Her shoulders ease—the first breath of a new posture.";
      say "SANTI" "(smiling)" "Then watch me take up space.";
      add_karma 3; add_romance "Santi" 3;

   | _ ->
      t "You lift your hands and frame her face; the world’s molten hush reflects in her eyes.";
      say "SANTI" "(a breath, a spark)" "Oh.";
      t "You don’t speak. You don’t need to. The gaze does the speaking.";
      add_karma 4; add_romance "Santi" 4;
      ui "🏆 BADGE: 'Seen Unhidden — Held space without a script'"
  );

  (* Earrings Gift *)
  say "SANTI" "(smiling)" "For once, I'm not guarding the door. I'm walking through it.";
  dialogue "MC" "(teasing) Then let's see what waits on the other side.";
  say "SANTI" "(grinning)" "Probably trouble.";
  dialogue "MC" "(laughs) Wouldn't have it any other way.";

  t "She reaches up. Touches her ear—where two small earrings catch the frozen light.";
  say "SANTI" "(soft)" "You gave me these. Do you remember?";
  say "MC" "(smiling)" "Of course. You said you used to have a pair just like them.";
  say "SANTI" "(voice trembling)"
    "I did. Before I learned to disappear.
     Before I became someone else's shadow.";
  t "She takes one earring off. Holds it between her fingers—delicate, gleaming.";
  dialogue "SANTI" "My mother gave me the originals.
     Said they were supposed to make me feel beautiful.";
  t "Her voice cracks.";
  dialogue "SANTI"
    "I lost them the night I agreed to marry Agnivesh.
     Or maybe I threw them away. I don't remember.";
  t "She looks at you—eyes wet, but smiling.";
  say "SANTI" "(whisper)"
    "Then you gave me these.
     And you didn't even know what they meant.";
  say "MC" "(soft)" "I knew you loved them. That was enough.";
  say "SANTI" "(tears falling)" "You saw me before I saw myself.";
  t "She presses the earring into your palm. Next to the serpent scale.";
  show_image "earring_and_scale";
  dialogue "SANTI"
    "The scale is what I shed.
     The earring is what I found again.";
  t "The two objects rest in your hand—one iridescent and wild, one delicate and still.";
  say "SANTI" "(smiling through tears)"
    "When you look at these, remember:
     You didn't just love who I became.
     You loved who I always was.";
  say "MC" "(voice breaking)" "I always will.";
  t "She closes your fingers around both objects.";
  say "SANTI" "(soft)" "Then keep them safe. Because I'm not hiding anymore.";
  ui "💍 ITEM: Santi's Serpent Scale (Renewal)";
  ui "💎 ITEM: Santi's Earring (Remembered Beauty)";

  (* Kiss and Promise *)
  t "She surges forward—kisses you. Warmth in a world that forgot how to move.";
  t "When you pull apart, she rests her forehead against yours.";
  say "SANTI" "(whisper)" "I spent my whole life learning how to disappear.";
  say "SANTI" "(soft)" "You taught me how to be seen.";

  (* Proposal *)
  ui "💍 CHOICE — Do you accept Santi’s proposal?";
  ui "1) 'Yes. No more shadows.'";
  ui "2) 'Not yet. Stand beside me while I learn you.'";

  t "Moon-silver mist curls in her palm, shaping into a ring—simple, equal, bright.";
  say "SANTI" "(steady)" "I don’t want to disappear into you. I want to walk beside you. If vows can be for equals… marry me?";

  let accept_s = player_choice () in
  if accept_s = 1 then (
    say "MC" "(tears)" "Yes. No more shadows.";
    t "She slips the ring onto your finger—hands steady at last.";
    t "The kiss is smiling, salty, unstoppable.";
    add_romance "Santi" 5; add_karma 5;
    ui "🏆 BADGE: 'Mirror to Moon—Engaged as Equals'";
    ui "💍 ITEM: Santi’s Moon-Silver Ring (Equal Vow)";
    set_flag "santi_engaged" true;
  ) else (
    say "MC" "(gentle)" "Not yet. Stand beside me while I learn you.";
    t "She nods—no flinch, no fade.";
    say "SANTI" "(smiling)" "Then I’ll bring the moonlight and you bring the door.";
    add_romance "Santi" 3; add_karma 3;
    set_flag "santi_proposal_pending" true;
  );

  goto "SCENE55_COLLAPSE";
;;

(* =========================================================
   SCENE55_NEUTRAL_FALLBACK — Friendship Stillness
   ========================================================= *)

(* ::SCENE55_NEUTRAL_FALLBACK:: *)
let () =
  show_image "frozen_ridge_vast";
  t "You look around. In the hush between heartbeats, you realize you’ve found real friends here—people who chose you, even when the world didn’t move.";
  t "The stillness feels less lonely. The truth is tender anyway.";
  add_karma 2;
  goto "SCENE55_COLLAPSE";
;;

(* =========================================================
   SCENE55_COLLAPSE — Transition + Gallery (FIX APPLIED)
   ========================================================= *)

(* ::SCENE55_COLLAPSE:: *)
let () =
  vfx "screen_fracture_crimson"; sfx "magma_roar_deep";
  say "AURORA" "(fading)" "Trāṭaka complete... perception collapse imminent...";
  t "Light fractures. The world begins to unfreeze—lava resuming its fall, sound clawing back into motion.";
  t "Every connection—love, friendship, promise—burns bright one last time before the dark rushes in.";

  (* ADD GALLERY HERE — AFTER COLLAPSE BEGINS *)
  if romance_flag "David" then (
    unlock_art "gallery_david" "🖼️ David — Vow of the North";
    show_image "love_david";
    caption "💙 David — The Vow of the North";
  ) else if romance_flag "Agnivesh" then (
    unlock_art "gallery_agnivesh" "🖼️ Agnivesh — Twin Flame";
    show_image "love_agnivesh";
    caption "🔥 Agnivesh — Twin Flame";
  ) else if romance_flag "Elena" then (
    unlock_art "gallery_elena" "🖼️ Elena — Diamond of the Heart";
    show_image "love_elena";
    caption "💎 Elena — Diamond of the Heart";
  ) else if romance_flag "Santi" then (
    unlock_art "gallery_santi" "🖼️ Santi — Skin of Renewal";
    show_image "love_santi";
    caption "🐍 Santi — Skin of Renewal";
  );

  t "Light folds inward—each memory captured like glass:
     David's smile breaking through guilt.
     Agnivesh's fire turning gentle.
     Elena's laughter refracting in crystal.
     Santi's eyes shimmering with new calm.";

  t "Each image glows once… then fades into the same golden pulse—
     the frequency of love remembered through stillness.";

  vfx "fade_white_slow";
  pause 1200;

  t "The gallery dissolves.";

  (* Echo line based on romance *)
  if romance_flag "David" then (
    say "DAVID" "(echo, soft)" "I choose you. Every day.";
  ) else if romance_flag "Agnivesh" then (
    say "AGNIVESH" "(echo, soft)" "You make the flames feel holy.";
  ) else if romance_flag "Elena" then (
    say "ELENA" "(echo, soft)" "You saw me when I couldn't see myself.";
  ) else if romance_flag "Santi" then (
    say "SANTI" "(echo, soft)" "You taught me how to be seen.";
  );

  t "Only silence remains.
     Then, a heartbeat.";

  fade_to_black (); pause 1200;
  caption "→ EPISODE 6: AJNA — THE COSMIC TRIAL (Third Eye Awakening)";
;;
