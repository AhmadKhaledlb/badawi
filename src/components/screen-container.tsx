import { ScrollView, StyleSheet, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/design/tokens';

type ScreenContainerProps = ScrollViewProps;

// Shared screen-level layout shell: safe-area + scrollable content on the
// approved background color. Padding/gap are ordinary local layout values,
// not a declared design-system spacing scale — none exists yet (see
// docs/design/README.md, "Implementation-Level Tokens Not Yet Locked").
export function ScreenContainer({ contentContainerStyle, ...props }: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView {...props} contentContainerStyle={[styles.content, contentContainerStyle]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    padding: 24,
    gap: 16,
  },
});
