// Phase 5D.2 — minimum spacing scale needed to build V1 coherently.
// Implementation-level only (docs/design/README.md, "Implementation-Level
// Tokens Not Yet Locked" — spacing is explicitly listed as unspecified).
// A single 4px-based scale, sized to the values already in ad hoc use
// across Phase 5B/5C screens (4/8/12/16/20/24) plus two larger steps for
// screen-level rhythm. Not exhaustive by design — add a step only when a
// real screen needs one, not speculatively.
export const spacing = Object.freeze({
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const);

export type Spacing = typeof spacing;
export type SpacingToken = keyof Spacing;
