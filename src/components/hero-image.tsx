import { useState, type PropsWithChildren } from 'react';
import { Image, StyleSheet, View, type ImageSourcePropType, type LayoutChangeEvent } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { colors, radii } from '@/design/tokens';

type HeroImageProps = PropsWithChildren<{
  source: ImageSourcePropType;
  /** The frame's own height. The image is NOT forced to fill this exactly — see below. */
  height?: number;
  /**
   * The source image's own width:height ratio (e.g. `1536 / 1024` for a
   * 3:2 landscape). Required so the image can be sized from its OWN
   * proportions rather than stretched/zoomed to match the frame's.
   */
  aspectRatio: number;
  /** Drop the bottom scrim for images with no overlaid text/tags. */
  scrim?: boolean;
  /**
   * Where the visible crop window sits within the source image's own
   * height, when the frame is shorter than the image's natural height at
   * this width (0 = crop window starts at the image's top edge, showing
   * more of the top/sky and less of the bottom; 0.5 = centered crop, the
   * default and Home's own behavior; 1 = crop window ends at the bottom
   * edge). This is a pure translation of the ALREADY-correctly-sized
   * image — it never changes `naturalHeight`/the effective zoom, so it
   * carries none of the risk the removed `focalBottomBias` prop had (that
   * one enlarged the image before cropping, which is what caused the zoom
   * regression it was reverted for).
   */
  focalY?: number;
}>;

// ── HERO IMAGE FRAME ─────────────────────────────────────────────────────
//
// Phase 5A: the rounded-corner environment-photo treatment used at the top
// of Home/Region/Pack/Challenge Hub in the approved design.
//
// SIZING STRATEGY (natural-fit, not `cover`/`contain`): the image is sized
// from the frame's OWN measured width and the source's real aspect ratio —
// `naturalHeight = measuredWidth / aspectRatio` — then centred vertically
// in the frame. That means:
//   • the image is never enlarged beyond what's needed to fill the frame's
//     width (no artificial zoom);
//   • if `naturalHeight` is taller than the frame, the excess is cropped
//     symmetrically top/bottom (normal, non-zoomed cropping, proportional
//     to however far the frame's chosen `height` sits from the source's
//     own aspect ratio — the caller controls how much by choosing `height`
//     close to `measuredWidth / aspectRatio` for ~zero crop, per the
//     completion report's worked numbers);
//   • if `naturalHeight` is shorter, the frame's own background
//     (`colors.surfaceWarm`) shows as a small symmetric margin rather than
//     a jarring gap.
//
// This replaced two earlier, less predictable attempts: a plain
// `resizeMode="cover"` (crops however much the frame/source aspect
// mismatch happens to demand, with no control), and a `focalBottomBias`
// enlarge-then-clip mechanism (which made the effective zoom worse, not
// better). Measuring the frame and sizing from the real aspect ratio is
// deterministic and inspectable instead.
//
// `children` fills the WHOLE frame (not just a bottom-anchored slot) — the
// approved design consistently overlays both a top badge row AND
// bottom-anchored title/CTA content on the same hero.
//
// Built on `react-native-svg` (already a dependency, used throughout
// src/design/illustration/) rather than adding `expo-linear-gradient`, so
// this introduces no new dependency.
export function HeroImage({
  source,
  height = 240,
  aspectRatio,
  scrim = true,
  focalY = 0.5,
  children,
}: HeroImageProps) {
  const [frameWidth, setFrameWidth] = useState(0);

  function handleLayout(event: LayoutChangeEvent) {
    setFrameWidth(event.nativeEvent.layout.width);
  }

  const naturalHeight = frameWidth > 0 ? frameWidth / aspectRatio : height;
  // `focalY` only has room to move the crop window when the image actually
  // overflows the frame (naturalHeight > height). When it doesn't (a
  // shorter image, letterboxed against the frame's own background), the
  // symmetric centering documented above is unaffected by `focalY` — at
  // `focalY = 0.5` this reduces to exactly the previous formula in both
  // branches, so the default behavior (Home's own usage) is unchanged.
  const clampedFocalY = Math.min(Math.max(focalY, 0), 1);
  const verticalOffset =
    naturalHeight >= height
      ? -(naturalHeight - height) * clampedFocalY
      : (height - naturalHeight) / 2;

  return (
    <View style={[styles.frame, { height }]} onLayout={handleLayout}>
      {frameWidth > 0 && (
        <Image
          source={source}
          resizeMode="cover"
          style={{
            position: 'absolute',
            left: 0,
            width: frameWidth,
            top: verticalOffset,
            height: naturalHeight,
          }}
        />
      )}
      {scrim && (
        <Svg width="100%" height="100%" style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id="heroScrim" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#000000" stopOpacity={0} />
              <Stop offset="0.55" stopColor="#000000" stopOpacity={0} />
              <Stop offset="1" stopColor="#000000" stopOpacity={0.4} />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#heroScrim)" />
        </Svg>
      )}
      {children && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderRadius: radii.xl,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.surfaceWarm,
  },
  content: {
    ...StyleSheet.absoluteFill,
  },
});
