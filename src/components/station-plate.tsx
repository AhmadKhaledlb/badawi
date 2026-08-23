import { Pressable, StyleSheet, Text, View } from 'react-native';

import { pressedSurfaceStyle } from '@/components/press-feedback';
import { Eyebrow, PullQuote, SectionTitle } from '@/components/section-heading';
import type { Atmosphere } from '@/design/illustration/terrain-scene';
import { TerrainScene } from '@/design/illustration/terrain-scene';
import { colors, elevation, radii, spacing, typography } from '@/design/tokens';

type StationPlateProps = {
  /** 1-based position within the Pack. Presentational only — order comes from content. */
  order: number;
  title: string;
  /** The Unit's LOCKED core question, set as a pull-quote. */
  coreQuestion: string;
  /**
   * Which way this station is offset from the plotted route. Alternating
   * these down the Pack is what turns six units into a route across terrain
   * rather than six stacked rows.
   */
  align?: 'left' | 'right';
  /** Terrain atmosphere for this station's window. */
  atmosphere?: Atmosphere;
  onPress?: () => void;
};

// ── THE STATION PLATE ────────────────────────────────────────────────────
//
// A Unit rendered as a station on an expedition route — the replacement for
// the rejected "settings row per unit" treatment.
//
// Each station is a real composition rather than a list item:
//   • its own illustrated terrain window, whose atmosphere is chosen by the
//     Pack screen to progress across the six units (see that screen) — so
//     scrolling the Pack visibly travels from open daylight into deep
//     terrain
//   • a survey ordinal marker straddling the boundary between illustration
//     and page, which is what makes the plate read as pinned to the terrain
//     instead of floating above it
//   • the Unit's locked core question as an italic pull-quote, giving each
//     station a distinct voice instead of a uniform subtitle
//   • an alternating horizontal offset, so the column has a route's rhythm
//
// PRODUCT SEMANTICS UNCHANGED: this is presentation only. Every station is
// equally reachable — no lock state, no gating, and no completion metric is
// shown here. BADAWI does not gate Units on prior Units at runtime
// (docs/curriculum/v1-curriculum-spec.md §6, "No artificial prerequisites"),
// and deliberately shows no per-unit progress count, which would invite
// reading a route position as a score.
export function StationPlate({
  order,
  title,
  coreQuestion,
  align = 'left',
  atmosphere = 'day',
  onPress,
}: StationPlateProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.plate,
        align === 'left' ? styles.offsetLeft : styles.offsetRight,
        pressed && pressedSurfaceStyle,
      ]}>
      <View style={styles.window} pointerEvents="none">
        <TerrainScene atmosphere={atmosphere} height={STATION_WINDOW_HEIGHT} />
      </View>

      {/* The ordinal marker sits ON the boundary between terrain and page. */}
      <View
        style={[styles.marker, align === 'left' ? styles.markerLeft : styles.markerRight]}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants">
        <Text style={styles.markerText}>{order}</Text>
      </View>

      <View style={styles.body}>
        <Eyebrow>{`Station ${String(order).padStart(2, '0')}`}</Eyebrow>
        <SectionTitle>{title}</SectionTitle>
        <PullQuote>{coreQuestion}</PullQuote>
      </View>
    </Pressable>
  );
}

const STATION_WINDOW_HEIGHT = 104;
const MARKER_SIZE = 46;

const styles = StyleSheet.create({
  plate: {
    backgroundColor: colors.background,
    borderRadius: radii.xl,
    overflow: 'hidden',
    position: 'relative',
    ...elevation.medium,
  },
  // Alternating inset. Kept modest so the text measure stays comfortable on
  // a phone — the rhythm should be felt, not fought.
  offsetLeft: {
    marginRight: spacing.xl,
  },
  offsetRight: {
    marginLeft: spacing.xl,
  },
  window: {
    height: STATION_WINDOW_HEIGHT,
    width: '100%',
  },
  marker: {
    position: 'absolute',
    top: STATION_WINDOW_HEIGHT - MARKER_SIZE / 2,
    width: MARKER_SIZE,
    height: MARKER_SIZE,
    borderRadius: radii.pill,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerLeft: {
    left: spacing.lg,
  },
  markerRight: {
    right: spacing.lg,
  },
  markerText: {
    ...typography.numeral,
    color: colors.textPrimary,
  },
  body: {
    paddingTop: MARKER_SIZE / 2 + spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
});
