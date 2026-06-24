# UMAVI — Final Production Prompts (9 Scenes)

> Use these as-is. No further interpretation needed. Generate with one engine,
> one character/style-reference setup, in this exact order (01 → 09) so each
> prompt can reference "the same kitchen as the previous scene" consistently.
> Pick ONE anchor object before starting (a white mug, a wooden table edge, or
> a plant) and keep it physically in every scene from 01 to 08.

**Generation mode: controlled cinematic stylization, not pure photorealism.**
This system is optimizing for state continuity over frame realism — the
critical asset is the persistence of one recognizable world across 9
emotional states, not any single striking image. Practical settings:
mid-high stylization (Midjourney `--stylize 250–400`, not the low 50–150
range used for max photoreal variance), one locked seed/character reference
reused across all 9 scenes rather than re-rolled per scene, and light
direction treated as a fixed world parameter rather than re-implied per
prompt. See `UMAVI_Shot_Continuity_Risk_Map.md` for the full audit and
recommended generation order — **read that before generating anything**;
Hero, Mirror, and Reveal must be validated first, in that order, since
they are the system's 3 structural failure points and every other scene is
a lower-risk derivation of an already-proven world.

**Shared technical baseline for all 9 scenes (Cinematic DNA):**
35mm lens, shallow depth of field, editorial lifestyle realism, premium but
imperfect — no Instagram aesthetic, no Pinterest aesthetic, no influencer
aesthetic. One small human imperfection per scene (nothing fully retouched).
No close-up frontal portraits, ever. No reliance on matching faces — same
kitchen, same wardrobe logic, same phone, same anchor object instead.

---

## Scene 01 — Hero
**Emotion:** Exhaustion · **Thought:** "This happens to me every day."
**Kitchen/Home:** 65/35

> 🔒 **This prompt defines the world's spatial invariants — it is not just a
> scene description.** See `UMAVI_Shot_Continuity_Risk_Map.md` §4 for the
> "Hero defines invariants, not scene description" rule this prompt is built
> around. Three invariants only (camera anchor, light vector, kitchen anchor
> object) — deliberately not a full geometric breakdown, to avoid over-
> specification drift turning this into a rigid 3D scene description.

> Cinematic premium lifestyle photography, modern apartment kitchen at blue hour, camera positioned 2 meters from the fridge, slightly right of center, eye-level perspective, window located on the left side of the kitchen casting soft blue ambient light from screen-left, person in their early 30s in three-quarter view standing in front of the open fridge, smartphone in hand, face partially turned away, slight decision fatigue in posture, [ANCHOR OBJECT] placed on the left edge of the counter near the stovetop as a fixed spatial reference, cool blue-grey color grading, Apple campaign aesthetic, 35mm lens, shallow depth of field, cinematic, photorealistic, no direct frontal face, one small imperfect realistic detail (e.g. a slightly open drawer, an unwashed cup)

## Scene 02 — Pain
**Emotion:** Recognition · **Thought:** "I really do this every time."
**Kitchen/Home:** 90/10

> Photorealistic top-down view of the same kitchen counter as Scene 01, scattered ingredients, a smartphone showing multiple open recipe tabs at the edge of frame, [ANCHOR OBJECT] visible, slight realistic everyday mess, evening atmosphere, cool neutral tones, documentary-style premium photography, 35mm lens, shallow depth of field, no visible face

## Scene 03A — Mirror: Monday
**Emotion:** Identification · **Thought:** "This is me."
**Kitchen/Home:** 80/20

> 🔒 **Mirror locks its own camera position, separate from Hero/Reveal's** (per `UMAVI_Shot_Continuity_Risk_Map.md` §3, Checkpoint 0) — this is a deliberate new angle on the same world, not a repeat of Hero's position. The previous version of this prompt said "same camera position as Scene 01," which contradicted that decision; corrected below to the 3-invariants standard (§4 of the risk map).

> Photorealistic lifestyle photography, same kitchen as Scene 01 — same fridge, same counter, same window on the left wall — but camera now positioned facing the counter from the room's open side, roughly 1.5 meters back, eye-level, person seen from behind/three-quarter angle, shoulders low, leaning on the counter, exhausted posture, cold blue-toned light entering from screen-left (same wall as Scene 01's window, coldest light of the four-frame series), [ANCHOR OBJECT] placed on the left edge of the counter near the stovetop — same spot as Scene 01 — empty/unused, 35mm lens, shallow depth of field, no direct frontal face, documentary-editorial style

## Scene 03B — Mirror: Wednesday
**Emotion:** Identification · **Thought:** "This is me."
**Kitchen/Home:** 75/25

> 🧊 **Frozen pending Checkpoint 0 visual evidence** (see `UMAVI_Shot_Continuity_Risk_Map.md` §3, §5). Not yet adjusted to match 03A's corrected invariants — that propagation was made prematurely, before Hero/03A/Reveal had been generated and evaluated as real images, and has been reverted. Do not edit this prompt further until Checkpoint 0 produces visual feedback on whether the invariants are sufficient, correct, or excessive.

