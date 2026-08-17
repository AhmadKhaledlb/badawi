import { router, useLocalSearchParams, type Href } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { ActionButton } from '@/components/action-button';
import { Plate } from '@/components/plate';
import { Screen } from '@/components/screen';
import { Eyebrow, MetaText, ScreenHeading } from '@/components/section-heading';
import { findChallengeById } from '@/content';
import { HairlineRule } from '@/design/illustration/notebook';
import { colors, spacing, typography } from '@/design/tokens';
import { useProgress } from '@/state/progress-context';

// ── SAFETY ACCEPTANCE ────────────────────────────────────────────────────
//
// VISUAL TREATMENT: this screen uses the same stripped `surface="plain"`
// language as Field Mode — no terrain, no illustration, no parallax, no
// entering animations, no accent colour. That is deliberate. It sits directly
// before Field Mode in the flow, and a polished, animated, illustrated safety
// gate would be exactly the wrong signal: the redesign must not make a
// safety step feel like a marketing moment.
//
// ── IMPORTANT — CONTENT GAP, NOT A REAL SAFETY FLOW YET ──────────────────
// docs/product and docs/design list "safety acceptance" as a required, locked
// product flow, but no authoritative acceptance copy (what the user is
// actually reviewing/acknowledging) exists anywhere in the repository. Per
// docs/safety/README.md this must not be fabricated, so the body text below
// only states that the real content is pending — it makes no claim that the
// user has reviewed or acknowledged any actual safety information. This
// screen exists to keep the structural gate (route + recorded-acceptance
// timestamp) wired correctly ahead of Field Mode; it is NOT itself an
// approved safety-acceptance experience.
//
// The 5D.3 redesign changed nothing about that: no acceptance copy was
// written, no warning was softened, and the gate still records only a
// timestamp. See the completion report for the outstanding content gap.
//
// This single acceptance is a Pack-wide gate (one `safetyAcceptedAt`
// timestamp), not a per-Challenge one. Where the triggering Challenge is
// known (via an explicit `challengeId` param, not parsed out of `returnTo`),
// it is named so the learner knows what they are about to enter — and,
// because every V1 Challenge is RQ0, this screen is explicit that accepting
// here does NOT mean that Challenge's specific field/safety content has been
// authored or verified.
export default function SafetyAcceptanceScreen() {
  const { returnTo, challengeId } = useLocalSearchParams<{
    returnTo?: string;
    challengeId?: string;
  }>();
  const { acceptSafety } = useProgress();
  const challenge = challengeId ? findChallengeById(challengeId) : undefined;

  function handleContinue() {
    acceptSafety();
    router.replace((returnTo ?? '/home') as Href);
  }

  return (
    // No `onBack` and no ScreenHeader: this is a gate, not a stop on a route.
    <Screen surface="plain" measure="reading">
      <View style={styles.head}>
        <Eyebrow>Before Field Mode</Eyebrow>
        <ScreenHeading>Safety Acceptance</ScreenHeading>
        <HairlineRule weight="strong" />
      </View>

      <Plate variant="outline" style={styles.honestyNote}>
        <Text style={styles.body}>
          Safety acceptance content has not yet been authored or approved. This step will require
          reviewing and acknowledging approved safety information before Field Mode, once that
          content exists.
        </Text>
      </Plate>

      {challenge && (
        <>
          <MetaText>
            {`You are about to enter Field Mode for: ${challenge.name}. This general acceptance does not mean the field or safety content for this specific challenge has been authored, reviewed, or verified — it has not.`}
          </MetaText>
        </>
      )}

      <View style={styles.actions}>
        <ActionButton label="Continue" onPress={handleContinue} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
  honestyNote: {
    gap: spacing.sm,
  },
  body: {
    ...typography.body,
    color: colors.textSecondary,
  },
  actions: {
    marginTop: spacing.md,
  },
});
