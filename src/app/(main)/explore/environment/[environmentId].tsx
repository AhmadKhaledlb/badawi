import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { BackLink } from '@/components/back-link';
import { ScreenContainer } from '@/components/screen-container';
import { desertFoundationsPack, findEnvironmentById } from '@/content';
import { colors } from '@/design/tokens';

// No field/survival instruction is authored yet, so this screen shows only
// the environment's name and structural navigation onward — nothing about
// desert conditions, hazards, or preparation is invented here.
export default function EnvironmentScreen() {
  const { environmentId } = useLocalSearchParams<{ environmentId: string }>();
  const environment = findEnvironmentById(environmentId);

  if (!environment) {
    return (
      <ScreenContainer>
        <BackLink onPress={() => router.back()} />
        <Text style={styles.heading}>Environment not found</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <BackLink onPress={() => router.back()} />
      <Text style={styles.heading}>{environment.name}</Text>
      <Text style={styles.body}>The active V1 pack within this environment:</Text>
      <ActionButton
        label={`Open ${desertFoundationsPack.name}`}
        onPress={() =>
          router.push({
            pathname: '/pack/[packId]',
            params: { packId: desertFoundationsPack.id },
          })
        }
      />
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
