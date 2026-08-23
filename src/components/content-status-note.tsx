import { StyleSheet, Text, View } from 'react-native';
import Svg, { Line } from 'react-native-svg';

import { Plate } from '@/components/plate';
import { colors, fontFamily, lineOpacity, spacing, typography } from '@/design/tokens';
import type { ResearchQualityId } from '@/domain';

type ContentStatusNoteProps = {
  /** The Challenge's combined research/content-production status (src/domain/research-status.ts). */
  researchStatus: ResearchQualityId;
  /** What kind of content this note is standing in for, e.g. "preparation", "field", "reflection". */
  area: string;
};

// ── THE PENDING PLATE ────────────────────────────────────────────────────
//
// Renders an honest, restrained placeholder wherever a screen would otherwise
// need real preparation/field/reflection content that Phase 2 explicitly
// leaves for later research and safety review
// (docs/curriculum/v1-curriculum-spec.md §11.5, §15; docs/safety/README.md,
// "Content Trust"). Only RQ4 ("Production Approved") content is safe to
// present as finished — every V1 Challenge is currently RQ0, so this renders
// on every screen that uses it today.
//
// ── WHY IT LOOKS LIKE THIS ───────────────────────────────────────────────
// Visual polish and content trust are INDEPENDENT axes, and the 5D.3 redesign
// must not let a more premium interface quietly promote unresearched content
// to looking finished (`badawi-visual-design`, locked boundaries; CLAUDE.md).
//
// So as the rest of the app became more illustrated and more finished, this
// component was deliberately pushed the other way: it is the only surface in
// BADAWI that uses a DASHED, unfilled plate and a hatched "unsurveyed" glyph.
// In the map language the whole app now speaks, dashed + hatched means
// "territory not yet surveyed" — the same treatment Explore/Region use for
// in-preparation environments. A learner reads it as provisional before
// reading a word of it.
//
// The wording below is unchanged from the previous implementation and is
// asserted verbatim by tests in three screens. Do not restyle it into
// something that reads as approved copy.
export function ContentStatusNote({ researchStatus, area }: ContentStatusNoteProps) {
  if (researchStatus === 'RQ4') {
    return null;
  }

  return (
    <Plate variant="outline" style={styles.container}>
      <View style={styles.header}>
        <UnsurveyedGlyph />
        <Text style={styles.kicker}>Content pending</Text>
      </View>
      <Text style={styles.note}>
        {capitalize(area)} content for this challenge has not yet been authored or safety-reviewed
        (status: {STATUS_LABEL[researchStatus]}). Nothing shown here should be treated as verified
        guidance.
      </Text>
    </Plate>
  );
}

/** Diagonal hatching — the map convention for unsurveyed ground. */
function UnsurveyedGlyph() {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none">
      <Svg width={16} height={16} viewBox="0 0 16 16">
        {[-6, -1, 4, 9].map((offset) => (
          <Line
            key={offset}
            x1={offset}
            y1={16}
            x2={offset + 12}
            y2={0}
            stroke={colors.rule}
            strokeWidth={1.2}
            opacity={0.5}
          />
        ))}
      </Svg>
    </View>
  );
}

const STATUS_LABEL: Record<Exclude<ResearchQualityId, 'RQ4'>, string> = {
  RQ0: 'unresearched',
  RQ1: 'research in progress',
  RQ2: 'verified, pending review',
  RQ3: 'reviewed, pending final approval',
};

function capitalize(value: string): string {
  return value.length === 0 ? value : value[0].toUpperCase() + value.slice(1);
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  kicker: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    opacity: 0.7 + lineOpacity.faint,
  },
  note: {
    // Alegreya Italic at meta size — BADAWI's one real bundled italic face
    // (src/design/tokens/fonts.ts). Young Serif is upright only and must
    // never get a synthetic `fontStyle: 'italic'` override, which would ask
    // the platform to fake a slant and render differently on each OS.
    fontFamily: fontFamily.accentItalic,
    fontSize: typography.meta.fontSize,
    lineHeight: typography.meta.lineHeight,
    color: colors.textSecondary,
  },
});
