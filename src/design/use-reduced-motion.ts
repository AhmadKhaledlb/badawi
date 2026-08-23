import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

// Reports the OS "reduce motion" accessibility preference.
//
// Declarative entering animations already self-disable via
// `.reduceMotion(ReduceMotion.System)` (src/design/tokens/motion.ts). This
// hook exists for the motion that CANNOT self-disable: continuous, imperative,
// shared-value-driven transforms — specifically scroll parallax on the
// illustrated exploration screens.
//
// Deliberately built on React Native's own `AccessibilityInfo` rather than
// Reanimated's `useReducedMotion`, for two reasons:
//   1. `useReducedMotion` is not implemented in `react-native-reanimated/mock`,
//      which is the module this project maps Reanimated to under Jest
//      (see package.json `moduleNameMapper`) — importing it would make every
//      screen test that renders an illustrated surface crash.
//   2. `AccessibilityInfo` maps to the correct platform source everywhere we
//      ship: UIAccessibility "Reduce Motion" on iOS, the animator-duration
//      setting on Android, and the `prefers-reduced-motion` media query under
//      react-native-web.
//
// Defaults to `false` (motion allowed) and flips to `true` asynchronously if
// the preference is set, then keeps tracking changes for the lifetime of the
// screen — a user turning the setting on mid-session gets a still interface
// without a restart.
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    let cancelled = false;

    AccessibilityInfo.isReduceMotionEnabled?.()
      .then((enabled) => {
        if (!cancelled) setPrefersReducedMotion(Boolean(enabled));
      })
      .catch(() => {
        // Preference unavailable on this platform/version — leave motion on
        // rather than guessing. Entering animations remain independently
        // governed by ReduceMotion.System.
      });

    const subscription = AccessibilityInfo.addEventListener?.(
      'reduceMotionChanged',
      (enabled: boolean) => setPrefersReducedMotion(Boolean(enabled))
    );

    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, []);

  return prefersReducedMotion;
}
