import { Easing, FadeIn, FadeInDown, ReduceMotion } from 'react-native-reanimated';

// Phase 5D.3 — BADAWI motion language.
//
// Doctrine: motion clarifies structure and depth; it never decorates for its
// own sake (docs/design/README.md locks "movement over static visuals, WHERE
// APPROPRIATE"; `badawi-visual-design`, "Motion" — "do not overanimate").
//
// The 5D.3 language has exactly four jobs:
//   1. TERRAIN SETTLES — layered dune/strata art resolves far→near on mount,
//      which is what makes an illustration read as depth instead of a flat
//      graphic.
//   2. PLATES ARRIVE — content plates rise onto the page, in reading order.
//   3. WAYPOINTS REGISTER — map nodes appear after their route line, so the
//      spatial relationship (path → destination) is legible.
//   4. TOUCH RESPONDS — a press produces a small, immediate physical
//      reaction. No hover-glows, no pulsing, no attention-seeking loops.
//
// ACCESSIBILITY: every entering animation below calls
// `.reduceMotion(ReduceMotion.System)`, so it no-ops automatically under the
// OS "reduce motion" setting. Continuous/imperative motion (scroll parallax)
// is gated separately by `useReducedMotion()` in src/design/use-reduced-motion.ts,
// because a shared-value driven transform cannot self-disable the way a
// declarative entering animation can.
//
// FIELD MODE / SAFETY ACCEPTANCE: nothing in this file is used on Field Mode,
// Safety Acceptance, or any Complete/Stop control. Those screens are fully
// static by locked requirement — no entering animation, no parallax, no press
// scale. See src/app/(main)/challenge/[challengeId]/field.tsx.

export const durations = Object.freeze({
  /** Press feedback. Must feel instantaneous. */
  instant: 120,
  fast: 180,
  base: 260,
  slow: 420,
  /** Terrain settling and the Welcome identity reveal only. */
  atmospheric: 900,
} as const);

// A single decelerating curve for arrivals — content comes to rest rather
// than snapping. Matches the "settling sand" feel of the illustration.
export const easings = Object.freeze({
  settle: Easing.bezier(0.22, 1, 0.36, 1),
  standard: Easing.bezier(0.4, 0, 0.2, 1),
} as const);

/** Screen's primary content on mount: a restrained rise-and-fade. */
export const contentEnter = FadeInDown.duration(durations.base)
  .springify()
  .damping(18)
  .reduceMotion(ReduceMotion.System);

/** A plain fade, for supplementary elements where a rise would be redundant. */
export const fadeEnter = FadeIn.duration(durations.base).reduceMotion(ReduceMotion.System);

/** Staggered list/plate arrival, in reading order. Capped so long lists don't crawl. */
export function staggeredEnter(index: number) {
  return FadeInDown.duration(durations.base)
    .delay(Math.min(index, 8) * 45)
    .springify()
    .damping(18)
    .reduceMotion(ReduceMotion.System);
}

/**
 * TERRAIN SETTLES — a terrain stratum resolving into place. `depth` is 0 for
 * the farthest layer, increasing toward the viewer; nearer layers arrive
 * later and travel slightly further, which is what produces parallax depth
 * on a still composition. Slower and softer than content motion: this is
 * atmosphere, not interface.
 */
export function terrainSettle(depth: number) {
  return FadeInDown.duration(durations.atmospheric)
    .delay(depth * 90)
    .easing(easings.settle)
    .reduceMotion(ReduceMotion.System);
}

/**
 * WAYPOINTS REGISTER — a map node / station marker appearing. Deliberately
 * delayed behind its route line and its plate so the eye reads path first,
 * destination second.
 */
export function waypointEnter(index: number) {
  return FadeIn.duration(durations.slow)
    .delay(220 + Math.min(index, 8) * 70)
    .reduceMotion(ReduceMotion.System);
}

/** The Welcome brand lockup. The one place a slow, deliberate reveal is earned. */
export const identityEnter = FadeInDown.duration(durations.atmospheric)
  .delay(180)
  .springify()
  .damping(22)
  .reduceMotion(ReduceMotion.System);

/** Supporting Welcome copy, arriving after the mark has landed. */
export function identitySupportEnter(order: number) {
  return FadeIn.duration(durations.slow)
    .delay(620 + order * 180)
    .reduceMotion(ReduceMotion.System);
}

/**
 * TOUCH RESPONDS — the single press-scale value used by every pressable in
 * the app, so touch feedback is one consistent physical reaction. Applied as
 * a plain `transform` (not a spring) for zero-latency response.
 */
export const pressScale = 0.978;

/**
 * Parallax rate for a terrain layer, as a fraction of scroll offset. 0 = the
 * layer is pinned to the page; 1 = it scrolls with the content. Far layers
 * move least. Consumed only where `useReducedMotion()` reports false.
 */
export const parallaxRate = Object.freeze({
  sky: 0.12,
  far: 0.22,
  mid: 0.38,
  near: 0.55,
} as const);
