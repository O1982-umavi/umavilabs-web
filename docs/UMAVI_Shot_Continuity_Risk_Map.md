# UMAVI — Shot Continuity Risk Map (Pre-Generation Audit)

> System decision locked in: **state continuity > frame realism.** Generation
> mode is controlled cinematic stylization, not pure photorealism — see
> §0 below for the technical settings this implies. This document audits
> the 9 production prompts against that decision before any image is made.

---

## 0. Generation mode — technical translation of "controlled stylization"

The decision to optimize for state continuity over frame realism translates into concrete generation settings, not just a mood:

- **Stylization strength:** mid-high, not low. (Midjourney: `--stylize 250–400` rather than the realism-chasing 50–150 range; for SDXL/Leonardo equivalents, favor a style/character LoRA or consistent reference image over raw photoreal checkpoints with high CFG variance.)
- **Same seed family / character reference locked once,** reused across all 9 scenes — not re-rolled per scene. Re-rolling the seed per scene reintroduces the exact frame-realism-over-continuity failure mode this decision rejects.
- **Camera + light grammar fixed before scene generation** (see §2) — lens, framing logic, and light source direction are parameters of the *world*, not of each individual prompt, and should not vary scene to scene beyond what each prompt explicitly calls for (time-of-day warmth progression).
- **Acceptable trade-off, stated plainly:** some scenes may look slightly less "wow" in isolation than a no-constraints photoreal generation would. That is the correct trade — an individually striking image that breaks world continuity is a failure under this system, even if it's the better photograph.

---

## 1. The 3 structural failure points

Everything else in the 9-scene set is a derivation. If these three don't hold, no amount of polish on Snapshot/Demo/Consequence will save the system — the world itself won't have been established as real.

### FP1 — Hero: does the world exist?
**Risk type:** world establishment failure.
If Hero doesn't read as a specific, real, physically coherent kitchen (not a generic "kitchen photo"), there is no world for the other 8 scenes to return to. This is the highest-stakes single image in the set.

| Risk vector | Likelihood | Mitigation already in prompt | Residual risk |
|---|---|---|---|
| Generic/stock-photo kitchen (no specific identity) | Medium | "modern apartment kitchen," anchor object specified | Anchor object placement must be specific enough to be re-findable in later scenes — vague placement ("on the counter") is a drift risk in itself |
| Face becomes focal point despite 3/4 angle instruction | Medium | "face partially turned away," "no direct frontal face" | Re-roll if the generation centers the face — this is a hard reject criterion, not a minor note |
| Blue-hour lighting reads as "horror/cold" rather than "tired/relatable" | Low-medium | "cool blue-grey grading," Apple campaign aesthetic anchor | Watch saturation — too desaturated drifts toward bleak rather than relatable-tired |

**Verdict:** generate 4–6 variants of Hero before locking. This is the one scene worth over-generating, because every other scene's "same kitchen" claim depends on this one being unambiguous.

### FP2 — Mirror (03A–D): does the world survive temporal variation?
**Risk type:** drift accumulation across a 4-image sequence — the most mechanically dangerous point in the whole set, because small per-frame inconsistencies compound.

| Risk vector | Likelihood | Mitigation already in prompt | Residual risk |
|---|---|---|---|
| Window position/size shifts between 03A and 03D | **High** — this is the single biggest risk in the entire 9-scene set | "consistent window," "same camera position" stated in every frame | Prompts alone do not guarantee this with most engines. **Action required:** generate 03A first, then use image-to-image / character-reference / inpainting continuation from 03A for 03B–D rather than 4 independent text-to-image calls |
| Anchor object changes shape/color across frames (only state — empty/used/shared/relaxed — should change, not the object itself) | Medium | Object identity specified, only its *state* varies per frame | Verify explicitly on review — this is exactly the kind of error that's invisible in isolation and obvious in sequence |
| Lighting progression (cold→warm) overshoots into looking like 4 different rooms rather than 1 room at 4 times | Medium | Explicit "progressively warmer," "warmest lighting of the series" anchors | Generate all 4 side-by-side before accepting any — warmth progression must be checked as a set, not scene-by-scene |
| Person's body type/proportions drift (even with no-face-match policy) | Low | Same wardrobe logic, same age bracket constants | Low risk since face-matching was already deprioritized; body-language consistency (posture per frame) is more load-bearing here than identity |

**Verdict:** this is the sequence most likely to reveal whether the chosen engine can actually hold continuity. **Treat Mirror as the technical proof-of-concept for the whole project** — if 03A–D don't hold together, neither will Hero→Reveal across the full 8-scene arc, and the engine/workflow needs to change before scaling further.

### FP3 — Reveal: can the world evolve without collapsing identity?
**Risk type:** transformation-vs-replacement ambiguity. This is the philosophically central image (Hero, transformed — not a different, nicer world) and the easiest one to accidentally get wrong in a way that *looks* fine until compared directly to Scene 01.

