import { Redirect, router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler, StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { ContentStatusNote } from '@/components/content-status-note';
import { ScreenContainer } from '@/components/screen-container';
import { findChallengeById } from '@/content';
import { colors } from '@/design/tokens';
import { SAFETY_GATE_CLASSES } from '@/domain';
import { useProgress } from '@/state/progress-context';

// Field Mode: minimal interaction, no decorative engagement, no
// unnecessary prompts/animations (docs/design/README.md, "Field Mode").
// The screen is driven by the real Challenge's identity, but no
// field/survival instruction exists yet for any challenge (every V1
// Challenge is research status RQ0 — see src/domain/research-status.ts),
// so this remains a functional shell that says so plainly via
// ContentStatusNote rather than fabricating guidance
// (docs/safety/README.md, "Safety-Critical Content"). The Challenge's
// internal `safetyNote` (src/domain/challenge.ts) is NOT rendered here —
// it is unreviewed engineering metadata, not approved learner-facing
// safety wording; only the coded safety-gate class (set only for
// Challenge 27) is shown, structurally.
//
// Locked navigation decision: there is no generic Back while Field Mode
// is active — no in-UI Back affordance, no Android hardware back, no iOS
// swipe-back gesture. Complete/Stop are the only exits, so leaving always
// records an explicit, neutral outcome; this does not trap the user, it
// only removes the *generic* exit in favor of the two explicit ones.
export default function ChallengeFieldScreen() {
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();
  const challenge = findChallengeById(challengeId);
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
          params: { returnTo: `/challenge/${challengeId}/field`, challengeId: challengeId ?? '' },
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
        <Text style={styles.subheading}>{challenge.name}</Text>

        {challenge.safetyGateClass && (
          <Text style={styles.meta}>
            Safety gate: {SAFETY_GATE_CLASSES[challenge.safetyGateClass]}.
          </Text>
        )}

        <ContentStatusNote researchStatus={challenge.researchStatus} area="field" />

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
  subheading: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 600,
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  actions: {
    marginTop: 8,
    gap: 12,
  },
});
