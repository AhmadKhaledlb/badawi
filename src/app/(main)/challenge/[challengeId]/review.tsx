import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { BackLink } from '@/components/back-link';
import { ScreenContainer } from '@/components/screen-container';
import { resolveChallenge } from '@/content';
import { colors } from '@/design/tokens';
import type { ChallengeAttemptOutcome } from '@/state';
import { useProgress } from '@/state/progress-context';

// Reflects the recorded attempt outcome neutrally — no numeric scoring,
// no automatic competence claim, no reflection prompts invented (none are
// authoritative yet). "Return to Challenge" allows another attempt
// without implying the prior one was a failure.
const OUTCOME_LABELS: Record<ChallengeAttemptOutcome, string> = {
  completed: 'Completed',
  stopped: 'Stopped',
  postponed: 'Postponed',
  refused: 'Refused',
};

export default function ChallengeReviewScreen() {
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();
  const challenge = resolveChallenge(challengeId);
  const { progress, isHydrated } = useProgress();

  if (!challenge) {
    return (
      <ScreenContainer>
        <BackLink onPress={() => router.back()} />
        <Text style={styles.heading}>Challenge not found</Text>
      </ScreenContainer>
    );
  }

  // Avoid showing "no recorded attempt" against the still-default
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
        <Text style={styles.body}>Outcome: {OUTCOME_LABELS[recorded.outcome]}</Text>
      ) : (
        <Text style={styles.body}>No attempt has been recorded yet for this challenge.</Text>
      )}

      <Text style={styles.placeholderNote}>
        Reflection prompts are not yet available for this challenge.
      </Text>

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
  placeholderNote: {
    color: colors.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
  },
});
