import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { BackLink } from '@/components/back-link';
import { OUTCOME_LABELS } from '@/components/challenge-outcome-labels';
import { ExplorationTile } from '@/components/exploration-tile';
import { ScreenContainer } from '@/components/screen-container';
import { findChallengesForUnit, findUnitById } from '@/content';
import { colors } from '@/design/tokens';
import { useProgress } from '@/state/progress-context';

// Lists the unit's real, curriculum-assigned Challenges (spec §8) in
// canonical order and navigates to the existing Challenge journey route.
// `coreQuestion`/`purpose` are LOCKED specification text (spec §14) shown
// plainly as structural framing, not dressed up as polished learner copy
// — see docs/curriculum/v1-curriculum-spec.md §14 and src/domain/unit.ts.
// No preparation, field, or reflection content is invented here.
export default function UnitScreen() {
  const { unitId } = useLocalSearchParams<{ unitId: string }>();
  const unit = findUnitById(unitId);
  const { progress } = useProgress();

  if (!unit) {
    return (
      <ScreenContainer>
        <BackLink onPress={() => router.back()} />
        <Text style={styles.heading}>Unit not found</Text>
      </ScreenContainer>
    );
  }

  const unitChallenges = findChallengesForUnit(unit.id);

  return (
    <ScreenContainer>
      <BackLink onPress={() => router.back()} />
      <Text style={styles.heading}>{unit.name}</Text>
      <Text style={styles.coreQuestion}>{unit.coreQuestion}</Text>
      <Text style={styles.body}>{unit.purpose}</Text>
      <Text style={styles.meta}>{unitChallenges.length} challenges in this unit.</Text>
      {unitChallenges.map((challenge) => {
        const recorded = progress.challenges[challenge.id];
        return (
          <ExplorationTile
            key={challenge.id}
            title={challenge.name}
            subtitle={recorded ? OUTCOME_LABELS[recorded.outcome] : undefined}
            onPress={() =>
              router.push({ pathname: '/challenge/[challengeId]', params: { challengeId: challenge.id } })
            }
          />
        );
      })}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: 600,
  },
  coreQuestion: {
    color: colors.textPrimary,
    fontSize: 18,
    fontStyle: 'italic',
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
