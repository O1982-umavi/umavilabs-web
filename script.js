// ─── Scroll-triggered reveals ───
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ─── Cognitive Load Curve + Meaning Density + Desire Curve engine ───
// Reads data-load / data-meaning / data-desire from each major section and
// writes them to :root as --cognitive-load / --meaning-density / --desire.
// CSS consumes these to drive density, contrast, and animation speed (load)
// without letting visual activity outrank perceived significance (meaning),
// while desire is tracked separately as the primary KPI — it climbs and
// holds, it must never drop at Waitlist. See UMAVI Visual Storyboard v1,
// "Desire Curve" addendum.
//
// Scroll-velocity smoothing: NOT a fourth cognitive system, not a logged
// variable, not part of the mental model. It is a temporal correction on the
// Desire signal only — desire(t) = base_desire(section) × smooth(scroll_speed).
// Fast scroll damps how fully the new target is reached (reads as confusion/
// saturation); slow scroll lets it land fully (reads as deeper engagement).
// The user never perceives this as a system — only the page should feel
// slightly more "with you" when you slow down.
//
// The Living Memory Card (replaces the earlier Memory Orb concept entirely —
// no dual system) reads data-card-state/data-card-insight from the same
// sections and updates its two text lines accordingly.
const loadSections = document.querySelectorAll("[data-load], [data-desire]");
const rootStyle = document.documentElement.style;
const memoryCard = document.getElementById("memory-card");
const memoryCardState = document.getElementById("memory-card-state");
const memoryCardInsight = document.getElementById("memory-card-insight");

let desireTarget = 0.3;
let desireApplied = 0.3;
let lastScrollY = window.scrollY;
let lastScrollT = performance.now();
let scrollSpeedSmoothed = 0;

// Perceptual stability gate — pure noise removal, not a new mental model.
// Erratic stop-start-stop scrolling can otherwise hypersensitize the velocity
// smoothing into micro-oscillations of --desire ("false emotional
// positives"). We track how long scroll direction/speed has been stable and
// only let desire approach its target at full rate once that stability has
// held for ~200ms; during instability the approach rate is heavily damped.
const STABILITY_GATE_MS = 200;
let lastScrollDir = 0;
let stableSinceT = performance.now();

if (loadSections.length) {
  const loadObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const load = entry.target.getAttribute("data-load");
        const meaning = entry.target.getAttribute("data-meaning");
        const desire = entry.target.getAttribute("data-desire");
        const cardState = entry.target.getAttribute("data-card-state");
        const cardInsight = entry.target.getAttribute("data-card-insight");

        if (load !== null) rootStyle.setProperty("--cognitive-load", load);
        if (meaning !== null) rootStyle.setProperty("--meaning-density", meaning);
        if (desire !== null) desireTarget = parseFloat(desire);

        if (memoryCard && cardState && cardInsight) {
          memoryCard.classList.add("visible");
          if (memoryCardState) memoryCardState.textContent = cardState;
          if (memoryCardInsight) memoryCardInsight.textContent = cardInsight;
        }
      });
    },
    { threshold: 0.5 }
  );
  loadSections.forEach((el) => loadObserver.observe(el));
}

// Scroll-velocity smoothing loop — internal correction only, never logged
// as its own state. Tracks raw scroll speed, smooths it, and uses it purely
// to damp how quickly --desire is allowed to approach desireTarget.
window.addEventListener(
  "scroll",
  () => {
    const now = performance.now();
    const rawDelta = window.scrollY - lastScrollY;
    const dy = Math.abs(rawDelta);
    const dt = Math.max(now - lastScrollT, 1);
    const instSpeed = dy / dt; // px per ms
    scrollSpeedSmoothed = scrollSpeedSmoothed * 0.85 + instSpeed * 0.15;

    const dir = rawDelta === 0 ? lastScrollDir : Math.sign(rawDelta);
    if (dir !== lastScrollDir) {
      lastScrollDir = dir;
      stableSinceT = now; // direction flipped — restart the stability clock
    }

    lastScrollY = window.scrollY;
    lastScrollT = now;
  },
  { passive: true }
);

function desireSmoothingTick() {
  // Fast scrolling damps the approach rate (reads as confusion/saturation);
  // slow or stationary scrolling lets desire land fully on its target
  // (reads as deeper engagement). Clamp keeps it from ever fully stalling.
  const speedPenalty = Math.min(scrollSpeedSmoothed * 1.8, 0.85);
  let approachRate = 0.06 * (1 - speedPenalty) + 0.012;

  // Stability gate: until scroll direction has held steady for ~200ms,
  // heavily damp the approach rate so erratic stop-start-stop scrolling
  // can't produce micro-oscillations in --desire. Pure noise removal.
  const stableFor = performance.now() - stableSinceT;
  if (stableFor < STABILITY_GATE_MS) {
    approachRate *= stableFor / STABILITY_GATE_MS;
  }

  desireApplied += (desireTarget - desireApplied) * approachRate;
  rootStyle.setProperty("--desire", desireApplied.toFixed(3));
  scrollSpeedSmoothed *= 0.96; // gentle decay so velocity reads as recent, not stale
  requestAnimationFrame(desireSmoothingTick);
}
requestAnimationFrame(desireSmoothingTick);

