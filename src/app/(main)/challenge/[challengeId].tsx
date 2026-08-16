import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { BackLink } from '@/components/back-link';
import { OUTCOME_LABELS } from '@/components/challenge-outcome-labels';
import { ContentStatusNote } from '@/components/content-status-note';
import { TextLink } from '@/components/text-link';
import { ScreenContainer } from '@/components/screen-container';
import { findChallengeById, findUnitById } from '@/content';
import { colors } from '@/design/tokens';
import { SAFETY_GATE_CLASSES } from '@/domain';
import type { Challenge } from '@/domain/challenge';
import type { Unit } from '@/domain/unit';
import { useProgress } from '@/state/progress-context';

// Drives the Challenge screen from the real Challenge dataset (spec §8).
// `objective` is the spec's own "Learner-facing objective" (WORKING copy —
// see src/domain/content-status.ts); `purpose` is LOCKED specification
// text shown plainly as restrained framing, not polished learner copy.
// Prerequisites are shown for orientation only — this app does not block
// navigation on them (spec §16; 5C.1 deliberately did not establish a
// runtime "every prior Challenge must be complete" gate, and this pass
// does not invent one either). No safety instructions, field tasks, or
// taxonomy codes (C1, EVM2, ...) are exposed here.
export default function ChallengeScreen() {
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
    <ScreenContainer>
      <BackLink onPress={() => router.back()} />
      <Text style={styles.heading}>{challenge.name}</Text>
      <Text style={styles.objective}>{challenge.objective}</Text>
      <Text style={styles.body}>{challenge.purpose}</Text>

      {challenge.safetyGateClass && (
        <Text style={styles.meta}>
          Curriculum safety gate: {SAFETY_GATE_CLASSES[challenge.safetyGateClass]}.
        </Text>
      )}

      {hasPrerequisiteInfo && (
        <Text style={styles.meta}>
          Builds on:{' '}
          {[
            ...prerequisiteUnits.map((unit) => unit.name),
            ...prerequisiteChallenges.map((prerequisite) => prerequisite.name),
            challenge.prerequisiteNote,
          ]
            .filter(Boolean)
            .join(', ')}
          . This is curriculum context, not a requirement to proceed.
        </Text>
      )}

      {recorded && (
        <Text style={styles.meta}>Last attempt: {OUTCOME_LABELS[recorded.outcome]}.</Text>
      )}

      <ContentStatusNote researchStatus={challenge.researchStatus} area="task and safety" />

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
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: 600,
  },
  objective: {
    color: colors.textPrimary,
    fontSize: 18,
  },
  body: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  meta: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});
