import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { BackLink } from '@/components/back-link';
import { ExplorationTile } from '@/components/exploration-tile';
import { ScreenContainer } from '@/components/screen-container';
import { findChallengesForUnit, findUnitById } from '@/content';
import { colors } from '@/design/tokens';

// Lists the unit's real, curriculum-assigned Challenges (see
// docs/curriculum/v1-curriculum-spec.md §8) honestly by working title and
// navigates to the existing Challenge journey route. No preparation,
// field, or reflection content is authored yet for any Challenge — this
// screen does not fabricate any (that remains 5C.2's UI/product
// integration work, not this pass's).
export default function UnitScreen() {
  const { unitId } = useLocalSearchParams<{ unitId: string }>();
  const unit = findUnitById(unitId);

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
      <Text style={styles.body}>
        {unitChallenges.length} challenges — curriculum structure is locked; challenge instructions
        have not yet been authored.
      </Text>
      {unitChallenges.map((challenge) => (
        <ExplorationTile
          key={challenge.id}
          title={challenge.name}
          onPress={() =>
            router.push({ pathname: '/challenge/[challengeId]', params: { challengeId: challenge.id } })
          }
        />
      ))}
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
});