// ─── Magnetic buttons ───
document.querySelectorAll(".magnetic").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });
  el.addEventListener("mouseleave", () => { el.style.transform = ""; });
});

// ─── Floating particle canvas ───
const particleCanvas = document.getElementById("particle-canvas");
const ctx = particleCanvas ? particleCanvas.getContext("2d") : null;
const particles = [];

function rnd(a, b) { return Math.random() * (b - a) + a; }

function resizeCanvas() {
  if (!particleCanvas) return;
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}

function initParticles() {
  if (!particleCanvas) return;
  particles.length = 0;
  for (let i = 0; i < 28; i++) {
    particles.push({
      x: rnd(0, particleCanvas.width),
      y: rnd(0, particleCanvas.height),
      size: rnd(0.9, 2),
      vx: rnd(-0.07, 0.07),
      vy: rnd(-0.07, 0.07),
      hue: Math.random() > 0.5 ? "#A6FF4D" : "#6B5CFF",
      alpha: rnd(0.06, 0.2),
    });
  }
}

function drawParticles() {
  if (!ctx || !particleCanvas) return;
  ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  particles.forEach((p) => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < -20) p.x = particleCanvas.width + 20;
    if (p.x > particleCanvas.width + 20) p.x = -20;
    if (p.y < -20) p.y = particleCanvas.height + 20;
    if (p.y > particleCanvas.height + 20) p.y = -20;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `${p.hue}${Math.floor(p.alpha * 255).toString(16).padStart(2, "0")}`;
    ctx.shadowBlur = 14;
    ctx.shadowColor = p.hue;
    ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}

resizeCanvas(); initParticles(); drawParticles();
window.addEventListener("resize", () => { resizeCanvas(); initParticles(); });

// ─── Hero parallax on mouse ───
const heroImage = document.querySelector(".hero-image");
window.addEventListener("mousemove", (e) => {
  if (!heroImage || window.innerWidth < 900) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  heroImage.style.transform = `scale(1.05) translate3d(${x * 0.15}px, ${y * 0.12}px, 0)`;
});

// ─── Mirror: scroll-driven cognitive states ───
const mirrorData = [
  {
    day: "Monday",
    mode: "Exhausted mode",
    caption: "Comfort and speed, almost no friction.",
    mood: "Low energy",
    tone: "exhausted",
    image: "./assets/images/scene-03-mirror.png",
  },
  {
    day: "Wednesday",
    mode: "Leftovers mode",
    caption: "Clarity over novelty, using what's already there.",
    mood: "Fridge raid",
    tone: "leftovers",
    image: "./assets/images/scene-03-wednesday.png",
  },
  {
    day: "Friday",
    mode: "Social mode",
    caption: "More flavour, shared, a little special.",
    mood: "Shared cooking",
    tone: "social",
    image: "./assets/images/scene-03-friday.png",
  },
  {
    day: "Sunday",
    mode: "Exploration mode",
    caption: "Room to experiment and enjoy the process.",
    mood: "Slow curiosity",
    tone: "exploration",
    image: "./assets/images/scene-03-sunday.png",
  },
];

const mirrorDay = document.getElementById("mirror-day");
const mirrorMode = document.getElementById("mirror-mode");
const mirrorCaption = document.getElementById("mirror-caption");
const mirrorThumbsEl = document.getElementById("mirror-thumbs");
const mirrorScrollMarkers = document.querySelectorAll(".mirror-scroll-marker");
const mirrorPhoto = document.getElementById("mirror-photo");

let mirrorCurrentIndex = 0;

function applyMirrorPhoto(s) {
  if (mirrorPhoto && mirrorPhoto.getAttribute("src") !== s.image) {
    mirrorPhoto.classList.add("switching");
    // Preload so the cross-fade-in never reveals a blank/partial frame.
    const preload = new Image();
    preload.onload = () => {
      mirrorPhoto.setAttribute("src", s.image);
      requestAnimationFrame(() => {
        mirrorPhoto.classList.remove("switching");
      });
    };
    preload.src = s.image;
  }
}

// Thumbnail strip — always shows the 3 currently non-active states as
// real (small, lazy-loaded) images, not dots. Regenerated every time the
// active state changes, so it always reflects "the other 3 that exist."
function renderThumbStrip(activeIndex) {
  if (!mirrorThumbsEl) return;
  mirrorThumbsEl.innerHTML = "";
  mirrorData.forEach((s, i) => {
    if (i === activeIndex) return;
    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "mirror-thumb";
    thumb.dataset.state = String(i);
    thumb.dataset.tone = s.tone;
    thumb.innerHTML = `
      <img class="mirror-thumb-img" src="${s.image}" alt="${s.day} — ${s.mode}" loading="lazy" />
      <span class="mirror-thumb-day">${s.day}</span>
      <span class="mirror-thumb-mood">${s.mood}</span>
    `;
    // Hover = instant temporary preview, never touches the locked/
    // scroll-driven state. Mouseleave restores the real current state.
    thumb.addEventListener("mouseenter", () => {
      if (mirrorDay) mirrorDay.textContent = s.day;
      if (mirrorMode) mirrorMode.textContent = s.mode;
      if (mirrorCaption) mirrorCaption.textContent = s.caption;
      applyMirrorPhoto(s);
    });
    thumb.addEventListener("mouseleave", () => {
      const real = mirrorData[mirrorCurrentIndex];
      if (mirrorDay) mirrorDay.textContent = real.day;
      if (mirrorMode) mirrorMode.textContent = real.mode;
      if (mirrorCaption) mirrorCaption.textContent = real.caption;
      applyMirrorPhoto(real);
    });
    // Click = lock this state. Overrides the scroll-driven default until
    // the next scroll trigger fires naturally — direct human control
    // without faking scroll semantics.
    thumb.addEventListener("click", () => {
      setMirrorState(i);
    });
    mirrorThumbsEl.appendChild(thumb);
  });
}

