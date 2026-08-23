import type { ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

import {
  ARABIAN_PENINSULA_PATH,
  WORLD_LAND_PATH,
} from '@/design/illustration/world-geography';
import { colors, fontFamily, palette, pressScale } from '@/design/tokens';

// ─────────────────────────────────────────────────────────────────────────
// THE REGION MAP — Arabian Peninsula, arriving from the world
// ─────────────────────────────────────────────────────────────────────────
//
// Phase 5A, reproducing the approved BADAWI App v2 Claude Design screen 3c.
// Reuses the exact same locally-bundled Natural Earth path data Explore's
// WorldCanvas draws from (src/design/illustration/world-geography.ts) — no
// second geography dataset, no invented regional outline.
//
// ── EDITORIAL CARTOGRAPHY REWRITE ─────────────────────────────────────────
// Earlier passes treated the four secondary environments as small dashed
// "GIS" rings with displaced text connected by leader lines — technically
// correct but read as debugging markers, not an illustrated environmental
// map. Rebuilt around a simplified reference composition instead: every
// environment is a small line-art pictogram with its name directly below
// it, sitting on the land, no rings/leader lines except Desert's. Rings and
// dashed circles are gone entirely; every marker (including Desert) is now
// a single RN view (icon + label) positioned by percentage, so there's only
// ever one coordinate system to keep in sync, not an SVG ring plus a
// separately-positioned RN label.
//
// ── CROP: TIGHT, NOT TALL ─────────────────────────────────────────────────
// The previous pass solved the Mountain/Coast/Oasis crowding problem by
// making the crop much taller (60→110) — that fit the labels but left the
// peninsula visibly small inside a mostly-empty tall frame, which is
// exactly backwards from "the peninsula dominates the panel." Corrected
// direction: crop TIGHT against the real bounding box (src/design/
// illustration/world-geography.ts's own measured x:453.1–506.3, y:208.3–
// 251.8 — margins here are only ~4pt horizontally, ~17pt vertically), so
// the peninsula fills nearly the full frame width. The label-crowding
// problem is solved by SIZE and DIRECTION of each offset instead of by
// adding empty geographic canvas — every offset below was re-solved by
// exhaustive search (every marker order tried) against this tighter crop,
// each required to land on the real peninsula polygon, stay within the
// rendered map, and keep a real gap from every other label and from
// Desert's own footprint. The map is still taller than it is wide (labels
// need some vertical room to fan out), just not excessively so.
//
// ── THE COLOR INVERSION (matches 3c's own note) ───────────────────────────
// Sea in Night, land in Bone — the visual cue that you've moved from
// surveying the world (Explore) to standing inside the one open territory.
const CROP = { x: 449, y: 191, width: 62, height: 78 };

export type RegionMarkerStatus = 'open' | 'in-research';

export type RegionMarker = {
  key: string;
  name: string;
  x: number;
  y: number;
  status: RegionMarkerStatus;
};

// Desert's rendered position is nudged a few points from its real
// coordinate so the dominant active marker reads as visually central —
// "acceptable to adjust the PRESENTATION position... does not imply an
// exact GPS point." The underlying data point passed in from the screen is
// untouched; this is render-time-only, local to this component.
//
// Final placement pass: moved per a newly annotated reference screenshot
// (left, further up from the previous pass) — magnitude taken from the
// annotation, not re-derived. Desert moving up converges toward Coast's
// fixed position; see the tiny Coast correction below rather than pulling
// Desert back.
const DESERT_PRESENTATION_OFFSET = { x: -1.8, y: -2.6 };

// Real-pixel {x, y} offset of each secondary marker's block (icon+label,
// centered horizontally, extending downward) from its real coordinate.
//
// Final placement pass, directed by a newly annotated reference screenshot
// with explicit arrows — this pass REVERSES two previous directions on
// explicit instruction ("supersedes previous placement"): Wadi now moves
// DOWN and slightly left (was pushed up near the map's internal boundary);
// Oasis now moves RIGHT and DOWN (was pushed left, toward the coast/edge).
// Mountain moves further left and up (off the eastern edge, text was
// reading as over the ocean).
//
// Coast's offset changed by 4pt (y: -26 → -30) — the one exception to
// "Coast stays unchanged," made because Desert's larger upward move would
// otherwise genuinely overlap it; this is the smallest correction that
// clears it (verified: 0pt gap at -29, first clean gap at -30).
//
// Mountain and Oasis are genuinely close in real geography (Al Ain sits at
// the foot of the Hajar range), so "Mountain up + Oasis down" toward each
// other cannot both reach their originally-requested magnitude without
// colliding — resolved as the smallest local correction available:
// Mountain's leftward move is full, but its upward move is more modest
// (50→42, not all the way to the first attempt's 25) so Oasis can still
// reach a real rightward+downward position without overlapping it. No
// solver ran to pick a different composition — this was a direct,
// by-hand adjustment of the two conflicting magnitudes, confirmed
// afterward to have zero overlap (smallest gap 2.0pt, Mountain–Oasis).
//
// Follow-up correction ("2 mouse trackers up-left" for Oasis, "1 mouse
// tracker up-left" for Wadi, applied directly at ~24 real px/unit): Wadi
// moves the full requested amount. Oasis's full requested amount (a
// further -48,-48 from its prior {26,26}) lands its label off the real
// peninsula polygon, into the sea — so it's capped at ~90% of the
// requested magnitude, the largest fraction of the same up-left direction
// that still centers on real land. Re-verified against Mountain, Coast,
// and Desert (all unchanged): zero overlaps, smallest gap 1.1pt
// (Desert–Coast, pre-existing from the prior pass).
//
// Final small-nudge pass ("smidge down" for Oasis, "click to the bottom
// right" for Wadi — the smallest informal units used yet, taken as ~6 and
// ~8 real px respectively): Oasis moves down only, Wadi moves down+right.
// Re-verified: both remain on real land, within map bounds, zero overlaps
// (smallest gap unchanged at 1.1pt, Desert–Coast).
//
// One more smidge down (~6 real px) for both Wadi and Oasis. Re-verified:
// still on land, within bounds, zero overlaps.
//
// Yet another smidge down (~6 real px) for both. Re-verified: still on
// land, within bounds, zero overlaps — Mountain–Oasis gap is narrowing
// (11.6pt → 5.6pt) as Oasis continues downward toward it; still clear, but
// flagging that this pairing has the least remaining room of the five.
const SECONDARY_OFFSET: Record<string, { x: number; y: number }> = {
  wadi: { x: -26, y: -19 },
  coast: { x: -42, y: -30 },
  mountain: { x: -45, y: 42 },
  oasis: { x: -17, y: 1 },
};

// ── PICTOGRAMS ─────────────────────────────────────────────────────────────
// Simple thin-line SVG marks in the app's existing notebook/survey visual
// language (matching the stroke weights src/design/illustration/notebook.tsx
// already uses) — no new dependency, no new asset, no emoji, no generic
// system icon. Locked palette colors only. Sized up from the previous pass
// (width/height only — the `viewBox`/path coordinates are unchanged, so the
// whole mark, strokes included, scales up uniformly) so they read as part
// of the illustration rather than small metadata glyphs.
function DuneIcon() {
  return (
    <Svg width={30} height={20} viewBox="0 0 22 15">
      <Path
        d="M1 13 Q6 3 11 13 Q16 3 21 13"
        stroke={palette.clay}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function WadiIcon() {
  return (
    <Svg width={30} height={22} viewBox="0 0 22 16">
      <Path
        d="M1 12 Q6 6 11 12 T21 12"
        stroke={palette.deepSage}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
      <Circle cx={6.5} cy={4} r={1.1} fill={palette.sage} opacity={0.85} />
      <Circle cx={11.5} cy={2.5} r={1.1} fill={palette.sage} opacity={0.85} />
      <Circle cx={16.5} cy={4} r={1.1} fill={palette.sage} opacity={0.85} />
    </Svg>
  );
}

function CoastIcon() {
  return (
    <Svg width={30} height={19} viewBox="0 0 22 14">
      <Path
        d="M1 5 Q4 2 7 5 T13 5 T19 5"
        stroke={colors.textSecondary}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M1 10 Q4 7 7 10 T13 10 T19 10"
        stroke={colors.textSecondary}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
        opacity={0.55}
      />
    </Svg>
  );
}

function OasisIcon() {
  return (
    <Svg width={27} height={27} viewBox="0 0 20 20">
      <Path d="M10 5 L10 13" stroke={palette.deepSage} strokeWidth={1.4} strokeLinecap="round" />
      <Path
        d="M10 5 Q4 6 3 12"
        stroke={palette.deepSage}
        strokeWidth={1.4}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M10 5 Q16 6 17 12"
        stroke={palette.deepSage}
        strokeWidth={1.4}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M10 5 Q6.5 3.5 4.5 5.5"
        stroke={palette.sage}
        strokeWidth={1.2}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M10 5 Q13.5 3.5 15.5 5.5"
        stroke={palette.sage}
        strokeWidth={1.2}
        strokeLinecap="round"
        fill="none"
      />
      <Ellipse
        cx={10}
        cy={15.5}
        rx={6.5}
        ry={1.8}
        stroke={palette.paleSage}
        strokeWidth={1.2}
        fill="none"
      />
    </Svg>
  );
}

function MountainIcon() {
  return (
    <Svg width={30} height={22} viewBox="0 0 22 16">
      <Path
        d="M1 14 L7 4 L11 10 L15 2 L21 14"
        stroke={palette.ink}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

const SECONDARY_ICON: Record<string, () => ReactElement> = {
  wadi: WadiIcon,
  coast: CoastIcon,
  mountain: MountainIcon,
  oasis: OasisIcon,
};

type RegionMapProps = {
  markers: RegionMarker[];
  onPressOpenMarker: (key: string) => void;
};

export function RegionMap({ markers, onPressOpenMarker }: RegionMapProps) {
  const openMarker = markers.find((m) => m.status === 'open');
  const secondaryMarkers = markers.filter((m) => m.status !== 'open');

  return (
    <View style={styles.canvas}>
      <Svg
        style={StyleSheet.absoluteFill}
        viewBox={`${CROP.x} ${CROP.y} ${CROP.width} ${CROP.height}`}
        preserveAspectRatio="xMidYMid meet">
        <Rect
          x={CROP.x}
          y={CROP.y}
          width={CROP.width}
          height={CROP.height}
          fill={colors.surfaceDeep}
        />

        {/* Neighboring coastline, where the crop still reaches it —
            deliberately faint: context, never competing with the
            peninsula. */}
        <Path
          d={WORLD_LAND_PATH}
          fill={colors.ruleOnDeep}
          fillOpacity={0.06}
          stroke={colors.ruleOnDeep}
          strokeWidth={0.25}
          strokeOpacity={0.15}
        />

        {/* The peninsula itself: land in Bone, arriving from Night — the
            dominant shape in the frame. Markers are no longer drawn here —
            every one (including Desert) is a single RN overlay view below,
            so there is only one coordinate system to keep in sync. */}
        <Path
          d={ARABIAN_PENINSULA_PATH}
          fill={colors.surfaceWarm}
          stroke={colors.rule}
          strokeWidth={0.3}
          strokeOpacity={0.4}
        />
      </Svg>

      {secondaryMarkers.map((marker) => {
        const leftPercent = ((marker.x - CROP.x) / CROP.width) * 100;
        const topPercent = ((marker.y - CROP.y) / CROP.height) * 100;
        const offset = SECONDARY_OFFSET[marker.key] ?? { x: 0, y: 0 };
        const Icon = SECONDARY_ICON[marker.key];
        return (
          <View
            key={marker.key}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={[
              styles.secondaryBlock,
              { left: `${leftPercent}%`, top: `${topPercent}%` },
              { transform: [{ translateX: offset.x - 30 }, { translateY: offset.y }] },
            ]}>
            {Icon && <Icon />}
            <Text style={styles.secondaryLabel}>{marker.name.toUpperCase()}</Text>
          </View>
        );
      })}

      {openMarker && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${openMarker.name}. Open territory.`}
          hitSlop={8}
          onPress={() => onPressOpenMarker(openMarker.key)}
          style={({ pressed }) => [
            styles.openMarker,
            {
              left: `${((openMarker.x + DESERT_PRESENTATION_OFFSET.x - CROP.x) / CROP.width) * 100}%`,
              top: `${((openMarker.y + DESERT_PRESENTATION_OFFSET.y - CROP.y) / CROP.height) * 100}%`,
            },
            // Centering translate and press scale MUST live in the same
            // `transform` array. RN style-array flattening replaces the
            // whole `transform` value per key rather than merging entries
            // across objects — the previous version applied the shared
            // `pressedSurfaceStyle` (a bare `{ scale }` transform) as a
            // separate array element on press, which silently discarded
            // this marker's own centering translateX/translateY for the
            // duration of the press. The marker rendered from its
            // untranslated top-left anchor instead of its centered
            // position, producing a visible jump on press-in and a second
            // jump back on release — read as "shifts vertically/up-down
            // before navigation." Composing both transforms into one array
            // keeps the marker geographically anchored at every instant;
            // only `scale` ever changes.
            {
              transform: [
                { translateX: -OPEN_MARKER_SIZE / 2 },
                { translateY: -OPEN_MARKER_SIZE / 2 },
                { scale: pressed ? pressScale : 1 },
              ],
            },
          ]}>
          <DuneIcon />
          <Text style={styles.openMarkerLabel}>{openMarker.name.toUpperCase()}</Text>
        </Pressable>
      )}
    </View>
  );
}

// Diameter reduced from 76 → 60 (the tighter crop makes the whole map more
// compact, so the same visual weight now needs fewer raw points), but the
// ring itself is thinner — 1.4 → 1.1 — a refined line, not a UI-button
// border, matching "noticeably thinner than the current ring."
const OPEN_MARKER_SIZE = 60;

const styles = StyleSheet.create({
  canvas: {
    width: '100%',
    aspectRatio: CROP.width / CROP.height,
    position: 'relative',
    overflow: 'hidden',
  },
  openMarker: {
    position: 'absolute',
    width: OPEN_MARKER_SIZE,
    height: OPEN_MARKER_SIZE,
    borderRadius: OPEN_MARKER_SIZE / 2,
    borderWidth: 1.1,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    // Centering translate lives with the press-scale transform in the
    // Pressable's inline style below — see the comment there for why they
    // must share one `transform` array rather than being split across
    // style-array entries.
  },
  openMarkerLabel: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 10,
    letterSpacing: 0.6,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  // Block/label sizes raised from the previous pass (50→60 width, 8.5→10
  // font) — per "they should not feel like metadata, they are part of the
  // illustration."
  secondaryBlock: {
    position: 'absolute',
    width: 60,
    alignItems: 'center',
    gap: 4,
  },
  secondaryLabel: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 10,
    letterSpacing: 0.4,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
