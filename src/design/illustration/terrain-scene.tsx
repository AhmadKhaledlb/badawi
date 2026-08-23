import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';

import { colors, lineOpacity, radii } from '@/design/tokens';

import { CornerMarks } from './notebook';

import {
  CONTOUR_PATHS,
  fixStarPath,
  SCENE_HEIGHT,
  SCENE_VIEWBOX,
  STAR_FIELD,
  STRATA_PATHS,
} from './terrain-geometry';

/**
 * The four authored atmospheres. Each is a fixed assignment of locked palette
 * roles to scene layers — NOT a new colour. Gradient stops interpolate
 * *between* two locked palette hexes; no palette value is altered, exactly as
 * an `opacity` blend does not alter one. (src/design/tokens/colors.ts.)
 *
 *  night   deep sky, star field, plotted fix. The Welcome identity moment.
 *  dawn    sky warming toward the horizon, low sun. Region/environment heroes.
 *  day     bright, high sun, mid-tone terrain. Pack/Unit headers.
 *  survey  near-flat, low-contrast terrain used purely as a ground for
 *          map line-work — deliberately recessive so nodes and routes read.
 */
export type Atmosphere = 'night' | 'dawn' | 'day' | 'survey';

type AtmosphereSpec = {
  skyTop: string;
  skyBottom: string;
  /** Fills for the four strata, far → near. */
  strata: readonly [string, string, string, string];
  strataOpacity: readonly [number, number, number, number];
  stars: boolean;
  /** Sun/moon disc: null to omit. */
  disc: { cx: number; cy: number; r: number; color: string; opacity: number } | null;
  /** The four-point plotted fix, for `night` only. */
  fix: { cx: number; cy: number; r: number } | null;
  contourColor: string;
  contourOpacity: number;
};

const ATMOSPHERES: Record<Atmosphere, AtmosphereSpec> = {
  night: {
    skyTop: colors.surfaceDeep,
    skyBottom: colors.terrainFar,
    // Strata 2 and 3 use DIFFERENT roles (Brown, then Indigo) rather than
    // Indigo twice. Rendered out, two Indigo layers merged into a single flat
    // slab and the foreground stopped reading as terrain at all — which
    // matters most in the short station windows, where only the lower third
    // of the scene is visible.
    strata: [colors.terrainFar, colors.terrainMid, colors.terrainGround, colors.surfaceDeep],
    strataOpacity: [0.45, 0.7, 0.85, 1],
    stars: true,
    disc: { cx: 306, cy: 126, r: 21, color: colors.surfaceWarm, opacity: 0.9 },
    fix: { cx: 96, cy: 58, r: 7 },
    contourColor: colors.ruleOnDeep,
    contourOpacity: 0.22,
  },
  // Pre-dawn indigo overhead warming to an Ecru glow at the horizon, with the
  // foreground carried by the warm end of the palette. An earlier revision put
  // Sage Green at the top of this sky; rendered out, it read as a green
  // pasture rather than a desert dawn.
  dawn: {
    skyTop: colors.surfaceDeep,
    skyBottom: colors.surfaceWarm,
    strata: [colors.surfaceWarm, colors.terrainFar, colors.terrainMid, colors.terrainGround],
    strataOpacity: [0.9, 0.8, 0.92, 1],
    stars: false,
    disc: { cx: 292, cy: 140, r: 26, color: colors.accent, opacity: 0.85 },
    fix: null,
    contourColor: colors.ruleOnDeep,
    contourOpacity: 0.24,
  },
  // Bright overhead cooling into warm haze at the horizon — the inverse of a
  // temperate sky, which is what makes it read as desert daylight.
  day: {
    skyTop: colors.background,
    skyBottom: colors.surfaceWarm,
    strata: [colors.terrainFar, colors.terrainFar, colors.terrainMid, colors.terrainGround],
    // Held down deliberately: at full strength the Brown foreground read as a
    // dark bar across the bottom of the frame rather than as shadowed ground.
    strataOpacity: [0.3, 0.5, 0.7, 0.82],
    stars: false,
    disc: { cx: 356, cy: 44, r: 14, color: colors.accent, opacity: 0.55 },
    fix: null,
    contourColor: colors.ruleOnDeep,
    contourOpacity: 0.28,
  },
  // `survey` is the SCREEN BACKDROP atmosphere (src/components/screen.tsx).
  // Its strata opacities are held deliberately low and it carries no sun
  // disc, because screen headings sit directly over it with no intervening
  // plate. Worst-case measured pairing at these values is Brown on the
  // densest stratum blended over Ecru ≈ 5.4:1 — clear of the 4.5:1 AA
  // threshold for normal text. Raising these opacities would break that;
  // put richer atmospheres inside a bounded `TerrainWindow` instead.
  survey: {
    skyTop: colors.background,
    skyBottom: colors.surfaceWarm,
    strata: [colors.terrainFar, colors.terrainFar, colors.terrainMid, colors.terrainMid],
    strataOpacity: [0.12, 0.2, 0.28, 0.36],
    stars: false,
    disc: null,
    fix: null,
    contourColor: colors.rule,
    contourOpacity: 0.2,
  },
};

type TerrainSceneProps = {
  atmosphere?: Atmosphere;
  /** Rendered height in dp. Width always fills the parent. */
  height?: number;
  /**
   * Fades the scene's bottom edge into the app background so a hero can end
   * without a hard seam. Off for scenes that sit inside a rounded window.
   */
  fadeToBackground?: boolean;
  style?: object;
};

