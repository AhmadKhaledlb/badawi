import { router, useLocalSearchParams, type Href } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { ScreenContainer } from '@/components/screen-container';
import { colors } from '@/design/tokens';
import { useProgress } from '@/state/progress-context';

// IMPORTANT — content gap, not a real safety flow yet: docs/product and
// docs/design list "safety acceptance" as a required, locked product
// flow, but no authoritative acceptance copy (what the user is actually
// reviewing/acknowledging) exists anywhere in the repository. Per
// docs/safety/README.md this must not be fabricated, so the body text
// below only states that the real content is pending — it makes no claim
// that the user has reviewed or acknowledged any actual safety
// information. This screen exists to keep the structural gate (route +
// recorded-acceptance timestamp) wired correctly ahead of Field Mode; it
// is not itself an approved safety-acceptance experience. See the
// completion report for this flagged as an open content/approval gap.
export default function SafetyAcceptanceScreen() {
  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();
  const { acceptSafety } = useProgress();

  function handleContinue() {
    acceptSafety();
    router.replace((returnTo ?? '/home') as Href);
  }

  return (
    <ScreenContainer>
      <Text style={styles.heading}>Safety Acceptance</Text>
      <Text style={styles.body}>
        Safety acceptance content has not yet been authored or approved. This step will require
        reviewing and acknowledging approved safety information before Field Mode, once that
        content exists.
      </Text>
      <ActionButton label="Continue" onPress={handleContinue} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: 600,
  },
  body: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});
