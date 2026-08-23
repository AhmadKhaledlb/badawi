import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { pressedSurfaceStyle } from '@/components/press-feedback';
import { WorldCanvas } from '@/components/world-canvas';
import { arabianPeninsulaRegion, desertFoundationsPack, V1_UNIT_COUNT } from '@/content';
import { colors, contentEnter, fontFamily, radii, spacing } from '@/design/tokens';

// ── EXPLORE — THE WORLD, DORMANT EXCEPT ONE REGION ───────────────────────
//
// Phase 5A rebuild, reproducing the approved BADAWI App v2 Claude Design,
// screen 3b, corrected after simulator review. Explore is deliberately
// unlike Home: Home is Bone and asks "what's next"; Explore is Night and
// answers "where has BADAWI actually done the work" — a quiet, cartographic
// surface, not another dashboard.
//
// ── REAL DATA ONLY ────────────────────────────────────────────────────────
// Arabian Peninsula is the sole real V1 region (src/content/region.ts).
// Nothing else on this screen names a specific future region — see
// WorldCanvas's own header comment for why, and the legend-terminology note
// below.
//
// ── LEGEND TERMINOLOGY (locked this pass) ────────────────────────────────
// The first pass used the approved mock's own "UNLOCKABLE" state, whose
// reference copy ("opens once you reach Independent in one full pack") is
// achievement-gated — flagged, not silently kept, because it contradicted
// BADAWI's actual expansion model (research/authorship/release, never
// learner progression). Resolved this pass by removing it: BADAWI's
// availability vocabulary is now OPEN / IN RESEARCH / PLANNED / UNAVAILABLE
// (WorldCanvas's legend). No existing doc defines a region-level
// availability vocabulary to defer to — the closest established term is
// src/domain/research-status.ts's RQ1 "Research in Progress" (a per-
// Challenge content status, not a region field), which "IN RESEARCH"
// deliberately echoes rather than duplicates.
function goToRegion() {
  router.push({
    pathname: '/explore/region/[regionId]',
    params: { regionId: arabianPeninsulaRegion.id },
  });
}

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();

  return (
    <Animated.ScrollView
      entering={contentEnter}
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 8 }]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>EXPLORE</Text>
        <Text style={styles.heading}>{'Where BADAWI has done the work'}</Text>
        <Text style={styles.supporting}>
          One region is researched and open. The rest of the map is dormant — not locked behind
          you, simply not written yet.
        </Text>
      </View>

      <WorldCanvas activeName={arabianPeninsulaRegion.name} onPressActive={goToRegion} />

      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <View>
            <Text style={styles.cardEyebrow}>OPEN NOW</Text>
            <Text style={styles.cardTitle}>{arabianPeninsulaRegion.name}</Text>
          </View>
          <Text style={styles.cardMeta}>{`1 pack · ${V1_UNIT_COUNT} units`}</Text>
        </View>
        <Text style={styles.cardBody}>
          {`${desertFoundationsPack.name} is the one pack open here. Content is drafted; research and safety review are still in progress.`}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Enter the region: ${arabianPeninsulaRegion.name}`}
          onPress={goToRegion}
          style={({ pressed }) => [styles.enterRow, pressed && pressedSurfaceStyle]}>
          <Text style={styles.enterLabel}>Enter the region</Text>
          <Text style={styles.enterArrow}>→</Text>
        </Pressable>
        <Text style={styles.growthNote}>BADAWI is growing. New regions arrive researched, not unlocked.</Text>
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surfaceDeep,
  },
  content: {
    paddingHorizontal: 22,
    paddingBottom: spacing.md,
    gap: 10,
  },
  header: {
    gap: 4,
  },
  eyebrow: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 9,
    letterSpacing: 1.8,
    color: colors.textOnDeepMuted,
  },
  // Retuned again this pass: 25/27 → 22/24, tighter supporting-copy
  // line-height, smaller header→map gap — the map's own aspect ratio grew
  // substantially this pass (src/design/illustration/world-geography.ts,
  // now ~1.36:1 instead of ~1.9:1), so it needs less help from a
  // compressed header to read as dominant, but every bit of reclaimed
  // vertical room still goes to the map, not to extra whitespace.
  heading: {
    fontFamily: fontFamily.displayBold,
    fontSize: 22,
    lineHeight: 24,
    color: colors.textOnDeep,
  },
  supporting: {
    fontFamily: fontFamily.textRegular,
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.textOnDeepMuted,
    opacity: 0.75,
    maxWidth: 300,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 22,
    padding: 16,
    gap: 7,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  cardEyebrow: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 9,
    letterSpacing: 1.8,
    color: colors.textSecondary,
  },
  cardTitle: {
    fontFamily: fontFamily.displayBold,
    fontSize: 22,
    lineHeight: 24,
    color: colors.textPrimary,
    marginTop: 3,
  },
  cardMeta: {
    fontFamily: fontFamily.textMedium,
    fontSize: 11,
    color: colors.textSecondary,
  },
  cardBody: {
    fontFamily: fontFamily.textRegular,
    fontSize: 12,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  enterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    backgroundColor: colors.textPrimary,
    borderRadius: radii.md,
    height: 44,
    marginTop: spacing.xs,
  },
  enterLabel: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 13,
    color: colors.textOnDeep,
  },
  enterArrow: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 13,
    color: colors.accentOnDeep,
  },
  growthNote: {
    fontFamily: fontFamily.textRegular,
    fontSize: 10.5,
    lineHeight: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 1,
  },
});
