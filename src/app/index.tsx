import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/design/tokens';

// Uses the approved fixed BADAWI semantic colors. BADAWI V1 is light-mode
// only — see docs/design/README.md, "Appearance Mode".
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BADAWI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 52,
    textAlign: 'center',
  },
});
