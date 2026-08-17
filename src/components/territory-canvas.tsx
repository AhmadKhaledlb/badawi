import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Defs, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { withOpacity } from '@/components/plate';
import { pressedSurfaceStyle } from '@/components/press-feedback';
import { CornerMarks } from '@/design/illustration/notebook';
import {
  colors,
  fadeEnter,
  lineOpacity,
  radii,
  spacing,
  typography,
  waypointEnter,
} from '@/design/tokens';

// ─────────────────────────────────────────────────────────────────────────
// THE BLUEPRINT MAP CANVAS
// ─────────────────────────────────────────────────────────────────────────
//
// The Blueprint Map is BADAWI's home surface and the screen the previous pass
// got most wrong: it had become two horizontal rows in a list. This is the
// replacement — an actual PLAN-VIEW SURVEY SHEET.
//
// Why plan view rather than another dune horizon: everywhere else in the app
// terrain is seen in ELEVATION (you're standing in it, looking out). Home is
// the one place you're looking DOWN at the whole territory and choosing where
// to go. Switching projection is what makes Home feel like a map instead of
// another hero image, and it gives the app a second, complementary
// illustration mode rather than one repeated backdrop.
//
// The sheet carries: a survey grid, nested contour rings over the active
// landmass, a plotted dashed approach route running to the active waypoint,
// and hatched/dashed unsurveyed territory.
//
// ── PRODUCT SEMANTICS (LOCKED, UNCHANGED) ────────────────────────────────
// Arabian Peninsula is the one active V1 territory; other territory is shown
// as honestly unsurveyed and is NOT interactive. No specific future region
// name is invented — the unsurveyed landmasses carry no names at all, only a
// "Coming soon" state, because naming a region BADAWI has not committed to
// would be inventing product scope (docs/design/README.md, "Navigation
// Model").
//
// The map is drawn from abstract landform contours. It is NOT a depiction of
// real geography and encodes no navigational or field information — the
// shapes are invented topology, not the Arabian Peninsula's actual coastline,
// and nothing here should ever be read as a real map.

const CANVAS_W = 320;
const CANVAS_H = 360;

/** Nested contour rings over the active landmass — plan-view relief. */
const ACTIVE_CONTOURS = [
  'M 130 150 C 130 100 175 78 218 88 C 262 98 288 132 282 172 C 276 212 240 236 200 230 C 158 224 130 196 130 150 Z',
  'M 150 152 C 150 116 182 100 216 108 C 250 116 268 142 263 172 C 258 202 232 218 202 213 C 170 208 150 186 150 152 Z',
  'M 172 154 C 172 132 190 122 212 128 C 234 134 246 152 242 170 C 238 190 222 200 204 196 C 186 192 172 176 172 154 Z',
];

/** The plotted approach — where you are heading, drawn as a survey traverse. */
const APPROACH_PATH = 'M 40 336 C 66 296 94 270 126 242 C 156 216 178 190 205 165';

/** Unsurveyed landmasses. Deliberately unnamed. */
const UNSURVEYED_CONTOURS = [
  'M 46 92 C 46 66 68 52 92 56 C 116 60 130 80 126 102 C 122 124 100 134 78 129 C 58 124 46 112 46 92 Z',
  'M 58 286 C 58 264 78 252 100 256 C 122 260 134 278 130 296 C 126 314 106 322 86 318 C 68 314 58 302 58 286 Z',
];

/** Node anchors as canvas fractions, so overlays track the art at any size. */
const NODE_POSITION = {
  active: { left: 207 / CANVAS_W, top: 162 / CANVAS_H },
  unsurveyed: [
    { left: 86 / CANVAS_W, top: 93 / CANVAS_H },
    { left: 96 / CANVAS_W, top: 287 / CANVAS_H },
  ],
};

type TerritoryCanvasProps = {
  /** The active territory's real name, from src/content/region.ts. */
  activeName: string;
  /** Short state label for the active territory, e.g. "Active". */
  activeState: string;
  onPressActive: () => void;
  /** Label for unsurveyed territory, e.g. "Coming soon". */
  unsurveyedLabel: string;
};

