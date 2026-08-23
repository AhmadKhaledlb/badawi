import type { ViewStyle } from 'react-native';

import { pressScale } from '@/design/tokens';

// The single press reaction used by every pressable surface in BADAWI, so
// touch feedback is one consistent physical response instead of each
// component inventing its own opacity value.
//
// Deliberately a plain style object applied through Pressable's own
// `style={({ pressed }) => ...}` callback rather than a Reanimated spring:
// press feedback must be perceptually instantaneous, and a static transform
// applied on the same frame as the touch beats any animated approach for
// perceived responsiveness. It also keeps every list item free of an
// animation hook.
//
// Not used in Field Mode. Its Complete/Stop controls have their own,
// deliberately flatter feedback so neither control can read as more
// "responsive" (and therefore more inviting) than the other.
export const pressedSurfaceStyle: ViewStyle = {
  transform: [{ scale: pressScale }],
  opacity: 0.94,
};

/** Press feedback for text-only actions, where a scale would look like a glitch. */
export const pressedTextStyle: ViewStyle = {
  opacity: 0.55,
};
