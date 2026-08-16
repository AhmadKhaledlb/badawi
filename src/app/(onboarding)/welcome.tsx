import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { ScreenContainer } from '@/components/screen-container';
import { colors } from '@/design/tokens';
import { useProgress } from '@/state/progress-context';

// docs/product/README.md, "Product Purpose": BADAWI is a real-world
// cultural learning and field-capability product focused on environmental
// understanding, practical competence, reflection, and safe real-world
// transfer. The tagline below paraphrases that locked description only —
// nothing invented beyond it.
export default function WelcomeScreen() {
  const { completeOnboarding } = useProgress();

  function handleGetStarted() {
    completeOnboarding();
    router.replace('/home');
  }

  return (
    <ScreenContainer contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>BADAWI</Text>
        <Text style={styles.tagline}>
          A real-world learning experience built around environmental understanding, practical
          field capability, reflection, and safe transfer of skill.
        </Text>
      </View>
      <ActionButton label="Get Started" onPress={handleGetStarted} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 52,
    textAlign: 'center',
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
