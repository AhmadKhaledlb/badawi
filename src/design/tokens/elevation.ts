import { palette } from './palette';

// Phase 5D.3 — elevation scale.
//
// Implementation-level only (docs/design/README.md lists elevation as
// unspecified). Shadow color is Brown used as a neutral dark rendering
// value — shadows are conventionally a dark neutral. This is NOT a new
// semantic role for Brown, and introduces no palette color.
//
// The 5D.3 language treats elevation as "paper lifted off terrain": plates
// float above the illustrated backdrop, so shadows are soft and wide rather
// than tight and dark. `sunk` is the inverse — used only for the inset
// terrain "window" on hero compositions, where the art reads as seen
// *through* the page rather than printed on it.
export const elevation = Object.freeze({
  none: {},
  /** A resting plate on the page. */
  low: {
    shadowColor: palette.brown,
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  /** A plate lifted over illustration, or a pressed/active surface. */
  medium: {
    shadowColor: palette.brown,
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  /** The Welcome brand lockup and the active map waypoint only. */
  high: {
    shadowColor: palette.brown,
    shadowOpacity: 0.18,
    shadowRadius: 34,
    shadowOffset: { width: 0, height: 14 },
    elevation: 12,
  },
} as const);

export type Elevation = typeof elevation;
export type ElevationToken = keyof Elevation;
