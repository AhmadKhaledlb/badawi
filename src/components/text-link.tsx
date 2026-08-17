import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';

import { pressedTextStyle } from '@/components/press-feedback';
import { colors, lineOpacity, spacing, typography } from '@/design/tokens';

type TextLinkProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  /** Draws a short leading rule — the notebook layer's "return along the route" mark. */
  leading?: 'back' | 'none';
  onDeep?: boolean;
};

// A plain secondary text action — navigation affordances and low-emphasis
// choices. The leading rule replaces the previous bare "‹ Back" chevron so
// navigation reads as part of the drawn route language rather than as
// generic browser chrome.
//
// NOTE: this component is deliberately NOT used for Postpone/Refuse anymore.
// Those are peer decisions of equal validity to continuing, so they render as
// full `ActionButton`s (variant `secondary`) instead of as small text links —
// presenting them as lesser affordances undersold them relative to
// docs/safety/README.md, which holds that stopping, postponing, or refusing
// may itself demonstrate competence.
export function TextLink({ label, leading = 'none', onDeep, ...props }: TextLinkProps) {
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={spacing.md}
      {...props}
      style={({ pressed }) => [styles.link, pressed && pressedTextStyle]}>
      {leading === 'back' && (
        <View
          style={[styles.leadingRule, onDeep && styles.leadingRuleOnDeep]}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        />
      )}
      <Text style={[styles.label, onDeep && styles.labelOnDeep]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  leadingRule: {
    width: 18,
    height: StyleSheet.hairlineWidth * 3,
    backgroundColor: colors.textSecondary,
    opacity: lineOpacity.strong + 0.3,
  },
  leadingRuleOnDeep: {
    backgroundColor: colors.textOnDeepMuted,
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  labelOnDeep: {
    color: colors.textOnDeepMuted,
  },
});
