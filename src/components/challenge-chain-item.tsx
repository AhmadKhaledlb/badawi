import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Plate, withOpacity } from '@/components/plate';
import { pressedSurfaceStyle } from '@/components/press-feedback';
import { StatusPill } from '@/components/status-pill';
import { colors, lineOpacity, radii, spacing, typography } from '@/design/tokens';

type ChallengeChainItemProps = {
  /** 1-based position within the Unit. Presentational only — order comes from content. */
  order: number;
  title: string;
  /**
   * A recorded attempt outcome, already converted to its neutral label by the
   * caller (src/components/challenge-outcome-labels.ts). Undefined means no
   * attempt has been recorded — NOT "locked" and NOT "failed".
   */
  outcomeLabel?: string;
  isFirst?: boolean;
  isLast?: boolean;
  onPress?: () => void;
};

// ── THE CHALLENGE CHAIN ──────────────────────────────────────────────────
//
// A Challenge rendered as a link on a continuous traverse line within its
// Unit — deliberately a DIFFERENT rhythm from the Pack's staggered station
// route (src/components/station-plate.tsx), so the two levels of the
// hierarchy are distinguishable at a glance rather than being the same card
// at two sizes:
//
//              Pack  →  large illustrated plates, circular markers,
//                       alternating left/right, connected by a plotted curve
//              Unit  →  compact plates on one straight rail, SQUARE survey
//                       nodes, uniform cadence
//
// The rail is drawn from the item's own left column with the segment trimmed
// on the first and last items, so the line is continuous down the list
// without any runtime measurement or a parent-level overlay.
//
// ── OUTCOME SEMANTICS (LOCKED) ───────────────────────────────────────────
// The outcome pill is neutral in every case. Completed, Stopped, Postponed
// and Refused all render identically — same surface, same weight, no colour
// coding, no icon, no ordering. An attempt outcome records only what happened
// during an attempt; it is not competence, not a score, and not a pass/fail
// (docs/safety/README.md; src/state/progress-types.ts). An item with no
// recorded outcome simply shows no pill.
export function ChallengeChainItem({
  order,
  title,
  outcomeLabel,
  isFirst = false,
  isLast = false,
  onPress,
}: ChallengeChainItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && pressedSurfaceStyle]}>
      <View
        style={styles.rail}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants">
        <View
          style={[
            styles.railLine,
            isFirst && styles.railLineFromNode,
            isLast && styles.railLineToNode,
          ]}
        />
        <View style={styles.node}>
          <Text style={styles.nodeText}>{order}</Text>
        </View>
      </View>

      <Plate variant="paper" style={styles.plate}>
        <Text style={styles.title}>{title}</Text>
        {outcomeLabel && <StatusPill label={outcomeLabel} tone="muted" />}
      </Plate>
    </Pressable>
  );
}

const RAIL_WIDTH = 46;
const NODE_SIZE = 28;
const NODE_TOP = 18;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.md,
  },
  rail: {
    width: RAIL_WIDTH,
    position: 'relative',
  },
  railLine: {
    position: 'absolute',
    left: (RAIL_WIDTH - NODE_SIZE) / 2 + NODE_SIZE / 2 - 1,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: withOpacity(colors.rule, lineOpacity.strong),
  },
  /** First item: the traverse begins at the node, not above it. */
  railLineFromNode: {
    top: NODE_TOP + NODE_SIZE / 2,
  },
  /** Last item: the traverse ends at the node. */
  railLineToNode: {
    bottom: undefined,
    height: NODE_TOP + NODE_SIZE / 2,
  },
  node: {
    position: 'absolute',
    top: NODE_TOP,
    left: (RAIL_WIDTH - NODE_SIZE) / 2,
    width: NODE_SIZE,
    height: NODE_SIZE,
    // Square, not round — the visual difference from the Pack's circular
    // station markers is what separates the two levels of the hierarchy.
    borderRadius: radii.xs,
    backgroundColor: colors.background,
    borderWidth: 1.5,
    borderColor: colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeText: {
    ...typography.label,
    color: colors.textSecondary,
  },
  plate: {
    flex: 1,
    gap: spacing.sm,
  },
  title: {
    ...typography.subheading,
    color: colors.textPrimary,
  },
});
