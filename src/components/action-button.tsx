import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

import { colors } from '@/design/tokens';

type ActionButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
};

// A single primary-action button, built only from the four approved
// semantic color roles — no accent/primary-action color is approved yet
// (docs/design/README.md, "Approved Semantic Color Roles"), so this does
// not assign one. Radius/padding are ordinary local layout values, not a
// declared design-system decision.
export function ActionButton({ label, ...props }: ActionButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      {...props}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.surfaceWarm,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 600,
  },
});
