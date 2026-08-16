import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { BackLink } from '@/components/back-link';
import { ScreenContainer } from '@/components/screen-container';
import { findUnitById } from '@/content';
import { colors } from '@/design/tokens';

// No challenge-to-unit assignment is documented anywhere in the repository
// (see src/content/unresolved-challenge-placeholders.ts) — this screen
// does not fabricate one. It shows the unit's already placeholder-labeled
// name honestly and states plainly that challenge assignment is pending,
// rather than listing or linking to any specific challenge.
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

  return (
    <ScreenContainer>
      <BackLink onPress={() => router.back()} />
      <Text style={styles.heading}>{unit.name}</Text>
      <Text style={styles.body}>
        Challenge assignment for this unit is pending — challenges have not yet been mapped to
        units, so none are listed here.
      </Text>
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