const mirrorVisitedStates = new Set();
const mirrorProgressHint = document.getElementById("mirror-progress-hint");

function setMirrorState(index) {
  const s = mirrorData[index];
  if (!s) return;
  mirrorCurrentIndex = index;
  if (mirrorDay) mirrorDay.textContent = s.day;
  if (mirrorMode) mirrorMode.textContent = s.mode;
  if (mirrorCaption) mirrorCaption.textContent = s.caption;
  mirrorScrollMarkers.forEach((m, i) => m.classList.toggle("active", i === index));
  applyMirrorPhoto(s);
  renderThumbStrip(index);

  // Progress hint — only real state arrivals count (scroll or click,
  // both of which call this function), never hover preview (which never
  // calls setMirrorState). Resolves "I don't perceive the system as
  // complete" with explicit feedback, without restructuring into a
  // simultaneous grid.
  mirrorVisitedStates.add(index);
  if (mirrorProgressHint) {
    mirrorProgressHint.textContent = `Week rhythm: ${mirrorVisitedStates.size}/${mirrorData.length} states experienced`;
  }
}

if (mirrorScrollMarkers.length) {
  setMirrorState(0);
  // Same scroll-driven IntersectionObserver mechanism as before — same
  // markers, same threshold, no timers. This remains the default driver;
  // thumbnail clicks simply call the same setMirrorState() function, so
  // there's no parallel state system, just an additional trigger path.
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setMirrorState(Number(e.target.dataset.state));
      });
    },
    { threshold: 0.55 }
  );
  mirrorScrollMarkers.forEach((m) => obs.observe(m));
}

// ─── Pantry scan: state machine (3 states, event-driven only) ───
// No independent timers, no parallel timing system — every state
// transition is driven exclusively by real animationstart/animationend
// events fired by the existing .pud-recognition-box entrance animation
// (pudRecognitionIn), not by anything computed separately. The text
// reflects the system's actual state, not a retrospective description of
// a fixed duration.
const pantryCaption = document.getElementById("pantry-scan-caption");
const pantryBoxes = document.querySelectorAll(".pud-recognition-box");

if (pantryCaption && pantryBoxes.length) {
  let firstIngredientDetected = false;
  let finishedCount = 0;
  const totalBoxes = pantryBoxes.length;

  // Simple rule-based ingredient grouping for the optional richer state-2
  // text (Requisit 2) — reads the tag already present on each box, no
  // real-time classification, no extra system. Falls back to the generic
  // line if a tag doesn't match a known group.
  const ingredientGroups = {
    vegetable: ["tomato", "broccoli", "basil"],
    protein: ["chicken", "feta", "yogurt"],
    base: ["rice", "lemon", "black pepper"],
  };
  function groupCaptionFor(tag) {
    if (ingredientGroups.vegetable.includes(tag)) return "Fresh produce detected…";
    if (ingredientGroups.protein.includes(tag)) return "Protein source identified…";
    if (ingredientGroups.base.includes(tag)) return "Base ingredients mapped…";
    return "Detecting ingredients in your kitchen…";
  }

  pantryBoxes.forEach((box) => {
    box.addEventListener("animationstart", (e) => {
      if (e.animationName !== "pudRecognitionIn") return; // ignore the infinite jitter keyframe
      if (!firstIngredientDetected) {
        firstIngredientDetected = true;
      }
      const tag = box.querySelector(".pud-recognition-tag");
      pantryCaption.textContent = groupCaptionFor(tag ? tag.textContent.trim() : "");
    });

    box.addEventListener("animationend", (e) => {
      if (e.animationName !== "pudRecognitionIn") return;
      finishedCount += 1;
      if (finishedCount >= totalBoxes) {
        pantryCaption.textContent = "Kitchen context assembled";
      }
    });
  });
}

// ─── UMAVI Cognitive Field ───
// Not a filtering list. UMAVI is not selecting from a list — it is an
// emergent field where latent-preference particles, driven by continuous
// forces, settle into 4 stable attractors: the 4 real recipes shown in the
// right-hand column (not abstract clusters). Canvas 2D, O(N) per frame —
// each particle reads only the global noise field and its own assigned
// attractor, never other particles, so this stays cheap at ~400 points.
// This is a decision moment, not an ambient generative toy: it runs once
// on viewport entry (chaos → convergence → attractor lock), then freezes
// permanently. No infinite loop, no cross-column connecting lines.
const coreParticleCount = 400;

