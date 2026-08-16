import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

import { colors } from '@/design/tokens';

type TextLinkProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
};

// A plain secondary text action — used for Back, and for choices like
// Postpone/Refuse that must read as ordinary, equally-valid actions
// rather than warnings (docs/safety/README.md: stopping, postponing, or
// refusing a challenge must not be treated as failure).
export function TextLink({ label, ...props }: TextLinkProps) {
  return (
    <Pressable
      accessibilityRole="button"
      {...props}
      style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
  },
  pressed: {
    opacity: 0.6,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: 500,
  },
});
