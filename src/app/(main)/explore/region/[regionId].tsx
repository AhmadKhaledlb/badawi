import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { BackLink } from '@/components/back-link';
import { ScreenContainer } from '@/components/screen-container';
import { desertEnvironment, findRegionById } from '@/content';
import { colors } from '@/design/tokens';

export default function RegionScreen() {
  const { regionId } = useLocalSearchParams<{ regionId: string }>();
  const region = findRegionById(regionId);

  if (!region) {
    return (
      <ScreenContainer>
        <BackLink onPress={() => router.back()} />
        <Text style={styles.heading}>Region not found</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <BackLink onPress={() => router.back()} />
      <Text style={styles.heading}>{region.name}</Text>
      <Text style={styles.body}>The active V1 environment within this region:</Text>
      <ActionButton
        label={`Explore ${desertEnvironment.name}`}
        onPress={() =>
          router.push({
            pathname: '/explore/environment/[environmentId]',
            params: { environmentId: desertEnvironment.id },
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