> Photorealistic lifestyle photography, same kitchen and same camera position as Scene 03A, person looking into the fridge, neutral browsing posture, slightly warmer lighting than the previous frame, [ANCHOR OBJECT] visible and in use, consistent window, 35mm lens, shallow depth of field, no direct frontal face, documentary-editorial style

## Scene 03C — Mirror: Friday
**Emotion:** Identification · **Thought:** "This is me."
**Kitchen/Home:** 70/30

> 🧊 **Frozen pending Checkpoint 0 visual evidence** — see note on Scene 03B above.

> Photorealistic lifestyle photography, same kitchen and same camera position as Scene 03A, person more upright, rising energy, warm artificial evening light, two mugs or glasses visible suggesting company, [ANCHOR OBJECT] visible, consistent window, 35mm lens, shallow depth of field, no direct frontal face, documentary-editorial style

## Scene 03D — Mirror: Sunday
**Emotion:** Identification · **Thought:** "This is me."
**Kitchen/Home:** 65/35

> 🧊 **Frozen pending Checkpoint 0 visual evidence** — see note on Scene 03B above.

> Photorealistic lifestyle photography, same kitchen and same camera position as Scene 03A, person relaxed and seated, soft warm natural daylight — warmest lighting of the series, [ANCHOR OBJECT] visible, relaxed casual placement, consistent window, 35mm lens, shallow depth of field, no direct frontal face, documentary-editorial style

## Scene 04 — Predictable
**Emotion:** Surprise · **Thought:** "I never put that into words."
**Kitchen/Home:** 70/30

> Photorealistic premium kitchen scene shot from behind, same kitchen as previous scenes, same person seated calmly at the counter, warm ambient natural light, kitchen visibly more orderly than earlier scenes, [ANCHOR OBJECT] visible, subtle soft glowing particles faintly visible near the person suggesting quiet thought — light particles only, never anything that reads as a screen or technology, elegant editorial photography, 35mm lens, shallow depth of field, no visible face

## Scene 05 — Snapshot
**Emotion:** Attraction · **Thought:** "I would actually eat that."
**Kitchen/Home:** 60/40

> Premium editorial macro food photography, Mediterranean ingredients — tomatoes, basil, lemon, olive oil — elegant minimal composition, [ANCHOR OBJECT] visible if it fits the macro framing (e.g. same olive oil bottle style as Scene 07), warm natural light, Apple lifestyle aesthetic, 35mm lens, shallow depth of field, no text, no hands

## Scene 06 — Demo
**Emotion:** Trust · **Thought:** "Oh, I get how this works."
**Kitchen/Home:** 50/50

> Premium lifestyle photography, same kitchen as previous scenes, same person cooking calmly, smartphone resting face-down on the countertop — not being looked at, [ANCHOR OBJECT] visible, natural authentic relaxed expression seen from a three-quarter angle, warm ambient lighting, no visible screen, 35mm lens, shallow depth of field, no direct frontal face. Note: this is the only scene composited alongside a UI graphic (the identity sphere) — the person must read as more present than the technology.

## Scene 07 — Consequence
**Emotion:** Desire · **Thought:** "I'd like to live like this."
**Kitchen/Home:** 40/60

> Premium home-cooking editorial photography, three realistic achievable dinners made from the same set of Mediterranean ingredients, same tableware style as will appear in Scene 09, warm golden natural light, appetizing but attainable home-cook presentation, explicitly not restaurant-styled, not Instagram-styled, no people, 35mm lens, shallow depth of field

## Scene 08 — Reveal
**Emotion:** Relief · **Thought:** "This isn't another life. It's mine, improved."
**Kitchen/Home:** 35/65

> Photorealistic premium lifestyle scene, same kitchen as Scene 01 — same fridge, same window on the left wall, camera at the same position (2 meters from the fridge, slightly right of center, eye-level) — this must read as the same room transformed, not a different one, now bright and warm during golden hour with light still entering from screen-left (only warmth/intensity changed, not direction), dinner already set on the table, [ANCHOR OBJECT] in the exact same spot as Scene 01 — left edge of the counter near the stovetop, person present in soft focus background, relaxed atmosphere, Apple and Airbnb campaign aesthetic, aspirational but realistic, wide shot, 35mm lens, shallow depth of field, no direct frontal face. Note: the 3D product phone is composited into this frame afterward, resting on the same table surface, matching this scene's light direction — never floating over empty background.

## Scene 09 — Waitlist
**Emotion:** Anticipation · **Thought:** "I want this."
**Kitchen/Home:** 20/80

> Minimalist editorial dining table set for two, same tableware style as Scene 07, warm soft even lighting, empty chairs, gently lived-in details — a slightly askew napkin, a half-burned candle — calm Scandinavian-inspired aesthetic, no people, no text, 35mm lens, shallow depth of field

---

## Validation checklist (the only 3 things to check once scenes exist)

1. **Self-projection** — does a viewer plausibly think "could this be my life?" within ~1 second of seeing the scene?
2. **Continuity of space** — same kitchen, same anchor object, same light logic, scene to scene, with no jarring jump?
3. **Emotional gradient** — does the sequence read as cold/heavy → warm/light without any single scene breaking the curve?

Nothing else needs validating. No new systems, ratios, or rules should be added in response to what comes back from this check — only adjustments to the images themselves.
