import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { ActionButton } from '@/components/action-button';
import { OUTCOME_LABELS } from '@/components/challenge-outcome-labels';
import { ContentStatusNote } from '@/components/content-status-note';
import { NoticePlate } from '@/components/notice-plate';
import { Plate } from '@/components/plate';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { BodyText, Eyebrow, MetaText, Ordinal } from '@/components/section-heading';
import { TextLink } from '@/components/text-link';
import { findChallengeById, findUnitById } from '@/content';
import { HairlineRule } from '@/design/illustration/notebook';
import { TerrainWindow } from '@/design/illustration/terrain-scene';
import { colors, contentEnter, spacing, staggeredEnter, typography } from '@/design/tokens';
import { SAFETY_GATE_CLASSES } from '@/domain';
import type { Challenge } from '@/domain/challenge';
import type { Unit } from '@/domain/unit';
import { useProgress } from '@/state/progress-context';

// ── CHALLENGE — THE FIELD CARD ───────────────────────────────────────────
//
// A single challenge presented as a field card: a shallow terrain window
// establishes place, and an overlapping paper plate carries the learner-facing
// objective set large in the display serif, with the locked purpose beneath as
// quieter framing. Supporting material — safety gate, curriculum context,
// prior attempt, pending-content notice — reads down the page as annotations
// on that card rather than as more cards of equal weight.
//
// ── UNCHANGED FROM THE PREVIOUS IMPLEMENTATION (deliberately) ────────────
// `objective` is the spec's own "Learner-facing objective" (WORKING copy);
// `purpose` is LOCKED specification text shown plainly, not dressed up as
// polished learner copy. Prerequisites are shown for ORIENTATION ONLY — this
// app does not block navigation on them (spec §16), and this pass does not
// invent a gate. No safety instructions, field tasks, or taxonomy codes
// (C1, EVM2, RK1, RQ0 …) are exposed. All of that is behaviour, and none of
// it changed; only its presentation did.
export default function ChallengeScreen() {
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

  const unit = findUnitById(challenge.unitId);

  const prerequisiteChallenges = challenge.prerequisiteChallengeIds
    .map(findChallengeById)
    .filter((value): value is Challenge => value !== undefined);
  const prerequisiteUnits = (challenge.prerequisiteUnitIds ?? [])
    .map(findUnitById)
    .filter((value): value is Unit => value !== undefined);
  const hasPrerequisiteInfo =
    prerequisiteChallenges.length > 0 || prerequisiteUnits.length > 0 || challenge.prerequisiteNote;

  const recorded = isHydrated ? progress.challenges[challenge.id] : undefined;

  return (
    <Screen measure="reading" backdropHeight={250}>
      <ScreenHeader
        title={challenge.name}
        // Only the parent Unit. The challenge's own name is the title and is
        // asserted to appear exactly once by the screen tests.
        trail={unit ? [unit.name] : undefined}
        onBack={() => router.back()}
        rule={false}
      />

      <Animated.View entering={contentEnter} style={styles.card}>
        <TerrainWindow atmosphere="day" height={128} cornerMarks={false} />
        <Plate variant="paper" elevated style={styles.cardPlate}>
          <View style={styles.cardHead}>
            <Ordinal value={challenge.order} size="md" accent />
            <Eyebrow>{`Challenge ${String(challenge.order).padStart(2, '0')}`}</Eyebrow>
          </View>
          <Text style={styles.objective}>{challenge.objective}</Text>
          <HairlineRule weight="faint" />
          <BodyText>{challenge.purpose}</BodyText>
        </Plate>
      </Animated.View>

      {challenge.safetyGateClass && (
        <Animated.View entering={staggeredEnter(1)}>
          <NoticePlate kicker="Safety gate">
            {`Curriculum safety gate: ${SAFETY_GATE_CLASSES[challenge.safetyGateClass]}.`}
          </NoticePlate>
        </Animated.View>
      )}

      {hasPrerequisiteInfo && (
        <Animated.View entering={staggeredEnter(2)}>
          <Plate variant="warm" style={styles.context}>
            <Eyebrow>Curriculum context</Eyebrow>
            <MetaText>
              {`Builds on: ${[
                ...prerequisiteUnits.map((prerequisiteUnit) => prerequisiteUnit.name),
                ...prerequisiteChallenges.map((prerequisite) => prerequisite.name),
                challenge.prerequisiteNote,
              ]
                .filter(Boolean)
                .join(', ')}. This is curriculum context, not a requirement to proceed.`}
            </MetaText>
          </Plate>
        </Animated.View>
      )}

      {recorded && (
        <Animated.View entering={staggeredEnter(3)} style={styles.lastAttempt}>
          <View style={styles.lastAttemptMark} />
          <MetaText>{`Last attempt: ${OUTCOME_LABELS[recorded.outcome]}.`}</MetaText>
        </Animated.View>
      )}

      <Animated.View entering={staggeredEnter(4)}>
        <ContentStatusNote researchStatus={challenge.researchStatus} area="task and safety" />
      </Animated.View>

      <Animated.View entering={staggeredEnter(5)} style={styles.actions}>
        <ActionButton
          label="Continue to Preparation"
          onPress={() =>
            router.push({
              pathname: '/challenge/[challengeId]/prepare',
              params: { challengeId: challenge.id },
            })
          }
        />
        {recorded && (
          <TextLink
            label="View last review"
            onPress={() =>
              router.push({
                pathname: '/challenge/[challengeId]/review',
                params: { challengeId: challenge.id },
              })
            }
          />
        )}
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 0,
  },
  cardPlate: {
    marginTop: -44,
    marginHorizontal: spacing.md,
    gap: spacing.md,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  objective: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  context: {
    gap: spacing.sm,
  },
  lastAttempt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  // A plotted survey dot rather than a status colour: an attempt outcome is a
  // neutral record, never a good/bad signal (docs/safety/README.md).
  lastAttemptMark: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textSecondary,
    opacity: 0.5,
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing.xs,
    alignItems: 'stretch',
  },
});
