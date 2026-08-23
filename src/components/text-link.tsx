import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

import { pressedTextStyle } from '@/components/press-feedback';
import { colors, spacing, typography } from '@/design/tokens';

type TextLinkProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  onDeep?: boolean;
};

// A plain secondary text action — trailing header actions (Profile,
// Settings) and other low-emphasis labelled choices.
//
// NOTE: this component is deliberately NOT used for Postpone/Refuse. Those
// are peer decisions of equal validity to continuing, so they render as full
// `ActionButton`s (variant `secondary`) instead of as small text links —
// presenting them as lesser affordances undersold them relative to
// docs/safety/README.md, which holds that stopping, postponing, or refusing
// may itself demonstrate competence.
//
// The Back affordance is `RoundIconButton` (icon-only, Phase 5A), not this
// component — see src/components/screen-header.tsx.
export function TextLink({ label, onDeep, ...props }: TextLinkProps) {
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={spacing.md}
      {...props}
      style={({ pressed }) => [styles.link, pressed && pressedTextStyle]}>
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
  label: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  labelOnDeep: {
    color: colors.textOnDeepMuted,
  },
});
