import { router, useLocalSearchParams, type Href } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { ScreenContainer } from '@/components/screen-container';
import { findChallengeById } from '@/content';
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
// is not itself an approved safety-acceptance experience.
//
// This single acceptance is a Pack-wide gate (one `safetyAcceptedAt`
// timestamp — src/state/progress-types.ts), not a per-Challenge one; that
// is unchanged by this pass. Where the triggering Challenge is known (via
// an explicit `challengeId` param, not parsed out of `returnTo`), it is
// named so the learner knows what they're about to enter, and — because
// every V1 Challenge is research status RQ0 (src/domain/research-status.ts)
// — this screen is explicit that accepting here does NOT mean that
// Challenge's specific field/safety content has been authored or
// verified. See the completion report for the missing acceptance-content
// gap.
export default function SafetyAcceptanceScreen() {
  const { returnTo, challengeId } = useLocalSearchParams<{ returnTo?: string; challengeId?: string }>();
  const { acceptSafety } = useProgress();
  const challenge = challengeId ? findChallengeById(challengeId) : undefined;

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
      {challenge && (
        <Text style={styles.meta}>
          You are about to enter Field Mode for: {challenge.name}. This general acceptance does not
          mean the field or safety content for this specific challenge has been authored, reviewed,
          or verified — it has not.
        </Text>
      )}
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
  meta: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});
