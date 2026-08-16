import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { BackLink } from '@/components/back-link';
import { ExplorationTile } from '@/components/exploration-tile';
import { ScreenContainer } from '@/components/screen-container';
import { findPackById, findUnitsForPack } from '@/content';
import { colors } from '@/design/tokens';

// Lists the 6 structural Unit placeholders honestly — each `unit.name`
// already carries its own "(placeholder — name not yet authored)" wording
// from the content layer, and is rendered as-is rather than dressed up as
// authored curriculum. Tapping a unit navigates to the existing Unit
// placeholder route; no real Unit screen is implemented here.
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
      <Text style={styles.body}>
        {units.length} structural unit placeholders — curriculum content is not yet authored.
      </Text>
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
