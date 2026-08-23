import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import Svg, { Circle, Defs, Path, RadialGradient, Stop } from 'react-native-svg';

import { pressedSurfaceStyle } from '@/components/press-feedback';
import {
  ARABIAN_PENINSULA_CENTROID,
  ARABIAN_PENINSULA_PATH,
  WORLD_LAND_PATH,
  WORLD_VIEW_BOX,
} from '@/design/illustration/world-geography';
import { colors, durations, easings, fontFamily, radii, touchTarget } from '@/design/tokens';
import { useReducedMotion } from '@/design/use-reduced-motion';

// ─────────────────────────────────────────────────────────────────────────
// THE WORLD CANVAS — Explore's territory visualization
// ─────────────────────────────────────────────────────────────────────────
//
// Phase 5A, correction pass: the first implementation substituted invented
// abstract SVG blobs for the recognizable world geography approved 3b
// depends on — rejected on review. This version renders real, offline,
// locally-bundled world/Arabian-Peninsula path data — see
// src/design/illustration/world-geography.ts for source, license, and the
// exact derivation (Natural Earth, public domain, Miller projection,
// simplified once at implementation time, never fetched at runtime).
//
// ── PRODUCT SEMANTICS (LOCKED) ───────────────────────────────────────────
// Arabian Peninsula is the one active V1 territory — highlighted by real
// geographic boundary, not an invented shape. No other landmass is named or
// classified into a specific availability state on the map itself; the
// legend teaches the vocabulary, but nothing here asserts which real future
// region (if any) is "in research" vs "planned" vs simply unavailable,
// since no product/content data makes that classification yet. See the
// Explore screen's own header comment for the fuller reasoning.
//
// ── SELF-CONTAINED MAP BLOCK ──────────────────────────────────────────────
// Owns its own pan/zoom/pinch state so the shared values driving the
// transform never have to cross a component boundary — the legend, zoom
// controls, and zoom-level status all live here as one cohesive unit; the
// Explore screen just places this block in its layout.
//
// ── LABEL SCALING (correction pass) ──────────────────────────────────────
// The `ARABIAN PENINSULA` label lives INSIDE the same transformed group as
// the map geometry — correct for PANNING (it has to track the geography,
// not sit fixed to the viewport) but wrong for SIZE: the first pass gave it
// a static size/offset, which meant it scaled by the exact same factor as
// the map. At 1x that was already visually larger than the peninsula's own
// small projected footprint; at 3x, scaling both by the same factor kept
// that same disproportion but now in absolute screen pixels big enough to
// cover the region it was labeling. Fixed by counter-scaling the label's OWN
// transform by `1/scale.value` (see `labelStyle` below) so its rendered
// size and offset from the anchor point stay visually CONSTANT regardless
// of zoom — same technique real map UIs use to keep pins/labels legible at
// any zoom — layered with discrete content per zoom tier (full name at
// CONTINENTAL, compact at SUB-REGION, dot-only at LANDSCAPE) so the
// geography itself, not the label, is what fills the frame at close zoom.
//
// ── VISUAL-FIDELITY PASS (this correction) ────────────────────────────────
// Two more reported defects, both traced to the same root cause — treatment
// that read fine as code but, applied uniformly across nearly the whole map
// area, visibly lightened the canvas relative to the approved Night tone:
//   1. A stray "dot" beside the peninsula — a degenerate simplification
//      artifact in the locally-derived path data (see
//      src/design/illustration/world-geography.ts's header), not a UI bug.
//   2. The dormant-world fill/stroke opacity was heavy enough, spread over
//      most of the map's area, to read as its own lighter panel rather than
//      "dormant, in Night" — reduced (see the `WORLD_LAND_PATH` `<Path>`
//      below) rather than introducing a new color; `colors.surfaceDeep`
//      (Night) is unchanged and is already the correct token both the page
//      and the map canvas share.
const MIN_SCALE = 1;
// Correction pass: 3x left LANDSCAPE reading as barely past sub-regional in
// the simulator. Sized against the Arabian Peninsula path's own measured
// bounding box (src/design/illustration/world-geography.ts): it spans
// ~53 of the 760 viewBox units (~7% of world width). At a typical ~360pt
// phone gutter width, that's ~25pt at FIT (1x) and ~151pt — ~42% of the
// viewport — at 6x, comfortably reading as the dominant on-screen shape
// with its coastline inspectable, without the runaway pan range an
// unbounded/much-higher max would need. Pan bounds (see `setScale`/pan
// gesture below) are already `(scale-1)*dimension/2`, a formula that scales
// correctly with any max — re-verified at 6x, not changed.
const MAX_SCALE = 6;
// Multiplicative, not additive: reaches MAX_SCALE in exactly 4 presses from
// MIN_SCALE (1 → 1.57 → 2.45 → 3.83 → 6) — enough range per tap to move
// between zoom tiers without excessive tapping, without a jump so large it
// reads as a snap. Pinch is untouched and stays fully continuous.
const ZOOM_STEP_MULTIPLIER = Math.pow(MAX_SCALE / MIN_SCALE, 1 / 4);

