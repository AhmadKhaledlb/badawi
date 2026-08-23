import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { Image, Modal, StyleSheet, View } from 'react-native';
import Animated, { Easing, Keyframe, ReduceMotion } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { durations } from '@/design/tokens';

const DURATION = durations.atmospheric;

// Sampled directly from badawi-splash-light.png's own background (top-left,
// pixel-read, not assumed) — not a design-system token, because this is one
// specific asset's baked-in ground colour, not a reusable UI surface. Kept
// in sync with app.json's splash `backgroundColor` so the native splash and
// this overlay never visibly differ before the image itself has painted.
const SPLASH_BACKGROUND = '#F8F2EB';

// The hand-off from the native splash screen into the app: the native splash
// (app.json) shows the small approved mark on this same background colour,
// then this overlay mounts showing the full approved splash composition
// (mark + wordmark + "LEARN THE LAND" + dune line) edge-to-edge, and lifts
// away to reveal Welcome's night terrain underneath.
//
// The full composition is used directly as a bundled image rather than
// rebuilt from separate mark/text/illustration components — it is the
// approved artwork, not a specification to redraw.
//
// NOTE: this overlay's background intentionally does not match Welcome's
// Night terrain underneath — the approved splash composition is light-toned
// and BADAWI is light-only (no dark app appearance), while Welcome's first
// screen is deliberately Night. That means there is a real light-to-night
// visual transition at the moment this overlay finishes fading out. That is
// a genuine, currently-unresolved seam between the new splash direction and
// the existing Welcome screen, not an oversight — flagged in the Phase 5A
// splash migration report rather than silently changed here, since altering
// Welcome's own visual treatment is out of scope for this component.
//
// Respects the OS reduce-motion setting via `ReduceMotion.System`, so the
// overlay simply disappears rather than animating when that is enabled.
export function AnimatedSplashOverlay() {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  // Phase 5A fix history: this WAS a scale (1 → 1.02 → 1.12) + fade, which
  // produced a distorted crop mid-transition and was simplified to a pure
  // opacity hold-then-fade — kept as-is here. That fixed the ANIMATION, but
  // a second, separate bug remained in the STATIC framing (see
  // `splashImage` below): `resizeMode="cover"` was still cropping the
  // composition on any device whose aspect ratio differs from the
  // artwork's own 941:1672, which is what actually produced the "large
  // partial mark" on simulator — not the animation. Do not reintroduce
  // scale/zoom here; the fix for the crop is `contain`, not motion.
  const splashKeyframe = new Keyframe({
    0: {
      opacity: 1,
    },
    60: {
      opacity: 1,
    },
    100: {
      opacity: 0,
      easing: Easing.out(Easing.cubic),
    },
  });

  // `contain`, not `cover`: this composition (mark + wordmark + "LEARN THE
  // LAND" + dune line) is a single designed whole, not a background photo —
  // cropping any of it (which `cover` can do aggressively when the device
  // aspect ratio differs from the artwork's 941:1672) breaks the approved
  // composition. Full-screen `width:'100%', height:'100%'` box, `contain`
  // fit, centred within it — a brief bottom-anchored variant was tried and
  // reverted: it read as zoomed/cropped in practice, and the Modal below
  // (not image positioning) is what actually solves full-screen coverage.
  // The cream (`SPLASH_BACKGROUND`) margin `contain` leaves around the
  // artwork on a taller device is expected and approved — do not try to
  // eliminate it by resizing/repositioning the image further.
  const splashImage = (
    <Image
      source={require('../../assets/brand/v2/badawi-splash-light.png')}
      resizeMode="contain"
      style={styles.splashImage}
    />
  );

  // Rendered through `Modal`, not as a plain sibling View of the root
  // `<Stack>`. Phase 5A fix: `<Stack>` (`expo-router`) is backed by
  // `react-native-screens`, which renders each screen — including the
  // `(main)/(tabs)` shell and its `PersistentTabBar` — as native view
  // controllers composited by the OS, not purely through React Native's own
  // JS-computed `zIndex`. A plain sibling `View` with `zIndex: 1000`, even
  // with `StyleSheet.absoluteFill`, is not guaranteed to paint above that
  // native layer in every region — in practice it left a gap exactly the
  // height of the tab bar, which the tab bar's own native layer showed
  // through underneath. `Modal` sidesteps this entirely: its content is
  // presented in its own OS-level full-screen window, outside of and above
  // the whole screens/navigation view hierarchy, guaranteeing it covers the
  // complete physical viewport — including the tab bar area — regardless of
  // what any child layout does. The animation/lifecycle logic inside is
  // otherwise unchanged: still one state machine, still the same
  // `SplashScreen.hideAsync()` timing, still the same fade.
  return (
    <Modal visible transparent animationType="none" statusBarTranslucent navigationBarTranslucent>
      {animate ? (
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
          {splashImage}
        </Animated.View>
      ) : (
        <View
          onLayout={() => {
            SplashScreen.hideAsync().finally(() => {
              setAnimate(true);
            });
          }}
          style={styles.splashOverlay}>
          {splashImage}
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  splashOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: SPLASH_BACKGROUND,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    // Defensive: guarantees nothing this overlay renders can ever paint
    // past the screen bounds, regardless of any future transform.
    overflow: 'hidden',
  },
  splashImage: {
    width: '100%',
    height: '100%',
  },
});
