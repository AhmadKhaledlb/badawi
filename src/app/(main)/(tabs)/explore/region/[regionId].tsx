import { router, useLocalSearchParams } from 'expo-router';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HeroImage } from '@/components/hero-image';
import { pressedSurfaceStyle } from '@/components/press-feedback';
import { withOpacity } from '@/components/plate';
import { RegionMap, type RegionMarker } from '@/components/region-map';
import { RegionPatternDivider } from '@/components/region-pattern-divider';
import {
  challenges,
  desertEnvironment,
  desertFoundationsPack,
  findRegionById,
  V1_CHALLENGE_COUNT,
  V1_UNIT_COUNT,
} from '@/content';
import { colors, contentEnter, fontFamily, radii, spacing, staggeredEnter } from '@/design/tokens';
import { useProgress } from '@/state/progress-context';

// ── REGION — ARRIVING IN THE TERRITORY ───────────────────────────────────
//
// Phase 5A rebuild, reproducing the approved BADAWI App v2 Claude Design,
// screen 3c ("Region — packs on real territory, four in preparation").
// Explore answered "where has BADAWI done the work" at world scale; this
// screen narrows to "what environments/field territories exist within the
// Arabian Peninsula" — still discovery, not yet curriculum. Region →
// Environment → Pack → Unit → Challenge stays exactly as locked: Desert
// still routes through the real Environment screen, not straight to Pack.
//
// ── REAL DATA / TRUTHFUL AVAILABILITY (locked this pass) ─────────────────
// Desert is the one real V1 environment/pack — everything about it below
// (unit/challenge counts, real recorded progress) comes from
// src/content/ and src/state/progress-context.ts. Wadi, Mountain, Coast,
// and Oasis have no Environment/Pack/route in the real content model at
// all, so nothing about them lives in src/content/ or src/domain/ — the
// names, geographic reference points, and marker positions below are
// presentation-layer display data only, clearly separate from BADAWI's
// locked curriculum content, non-interactive, and never claim a route or
// pack that doesn't exist. Their "IN RESEARCH" label reuses the exact
// vocabulary already locked on Explore's legend rather than inventing a
// new term. Desert's own card doesn't claim its content is researched or
// safety-reviewed either — all 28 V1 challenges are still RQ0
// (Unresearched); this screen distinguishes product availability (Desert
// is OPEN) from content/research status (not asserted here at all, positive
// or negative — that disclosure already lives where it's authoritative, on
// the Prepare/Challenge screens' `ContentStatusNote`) rather than
// collapsing the two into one label.
//
// Marker positions are the real Miller-projected coordinates of well-known
// reference areas (Rub' al Khali, Wadi Hadhramaut, the Hajar range, the
// Gulf coast, the Al-Ain oasis belt) in the exact same coordinate space
// `RegionMap` renders — computed once, not eyeballed, and verified to fall
// within the peninsula's own real path data (not floating in the sea).
// These are broad territorial references, not GPS course locations.
const ENVIRONMENT_MARKERS: (RegionMarker & {
  geoLabel: string;
  illustration: ImageSourcePropType;
})[] = [
  { key: 'desert', name: 'Desert', x: 479.2, y: 233.6, status: 'open', geoLabel: "Rubʿ al Khali and the Nafud sand seas", illustration: require('../../../../../../assets/illustrations/environments/desert-card.png') },
  { key: 'wadi', name: 'Wadi', x: 482.4, y: 245.6, status: 'in-research', geoLabel: 'Wadi Hadhramaut', illustration: require('../../../../../../assets/illustrations/environments/wadi.png') },
  { key: 'mountain', name: 'Mountain', x: 499.3, y: 227.0, status: 'in-research', geoLabel: 'Hajar range', illustration: require('../../../../../../assets/illustrations/environments/mountains.png') },
  { key: 'coast', name: 'Coast', x: 488.7, y: 223.6, status: 'in-research', geoLabel: 'Gulf coast', illustration: require('../../../../../../assets/illustrations/environments/coast.png') },
  { key: 'oasis', name: 'Oasis', x: 497.6, y: 226.5, status: 'in-research', geoLabel: 'Al-Ain oasis belt', illustration: require('../../../../../../assets/illustrations/environments/oasis.png') },
];