// Visible controls (22dp) are sized to match approved 3b's proportions —
// smaller again this pass — but the touch target still has to clear the
// app's 48dp floor (src/design/tokens/layout.ts) — made up entirely in
// `hitSlop`, invisible padding rather than a visually larger button.
const CONTROL_SIZE = 22;
const CONTROL_HIT_SLOP = (touchTarget.minimum - CONTROL_SIZE) / 2;

const AP_FRACTION = {
  x: ARABIAN_PENINSULA_CENTROID.x / WORLD_VIEW_BOX.width,
  y: ARABIAN_PENINSULA_CENTROID.y / WORLD_VIEW_BOX.height,
};

type ZoomTier = 'CONTINENTAL' | 'SUB-REGION' | 'LANDSCAPE';

function zoomTierFor(scale: number): ZoomTier {
  if (scale >= 3) return 'LANDSCAPE';
  if (scale > MIN_SCALE) return 'SUB-REGION';
  return 'CONTINENTAL';
}

// The glow/ring survey treatment, by tier — see the file header's zoom
// correction note. Restrained at CONTINENTAL, reduced at SUB-REGION, gone
// at LANDSCAPE so real geography (not a spotlight) is the close-zoom focus.
const SURVEY_TREATMENT: Record<ZoomTier, { glow: number; ring: number }> = {
  CONTINENTAL: { glow: 0.3, ring: 0.5 },
  'SUB-REGION': { glow: 0.14, ring: 0.25 },
  LANDSCAPE: { glow: 0, ring: 0 },
};

// Half-width for horizontal centering and half-height of the dot for
// vertical centering — both counter-scaled below (see `labelStyle`) so the
// dot sits exactly ON the geographic point at every zoom level. The label
// plate itself is NOT independently offset — it flows below the dot via
// plain column layout + `gap` (see `activeAnchor`/`activeDot` styles),
// which is already inside the same counter-scaled subtree, so that spacing
// stays a constant on-screen distance too without a second manual offset.
const LABEL_HALF_WIDTH = 34;
const DOT_HALF_HEIGHT = 3;

function clampNumber(value: number, limit: number): number {
  'worklet';
  return Math.min(limit, Math.max(-limit, value));
}

type WorldCanvasProps = {
  activeName: string;
  onPressActive: () => void;
};

