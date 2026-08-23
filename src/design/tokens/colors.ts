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
//    Full measured matrix for the locked palette (sRGB, WCAG 2.x). Values
//    are unchanged from Phase 3 — only the palette key names below were
//    renamed in Phase 5A (see ./palette.ts); ink=brown, night=indigo,
//    deepSage=olive, sage=sageGreen, clay=terracotta, bone=ecru, light=
//    lightNeutral:
//      ink/light      10.43   night/light      10.17
//      ink/bone        8.63   night/bone        8.41
//      light/deepSage  5.17   clay/light        4.39
//      bone/deepSage   4.28   bone/clay         3.64
//      sage/light      3.25   sage/ink          3.21
//      sage/night      3.13   sage/bone         2.69
//      clay/ink        2.37   clay/night        2.31
//      deepSage/night  1.97   ink/deepSage      2.02
//      sage/deepSage   1.59   clay/deepSage     1.18
//      bone/light      1.21   clay/sage         1.35
//      ink/night       1.03
//
//    NOTE the two hard consequences of that matrix, enforced by the role
//    names below:
//      * Clay reaches only 4.39:1 on Light and 3.64:1 on Bone — below the
//        4.5:1 AA threshold for normal text. It is therefore defined ONLY
//        as a non-text graphic accent (`accent*`). There is deliberately no
//        `textAccent` role. Do not set Clay as a `color` on body-sized text.
//      * Sage and Deep Sage reach only 2.7–3.3:1 against the surfaces we
//        use, so they are defined only as illustration/terrain fills
//        (`terrain*`), never as text or as a text-bearing background.
//
//    The four Phase 5A palette additions (shadeSage, drySage, paleSage,
//    sunClay — see ./palette.ts for their measured contrast) are not yet
//    assigned a semantic role here; that's deferred to the shared-primitives
//    step, once it's clear which surfaces/graphics actually need them.
//
//    No role below implies safety, status, success, warning, or error
//    semantics. BADAWI has no error/success color and attempt outcomes are
//    never color-coded (docs/safety/README.md; CLAUDE.md).
export const colors = Object.freeze({
  // ── Phase 3 approved (unchanged values, renamed palette keys) ─────────
  /** App background. Light. Verified: 10.43:1 vs textPrimary. */
  background: palette.light,
  /** Primary text on `background`/`surfaceWarm`. Ink. 10.43:1 / 8.63:1. */
  textPrimary: palette.ink,
  /** Secondary/deep text on `background`/`surfaceWarm`. Night. 10.17:1 / 8.41:1. */
  textSecondary: palette.night,
  /** Warm raised surface (plates, chips, buttons). Bone. */
  surfaceWarm: palette.bone,

  // ── 5D.3: deep surface ────────────────────────────────────────────────
  /**
   * The deep "night/depth" surface: Field-adjacent plates, the app icon
   * ground, the deepest terrain stratum, and the Welcome sky. Night.
   * Text on it must be `textOnDeep` (10.17:1) or `textOnDeepMuted` (8.41:1).
   */
  surfaceDeep: palette.night,
  /** Primary text on `surfaceDeep`. Light. Measured 10.17:1 — AAA. */
  textOnDeep: palette.light,
  /** Secondary text on `surfaceDeep`. Bone. Measured 8.41:1 — AAA. */
  textOnDeepMuted: palette.bone,

  // ── 5D.3: wayfinding accent (GRAPHIC ONLY) ────────────────────────────
  /**
   * The single wayfinding accent: the active Desert ring on the Region map,
   * the plotted route line, the brand mark's orientation star, rule
   * emphasis. Clay.
   *
   * GRAPHIC USE ONLY. Measured 4.39:1 on `background` and 3.64:1 on
   * `surfaceWarm` — both clear the 3:1 WCAG 1.4.11 threshold for
   * non-text graphics and UI component boundaries, and both fall short of
   * the 4.5:1 needed for normal-size text. Never use as a text `color`.
   *
   * This is an ACCENT, not a status color: it marks "you are here / this is
   * the live territory", never "good", "done", "correct", or "danger".
   */
  accent: palette.clay,
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
  terrainFar: palette.sage,
  terrainMid: palette.deepSage,
  /**
   * The warm near-ground stratum. Ink. Added after rendering the terrain
   * scenes and seeing that a Sage/Deep Sage/Night-only ramp read as a green
   * pasture rather than desert — the warm end of the locked palette has to
   * carry the foreground for the environment to read correctly.
   */
  terrainGround: palette.ink,

  // ── 5D.3: notebook line-work ──────────────────────────────────────────
  /**
   * Hairline rules, survey ticks, plate borders, contour lines — the
   * "drawn on paper" layer over illustration. Ink, used at low opacity by
   * consumers via `opacity`/`rgba`-free composition (a stroke color, not a
   * text color).
   */
  rule: palette.ink,
  /** Line-work on `surfaceDeep` — the same drawn layer, inverted. Bone. */
  ruleOnDeep: palette.bone,

  // ── Phase 5A: warm accent for use ON a deep/night surface ──────────────
  /**
   * The wayfinding accent, for placement directly on `surfaceDeep`/Night —
   * Explore's world canvas, where the one lit (open) territory needs to
   * read warm against Night the same way `accent` reads warm against
   * `background`/`surfaceWarm` elsewhere.
   *
   * `accent` (Clay) cannot serve this role: measured only 2.31:1 against
   * Night (src/design/tokens/palette.ts's matrix), under the 3:1 WCAG
   * 1.4.11 floor even for graphics. Sun Clay, one of the Phase 5A palette
   * additions, is the first color that actually clears it on Night —
   * measured 4.76:1 vs night, 4.88:1 vs ink — so it doubles as a graphic
   * accent AND small-text-safe on either dark surface. GRAPHIC/graphic-
   * scale-text on deep surfaces only: on `background`/`surfaceWarm` it
   * drops to ~1.8–2.1:1 (palette.ts), same non-text-on-light restriction
   * `accent` already carries.
   */
  accentOnDeep: palette.sunClay,
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
