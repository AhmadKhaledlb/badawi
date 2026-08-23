import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { OUTCOME_LABELS } from '@/components/challenge-outcome-labels';
import { Plate, withOpacity } from '@/components/plate';
import { pressedSurfaceStyle } from '@/components/press-feedback';
import { Screen } from '@/components/screen';
import { BodyText, Eyebrow, MetaText, ScreenHeading } from '@/components/section-heading';
import {
  challenges,
  desertFoundationsPack,
  findUnitById,
  V1_CHALLENGE_COUNT,
  units,
} from '@/content';
import { HairlineRule } from '@/design/illustration/notebook';
import { colors, contentEnter, radii, spacing, staggeredEnter, typography } from '@/design/tokens';
import { COMPETENCY_DOMAINS, type CompetencyId } from '@/domain';
import { useProgress } from '@/state/progress-context';
import type { ChallengeAttemptOutcome } from '@/state';

// ── PROGRESS — THE JOURNEY, NOT A SCORE ──────────────────────────────────
//
// The fourth primary destination, previously an honest structural
// placeholder ("Not built yet"). Built now from data that already exists
// and is already trusted elsewhere in the app — this screen adds no new
// state, no new persistence, and no new computed concept:
//
//   • the six-Unit arc and "you are here" idea is Home's own real
//     `unitSegmentColor`/`nextUnit` logic, given a full page instead of a
//     teaser strip — real per-Unit challenge counts from
//     `findChallengesForUnit`, not invented.
//   • "capability areas practiced" is Home's own real domain-union logic
//     (the set of `challenge.competency.primary` — the curriculum's TARGET
//     mapping, src/domain/competency.ts — across every 'completed'
//     challenge), given room here for the domain's own locked core
//     question, not just a compact chip label. Never a level, never a
//     score: `COMPETENCY_LEVELS` is not imported or referenced anywhere in
//     this file.
//   • "recent activity" is new to this screen (Home only ever shows the
//     single most recent attempt) — every real `progress.challenges` entry
//     with a recorded `outcome`/`updatedAt`, sorted newest first, capped at
//     a readable length. No entry is fabricated; an empty state is shown
//     honestly when nothing has been attempted yet.
//
// This is deliberately NOT a duplicate of Profile: Profile is the identity/
// status record card (onboarding, safety acceptance, outcome totals).
// Progress is the journey view — where you are in the six Units, which
// capability areas your completed work has touched, and what you did
// recently. No XP, streak, leaderboard, percentage-as-achievement, numeric
// skill score, or "Expert" tier exists anywhere below (CLAUDE.md).
const ARC_STAGES = ['READ', 'UNDERSTAND', 'PREPARE', 'ORIENT', 'MOVE', 'INTEGRATE'] as const;

const SHORT_DOMAIN_LABEL: Record<CompetencyId, string> = {
  C1: 'Observation',
  C2: 'Reasoning',
  C3: 'Field Capability',
  C4: 'Adaptation',
  C5: 'Safety',
  C6: 'Reflection',
};

const RECENT_ACTIVITY_LIMIT = 8;

