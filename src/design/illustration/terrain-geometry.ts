// ─────────────────────────────────────────────────────────────────────────
// BADAWI TERRAIN GEOMETRY
// ─────────────────────────────────────────────────────────────────────────
//
// Hand-authored dune/strata paths for the illustration system. All scenes are
// drawn in a fixed 400 × 300 viewBox and rendered with
// `preserveAspectRatio="xMidYMax slice"`, which fills the available width and
// crops the sides rather than stretching — so curves keep their authored
// shape on a 320pt phone and a 1440pt desktop alike.
//
// Four strata, authored far → near. Atmospheric perspective is doing the
// depth work: far ridges sit higher, are flatter, and are drawn in the paler
// terrain roles; near ridges sit lower, undulate more, and take the deepest
// role. That ramp is what makes a flat SVG read as distance.
//
// ── CONTENT GOVERNANCE ───────────────────────────────────────────────────
// These are abstract landform silhouettes: smooth curves and a filled ground
// plane. They depict no cultural artifact, dress, settlement, structure,
// practice, or symbol, and they encode NO field or safety information —
// nothing here tells a learner where water collects, which slope is safe,
// where to shelter, or how to navigate. That is deliberate and required:
// `badawi-visual-design` forbids illustration functioning as de facto field
// guidance, and every V1 Challenge is still RQ0 (unresearched). If a future
// pass wants terrain that *teaches* landform reading, that is researched
// safety content and must go through the research/safety workstream first —
// it cannot enter through the illustration layer.

export const SCENE_WIDTH = 400;
export const SCENE_HEIGHT = 300;
export const SCENE_VIEWBOX = `0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`;

/** Where sky meets the farthest terrain, in scene units. */
export const SCENE_HORIZON_Y = 172;

/**
 * Filled strata, index 0 = farthest. Each path closes to the bottom of the
 * viewBox so it fills as a solid landform.
 */
export const STRATA_PATHS = [
  // 0 — far: high, low-amplitude ripples reading as haze-flattened distance.
  'M0 300 L0 180 C 34 176 58 168 92 170 C 130 172 152 182 190 180 C 232 178 258 166 296 168 C 334 170 368 180 400 174 L400 300 Z',
  // 1 — mid-far: one broad crest left of centre.
  'M0 300 L0 214 C 30 212 52 196 96 190 C 146 183 176 206 214 212 C 258 219 300 200 344 196 C 372 193 388 202 400 200 L400 300 Z',
  // 2 — mid-near: crest shifted right, steeper leeward fall.
  'M0 300 L0 250 C 40 248 74 244 116 240 C 168 235 206 218 254 222 C 300 226 330 246 366 238 C 382 234 392 240 400 238 L400 300 Z',
  // 3 — near: the foreground dune, tallest and most asymmetric.
  'M0 300 L0 292 C 30 290 48 256 92 252 C 146 247 182 278 238 284 C 292 290 340 276 400 270 L400 300 Z',
] as const;

/**
 * Contour hairlines that trace just under a crest — the "drawn on the page"
 * half of the visual language, laid over the painted terrain. Stroked only,
 * never filled. Each one shadows the stratum of the same index + 1.
 */
export const CONTOUR_PATHS = [
  'M0 198 C 30 196 52 182 96 176 C 146 169 176 190 214 196 C 258 203 300 186 344 182 C 372 179 388 187 400 185',
  'M0 262 C 40 260 74 256 116 252 C 168 247 206 231 254 235 C 300 239 330 258 366 250 C 382 246 392 252 400 250',
  'M0 302 C 30 300 48 268 92 264 C 146 259 182 289 238 295 C 292 300 340 287 400 281',
] as const;

/**
 * A fixed star field. Deliberately a hand-authored constant rather than
 * `Math.random()`: random placement would re-roll on every re-render, making
 * the sky visibly twitch and making any snapshot test non-deterministic.
 * Positions are kept above `SCENE_HORIZON_Y` so no star ever sits in terrain.
 */
export const STAR_FIELD = [
  { x: 28, y: 34, r: 1.5 },
  { x: 62, y: 68, r: 1 },
  { x: 84, y: 22, r: 1.2 },
  { x: 112, y: 92, r: 0.9 },
  { x: 138, y: 44, r: 1.6 },
  { x: 166, y: 18, r: 1 },
  { x: 178, y: 104, r: 1.1 },
  { x: 204, y: 60, r: 1.3 },
  { x: 232, y: 30, r: 0.9 },
  { x: 248, y: 122, r: 1 },
  { x: 268, y: 78, r: 1.4 },
  { x: 292, y: 40, r: 1 },
  { x: 318, y: 100, r: 1.2 },
  { x: 340, y: 26, r: 1.5 },
  { x: 356, y: 66, r: 0.9 },
  { x: 380, y: 46, r: 1.1 },
  { x: 46, y: 128, r: 1 },
  { x: 96, y: 148, r: 0.8 },
  { x: 152, y: 136, r: 1 },
  { x: 218, y: 152, r: 0.8 },
  { x: 300, y: 146, r: 0.9 },
  { x: 366, y: 130, r: 1 },
] as const;

/** The four-point "plotted fix" star, reused from the brand mark at scene scale. */
export function fixStarPath(cx: number, cy: number, outer: number): string {
  const inner = outer * 0.38;
  const d = inner / Math.SQRT2;
  return [
    `M ${cx} ${cy - outer}`,
    `L ${cx + d} ${cy - d}`,
    `L ${cx + outer} ${cy}`,
    `L ${cx + d} ${cy + d}`,
    `L ${cx} ${cy + outer}`,
    `L ${cx - d} ${cy + d}`,
    `L ${cx - outer} ${cy}`,
    `L ${cx - d} ${cy - d}`,
    'Z',
  ].join(' ');
}
