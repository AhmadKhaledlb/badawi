import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';

import { colors, lineOpacity, spacing } from '@/design/tokens';

// ─────────────────────────────────────────────────────────────────────────
// THE NOTEBOOK LAYER
// ─────────────────────────────────────────────────────────────────────────
//
// BADAWI's visual language is two layers, always: an atmospheric illustrated
// TERRAIN (./terrain-scene.tsx) and a precise, drawn NOTEBOOK laid over it —
// hairline rules, survey ticks, corner registration marks, plotted route
// segments. The terrain is the world; the notebook is how a surveyor makes
// sense of it. Together they produce "premium, field-aware, tactile" instead
// of "rounded card in a list".
//
// Everything here is decorative line-work and is hidden from the
// accessibility tree. None of it encodes information — a learner who cannot
// see it loses nothing, which is exactly the requirement for ornament.

type HairlineRuleProps = {
  /** `hairline` (default) for dividers; `faint` for background structure; `strong` for section boundaries. */
  weight?: keyof typeof lineOpacity;
  /** Use `onDeep` over Indigo surfaces. */
  ground?: 'light' | 'onDeep';
  /** Accent-coloured rule. Graphic only — Terracotta is never a text colour. */
  accent?: boolean;
  style?: object;
};

/** A single measured rule. The workhorse divider of the notebook layer. */
export function HairlineRule({
  weight = 'hairline',
  ground = 'light',
  accent = false,
  style,
}: HairlineRuleProps) {
  return (
    <View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        styles.rule,
        {
          backgroundColor: accent
            ? colors.accent
            : ground === 'onDeep'
              ? colors.ruleOnDeep
              : colors.rule,
          opacity: accent ? 0.85 : lineOpacity[weight],
        },
        style,
      ]}
    />
  );
}

type SurveyTicksProps = {
  /** Number of ticks. */
  count?: number;
  ground?: 'light' | 'onDeep';
  /** Highlights one tick in the accent role — marks "here" on a scale. */
  activeIndex?: number;
};

/**
 * A row of measured ticks — a ruler edge. Used as an ornamental divider and
 * as the visual signature of a "surveyed" section. Ticks alternate height in
 * a 5-beat pattern so the row reads as a measuring scale rather than a dotted
 * line.
 */
export function SurveyTicks({ count = 21, ground = 'light', activeIndex }: SurveyTicksProps) {
  return (
    <View
      style={styles.tickRow}
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      {Array.from({ length: count }, (_, index) => {
        const isMajor = index % 5 === 0;
        const isActive = index === activeIndex;
        return (
          <View
            key={index}
            style={[
              styles.tick,
              {
                height: isMajor ? 10 : 5,
                backgroundColor: isActive
                  ? colors.accent
                  : ground === 'onDeep'
                    ? colors.ruleOnDeep
                    : colors.rule,
                opacity: isActive ? 0.95 : isMajor ? lineOpacity.strong : lineOpacity.hairline,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

type CornerMarksProps = {
  ground?: 'light' | 'onDeep';
  /** Inset from the parent's edges. */
  inset?: number;
  /** Arm length of each corner bracket. */
  arm?: number;
};

/**
 * Registration brackets at the four corners of a surface — the mark a
 * surveyor's plate or a printed plate carries. Applied to hero terrain
 * windows and the Blueprint Map canvas to make illustration read as a
 * *plotted sheet* rather than a photo crop. Absolutely positioned; the parent
 * must be `position: relative` and clip its overflow.
 */
export function CornerMarks({ ground = 'light', inset = 12, arm = 14 }: CornerMarksProps) {
  const stroke = ground === 'onDeep' ? colors.ruleOnDeep : colors.rule;
  const corners = [
    { top: inset, left: inset, rotate: '0deg' },
    { top: inset, right: inset, rotate: '90deg' },
    { bottom: inset, right: inset, rotate: '180deg' },
    { bottom: inset, left: inset, rotate: '270deg' },
  ] as const;

  return (
    <>
      {corners.map((corner, index) => {
        const { rotate, ...position } = corner;
        return (
          <View
            key={index}
            pointerEvents="none"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={[styles.corner, position, { transform: [{ rotate }] }]}>
            <Svg width={arm} height={arm} viewBox={`0 0 ${arm} ${arm}`}>
              <Line x1={0} y1={0} x2={arm} y2={0} stroke={stroke} strokeWidth={1.5} opacity={0.5} />
              <Line x1={0} y1={0} x2={0} y2={arm} stroke={stroke} strokeWidth={1.5} opacity={0.5} />
            </Svg>
          </View>
        );
      })}
    </>
  );
}

const CONNECTOR_HEIGHT = 64;

type RouteConnectorProps = {
  /**
   * Which way the plotted route travels. `leftToRight` exits near the left
   * edge and arrives near the right; `rightToLeft` mirrors it. Alternating
   * these between station plates is what makes the Pack read as a route
   * across terrain rather than a stack of cards.
   */
  direction?: 'leftToRight' | 'rightToLeft';
  ground?: 'light' | 'onDeep';
};

/**
 * A plotted route segment drawn BETWEEN two station plates.
 *
 * Deliberately a self-contained fixed-height element rather than one long
 * SVG spanning the whole screen: station plates have content-dependent
 * heights, so a single spanning route would need runtime measurement and
 * would jump around as fonts load. A per-gap connector is exact, stable, and
 * costs nothing.
 *
 * `preserveAspectRatio="none"` is correct here (unlike terrain): the
 * connector is a schematic line, so stretching it horizontally to the
 * container width is the intent, not a distortion.
 */
export function RouteConnector({
  direction = 'leftToRight',
  ground = 'light',
}: RouteConnectorProps) {
  const stroke = ground === 'onDeep' ? colors.ruleOnDeep : colors.rule;
  const flip = direction === 'rightToLeft';
  const mirror = (x: number) => (flip ? 100 - x : x);

  const path = `M ${mirror(18)} 0 C ${mirror(18)} 22 ${mirror(82)} 34 ${mirror(82)} ${CONNECTOR_HEIGHT}`;
  // Bezier points sampled at t = 0.25 / 0.5 / 0.75 along the curve above, so
  // the survey dots sit exactly on the plotted line.
  const dots = [
    { x: mirror(28), y: 17 },
    { x: mirror(50), y: 32 },
    { x: mirror(72), y: 47 },
  ];

  return (
    <View
      style={styles.connector}
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      <Svg
        width="100%"
        height={CONNECTOR_HEIGHT}
        viewBox={`0 0 100 ${CONNECTOR_HEIGHT}`}
        preserveAspectRatio="none">
        <Path
          d={path}
          stroke={stroke}
          strokeWidth={1.5}
          fill="none"
          strokeDasharray="5 5"
          opacity={0.4}
        />
        {dots.map((dot, index) => (
          <Circle key={index} cx={dot.x} cy={dot.y} r={1.8} fill={colors.accent} opacity={0.75} />
        ))}
      </Svg>
    </View>
  );
}

export { CONNECTOR_HEIGHT };

const styles = StyleSheet.create({
  rule: {
    width: '100%',
    height: StyleSheet.hairlineWidth * 2,
  },
  tickRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 10,
    width: '100%',
  },
  tick: {
    width: StyleSheet.hairlineWidth * 2,
    borderRadius: 1,
  },
  corner: {
    position: 'absolute',
  },
  connector: {
    width: '100%',
    height: CONNECTOR_HEIGHT,
    marginVertical: -spacing.xs,
  },
});
