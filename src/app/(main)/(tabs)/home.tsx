import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { OUTCOME_LABELS } from '@/components/challenge-outcome-labels';
import { HeroImage } from '@/components/hero-image';
import { withOpacity } from '@/components/plate';
import { pressedSurfaceStyle } from '@/components/press-feedback';
import { BadawiMark } from '@/design/brand/badawi-mark';
import { challenges, desertFoundationsPack, findChallengeById, units } from '@/content';
import { colors, contentEnter, fontFamily, radii, spacing, typography } from '@/design/tokens';
import { COMPETENCY_DOMAINS, type CompetencyId } from '@/domain';
import { useProgress } from '@/state/progress-context';

// ── HOME — CONTINUE, NOT DASHBOARD ───────────────────────────────────────
//
// Phase 5A rebuild, reproducing the approved BADAWI App v2 Claude Design,
// screen 3a ("Home — continue, not dashboard"). Retires the previous
// "Blueprint Map" composition — the spatial territory-picker now lives on
// the Explore tab, and Home's job is narrower and sharper: show the one
// thing to do next.
//
// Phase 5A hierarchy-restoration pass: the previous "visual polish" round
// tuned spacing on a version of Home that had already lost too much of
// approved 3a's information density. This pass restores that density using
// only real state/content:
//   • the secondary card is no longer conditional on a stopped/postponed
//     outcome (which meant it usually didn't exist at all) — it now shows
//     the real MOST RECENT recorded attempt regardless of outcome, so the
//     card is persistent once any attempt exists, and it's genuinely
//     different information from the hero (retrospective, not prospective);
//   • the pack/arc card gains a real "You are here" line naming the actual
//     current Unit;
//   • the capability card now names the six real competency domains
//     (short labels derived from src/domain/competency.ts's canonical
//     names, documented at `SHORT_DOMAIN_LABEL` below) instead of six
//     anonymous squares, sorted practiced-first — still purely descriptive,
//     never a claimed level.
//
// ── REAL DATA ONLY ────────────────────────────────────────────────────────
// Every value below comes from src/content/ (locked curriculum) and
// src/state/progress-context.ts (real recorded attempts). No user name, no
// assessed competency level, no score, no percentage framed as achievement.
// The Unit → arc-stage mapping is a locked, documented decision
// (docs/curriculum/README.md, "Unit → Arc Stage Mapping"), not a per-screen
// guess.
const ARC_STAGES = ['READ', 'UNDERSTAND', 'PREPARE', 'ORIENT', 'MOVE', 'INTEGRATE'] as const;

// Compact display labels for the capability chips — derived directly from
// COMPETENCY_DOMAINS' canonical names (src/domain/competency.ts), not new
// domains and not a different taxonomy:
//   C1 Environmental Observation & Awareness    → "Observation"
//   C2 Environmental Reasoning & Decision-Making → "Reasoning"
//   C3 Practical Field Capability                → "Field Capability"
//   C4 Adaptation & Problem-Solving               → "Adaptation"
//   C5 Safety & Risk Management                   → "Safety"
//   C6 Reflection & Transfer                      → "Reflection"
const SHORT_DOMAIN_LABEL: Record<CompetencyId, string> = {
  C1: 'Observation',
  C2: 'Reasoning',
  C3: 'Field Capability',
  C4: 'Adaptation',
  C5: 'Safety',
  C6: 'Reflection',
};

function timeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const { progress, isHydrated } = useProgress();
  const insets = useSafeAreaInsets();

  if (!isHydrated) {
    return null;
  }

  // The next unattempted challenge, in locked curriculum order — a real,
  // computed "what's next", not a stored recommendation. `challenges` is
  // already Unit-1..Unit-6, in-unit-order (src/content/challenges.ts).
  const nextChallenge = challenges.find((c) => !progress.challenges[c.id]);
  const nextUnit = nextChallenge ? units.find((u) => u.id === nextChallenge.unitId) : undefined;
  const nextChallengeGlobalIndex = nextChallenge ? challenges.indexOf(nextChallenge) + 1 : undefined;
  const arcStage = nextUnit ? ARC_STAGES[nextUnit.order - 1] : undefined;

  const completedCount = challenges.filter((c) => progress.challenges[c.id]?.outcome === 'completed').length;

  // The real secondary-surface condition: the MOST RECENTLY recorded
  // attempt (`lastActiveChallengeId`, a real, already-persisted field —
  // src/state/progress-types.ts) — shown for its ACTUAL outcome, whatever
  // it was. Unlike a stopped/postponed-only filter, this is genuinely
  // persistent (present as soon as any attempt has ever been recorded) and
  // it's retrospective ("what you last did"), not a duplicate of the
  // hero's prospective "what's next". Omitted only when truly nothing has
  // been attempted yet — no fabricated stand-in.
  const lastActiveChallenge = progress.lastActiveChallengeId
    ? findChallengeById(progress.lastActiveChallengeId)
    : undefined;
  const lastActiveOutcome = lastActiveChallenge ? progress.challenges[lastActiveChallenge.id]?.outcome : undefined;

  // Real, locked curriculum domains actually practiced: the union of
  // `competency.primary` across every challenge with outcome 'completed'.
  // `competency` is the curriculum's TARGET mapping (src/domain/competency.ts)
  // — using it here only to say which domains a real completed challenge
  // was designed to practice, never to claim a measured level.
  const practicedDomains = new Set<CompetencyId>();
  for (const c of challenges) {
    if (progress.challenges[c.id]?.outcome === 'completed') {
      c.competency.primary.forEach((id) => practicedDomains.add(id));
    }
  }
  const allDomains = Object.keys(COMPETENCY_DOMAINS) as CompetencyId[];
  // Practiced domains surface first — still all six shown (never hiding
  // the framework), just prioritising the domains with real evidence.
  const sortedDomains = [...allDomains].sort((a, b) => {
    const rank = (id: CompetencyId) => (practicedDomains.has(id) ? 0 : 1);
    return rank(a) - rank(b);
  });

  return (
    <Animated.ScrollView
      entering={contentEnter}
      style={styles.root}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 10 }]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.eyebrow}>ARABIAN PENINSULA · DESERT</Text>
          <Text style={styles.greeting}>{timeOfDayGreeting()}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Profile"
          hitSlop={8}
          onPress={() => router.navigate('/profile')}
          style={({ pressed }) => [styles.avatarButton, pressed && pressedSurfaceStyle]}>
          <BadawiMark size={18} surface="deep" />
        </Pressable>
      </View>

      {nextChallenge && nextUnit && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Continue: ${nextChallenge.name}`}
          onPress={() =>
            router.push({ pathname: '/challenge/[challengeId]', params: { challengeId: nextChallenge.id } })
          }
          style={({ pressed }) => [styles.heroWrap, pressed && pressedSurfaceStyle]}>
          {/* Phase 5A fit correction: HeroImage now sizes the image from
              its OWN measured width and desert-landscape.png's real
              1536×1024 (3:2) ratio, rather than letting `cover` decide how
              much to crop. 240 sits within ~1.5px of that natural height at
              the measured frame width on the reference device (see the
              completion report's worked numbers) — effectively zero crop,
              not the previous close-up. */}
          <HeroImage
            source={require('../../../../assets/illustrations/environments/desert-landscape.png')}
            aspectRatio={1536 / 1024}
            height={240}>
            <View style={styles.heroBadgeRow}>
              <View style={styles.continueBadge}>
                <Text style={styles.continueBadgeLabel}>CONTINUE</Text>
              </View>
              <View style={styles.unitBadge}>
                <Text style={styles.unitBadgeLabel}>
                  {`UNIT ${nextUnit.order}${arcStage ? ` · ${arcStage}` : ''}`}
                </Text>
              </View>
            </View>
            <View style={styles.heroFoot}>
              <Text style={styles.heroTitle} numberOfLines={2}>
                {nextChallenge.name}
              </Text>
              <Text style={styles.heroObjective} numberOfLines={3}>
                {`Challenge ${nextChallengeGlobalIndex} · ${nextChallenge.objective}`}
              </Text>
              <View style={styles.continueRow}>
                <Text style={styles.continueLabel}>Continue</Text>
                <Text style={styles.continueArrow}>→</Text>
              </View>
            </View>
          </HeroImage>
        </Pressable>
      )}

      {!nextChallenge && (
        <View style={styles.plate}>
          <Text style={styles.plateBodyText}>
            Every challenge in {desertFoundationsPack.name} has been attempted at least once.
          </Text>
        </View>
      )}

      {lastActiveChallenge && lastActiveOutcome && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Last attempt: ${OUTCOME_LABELS[lastActiveOutcome]}, ${lastActiveChallenge.name}`}
          onPress={() =>
            router.push({
              pathname: '/challenge/[challengeId]/review',
              params: { challengeId: lastActiveChallenge.id },
            })
          }
          style={({ pressed }) => [styles.attentionCard, pressed && pressedSurfaceStyle]}>
          <View style={styles.attentionIcon}>
            <View style={styles.attentionIconMark} />
          </View>
          <View style={styles.attentionText}>
            <Text style={styles.attentionEyebrow}>LAST ATTEMPT</Text>
            <Text style={styles.attentionTitle} numberOfLines={2}>
              {`${OUTCOME_LABELS[lastActiveOutcome]} · ${lastActiveChallenge.name}`}
            </Text>
          </View>
          <Text style={styles.attentionArrow}>→</Text>
        </Pressable>
      )}

      <View style={styles.plate}>
        <View style={styles.arcHeader}>
          <Text style={styles.plateEyebrow}>{desertFoundationsPack.name.toUpperCase()}</Text>
          <Text style={styles.arcCount}>{`${completedCount} of ${challenges.length}`}</Text>
        </View>
        <View style={styles.arcBar}>
          {units.map((unit) => (
            <View
              key={unit.id}
              style={[styles.arcSegment, { backgroundColor: unitSegmentColor(unit, nextUnit, progress) }]}
            />
          ))}
        </View>
        <View style={styles.arcLabels}>
          {ARC_STAGES.map((stage, index) => (
            <Text key={stage} style={[styles.arcLabel, nextUnit?.order === index + 1 && styles.arcLabelCurrent]}>
              {stage}
            </Text>
          ))}
        </View>
        {nextUnit && (
          <View style={styles.arcPositionRow}>
            <View style={styles.arcPositionDot} />
            <Text style={styles.arcPositionText}>{`You are here · ${nextUnit.name}`}</Text>
          </View>
        )}
      </View>

      <View style={styles.plate}>
        <Text style={styles.plateEyebrow}>CAPABILITY AREAS</Text>
        <Text style={styles.capabilitySubtitle}>Built through practice — not measured as a level</Text>
        <View style={styles.capabilityChipRow}>
          {sortedDomains.map((id) => {
            const touched = practicedDomains.has(id);
            return (
              <View
                key={id}
                accessibilityLabel={`${COMPETENCY_DOMAINS[id].name}${touched ? ', practiced' : ', not yet practiced'}`}
                style={[styles.capabilityChip, touched ? styles.capabilityChipFilled : styles.capabilityChipEmpty]}>
                <Text
                  style={[
                    styles.capabilityChipLabel,
                    touched ? styles.capabilityChipLabelFilled : styles.capabilityChipLabelEmpty,
                  ]}>
                  {SHORT_DOMAIN_LABEL[id]}
                </Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.capabilityCount}>{`${practicedDomains.size} of ${allDomains.length} areas practiced`}</Text>
      </View>
    </Animated.ScrollView>
  );
}

// A Unit's arc-segment colour: complete (every challenge in it recorded as
// 'completed') reads as done; the Unit containing the next unattempted
// challenge reads as current; everything else reads as not-yet-reached.
// Qualitative state only — no numeric score is derived from this.
function unitSegmentColor(
  unit: (typeof units)[number],
  currentUnit: (typeof units)[number] | undefined,
  progress: ReturnType<typeof useProgress>['progress']
): string {
  const unitChallenges = challenges.filter((c) => c.unitId === unit.id);
  const allComplete = unitChallenges.every((c) => progress.challenges[c.id]?.outcome === 'completed');
  if (allComplete) return colors.textSecondary;
  if (currentUnit && unit.id === currentUnit.id) return colors.accent;
  return withOpacity(colors.textPrimary, 0.16);
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surfaceWarm,
  },
  content: {
    paddingHorizontal: 22,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerText: {
    gap: 5,
  },
  eyebrow: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 9,
    letterSpacing: 1.8,
    color: colors.textSecondary,
  },
  // `lineHeight` was 28 against a 26 fontSize — only 2px of leading, not
  // enough for Young Serif's actual ascent metrics (a taller-ascender
  // display serif than the app's previous type system), which clipped the
  // top of ascenders/uppercase ("G", "f", "t") in "Good afternoon" on
  // device. Raised to give ~8px of leading, matching the same headroom the
  // shared `typography.heading` token already carries at a similar size
  // (24/31 — a ratio of ~1.29, applied here as 26 × ~1.29 ≈ 34) — this is a
  // Home-local raw style, not a shared token, so only this value changes.
  greeting: {
    fontFamily: fontFamily.displayBold,
    fontSize: 26,
    lineHeight: 34,
    color: colors.textPrimary,
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroWrap: {
    marginTop: spacing.sm,
  },
  heroBadgeRow: {
    position: 'absolute',
    top: 16,
    left: 18,
    flexDirection: 'row',
    gap: 7,
  },
  // Ink fill, not Clay — Clay-on-Light is 4.39:1, under the 4.5:1 AA text
  // floor (src/design/tokens/colors.ts), so it stays a graphic-only accent
  // (see the arc bar's "current unit" fill below) and never a filled label
  // background. Same reasoning already applied to ActionButton's `primary`
  // and StatusPill's `emphasis` tone.
  continueBadge: {
    backgroundColor: colors.textPrimary,
    borderRadius: radii.sm,
    paddingVertical: 6,
    paddingHorizontal: 11,
  },
  continueBadgeLabel: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 9,
    letterSpacing: 1.3,
    color: colors.background,
  },
  unitBadge: {
    backgroundColor: withOpacity(colors.background, 0.82),
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: withOpacity(colors.textPrimary, 0.14),
    borderRadius: radii.sm,
    paddingVertical: 6,
    paddingHorizontal: 11,
  },
  unitBadgeLabel: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 9,
    letterSpacing: 1.3,
    color: colors.textPrimary,
  },
  heroFoot: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
    // No shared `gap` — approved 3a uses asymmetric spacing here (8 between
    // title/objective, 15 between objective/button), set explicitly below
    // rather than approximated with one uniform value.
  },
  heroTitle: {
    fontFamily: fontFamily.displayBold,
    fontSize: 28,
    lineHeight: 31,
    color: colors.background,
    maxWidth: 260,
  },
  heroObjective: {
    fontFamily: fontFamily.textRegular,
    // Small typography adjustment (12.5→12, 18→16 line-height) to safely
    // fit the extra (3rd) line within the unchanged 240 hero height — see
    // `continueRow`'s reduced marginTop below for the other half of that
    // budget. No change to hero height/image/crop.
    fontSize: 12,
    lineHeight: 16,
    color: withOpacity(colors.background, 0.75),
    maxWidth: 260,
    marginTop: 8,
  },
  continueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    marginTop: 11,
    backgroundColor: colors.background,
    borderRadius: radii.md,
    height: 48,
  },
  continueLabel: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 13.5,
    color: colors.textPrimary,
  },
  // Ink, not Clay — Clay has no approved text role at any size
  // (src/design/tokens/colors.ts: "There is deliberately no `textAccent`
  // role"). The mock uses Clay for this arrow; matched on weight instead.
  continueArrow: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 13,
    color: colors.textPrimary,
  },
  plate: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 17,
    // Base rhythm only — the arc/capability cards add a small explicit
    // `marginTop` on specific children where approved 3a's actual spacing
    // is larger than this base (see `arcBar`/`arcLabels`/`capabilityRow`).
    gap: 6,
  },
  plateBodyText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  plateEyebrow: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 9,
    letterSpacing: 1.6,
    color: colors.textSecondary,
  },
  attentionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  attentionIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.surfaceDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attentionIconMark: {
    width: 11,
    height: 11,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: colors.textOnDeep,
    transform: [{ rotate: '45deg' }],
  },
  attentionText: {
    flex: 1,
    gap: 2,
  },
  attentionEyebrow: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 9,
    letterSpacing: 1.6,
    color: colors.textSecondary,
  },
  attentionTitle: {
    fontFamily: fontFamily.displayBold,
    fontSize: 16,
    lineHeight: 21,
    color: colors.textPrimary,
    marginTop: 3,
  },
  attentionArrow: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 13,
    color: colors.textSecondary,
  },
  arcHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  arcCount: {
    fontFamily: fontFamily.textMedium,
    fontSize: 11,
    color: colors.textSecondary,
  },
  arcBar: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 6, // + plate's 6 gap = 12, matching approved 3a
  },
  arcSegment: {
    flex: 1,
    height: 7,
    borderRadius: 4,
  },
  arcLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2, // + plate's 6 gap = 8, matching approved 3a
  },
  arcLabel: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 8,
    letterSpacing: 0.64,
    color: withOpacity(colors.textPrimary, 0.4),
  },
  arcLabelCurrent: {
    color: colors.textPrimary,
  },
  arcPositionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  // A plotted survey dot, not a status colour — Clay used as a graphic
  // marker only (same convention as the challenge Hub's own "last attempt"
  // dot), never as text.
  arcPositionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  arcPositionText: {
    fontFamily: fontFamily.textRegular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  capabilitySubtitle: {
    fontFamily: fontFamily.textRegular,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: -4,
  },
  capabilityChipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
    marginTop: 6, // + plate's 6 gap = 12, matching approved 3a's tile row
  },
  capabilityChip: {
    borderRadius: radii.sm,
    paddingVertical: 6,
    paddingHorizontal: 9,
  },
  capabilityChipFilled: {
    backgroundColor: colors.textPrimary,
  },
  capabilityChipEmpty: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: withOpacity(colors.textPrimary, 0.28),
  },
  capabilityChipLabel: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 10.5,
  },
  capabilityChipLabelFilled: {
    color: colors.background,
  },
  capabilityChipLabelEmpty: {
    color: withOpacity(colors.textPrimary, 0.55),
  },
  capabilityCount: {
    fontFamily: fontFamily.textRegular,
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 8,
  },
});
