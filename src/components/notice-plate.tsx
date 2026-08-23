import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

import { Plate } from '@/components/plate';
import { colors, spacing, typography } from '@/design/tokens';

type NoticePlateProps = {
  /** Short uppercase kicker, e.g. "Curriculum safety gate". */
  kicker: string;
  /** The notice body. Callers pass approved/derived text only — never invented safety wording. */
  children: string;
};

// ── THE NOTICE PLATE ─────────────────────────────────────────────────────
//
// The surface for curriculum safety-gate information: an Indigo plate with a
// drawn gate glyph, carrying real weight without using colour to signal
// alarm.
//
// This is deliberately NOT a red/amber "warning" treatment. BADAWI has no
// error/warning colour and must not acquire one through the back door of a
// safety component (src/design/tokens/colors.ts; CLAUDE.md). A safety gate
// here is a *class of preparation the curriculum requires*, not an emergency
// state, and it must not read as one.
//
// Contrast: Light Neutral on Indigo measures 10.17:1 and Ecru on Indigo
// 8.41:1 — both AAA. The glyph is line-work at 1.6dp in Ecru.
//
// CONTENT: this component only ever renders text its caller supplies. It
// fabricates no thresholds, procedures, or field guidance, and callers pass
// only the locked safety-gate CLASS name (src/domain/safety.ts) plus an
// explicit statement that detailed requirements are unauthored. Every V1
// Challenge is still RQ0.
export function NoticePlate({ kicker, children }: NoticePlateProps) {
  return (
    <Plate variant="deep" style={styles.plate}>
      <View style={styles.header}>
        <GateGlyph />
        <Text style={styles.kicker}>{kicker}</Text>
      </View>
      <Text style={styles.body}>{children}</Text>
    </Plate>
  );
}

/**
 * An abstract gate: two posts, a horizontal bar, and a survey dot on the
 * threshold. Geometric and environmental only — it depicts no equipment,
 * no procedure, and no cultural artifact, and it conveys no instruction.
 */
function GateGlyph() {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none">
      <Svg width={20} height={20} viewBox="0 0 20 20">
        <Line x1={3} y1={4} x2={3} y2={17} stroke={colors.ruleOnDeep} strokeWidth={1.6} />
        <Line x1={17} y1={4} x2={17} y2={17} stroke={colors.ruleOnDeep} strokeWidth={1.6} />
        <Line x1={3} y1={7.5} x2={17} y2={7.5} stroke={colors.ruleOnDeep} strokeWidth={1.6} />
        <Circle cx={10} cy={13.5} r={2} fill={colors.accent} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  plate: {
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  kicker: {
    ...typography.label,
    color: colors.textOnDeep,
    textTransform: 'uppercase',
  },
  body: {
    ...typography.meta,
    color: colors.textOnDeepMuted,
  },
});
