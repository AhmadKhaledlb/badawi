import { router } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { ExplorationTile } from '@/components/exploration-tile';
import { ScreenContainer } from '@/components/screen-container';
import { arabianPeninsulaRegion } from '@/content';
import { colors } from '@/design/tokens';

// The approved exploratory Blueprint Map (docs/design/README.md,
// "Navigation Model"): Arabian Peninsula as the active V1 region, with
// other regions visibly locked/coming soon. Content only defines one real
// region so far, so the locked tile below is a generic, unnamed
// placeholder — inventing a specific fictional region name would be worse
// than representing "more to come" honestly.
export default function HomeScreen() {
  return (
    <ScreenContainer>
      <Text style={styles.heading}>Blueprint Map</Text>
      <Text style={styles.subheading}>Choose where to begin.</Text>

      <ExplorationTile
        title={arabianPeninsulaRegion.name}
        subtitle="Active region"
        onPress={() =>
          router.push({
            pathname: '/explore/region/[regionId]',
            params: { regionId: arabianPeninsulaRegion.id },
          })
        }
      />

      <ExplorationTile title="More regions" subtitle="Coming soon" locked />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: 600,
  },
  subheading: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});
