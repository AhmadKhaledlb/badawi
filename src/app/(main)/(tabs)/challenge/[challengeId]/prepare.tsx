import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { ActionButton } from '@/components/action-button';
import { ContentStatusNote } from '@/components/content-status-note';
import { NoticePlate } from '@/components/notice-plate';
import { Plate } from '@/components/plate';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { BodyText, Eyebrow } from '@/components/section-heading';
import { findChallengeById } from '@/content';
import { HairlineRule, SurveyTicks } from '@/design/illustration/notebook';
import { colors, contentEnter, spacing, staggeredEnter, typography } from '@/design/tokens';
import { useLayout } from '@/design/use-layout';
import { SAFETY_GATE_CLASSES } from '@/domain';
import { useProgress } from '@/state/progress-context';

// ── PREPARE — THE THRESHOLD ──────────────────────────────────────────────
//
// The transitional screen between exploring and going out. Visually it is the
// hinge of the whole app: the terrain backdrop is at its shallowest here and
// the notebook layer is at its strongest, because from this point on BADAWI
// gets quieter and plainer all the way into Field Mode. Nothing on this
// screen animates ambiently; only content arrival.
//
// ── THREE PEER DECISIONS (SAFETY DOCTRINE) ───────────────────────────────
// Continue, Postpone and Refuse are presented as three real buttons of the
// same size and the same type weight. This is a deliberate CHANGE from the
// previous implementation, which rendered Postpone and Refuse as small text
// links beneath a full-width primary button.
//
// That old arrangement quietly undersold them: docs/safety/README.md and
// docs/curriculum/README.md hold that stopping, modifying, postponing, or
// refusing a challenge can itself demonstrate competence and must never read
// as failure — but a 13px text link next to a filled button reads as the
// lesser path. Continue is still visually forward (it is the only filled
// control, since it is the action that changes screen), while Postpone and
// Refuse are now full peers of equal size, weight, and prominence.
//
// ── CONTENT ──────────────────────────────────────────────────────────────
// No preparation guidance or checklist content is authored yet for any
// challenge — nothing is fabricated to fill this screen. The Challenge's own
// working objective is shown as honest context, and the pending state is
// stated plainly.
export default function ChallengePrepareScreen() {
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();
  const challenge = findChallengeById(challengeId);
  const { recordChallengeAttempt } = useProgress();
  const layout = useLayout();

  if (!challenge) {
    return (
      <Screen>
        <ScreenHeader title="Challenge not found" onBack={() => router.back()} />
      </Screen>
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
    <Screen measure="reading" backdropHeight={170}>
      <ScreenHeader title={`Prepare: ${challenge.name}`} onBack={() => router.back()} />

      <Animated.View entering={contentEnter}>
        <Plate variant="paper" elevated style={styles.objectivePlate}>
          <Eyebrow>The task ahead</Eyebrow>
          <Text style={styles.objective}>{challenge.objective}</Text>
        </Plate>
      </Animated.View>

      {challenge.safetyGateClass && (
        <Animated.View entering={staggeredEnter(1)}>
          <NoticePlate kicker="Safety gate">
            {`Curriculum safety gate: ${SAFETY_GATE_CLASSES[challenge.safetyGateClass]} — extra caution is expected. Detailed, reviewed safety requirements for it have not yet been authored.`}
          </NoticePlate>
        </Animated.View>
      )}

      <Animated.View entering={staggeredEnter(2)}>
        <ContentStatusNote researchStatus={challenge.researchStatus} area="preparation" />
      </Animated.View>

      <Animated.View entering={staggeredEnter(3)} style={styles.readiness}>
        <SurveyTicks count={19} />
        <BodyText>
          Continue only when you judge yourself ready — postponing or refusing are both reasonable
          choices here.
        </BodyText>
        <HairlineRule weight="faint" />
      </Animated.View>

      <Animated.View entering={staggeredEnter(4)} style={styles.actions}>
        <ActionButton
          label="Continue to Field Mode"
          onPress={() =>
            router.push({
              pathname: '/challenge/[challengeId]/field',
              params: { challengeId: challenge.id },
            })
          }
        />
        {/* Peers, not fallbacks. Same component, same size, same weight. */}
        <View style={[styles.peerActions, layout.isMedium && styles.peerActionsWide]}>
          <View style={styles.peer}>
            <ActionButton label="Postpone" variant="secondary" onPress={handlePostpone} />
          </View>
          <View style={styles.peer}>
            <ActionButton label="Refuse" variant="secondary" onPress={handleRefuse} />
          </View>
        </View>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  objectivePlate: {
    gap: spacing.md,
  },
  objective: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  readiness: {
    gap: spacing.md,
  },
  actions: {
    gap: spacing.md,
  },
  peerActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  peerActionsWide: {
    gap: spacing.lg,
  },
  peer: {
    flex: 1,
  },
});
