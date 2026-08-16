import { palette } from './palette';

// Approved Phase 3 semantic color roles for BADAWI V1.
// See docs/design/README.md, "Approved Semantic Color Roles".
//
// Only these four roles are approved. Do not add further roles (e.g.
// primary/action, accent, success, warning, error, disabled, borders,
// overlays, or Field Mode/safety colors) until separately approved.
export const colors = Object.freeze({
  background: palette.lightNeutral,
  textPrimary: palette.brown,
  textSecondary: palette.indigo,
  surfaceWarm: palette.ecru,
} as const);

export type Colors = typeof colors;
export type ColorRole = keyof Colors;