export function TerritoryCanvas({
  activeName,
  activeState,
  onPressActive,
  unsurveyedLabel,
}: TerritoryCanvasProps) {
  const gridLines = [];
  for (let x = 40; x < CANVAS_W; x += 40) {
    gridLines.push(<Path key={`gx-${x}`} d={`M ${x} 0 L ${x} ${CANVAS_H}`} />);
  }
  for (let y = 40; y < CANVAS_H; y += 40) {
    gridLines.push(<Path key={`gy-${y}`} d={`M 0 ${y} L ${CANVAS_W} ${y}`} />);
  }

  return (
    <View style={styles.canvas}>
      <Svg
        style={StyleSheet.absoluteFill}
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        preserveAspectRatio="xMidYMid slice"
        pointerEvents="none">
        <Defs>
          <LinearGradient id="badawi-map-sheet" x1="0" y1="0" x2="0.6" y2="1">
            <Stop offset="0" stopColor={colors.background} />
            <Stop offset="1" stopColor={colors.surfaceWarm} />
          </LinearGradient>
        </Defs>

        <Rect x={0} y={0} width={CANVAS_W} height={CANVAS_H} fill="url(#badawi-map-sheet)" />

        {/* Survey grid — the sheet's measured ground. */}
        <G stroke={colors.rule} strokeWidth={0.75} opacity={lineOpacity.faint * 2}>
          {gridLines}
        </G>

        {/* Unsurveyed territory: dashed outline, no fill, no contours. The
            same dashed language the pending-content plate uses. */}
        {UNSURVEYED_CONTOURS.map((d, index) => (
          <Path
            key={`unsurveyed-${index}`}
            d={d}
            fill={colors.terrainFar}
            fillOpacity={0.1}
            stroke={colors.rule}
            strokeWidth={1.25}
            strokeDasharray="6 6"
            opacity={0.45}
          />
        ))}

        {/* Active landmass: filled, contoured, fully surveyed. */}
        <Path d={ACTIVE_CONTOURS[0]} fill={colors.terrainFar} fillOpacity={0.3} />
        {ACTIVE_CONTOURS.map((d, index) => (
          <Path
            key={`contour-${index}`}
            d={d}
            fill={index === 0 ? 'none' : colors.terrainMid}
            fillOpacity={index === 0 ? 0 : 0.14}
            stroke={colors.rule}
            strokeWidth={1.25}
            opacity={0.42}
          />
        ))}

        {/* The plotted approach to the active waypoint. */}
        <Path
          d={APPROACH_PATH}
          stroke={colors.accent}
          strokeWidth={2}
          strokeDasharray="7 6"
          fill="none"
          opacity={0.85}
        />
      </Svg>

      <CornerMarks ground="light" inset={14} arm={16} />

      {/* ── Interactive overlay ────────────────────────────────────────────
          Waypoints are real React Native views rather than SVG text, so the
          type system, touch targets, and screen-reader semantics are the
          app's own — not SVG's. They are anchored by canvas fraction, so they
          stay locked to the art at every viewport size. */}
      <Animated.View
        entering={waypointEnter(0)}
        style={[
          styles.node,
          { left: `${NODE_POSITION.active.left * 100}%`, top: `${NODE_POSITION.active.top * 100}%` },
        ]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${activeName}. ${activeState} territory.`}
          onPress={onPressActive}
          style={({ pressed }) => [styles.nodeInner, pressed && pressedSurfaceStyle]}>
          <View style={styles.waypointRing}>
            <View style={styles.waypointCore} />
          </View>
          <View style={styles.activeLabel}>
            <Text style={styles.activeName}>{activeName}</Text>
            <View style={styles.activeStateRow}>
              <View style={styles.activeDot} />
              <Text style={styles.stateText}>{activeState}</Text>
            </View>
          </View>
        </Pressable>
      </Animated.View>

      {NODE_POSITION.unsurveyed.map((position, index) => (
        <Animated.View
          key={`unsurveyed-node-${index}`}
          entering={fadeEnter}
          style={[
            styles.node,
            { left: `${position.left * 100}%`, top: `${position.top * 100}%` },
          ]}>
          {/* Not pressable, and not focusable: there is nothing here to open.
              A disabled control would imply something is being withheld. */}
          <View style={styles.nodeInner}>
            <View style={styles.ghostRing} />
            <Text style={styles.ghostLabel}>{unsurveyedLabel}</Text>
          </View>
        </Animated.View>
      ))}
    </View>
  );
}

const NODE_WIDTH = 150;
const WAYPOINT_SIZE = 40;
const GHOST_SIZE = 26;

const styles = StyleSheet.create({
  canvas: {
    width: '100%',
    aspectRatio: CANVAS_W / CANVAS_H,
    borderRadius: radii.xxl,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.surfaceWarm,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: withOpacity(colors.rule, lineOpacity.hairline),
  },
  node: {
    position: 'absolute',
    // Fixed width + centred content, so the centring transform below is exact.
    // Without an explicit width the view sizes to its LABEL (which is wider
    // than the marker), and translating by half the marker size would leave
    // the waypoint visibly off its map coordinate.
    width: NODE_WIDTH,
    alignItems: 'center',
    // Anchors the marker's centre on the map coordinate rather than the
    // view's top-left corner.
    transform: [{ translateX: -NODE_WIDTH / 2 }, { translateY: -WAYPOINT_SIZE / 2 }],
  },
  nodeInner: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  waypointRing: {
    width: WAYPOINT_SIZE,
    height: WAYPOINT_SIZE,
    borderRadius: radii.pill,
    borderWidth: 2,
    borderColor: colors.accent,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waypointCore: {
    width: 12,
    height: 12,
    borderRadius: radii.pill,
    backgroundColor: colors.accent,
  },
  activeLabel: {
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
    backgroundColor: colors.background,
  },
  activeName: {
    ...typography.subheading,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  activeStateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 1,
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: radii.pill,
    backgroundColor: colors.accent,
  },
  stateText: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  ghostRing: {
    width: GHOST_SIZE,
    height: GHOST_SIZE,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.textSecondary,
    opacity: 0.45,
  },
  ghostLabel: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    opacity: 0.6,
    textAlign: 'center',
  },
});
