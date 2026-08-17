import { Redirect, router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler, StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { ContentStatusNote } from '@/components/content-status-note';
import { Screen } from '@/components/screen';
import { findChallengeById } from '@/content';
import { HairlineRule } from '@/design/illustration/notebook';
import { colors, spacing, typography } from '@/design/tokens';
import { SAFETY_GATE_CLASSES } from '@/domain';
import { useProgress } from '@/state/progress-context';

// ─────────────────────────────────────────────────────────────────────────
// FIELD MODE
// ─────────────────────────────────────────────────────────────────────────
//
// ── VISUAL TREATMENT: DEFINED BY SUBTRACTION ─────────────────────────────
//
// Every other screen in BADAWI is illustrated terrain with a notebook laid
// over it. Field Mode is the notebook ALONE. That contrast is the point: the
// moment the app stops being something you explore and becomes something you
// glance at outdoors, the world drops away and only the record remains.
//
// Concretely, and deliberately, this screen has NONE of the following, all of
// which exist elsewhere in the app:
//   • no terrain scene, no sky, no strata, no texture   (`surface="plain"`)
//   • no parallax, no entering animations, no press-scale feedback
//   • no elevation, no plates floating over anything
//   • no accent colour anywhere
//   • no illustration, no glyphs, no ornament
//   • no breadcrumb, no header chrome, no trailing actions
//   • no progress indicator, timer, step count, or "almost there" framing
//
// What it keeps is legibility: Brown on Light Neutral, the highest-contrast
// pairing BADAWI has at 10.43:1, at large sizes, on a flat ground — chosen
// for a bright outdoor screen, not for looks.
//
// ── LOCKED BEHAVIOUR — UNCHANGED BY THE REDESIGN ─────────────────────────
//
// 1. NO GENERIC BACK. No in-UI Back affordance (`ScreenHeader` is not used
//    here at all), no Android hardware back (BackHandler below), no iOS
//    swipe-back (`gestureEnabled: false`). Complete and Stop are the only
//    exits, so leaving always records an explicit, neutral outcome.
// 2. COMPLETE AND STOP ARE EQUAL. Both render `ActionButton variant="field"`
//    with identical props — same surface, same size (72dp), same type, same
//    spacing, no icon on either, no colour distinction. Stop must never read
//    as the lesser or "failure" option: stopping can demonstrate competence
//    (docs/safety/README.md). See src/components/action-button.tsx.
// 3. STOP IS ALWAYS ACCESSIBLE. Both controls sit together, above the fold,
//    never behind a scroll, a confirm dialog, or a disclosure.
// 4. NO ENGAGEMENT PRESSURE of any kind.
// 5. NO FABRICATED GUIDANCE. No field/survival instruction exists yet for any
//    challenge (every V1 Challenge is RQ0), so this stays a functional shell
//    that says so plainly via ContentStatusNote. The Challenge's internal
//    `safetyNote` is deliberately NOT rendered — it is unreviewed engineering
//    metadata, not approved learner-facing safety wording. Only the coded
//    safety-gate class is shown, structurally.
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

  // Do not decide the safety gate from the still-default unhydrated state —
  // that would incorrectly re-prompt a user who already accepted.
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
      <Screen surface="plain">
        <Text style={styles.challengeName}>Challenge not found</Text>
      </Screen>
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
      <Screen surface="plain" measure="reading">
        <View style={styles.head}>
          <Text style={styles.mode}>Field Mode</Text>
          <HairlineRule weight="strong" />
          <Text style={styles.challengeName}>{challenge.name}</Text>
        </View>

        {challenge.safetyGateClass && (
          <Text style={styles.gate}>
            {`Safety gate: ${SAFETY_GATE_CLASSES[challenge.safetyGateClass]}.`}
          </Text>
        )}

        <ContentStatusNote researchStatus={challenge.researchStatus} area="field" />

        {/* The only two exits. Identical by construction — see note 2 above. */}
        <View style={styles.actions}>
          <ActionButton label="Complete" variant="field" onPress={handleComplete} />
          <ActionButton label="Stop" variant="field" onPress={handleStop} />
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  head: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
  mode: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  challengeName: {
    ...typography.title,
    color: colors.textPrimary,
  },
  gate: {
    ...typography.bodyEmphasis,
    color: colors.textPrimary,
  },
  actions: {
    marginTop: spacing.lg,
    // Equal gap above and between: neither control is grouped with anything
    // else, and neither gets more breathing room than the other.
    gap: spacing.lg,
  },
});
