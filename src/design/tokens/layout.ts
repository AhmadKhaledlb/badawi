// Phase 5D.3 — responsive layout tokens.
//
// Mobile is primary (docs/design/README.md; `badawi-visual-design`,
// "Responsive design"), but tablet and web/desktop must be deliberately
// composed rather than left to stretch a phone layout across a 1440px
// viewport. These tokens exist so every screen makes that decision the same
// way instead of each one inventing a max-width.
//
// Breakpoints are viewport-width thresholds, resolved at render time from
// `useWindowDimensions()` via `useLayout()` (src/design/use-layout.ts) — not
// from a platform check, so a foldable/split-view/resized browser window is
// handled correctly.

export const breakpoints = Object.freeze({
  /** Below this: a phone. Single column, full-bleed illustration. */
  compact: 0,
  /** Tablet portrait and up: wider gutters, two-column map/grid where earned. */
  medium: 700,
  /** Desktop web: content is centered and framed; illustration never stretches. */
  expanded: 1080,
} as const);

export type BreakpointName = keyof typeof breakpoints;

export const contentWidth = Object.freeze({
  /**
   * Reading measure for body/detail screens (Challenge, Prepare, Review,
   * Settings). Caps the line length so desktop text doesn't run to 1400px.
   */
  reading: 620,
  /**
   * Measure for spatial/map screens (Blueprint Map, Pack route, Unit chain).
   * Wider than `reading` because the route composition needs lateral room,
   * but still bounded so the terrain art keeps its intended proportions.
   */
  canvas: 860,
  /**
   * The Welcome identity moment — a narrow, centered lockup over full-bleed
   * art. The art itself is unbounded; only the type column is capped.
   */
  identity: 420,
} as const);

/** Screen edge padding per breakpoint. Grows with the viewport. */
export const gutter = Object.freeze({
  compact: 20,
  medium: 32,
  expanded: 40,
} as const);

/**
 * Minimum interactive target size. 48dp is the Android/Material and WCAG
 * 2.5.5-adjacent floor; Field Mode deliberately goes far above it (see
 * `fieldControl`) because it is operated outdoors, possibly gloved, under
 * cognitive load.
 */
export const touchTarget = Object.freeze({
  minimum: 48,
  comfortable: 56,
  /** Field Mode's Complete/Stop controls. Both are always this size. */
  fieldControl: 72,
} as const);
