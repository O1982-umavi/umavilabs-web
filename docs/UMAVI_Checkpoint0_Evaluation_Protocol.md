# UMAVI — Checkpoint 0 Visual Evaluation Protocol

> Purpose: define, before any image exists, what "it worked" or "it failed"
> means for Hero, 03A, and Reveal — objectively enough that two different
> people would reach the same verdict looking at the same 3 images. Do not
> edit any prompt (Hero, 03A, Reveal, or the frozen 03B–D) until this
> protocol has been run against real generated output.

## Step 0 — the raw test (do this first, before anything formal)

Before running any of the 6 tests below, look at the 3 images cold, without analyzing them, and ask exactly one question:

> **If I saw these 3 images with no context, would I understand they're the same place?**

- **Global PASS:** yes — the images are recognizable as the same space without needing it explained.
- **Global FAIL:** you'd need to explain the continuity in words for someone else to see it.

This raw test is the real gate. The 6 tests below exist to localize *why* it passed or failed once you have an answer — they are diagnostic, not the verdict itself. Run Step 0 first; only descend into the formal protocol after.

## How to use this

Generate Hero, 03A, and Reveal (in that order, per `UMAVI_Shot_Continuity_Risk_Map.md` §3). For Hero, generate 4–6 variants and pick one before evaluating 03A/Reveal against it. Then score each test below using the three categories defined here — not as a strict binary, since generative image consistency is distributive, not discrete, and treating it as binary risks false negatives:

- **PASS** — coherent within perceptual tolerance. The world reads as continuous; minor variation (e.g. ±10–15% in object position, slight optical-perspective shift on the anchor object that preserves its identity) does not fail the test, because a human viewer would not register it as a break.
- **PARTIAL (drift)** — coherent in kind but with detectable drift: the invariant is present and recognizable, but visibly shifted (e.g. light direction correct but intensity inconsistent; window present and on the correct side but notably repositioned). This is not a failure — it's a signal for a small wording tweak, not a redesign.
- **FAIL** — world rupture. The element is not recognizable as continuous across images at all (window on a different wall entirely, anchor object reads as a different object, light direction reverses, the room reads as a different place).

Do not rewrite any prompt based on a single test failing; complete the full protocol first, then look at the pattern.

### Recommended order of reading results once all 3 images exist

Read the images in this order, not generation order, for fastest fault isolation:

1. **Reveal first** — this is the most critical test of visual memory (does the transformation hold, or does it just look like a nice kitchen?). If Reveal fails, check whether it's a *transform* failure specifically (Hero/03A may still be fine).
2. **Hero second** — identity baseline. If Hero itself doesn't read as a specific, coherent place, every downstream comparison is meaningless — re-check this before trusting any Reveal or 03A verdict.
3. **03A third** — first perturbation / continuity mechanism. If Hero and Reveal both pass but 03A doesn't, the issue is specifically the continuity *mechanism* (img2img/reference chaining), not the invariants themselves.

This order gives faster localization of whether a failure is in the world anchor (Hero), the transform (Reveal), or the continuity mechanism (03A) — rather than reading all three cold and having to reconstruct which one is the root cause.

### Scope note — what Checkpoint 0 does and doesn't validate

These 3 frames validate **identity lock** — whether the same world can be recognized across a baseline, one transformation, and one camera-angle change. They do **not** yet validate **world stability under change**: temporal variation beyond blue-hour→golden-hour (e.g. flat midday light), action-state variation (static vs. interaction), or composition variation outside the Hero–Mirror–Reveal triangle. A Checkpoint 0 pass is evidence the approach is sound, not proof the full 9-scene set will hold — Checkpoint 1 (03B–D) is where state variation actually gets tested for the first time.

---

## Test 1 — Dominant light direction (Hero vs 03A vs Reveal)

> Revised from strict window-position geometry, which conflated "same room reconstructed in 3D" with "same world, perceptually." Window position itself is no longer checked — what matters is the dominant light direction it implies, which is the actual perceptual cue a viewer reads.

**What to check:** Does each image have one clearly dominant light source/direction (not necessarily from the same literal wall), and does that direction feel internally consistent within each image — cold/blue at Hero and 03A, warm/golden at Reveal — without contradicting itself within a single frame?

**Pass condition:** Each image reads as having one coherent dominant light direction. Cross-image, the *temperature progression* (cold → warm) is what's being checked, not a literal shared light source position.

