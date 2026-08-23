import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Plate } from '@/components/plate';
import { OUTCOME_LABELS } from '@/components/challenge-outcome-labels';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { BodyText, Eyebrow, MetaText } from '@/components/section-heading';
import { StatusPill } from '@/components/status-pill';
import { BadawiMark } from '@/design/brand/badawi-mark';
import { HairlineRule, SurveyTicks } from '@/design/illustration/notebook';
import { colors, contentEnter, spacing, staggeredEnter, typography } from '@/design/tokens';
import { CHALLENGE_ATTEMPT_OUTCOMES } from '@/state';
import { useProgress } from '@/state/progress-context';

// ── PROFILE — THE FIELD RECORD ───────────────────────────────────────────
//
// Profile is the learner's own page of the notebook: a record sheet, with the
// approved "1A" mark set as a watermark behind it. It brings Profile into the
// redesign's visual language without inventing a single thing to fill it.
//
// ── ONLY REAL DATA ───────────────────────────────────────────────────────
// Everything shown comes from src/state/progress-types.ts: onboarding status,
// safety-acceptance status, and a count of recorded attempt outcomes. There
// are no achievements, badges, levels, streaks, XP, percentages, or rankings
// — none exist in the product, and a more polished Profile is not a licence
// to invent them (CLAUDE.md; docs/design/README.md, "Product Fidelity").
//
// The four outcome counts render identically to each other — same type, same
// weight, same neutral treatment, in the fixed order the domain defines.
// Completed is not styled as better than Stopped, Postponed, or Refused.
// These counts describe what happened during attempts; they are not a score
// and not a competency assessment.
export default function ProfileScreen() {
  const { progress, isHydrated } = useProgress();

  if (!isHydrated) {
    return null;
  }

  const attempts = Object.values(progress.challenges);
  const counts = Object.fromEntries(
    CHALLENGE_ATTEMPT_OUTCOMES.map((outcome) => [
      outcome,
      attempts.filter((attempt) => attempt.outcome === outcome).length,
    ])
  ) as Record<(typeof CHALLENGE_ATTEMPT_OUTCOMES)[number], number>;

  return (
    <Screen measure="reading" backdropHeight={210}>
      {/* Phase 5A: Profile is now a primary tab-bar destination, not a
          pushed screen, so it has no Back affordance — matching Home's
          tab-root header treatment. Settings remains a real forward push. */}
      <ScreenHeader
        title="Profile"
        action={{ label: 'Settings', onPress: () => router.push('/settings') }}
      />

      <Animated.View entering={contentEnter}>
        <Plate variant="paper" elevated style={styles.record}>
          <View style={styles.watermark} pointerEvents="none">
            <BadawiMark size={120} surface="light" />
          </View>

          <Eyebrow>Field record</Eyebrow>

          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Onboarding</Text>
            <StatusPill
              label={progress.onboardingCompletedAt ? 'Completed' : 'Not completed'}
              tone={progress.onboardingCompletedAt ? 'neutral' : 'muted'}
            />
          </View>
          <HairlineRule weight="faint" />
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Safety acceptance</Text>
            <StatusPill
              label={progress.safetyAcceptedAt ? 'Accepted' : 'Not yet accepted'}
              tone={progress.safetyAcceptedAt ? 'neutral' : 'muted'}
            />
          </View>
        </Plate>
      </Animated.View>

      <Animated.View entering={staggeredEnter(1)} style={styles.section}>
        <Eyebrow>Attempt history</Eyebrow>
        {attempts.length === 0 ? (
          <Plate variant="outline">
            <BodyText>No challenges attempted yet.</BodyText>
          </Plate>
        ) : (
          <Plate variant="warm" style={styles.counts}>
            <View style={styles.countsRow}>
              {CHALLENGE_ATTEMPT_OUTCOMES.map((outcome) => (
                <View key={outcome} style={styles.countItem}>
                  <Text style={styles.countNumber}>{counts[outcome]}</Text>
                  <Text style={styles.countLabel}>{OUTCOME_LABELS[outcome]}</Text>
                </View>
              ))}
            </View>
            <SurveyTicks count={17} />
          </Plate>
        )}
        <MetaText>
          This reflects what happened during attempts only — it is not a competency assessment.
        </MetaText>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  record: {
    gap: spacing.md,
  },
  // The mark as a watermark: brand presence without another logo lockup.
  watermark: {
    position: 'absolute',
    right: -26,
    top: -18,
    opacity: 0.06,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  statusLabel: {
    ...typography.bodyEmphasis,
    color: colors.textPrimary,
  },
  section: {
    gap: spacing.md,
  },
  counts: {
    gap: spacing.lg,
  },
  countsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  countItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  countNumber: {
    ...typography.numeralLarge,
    color: colors.textPrimary,
  },
  countLabel: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
