import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Plate } from '@/components/plate';
import { pressedSurfaceStyle } from '@/components/press-feedback';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { BodyText, Eyebrow } from '@/components/section-heading';
import { StatusPill } from '@/components/status-pill';
import { desertEnvironment, findRegionById } from '@/content';
import { HairlineRule } from '@/design/illustration/notebook';
import { TerrainWindow } from '@/design/illustration/terrain-scene';
import { colors, contentEnter, radii, spacing, staggeredEnter, typography } from '@/design/tokens';

// ── REGION — ARRIVING IN THE TERRITORY ───────────────────────────────────
//
// The projection shifts here: the Blueprint Map looked DOWN at the territory
// from above; this screen is the first view from inside it, in elevation.
// That shift is what makes moving from Home to Region feel like arriving
// rather than like opening a submenu.
//
// The single active environment is presented as an illustrated DESTINATION —
// a terrain window you travel into — rather than as the previous plain
// "Explore Desert" button. It is still exactly one navigation action to
// exactly one destination; only its presentation changed.
//
// No field/survival content is invented: nothing about desert conditions,
// hazards, or preparation appears here, because none is authored.
export default function RegionScreen() {
  const { regionId } = useLocalSearchParams<{ regionId: string }>();
  const region = findRegionById(regionId);

  if (!region) {
    return (
      <Screen>
        <ScreenHeader title="Region not found" onBack={() => router.back()} />
      </Screen>
    );
  }

  return (
    <Screen measure="canvas" backdropHeight={260}>
      <ScreenHeader
        title={region.name}
        trail={['Blueprint Map']}
        onBack={() => router.back()}
      />

      <Animated.View entering={contentEnter}>
        <Plate variant="warm" style={styles.brief}>
          <Eyebrow>Active environment</Eyebrow>
          <BodyText>The active V1 environment within this region:</BodyText>
        </Plate>
      </Animated.View>

      <Animated.View entering={staggeredEnter(1)}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Explore ${desertEnvironment.name}`}
          onPress={() =>
            router.push({
              pathname: '/explore/environment/[environmentId]',
              params: { environmentId: desertEnvironment.id },
            })
          }
          style={({ pressed }) => [styles.destination, pressed && pressedSurfaceStyle]}>
          <TerrainWindow atmosphere="dawn" height={210} radius={radii.xl} cornerMarks />
          <View style={styles.destinationFooter}>
            <View style={styles.destinationText}>
              <Text style={styles.destinationName}>{desertEnvironment.name}</Text>
              <HairlineRule weight="faint" style={styles.destinationRule} />
              <Text style={styles.destinationCta}>{`Explore ${desertEnvironment.name}`}</Text>
            </View>
            <StatusPill label="Active" tone="neutral" marker />
          </View>
        </Pressable>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  brief: {
    gap: spacing.sm,
  },
  destination: {
    borderRadius: radii.xl,
    overflow: 'hidden',
    backgroundColor: colors.background,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.surfaceWarm,
  },
  destinationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.lg,
    padding: spacing.lg,
  },
  destinationText: {
    flex: 1,
    gap: spacing.sm,
  },
  destinationName: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  destinationRule: {
    width: 40,
  },
  destinationCta: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
});
