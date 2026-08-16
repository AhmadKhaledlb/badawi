import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type RoutePlaceholderProps = {
  label: string;
  paramName?: string;
  paramValue?: string;
};

// Structural placeholder for scaffolded routes. Identifies the route family
// and any dynamic id — no product, curriculum, or safety content.
export function RoutePlaceholder({ label, paramName, paramValue }: RoutePlaceholderProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{label}</ThemedText>
      {paramName && (
        <ThemedText type="code">
          {paramName}: {paramValue ?? '—'}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 24,
  },
});
