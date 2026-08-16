// Locked Phase 3 BADAWI color palette — raw values only.
// See docs/design/README.md, "Locked Color Palette".
//
// This is a palette, not a token system: no semantic roles (background,
// text, primary, accent, success, error, warning, surface, etc.) are
// assigned here, and no accessibility/contrast claims are made about it.
export const palette = Object.freeze({
  sageGreen: '#838E6C',
  ecru: '#EAE2CD',
  terracotta: '#B95730',
  indigo: '#353C56',
  lightNeutral: '#F7F8F0',
  brown: '#3F3B32',
  olive: '#646D3E',
} as const);

export type Palette = typeof palette;
export type PaletteColorName = keyof Palette;
