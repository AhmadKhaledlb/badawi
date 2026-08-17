import type { PropsWithChildren } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Atmosphere } from '@/design/illustration/terrain-scene';
import { TerrainScene } from '@/design/illustration/terrain-scene';
import { colors, contentWidth, parallaxRate, spacing } from '@/design/tokens';
import { useLayout } from '@/design/use-layout';
import { useReducedMotion } from '@/design/use-reduced-motion';

type Measure = keyof typeof contentWidth | 'full';

type ScreenProps = PropsWithChildren<{
  /**
   * `illustrated` (default) lays content over a parallaxing terrain backdrop —
   * the exploration language.
   * `plain` renders a flat background with no illustration, no texture, and no
   * motion whatsoever. REQUIRED for Field Mode and Safety Acceptance, where
   * decorative movement and imagery are forbidden (docs/design/README.md,
   * "Field Mode"; docs/safety/README.md).
   */
  surface?: 'illustrated' | 'plain';
  /**
   * Terrain atmosphere for the backdrop. Ignored when `surface="plain"`.
   * Defaults to — and should almost always stay — `survey`: screen headings
   * sit directly over the backdrop with no plate between them, and `survey`
   * is the only atmosphere whose contrast is verified for that
   * (src/design/illustration/terrain-scene.tsx). Richer atmospheres belong
   * inside a bounded `TerrainWindow`.
   */
  atmosphere?: Atmosphere;
  /** Backdrop height in dp. Ignored when `surface="plain"`. */
  backdropHeight?: number;
  /**
   * Content measure. `reading` caps line length for text-dense screens;
   * `canvas` is wider for spatial/map compositions; `identity` is the narrow
   * Welcome lockup column; `full` opts out (the child manages its own width).
   */
  measure?: Measure;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollEnabled?: boolean;
  testID?: string;
}>;

// ── THE SCREEN SHELL ─────────────────────────────────────────────────────
//
// Every V1 screen mounts through here, which is what makes twelve screens
// share one spatial grammar:
//
//   • responsive gutters and a capped measure, resolved from the live
//     viewport — so desktop gets a deliberately framed, centred composition
//     instead of phone-width rows stretched across 1440pt
//   • a pinned terrain backdrop that drifts under the content as you scroll,
//     giving the app depth without a per-screen illustration budget
//   • an explicit, auditable opt-out (`surface="plain"`) for the two screens
//     where illustration and motion are prohibited rather than optional
//
// PARALLAX + ACCESSIBILITY: the backdrop drift is imperative (shared-value)
// motion, so it cannot self-disable the way a declarative entering animation
// can. It is therefore gated on `useReducedMotion()`; when reduce-motion is
// on, the backdrop is simply pinned and everything else still works.
export function Screen({
  children,
  surface = 'illustrated',
  atmosphere = 'survey',
  backdropHeight = 340,
  measure = 'reading',
  contentContainerStyle,
  scrollEnabled = true,
  testID,
}: ScreenProps) {
  const layout = useLayout();
  const prefersReducedMotion = useReducedMotion();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const backdropStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: prefersReducedMotion ? 0 : -scrollOffset.value * parallaxRate.far,
      },
    ],
  }));

  const maxWidth = measure === 'full' ? undefined : contentWidth[measure];

  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      {surface === 'illustrated' && (
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <TerrainScene atmosphere={atmosphere} height={backdropHeight} fadeToBackground />
        </Animated.View>
      )}

      <Animated.ScrollView
        ref={scrollRef}
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: layout.gutter },
        ]}>
        <View style={[styles.measure, maxWidth !== undefined && { maxWidth }, contentContainerStyle]}>
          {children}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
    // Centres the measure column on wide viewports. On a phone the column is
    // already full-width, so this is a no-op there.
    alignItems: 'center',
  },
  measure: {
    width: '100%',
    flexGrow: 1,
    gap: spacing.lg,
  },
});
