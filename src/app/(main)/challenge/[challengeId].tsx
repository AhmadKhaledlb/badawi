import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { BackLink } from '@/components/back-link';
import { ScreenContainer } from '@/components/screen-container';
import { resolveChallenge } from '@/content';
import { colors } from '@/design/tokens';

// No challenge instructions, safety guidance, or cultural content are
// authored yet for any challenge — this screen never invents them. It
// only establishes the journey (name/id + a path to Preparation) and
// honestly flags when the resolved challenge is a structural placeholder
// rather than authored curriculum.
export default function ChallengeScreen() {
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();
  const challenge = resolveChallenge(challengeId);

  if (!challenge) {
    return (
      <ScreenContainer>
        <BackLink onPress={() => router.back()} />
        <Text style={styles.heading}>Challenge not found</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <BackLink onPress={() => router.back()} />
      <Text style={styles.heading}>{challenge.name}</Text>
      {challenge.isPlaceholder && (
        <Text style={styles.placeholderNote}>
          Structural placeholder — curriculum content for this challenge has not yet been authored.
        </Text>
      )}
      <ActionButton
        label="Continue to Preparation"
        onPress={() =>
          router.push({
            pathname: '/challenge/[challengeId]/prepare',
            params: { challengeId: challenge.id },
          })
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: 600,
  },
  placeholderNote: {
    color: colors.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
  },
});
