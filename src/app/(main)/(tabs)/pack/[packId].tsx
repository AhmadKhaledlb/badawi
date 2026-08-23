import { router, useLocalSearchParams } from 'expo-router';
import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Plate } from '@/components/plate';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { Eyebrow } from '@/components/section-heading';
import { StationPlate } from '@/components/station-plate';
import { arabianPeninsulaRegion, desertEnvironment, findPackById, findUnitsForPack } from '@/content';
import { RouteConnector, SurveyTicks } from '@/design/illustration/notebook';
import type { Atmosphere } from '@/design/illustration/terrain-scene';
import { colors, contentEnter, spacing, staggeredEnter, typography } from '@/design/tokens';

// ── DESERT FOUNDATIONS — THE EXPEDITION ROUTE ────────────────────────────
//
// The Pack screen was the clearest failure of the previous pass: six units
// rendered as six identical settings rows. It is now a plotted route.
//
// Six illustrated STATIONS descend the page, alternating left and right of a
// dashed survey traverse, each with its own terrain window. The window's
// atmosphere advances across the route — open daylight at Station 01, dawn
// through the middle, deep night by Station 06 — so scrolling the Pack feels
// like travelling into the environment rather than scrolling a catalogue.
//
// ── LOCKED SEMANTICS, PRESENTATION ONLY ──────────────────────────────────
// The Units, their names, their order, and their core questions all come from
// src/content/units.ts unchanged. The atmosphere ramp below is a VISUAL
// sequence over an already-locked curriculum order — it does not imply
// difficulty, danger, or a gate. Nothing on this screen locks a station,
// scores a station, or shows a completion count: BADAWI does not gate Units
// on prior Units at runtime (v1-curriculum-spec.md §6, "No artificial
// prerequisites"), and a per-station progress figure would invite reading
// route position as achievement.

/**
 * Visual atmosphere per station position. A presentation ramp only — see the
 * note above. Indexed by 1-based Unit order, with a safe fallback so a future
 * Pack of a different length cannot crash the screen.
 */
const STATION_ATMOSPHERE: Record<number, Atmosphere> = {
  1: 'day',
  2: 'day',
  3: 'dawn',
  4: 'dawn',
  5: 'night',
  6: 'night',
};

export default function PackScreen() {
  const { packId } = useLocalSearchParams<{ packId: string }>();
  const pack = findPackById(packId);

  if (!pack) {
    return (
      <Screen>
        <ScreenHeader title="Pack not found" onBack={() => router.back()} />
      </Screen>
    );
  }

  const units = findUnitsForPack(pack.id);

  return (
    <Screen measure="canvas" backdropHeight={300}>
      <ScreenHeader
        title={pack.name}
        // Deliberately excludes the pack's own name: a test asserts it
        // renders exactly once (src/app/(main)/pack/__tests__/[packId].test.tsx).
        trail={[arabianPeninsulaRegion.name, desertEnvironment.name]}
        onBack={() => router.back()}
      />

      <Animated.View entering={contentEnter}>
        <Plate variant="warm" style={styles.brief}>
          <Eyebrow>Expedition route</Eyebrow>
          <Text style={styles.briefText}>{units.length} units — curriculum structure is locked.</Text>
          <View style={styles.ticks}>
            <SurveyTicks count={units.length * 4 + 1} />
          </View>
        </Plate>
      </Animated.View>

      <View style={styles.route}>
        {units.map((unit, index) => {
          const align = index % 2 === 0 ? 'left' : 'right';
          return (
            <Fragment key={unit.id}>
              {index > 0 && (
                <RouteConnector direction={align === 'left' ? 'rightToLeft' : 'leftToRight'} />
              )}
              <Animated.View entering={staggeredEnter(index)}>
                <StationPlate
                  order={unit.order}
                  title={unit.name}
                  coreQuestion={unit.coreQuestion}
                  align={align}
                  atmosphere={STATION_ATMOSPHERE[unit.order] ?? 'day'}
                  onPress={() =>
                    router.push({ pathname: '/unit/[unitId]', params: { unitId: unit.id } })
                  }
                />
              </Animated.View>
            </Fragment>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  brief: {
    gap: spacing.sm,
  },
  briefText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  ticks: {
    marginTop: spacing.xs,
  },
  route: {
    gap: 0,
  },
});
