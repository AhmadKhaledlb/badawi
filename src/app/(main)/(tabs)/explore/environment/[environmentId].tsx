import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { HeroImage } from '@/components/hero-image';
import { Plate } from '@/components/plate';
import { pressedSurfaceStyle } from '@/components/press-feedback';
import { RoundIconButton } from '@/components/round-icon-button';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { BodyText, Eyebrow, MetaText, ScreenHeading, SectionTitle } from '@/components/section-heading';
import {
  arabianPeninsulaRegion,
  desertFoundationsPack,
  findEnvironmentById,
  findUnitsForPack,
  V1_CHALLENGE_COUNT,
} from '@/content';
import { HairlineRule } from '@/design/illustration/notebook';
import { TerrainWindow } from '@/design/illustration/terrain-scene';
import { colors, contentEnter, radii, spacing, staggeredEnter, typography } from '@/design/tokens';

// ── ENVIRONMENT — THE LANDSCAPE ARRIVAL ──────────────────────────────────
//
// No dedicated Environment mockup exists in the approved BADAWI App v2
// Claude Design set — that reference goes straight from Region ("packs on
// real territory") to Pack ("the six-unit journey as terrain"). This screen
// is built from the grammar both neighbors already establish rather than
// from a literal image:
//
//   Region:      cartographic/geographic arrival — Night, the map.
//   Environment: environmental identity/landscape arrival — Bone/Light, a
//                real photograph of the terrain, then what's available here.
//   Pack:        the structured six-unit journey.
//
// A first pass at this screen (the previous version of this file) reused
// the Pack dossier's own TerrainWindow illustration as Environment's hero,
// which made the two screens visually indistinguishable — Environment
// answered "what's the route" (Pack's question) instead of "what is this
// place." Rebuilt so Environment now opens on the real desert photograph
// already established elsewhere in the app (Home's own hero uses the same
// asset/fit), THEN a short grounded identity statement, THEN the Pack
// dossier — so the terrain window and route-profile preview are still here,
// but as the bridge INTO Pack, not as Environment's own headline visual.
//
// The unit/challenge figures are structural facts read straight from
// content (6 units, 28 challenges), not progress, not a score, and not a
// completion metric. No field/survival instruction is authored yet, so
// this screen still says nothing about desert conditions, hazards, or
// preparation — the identity line below states only what the real content
// model actually knows (the environment's name, its region, and that one
// Pack exists here).
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

  function goToPack() {
    router.push({
      pathname: '/pack/[packId]',
      params: { packId: desertFoundationsPack.id },
    });
  }

  return (
    <Screen measure="canvas">
      {/* HEADER — back affordance, hierarchy-level eyebrow, the
          environment's own name in Young Serif, then its region as a
          restrained context line. Mirrors Region's own header shape
          (back+eyebrow inline, title+context stacked below) rather than
          the shared ScreenHeader's breadcrumb-above-title arrangement,
          which has no slot for a context line AFTER the title. */}
      <Animated.View entering={contentEnter} style={styles.header}>
        <View style={styles.headerTopRow}>
          <RoundIconButton icon="chevronLeft" accessibilityLabel="Back" onPress={() => router.back()} />
          <Eyebrow>Environment</Eyebrow>
        </View>
        <View style={styles.headerText}>
          <ScreenHeading>{environment.name}</ScreenHeading>
          <MetaText>{arabianPeninsulaRegion.name}</MetaText>
        </View>
      </Animated.View>

      {/* HERO — the real desert landscape (same asset/near-zero-crop fit
          Home's own hero already established: natural 1536×1024 ratio, no
          artificial zoom, no focal enlargement), establishing "you have
          arrived in the Desert environment" before any text does. No scrim
          or overlay text — the identity block below carries that, so the
          photograph reads clean. */}
      <Animated.View entering={staggeredEnter(1)}>
        <HeroImage
          source={require('../../../../../../assets/illustrations/environments/desert-landscape.png')}
          aspectRatio={1536 / 1024}
          height={240}
          scrim={false}
        />
      </Animated.View>

      {/* IDENTITY/CONTEXT — one grounded sentence, sourced entirely from
          real content (environment name, region name, Pack name). No
          climate claims, no hazards, no invented field guidance. */}
      <Animated.View entering={staggeredEnter(2)}>
        <Plate variant="warm">
          <BodyText>
            {`${desertFoundationsPack.name} is the one pack available in ${environment.name}, ${arabianPeninsulaRegion.name}.`}
          </BodyText>
        </Plate>
      </Animated.View>

      {/* AVAILABLE PACK — the bridge into Pack 3d: its own terrain window
          (dawn, per terrain-scene.tsx's documented "Region/environment
          heroes" role — the warm arrival tone, one step before Pack's own
          `day` ramp begins), the six-station route preview, real
          unit/challenge counts, and a direct CTA into the real Pack route. */}
      <Animated.View entering={staggeredEnter(3)} style={styles.packSection}>
        <Eyebrow>Available pack</Eyebrow>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Enter ${desertFoundationsPack.name}`}
          onPress={goToPack}
          style={({ pressed }) => [styles.dossier, pressed && pressedSurfaceStyle]}>
          <TerrainWindow atmosphere="dawn" height={180} radius={radii.xl} cornerMarks />

          <View style={styles.dossierBody}>
            <SectionTitle>{desertFoundationsPack.name}</SectionTitle>

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

            <View style={styles.ctaRow}>
              <Text style={styles.cta}>{`Enter ${desertFoundationsPack.name}`}</Text>
              <Text style={styles.ctaArrow}>→</Text>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    gap: 4,
  },
  packSection: {
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
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cta: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  ctaArrow: {
    ...typography.label,
    color: colors.accent,
  },
});