// Context Frame — a single bordered block, not 6 individually-connected
// signals and not separate beams toward each cluster. "Context is not UI.
// Context is field metadata." One fade-in, one visual unit.
const coreContextFactors = [
  "Flavor fingerprint",
  "Complexity frontier",
  "Exploration appetite",
  "Weeknight efficiency",
  "Decision patterns",
];

// 4 attractors, mapped 1:1 to the 4 real recipes in the right-hand column —
// not abstract clusters. Diamond layout (top, left, right, bottom) so it
// reads as 4 distinct destinations, not a logo or technical diagram.
// Deterministic structural jitter (not full random) breaks the "clean
// grid" symmetry — fixed per-attractor offsets, max 8-10% deviation, kept
// small enough that no two attractors ever overlap or stack.
const coreAttractors = [
  { x: 0.5 + 0.04, y: 0.36 - 0.05 },   // Lemon feta chicken tray bake
  { x: 0.24 - 0.06, y: 0.62 + 0.03 },  // Warm broccoli rice bowl
  { x: 0.76 + 0.05, y: 0.62 - 0.04 },  // Green feta cherry salad
  { x: 0.5 - 0.03, y: 0.88 + 0.02 },   // Creamy yoghurt lemon chicken wraps
];

// ─── Global Field State Sync ───
// Recipe cards in the right-hand column react as a single system, not
// individually per attractor. This says "a set of 4 solutions has
// emerged from the field," never "this recipe won." No per-attractor
// sequencing, no fake temporal hierarchy — the field converges
// simultaneously, so the column responds simultaneously too.
function syncRecipeColumnGlobalState(settled) {
  const cards = document.querySelectorAll(".pud-recipe-card");
  cards.forEach((card) => {
    card.classList.toggle("field-settled", settled);
  });
}

// Recipe cards are hidden until the field settles (phase >= 3), then
// appear one by one — "UMAVI is crystallizing the 4 best options," not
// "4 cards appear instantly." Plain fade + translateY only, no scale, no
// pop, no bounce. 150ms stagger between each, ~600ms total.
// UMAVI Context Model — 5 dimensions, not one global score, so it reads
// as a model being built rather than a single filter metric. Context
// register only: no "identity," no "twin," no confidence score about the
// person. Each metric has its own duration and a slightly different
// easing "personality" so the set feels like a living system assembling
// itself, not 5 identical progress bars.
const coreContextMetrics = [
  { key: "flavor", target: 82, duration: 2200, personality: "regular" },
  { key: "routine", target: 68, duration: 3200, personality: "pause" },
  { key: "novelty", target: 91, duration: 1700, personality: "fast" },
  { key: "weeknight", target: 74, duration: 2800, personality: "steady" },
  { key: "decision", target: 88, duration: 2400, personality: "lateAccel" },
];

// Personality easing curves — applied to normalized progress t (0-1),
// returning eased progress (0-1). The viewer should never consciously
// notice the difference; the point is that the set doesn't move in
// lockstep.
function applyPersonality(t, personality) {
  switch (personality) {
    case "pause":
      // Small hesitation around the 40% mark, then continues.
      if (t < 0.35) return t * 1.1;
      if (t < 0.5) return 0.385 + (t - 0.35) * 0.15;
      return 0.4075 + (t - 0.5) * 1.185;
    case "fast":
      // Quick, slightly front-loaded (easeOut-ish).
      return 1 - Math.pow(1 - t, 2);
    case "steady":
      // Linear, deliberately even — "slow and stable."
      return t;
    case "lateAccel":
      // Slow start, accelerates toward the end (easeIn-ish).
      return Math.pow(t, 1.6);
    default:
      // Regular — gentle easeInOut.
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }
}

// Tracks each metric's real progress (0-1, the clean "eased" value, not
// the cosmetic jitter/wobble) so cluster formation can check "has enough
// evidence accumulated yet" via a simple threshold — option (b): a patch
// on top of the existing phase3 event model, not a full progress-driven
// render rewrite. Keeps phase3 as the trigger; this only gates how long
// after phase3 the cluster formation effect is allowed to actually start.
const coreMetricsProgress = {};

function getContextProgress() {
  const keys = Object.keys(coreMetricsProgress);
  if (keys.length === 0) return 0;
  const sum = keys.reduce((a, k) => a + coreMetricsProgress[k], 0);
  return sum / coreContextMetrics.length;
}

