import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { BackLink } from '@/components/back-link';
import { ExplorationTile } from '@/components/exploration-tile';
import { ScreenContainer } from '@/components/screen-container';
import { findPackById, findUnitsForPack } from '@/content';
import { colors } from '@/design/tokens';

// Lists the 6 authoritative V1 Units (docs/curriculum/v1-curriculum-spec.md
// §6) by their working title. Tapping a unit navigates to the Unit route,
// which in turn lists that unit's real, curriculum-assigned Challenges.
export default function PackScreen() {
  const { packId } = useLocalSearchParams<{ packId: string }>();
  const pack = findPackById(packId);

  if (!pack) {
    return (
      <ScreenContainer>
        <BackLink onPress={() => router.back()} />
        <Text style={styles.heading}>Pack not found</Text>
      </ScreenContainer>
    );
  }

  const units = findUnitsForPack(pack.id);

  return (
    <ScreenContainer>
      <BackLink onPress={() => router.back()} />
      <Text style={styles.heading}>{pack.name}</Text>
      <Text style={styles.body}>{units.length} units — curriculum structure is locked.</Text>
      {units.map((unit) => (
        <ExplorationTile
          key={unit.id}
          title={unit.name}
          onPress={() =>
            router.push({ pathname: '/unit/[unitId]', params: { unitId: unit.id } })
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
