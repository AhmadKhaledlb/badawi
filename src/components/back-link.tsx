import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

import { colors } from '@/design/tokens';

type BackLinkProps = Omit<PressableProps, 'children' | 'style'>;

export function BackLink(props: BackLinkProps) {
  return (
    <Pressable
      accessibilityRole="button"
      {...props}
      style={({ pressed }) => [styles.link, pressed && styles.pressed]}>
      <Text style={styles.label}>Back</Text>
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