export default function ProgressScreen() {
  const { progress, isHydrated } = useProgress();

  if (!isHydrated) {
    return null;
  }

  const completedCount = challenges.filter((c) => progress.challenges[c.id]?.outcome === 'completed').length;
  const nextChallenge = challenges.find((c) => !progress.challenges[c.id]);
  const nextUnit = nextChallenge ? findUnitById(nextChallenge.unitId) : undefined;

  const practicedDomains = new Set<CompetencyId>();
  for (const c of challenges) {
    if (progress.challenges[c.id]?.outcome === 'completed') {
      c.competency.primary.forEach((id) => practicedDomains.add(id));
    }
  }
  const allDomains = Object.keys(COMPETENCY_DOMAINS) as CompetencyId[];

  const recentActivity = Object.entries(progress.challenges)
    .map(([challengeId, entry]) => ({
      challenge: challenges.find((c) => c.id === challengeId),
      outcome: entry.outcome,
      updatedAt: entry.updatedAt,
    }))
    .filter(
      (item): item is { challenge: NonNullable<typeof item.challenge>; outcome: ChallengeAttemptOutcome; updatedAt: string } =>
        item.challenge !== undefined
    )
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, RECENT_ACTIVITY_LIMIT);

  return (
    <Screen measure="canvas" backdropHeight={200}>
      <View style={styles.header}>
        <Eyebrow>{desertFoundationsPack.name}</Eyebrow>
        <ScreenHeading>Progress</ScreenHeading>
      </View>

      {/* JOURNEY — real per-Unit position, same underlying data as Home's
          arc strip, expanded into six real rows. */}
      <Animated.View entering={contentEnter}>
        <Plate variant="paper" elevated style={styles.journeyPlate}>
          <View style={styles.journeyHead}>
            <Eyebrow>Journey</Eyebrow>
            <Text style={styles.journeyCount}>{`${completedCount} of ${V1_CHALLENGE_COUNT}`}</Text>
          </View>
          <HairlineRule weight="faint" />
          <View style={styles.unitList}>
            {units.map((unit) => {
              const unitChallenges = challenges.filter((c) => c.unitId === unit.id);
              const unitCompleted = unitChallenges.filter(
                (c) => progress.challenges[c.id]?.outcome === 'completed'
              ).length;
              const isCurrent = nextUnit?.id === unit.id;
              const isDone = unitCompleted === unitChallenges.length;
              return (
                <View key={unit.id} style={styles.unitRow}>
                  <View
                    style={[
                      styles.unitMark,
                      isDone && styles.unitMarkDone,
                      isCurrent && styles.unitMarkCurrent,
                    ]}
                  />
                  <View style={styles.unitText}>
                    <Text style={styles.unitStage}>{ARC_STAGES[unit.order - 1]}</Text>
                    <Text style={styles.unitName}>{unit.name}</Text>
                  </View>
                  <Text style={styles.unitCount}>{`${unitCompleted}/${unitChallenges.length}`}</Text>
                </View>
              );
            })}
          </View>
          {nextUnit && (
            <>
              <HairlineRule weight="faint" />
              <MetaText>{`You are here — ${nextUnit.name}.`}</MetaText>
            </>
          )}
        </Plate>
      </Animated.View>

      {/* CAPABILITY AREAS — descriptive only. Never a level, never a score. */}
      <Animated.View entering={staggeredEnter(1)}>
        <Plate variant="warm" style={styles.capabilityPlate}>
          <Eyebrow>Capability areas</Eyebrow>
          <BodyText>Built through practice — not measured as a level.</BodyText>
          <View style={styles.domainList}>
            {allDomains.map((id) => {
              const touched = practicedDomains.has(id);
              return (
                <View key={id} style={styles.domainRow}>
                  <View style={[styles.domainMark, touched && styles.domainMarkTouched]} />
                  <View style={styles.domainText}>
                    <Text style={[styles.domainName, !touched && styles.domainNameMuted]}>
                      {SHORT_DOMAIN_LABEL[id]}
                    </Text>
                    <Text style={styles.domainQuestion}>{COMPETENCY_DOMAINS[id].coreQuestion}</Text>
                  </View>
                  <Text style={styles.domainState}>{touched ? 'Practiced' : 'Not yet'}</Text>
                </View>
              );
            })}
          </View>
          <MetaText>{`${practicedDomains.size} of ${allDomains.length} areas practiced through completed challenges.`}</MetaText>
        </Plate>
      </Animated.View>

      {/* RECENT ACTIVITY — real recorded attempts, newest first. */}
      <Animated.View entering={staggeredEnter(2)} style={styles.activitySection}>
        <Eyebrow>Recent activity</Eyebrow>
        {recentActivity.length === 0 ? (
          <Plate variant="outline">
            <BodyText>No challenges attempted yet.</BodyText>
          </Plate>
        ) : (
          <View style={styles.activityList}>
            {recentActivity.map(({ challenge, outcome }) => {
              const unit = findUnitById(challenge.unitId);
              return (
                <Pressable
                  key={challenge.id}
                  accessibilityRole="button"
                  accessibilityLabel={`${OUTCOME_LABELS[outcome]}: ${challenge.name}`}
                  onPress={() =>
                    router.push({
                      pathname: '/challenge/[challengeId]/review',
                      params: { challengeId: challenge.id },
                    })
                  }
                  style={({ pressed }) => [styles.activityRow, pressed && pressedSurfaceStyle]}>
                  <View style={styles.activityMark} />
                  <View style={styles.activityText}>
                    <Text style={styles.activityTitle} numberOfLines={1}>
                      {challenge.name}
                    </Text>
                    <Text style={styles.activityMeta}>
                      {`${OUTCOME_LABELS[outcome]}${unit ? ` · ${unit.name}` : ''}`}
                    </Text>
                  </View>
                  <Text style={styles.activityArrow}>→</Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
  },
  journeyPlate: {
    gap: spacing.md,
  },
  journeyHead: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  journeyCount: {
    ...typography.metaEmphasis,
    color: colors.textSecondary,
  },
  unitList: {
    gap: spacing.sm,
  },
  unitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  unitMark: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: withOpacity(colors.textPrimary, 0.25),
  },
  unitMarkDone: {
    borderColor: colors.textSecondary,
    backgroundColor: colors.textSecondary,
  },
  unitMarkCurrent: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  unitText: {
    flex: 1,
    gap: 1,
  },
  unitStage: {
    ...typography.label,
    fontSize: 9,
    color: colors.textSecondary,
    opacity: 0.75,
  },
  unitName: {
    ...typography.bodyEmphasis,
    color: colors.textPrimary,
  },
  unitCount: {
    ...typography.meta,
    color: colors.textSecondary,
  },
  capabilityPlate: {
    gap: spacing.sm,
  },
  domainList: {
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  domainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  domainMark: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    borderWidth: 2,
    borderColor: withOpacity(colors.textPrimary, 0.25),
  },
  domainMarkTouched: {
    borderColor: colors.terrainMid,
    backgroundColor: colors.terrainMid,
  },
  domainText: {
    flex: 1,
    gap: 2,
  },
  domainName: {
    ...typography.bodyEmphasis,
    color: colors.textPrimary,
  },
  domainNameMuted: {
    color: colors.textSecondary,
  },
  domainQuestion: {
    ...typography.meta,
    color: colors.textSecondary,
    opacity: 0.85,
  },
  domainState: {
    ...typography.label,
    fontSize: 9,
    color: colors.textSecondary,
    opacity: 0.75,
  },
  activitySection: {
    gap: spacing.sm,
  },
  activityList: {
    gap: spacing.sm,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.background,
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.surfaceWarm,
    padding: spacing.md,
  },
  activityMark: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textSecondary,
    opacity: 0.5,
  },
  activityText: {
    flex: 1,
    gap: 1,
  },
  activityTitle: {
    ...typography.bodyEmphasis,
    color: colors.textPrimary,
  },
  activityMeta: {
    ...typography.meta,
    color: colors.textSecondary,
  },
  activityArrow: {
    ...typography.label,
    color: colors.accent,
  },
});