// Continuous growth via requestAnimationFrame — no discrete steps. Each
// call animates one bar from 0 to its target over its own duration.
// onThreshold35 fires once when progress crosses 35% (used to chain-
// trigger the next metric — sequential dependency, not a fixed stagger).
// onComplete fires once the bar has fully finished (used to reveal the
// percentage, and on the last metric, to trigger recipe cards).
function animateMetric(metric, onThreshold35, onComplete) {
  const fillEl = document.getElementById(`fill-${metric.key}`);
  const valueEl = document.getElementById(`value-${metric.key}`);
  if (!fillEl) return;
  const start = performance.now();
  let thresholdFired = false;
  coreMetricsProgress[metric.key] = 0;
  // Randomized per-metric trigger point (not a fixed 35% every time) plus
  // a minimum elapsed-time gate — together these remove the "A→B→C→D→E
  // deterministic pipeline" read, replacing it with something closer to
  // a system settling into itself at its own pace.
  const triggerThreshold = 0.28 + Math.random() * 0.17; // 0.28–0.45
  const minElapsedMs = 600 + Math.random() * 300; // 600–900ms

  function tick() {
    const elapsed = performance.now() - start;
    const t = Math.min(elapsed / metric.duration, 1);
    const eased = applyPersonality(t, metric.personality);
    coreMetricsProgress[metric.key] = eased;
    let pct = Math.min(eased * metric.target, metric.target);

    // Per-metric visual behavior variants — breaks the "5 identical bars,
    // just different speeds" symmetry. Purely cosmetic on top of pct;
    // never changes the underlying progress/threshold/completion logic.
    if (metric.key === "novelty" && t < 1) {
      // Exploration balance — a tiny noise jitter on the bar's edge, "a
      // little restless," not a clean uniform fill.
      pct += (Math.random() - 0.5) * 1.4;
      pct = Math.max(0, Math.min(pct, metric.target));
    } else if (metric.key === "decision" && t > 0.82) {
      // Decision patterns — a small settling oscillation near the end
      // (95–100% of its own target) instead of locking cleanly into
      // place, like it's still calibrating right up to the finish.
      const settleT = (t - 0.82) / 0.18;
      const wobble = Math.sin(settleT * Math.PI * 3) * (1 - settleT) * 2.2;
      pct = Math.max(0, Math.min(pct + wobble, metric.target));
    }

    fillEl.style.width = `${pct}%`;

    if (!thresholdFired && eased >= triggerThreshold && elapsed >= minElapsedMs) {
      thresholdFired = true;
      if (onThreshold35) onThreshold35();
    }

    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      // Percentage only appears once the bar has fully finished — fade
      // in, not a jump.
      if (valueEl) {
        valueEl.textContent = `${Math.round(metric.target)}%`;
        valueEl.classList.add("revealed");
      }
      if (onComplete) onComplete();
    }
  }
  requestAnimationFrame(tick);
}

function revealRecipeCardsStaggered() {
  const cards = document.querySelectorAll(".pud-recipe-card");
  cards.forEach((card, i) => {
    setTimeout(() => card.classList.add("in"), i * 250);
  });
}

function buildContextFrameHTML() {
  return coreContextFactors.map((f) => `<span>${f}</span>`).join("");
}

