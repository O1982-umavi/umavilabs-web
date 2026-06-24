# UMAVI — Tone Lock Spec v1

> UMAVI never evaluates you. It only reduces your choices.

This is the one governing sentence for all copy going forward. It removes three things at once: judgment ("who you are"), interpretation ("this is you"), and substitution ("we decide with you"). Everything below exists so this problem doesn't get rediscovered and re-litigated every iteration — it's closed, not open for renegotiation per pass.

## What actually happened (for context, not for re-debate)

No single line was the problem. Three layers — UI (memory card, demo, reveal), visual (warm light, transformation arc), and narrative (copy) — drifted in the same direction independently, and the combination read as "this AI models and reconstructs me," even where no individual sentence said that outright. The fix is precision, not capability: the product is "UMAVI reduces dinner decision friction," not "UMAVI interprets your culinary identity." Keep that distinction in mind before adding any new copy, not just when fixing old copy.

## The friend test (apply to every new sentence)

> Could a good friend who's helping you decide what to cook tonight say this?

If yes → fine. If the honest answer is "no, that's something an omniscient algorithm would say" → it's gone too far. This test outranks every other stylistic preference in the system.

## Banned phrases (do not reintroduce, in any section, in any form)

| # | Banned | Why |
|---|---|---|
| 1 | "This is already you" / "This is you" | Identity-revelation framing — UMAVI doesn't reveal who you are |
| 2 | "[UMAVI] understands you" / "understands me" | Implies deep personal comprehension, not situational context |
| 3 | "UMAVI is learning you" | The single most identity-flavored line found in the system — learning *patterns in context*, never learning *a person* |
| 4 | "Built for you, not for everyone" | Exclusivity + identity combined — reads as profiling, not service |
| 5 | "Your profile" / "profile forming" / "profile stabilised" | "Profile" is surveillance language — UMAVI tracks context, not builds a profile |
| 6 | "The system knows you" / "actually knows you" | Same failure as #2, specifically dangerous in Reveal where it combines with warm light + transformation visuals |
| 7 | "Pattern detected" / "[X] detected" | Clinical/surveillance register — prefer plain, human phrasing |
| 8 | "Confidence: [X]%" applied to a person | Scoring a person (vs. scoring a dish/match) reads as algorithmic judgment of *you*, not of *options* |
| 9 | "Become one of the first people we understand" | Same as #2, plus makes the *waiting list itself* about being understood rather than about trying the product |
| 10 | "Get access to your culinary identity" | CTA-level identity language — the action being requested is "try a product," not "claim an identity" |

## Fixed substitutions (already applied across the landing as of this pass)

| Section | Before | After |
|---|---|---|
| Predictable | "You don't decide randomly... UMAVI simply made them visible" | "There's nothing random about it... UMAVI remembers that, so you don't have to re-decide it" |
| Snapshot | "This is already you. We're just making it visible." | "This is how it usually goes" + "based on your typical weeknight pattern, not a guess about who you are" |
| Demo (state 2 kicker) | "UMAVI memory" | "What you usually reach for" |
| Demo (result note) | "Built for you, not for everyone." | "Adapted to your week, not a generic list." |
| Demo (closing line) | "UMAVI is learning you." | "It's learning what *actually* works for your week." |
| Proof (heading) | "...stop seeing 'an app' and start seeing themselves" | "...the moment dinner stops feeling like a decision" |
| Proof (quote) | "It finally understands me." | "It actually fits how my week works." |
| Reveal (kicker + body) | "What changes" / "...the system actually knows you" / "narrows things down to what actually fits tonight" | "Tonight is simpler" / "there's already enough context to skip most of the back-and-forth — built around what's already in your kitchen, not a guess about who you are" |
| Waitlist (heading) | "Become one of the first people we understand." | "Be one of the first to try it." |
| Waitlist (CTA) | "Get access to your culinary identity" | "Get early access" |
| Memory Card (Predictable) | "Pattern detected" | "Noting a habit" |
| Memory Card (Snapshot) | "Profile forming" / "Five traits already visible" | "A few things stand out" / "Five things that usually fit" |
| Memory Card (Demo) | "Confidence: 82%" / "Your profile is emerging" | "Narrowing it down" / "From many options to one" |
| Memory Card (Reveal) | "Profile stabilised" / "This feels like you" | "Tonight, sorted" / "One less thing to figure out" |

## What's deliberately NOT flagged (so this doesn't over-correct)

These read as fine under the friend test and should not be "fixed" reflexively just because they're adjacent to the banned list above:

- **"UMAVI memory" as a section concept** (remembering a recurring habit) — fine; only the literal phrase as a UI label was swapped, the *idea* of remembering context is the actual product.
- **Quantitative match scores on a dish** ("92% match" on a *recipe*) — fine; scoring an option is not scoring a person. Only flag this if it's ever applied to describe the *person* rather than the *result*.
- **"Companion"** as the product's self-description (header tagline, meta description) — fine; a companion that reduces friction is the correct register. Don't escalate this to "the system that understands you."
- **Proof quotes like "remembers how I live" or "fits how my week works"** — fine; these describe situational fit, not personal interpretation.

## Where this applies

Every future section, copy pass, or new feature. If a new line under consideration matches the *pattern* of any banned phrase above — even if the exact wording differs — apply the friend test before shipping it. This spec is closed: extending the banned list is fine if a new failure mode is found, but the governing sentence and the friend test do not get renegotiated.
