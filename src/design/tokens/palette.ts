// BADAWI color palette — raw values only.
// See docs/design/README.md, "Locked Color Palette", and the Phase 5A
// BADAWI App v2 Claude Design export ("one palette, one voice").
//
// This is a palette, not a token system: no semantic roles (background,
// text, primary, accent, success, error, warning, surface, etc.) are
// assigned here — see ./colors.ts for those.
//
// ── Phase 3 locked colors, renamed to the Phase 5A design-system labels ──
// No hex value below changed from the Phase 3 lock; only the key names did,
// to match the approved export's own naming (Ink/Night/Deep Sage/Sage/Clay/
// Bone/Light). `./colors.ts`'s existing measured-contrast comments still
// apply unchanged to these values under their new names.
export const palette = Object.freeze({
  ink: '#3F3B32', // was `brown`
  night: '#353C56', // was `indigo`
  deepSage: '#646D3E', // was `olive`
  sage: '#838E6C', // was `sageGreen`
  clay: '#B95730', // was `terracotta`
  bone: '#EAE2CD', // was `ecru`
  light: '#F7F8F0', // was `lightNeutral`

  // ── Phase 5A additions — extend the green ramp and the clay range ──────
  // New hex values, not renames. Each is measured below (WCAG 2.x, sRGB)
  // against the surfaces it's most likely to sit on. None of these four are
  // wired into a semantic role in ./colors.ts yet — that's a component-level
  // decision for the shared-primitives step, not this tokens slice.
  //
  // Measured contrast (relative luminance formula, computed not assumed):
  //   shadeSage vs bone   6.40:1   shadeSage vs light  7.73:1   — both clear
  //     4.5:1 AA for normal text. shadeSage is dark enough to be usable as
  //     TEXT on bone/light, same category as ink/night today.
  //   drySage   vs ink    4.92:1   drySage   vs night   4.80:1  — clears AA
  //     as light-colored text/labels on ink/night (same category as
  //     textOnDeep/textOnDeepMuted today), but only 1.75–2.12:1 against
  //     bone/light — NOT usable as text on light surfaces.
  //   paleSage  vs ink    6.79:1   paleSage  vs night   6.61:1  — same
  //     category as drySage: safe as text/graphic on dark surfaces only.
  //   sunClay   vs ink    4.88:1   sunClay   vs night   4.76:1  — same
  //     category: clears AA as text/graphic on dark surfaces only; only
  //     1.77–2.14:1 against bone/light, so — like clay/terracotta today —
  //     it must stay a non-text graphic accent on light surfaces.
  //   None of the four reach 3:1 against sage, deepSage, or clay — expected,
  //     they're close in lightness; don't pair them for text either way.
  //
  // In short: shadeSage can join ink/night as a dark-on-light text color;
  // drySage, paleSage, and sunClay follow the same rule the locked palette
  // already applies to sage/deepSage/clay — graphic/illustration/accent use,
  // or light-colored text/labels on a dark (ink/night) surface only, never
  // as text or a text-bearing background on bone/light.
  shadeSage: '#4A5230',
  drySage: '#A8B08F',
  paleSage: '#C6CDB2',
  sunClay: '#D9A06B',
} as const);

export type Palette = typeof palette;
export type PaletteColorName = keyof Palette;
