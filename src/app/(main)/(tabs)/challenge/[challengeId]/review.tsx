import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { ActionButton } from '@/components/action-button';
import { OUTCOME_LABELS } from '@/components/challenge-outcome-labels';
import { ContentStatusNote } from '@/components/content-status-note';
import { Plate } from '@/components/plate';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { BodyText, Eyebrow, MetaText } from '@/components/section-heading';
import { findChallengeById } from '@/content';
import { HairlineRule, SurveyTicks } from '@/design/illustration/notebook';
import { colors, contentEnter, spacing, staggeredEnter, typography } from '@/design/tokens';
import { useProgress } from '@/state/progress-context';

// ── REVIEW — THE RECORD ──────────────────────────────────────────────────
//
// Returning from the field. The terrain comes back (you are back in the
// world) but stays low and quiet; the outcome is set as a plain entry in the
// record, in the display serif, on a paper plate.
//
// ── OUTCOME SEMANTICS (LOCKED) ───────────────────────────────────────────
// Every outcome renders IDENTICALLY. Completed, Stopped, Postponed and
// Refused get the same plate, the same type, the same size, and the same
// neutral survey mark — no colour, no icon, no celebration, no commiseration,
// no score, no ranking, no "try again" framing.
//
// This is enforced by the visual language, not just by copy: BADAWI has no
// success/error colour to reach for (src/design/tokens/colors.ts), and the
// outcome is displayed through the same neutral components used everywhere
// else. Stopping, modifying, postponing, or refusing can demonstrate
// competence (docs/safety/README.md).
//
// The outcome shown here records only what happened during an attempt.
// BADAWI's locked competency framework is a separate concept this app does
// not compute or claim anywhere (spec §9.5). "Return to Challenge" allows
// another attempt without implying the prior one failed.
export default function ChallengeReviewScreen() {
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();
  const challenge = findChallengeById(challengeId);
  const { progress, isHydrated } = useProgress();

  if (!challenge) {
    return (
      <Screen>
        <ScreenHeader title="Challenge not found" onBack={() => router.back()} />
      </Screen>
    );
  }

  // Avoid showing "no attempt recorded" against the still-default unhydrated
  // state for a challenge that actually does have one saved.
  if (!isHydrated) {
    return null;
  }

  const recorded = progress.challenges[challengeId];

  return (
    <Screen measure="reading" backdropHeight={200}>
      <ScreenHeader title={`Review: ${challenge.name}`} onBack={() => router.back()} />

      <Animated.View entering={contentEnter}>
        <Plate variant="paper" elevated style={styles.record}>
          <Eyebrow>Field record</Eyebrow>
          {recorded ? (
            <>
              <View style={styles.outcomeRow}>
                <View style={styles.outcomeMark} />
                <Text style={styles.outcome}>{`Outcome: ${OUTCOME_LABELS[recorded.outcome]}`}</Text>
              </View>
              <HairlineRule weight="faint" />
              <MetaText>
                This reflects what happened during the attempt only — it is not a competency
                assessment.
              </MetaText>
            </>
          ) : (
            <BodyText>No attempt has been recorded yet for this challenge.</BodyText>
          )}
        </Plate>
      </Animated.View>

      <Animated.View entering={staggeredEnter(1)} style={styles.ticks}>
        <SurveyTicks count={19} />
      </Animated.View>

      <Animated.View entering={staggeredEnter(2)}>
        <ContentStatusNote researchStatus={challenge.researchStatus} area="reflection" />
      </Animated.View>

      <Animated.View entering={staggeredEnter(3)}>
        <ActionButton
          label="Return to Challenge"
          onPress={() =>
            router.replace({
              pathname: '/challenge/[challengeId]',
              params: { challengeId: challenge.id },
            })
          }
        />
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  record: {
    gap: spacing.md,
  },
  outcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  // A neutral plotted mark, identical for every outcome.
  outcomeMark: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.textSecondary,
  },
  outcome: {
    ...typography.heading,
    color: colors.textPrimary,
    flex: 1,
  },
  ticks: {
    paddingHorizontal: spacing.xs,
  },
});
