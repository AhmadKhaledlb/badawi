import Svg, { Circle, ClipPath, Defs, G, Line, Path } from 'react-native-svg';

import { colors } from '@/design/tokens';

import {
  bezel,
  farRidgePath,
  farRidgeStrokeWidth,
  horizon,
  MARK_VIEWBOX,
  MARK_VIEWBOX_SIZE,
  nearDunePath,
  starPath,
  terrainClip,
} from './mark-geometry';

type BadawiMarkProps = {
  /** Rendered edge length in dp. The mark is always square. */
  size?: number;
  /**
   * `duotone` (default) renders the orientation star in the accent role and
   * everything else in `color` — the primary brand expression.
   * `mono` renders every element in `color`. Required wherever the mark must
   * be single-colour: small sizes, stamped/embossed use, monochrome print, the
   * Android monochrome adaptive icon, and any context where the accent's
   * contrast against the background is not verified.
   */
  variant?: 'duotone' | 'mono';
  /** Ink colour for ring, terrain and line-work. */
  color?: string;
  /** Star colour in `duotone`. Ignored in `mono`. */
  accentColor?: string;
  /**
   * Drops the horizon rule and the far ridge. USE THIS AT ≤24px —
   * below that size the fine line-work turns to mud. See COMPACT_OMITS in
   * ./mark-geometry.ts.
   */
  compact?: boolean;
  /** Screen-reader label. Omit for purely decorative placements. */
  label?: string;
};

// ── BADAWI PRIMARY MARK ──────────────────────────────────────────────────
//
// Concept, element meanings, and cultural-governance rationale all live in
// ./mark-geometry.ts, which owns the geometry this component draws.
//
// ── USAGE RULES ──────────────────────────────────────────────────────────
//
// SIZES
//   ≥ 40px  full mark (`compact` off) — Welcome, Profile, brand lockups
//   ≤ 24px  `compact` — favicon, tab icons, inline watermark, list adornment
//   never below 16px: the ring stroke stops resolving
//
// COLOUR PAIRINGS (all measured — see src/design/tokens/colors.ts)
//   On Light Neutral #F7F8F0  →  color = textPrimary (Brown, 10.43:1)
//                                accent = accent (Terracotta, 4.39:1 — a
//                                graphic element, well above the 3:1
//                                WCAG 1.4.11 non-text minimum)
//   On Indigo #353C56         →  color = textOnDeep (Light Neutral, 10.17:1)
//                                or textOnDeepMuted (Ecru, 8.41:1)
//                                accent = accent (Terracotta on Indigo is
//                                only 2.31:1 — DO NOT use duotone on Indigo;
//                                use `mono` there instead)
//   On Ecru #EAE2CD           →  color = textPrimary (Brown, 8.63:1)
//
// SINGLE-COLOUR / LIGHT-BACKGROUND GUIDANCE
//   Use `variant="mono"` with `color={colors.textPrimary}`. The mark is
//   designed to hold up with no colour differentiation at all — the star
//   remains legible because it is separated from the terrain by the horizon
//   band, not by hue.
//
// DON'T
//   • don't recolour individual elements beyond the two props here
//   • don't rotate, skew, or outline it
//   • don't place it on a busy illustrated area without a clear ground
//   • don't pair `duotone` with Indigo (see above)
export function BadawiMark({
  size = 48,
  variant = 'duotone',
  color = colors.textPrimary,
  accentColor = colors.accent,
  compact = false,
  label,
}: BadawiMarkProps) {
  const starColor = variant === 'duotone' ? accentColor : color;
  const clipId = 'badawi-mark-terrain-clip';

  return (
    <Svg
      width={size}
      height={size}
      viewBox={MARK_VIEWBOX}
      accessibilityRole={label ? 'image' : 'none'}
      accessibilityLabel={label}
      accessibilityElementsHidden={!label}
      importantForAccessibility={label ? 'yes' : 'no-hide-descendants'}>
      <Defs>
        <ClipPath id={clipId}>
          <Circle cx={terrainClip.cx} cy={terrainClip.cy} r={terrainClip.r} />
        </ClipPath>
      </Defs>

      {/* The instrument ring — the field of view. */}
      <Circle
        cx={bezel.cx}
        cy={bezel.cy}
        r={bezel.r}
        stroke={color}
        strokeWidth={bezel.strokeWidth}
        fill="none"
      />

      {/* Terrain, always clipped to the ring's inner edge so it reads as
          continuing beyond what can be observed. */}
      <G clipPath={`url(#${clipId})`}>
        {!compact && (
          <>
            <Line
              x1={horizon.x1}
              y1={horizon.y}
              x2={horizon.x2}
              y2={horizon.y}
              stroke={color}
              strokeWidth={horizon.strokeWidth}
              opacity={0.55}
            />
            <Path
              d={farRidgePath}
              stroke={color}
              strokeWidth={farRidgeStrokeWidth}
              fill="none"
              opacity={0.55}
            />
          </>
        )}
        <Path d={nearDunePath} fill={color} />
      </G>

      {/* The fix you navigate by. */}
      <Path d={starPath} fill={starColor} />
    </Svg>
  );
}

export { MARK_VIEWBOX_SIZE };
