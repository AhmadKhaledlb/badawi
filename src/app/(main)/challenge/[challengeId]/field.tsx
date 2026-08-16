import { Redirect, router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler, StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { ScreenContainer } from '@/components/screen-container';
import { resolveChallenge } from '@/content';
import { colors } from '@/design/tokens';
import { useProgress } from '@/state/progress-context';

// Field Mode: minimal interaction, no decorative engagement, no
// unnecessary prompts/animations (docs/design/README.md, "Field Mode").
// No field/survival instruction is authored yet for any challenge, so
// this is a functional structural shell that says so plainly rather than
// fabricating guidance (docs/safety/README.md, "Safety-Critical Content").
//
// Locked navigation decision: there is no generic Back while Field Mode
// is active — no in-UI Back affordance, no Android hardware back, no iOS
// swipe-back gesture. Complete/Stop are the only exits, so leaving always
// records an explicit, neutral outcome; this does not trap the user, it
// only removes the *generic* exit in favor of the two explicit ones.
export default function ChallengeFieldScreen() {
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();
  const challenge = resolveChallenge(challengeId);
  const { progress, isHydrated, recordChallengeAttempt } = useProgress();

  const isFieldModeActive = isHydrated && Boolean(progress.safetyAcceptedAt) && Boolean(challenge);

  useEffect(() => {
    if (!isFieldModeActive) return;

    const subscription = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => subscription.remove();
  }, [isFieldModeActive]);

  // Do not decide the safety gate from the still-default unhydrated state
  // — that would incorrectly re-prompt a user who already accepted.
  if (!isHydrated) {
    return null;
  }

  if (!progress.safetyAcceptedAt) {
    return (
      <Redirect
        href={{
          pathname: '/safety/acceptance',
          params: { returnTo: `/challenge/${challengeId}/field` },
        }}
      />
    );
  }

  if (!challenge) {
    return (
      <ScreenContainer>
        <Text style={styles.heading}>Challenge not found</Text>
      </ScreenContainer>
    );
  }

  function handleComplete() {
    recordChallengeAttempt(challenge!.id, 'completed');
    router.replace({
      pathname: '/challenge/[challengeId]/review',
      params: { challengeId: challenge!.id },
    });
  }

  function handleStop() {
    recordChallengeAttempt(challenge!.id, 'stopped');
    router.replace({
      pathname: '/challenge/[challengeId]/review',
      params: { challengeId: challenge!.id },
    });
  }

  return (
    <>
      <Stack.Screen options={{ gestureEnabled: false }} />
      <ScreenContainer>
        <Text style={styles.heading}>Field Mode</Text>
        <Text style={styles.body}>
          Field content for this challenge has not yet been authored. This is a structural
          placeholder for the Field Mode experience.
        </Text>
        <View style={styles.actions}>
          <ActionButton label="Complete" onPress={handleComplete} />
          <ActionButton label="Stop" onPress={handleStop} />
        </View>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: 600,
  },
  body: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  actions: {
    marginTop: 8,
    gap: 12,
  },
});
