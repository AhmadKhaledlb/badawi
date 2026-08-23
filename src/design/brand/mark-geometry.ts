// ─────────────────────────────────────────────────────────────────────────
// BADAWI brand mark — "WAYPOINT" (RETIRED, Phase 5A)
// ─────────────────────────────────────────────────────────────────────────
//
// The Waypoint mark is retired. `src/design/brand/badawi-mark.tsx` (the
// in-app mark) now renders the approved Phase 5A raster "1A" mark from
// `assets/brand/v2/` instead of this geometry, and no longer imports this
// file.
//
// This file is kept ONLY because `scripts/generate-brand-assets.js` still
// reads it to rasterize the native app icon / adaptive icon / favicon
// assets in `assets/brand/` (icon.png, adaptive-icon-*.png, favicon.png)
// referenced from `app.json` — those have not been re-exported from the
// approved Phase 5A mark yet (no safe-zone-padded icon crop has been
// supplied), so `app.json` and this generator remain on the old mark for
// those three. (`app.json`'s native splash `image` has been re-pointed
// directly at `assets/brand/v2/badawi-mark-light.png` — that one didn't
// need re-export, just a config change.) Do not delete this file, or run
// the generator to re-derive new icon output, without confirming the icon
// re-export is actually approved first.
//
// ── CONCEPT ──────────────────────────────────────────────────────────────
// An observation instrument framing a desert horizon, with a navigational
// star fixed above it. Five elements, each mapping to something BADAWI
// actually teaches:
//
//   bezel      a circular ring          — the field of view; what you can
//                                         observe from where you stand
//   horizon    a hairline rule          — the READ/observe boundary
//   farRidge   a stroked terrain crest  — distance, and depth of terrain
//   nearDune   a filled terrain crest   — the ground you actually move on
//   star       a four-point star        — the fix you navigate by
//
// Reading outward, that is BADAWI's own arc: observe → orient → move.
//
// ── CULTURAL GOVERNANCE ──────────────────────────────────────────────────
// Every element is purely geometric and environmental: a circle, a straight
// rule, two smooth curves, and a symmetric four-point star. Nothing here
// derives from, imitates, or stylizes a tribal, Bedouin, indigenous, or
// otherwise culturally specific symbol, textile pattern, architectural form,
// or ornamental motif. The outer form is deliberately a plain CIRCLE and not
// an arch/dome, specifically to avoid reading as a culturally-loaded
// architectural reference. This is required by CLAUDE.md's
// cultural-representation rules and docs/curriculum/v1-curriculum-spec.md
// §12 — not a stylistic preference. See the completion report: a human
// cultural reviewer should still sanity-check the final mark before it is
// treated as approved brand.
//
// ── WHERE THE NUMBERS LIVE ───────────────────────────────────────────────
// The raw values are in ./mark-geometry.json, not in this file. That JSON is
// imported here for the app and required directly by
// scripts/generate-brand-assets.js for the icon/favicon/splash rasteriser, so
// there is exactly one definition of the mark's shape and the app icon can
// never drift from the mark rendered inside the app. This module adds the
// documentation, the derived `terrainClip`, and the types.
//
// ── COORDINATE SYSTEM ────────────────────────────────────────────────────
// A 48 × 48 viewBox. Terrain paths deliberately overshoot the box
// horizontally (x from 0 to 48 and beyond) because they are clipped to
// `terrainClip` — that is what makes the terrain read as continuing past the
// instrument's field of view rather than being a shape that happens to fit
// inside a circle.

import geometry from './mark-geometry.json';

export const MARK_VIEWBOX_SIZE: number = geometry.viewBoxSize;
export const MARK_VIEWBOX = `0 0 ${MARK_VIEWBOX_SIZE} ${MARK_VIEWBOX_SIZE}`;

/** The instrument ring. Stroked, never filled. */
export const bezel = geometry.bezel;

/**
 * Terrain is clipped to the ring's INNER edge so strata sit inside the
 * instrument rather than colliding with its stroke.
 */
export const terrainClip = {
  cx: bezel.cx,
  cy: bezel.cy,
  r: bezel.r - bezel.strokeWidth / 2,
} as const;

/** The observation boundary. Clipped to `terrainClip`. */
export const horizon = geometry.horizon;

/** Far terrain crest — stroked, reads as distance. Clipped to `terrainClip`. */
export const farRidgePath: string = geometry.farRidgePath;
export const farRidgeStrokeWidth: number = geometry.farRidgeStrokeWidth;

/** Near terrain — filled, reads as the ground underfoot. Clipped to `terrainClip`. */
export const nearDunePath: string = geometry.nearDunePath;

/**
 * The orientation star: a symmetric four-point star, outer radius 5.0 and
 * inner radius 1.9, centred at (32, 13). Placed in the upper-right quadrant
 * to counterweight the terrain crest, which peaks left of centre.
 */
export const starPath: string = geometry.starPath;

/**
 * Elements dropped in the `compact` variant (≤ 24px: favicon, tab bar, inline
 * watermark). At small sizes the horizon rule and the north tick collapse into
 * visual noise, so the compact mark keeps only ring + terrain + star, which
 * stays readable down to 16px.
 */
export const COMPACT_OMITS = ['horizon', 'farRidge'] as const;
