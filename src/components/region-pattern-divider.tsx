import { StyleSheet, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

import { colors } from '@/design/tokens';

type RegionPatternDividerProps = {
  height?: number;
};

const VIEW_W = 120;
const DIAMOND = 8.5;
const STEP = 12;
const COUNT = Math.ceil(VIEW_W / STEP) + 1;

// ── REGION PATTERN DIVIDER ────────────────────────────────────────────────
//
// Phase 5A visual-fidelity pass, second refinement: the first version built
// the weave from two `<Pattern>`s at opposed `patternTransform="rotate(45)"`
// / `rotate(-45)"` angles — visually this kept reading as one direction of
// diagonal stripes rather than a woven diamond lattice, most likely because
// `patternTransform` isn't reliably honored by `react-native-svg`'s pattern
// renderer on every platform, so both layers may paint the same direction
// instead of opposing ones. Rebuilt without `Pattern`/`patternTransform` at
// all: a literal row of small squares, each rotated 45° individually via
// the `rotation`/`origin` props every `<Rect>` supports directly — a
// universally-supported per-element transform, not a pattern-tile
// transform — producing actual diamonds (not stripes) regardless of
// platform pattern-fill quirks. Alternating diamonds sit at two opacities
// for the woven look approved 3c shows, same Ink-over-Clay palette as
// before. Region-local: `HazardStripe` and the tab bar are untouched.
export function RegionPatternDivider({ height = 10 }: RegionPatternDividerProps) {
  const centerY = height / 2;

  return (
    <View style={[styles.wrap, { height }]}>
      <Svg width="100%" height={height} viewBox={`0 0 ${VIEW_W} ${height}`} preserveAspectRatio="none">
        <Rect x={0} y={0} width={VIEW_W} height={height} fill={colors.accent} />
        {Array.from({ length: COUNT }, (_, index) => {
          const cx = index * STEP;
          const alternate = index % 2 === 0;
          return (
            <Rect
              key={index}
              x={cx - DIAMOND / 2}
              y={centerY - DIAMOND / 2}
              width={DIAMOND}
              height={DIAMOND}
              rotation={45}
              origin={`${cx}, ${centerY}`}
              fill={colors.textPrimary}
              opacity={alternate ? 0.42 : 0.24}
            />
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    overflow: 'hidden',
  },
});
