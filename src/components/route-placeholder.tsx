import { StyleSheet, Text, View } from 'react-native';

import { Fonts } from '@/constants/theme';
import { colors } from '@/design/tokens';

type RoutePlaceholderProps = {
  label: string;
  paramName?: string;
  paramValue?: string;
};

// Structural placeholder for scaffolded routes. Identifies the route family
// and any dynamic id — no product, curriculum, or safety content. Uses the
// approved fixed BADAWI semantic colors; BADAWI V1 is light-mode only.
export function RoutePlaceholder({ label, paramName, paramValue }: RoutePlaceholderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {paramName && (
        <Text style={styles.param}>
          {paramName}: {paramValue ?? '—'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
    backgroundColor: colors.background,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 52,
    textAlign: 'center',
  },
  param: {
    color: colors.textSecondary,
    fontFamily: Fonts?.mono,
    fontSize: 12,
    textAlign: 'center',
  },
});
