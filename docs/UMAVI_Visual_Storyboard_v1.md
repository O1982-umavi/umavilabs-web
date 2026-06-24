# UMAVI Visual Storyboard & Prompt Bible — v1

> 🔒 **DOCUMENT LOCKED.** As of Addendum v6 / Phase 4, this document is closed to
> new systems, variables, curves, ratios, or conceptual layers. The system has
> moved from product design (architecture + mechanics) to cinematic behavioral
> staging (emotional direction + perception), and that shift is final for this
> artefact. Any further refinement at the spec level has decreasing returns and
> increasing risk of conceptual regression. The only valid next actions are:
> (A) generate the 9 scenes with strict discipline against §4 + §13.1's anchor
> object, (B) validate only self-projection, spatial continuity, and emotional
> gradient — nothing else, and (C) think in scenes, not systems: every decision
> from here on is "what does the user see in 0.8 seconds," not "how does the
> system work." Edits below this line should be production notes tied directly
> to image generation, not new architecture.
>
> **Companion documents (production phase):**
> - `UMAVI_Final_Production_Prompts.md` — the 9 ready-to-use prompts, including the controlled-stylization technical settings
> - `UMAVI_Shot_Continuity_Risk_Map.md` — pre-generation audit of the 3 structural failure points (Hero, Mirror, Reveal); read before generating anything
> - `UMAVI_Checkpoint0_Evaluation_Protocol.md` — objective pass/fail tests for Hero/03A/Reveal once generated; **no prompt may be edited again until this protocol has been run against real images** (03B–D are currently frozen pending this evidence — see note on those prompts)

> Do not build sections. Build a three-act cinematic experience.
> Every image must feel like the next scene of the same movie.
> Optimise for life consistency, not character consistency.
> The product itself should occupy less than 20% of the entire experience.
> Sell the transformation, not the interface.

---

## 0. Production rule — single engine only

All 9 scenes must be generated with **one single image-generation engine and one single session/character-reference setup** (e.g. one Midjourney `--cref`/seed family, or one Leonardo character reference, or one consistent DALL-E style prompt prefix). Do not mix engines. Mixing engines is the #1 cause of "frankenstein landing" — recoverable coherence loss is expensive, prevention is free.

**LIFE-ANCHOR, not PERSON-ANCHOR.** We are not chasing the same face across 9 images — that requires character-reference tooling we may not have reliable access to. We are chasing *the same life*. The brain doesn't need to confirm "same actor," it needs to confirm "same world."

### Constants across every scene (life-anchor checklist)
- ✅ Same kitchen / same apartment
- ✅ Same countertop material and color
- ✅ Same lighting fixture (the literal lamp/pendant light visible in frame)
- ✅ Same progressive lighting direction (light always enters from the same side of the room)
- ✅ Same clothing style/palette (not identical outfit, same wardrobe logic — loungewear tones)
- ✅ Same age bracket (30–40)
- ✅ Same phone (same case color, same model silhouette)
- ✅ Same recurring anchor object, visible somewhere in every scene (e.g. a white mug, the same wooden table edge, a plant in the same spot) — added in §13.1; pick one object now and keep it in every prompt below
- ❌ No reliance on matching faces
- ❌ No close-up frontal portraits — ever

### Framing rule
Default to: 3/4 angle, profile, from-behind, hands-only, over-the-shoulder. Reserve frontal/close framing for **zero** scenes in this set — it's the framing most likely to expose face-matching failures across a multi-image set.

---

## 1. Three-act structure

| Act | Sections | Emotional goal | Sound-design analogy |
|---|---|---|---|
| **Act 1 — "It sees me"** | Hero → Pain → Mirror | Recognition | Silence → light noise → rhythm |
| **Act 2 — "It understands why"** | Predictable → Snapshot → Demo | Credibility | Activity |
| **Act 3 — "I want this"** | Consequence → Reveal → Waitlist | Desire | Calm → peace |

---

## 2. Visual families (mood groups, not section-by-section)

### Family 1 — Mental Load (Hero + Pain)
Blue hour. Cold. High negative space. Tension. Kitchen-dominant (90% kitchen / 10% home).

### Family 2 — Self Recognition (Mirror + Predictable + Snapshot)
The home wakes up. More light. More life. More order. Kitchen fading toward home (70→50% kitchen).

### Family 3 — System Activation (Demo)
Technology appears but does not dominate. The person remains the protagonist. 50/50 kitchen/home — this is the pivot scene.

### Family 4 — Resolution (Consequence + Reveal + Waitlist)
Golden hour. Calm. Resolved life. Wellbeing. Home-dominant (30→20% kitchen, 70→80% home).

---

## 3. Environmental Warmth Curve

| Section | Environment elements present |
|---|---|
| Hero | Empty space, bare counter |
| Pain | Scattered ingredients, open phone tabs |
| Mirror | Life starting to appear — a mug, a jacket on a chair |
| Predictable | Subtler signs of order — folded towel, closed cupboards |
| Snapshot | More textures — herbs, citrus, woven placemat |
| Demo | More plants and personal objects entering frame |
| Consequence | Table being set |
| Reveal | Table fully set, lived-in warmth |
| Waitlist | A home that has clearly been lived in — calm clutter, not mess |

