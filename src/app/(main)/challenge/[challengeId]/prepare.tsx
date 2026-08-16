import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { BackLink } from '@/components/back-link';
import { ScreenContainer } from '@/components/screen-container';
import { TextLink } from '@/components/text-link';
import { findChallengeById } from '@/content';
import { colors } from '@/design/tokens';
import { useProgress } from '@/state/progress-context';

// No preparation guidance/checklist content is authored yet for any
// challenge — nothing is fabricated to fill this screen. Postponing and
// refusing are presented as equally ordinary choices to continuing, per
// docs/safety/README.md: stopping/postponing/refusing may demonstrate
// competence and must never read as failure.
export default function ChallengePrepareScreen() {
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();
  const challenge = findChallengeById(challengeId);
  const { recordChallengeAttempt } = useProgress();

  if (!challenge) {
    return (
      <ScreenContainer>
        <BackLink onPress={() => router.back()} />
        <Text style={styles.heading}>Challenge not found</Text>
      </ScreenContainer>
    );
  }

  function handlePostpone() {
    recordChallengeAttempt(challenge!.id, 'postponed');
    router.back();
  }

  function handleRefuse() {
    recordChallengeAttempt(challenge!.id, 'refused');
    router.back();
  }

  return (
    <ScreenContainer>
      <BackLink onPress={() => router.back()} />
      <Text style={styles.heading}>Prepare: {challenge.name}</Text>
      <Text style={styles.body}>
        Preparation guidance for this challenge has not yet been authored. Continue only when you
        judge yourself ready — postponing or refusing are both reasonable choices here.
      </Text>

      <View style={styles.actions}>
        <ActionButton
          label="Continue to Field Mode"
          onPress={() =>
            router.push({
              pathname: '/challenge/[challengeId]/field',
              params: { challengeId: challenge.id },
            })
          }
        />
        <View style={styles.secondaryActions}>
          <TextLink label="Postpone" onPress={handlePostpone} />
          <TextLink label="Refuse" onPress={handleRefuse} />
        </View>
      </View>
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
    color: colors.textSecondary,
    fontSize: 16,
  },
  actions: {
    marginTop: 8,
    gap: 8,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 24,
  },
});