export function WorldCanvas({ activeName, onPressActive }: WorldCanvasProps) {
  const prefersReducedMotion = useReducedMotion();
  const [container, setContainer] = useState({ width: 0, height: 0 });
  const [zoomTier, setZoomTier] = useState<ZoomTier>(zoomTierFor(MIN_SCALE));

  const scale = useSharedValue(MIN_SCALE);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedScale = useSharedValue(MIN_SCALE);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  function handleLayout(event: LayoutChangeEvent) {
    const { width, height } = event.nativeEvent.layout;
    setContainer({ width, height });
  }

  function reportZoomTier(nextScale: number) {
    setZoomTier(zoomTierFor(nextScale));
  }

  // Buttons run on the JS thread already — no worklet/UI-thread bridge
  // needed, unlike the gesture callbacks below.
  //
  // Button zoom (unlike pinch) also nudges translation toward the Arabian
  // Peninsula centroid, clamped by the same pan bound — pinch deliberately
  // stays under the user's own fingers/focal point instead (forcing a
  // recenter there would fight the gesture), but a button press has no
  // finger position to respect, and the peninsula sits well off-center in
  // the world layout (x≈64%, y≈38%), so a naive center-zoom would drift it
  // toward the edge rather than into better view.
  function setScale(next: number) {
    const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
    const maxX = ((clamped - 1) * container.width) / 2;
    const maxY = ((clamped - 1) * container.height) / 2;
    const idealX = -(AP_FRACTION.x - 0.5) * container.width;
    const idealY = -(AP_FRACTION.y - 0.5) * container.height;
    const nextX = Math.min(maxX, Math.max(-maxX, idealX));
    const nextY = Math.min(maxY, Math.max(-maxY, idealY));

    if (prefersReducedMotion) {
      scale.value = clamped;
      translateX.value = nextX;
      translateY.value = nextY;
    } else {
      const config = { duration: durations.base, easing: easings.standard };
      scale.value = withTiming(clamped, config);
      translateX.value = withTiming(nextX, config);
      translateY.value = withTiming(nextY, config);
    }
    setZoomTier(zoomTierFor(clamped));
  }

  // FIT resets both scale and translation: at scale 1 the pan bound formula
  // below is 0, so clamping translateX/Y to that bound already forces them
  // back to 0 — no separate reset branch needed.
  function handleFit() {
    setScale(MIN_SCALE);
  }

  const panGesture = Gesture.Pan()
    .onStart(() => {
      'worklet';
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      'worklet';
      const maxX = ((scale.value - 1) * container.width) / 2;
      const maxY = ((scale.value - 1) * container.height) / 2;
      translateX.value = clampNumber(savedTranslateX.value + event.translationX, maxX);
      translateY.value = clampNumber(savedTranslateY.value + event.translationY, maxY);
    });

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      'worklet';
      savedScale.value = scale.value;
    })
    .onUpdate((event) => {
      'worklet';
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, savedScale.value * event.scale));
      scale.value = next;
      const maxX = ((next - 1) * container.width) / 2;
      const maxY = ((next - 1) * container.height) / 2;
      translateX.value = clampNumber(translateX.value, maxX);
      translateY.value = clampNumber(translateY.value, maxY);
    })
    .onEnd(() => {
      'worklet';
      scheduleOnRN(reportZoomTier, scale.value);
    });

  const panAndPinch = Gesture.Simultaneous(panGesture, pinchGesture);

  const tapActiveGesture = Gesture.Tap()
    .maxDistance(12)
    .onEnd((_event, success) => {
      'worklet';
      if (success) {
        scheduleOnRN(onPressActive);
      }
    });

  const zoomLayerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // Counter-scale: dividing by the ANCESTOR's current scale before it
  // multiplies back in means the net rendered size/offset is constant
  // regardless of zoom — see the file header's "LABEL SCALING" note. This
  // has to be a `useAnimatedStyle` (not a static style) because it reads
  // the live shared value every frame during a pinch, not just at the start
  // and end of a button-driven zoom.
  const labelStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: -LABEL_HALF_WIDTH / scale.value },
      { translateY: -DOT_HALF_HEIGHT / scale.value },
      { scale: 1 / scale.value },
    ],
  }));

  return (
    <View>
      <View style={styles.canvas} onLayout={handleLayout}>
        <GestureDetector gesture={panAndPinch}>
          <Animated.View style={[styles.zoomLayer, zoomLayerStyle]}>
            <Svg
              style={StyleSheet.absoluteFill}
              viewBox={`0 0 ${WORLD_VIEW_BOX.width} ${WORLD_VIEW_BOX.height}`}
              preserveAspectRatio="xMidYMid meet">
              <Defs>
                <RadialGradient id="badawi-active-glow" cx="50%" cy="50%" r="60%">
                  <Stop offset="0" stopColor={colors.accentOnDeep} stopOpacity={0.3} />
                  <Stop offset="1" stopColor={colors.accentOnDeep} stopOpacity={0} />
                </RadialGradient>
              </Defs>

              {/* Dormant world: "in Night, with hairline strokes" (the
                  approved design's own note) — a near-invisible fill, not a
                  translucent wash. Correction pass: the previous 0.16/0.4
                  fill+stroke opacity, spread across nearly the whole map
                  area, visibly lightened the entire canvas relative to the
                  plain Night page background around it — this reads as
                  "dormant" against Night rather than as its own lighter
                  panel. */}
              <Path
                d={WORLD_LAND_PATH}
                fill={colors.ruleOnDeep}
                fillOpacity={0.08}
                stroke={colors.ruleOnDeep}
                strokeWidth={0.7}
                strokeOpacity={0.25}
              />

              {/* Survey rings + glow, centered on the Arabian Peninsula's
                  real centroid. Correction pass: both now taper by zoom
                  tier — full at CONTINENTAL (a restrained "you are here"
                  mark on the whole-world view), reduced at SUB-REGION, and
                  gone at LANDSCAPE, where the previous flat treatment
                  scaled into a large soft spotlight sitting over the
                  geography instead of the geography itself being the
                  focus. */}
              <Circle
                cx={ARABIAN_PENINSULA_CENTROID.x}
                cy={ARABIAN_PENINSULA_CENTROID.y}
                r={38}
                fill="url(#badawi-active-glow)"
                opacity={SURVEY_TREATMENT[zoomTier].glow}
              />
              {[12, 20, 28].map((r) => (
                <Circle
                  key={`ring-${r}`}
                  cx={ARABIAN_PENINSULA_CENTROID.x}
                  cy={ARABIAN_PENINSULA_CENTROID.y}
                  r={r}
                  fill="none"
                  stroke={colors.accentOnDeep}
                  strokeWidth={0.6}
                  strokeDasharray="1.5 3"
                  opacity={SURVEY_TREATMENT[zoomTier].ring}
                />
              ))}

              {/* The one lit territory: its real geographic boundary. */}
              <Path d={ARABIAN_PENINSULA_PATH} fill={colors.accentOnDeep} fillOpacity={0.85} />
              <Path
                d={ARABIAN_PENINSULA_PATH}
                fill="none"
                stroke={colors.background}
                strokeWidth={0.7}
                opacity={0.9}
              />
            </Svg>

            {/* GestureDetector wraps the SAME view that carries the animated
                transform (not a nested child) — a transform on a descendant
                doesn't move its ancestor's hit-test bounds, which would
                leave the tap target visually detached from the marker. */}
            <GestureDetector gesture={tapActiveGesture}>
              <Animated.View
                accessibilityRole="button"
                accessibilityLabel={`${activeName}. Open territory.`}
                style={[
                  styles.activeAnchor,
                  { left: `${AP_FRACTION.x * 100}%`, top: `${AP_FRACTION.y * 100}%` },
                  labelStyle,
                ]}>
                {/* Bug found on re-inspection: this dot previously rendered
                    UNCONDITIONALLY — only the text plate below it was gated
                    on zoom tier. A small, constant-size, warm-colored
                    (`accentOnDeep`) marker that never disappears is exactly
                    what read as a stray "glowing dot" once zoomed to
                    LANDSCAPE, where it was the only labeled element left
                    once the plate itself correctly hid. Both now share one
                    guard — nothing in this view renders at LANDSCAPE. The
                    Animated.View/GestureDetector above stays mounted (so
                    tapping the peninsula still works) but paints nothing. */}
                {zoomTier !== 'LANDSCAPE' && (
                  <>
                    <View style={styles.activeDot} />
                    <View
                      style={[
                        styles.activeLabelPlate,
                        zoomTier === 'SUB-REGION' && styles.activeLabelPlateCompact,
                      ]}>
                      <Text
                        style={[
                          styles.activeLabel,
                          zoomTier === 'SUB-REGION' && styles.activeLabelCompact,
                        ]}>
                        {activeName.toUpperCase()}
                      </Text>
                    </View>
                  </>
                )}
              </Animated.View>
            </GestureDetector>
          </Animated.View>
        </GestureDetector>

        <View style={styles.legend} pointerEvents="none">
          <LegendRow tone="open" label="OPEN" />
          <LegendRow tone="research" label="IN RESEARCH" />
          <LegendRow tone="planned" label="PLANNED" />
          <LegendRow tone="unavailable" label="UNAVAILABLE" />
        </View>

        <View style={styles.controls}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Zoom in"
            hitSlop={CONTROL_HIT_SLOP}
            onPress={() => setScale(scale.value * ZOOM_STEP_MULTIPLIER)}
            style={({ pressed }) => [styles.zoomButton, pressed && pressedSurfaceStyle]}>
            <Text style={styles.zoomButtonLabel}>+</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Zoom out"
            hitSlop={CONTROL_HIT_SLOP}
            onPress={() => setScale(scale.value / ZOOM_STEP_MULTIPLIER)}
            style={({ pressed }) => [styles.zoomButton, pressed && pressedSurfaceStyle]}>
            <Text style={styles.zoomButtonLabel}>−</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Fit to view"
            hitSlop={CONTROL_HIT_SLOP}
            onPress={handleFit}
            style={({ pressed }) => [styles.fitButton, pressed && pressedSurfaceStyle]}>
            <Text style={styles.fitButtonLabel}>FIT</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.statusBar}>
        <Text style={styles.statusLabel}>{zoomTier}</Text>
        <Text style={styles.statusHint}>drag or pinch to explore</Text>
      </View>
    </View>
  );
}

