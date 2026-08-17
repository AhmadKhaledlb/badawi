// BADAWI typography — Phase 5D.3.
//
// Direction: an EDITORIAL / FIELD-JOURNAL pairing, chosen against the brand
// target's "premium, adventurous, exploratory, ... not corporate SaaS, not a
// generic LMS". Two SIL Open Font License families, loaded via `expo-font`
// and bundled with the app (fully offline — no network font fetch, which
// matters for BADAWI's offline-first requirement):
//
//   Fraunces (Undercase Type, OFL-1.1) — display, titles, headings, the
//     core-question pull-quote, and station numerals. An old-style
//     "soft/wonky" serif with real optical character: it reads as a printed
//     field guide rather than a dashboard. This is the family doing the
//     brand work.
//
//   Archivo (Omnibus-Type, OFL-1.1) — body, meta, captions, and the
//     letterspaced survey labels. A grotesque with signage/cartographic
//     roots; sturdy at small sizes and legible outdoors, and distinctly not
//     the Inter/system-UI default the previous pass fell back to.
//
// Weights bundled (3 per family, deliberately trimmed — see the completion
// report for the stated bundle cost):
//   Fraunces 400 Italic (~88KB), 600 (~72KB), 700 (~72KB)
//   Archivo  400 (~120KB), 600 (~120KB), 700 (~120KB)
//
// Loading/fallback: `src/design/tokens/fonts.ts` owns the asset map; the
// root layout holds the splash screen until the faces are resolved, so text
// never re-flows from a system fallback into the brand faces mid-session.
// If loading fails, `fontFamily` resolves to the platform default and every
// size/line-height below still applies — the app degrades to a plain but
// correctly-proportioned type system rather than breaking.
//
// `fontWeight` is deliberately NOT set alongside `fontFamily`: each weight is
// a separately-registered face, and adding a numeric weight on top invites
// synthetic (smeared) bolding on both web and Android.

export const fontFamily = Object.freeze({
  displayRegularItalic: 'Fraunces_400Regular_Italic',
  displaySemiBold: 'Fraunces_600SemiBold',
  displayBold: 'Fraunces_700Bold',
  textRegular: 'Archivo_400Regular',
  textSemiBold: 'Archivo_600SemiBold',
  textBold: 'Archivo_700Bold',
} as const);

export const typography = Object.freeze({
  /** The brand/identity size. Welcome only — never a screen heading. */
  display: {
    fontFamily: fontFamily.displayBold,
    fontSize: 44,
    lineHeight: 48,
    letterSpacing: -0.4,
  },
  /** Screen title. */
  title: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 31,
    lineHeight: 37,
    letterSpacing: -0.2,
  },
  /** Section/sub-screen heading, and the large objective statement. */
  heading: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 24,
    lineHeight: 31,
    letterSpacing: -0.1,
  },
  /**
   * The pull-quote voice, used for a Unit's locked `coreQuestion`. Italic
   * serif marks it as quoted specification framing rather than instruction.
   */
  quote: {
    fontFamily: fontFamily.displayRegularItalic,
    fontSize: 20,
    lineHeight: 29,
  },
  /** Card/station titles. */
  subheading: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: -0.1,
  },
  body: {
    fontFamily: fontFamily.textRegular,
    fontSize: 16,
    lineHeight: 25,
  },
  bodyEmphasis: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 16,
    lineHeight: 25,
  },
  meta: {
    fontFamily: fontFamily.textRegular,
    fontSize: 14,
    lineHeight: 21,
  },
  metaEmphasis: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 14,
    lineHeight: 21,
  },
  caption: {
    fontFamily: fontFamily.textRegular,
    fontSize: 13,
    lineHeight: 19,
  },
  /**
   * The letterspaced survey label — small caps-styled eyebrows, station
   * kickers, breadcrumbs. Consumers add `textTransform: 'uppercase'`.
   */
  label: {
    fontFamily: fontFamily.textBold,
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 1.3,
  },
  /** Station/challenge ordinals drawn as part of the map, not as body text. */
  numeral: {
    fontFamily: fontFamily.displayBold,
    fontSize: 20,
    lineHeight: 24,
  },
  numeralLarge: {
    fontFamily: fontFamily.displayBold,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: -1,
  },
} as const);

export type Typography = typeof typography;
export type TypographyToken = keyof Typography;