---

## 4. Scene-by-scene spec

### SCENE 01 — Hero
- **Act:** 1 · **EOR:** 95% · **Kitchen/Home:** 65/35 (corrected, see §14.4)
- **Framing:** Full bleed, 3/4 angle from the side, person standing at an open fridge, phone in hand
- **Light:** Blue hour, single cold source (fridge glow), long shadows
- **Anchor objects:** the fridge handle, the phone case, the countertop edge
- **Prompt:**
> Cinematic premium lifestyle photography, modern apartment kitchen at blue hour, person in their early 30s seen from a three-quarter angle standing in front of an open fridge, smartphone in hand, face partially turned away, slight decision fatigue in posture, cool blue-grey color grading, realistic environment, Apple campaign aesthetic, shallow depth of field, cinematic, photorealistic, no direct frontal face

### SCENE 02 — Pain
- **Act:** 1 · **EOR:** 50% · **Kitchen/Home:** 90/10
- **Framing:** Top-down, no person — only counter, hands optional at frame edge
- **Light:** Cool neutral, slightly harsher than Hero
- **Anchor objects:** same countertop material as Scene 01, same phone case visible
- **Prompt:**
> Photorealistic top-down view of a kitchen counter with scattered ingredients, a smartphone showing multiple open recipe tabs at the edge of frame, slight realistic everyday mess, evening atmosphere, cool neutral tones, documentary-style premium photography, no visible face

### SCENE 03A–D — Mirror (4 frames, same scene family)
- **Act:** 1 · **EOR:** 75% · **Kitchen/Home:** 80/20 → 65/35 across the four
- **Framing:** Same camera position across all four (locked composition), person from behind or 3/4, different posture/energy per frame
- **Light:** Progressively warmer from 03A (Monday) to 03D (Sunday)
- **Anchor objects:** same window, same chair, same mug — appears empty Monday, used Wednesday, shared (two mugs) Friday, relaxed placement Sunday

| Frame | Day | Posture | Light |
|---|---|---|---|
| 03A | Monday | Shoulders low, leaning on counter, exhausted | Coldest of the four |
| 03B | Wednesday | Looking into fridge, neutral posture | Slightly warmer |
| 03C | Friday | More upright, energy returning, two mugs visible | Warm artificial light, evening |
| 03D | Sunday | Relaxed, seated, soft natural light | Warmest, daylight |

- **Prompt (shared base, swap posture/light per frame):**
> Photorealistic lifestyle photography, same kitchen as previous scenes, same camera angle from behind/three-quarter, person's posture conveying [INSERT: exhaustion / neutral browsing / rising energy / relaxed ease], lighting progressing from cool to warm across the series, consistent countertop, consistent window, no direct frontal face, documentary-editorial style

### SCENE 04 — Predictable
- **Act:** 2 · **EOR:** 65% · **Kitchen/Home:** 70/30
- **Framing:** From behind, seated, almost no action, kitchen visibly tidier than Scenes 01–03
- **Light:** Warm ambient, soft
- **Special:** Subtle floating memory-label motif near the person (very light opacity, integrates with the Memory Orb signature — see section 6)
- **Prompt:**
> Photorealistic premium kitchen scene shot from behind, same person seated calmly at the counter, warm ambient natural light, kitchen visibly more orderly than earlier scenes, subtle soft glowing particles faintly visible near the person suggesting quiet thought, elegant editorial photography, no visible face

### SCENE 05 — Snapshot
- **Act:** 2 · **EOR:** 55% · **Kitchen/Home:** 60/40
- **Framing:** Macro, no person
- **Light:** Warm natural, soft directional
- **Anchor objects:** same olive oil bottle style/color across this and Scene 07 (Consequence) if possible
- **Prompt:**
> Premium editorial macro food photography, Mediterranean ingredients — tomatoes, basil, lemon, olive oil — elegant minimal composition, warm natural light, Apple lifestyle aesthetic, shallow depth of field, no text, no hands

### SCENE 06 — Demo
- **Act:** 2 · **EOR:** 35% · **Kitchen/Home:** 50/50
- **Framing:** 3/4, person cooking, phone resting on counter (not held, not looked at)
- **Light:** Warm ambient, technology invisible
- **Note:** this is the pivot scene — the only one allowed to share visual space with the UI sphere graphic. Person must read as more present than the technology.
- **Prompt:**
> Premium lifestyle photography, same person cooking calmly in the same kitchen, smartphone resting face-down on the countertop — not being looked at, natural authentic relaxed expression seen from a three-quarter angle, warm ambient lighting, no visible screen, no direct frontal face