function initCoreMoment() {
  const stage = document.getElementById("core-moment-stage");
  const canvas = document.getElementById("core-field-canvas");
  const contextFrameEl = document.getElementById("core-context-frame");
  if (!stage || !canvas || !contextFrameEl) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Mobile: skip the simulation entirely, draw the 4 settled attractors
  // directly in one static frame — no animation, show the context frame
  // directly without timed fade-in.
  if (window.innerWidth < 1100) {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);
    coreAttractors.forEach((target) => {
      for (let j = 0; j < 6; j++) {
        const jx = target.x * rect.width + (Math.random() - 0.5) * 14;
        const jy = target.y * rect.height + (Math.random() - 0.5) * 14;
        ctx.beginPath();
        ctx.arc(jx, jy, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(166,255,77,0.7)";
        ctx.fill();
      }
    });
    contextFrameEl.innerHTML = buildContextFrameHTML();
    contextFrameEl.querySelectorAll("span").forEach((s) => s.classList.add("in"));
    stage.classList.add("settled");
    const mobileContextModel = document.getElementById("core-context-model");
    if (mobileContextModel) {
      mobileContextModel.classList.add("engaged");
      mobileContextModel.querySelectorAll(".core-context-row").forEach((row) => row.classList.add("in"));
      const mobileSubtitle = document.getElementById("core-context-model-subtitle");
      if (mobileSubtitle) mobileSubtitle.textContent = "Continuing to refine across 17 cooking sessions…";
      coreContextMetrics.forEach((metric) => {
        const fillEl = document.getElementById(`fill-${metric.key}`);
        const valueEl = document.getElementById(`value-${metric.key}`);
        if (fillEl) fillEl.style.width = `${metric.target}%`;
        if (valueEl) {
          valueEl.textContent = `${metric.target}%`;
          valueEl.classList.add("revealed");
        }
      });
    }
    document.querySelectorAll(".pud-recipe-card").forEach((c) => c.classList.add("in"));
    const mobileMoat = document.getElementById("pud-core-moat");
    if (mobileMoat) mobileMoat.classList.add("engaged");
    syncRecipeColumnGlobalState(true);
    return;
  }

  contextFrameEl.innerHTML = buildContextFrameHTML();

  // ─── Canvas + particle setup ───
  const rect = canvas.parentElement.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const W = rect.width;
  const H = rect.height;

  // ─── Background field — pure, independent context layer ───
  // 400 particles representing the space of possibilities. They are NEVER
  // assigned to an attractor, NEVER converge, NEVER change semantic role.
  // This is a deliberate architectural separation: the background is
  // context, the clusters (built separately below) are a projection of
  // decision onto that context — not the same objects wearing two hats.
  const particles = [];
  for (let i = 0; i < coreParticleCount; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: 0,
      vy: 0,
      noiseSeed: Math.random() * 1000,
      size: 0.8 + Math.random() * 1.1,
    });
  }

  // Pre-computed satellite resting positions per attractor — "this recipe
  // emerges from a region of possibilities," not a new simulation. 3-4
  // per cluster, small and heavily attenuated, never 8-15 (rejected
  // two iterations ago as excessive visual load). Each satellite has a
  // fixed anchor point plus a real velocity vector confined to an
  // expanded invisible sphere (22-32px) — explicitly NOT an orbit: no
  // rotation, no angle progression, just a slow velocity that
  // accumulates noise impulses, decays via damping, and is clamped back
  // inside the sphere if it strays — "breathing," not spinning.
  const coreSatellites = coreAttractors.map((a) => {
    const count = 9 + Math.floor(Math.random() * 2); // 9 to 10
    const sats = [];
    for (let s = 0; s < count; s++) {
      const angle = (Math.PI * 2 * s) / count + Math.random() * 0.6;
      const dist = 14 + Math.random() * 8;
      sats.push({
        angle,
        dist,
        seed: Math.random() * 1000,
        boundRadius: 26 + Math.random() * 12, // 26–38px
        wanderX: 0,
        wanderY: 0,
        vx: 0,
        vy: 0,
      });
    }
    return sats;
  });

  // Core-formation particles — "many possibilities merging into a
  // solution," not an instant cluster appearance. 8-12 light-green points
  // per attractor, starting at 18-28px from the future center, sucked
  // inward via (centerX - x) * 0.08 each frame for ~700ms. When they
  // arrive, they disappear and the definitive central node takes over.
  // This is ONLY a core-formation effect — it never touches the
  // satellites, the halo, the cluster positions, or anything else.
  const coreFormationParticles = coreAttractors.map(() => {
    const count = 30;
    const pts = [];
    for (let f = 0; f < count; f++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 18 + Math.random() * 10; // 18-28px
      pts.push({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      });
    }
    return pts;
  });

  // ─── Phase state machine (one-shot, same timing as before) ───
  // 0 = field (drift only), 1 = dimensioning (drift settles, context frame
  // fades in as a single unit — not staggered signals), 2 = clustering
  // (attraction force ramps up), 3 = settled (frozen — render loop stops
  // issuing new frames, recipe column syncs as a single global state).
  let phase = 0;
  const startTime = performance.now();
  let rafId = null;
  let frozen = false;
  let phase3StartTime = null;

  setTimeout(() => {
    phase = 1;
    stage.classList.add("dimensioning");
  }, 1500);

  setTimeout(() => {
    phase = 2;
    stage.classList.remove("dimensioning");
    stage.classList.add("clustering");
  }, 3000);

  setTimeout(() => {
    phase = 3;
    phase3StartTime = performance.now();

    // ─── Synchronized reveal narrative ───
    // Everything below fires from this single moment (phase >= 3) — the
    // same trigger that already activates the 4 clusters, the mini-
    // constellations, and the freeze. No independent timers, no new
    // phase: this is the progressive revelation of a result that already
    // exists, not a new computation step.

    // 5 context factors, staggered 120ms apart.
    const factorSpans = contextFrameEl.querySelectorAll("span");
    factorSpans.forEach((span, i) => {
      setTimeout(() => span.classList.add("in"), i * 120);
    });

    // UMAVI Context Model — sequential dependency chain, not a fixed
    // stagger: each metric only starts once the previous one crosses 35%
    // progress. "The system builds on itself," not 5 bars ticking off a
    // shared timer. Recipe cards trigger only when the LAST metric in the
    // chain fully completes — a true system-completion moment.
    const contextModelEl = document.getElementById("core-context-model");
    const subtitleEl = document.getElementById("core-context-model-subtitle");
    if (contextModelEl) {
      contextModelEl.classList.add("engaged");

      function startMetric(index) {
        if (index >= coreContextMetrics.length) return;
        const metric = coreContextMetrics[index];
        const row = contextModelEl.querySelector(`[data-metric="${metric.key}"]`);
        if (row) row.classList.add("in");
        if (index === 0 && subtitleEl) {
          subtitleEl.textContent = "Learning stable cooking patterns…";
        }
        animateMetric(
          metric,
          () => startMetric(index + 1), // onThreshold35 — chain the next one
          () => {
            // onComplete — only the last metric in the chain reaching
            // full completion marks the model as finished.
            if (index === coreContextMetrics.length - 1) {
              if (subtitleEl) subtitleEl.textContent = "Continuing to refine across 17 cooking sessions…";
              revealRecipeCardsStaggered();
            }
          }
        );
      }

      startMetric(0);
    }
  }, 5000);

  // ─── Background field motion ───
  // Pure independent local motion per particle — no shared global field,
  // no drift, ever. Same function called identically during the active
  // phase and after the freeze, so the background never has a moment of
  // stillness or a discontinuity at the freeze boundary. This is the
  // "star field that breathes, never a fluid that moves" model.
  function applyAmbientField() {
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // 400 fully independent entities. No shared state, no global
      // correlated motion of any kind — no ambientX/Y, no global sin/cos,
      // no renderOffsetX/Y. Each particle only ever reads its own vx/vy.
      p.vx += (Math.random() - 0.5) * 0.03;
      p.vy += (Math.random() - 0.5) * 0.03;
      p.vx *= 0.985;
      p.vy *= 0.985;
      p.x += p.vx;
      p.y += p.vy;

      // Toroidal wrap-around — not a clamp, not an accumulation point at
      // the edges. Density stays uniform permanently.
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    }
  }

  function step() {
    applyAmbientField();
  }

  function render() {
    ctx.clearRect(0, 0, W, H);

    // Background particle layer — pure context field, always gray, always
    // this exact alpha, for the entire lifetime of the visualization. No
    // per-particle role check: these particles are structurally incapable
    // of turning green, because they were never assigned an attractor in
    // the first place. "Cap objecte visual pot canviar de rol semàntic
    // durant el cicle de vida del sistema."
    const grayAlpha = 0.28;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const rx = p.x;
      const ry = p.y;

      ctx.beginPath();
      ctx.arc(rx, ry, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(190,190,190,${grayAlpha})`;
      ctx.fill();
    }

    // Cluster reveal — dual-state, field-driven morphing rather than a
    // binary "hidden until permitted" reveal. Clusters ALWAYS render now;
    // what changes continuously is the formation ratio, derived directly
    // from contextProgress (the Context Model's accumulated evidence) via
    // smoothstep. "Decision = gradient of state compression," not "decision
    // = final event." No attraction force, no movement toward the center:
    // positions stay final/fixed throughout — only opacity/scale/blend
    // between the formation particles and the consolidated central node
    // are driven by formation.
    if (phase >= 3) {
      const contextProgress = getContextProgress();
      // smoothstep(0.25, 1.0, contextProgress) — formation is 0 below
      // 0.25 evidence, ramps smoothly, reaches 1 only once the Context
      // Model has essentially finished.
      const sRaw = Math.max(0, Math.min((contextProgress - 0.25) / (1.0 - 0.25), 1));
      const formation = sRaw * sRaw * (3 - 2 * sRaw); // smoothstep
      const scale = 0.85 + 0.15 * formation;

      coreAttractors.forEach((a, idx) => {
        const gx = a.x * W;
        const gy = a.y * H;

        // Formation particles — always present, but their opacity fades
        // out as formation rises (they're "absorbed" into the forming
        // core, never abruptly removed). Pulled gently toward center at
        // a rate tied to formation itself, not a fixed-duration timer.
        const particleFade = Math.max(0, 1 - formation * 1.3);
        if (particleFade > 0.01) {
          coreFormationParticles[idx].forEach((pt) => {
            const pull = 0.02 + formation * 0.1;
            pt.x += (0 - pt.x) * pull;
            pt.y += (0 - pt.y) * pull;
            ctx.beginPath();
            ctx.arc(gx + pt.x, gy + pt.y, 1.3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(166,255,77,${0.55 * particleFade})`;
            ctx.fill();
          });
        }

        // Glow halo + central node — grow continuously with formation,
        // never an instant appearance. Radius +27%, opacity +25% from
        // the original baseline (26px, 0.10 alpha).
        if (formation > 0.01) {
          // Convergence gesture — glow intensity eases down ~18% as
          // contextProgress approaches its 0.99 completion point (the
          // same value already driving the freeze and the closing
          // statement, not a new timer). Reads as "the system's energy
          // is settling into its final understanding" right before the
          // signature statement appears.
          const convergence = Math.max(0, Math.min((contextProgress - 0.93) / 0.06, 1));
          const glowDamp = 1 - convergence * 0.18;

          const glowRadius = 33 * scale;
          const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, glowRadius);
          grad.addColorStop(0, `rgba(166,255,77,${0.125 * formation * glowDamp})`);
          grad.addColorStop(1, "rgba(166,255,77,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(gx, gy, glowRadius, 0, Math.PI * 2);
          ctx.fill();

          // Central node — the recipe itself. Fixed position, no
          // movement; only its size/opacity grow with formation.
          ctx.beginPath();
          ctx.arc(gx, gy, 2.4 * scale * formation, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(166,255,77,${0.85 * formation})`;
          ctx.fill();
        }

        // Satellite halo — "this recipe emerges from a region of
        // possibilities," not a list winner. 6-9 small, heavily
        // attenuated points per cluster, field-bounded continuous motion
        // (never an orbit) around each one's resting offset. Satellites
        // lock in as formation approaches completion, not on a fixed
        // post-reveal timer.
        const satEase = Math.max(0, Math.min((formation - 0.15) / 0.85, 1));
        coreSatellites[idx].forEach((sat) => {
          const restX = gx + Math.cos(sat.angle) * sat.dist;
          const restY = gy + Math.sin(sat.angle) * sat.dist;
          const sx = restX + sat.wanderX;
          const sy = restY + sat.wanderY;
          ctx.beginPath();
          ctx.arc(sx, sy, 1.1 * (0.4 + 0.6 * satEase), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(166,255,77,${0.32 * satEase})`;
          ctx.fill();
        });
      });
    }
  }

  let lastTime = performance.now();
  function loop() {
    const now = performance.now();
    const dt = Math.min((now - lastTime) / 16.7, 2); // normalized to ~60fps steps
    lastTime = now;

    step();
    render();

    if (phase >= 3 && getContextProgress() >= 0.99 && !frozen) {
      // Structural freeze: phase, attractors, context frame and the DOM
      // sync are now permanent and never change again. Only the residual
      // jitter loop below continues — "the system breathes," it does not
      // keep deciding.
      frozen = true;
      stage.classList.remove("clustering");
      stage.classList.add("settled");
      // Global Field State Sync: the recipe column reacts as a single
      // coherent system once the field has fully settled — not a
      // per-attractor highlight (no fake "this recipe won" ranking, no
      // sequential reveal). "A solution space has emerged," not "recipe X
      // beat the others."
      syncRecipeColumnGlobalState(true);
      // System Output Card — the closing line reveals at the exact same
      // completion signal as the structural freeze, not on its own timer.
      // It's the explicit final state the system was missing: a state
      // transition, not a caption sitting under the model.
      const moatEl = document.getElementById("pud-core-moat");
      if (moatEl) moatEl.classList.add("engaged");
      lastTime = performance.now();
      rafId = requestAnimationFrame(residualLoop);
      return;
    }
    if (!frozen) {
      rafId = requestAnimationFrame(loop);
    }
  }

  // ─── Freeze v3 — ambient field drift ───
  // Runs forever after the structural freeze, but this is one shared
  // global offset applied to all background particles — an environmental
  // field shift, not 400 independent agents each computing their own
  // trajectory. The 4 attractors, the context frame, and the recipe-
  // column sync are structural and never touched here; only this single
  // ambient vector moves, at near-imperceptible amplitude.
  function residualLoop() {
    const now = performance.now();
    const t = (now - startTime) / 1000;
    lastTime = now;

    // Same unified field function used during the active phase — no
    // discontinuity at the freeze boundary, the background never has a
    // moment where it stops moving and then restarts differently.
    applyAmbientField();

    // Satellite bounded-field breathing — see step 2 below, computed
    // independently per cluster (cheap: 6-12 points per attractor, not
    // a per-particle simulation).
    stepSatellites(t);

    render();
    rafId = requestAnimationFrame(residualLoop);
  }

  function stepSatellites(t) {
    coreSatellites.forEach((sats) => {
      sats.forEach((sat) => {
        // Field-bounded swarm model: velocity accumulates layered noise
        // (multiple sin/cos frequencies per axis, so motion never reads
        // as a simple periodic cycle), damps continuously, and position
        // integrates from velocity — then a soft spherical constraint
        // pulls back in gently (0.95 factor, not a hard bounce or a
        // snap) if the satellite strays past its bound radius. This
        // gives a "living cloud," never an orbit: no angle progression,
        // no rotation, no circular trajectory.
        const noiseX = Math.sin(t * 0.31 + sat.seed) + Math.sin(t * 0.83 + sat.seed * 2.1) * 0.6;
        const noiseY = Math.cos(t * 0.27 + sat.seed * 1.7) + Math.cos(t * 0.76 + sat.seed * 0.9) * 0.6;
        sat.vx += noiseX * 0.018;
        sat.vy += noiseY * 0.018;
        sat.vx *= 0.96;
        sat.vy *= 0.96;
        sat.wanderX += sat.vx;
        sat.wanderY += sat.vy;

        const r = Math.sqrt(sat.wanderX * sat.wanderX + sat.wanderY * sat.wanderY);
        if (r > sat.boundRadius) {
          sat.wanderX *= 0.95;
          sat.wanderY *= 0.95;
        }
      });
    });
  }

  stage.classList.add("fielding");
  rafId = requestAnimationFrame(loop);
}

const coreMomentColumn = document.getElementById("umavi-core-moment");
if (coreMomentColumn) {
  let coreMomentStarted = false;
  const coreObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !coreMomentStarted) {
          coreMomentStarted = true;
          initCoreMoment();
          coreObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  coreObs.observe(coreMomentColumn);
}

// ─── Hero Early Access form ───
const heroEarlyAccessForm = document.getElementById("hero-early-access-form");

if (heroEarlyAccessForm) {
  heroEarlyAccessForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = new FormData(heroEarlyAccessForm).get("email");
    const microcopy = heroEarlyAccessForm.nextElementSibling;
    if (microcopy) {
      microcopy.textContent = `${email} is on the list. See you further down the page.`;
    }
    heroEarlyAccessForm.reset();
  });
}

// ─── Waitlist form ───
const waitlistForm = document.getElementById("waitlist-form");
const formFeedback = document.getElementById("form-feedback");

if (waitlistForm && formFeedback) {
  waitlistForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(waitlistForm);
    const email = data.get("email");
    formFeedback.textContent = `${email} is on the list. We'll start with people who want dinner to feel lighter, calmer and more personal.`;
    formFeedback.style.color = "var(--accent)";
    waitlistForm.reset();
  });
}
