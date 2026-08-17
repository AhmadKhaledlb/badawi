import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Plate } from '@/components/plate';
import { pressedSurfaceStyle } from '@/components/press-feedback';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { BodyText, Eyebrow } from '@/components/section-heading';
import {
  desertFoundationsPack,
  findEnvironmentById,
  findUnitsForPack,
  V1_CHALLENGE_COUNT,
} from '@/content';
import { HairlineRule } from '@/design/illustration/notebook';
import { TerrainWindow } from '@/design/illustration/terrain-scene';
import { colors, contentEnter, radii, spacing, staggeredEnter, typography } from '@/design/tokens';

// ── ENVIRONMENT — THE PACK DOSSIER ───────────────────────────────────────
//
// The Desert, and the one Pack inside it, presented as an expedition dossier:
// a terrain window, then a route-profile preview showing the six stations as
// markers on a plotted line — a small promise of the full route the Pack
// screen delivers. That preview is drawn from the real Units in
// src/content/units.ts, so it can never show a station count the curriculum
// doesn't have.
//
// The unit/challenge figures are structural facts read straight from content
// (6 units, 28 challenges), not progress, not a score, and not a completion
// metric.
//
// No field/survival instruction is authored yet, so this screen still says
// nothing about desert conditions, hazards, or preparation.
export default function EnvironmentScreen() {
  const { environmentId } = useLocalSearchParams<{ environmentId: string }>();
  const environment = findEnvironmentById(environmentId);

  if (!environment) {
    return (
      <Screen>
        <ScreenHeader title="Environment not found" onBack={() => router.back()} />
      </Screen>
    );
  }

  const units = findUnitsForPack(desertFoundationsPack.id);

  return (
    <Screen measure="canvas" backdropHeight={260}>
      <ScreenHeader
        title={environment.name}
        trail={['Arabian Peninsula']}
        onBack={() => router.back()}
      />

      <Animated.View entering={contentEnter}>
        <Plate variant="warm" style={styles.brief}>
          <Eyebrow>Active pack</Eyebrow>
          <BodyText>The active V1 pack within this environment:</BodyText>
        </Plate>
      </Animated.View>

      <Animated.View entering={staggeredEnter(1)}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Open ${desertFoundationsPack.name}`}
          onPress={() =>
            router.push({
              pathname: '/pack/[packId]',
              params: { packId: desertFoundationsPack.id },
            })
          }
          style={({ pressed }) => [styles.dossier, pressed && pressedSurfaceStyle]}>
          <TerrainWindow atmosphere="day" height={200} radius={radii.xl} cornerMarks />

          <View style={styles.dossierBody}>
            <Text style={styles.packName}>{desertFoundationsPack.name}</Text>

            {/* Route profile: the six stations previewed as markers on a line. */}
            <View
              style={styles.profile}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants">
              <View style={styles.profileLine} />
              {units.map((unit) => (
                <View key={unit.id} style={styles.profileNode} />
              ))}
            </View>

            <HairlineRule weight="faint" />

            <View style={styles.facts}>
              <Text style={styles.fact}>{`${units.length} units`}</Text>
              <View style={styles.factDivider} />
              <Text style={styles.fact}>{`${V1_CHALLENGE_COUNT} challenges`}</Text>
            </View>

            <Text style={styles.cta}>{`Open ${desertFoundationsPack.name}`}</Text>
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
  dossier: {
    borderRadius: radii.xl,
    overflow: 'hidden',
    backgroundColor: colors.background,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.surfaceWarm,
  },
  dossierBody: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  packName: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 18,
    position: 'relative',
  },
  profileLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.surfaceWarm,
  },
  profileNode: {
    width: 12,
    height: 12,
    borderRadius: radii.pill,
    borderWidth: 2,
    borderColor: colors.accent,
    backgroundColor: colors.background,
  },
  facts: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  fact: {
    ...typography.metaEmphasis,
    color: colors.textSecondary,
  },
  factDivider: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.textSecondary,
    opacity: 0.5,
  },
  cta: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
});