### SCENE 07 — Consequence (new section)
- **Act:** 3 · **EOR:** 85% · **Kitchen/Home:** 40/60
- **Framing:** 3 plates, same ingredients, different final dishes — no people, food-forward
- **Light:** Warm, golden, appetizing but realistic — explicitly NOT restaurant-styled, NOT Instagram-styled
- **Anchor objects:** same plate set / same table linen across this and Scene 08 (Reveal)
- **Prompt:**
> Premium home-cooking editorial photography, three realistic achievable dinners made from the same set of Mediterranean ingredients, warm natural light, appetizing but attainable home-cook presentation, no restaurant styling, no people, consistent tableware

### SCENE 08 — Reveal
- **Act:** 3 · **EOR:** 100% · **Kitchen/Home:** 35/65 (corrected, see §14.4)
- **Framing:** Wide, near full-bleed, same kitchen as Scene 01 transformed — table set, person present but secondary to the scene's warmth
- **Light:** Golden hour, bright, warm, calm
- **Special:** this is where the 3D phone enters the frame physically — see section 7 below
- **Prompt:**
> Photorealistic premium lifestyle scene, same kitchen as the opening scene now bright and warm during golden hour, dinner already set on the table, person present in soft focus background, relaxed atmosphere, Apple and Airbnb campaign aesthetic, aspirational but realistic, wide shot, no direct frontal face

### SCENE 09 — Waitlist
- **Act:** 3 · **EOR:** 40% · **Kitchen/Home:** 20/80
- **Framing:** Dining table set for two, no people, calm clutter (a folded napkin slightly askew, a candle half-melted) signalling a home that has been lived in — not a showroom
- **Light:** Warm, soft, even
- **Prompt:**
> Minimalist editorial dining table set for two, warm soft lighting, empty chairs, gently lived-in details — a slightly askew napkin, a half-burned candle — calm Scandinavian-inspired aesthetic, no people, no text

---

## 5. Emotional Occupancy Ratio (EOR) — full table

EOR replaces simple "% of screen filled by image." It measures how much emotional weight a scene is allowed to carry, and constrains layout density to match (a high-EOR section should have very little competing UI).

| Section | EOR | Kitchen/Home | Act |
|---|---|---|---|
| Hero | 95% | 65/35 (corrected) | 1 |
| Pain | 50% | 90/10 | 1 |
| Mirror | 75% | 80→65/20→35 | 1 |
| Predictable | 65% | 70/30 | 2 |
| Snapshot | 55% | 60/40 | 2 |
| Demo | 35% | 50/50 | 2 |
| Consequence | 85% | 40/60 | 3 |
| Reveal | 100% | 35/65 (corrected) | 3 |
| Waitlist | 40% | 20/80 | 3 |

