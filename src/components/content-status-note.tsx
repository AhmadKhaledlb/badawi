import { StyleSheet, Text } from 'react-native';

import { colors } from '@/design/tokens';
import type { ResearchQualityId } from '@/domain';

type ContentStatusNoteProps = {
  /** The Challenge's combined research/content-production status (src/domain/research-status.ts). */
  researchStatus: ResearchQualityId;
  /** What kind of content this note is standing in for, e.g. "preparation", "field", "reflection". */
  area: string;
};

// Renders an honest, restrained placeholder wherever a screen would
// otherwise need real preparation/field/reflection content that Phase 2
// explicitly leaves for later research and safety review
// (docs/curriculum/v1-curriculum-spec.md §11.5, §15; docs/safety/README.md,
// "Content Trust"). Only RQ4 ("Production Approved") content is safe to
// present as finished — every V1 Challenge is currently RQ0, so this
// renders on every screen that uses it today. Deliberately plain,
// secondary-styled text: this must never read as polished, approved copy.
export function ContentStatusNote({ researchStatus, area }: ContentStatusNoteProps) {
  if (researchStatus === 'RQ4') {
    return null;
  }

  return (
    <Text style={styles.note}>
      {capitalize(area)} content for this challenge has not yet been authored or safety-reviewed
      (status: {STATUS_LABEL[researchStatus]}). Nothing shown here should be treated as verified
      guidance.
    </Text>
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
  note: {
    color: colors.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
  },
});