function goToDesert() {
  // Region → Environment, preserved exactly as the existing route already
  // does — not shortened to Region → Pack even though a direct route would
  // be more convenient, per the locked hierarchy.
  router.push({
    pathname: '/explore/environment/[environmentId]',
    params: { environmentId: desertEnvironment.id },
  });
}

export default function RegionScreen() {
  const { regionId } = useLocalSearchParams<{ regionId: string }>();
  const region = findRegionById(regionId);
  const insets = useSafeAreaInsets();
  const { progress, isHydrated } = useProgress();

  if (!region) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Region not found</Text>
      </View>
    );
  }

  if (!isHydrated) {
    return null;
  }

  const completedCount = challenges.filter((c) => progress.challenges[c.id]?.outcome === 'completed').length;
  const desertMarker = ENVIRONMENT_MARKERS.find((m) => m.status === 'open');
  const inPreparationMarkers = ENVIRONMENT_MARKERS.filter((m) => m.status !== 'open');

  if (!desertMarker) {
    return null;
  }

  return (
    <Animated.ScrollView
      entering={contentEnter}
      style={styles.root}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { paddingTop: insets.top + 4 }]}>
        <View style={styles.headerTopRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to Explore"
            hitSlop={9}
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backButton, pressed && pressedSurfaceStyle]}>
            <Svg width={10} height={16} viewBox="0 0 12 20" fill="none">
              <Path
                d="M10 2L2 10l8 8"
                stroke={colors.textOnDeep}
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Pressable>
          <Text style={styles.eyebrow}>REGION</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{region.name}</Text>
          <Text style={styles.supporting}>
            A geographic layer, not a single culture. Five environments, each with its own
            knowledge sources.
          </Text>
        </View>

        <RegionMap
          markers={ENVIRONMENT_MARKERS}
          onPressOpenMarker={(key) => {
            if (key === 'desert') goToDesert();
          }}
        />
      </View>

      <RegionPatternDivider height={10} />

      <View style={styles.body}>
        <Text style={styles.sectionEyebrow}>OPEN</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Open ${desertMarker.name}`}
          onPress={goToDesert}
          style={({ pressed }) => [styles.desertCard, pressed && pressedSurfaceStyle]}>
          {/* focalY=0.3: shifts the crop window up (toward the source's top/
              sky) instead of the default centered crop — same frame size,
              same source, same effective zoom, just a different vertical
              slice of the already-correctly-sized image. */}
          <HeroImage
            source={desertMarker.illustration}
            aspectRatio={1}
            height={240}
            scrim={false}
            focalY={0.3}
          />
          <View style={styles.desertBody}>
            <View style={styles.desertHeaderRow}>
              <Text style={styles.desertName}>{desertMarker.name}</Text>
              <View style={styles.pill}>
                <View style={styles.pillMarker} />
                <Text style={styles.pillLabel}>OPEN</Text>
              </View>
            </View>
            <Text style={styles.desertMeta}>
              {`${desertFoundationsPack.name} · ${V1_UNIT_COUNT} units, ${V1_CHALLENGE_COUNT} challenges. ${desertMarker.geoLabel}.`}
            </Text>
            <View style={styles.progressRow}>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(completedCount / V1_CHALLENGE_COUNT) * 100}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressLabel}>{`${completedCount}/${V1_CHALLENGE_COUNT}`}</Text>
            </View>
          </View>
        </Pressable>

        <View style={styles.comingSoonHeader}>
          <Text style={styles.sectionEyebrowMuted}>COMING SOON</Text>
          <Text style={styles.comingSoonHint}>in research</Text>
        </View>

        <View style={styles.preparationList}>
          {inPreparationMarkers.map((marker, index) => (
            <Animated.View key={marker.key} entering={staggeredEnter(index)} style={styles.preparationRow}>
              <Image source={marker.illustration} style={styles.preparationThumb} resizeMode="cover" />
              <View style={styles.preparationText}>
                <Text style={styles.preparationName}>{marker.name}</Text>
                <Text style={styles.preparationGeo}>{marker.geoLabel}</Text>
              </View>
              <View style={styles.pillMuted}>
                <Text style={styles.pillMutedLabel}>IN RESEARCH</Text>
              </View>
            </Animated.View>
          ))}
        </View>
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surfaceWarm,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceWarm,
  },
  notFoundText: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  // The Night→Ink gradient the approved design uses isn't a flat token —
  // `react-native-linear-gradient`/`expo-linear-gradient` would be a new
  // dependency for one panel; a flat Night fill reads as the same "arriving
  // from Explore's Night canvas" cue without adding one. Both are already-
  // locked palette colors either way (surfaceDeep = Night).
  header: {
    backgroundColor: colors.surfaceDeep,
    paddingHorizontal: 20,
    paddingBottom: 0,
    gap: 10,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  // Region-local — smaller than the shared `RoundIconButton` (30dp vs its
  // 34dp), retuned toward approved 3c's more understated back affordance.
  // Not a change to the shared component: `RoundIconButton` is used
  // elsewhere (e.g. `ScreenHeader`) and resizing it would ripple beyond
  // this screen. Touch target still clears the 48dp floor via `hitSlop`.
  backButton: {
    width: 30,
    height: 30,
    borderRadius: radii.md,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: withOpacity(colors.textOnDeep, 0.35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 9,
    letterSpacing: 1.8,
    color: colors.textOnDeepMuted,
  },
  headerText: {
    gap: 5,
  },
  title: {
    fontFamily: fontFamily.displayBold,
    fontSize: 29,
    lineHeight: 33,
    color: colors.textOnDeep,
  },
  supporting: {
    fontFamily: fontFamily.textRegular,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textOnDeepMuted,
    opacity: 0.8,
    maxWidth: 300,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: spacing.xxxl,
    gap: 6,
  },
  sectionEyebrow: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 9,
    letterSpacing: 1.8,
    color: colors.textSecondary,
  },
  desertCard: {
    marginTop: 9,
    backgroundColor: colors.background,
    borderRadius: 22,
    overflow: 'hidden',
  },
  desertBody: {
    paddingHorizontal: 18,
    paddingTop: 15,
    paddingBottom: 18,
    gap: 7,
  },
  desertHeaderRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  desertName: {
    fontFamily: fontFamily.displayBold,
    fontSize: 23,
    lineHeight: 25,
    color: colors.textPrimary,
  },
  desertMeta: {
    fontFamily: fontFamily.textRegular,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  // Small pills — Region-local rather than the shared `StatusPill`, sized
  // to approved 3c's own compact badge (its "OPEN"/"IN RESEARCH" tags read
  // noticeably smaller than `StatusPill`'s default 11px label). Same
  // underlying real data/labels either way, just a tighter footprint.
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: radii.pill,
    paddingVertical: 5,
    paddingHorizontal: 9,
    backgroundColor: colors.surfaceWarm,
  },
  pillMarker: {
    width: 6,
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.accent,
  },
  pillLabel: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 8.5,
    letterSpacing: 1,
    color: colors.textPrimary,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 5,
  },
  progressTrack: {
    flex: 1,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.surfaceWarm,
    overflow: 'hidden',
  },
  // `terrainMid` (Deep Sage) — a non-text illustration fill already
  // approved for exactly this kind of qualitative progress indicator
  // (matches Home's own arc-bar treatment), not a new color.
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.terrainMid,
  },
  progressLabel: {
    fontFamily: fontFamily.textMedium,
    fontSize: 11,
    color: colors.textSecondary,
  },
  comingSoonHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 22,
  },
  sectionEyebrowMuted: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 9,
    letterSpacing: 1.8,
    color: colors.textSecondary,
    opacity: 0.75,
  },
  comingSoonHint: {
    fontFamily: fontFamily.textRegular,
    fontSize: 11,
    color: colors.textSecondary,
    opacity: 0.6,
  },
  preparationList: {
    gap: 9,
    marginTop: 10,
  },
  preparationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.background,
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.surfaceWarm,
    padding: 11,
  },
  preparationThumb: {
    width: 52,
    height: 52,
    borderRadius: radii.md,
    opacity: 0.6,
  },
  preparationText: {
    flex: 1,
    gap: 2,
  },
  preparationName: {
    fontFamily: fontFamily.displayBold,
    fontSize: 17,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  preparationGeo: {
    fontFamily: fontFamily.textRegular,
    fontSize: 11.5,
    color: colors.textSecondary,
    opacity: 0.7,
  },
  pillMuted: {
    borderRadius: radii.pill,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: withOpacity(colors.textSecondary, 0.3),
  },
  pillMutedLabel: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 7.5,
    letterSpacing: 0.8,
    color: colors.textSecondary,
    opacity: 0.85,
  },
});
