import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { BackLink } from '@/components/back-link';
import { OUTCOME_LABELS } from '@/components/challenge-outcome-labels';
import { ContentStatusNote } from '@/components/content-status-note';
import { ScreenContainer } from '@/components/screen-container';
import { findChallengeById } from '@/content';
import { colors } from '@/design/tokens';
import { useProgress } from '@/state/progress-context';

// Reflects the recorded attempt outcome neutrally — no numeric scoring,
// no automatic competence claim, no reflection prompts invented (none are
// authoritative yet — see ContentStatusNote). "Return to Challenge" allows
// another attempt without implying the prior one was a failure.
//
// The outcome shown here (src/state/progress-types.ts) is a record of
// what happened during the attempt only. BADAWI's locked competency
// framework (spec §2) is a separate concept this app does not compute or
// claim anywhere — see docs/curriculum/v1-curriculum-spec.md §9.5.
export default function ChallengeReviewScreen() {
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();
  const challenge = findChallengeById(challengeId);
  const { progress, isHydrated } = useProgress();

  if (!challenge) {
    return (
      <ScreenContainer>
        <BackLink onPress={() => router.back()} />
        <Text style={styles.heading}>Challenge not found</Text>
      </ScreenContainer>
    );
  }

  // Avoid showing "no attempt recorded" against the still-default
  // unhydrated state for a challenge that actually does have one saved.
  if (!isHydrated) {
    return null;
  }

  const recorded = progress.challenges[challengeId];

  return (
    <ScreenContainer>
      <BackLink onPress={() => router.back()} />
      <Text style={styles.heading}>Review: {challenge.name}</Text>

      {recorded ? (
        <>
          <Text style={styles.body}>Outcome: {OUTCOME_LABELS[recorded.outcome]}</Text>
          <Text style={styles.meta}>
            This reflects what happened during the attempt only — it is not a competency
            assessment.
          </Text>
        </>
      ) : (
        <Text style={styles.body}>No attempt has been recorded yet for this challenge.</Text>
      )}

      <ContentStatusNote researchStatus={challenge.researchStatus} area="reflection" />

      <ActionButton
        label="Return to Challenge"
        onPress={() =>
          router.replace({
            pathname: '/challenge/[challengeId]',
            params: { challengeId: challenge.id },
          })
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: 600,
  },
  body: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
  },
});
