import { StyleSheet, View } from 'react-native';
import Svg, { Defs, Line, Pattern, Rect } from 'react-native-svg';

import { colors } from '@/design/tokens';

type HazardStripeProps = {
  height?: number;
};

// ── HAZARD STRIPE ────────────────────────────────────────────────────────
//
// The diagonal Clay stripe that sits along the top edge of the primary
// bottom-navigation bar in the approved design — confirmed shared across
// every screen shown with the tab bar (Home, Region, Pack), not a one-off
// decoration on a single screen, so it earns a primitive rather than being
// redrawn per screen.
export function HazardStripe({ height = 4 }: HazardStripeProps) {
  return (
    <View style={[styles.wrap, { height }]}>
      <Svg width="100%" height={height}>
        <Defs>
          <Pattern id="hazard" width={11.3} height={11.3} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <Rect width={11.3} height={11.3} fill="transparent" />
            <Line x1={0} y1={0} x2={0} y2={11.3} stroke={colors.accent} strokeWidth={8} strokeOpacity={0.5} />
          </Pattern>
        </Defs>
        <Rect x={0} y={0} width="100%" height={height} fill="url(#hazard)" />
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
