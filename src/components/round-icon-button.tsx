import { Pressable, StyleSheet, type PressableProps } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { withOpacity } from '@/components/plate';
import { pressedSurfaceStyle } from '@/components/press-feedback';
import { colors, radii } from '@/design/tokens';

export type RoundIconButtonIcon = 'chevronLeft';

type RoundIconButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  icon: RoundIconButtonIcon;
  /**
   * `light` (default) sits on a Bone/Light ground — Ink glyph, a translucent
   * Light fill and a hairline Ink border, matching the approved design's
   * "glass pill" back-chevron over a hero image or a Bone screen.
   * `deep` sits on the Night surface — Light glyph, translucent Light border,
   * no fill (matching the Region header's chevron on Night).
   */
  surface?: 'light' | 'deep';
  /** Required — this button is icon-only, so it needs a real label. */
  accessibilityLabel: string;
};

const SIZE = 34;

// ── ROUND ICON BUTTON ────────────────────────────────────────────────────
//
// Phase 5A: the circular/rounded-square glyph-only button the approved
// design uses for Back and (in later slices) zoom/help controls — replacing
// the previous plain text "‹ Back" link for this specific affordance.
// `ScreenHeader`'s trailing text action (e.g. "Profile", "Settings") is
// unaffected — it stays a `TextLink`, which is still the right shape for a
// labelled secondary action.
//
// Only `chevronLeft` is implemented yet — add to `Icon` and `renderIcon`
// together when a screen actually needs the next one (help "?", zoom +/-),
// rather than pre-building icons with no consumer.
export function RoundIconButton({
  icon,
  surface = 'light',
  accessibilityLabel,
  ...props
}: RoundIconButtonProps) {
  const glyphColor = surface === 'deep' ? colors.textOnDeep : colors.textPrimary;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      {...props}
      style={({ pressed }) => [
        styles.base,
        surface === 'deep' ? styles.deep : styles.light,
        pressed && pressedSurfaceStyle,
      ]}>
      {renderIcon(icon, glyphColor)}
    </Pressable>
  );
}

function renderIcon(icon: RoundIconButtonIcon, color: string) {
  switch (icon) {
    case 'chevronLeft':
      return (
        <Svg width={12} height={20} viewBox="0 0 12 20" fill="none">
          <Path
            d="M10 2L2 10l8 8"
            stroke={color}
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
  }
}

const styles = StyleSheet.create({
  base: {
    width: SIZE,
    height: SIZE,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  light: {
    backgroundColor: withOpacity(colors.background, 0.6),
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: withOpacity(colors.textPrimary, 0.3),
  },
  deep: {
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: withOpacity(colors.textOnDeep, 0.4),
  },
});