**Layout rule derived from EOR:** sections above 70% EOR get a single dominant image and minimal competing text/UI. Sections below 50% EOR can carry more interface weight (this is exactly where Demo's sphere graphic earns its place — it has room precisely because its EOR is low).

---

## 6. The Memory Orb — persistent signature element

A small translucent sphere, not the logo, that appears throughout the entire scroll and changes state. The user should not consciously register it — it's a subconscious through-line, not a UI feature to be noticed.

| Section | Orb state | Visual description |
|---|---|---|
| Hero | Near-invisible | Barely-there outline, ~8% opacity, cold tint |
| Pain | Faint | ~15% opacity, still cold |
| Mirror | Beginning to fill | ~30–45% opacity across the 4 frames, warming tint |
| Predictable | Visibly filling | ~55% opacity, warm-neutral, slow pulse begins |
| Snapshot | Filling further | ~65% opacity, warm |
| Demo | Most active | ~90% opacity, brand colors (lime/violet), fastest pulse — this is its energy peak |
| Consequence | Settling | ~80% opacity, warm gold, pulse slowing |
| Reveal | Stable, full | 100% opacity, steady warm glow, no pulse — calm completion |
| Waitlist | Complete, quiet | 100% opacity, almost still, barely breathing |

This reuses the existing `--cognitive-load` / `--meaning-density` engine already wired into the page — the orb's opacity and pulse speed should be driven by those same variables rather than a separate system, so the three mechanisms stay synchronized by construction.

---

## 7. Product-in-frame rule

**The literal product (UI, app screens, phone) must occupy less than 20% of the total page experience.** Concretely:

- Demo section: sphere + minimal chips only, no app screenshots
- Reveal section: the 3D phone must emerge physically from within Scene 08's photograph — positioned on the same table surface visible in the photo, same light azimuth, real contact shadow. Never floating free over empty background.
- No other section shows the product.

This is already partially implemented (Reveal's floating phone) and just needs the future Scene 08 photograph behind it to complete the "emerging from the scene" effect described in the previous spec.

---

## 8. What NOT to do (explicit anti-patterns)

- ❌ Do not generate scenes with different engines/sessions and try to reconcile them later
- ❌ Do not use frontal close-up portraits anywhere in the set
- ❌ Do not let the Demo's sphere visually outweigh the Reveal photograph (already mitigated by Meaning Density — keep respecting it when these images land)
- ❌ Do not show the product UI in more than the Demo + Reveal sections
- ❌ Do not let "kitchen" stay dominant past the Demo midpoint — the home must visibly take over from Consequence onward

## 9. Addendum v2 — Desire Curve, Living Memory Card, No Frames

> The landing should not impress. It should create desire.
> If the system is noticed, it fails. If the system disappears, it wins.

### 9.1 Desire Curve — the primary KPI

Cognitive Load, Meaning Density, and EOR describe *how the system behaves*. Desire describes *whether it's working*. It is tracked as a fourth variable (`--desire`) and, critically, it must climb and then **hold** — it is not allowed to drop at Waitlist the way most landing pages kill the emotion right when the form appears.

| Section | Desire |
|---|---|
| Hero | 0.3 |
| Pain | 0.4 |
| Mirror | 0.7 |
| Predictable | 0.8 |
| Snapshot | 0.85 |
| Demo | 0.75 |
| Consequence | 0.95 |
| Reveal | 1.0 |
| Proof | 0.95 |
| Waitlist | 0.95 — never lower |

### 9.2 Memory Orb → replaced entirely by Living Memory Card

The Orb is removed. No dual system — a decorative abstraction adds nothing a sentence doesn't already deliver, and running both at once is redundant storytelling the brain doesn't need. The Living Memory Card is now the **only** persistent signature element: one state line, one insight line, nothing else.

| Section | State | Insight |
|---|---|---|
| Hero | Learning… | End of day = low energy |
| Pain | Recognising… | Recipe tabs left open, again |
| Mirror | Memory added | Mediterranean flavours |
| Predictable | Pattern detected | More adventurous on weekends |
| Snapshot | Profile forming | Five traits already visible |
| Demo | Confidence: 82% | Your profile is emerging |
| Consequence | Result visible | Same ingredients, real dinners |
| Reveal | Profile stabilised | This feels like you |
| Waitlist | Memory complete | Ready when you are |

### 9.3 Early food — Snapshot gets the first food appearance

Food is no longer held back entirely for Consequence (Scene 07). Snapshot (Scene 05) now carries three small reward glimpses alongside the macro-ingredients backdrop — a salad, a soup, a tray from the oven — deliberately small and secondary, never protagonist-scale. The brain pairs "understood" with "something good is coming" well before the payoff section.

### 9.4 NO MORE FRAMES — full-bleed mandatory

Every cinematic slot (and, later, every real photograph) must bleed into the background. No visible border, no card-look, no boxed container separating "content" from "image." The gradient mood overlay is the only structure. This is "interactive film with minimal UI," not "UI with images attached."

### 9.5 Explicitly rejected for this pass (logged, not forgotten)

- **Breathing-room section** between Demo and Consequence (full-screen pause, three stacked lines). Correct instinct, wrong timing — the base system isn't stable enough yet to add new narrative surface without diluting it.
- **"Could this be you?"** self-selection cards (Weeknight survivor / Mediterranean comfort cook / Weekend explorer). Same reasoning — expanding surface now risks weakening the Reveal, which is the one section that must never lose force.

Both remain valid ideas for a later pass, once the base system has been stress-tested and, per the "kill everything that doesn't increase desire per second" directive, anything not pulling its weight has been removed first.

## 10. Addendum v3 — perceptual compression: smoothing, atmosphere, and the 3-systems rule

> If the system can be explained, it's too complex. If it can only be felt, it's correct.

### 10.1 Rule — max 3 active cognitive systems

The only first-order, named, logged systems are:

1. **Cognitive Load** (`--cognitive-load`)
2. **Meaning Density** (`--meaning-density`)
3. **Desire** (`--desire`)

Everything else is a derived correction applied to one of these three — never a fourth named system, never exposed in the mental model, never something a person could point to and say "that's a feature."

### 10.2 Scroll-velocity smoothing — a correction, not a signal

Desire is no longer a flat per-section constant snapped on viewport entry. It is now:

```
desire(t) = base_desire(section) × smooth(scroll_speed)
```

Fast scrolling damps how quickly the displayed `--desire` approaches its section target (reads as confusion/saturation); slow or settled scrolling lets it land fully (reads as deeper engagement). This is implemented as an internal `requestAnimationFrame` approach-rate modifier in `script.js` — it has no CSS variable of its own, is never logged as a separate state, and the user should never be able to articulate that it exists. It only ever touches Desire, never Cognitive Load or Meaning Density.

### 10.3 Atmospheric Luminance Gradient Field — not a horizon line

The "light horizon line" idea is implemented in its most radical form: **no object, no line, no detectable boundary.** Instead, the page's base `body` background is now a continuous vertical luminance field — colder/more abstract at the top, warmer/more material toward the bottom — riding the existing `--meaning-density` signal rather than introducing a new one. This gives spatial anchoring (top = perception, bottom = ground) without adding UI, structure, or anything the eye can fix on. If a person can locate the "line," the implementation has failed; what should be perceptible is only that the page feels grounded, never where the grounding happens.

### 10.4 Reflection moment — logged, not yet placed

The idea of an explicit line near Mirror/Snapshot ("This pattern is consistent across your behaviour") that turns the system from observer to reflector is sound and cheap, but is deliberately not inserted yet in this pass — we are mid-compression, not mid-expansion. Candidate for the next content-only pass (copy change, no new mechanics).

### 10.5 Framing note — perception-first, not narrative-first

The three-act structure (§1) remains the organisational scaffold for production and reasoning, but the experiential goal is reframed: the page is not "sections" or "acts" the user consciously moves through — it is a **progressive self-model construction** the user feels happening to them. The acts are how we build it; they are not what the user should notice.

## 11. Addendum v4 — stability gate, and the line between runtime and image-generation rules

> The risk is no longer too much functional complexity. It is perceptual over-coherence — when everything is smooth and coherent, the system can lose all points of cognitive surprise.

### 11.1 Stability gate — implemented

The scroll-velocity smoothing (§10.2) is now gated by a ~200ms stability window. Erratic stop-start-stop scrolling otherwise risks hypersensitizing the smoothing into micro-oscillations of `--desire` — "false emotional positives." Until scroll direction has held steady for that window, the approach rate toward `desireTarget` is damped proportionally. This is pure noise removal: it does not change the mental model, does not introduce a fourth system, and is invisible by design. The only perceptible effect should be that the page never feels jittery when scroll behaviour is messy.

### 11.2 New rule — "No visual constraint without visual truth"

If a proposed constraint:
- depends on photography that doesn't exist yet,
- cannot be validated against the current placeholders, or
- has no direct correspondence in the current code,

…it does **not** enter the runtime system. It is logged in this document as an image-generation constraint instead, to be honoured once real photography exists, not simulated with CSS in the meantime. Simulating it now risks false visual comfort — gradients that won't actually align with the real images later, i.e. "CSS lying about photography."

### 11.3 Lateral softness field — image-generation constraint, not CSS

Rejected for runtime implementation under §11.2. The effect (center-weighted focus, soft periphery, to guide attention without UI) depends entirely on future subject placement, framing, and lighting direction in the actual photography. It is recorded here as a **constraint for image generation and composition**, not as a CSS rule:

> Every Scene (01–09) should be composed with a soft center-weighted attention zone — subject and key detail placed where natural eye-flow lands, periphery allowed to fall off in focus/detail — so that once real photography replaces the cinematic slots, attention guidance comes from the image itself, never from an overlay pretending to be one.

### 11.4 Micro-rupture note — for the image-generation pass

A real risk at this stage is *perceptual over-coherence*: a system this smooth can read as too polished, too predictable, too "advertorial." When the 9 scenes are actually generated, 1–2 deliberate micro-ruptures should be planned in — a slightly unexpected angle, an intentionally soft/off-focus object, one scene that reads more "human" than composed. This is a production note for the image-generation phase, not a runtime mechanic.

### 11.5 Current system state

- **Mechanics:** complete, minimal, coherent (Cognitive Load, Meaning Density, Desire — 3 systems, no more)
- **Perception layer:** stabilized (stability gate removes scroll-driven noise)
- **Visual system:** ready for the cinematic rendering phase

Next phase is image generation — not "generate images," but generate **scenes that belong to the same memory**, with camera language (not just mood) defined per scene before final prompts are locked.

## 12. Addendum v5 — self-projection, and 6 frozen rules

> Is this making the user desire UMAVI more, or just making the landing more sophisticated? If the second, reject it.

### 12.1 Predictable copy — merged, with a hierarchy

Resolved the contradiction between the emotionally-stronger new copy and the rationally-correct existing copy by sequencing both, ending on a revised close:

> You've been cooking the same way for years.
>
> You don't decide randomly. You follow patterns.
>
> **UMAVI simply made them visible.**

Note the precise wording of the close: not "UMAVI did" (implies UMAVI discovered something mysterious) but "UMAVI simply made them visible" (UMAVI reveals an identity that already existed). This is the same distinction as Rule 1 below, and it's why the wording matters more than it looks like it should.

### 12.2 Snapshot — intermediate trait→food pairing

Did not revert the earlier "food stays small/secondary" decision, and did not adopt the full 5-pair trait→food structure either. Landed on 3 trait→food micro-pairs (Mediterranean comfort → lemon roasted vegetables, Low mental effort → one tray salmon, Weekday efficiency → 15 min chicken bowl), with the trait text dominant and the food visual ~30% smaller — causally connected now, but still not protagonist-scale.

### 12.3 Demo — exempt from the product-visibility rule, with a correction

The Demo sphere is the engine room, not product decoration — it is exempt from the 90/10 rule below. But it was correctly flagged as feeling too "AI-only": a visualization that never produces a visible consequence. Fixed by adding an outcomes strip beneath the sphere (Monday → quick meals, Wednesday → leftovers, Friday → social dinners) at roughly equal visual weight to the sphere itself. The rule going forward: **the machine never lives alone** — every time it's shown "thinking," something visible must come out the other end in the same view.

### 12.4 Rule update — 90/10, not 70/20/10, with Demo exempted

The proposed 70/20/10 split (life/food/product) is folded into the existing ≤20% product-visibility rule (§7) rather than replacing it, because splitting "life" and "food" into separate enforced ratios would be a new system, not a correction — and we are past the point of adding systems. The operative rule is:

> **90% life, 10% product — and the Demo is exempt**, because the Demo is the engine room, not an advertisement for the app.

### 12.5 Six frozen rules

These are now locked. Any future proposal must justify itself against them, not the other way around.

1. **UMAVI doesn't learn. UMAVI reveals.** Nothing in copy or visuals should imply UMAVI discovers something mysterious — it surfaces an identity that already existed.
2. **The same life evolves. We never change worlds.** Every scene is a later frame of the same continuity (Visual Storyboard v1 §0, §3) — never a new environment.
3. **Food is a reward. Never the protagonist.** True at Snapshot (§12.2), true at Consequence, true everywhere food appears.
4. **The product is invisible. Except the Demo.** 90/10 life-to-product split, Demo exempted as the engine room (§12.3–12.4).
5. **Every section must increase personal projection. Not complexity.** This is the standard new proposals are now measured against.
6. **No more architecture.** A new idea is only adopted if the honest answer to "does this make the user desire UMAVI more, or just make the landing more sophisticated" is the first one. Otherwise it's rejected, full stop — no exceptions reasoned around it.

## 13. Addendum v6 — freeze architecture, enter cinematic rendering phase

> Freeze architecture. Stop adding systems. Enter cinematic rendering phase.

This is the directive going forward. No new mechanics, no new variables, no new sections. What follows refines the image-generation plan only — nothing here touches runtime code.

### 13.1 Anchor object — added to the life-anchor checklist

§0's life-anchor checklist (same kitchen, same countertop, same lighting fixture, same wardrobe logic, same phone) gains one more constant: **a single recurring anchor object**, present in every scene from Hero through Reveal — e.g. a white mug, the same wooden table edge, a plant in the same spot. The person should never consciously register it. The brain does. This is the cheapest, highest-leverage addition to continuity available, and it's added directly here rather than re-opened as a decision: it strengthens §0 without contradicting it.

### 13.2 Reveal = the Hero scene, transformed — confirmed, not new

Already implied by §0 and Scene 08's spec ("same kitchen as the opening scene"), now stated explicitly as a hard constraint: Reveal must be recognizably the *same camera position and scene* as Hero — same kitchen, same table, same anchor object — not a different, nicer world. The brain's read must be "they're improving my life," not "they're selling me a different one."

### 13.3 Image Occupancy Ratio — a rendering-phase translation of EOR, not a parallel system

A literal "% of screen filled by photography" table is useful during actual image layout, but it is **not** a new metric alongside Emotional Occupancy Ratio (§5) — it's how EOR gets executed once real photography exists. Where the two appear to disagree (e.g. Waitlist), EOR remains the system of record:

| Section | EOR (system of record, §5) | Literal image fill (rendering guidance) |
|---|---|---|
| Hero | 95% | Full-bleed, ~100% |
| Pain | 50% | ~50–60% |
| Mirror | 75% | ~70% |
| Predictable | 65% | ~50–55% |
| Snapshot | 55% | ~40–50% (trait→food pairs stay small per Rule 3) |
| Demo | 35% | ~20–25% (sphere/outcomes are the content here, not photography) |
| Consequence | 85% | ~70% |
| Reveal | 100% | Full-bleed, ~100% |
| Waitlist | 40% | Low but not zero — a subtle scene, not bare white space; EOR ≠ 0 means the moment still needs to read as resolved-and-lived-in, not administrative |

### 13.4 Final production prompt — adopted as-is

> Freeze architecture. Stop adding systems. Enter cinematic rendering phase.
> Objective: transform the landing from an explanatory product page into a progressive self-recognition experience.
> Prioritise:
> 1. Replace all framed image placeholders with immersive editorial photography.
> 2. Build a single life-anchor continuity (same kitchen, same table, same object, evolving light).
> 3. Increase self-projection section after section.
> 4. Make food appear earlier as emotional payoff.
> 5. Ensure the final Reveal is a transformed version of the Hero, not a different world.
> 6. Every image must answer one question: "Could this be my life?"

This supersedes any further A/B/C-style mechanical iteration for the time being. The next real work is image generation against the prompts already locked in §4, with the anchor-object addition (§13.1) folded in.

## 14. Phase 4 — Emotional Production (no new systems past this point)

Architecture is frozen. This section adds creative direction only — no variables, no curves, no mechanisms. If a future idea would add any of those, it does not belong here; it gets rejected per Rule 6.

### 14.1 One emotion, one thought — per section

| Section | Emotion (one only) | User's internal thought |
|---|---|---|
| Hero | Exhaustion | "This happens to me every day." |
| Pain | Recognition | "I really do this every time." |
| Mirror | Identification | "This is me." |
| Predictable | Surprise | "I never put that into words." |
| Snapshot | Attraction | "I would actually eat that." |
| Demo | Trust | "Oh, I get how this works." |
| Consequence | Desire | "I'd like to live like this." |
| Reveal | Relief | "This isn't another life. It's mine, improved." |
| Waitlist | Anticipation | "I want this." |

If a section is pulling toward two emotions during rendering, simplify the image/copy until it isn't.

### 14.2 Cinematic DNA — one camera language for all nine scenes

Not nine images — one film. Every scene shares:
- 35mm lens, shallow depth of field
- Editorial lifestyle realism, premium but imperfect
- No Instagram aesthetic, no Pinterest aesthetic, no influencer aesthetic
- Mental references: Apple, Airbnb, Aesop, Kinfolk — filtered through one deliberate human imperfection per scene (nothing should look fully retouched)

### 14.3 Visual identity — Editorial Memory Design

UMAVI borrows from Apple/Airbnb/Aesop/Kinfolk but isn't any of them. Its own language: **Editorial Memory Design** — not an app, not "AI," not an assistant. A system that captures invisible culinary memory. Two recurring visual resources (not systems, not new mechanics — art-direction choices applied during rendering):
- **Light particles** — very subtle, read as suspended dust/memory, never as "technology."
- **Memory threads** — near-invisible (~5% opacity) connecting lines that occasionally appear between a cause and its consequence (Monday → Leftovers, Mediterranean comfort → Roasted vegetables, Friday → Social dinners). Used sparingly, by hand, scene by scene during rendering — not implemented as a generative system.

### 14.4 Kitchen-to-Home ratio — number correction, same curve

This is the existing Kitchen/Home curve (§2, §4 scene table), restated with corrected anchor numbers at the two ends: Hero opens closer to balanced (kitchen still dominant but home already present) and Reveal closes further into "home" than kitchen. Updated end-points: **Hero 65/35 kitchen/home → Reveal 35/65 kitchen/home.** The mid-scene values in §4 already trend the same direction; only the two endpoints are corrected here, no new table. The point stays the same as it's always been: UMAVI sells less mental load at home, not recipes — the home should heal, not just the lighting.

### 14.5 Adopted production directive

> Architecture is frozen. Do not create new systems, variables, curves, sections, cards or mechanisms.
> Your job is no longer product design. Your job is cinematic emotional direction.
> For every section, optimise only: (1) emotional target — one emotion only, (2) user's internal thought, (3) visual continuity, (4) self-projection, (5) desire amplification.
> Build one coherent movie, not nine independent images. Same home, same kitchen, same anchor object. The home progressively heals as the user advances. Reduce product visibility as desire increases. Reveal must be the transformed version of Hero. Every image must answer: "Could this be my life?" Do not explain UMAVI — make users feel recognised by UMAVI.
> Visual identity: Editorial Memory Design. No more architecture. Only execution.

## 15. Addendum v7 — 3 cinematic anchors + 6 atmospheric canvases

> 3 hero moments. 6 atmospheric supports.

The original plan called for 9 fully cinematic scenes. In production, this was revised: chasing 9 high-quality cinematic photographs is more production load than the system needs, and the intermediate sections were never meant to carry the same emotional weight as Hero/03A/Reveal in the first place — treating them identically created a real problem (a visible energy drop: rich Hero → flat black-and-text sections → rich Reveal, which the brain reads immediately as "the visual narrative disappeared").

### 15.1 Revised architecture

```
HERO        → cinematic anchor
Pain        → atmospheric asset
Mirror/03A  → cinematic anchor
Predictable → atmospheric asset
Snapshot    → atmospheric asset
Demo        → atmospheric asset
Consequence → atmospheric asset
REVEAL      → cinematic anchor
Waitlist    → atmospheric asset
```

Only 3 scenes (Hero, 03A, Reveal) are full cinematic photographs — these remain governed by everything in §0–§14 above (life-anchor continuity, camera/light invariants, Cinematic DNA). The other 6 sections get a lighter, reusable treatment: **atmospheric assets**, deliberately not called "images" or "scenes" — different vocabulary, different ambition, and a guard against sliding back into the heavy 9-scene production machinery this section exists to move away from.

### 15.2 Atmospheric Canvas structure (implemented)

Every atmospheric section shares one 3-layer shape:

```
Atmospheric Layer
  ├── background ambient   (.atmo-canvas-bg)
  ├── microvisual slot     (.atmo-canvas-slot) — future asset goes here
  └── text layer           (existing section copy, untouched)
```

The microvisual slot is filled today with a subtle CSS-only texture, not a placeholder gradient standing in for a missing photo — these are the real, lightweight final treatment for most production scenarios, not a temporary stand-in like the old cinematic-slot system was. When a real atmospheric asset is ready, it drops into `.atmo-canvas-slot` as an `<img>` with no landing rewrite required (the slot is pre-built in the DOM with a `data-future-asset` reference for exactly this purpose).

### 15.3 Three reusable families (not six unique treatments)

| Family | Sections | Visual idea |
|---|---|---|
| A — Ingredients | Pain, Snapshot | Floating organic fragments, soft shadows, very low opacity. Suggests scattered ingredients without depicting any literal object. |
| B — Repetition | Predictable | A repeating, iterative pattern at decreasing opacity — suggests "always the same" without showing literal plates. |
| C — Connection | Demo, Consequence, Waitlist | Faint nodes and threads suggesting relationships forming, without any literal UI graphic. |

Three families, not six bespoke treatments — this keeps the system small and reusable rather than reopening the "9 unique cinematic scenes" problem in a smaller, atmospheric-asset-shaped way.

### 15.4 Closed decision — REVEAL has zero product representation

The floating phone previously composited into Reveal has been removed entirely — HTML, CSS, animation, and responsive rules, not just hidden. A dormant phone left in the codebase is technical debt and a standing temptation to reintroduce it "since it's already there," which would reopen a debate this system has already resolved. **REVEAL shows only the life the product unlocks, never the product itself.** This is now a closed architectural decision (§12.4's 90/10 rule, with the Demo's prior exemption — the only place product visibility was ever allowed — now narrowed further: Reveal is explicitly zero).

### 15.5 REVEAL text placement — never covers the human subject

Reveal's floating typography is positioned right-of-frame specifically because the person in Scene 08's photograph sits left-of-frame. The rule, stated generally for any future Reveal photography: **text placement follows the subject's position in the frame, and must never overlap the human figure.** The feeling of the scene is the point, not the words describing it — covering the person with text would undercut the exact thing Reveal exists to deliver.

## 16. Addendum v8 — Visual Hierarchy Rule (closing the multi-layer risk)

> UMAVI is a cinematic emotional system with minimal functional disclosure.

This is now the one governing sentence for the visual system. It resolves three things at once: it keeps Reveal pure (no functional UI), it keeps the 6 atmospheric canvases subtle (support, not competition), and it blocks any future reintroduction of disguised product UI anywhere in the experience.

### 16.1 The risk this addresses

By Addendum v7, three visual systems had accumulated in the codebase without an explicit rule for how they relate:

- **A — Cinematic Anchors (3):** Hero, 03A, Reveal — full photographs, governed by §0–§14.
- **B — Atmospheric Canvas System (6):** Pain, Predictable, Snapshot, Demo, Consequence, Waitlist — CSS-only ambient texture, governed by §15.
- **C — the original `scene-slot` system:** still partially present inside several of the same 6 sections (Pain's lateral image slot, Predictable's lateral slot, Snapshot's trait→food micro-pairs, Demo's background slot, Consequence's 3 plate slots, Waitlist's background slot) — left over from before the system split into A and B, and never explicitly subordinated to either.

Auditing the actual code at this addendum confirmed the risk was real, not theoretical: the `cinematic-slot` class was being applied to all 9 section tags with **zero matching CSS rule** — dead vocabulary from the pre-split single-scene-per-section model, removed as part of this addendum. Separately, System B and System C do coexist inside the same 6 sections (e.g. Pain has both an `.atmo-canvas` background and a `.scene-slot-pain` lateral image slot) — not a visual conflict today, but exactly the kind of unranked layering that fragments a system over time if left undocumented.

### 16.2 Visual Hierarchy Rule (binding from this point forward)

```
1. Cinematic Anchors override everything.
2. Atmospheric Canvases support anchors, never compete.
3. The legacy scene-slot system is a deprecated rendering mode —
   tolerated only where it already carries real content (Pain/Predictable's
   lateral slots, Snapshot's trait→food pairs, Consequence's 3 plates,
   Demo/Waitlist's background slots), never extended to new sections,
   and to be migrated into the Atmospheric Canvas system (System B) as
   each of those sections gets its real microvisual asset.
```

Practically: when a section needs a new visual element going forward, it is built as an Atmospheric Canvas asset (System B), never as a new `scene-slot` (System C). System C is not being ripped out today — it holds real, already-decided content — but it does not get new members, and existing instances migrate to System B opportunistically rather than being treated as a parallel permanent system.

### 16.3 Open item — a single proof moment before Reveal

Removing the phone from Reveal was correct, but it leaves the funnel reading as emotion → emotion → emotion with no factual anchor anywhere in Act 3. The proposed fix — a single micro "functional truth signal" at Demo or Snapshot (a gesture, an action, a visible system decision — not UI, not a phone) — is logged here as an open item, not implemented. It is content/copy-level work for the next pass, not a new system, and does not conflict with the Visual Hierarchy Rule above as long as it's expressed as a moment within an existing Cinematic Anchor or Atmospheric Canvas rather than a new visual layer.

### 16.4 Open item — attention path across time

A related open item, also not yet implemented: defining the literal attention path a viewer's eye and mind follow — first 5 seconds, first 30 seconds, emotional resolution — rather than only controlling which visual elements exist. The Cognitive Load / Meaning Density / Desire engine already governs *what* changes section to section; this would govern *how fast a person is expected to absorb it*. Logged for a future pass once the Visual Hierarchy Rule above has had a chance to settle.
