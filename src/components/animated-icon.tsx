import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, Keyframe, ReduceMotion } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { BadawiMark } from '@/design/brand/badawi-mark';
import { colors, durations } from '@/design/tokens';

const DURATION = durations.atmospheric;

// The hand-off from the native splash screen into the app: the BADAWI mark
// holds on the Indigo splash ground, then the whole overlay lifts away to
// reveal Welcome's night terrain underneath. Because the splash ground
// (app.json) and this overlay share the same Indigo and the same mark, the
// native splash and this view are visually continuous — there is no flash or
// jump between them.
//
// The mark is rendered `mono` in Ecru: Terracotta on Indigo measures only
// 2.31:1, so the duotone star is not used on a deep ground (see
// src/design/brand/badawi-mark.tsx).
//
// Respects the OS reduce-motion setting via `ReduceMotion.System`, so the
// overlay simply disappears rather than animating when that is enabled.
export function AnimatedSplashOverlay() {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const splashKeyframe = new Keyframe({
    0: {
      opacity: 1,
      transform: [{ scale: 1 }],
    },
    35: {
      opacity: 1,
      transform: [{ scale: 1.02 }],
      easing: Easing.out(Easing.cubic),
    },
    100: {
      opacity: 0,
      transform: [{ scale: 1.12 }],
      easing: Easing.out(Easing.cubic),
    },
  });

  const mark = <BadawiMark size={112} variant="mono" color={colors.textOnDeepMuted} />;

  return animate ? (
    <Animated.View
      entering={splashKeyframe
        .duration(DURATION)
        .reduceMotion(ReduceMotion.System)
        .withCallback((finished) => {
          'worklet';
          if (finished) {
            scheduleOnRN(setVisible, false);
          }
        })}
      style={styles.splashOverlay}>
      {mark}
    </Animated.View>
  ) : (
    <View
      onLayout={() => {
        SplashScreen.hideAsync().finally(() => {
          setAnimate(true);
        });
      }}
      style={styles.splashOverlay}>
      {mark}
    </View>
  );
}

const styles = StyleSheet.create({
  splashOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.surfaceDeep,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});
