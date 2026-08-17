// Phase 5D.3 — corner-radius scale.
//
// Implementation-level only (docs/design/README.md lists radii as
// unspecified). The locked Phase 3 direction is "rounded, tactile", but the
// 5D.3 visual language pairs that softness with drawn, precise line-work —
// so the scale is deliberately restrained at the small end (chips, plates)
// and generous at the large end (illustration frames, terrain windows),
// which is what produces the "printed plate laid on terrain" feel rather
// than uniformly-pillowed SaaS cards.
export const radii = Object.freeze({
  /** Ticks, small marks, inline chips. */
  xs: 6,
  /** Pills, chips, small plates. */
  sm: 12,
  /** Buttons, station markers' surrounding plates. */
  md: 16,
  /** Standard plate / card. */
  lg: 22,
  /** Illustration frames, hero terrain windows, station cards. */
  xl: 30,
  /** The full-bleed map canvas window. */
  xxl: 40,
  pill: 999,
} as const);

export type Radii = typeof radii;
export type RadiusToken = keyof Radii;