type LegendTone = 'open' | 'research' | 'planned' | 'unavailable';

// Dot markers are decorative graphic accents paired one-to-one with a fully
// legible text label, so their own opacity can carry a graded visual
// intensity without an independent AA contrast requirement — the LABEL text
// stays at full `textOnDeepMuted` opacity regardless of tone (8.41:1
// against Night), so the legend stays readable at every state.
const LEGEND_TONE: Record<LegendTone, { style: StyleProp<ViewStyle>; opacity: number }> = {
  open: { style: { backgroundColor: colors.accentOnDeep }, opacity: 1 },
  research: { style: { borderWidth: 1.2, borderColor: colors.terrainFar }, opacity: 0.9 },
  planned: {
    style: { borderWidth: 1.2, borderStyle: 'dashed', borderColor: colors.ruleOnDeep },
    opacity: 0.6,
  },
  unavailable: { style: { backgroundColor: colors.ruleOnDeep }, opacity: 0.35 },
};

function LegendRow({ tone, label }: { tone: LegendTone; label: string }) {
  const { style, opacity } = LEGEND_TONE[tone];
  return (
    <View style={styles.legendRow}>
      <View style={[styles.legendDot, style, { opacity }]} />
      <Text style={styles.legendLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    width: '100%',
    aspectRatio: WORLD_VIEW_BOX.width / WORLD_VIEW_BOX.height,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.surfaceDeep,
  },
  zoomLayer: {
    ...StyleSheet.absoluteFill,
  },
  activeAnchor: {
    position: 'absolute',
    width: LABEL_HALF_WIDTH * 2,
    alignItems: 'center',
    gap: 4,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.accentOnDeep,
  },
  activeLabelPlate: {
    backgroundColor: colors.surfaceDeep,
    borderRadius: radii.xs,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  // SUB-REGION tier: a visibly smaller plate, not just smaller text — the
  // whole footprint shrinks so it reads as secondary to the geography.
  activeLabelPlateCompact: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  activeLabel: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 7,
    letterSpacing: 0.8,
    color: colors.textOnDeep,
    textAlign: 'center',
  },
  activeLabelCompact: {
    fontSize: 6,
    letterSpacing: 0.4,
  },
  legend: {
    position: 'absolute',
    top: 7,
    left: 8,
    gap: 3,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: radii.pill,
  },
  legendLabel: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 6.5,
    letterSpacing: 0.7,
    color: colors.textOnDeepMuted,
  },
  controls: {
    position: 'absolute',
    top: 7,
    right: 7,
    gap: 4,
  },
  zoomButton: {
    width: CONTROL_SIZE,
    height: CONTROL_SIZE,
    borderRadius: radii.sm,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomButtonLabel: {
    fontFamily: fontFamily.textMedium,
    fontSize: 12,
    color: colors.textPrimary,
  },
  fitButton: {
    width: CONTROL_SIZE,
    height: CONTROL_SIZE,
    borderRadius: radii.sm,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.textOnDeepMuted,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.75,
  },
  fitButtonLabel: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 5.5,
    letterSpacing: 0.3,
    color: colors.textOnDeep,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceDeep,
    borderBottomLeftRadius: radii.xl,
    borderBottomRightRadius: radii.xl,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  statusLabel: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 8,
    letterSpacing: 1,
    color: colors.textOnDeepMuted,
  },
  statusHint: {
    fontFamily: fontFamily.textRegular,
    fontSize: 8,
    color: colors.textOnDeepMuted,
    opacity: 0.7,
  },
});
