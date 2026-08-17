import { palette } from './palette';

// BADAWI semantic color roles.
//
// ── Phase 3 approved roles (docs/design/README.md, "Approved Semantic Color
//    Roles") ─────────────────────────────────────────────────────────────
//    background / textPrimary / textSecondary / surfaceWarm were approved and
//    contrast-verified in Phase 3 and are unchanged here.
//
// ── Phase 5D.3 roles (this file) ────────────────────────────────────────
//    Added under the `badawi-visual-design` skill's explicit, scoped
//    authority to "define the implementation-level semantic roles needed for
//    coherent design". No palette hex value is changed — every role below
//    points at one of the seven locked palette colors. Every new text/
//    background pairing has been contrast-measured (not assumed); the
//    measured ratio is stated at each role.
//
//    Full measured matrix for the locked palette (sRGB, WCAG 2.x):
//      brown/lightNeutral 10.43   indigo/lightNeutral 10.17
//      brown/ecru          8.63   indigo/ecru          8.41
//      lightNeutral/olive  5.17   terracotta/lightNeutral 4.39
//      ecru/olive          4.28   ecru/terracotta      3.64
//      sageGreen/lightNeutral 3.25  sageGreen/brown    3.21
//      sageGreen/indigo    3.13   sageGreen/ecru       2.69
//      terracotta/brown    2.37   terracotta/indigo    2.31
//      olive/indigo        1.97   brown/olive          2.02
//      sageGreen/olive     1.59   terracotta/olive     1.18
//      ecru/lightNeutral   1.21   terracotta/sageGreen 1.35
//      brown/indigo        1.03
//
//    NOTE the two hard consequences of that matrix, enforced by the role
//    names below:
//      * Terracotta reaches only 4.39:1 on Light Neutral and 3.64:1 on Ecru
//        — below the 4.5:1 AA threshold for normal text. It is therefore
//        defined ONLY as a non-text graphic accent (`accent*`). There is
//        deliberately no `textAccent` role. Do not set Terracotta as a
//        `color` on body-sized text.
//      * Sage Green and Olive reach only 2.7–3.3:1 against the surfaces we
//        use, so they are defined only as illustration/terrain fills
//        (`terrain*`), never as text or as a text-bearing background.
//
//    No role below implies safety, status, success, warning, or error
//    semantics. BADAWI has no error/success color and attempt outcomes are
//    never color-coded (docs/safety/README.md; CLAUDE.md).
export const colors = Object.freeze({
  // ── Phase 3 approved (unchanged) ──────────────────────────────────────
  /** App background. Light Neutral. Verified: 10.43:1 vs textPrimary. */
  background: palette.lightNeutral,
  /** Primary text on `background`/`surfaceWarm`. Brown. 10.43:1 / 8.63:1. */
  textPrimary: palette.brown,
  /** Secondary/deep text on `background`/`surfaceWarm`. Indigo. 10.17:1 / 8.41:1. */
  textSecondary: palette.indigo,
  /** Warm raised surface (plates, chips, buttons). Ecru. */
  surfaceWarm: palette.ecru,

  // ── 5D.3: deep surface ────────────────────────────────────────────────
  /**
   * The deep "night/depth" surface: Field-adjacent plates, the app icon
   * ground, the deepest terrain stratum, and the Welcome sky. Indigo.
   * Text on it must be `textOnDeep` (10.17:1) or `textOnDeepMuted` (8.41:1).
   */
  surfaceDeep: palette.indigo,
  /** Primary text on `surfaceDeep`. Light Neutral. Measured 10.17:1 — AAA. */
  textOnDeep: palette.lightNeutral,
  /** Secondary text on `surfaceDeep`. Ecru. Measured 8.41:1 — AAA. */
  textOnDeepMuted: palette.ecru,

  // ── 5D.3: wayfinding accent (GRAPHIC ONLY) ────────────────────────────
  /**
   * The single wayfinding accent: the active waypoint ring on the Blueprint
   * Map, the plotted route line, the brand mark's orientation star, rule
   * emphasis. Terracotta.
   *
   * GRAPHIC USE ONLY. Measured 4.39:1 on `background` and 3.64:1 on
   * `surfaceWarm` — both clear the 3:1 WCAG 1.4.11 threshold for
   * non-text graphics and UI component boundaries, and both fall short of
   * the 4.5:1 needed for normal-size text. Never use as a text `color`.
   *
   * This is an ACCENT, not a status color: it marks "you are here / this is
   * the live territory", never "good", "done", "correct", or "danger".
   */
  accent: palette.terracotta,
  // ── 5D.3: terrain / illustration fills (NON-TEXT ONLY) ────────────────
  /**
   * Illustration fills for layered terrain, far→near. These are picture
   * colors: they carry no meaning, no status, and no text. Ordered by
   * apparent depth so an illustration reads as receding distance.
   *
   * Deepest-terrain and lit-sand fills deliberately reuse `surfaceDeep`
   * (Indigo) and `surfaceWarm` (Ecru) rather than getting duplicate
   * `terrainNear`/`terrainSand` aliases — one role per colour, no
   * speculative tokens.
   */
  terrainFar: palette.sageGreen,
  terrainMid: palette.olive,
  /**
   * The warm near-ground stratum. Brown. Added after rendering the terrain
   * scenes and seeing that a Sage/Olive/Indigo-only ramp read as a green
   * pasture rather than desert — the warm end of the locked palette has to
   * carry the foreground for the environment to read correctly.
   */
  terrainGround: palette.brown,

  // ── 5D.3: notebook line-work ──────────────────────────────────────────
  /**
   * Hairline rules, survey ticks, plate borders, contour lines — the
   * "drawn on paper" layer over illustration. Brown, used at low opacity by
   * consumers via `opacity`/`rgba`-free composition (a stroke color, not a
   * text color).
   */
  rule: palette.brown,
  /** Line-work on `surfaceDeep` — the same drawn layer, inverted. Ecru. */
  ruleOnDeep: palette.ecru,
} as const);

export type Colors = typeof colors;
export type ColorRole = keyof Colors;

// Line/fill opacities used with `rule`/`ruleOnDeep` so hairlines stay
// consistently weighted instead of each screen inventing an alpha.
export const lineOpacity = Object.freeze({
  /** Barely-there survey grid / contour hatching. */
  faint: 0.08,
  /** Standard plate border and divider. */
  hairline: 0.16,
  /** Emphasized rule (section boundary, active plate). */
  strong: 0.32,
} as const);