| Risk vector | Likelihood | Mitigation already in prompt | Residual risk |
|---|---|---|---|
| Generated as a beautiful golden-hour kitchen that is *not recognizably* Scene 01's kitchen | **High** — golden-hour/bright generations tend to drift toward generic "aspirational kitchen" tropes | "same kitchen and same camera position as Scene 01... must read as the same room transformed, not a different one" | This instruction is doing the most load-bearing work of any single line in the prompt set. **Action required:** generate Reveal using Scene 01 as a direct image reference (img2img / same seed lineage), not from text prompt alone |
| Anchor object missing or relocated | Medium | "visible in the same physical spot as in Scene 01" | Check this first on review — if the anchor object moved, the "same world" claim is visually disproven even if everything else works |
| Person becomes the focal point (undermining "transformed space" over "different person") | Low-medium | "person present in soft focus background" | Background placement must actually render as background, not just be labeled as such in the prompt — verify on generation |
| Phone-compositing step (added after generation) breaks the light-direction match | Medium | Noted in prompt ("matching this scene's light direction") | This step happens outside the image generator — flag it as a manual compositing QA step, not something the prompt alone solves |

**Verdict:** generate Reveal only after Hero is locked, using Hero as direct visual reference. Do not generate Reveal from the text prompt in isolation and hope it matches — that is the single most likely point of silent failure in the set, because a "wrong" Reveal can still look like a great photo.

---

## 2. Camera + light grammar — fixed once, applied everywhere

To reduce FP1–FP3 risk, lock these as world parameters before generating anything, rather than letting each prompt re-imply them slightly differently:

- **Lens/framing:** 35mm equivalent, shallow depth of field, throughout.
- **Light source direction:** pick one side of the room (e.g. light enters from screen-left) and keep it physically consistent in Hero, all 4 Mirror frames, and Reveal — only its *warmth and intensity* should progress, never its *direction*. This was implied but not made a hard, separately-checked rule until now.
- **Camera height/position:** Hero and Reveal must share not just "the same kitchen" but the same camera position within it. Mirror's 4 frames share their own locked position (can differ from Hero/Reveal's, since Mirror is a different vantage on the same world).

## 3. Recommended generation order (operational pipeline)

### Checkpoint 0 — 3 images only, before anything else is committed

Generate exactly these three and validate them as a set before producing a single other frame:

1. **Hero** (4–6 variants, pick the strongest unambiguous world-establishing shot). This is the world genesis frame — not "a scene," but the spatial template every other scene will be checked against.
2. **Mirror 03A**, using Hero as environmental reference (same room; a new camera angle is fine here, since Mirror locks its own position separate from Hero/Reveal's).
3. **Reveal**, generated using Hero as a *direct image reference* (img2img / same seed lineage) — not from the text prompt alone.

**Why 3 images and not 6:** generating the full 03B–D cascade is itself a meaningful cost, and it's downstream of a hypothesis this 3-image checkpoint already tests — that the engine/workflow can hold one world across a spatial template (Hero), a derived angle (03A), and a transformed state (Reveal). If that doesn't hold at 3 images, it will not hold at 9, and there's no reason to spend the generation budget on 03B–D, Snapshot, Demo, or Consequence until the workflow itself is fixed.

**Validate before proceeding:** anchor object identity and position, light direction, and whether Reveal reads as "the same room, transformed" rather than "a different, nicer room." If this trio passes, the system is proven scalable and the cascade approach below is sound. If it fails, treat it as a pipeline error, not an image error — the fix is the engine/workflow (stronger reference-conditioning: SDXL with IP-Adapter/ControlNet, or Midjourney `--cref` at higher weight), not another rewrite of the prompts.

### Checkpoint 1 — only after Checkpoint 0 passes

4. **Generate 03B, 03C, 03D as continuations of 03A** (img2img/reference chain, not independent text-to-image calls). This is now a lower-risk step than it would have been without Checkpoint 0, since the chain mechanism has already been proven on 03A→Reveal.
5. **Scale to Predictable, Snapshot, Demo, and Consequence** — lower-risk derivations of an already-proven world.

If Checkpoint 0 fails repeatedly, that's the signal to reconsider engine choice before any further scenes are attempted — not a signal to rewrite the prompts further.

## 4. The 3-invariants principle — "Hero defines invariants, not scene description"

The Hero pre-flight audit surfaced a real gap (no spatial contract — "modern apartment kitchen" is a category, not a place) and an equally real over-correction risk (specifying 5+ independent geometric constraints turns the prompt into a 3D-scene description pretending to be photography, which can make the model rigid and paradoxically *hurt* visual coherence through constraint overload).

**The resolution: exactly 3 invariants, no more.**

1. **Camera anchor** — one relative position, stated once (e.g. "2 meters from the fridge, slightly right of center, eye-level").
2. **Light vector** — one direction, stated once (e.g. "window on the left side, light from screen-left"). Temperature/warmth can and should still progress scene to scene; direction does not.
3. **Kitchen anchor object placement** — one object, one specific location (e.g. "left edge of the counter, near the stovetop"), not just "visible" or "on the counter."

Everything else in the prompt remains narrative/photographic description (mood, wardrobe, posture, color grading) — only these three are treated as hard, repeatable facts about the world. This is now the standard every scene prompt in `UMAVI_Final_Production_Prompts.md` should be checked against, starting with Hero (already updated) and continuing through the 03A audit next.

**Rule, stated plainly:** Hero does not describe the kitchen. Hero defines the kitchen's rules. Every other scene inherits those rules rather than re-describing the space from scratch.

### Next audit in this pipeline
03A (Mirror seed frame) is the next prompt to audit against this same 3-invariants standard — historically the point right after Hero where these systems tend to fail, since 03A is where the "consistent window" claim either gets a real anchor or doesn't.
