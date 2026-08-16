import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';

import { colors } from '@/design/tokens';

type ExplorationTileProps = {
  title: string;
  subtitle?: string;
  locked?: boolean;
  onPress?: PressableProps['onPress'];
};

// A single tappable "map node" shared by the Blueprint Map (regions) and
// the pack screen (units). Deliberately abstract/structural — no
// illustration or environmental artwork exists yet, so this uses only
// rounded shape + the approved semantic colors rather than inventing
// imagery. `locked` renders a non-interactive, visually reduced variant.
export function ExplorationTile({ title, subtitle, locked, onPress }: ExplorationTileProps) {
  if (locked) {
    return (
      <View style={[styles.tile, styles.locked]}>
        <Text style={[styles.title, styles.lockedText]}>{title}</Text>
        {subtitle && <Text style={[styles.subtitle, styles.lockedText]}>{subtitle}</Text>}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: colors.surfaceWarm,
    borderRadius: 20,
    padding: 20,
    gap: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  locked: {
    opacity: 0.5,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: 600,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  lockedText: {
    color: colors.textSecondary,
  },
});