// ── THE TERRAIN LAYER ────────────────────────────────────────────────────
//
// One half of BADAWI's visual language: an atmospheric, illustrated world.
// (The other half is the "notebook" line-work — see ./notebook.tsx.)
// Every illustrated surface in the app is this component plus notebook
// line-work plus content plates, which is what keeps twelve screens looking
// like one product.
//
// Purely decorative and fully removed from the accessibility tree: it carries
// no information a learner needs, so a screen reader must not narrate it.
//
// Not used in Field Mode — that screen is deliberately stripped of terrain,
// texture, and motion (docs/design/README.md, "Field Mode").
export function TerrainScene({
  atmosphere = 'day',
  height = SCENE_HEIGHT,
  fadeToBackground = false,
  style,
}: TerrainSceneProps) {
  const spec = ATMOSPHERES[atmosphere];
  const skyId = `badawi-sky-${atmosphere}`;
  const fadeId = `badawi-fade-${atmosphere}`;

  return (
    <View
      style={[styles.container, { height }, style]}
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      <Svg
        width="100%"
        height={height}
        viewBox={SCENE_VIEWBOX}
        // Fill the width and crop the sides rather than distorting authored
        // curves — the key to this art holding up from 320pt to 1440pt.
        preserveAspectRatio="xMidYMax slice">
        <Defs>
          <LinearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={spec.skyTop} stopOpacity={1} />
            <Stop offset="1" stopColor={spec.skyBottom} stopOpacity={1} />
          </LinearGradient>
          <LinearGradient id={fadeId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.background} stopOpacity={0} />
            <Stop offset="1" stopColor={colors.background} stopOpacity={1} />
          </LinearGradient>
        </Defs>

        {/* Sky */}
        <Rect x={0} y={0} width="100%" height={SCENE_HEIGHT} fill={`url(#${skyId})`} />

        {/* Star field — fixed positions, never randomised (see ./terrain-geometry.ts) */}
        {spec.stars &&
          STAR_FIELD.map((star, index) => (
            <Circle
              key={`star-${index}`}
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill={colors.textOnDeep}
              opacity={0.45 + star.r * 0.22}
            />
          ))}

        {/* Sun / moon */}
        {spec.disc && (
          <Circle
            cx={spec.disc.cx}
            cy={spec.disc.cy}
            r={spec.disc.r}
            fill={spec.disc.color}
            opacity={spec.disc.opacity}
          />
        )}

        {/* The plotted fix — the brand mark's star, recurring in the world */}
        {spec.fix && (
          <Path
            d={fixStarPath(spec.fix.cx, spec.fix.cy, spec.fix.r)}
            fill={colors.accent}
            opacity={0.9}
          />
        )}

        {/* Terrain strata, far → near */}
        {STRATA_PATHS.map((path, index) => (
          <Path
            key={`stratum-${index}`}
            d={path}
            fill={spec.strata[index]}
            opacity={spec.strataOpacity[index]}
          />
        ))}

        {/* Notebook contour hairlines laid over the painted terrain */}
        <G opacity={spec.contourOpacity}>
          {CONTOUR_PATHS.map((path, index) => (
            <Path
              key={`contour-${index}`}
              d={path}
              stroke={spec.contourColor}
              strokeWidth={index === 0 ? 1 : 1.4}
              fill="none"
            />
          ))}
        </G>

        {fadeToBackground && (
          <Rect
            x={0}
            y={SCENE_HEIGHT * 0.66}
            width="100%"
            height={SCENE_HEIGHT * 0.34}
            fill={`url(#${fadeId})`}
          />
        )}
      </Svg>
    </View>
  );
}

type TerrainWindowProps = {
  atmosphere?: Atmosphere;
  height?: number;
  radius?: number;
  /** Content laid over the scene — a title, a lockup, a route overlay. */
  children?: ReactNode;
  /** Surveyor registration brackets on the window's corners. */
  cornerMarks?: boolean;
  style?: object;
};

// ── THE TERRAIN WINDOW ───────────────────────────────────────────────────
//
// A BOUNDED scene: a rounded, clipped opening onto terrain, with optional
// registration brackets. This is where the rich atmospheres (`night`,
// `dawn`, `day`) belong.
//
// The distinction from the screen backdrop matters for accessibility, not
// just composition: inside a window the author controls exactly where text
// sits and which ground it sits on, so a deep Indigo sky with `textOnDeep`
// (10.17:1) is safe here. The unbounded screen backdrop cannot make that
// guarantee, which is why it is restricted to the recessive `survey`
// atmosphere.
export function TerrainWindow({
  atmosphere = 'dawn',
  height = 220,
  radius = radii.xl,
  children,
  cornerMarks = true,
  style,
}: TerrainWindowProps) {
  return (
    <View style={[styles.window, { height, borderRadius: radius }, style]}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <TerrainScene atmosphere={atmosphere} height={height} />
      </View>
      {cornerMarks && (
        <CornerMarks
          ground={atmosphere === 'night' || atmosphere === 'dawn' ? 'onDeep' : 'light'}
          inset={12}
          arm={14}
        />
      )}
      {children}
    </View>
  );
}

export const terrainLineOpacity = lineOpacity;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  window: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'flex-end',
    backgroundColor: colors.surfaceWarm,
  },
});
