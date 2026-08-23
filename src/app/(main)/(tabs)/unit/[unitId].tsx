import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { ChallengeChainItem } from '@/components/challenge-chain-item';
import { OUTCOME_LABELS } from '@/components/challenge-outcome-labels';
import { Plate } from '@/components/plate';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { BodyText, Eyebrow, Ordinal, PullQuote } from '@/components/section-heading';
import { desertFoundationsPack, findChallengesForUnit, findUnitById } from '@/content';
import { HairlineRule } from '@/design/illustration/notebook';
import type { Atmosphere } from '@/design/illustration/terrain-scene';
import { TerrainWindow } from '@/design/illustration/terrain-scene';
import { colors, contentEnter, spacing, staggeredEnter, typography } from '@/design/tokens';
import { useProgress } from '@/state/progress-context';

// ── UNIT — STATION DETAIL AND CHALLENGE TRAVERSE ─────────────────────────
//
// Arriving at a station: a terrain window establishes where you are, a
// station plate overlaps it carrying the Unit's locked framing, and the
// Unit's Challenges run below as a connected traverse
// (src/components/challenge-chain-item.tsx) — a straight rail with square
// survey nodes, deliberately a different cadence from the Pack's staggered
// route so the two hierarchy levels never blur together.
//
// The station plate OVERLAPS the terrain window rather than sitting under it.
// That overlap is the recurring motif of the whole app: paper laid on
// terrain. It also guarantees contrast — every word on this screen sits on an
// opaque plate, never on the illustration, so no text depends on which
// atmosphere the station happens to use.
//
// ── LOCKED CONTENT, SHOWN AS-IS ──────────────────────────────────────────
// `coreQuestion` and `purpose` are LOCKED specification text (spec §14). They
// are presented plainly as structural framing — the italic serif pull-quote
// deliberately marks the core question as *quoted specification*, not as
// polished learner instruction. No preparation, field, or reflection content
// is invented here; none exists yet.
//
// The traverse shows every Challenge as reachable. Prerequisites are
// curriculum context, not a runtime gate (spec §16), and this screen does not
// invent one.

const STATION_ATMOSPHERE: Record<number, Atmosphere> = {
  1: 'day',
  2: 'day',
  3: 'dawn',
  4: 'dawn',
  5: 'night',
  6: 'night',
};

export default function UnitScreen() {
  const { unitId } = useLocalSearchParams<{ unitId: string }>();
  const unit = findUnitById(unitId);
  const { progress } = useProgress();

  if (!unit) {
    return (
      <Screen>
        <ScreenHeader title="Unit not found" onBack={() => router.back()} />
      </Screen>
    );
  }

  const unitChallenges = findChallengesForUnit(unit.id);

  return (
    <Screen measure="canvas" backdropHeight={240}>
      <ScreenHeader
        title={unit.name}
        trail={[desertFoundationsPack.name]}
        onBack={() => router.back()}
        rule={false}
      />

      <Animated.View entering={contentEnter} style={styles.hero}>
        <TerrainWindow
          atmosphere={STATION_ATMOSPHERE[unit.order] ?? 'day'}
          height={190}
          cornerMarks
        />
        {/* Paper laid on terrain. Every word below sits on this opaque plate. */}
        <Plate variant="paper" elevated style={styles.stationPlate}>
          <View style={styles.stationHead}>
            <Ordinal value={unit.order} size="lg" accent />
            <View style={styles.stationHeadText}>
              <Eyebrow>{`Station ${String(unit.order).padStart(2, '0')}`}</Eyebrow>
              <PullQuote>{unit.coreQuestion}</PullQuote>
            </View>
          </View>
          <HairlineRule weight="faint" />
          <BodyText>{unit.purpose}</BodyText>
        </Plate>
      </Animated.View>

      <View style={styles.traverseHead}>
        <Eyebrow>Challenges</Eyebrow>
        <Text style={styles.count}>{unitChallenges.length} challenges in this unit.</Text>
      </View>

      <View style={styles.traverse}>
        {unitChallenges.map((challenge, index) => {
          const recorded = progress.challenges[challenge.id];
          return (
            <Animated.View key={challenge.id} entering={staggeredEnter(index)}>
              <ChallengeChainItem
                order={challenge.order}
                title={challenge.name}
                outcomeLabel={recorded ? OUTCOME_LABELS[recorded.outcome] : undefined}
                isFirst={index === 0}
                isLast={index === unitChallenges.length - 1}
                onPress={() =>
                  router.push({
                    pathname: '/challenge/[challengeId]',
                    params: { challengeId: challenge.id },
                  })
                }
              />
            </Animated.View>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    gap: 0,
  },
  stationPlate: {
    // The overlap that pins the plate to the terrain.
    marginTop: -52,
    marginHorizontal: spacing.md,
    gap: spacing.md,
  },
  stationHead: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.lg,
  },
  stationHeadText: {
    flex: 1,
    gap: spacing.xs,
  },
  traverseHead: {
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  count: {
    ...typography.meta,
    color: colors.textSecondary,
  },
  traverse: {
    gap: 0,
  },
});
