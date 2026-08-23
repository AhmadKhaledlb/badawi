import { Image } from 'react-native';

// The approved Phase 5A raster mark — see the file header below for why
// there are only two files and no arbitrary-colour variant.
const MARK_SOURCE = {
  // Dark (Ink-ring/terrain, Clay sun) artwork — put this on a LIGHT surface
  // (background, surfaceWarm). Despite the filename, "dark" describes the
  // artwork's own ink colour, not a "dark mode" target — see the brand-asset
  // mapping note in the Phase 5A brand-wiring completion report.
  light: require('../../../assets/brand/v2/badawi-mark-dark.png'),
  // Light (Bone-ring/terrain, Clay sun) artwork — put this on the deep/Night
  // surface (`colors.surfaceDeep`).
  deep: require('../../../assets/brand/v2/badawi-mark-light.png'),
} as const;

type MarkSurface = keyof typeof MARK_SOURCE;

type BadawiMarkProps = {
  /** Rendered edge length in dp. The mark is always square. */
  size?: number;
  /**
   * Which surface the mark sits on — selects the correctly-coloured approved
   * asset. `light` (default) = Ink mark for background/surfaceWarm/Ecru
   * grounds. `deep` = Bone mark for `colors.surfaceDeep` (Night) grounds.
   */
  surface?: MarkSurface;
  /** Screen-reader label. Omit for purely decorative placements. */
  label?: string;
};

// ── BADAWI PRIMARY MARK — Phase 5A "1A" circular mark ────────────────────
//
// Retires the procedural Waypoint SVG mark. This now renders one of the two
// approved raster assets in `assets/brand/v2/` — the mark's colour and
// geometry are fixed by the approved artwork and are NOT parameterised here
// (no arbitrary `color`/`accentColor`/`variant` props: there is nothing to
// recolour, and the approved art must not be altered).
//
// SIZES — the source art is 1254×1254; it downsamples cleanly to any size
// used in the app today (26px inline icon up to 120px watermark).
//
// KNOWN LIMITATION: both files bake in a Clay-coloured sun disc. Clay on
// Night (`surface="deep"`) measures 2.31:1 — below the 3:1 WCAG 1.4.11
// non-text-graphic threshold the previous mono Waypoint variant was written
// to avoid (see src/design/brand/mark-geometry.ts's contrast note, still
// accurate for the palette). Brand marks/logos are commonly exempted from
// this criterion, and the sun is a small decorative element within an
// otherwise high-contrast mark, so this is used as-is rather than invented
// around — flagged here for whoever can request a mono deep-ground export.
export function BadawiMark({ size = 48, surface = 'light', label }: BadawiMarkProps) {
  return (
    <Image
      source={MARK_SOURCE[surface]}
      style={{ width: size, height: size }}
      resizeMode="contain"
      accessibilityRole={label ? 'image' : undefined}
      accessibilityLabel={label}
      accessibilityElementsHidden={!label}
      importantForAccessibility={label ? 'yes' : 'no-hide-descendants'}
    />
  );
}
