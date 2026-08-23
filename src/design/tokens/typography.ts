// BADAWI typography — Phase 5A, superseding Phase 5D.3's Fraunces/Archivo
// pairing per the approved BADAWI App v2 Claude Design export.
//
// Direction: an EDITORIAL / FIELD-JOURNAL pairing, chosen against the brand
// target's "premium, adventurous, exploratory, ... not corporate SaaS, not a
// generic LMS". Three SIL Open Font License families, loaded via `expo-font`
// and bundled with the app (fully offline — no network font fetch, which
// matters for BADAWI's offline-first requirement):
//
//   Young Serif (Vietnam Type Institute, OFL-1.1) — display, titles,
//     headings, station numerals, and the core-question pull-quote. Reads as
//     expedition lettering — dug-in character without costume.
//
//   Familjen Grotesk (Speak Type, OFL-1.1) — body, meta, captions, and the
//     letterspaced survey labels. Warm and slightly idiosyncratic where the
//     previous Archivo pairing was neutral; sturdy at small sizes.
//
//   Alegreya (Huerta Tipográfica, OFL-1.1) — italic only. The "observational
//     voice": isolated transliterated/quoted terms inline in body text (e.g.
//     a named local wind), not a full type-scale role of its own. Exposed
//     below as `fontFamily.accentItalic`; no `typography.*` token currently
//     assigns it — that placement is a component-level decision for the
//     shared-primitives step, not this tokens slice.
//
// IMPORTANT — Young Serif ships exactly ONE weight/style: 400 Regular. There
// is no 600, 700, or italic face in the family at all (confirmed against the
// published package, not assumed). Every display-voice token below therefore
// resolves to the same face, differentiated only by size/letterSpacing —
// this matches how the approved design actually uses Young Serif throughout
// every screen (always `font: 400 ...`, never a heavier or italic instance
// in the app screens themselves).
//
// YOUNG SERIF IS UPRIGHT ONLY. This codebase has an existing, deliberate
// policy against synthetic italic (see the comment that was in
// `content-status-note.tsx`: platform-synthesized slant "render[s]
// differently on each OS"). Do not add a `fontStyle: 'italic'` override to
// any Young Serif token. Where the approved design genuinely calls for an
// italic voice — the `quote` token below, and `content-status-note.tsx`'s
// note text — use the real, bundled `accentItalic` (Alegreya Italic) face
// instead. Do not broaden Alegreya beyond these genuine accent/
// observational/quote roles; it is not a general-purpose italic stand-in.
//
// Weights bundled (deliberately trimmed to what the approved design and
// existing consumers actually use — see the completion report for the
// stated bundle cost):
//   Young Serif      400 Regular
//   Familjen Grotesk  400 Regular, 500 Medium, 600 SemiBold
//   Alegreya          400 Regular Italic
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
  // Young Serif has only one weight — these two keys are kept (rather than
  // collapsed to one) so existing consumers (wordmark.tsx) and future
  // display-voice tokens keep a stable, semantically-named interface even
  // though the values are identical today. Both are upright only — see the
  // file header for why there is no `displayRegularItalic` key.
  displaySemiBold: 'YoungSerif_400Regular',
  displayBold: 'YoungSerif_400Regular',
  textRegular: 'FamiljenGrotesk_400Regular',
  /** New in Phase 5A: Familjen Grotesk's Medium weight, used throughout the
   *  approved design (buttons, meta labels) but not yet wired into any
   *  `typography.*` token below — available for the shared-primitives step. */
  textMedium: 'FamiljenGrotesk_500Medium',
  textSemiBold: 'FamiljenGrotesk_600SemiBold',
  // No Familjen Grotesk 700 is bundled — the approved design never uses it
  // (every letterspaced label/eyebrow tops out at 600). Kept as a distinct
  // key, aliased to 600, for the same interface-stability reason as above.
  textBold: 'FamiljenGrotesk_600SemiBold',
  /**
   * Alegreya Italic — the real bundled italic face. This is BADAWI's only
   * italic voice: the "observational voice" for isolated inline terms, the
   * `quote` pull-quote token, and `content-status-note.tsx`'s note text.
   * Do not use it beyond those genuine accent/observational/quote roles.
   */
  accentItalic: 'Alegreya_400Regular_Italic',
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
   * marks it as quoted specification framing rather than instruction. Uses
   * the real bundled Alegreya Italic face (`accentItalic`), not Young Serif
   * — Young Serif is upright only, see the file header.
   */
  quote: {
    fontFamily: fontFamily.accentItalic,
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
