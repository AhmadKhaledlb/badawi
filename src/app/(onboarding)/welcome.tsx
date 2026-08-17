import { router } from 'expo-router';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActionButton } from '@/components/action-button';
import { withOpacity } from '@/components/plate';
import { BadawiMark } from '@/design/brand/badawi-mark';
import { BadawiWordmark } from '@/design/brand/wordmark';
import { HairlineRule, SurveyTicks } from '@/design/illustration/notebook';
import { TerrainScene } from '@/design/illustration/terrain-scene';
import {
  colors,
  contentWidth,
  elevation,
  identityEnter,
  identitySupportEnter,
  lineOpacity,
  radii,
  spacing,
  typography,
} from '@/design/tokens';
import { useLayout } from '@/design/use-layout';
import { useProgress } from '@/state/progress-context';

// ── WELCOME — THE IDENTITY MOMENT ────────────────────────────────────────
//
// The first screen states BADAWI's whole visual thesis in one composition:
// a NIGHT TERRAIN filling the frame, and a sheet of PAPER rising over it
// carrying the mark and the type. That is literally the app's two-layer
// language — the atmospheric world, and the surveyor's notebook laid across
// it — and every screen after this one is a variation on it.
//
// The Waypoint mark straddles the boundary between the two layers, pinned in
// a disc on the paper's top edge, so the brand reads as the join between
// world and record rather than as a logo dropped on a background.
//
// CONTRAST: the mark and all type sit on the Light Neutral sheet (Brown
// 10.43:1, Terracotta star 4.39:1 as a graphic). Only the scope eyebrow sits
// over the night sky, and it uses `textOnDeep` (Light Neutral on Indigo,
// 10.17:1). No text is ever placed on the gradient's mid-tones.
//
// CONTENT: the tagline paraphrases docs/product/README.md, "Product Purpose"
// only, and is carried over verbatim from the previous implementation —
// nothing about the desert, safety, or field practice is invented here.
export default function WelcomeScreen() {
  const { completeOnboarding } = useProgress();
  const { height } = useWindowDimensions();
  const layout = useLayout();

  function handleGetStarted() {
    completeOnboarding();
    router.replace('/home');
  }

  // The terrain fills the frame; the sheet covers its lower portion. Sized
  // from the viewport so the horizon lands above the sheet on a short phone
  // and a tall tablet alike.
  const sceneHeight = Math.max(height, 560);

  return (
    <View style={styles.root}>
      <View style={styles.scene} pointerEvents="none">
        <TerrainScene atmosphere="night" height={sceneHeight} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.scopeRow, { paddingHorizontal: layout.gutter }]}>
          <Animated.Text entering={identitySupportEnter(0)} style={styles.scope}>
            Arabian Peninsula · Desert
          </Animated.Text>
        </View>

        <View style={styles.spacer} />

        <Animated.View entering={identityEnter} style={styles.sheetWrap}>
          <View style={[styles.sheet, { paddingHorizontal: layout.gutter }]}>
            {/* The mark, pinned on the boundary between terrain and paper. */}
            <View style={styles.markDisc}>
              <BadawiMark size={54} label="BADAWI" />
            </View>

            <View style={[styles.lockup, { maxWidth: contentWidth.identity }]}>
              <BadawiWordmark size="lg" />
              <View style={styles.kickerRow}>
                <HairlineRule weight="strong" style={styles.kickerRule} />
                <Text style={styles.kicker}>Field learning</Text>
                <HairlineRule weight="strong" style={styles.kickerRule} />
              </View>

              <Animated.Text entering={identitySupportEnter(1)} style={styles.tagline}>
                A real-world learning experience built around environmental understanding,
                practical field capability, reflection, and safe transfer of skill.
              </Animated.Text>

              <Animated.View entering={identitySupportEnter(2)} style={styles.ticks}>
                <SurveyTicks count={17} />
              </Animated.View>

              <Animated.View entering={identitySupportEnter(3)} style={styles.action}>
                <ActionButton label="Get Started" variant="deep" onPress={handleGetStarted} />
              </Animated.View>
            </View>
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surfaceDeep,
  },
  scene: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  scopeRow: {
    paddingTop: spacing.lg,
  },
  scope: {
    ...typography.label,
    color: colors.textOnDeep,
    textTransform: 'uppercase',
    opacity: 0.85,
  },
  spacer: {
    flex: 1,
  },
  sheetWrap: {
    width: '100%',
    alignItems: 'center',
  },
  sheet: {
    width: '100%',
    backgroundColor: colors.background,
    borderTopLeftRadius: radii.xxl,
    borderTopRightRadius: radii.xxl,
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    borderColor: withOpacity(colors.rule, lineOpacity.hairline),
    alignItems: 'center',
    // Room for the mark disc, which overhangs the sheet's top edge.
    paddingTop: 46,
    paddingBottom: spacing.xxl,
    ...elevation.high,
  },
  markDisc: {
    position: 'absolute',
    top: -34,
    width: 78,
    height: 78,
    borderRadius: radii.pill,
    backgroundColor: colors.background,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: withOpacity(colors.rule, lineOpacity.hairline),
    alignItems: 'center',
    justifyContent: 'center',
    ...elevation.medium,
  },
  lockup: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.lg,
  },
  kickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  kickerRule: {
    width: 26,
  },
  kicker: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  tagline: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  ticks: {
    width: '70%',
  },
  action: {
    width: '100%',
    marginTop: spacing.xs,
  },
});