**Partial/drift condition:** Dominant direction is identifiable in each image but the progression feels uneven (e.g. Reveal's warmth doesn't clearly read as later/more-resolved than Hero/03A's cold).

**Fail condition:** Any single image has ambiguous or contradictory lighting within itself (multiple competing directions with no clear dominant), regardless of cross-image comparison.

---

## Test 2 — Anchor object recognizability

**What to check:** Is the chosen anchor object (mug / table edge / plant) visually identifiable as *the same object* in Hero, 03A, and Reveal — not just present, but recognizable as one continuous object a viewer's eye could track?

**Pass condition:** You could screenshot just the anchor object from each of the 3 images, show them out of context, and a viewer would guess they're the same object.

**Partial/drift condition:** The object is recognizable as the same type and roughly the same object, but viewed from a different angle/perspective that changes its apparent shape somewhat (e.g. a mug seen from the side vs. three-quarters) — identity preserved, framing varies. This is expected and acceptable, not a failure.

**Fail condition:** The object changes type, color, shape, or is in a position that doesn't read as "the same physical item" even loosely.

---

## Test 3 — Spatial structure type (open-plan / linear / island)

> Revised from strict camera-position/perspective geometry, for the same reason as Test 1 — exact viewpoint reconstruction isn't the KPI; recognizable spatial logic is.

**What to check:** Does each image read as a consistent *type* of kitchen layout — e.g. linear single-wall, galley/corridor, or open island-plan — rather than jumping between fundamentally incompatible spatial logics?

**Pass condition:** All 3 images can be described with the same one or two layout words (e.g. "open, airy, generous counter space" or "tight, linear, corridor-like") even if exact proportions differ.

**Partial/drift condition:** Layout type is broadly consistent but scale/generosity of the space shifts noticeably (e.g. a modest galley kitchen vs. a more spacious version of the same layout type).

**Fail condition:** The images describe fundamentally incompatible spatial logics — e.g. a tight linear corridor kitchen in one image and an open-plan island kitchen in another. This is a structural break, not a scale difference.

---

## Identity Drift Threshold Test (between Test 3 and Test 4)

> New test, inserted deliberately between the per-invariant checks (1–3) and the gestalt gut-check (4), as the falsifiable middle step: not "is each invariant perfect" and not yet "does it pass the 1-second read," but "how much cumulative drift has actually accumulated, named explicitly, before the gut-check renders its verdict."

**What to check:** List every drift/partial flagged in Tests 1–3 in one place. Count them. Then ask: does the *combination* of these specific drifts plausibly explain why Test 4 might pass or fail — i.e., is the drift proportionate to the gut-check result, or does the gut-check fail by far more than the sum of the logged drifts would predict?

**Why this matters:** if Test 4 fails by *much more* than Tests 1–3's drift would predict, the failure isn't accumulated drift — it's a categorical break (different materials, different era of design, different emotional register) that the per-invariant tests aren't even designed to catch. That's a different problem than "the invariants need tightening," and naming it here prevents mistakenly treating a categorical-break failure as if it were just "too much drift."

**Outcome of this test is not PASS/FAIL — it's a routing decision:**
- **Drift-proportionate:** if Test 4 fails roughly in proportion to logged drift, the fix is tightening the existing invariants (materials, palette continuity, recurring objects) — proceed to read Test 4 as the real verdict, and treat the fix as incremental.
- **Drift-disproportionate:** if Test 4 fails far worse than the logged drift explains, the problem is categorical (the images don't share a design language, era, or material identity at all) — this is a workflow/generation problem, not a wording problem, regardless of what Tests 1–3 said.

---

## Test 4 — "Same world" gut check (Hero vs Reveal specifically)

> Note: Tests 4–6 stay binary (PASS/FAIL only, no drift category) — these are gestalt/perceptual reads, not measurable invariants, and "partial gut-check" isn't a meaningful state. Either the first-second read holds or it doesn't. **This test is not relaxed or reinterpreted after the fact, regardless of result** — UMAVI's product promise (Rule 2: same life evolves, we never change worlds) depends on world continuity, not aesthetic reinterpretation, so this is the one test that stays a hard gate no matter what Tests 1–3/Identity Drift say.

**What to check:** Without analyzing details, does Reveal read — in the first second of looking at it — as "the same home as Hero, later, transformed," or as "a different, nicer home"?

**Pass condition:** Immediate gut read is "same place, different moment." This is the test closest to the actual product promise and outranks every other test in this protocol if there's any conflict in the overall verdict.

**Fail condition:** Gut read is "a different/better home," even if Tests 1–3 technically pass on close inspection. A viewer doesn't inspect closely — first-second read is the real bar, and a FAIL here is a real FAIL, not a signal to redefine the test.

---

## Test 5 — Perceptual distance/scale consistency (Hero vs Reveal)

> Revised from strict camera-tripod-position plausibility, for the same reason as Tests 1 and 3.

**What to check:** Do the two images sit at a comparable perceptual distance/scale (e.g. both medium-shot at human scale, both showing a similar amount of the room) rather than one being an intimate close shot and the other a sweeping wide establishing shot?

**Pass condition:** Both images give the viewer a similar sense of "how much of the room am I seeing, from how far away" — close / medium / wide categories match.

**Fail condition:** One image is a tight, intimate framing and the other a wide establishing shot, with no perceptual continuity between "how much world" each one shows.

---

## Test 6 — Subject framing (all 3 images)

**What to check:** Does the person read as secondary to the space, per the no-frontal-face / 3-4-angle / from-behind constraints — or has the model centered the face/body despite the prompt?

**Pass condition:** On first glance, the eye goes to the *room* before the *person*. Face is not the focal point in any of the 3.

**Fail condition:** Any image where the face is prominent, frontal, or the clear visual center of the composition.

---

## Reading the results

Once Tests 1–3 are scored, run the Identity Drift Threshold Test, then Test 4, then Tests 5–6. Look at the **pattern**, not any single test:

- **Test 4 PASS, Tests 1–3 mostly PASS/drift:** the 3-invariants approach is validated. Proceed to Checkpoint 1 (03B–D generation, then the rest of the set) using the same invariant style.
- **Test 4 FAIL, Identity Drift reads "drift-proportionate":** the invariants need tightening (materials, palette continuity, recurring objects) — a wording fix, not a workflow fix.
- **Test 4 FAIL, Identity Drift reads "drift-disproportionate":** this is a categorical break, not accumulated drift. The images don't share a design language, era, or material identity — stop iterating on prompts and address the generation workflow (reference-conditioning: img2img/IP-Adapter/`--cref`) per `UMAVI_Shot_Continuity_Risk_Map.md` §3.
- **Test 4 PASS but Tests 1–3 show heavy drift/FAIL anyway:** this is the over-specification-adjacent case — the gestalt reads fine despite imperfect invariants, which means the invariants were never the actual mechanism carrying continuity. Don't "fix" tests that didn't need fixing; trust the Test 4 result.

**Test 4 is never reinterpreted to match a result you'd prefer.** Its pass/fail is the real verdict on whether this triad demonstrates "same world, transformed" — the product's actual promise — regardless of what Tests 1–3, 5, or 6 say.

A pass here is a verdict on **identity lock across this specific triangle** — not yet a verdict on the full 9-scene set (see Scope note above). What "PASS as a whole system" means for the complete triad — as opposed to test-by-test — is the next thing to define, but only once these 3 images actually exist; defining it sooner would be the same premature-control mistake this protocol exists to avoid.

No prompt should be edited based on this protocol until the full sequence (Tests 1–3 → Identity Drift → Test 4 → Tests 5–6) has been run and read as above.

---

## Applied result — Checkpoint 0, first generation pass

Run against the uploaded Hero/03A/Reveal images:

- **Step 0 (raw gut test):** **FAIL.** Without context, the images do not read as the same place.
- **Test 1 (dominant light direction):** within each image, lighting is internally coherent (cold/blue at Hero+03A, warm/golden at Reveal) — **PASS** on the revised per-image standard.
- **Test 2 (anchor object):** the white mug is present and recognizable in all 3 — **PASS**, the one invariant that actually held.
- **Test 3 (spatial structure type):** Hero/03A read as a tight, linear/galley kitchen; Reveal reads as an open island-plan kitchen — **FAIL**, a structural break, not a scale difference.
- **Identity Drift Threshold Test:** logged drift from Tests 1–3 is: one structural-type break (Test 3) against two passes. That alone would predict, at most, a partial/borderline Test 4 — not the categorical failure actually observed (different cabinetry style, different materials, different era of design, no shared shelf/decor language). **Reading: drift-disproportionate.** Test 4's failure is not explained by accumulated drift from Tests 1–3 — it's a categorical break in material/design identity that the per-invariant tests weren't built to catch.
- **Test 4 (gut check):** **FAIL**, confirmed and not reinterpreted. Hero/03A is a dark, linear, urban apartment kitchen; Reveal is a bright, open, island-style kitchen with an entirely different material and decor language. No shared cabinetry, shelving, or material identity is visible.
- **Test 5 (perceptual distance/scale):** Hero is a medium shot at human scale; Reveal is a wide establishing shot — **FAIL**.
- **Test 6 (subject framing):** no frontal faces, person secondary to the space in all 3 — **PASS**.

**Routing outcome: drift-disproportionate → workflow problem, not a wording problem.** The three images were generated independently with no shared reference image between them. Per `UMAVI_Shot_Continuity_Risk_Map.md` §3, the next step is not editing these prompts further — it's regenerating 03A and Reveal using the actual Hero image as direct visual reference (img2img / IP-Adapter / `--cref` at high weight), not from text description alone.
