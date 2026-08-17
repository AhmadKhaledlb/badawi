import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from 'react-native';

import { CornerMarks } from '@/design/illustration/notebook';
import { colors, elevation, lineOpacity, radii, spacing } from '@/design/tokens';

export type PlateVariant = 'paper' | 'warm' | 'deep' | 'outline';

type PlateProps = ViewProps & {
  /**
   * `paper`  Light Neutral with a hairline edge — the plate that floats over
   *          illustration. The default, and the workhorse of the app.
   * `warm`   Ecru fill — a tactile, grouped surface (chips, nested blocks).
   * `deep`   Indigo fill — the emphasis surface. Text on it MUST use
   *          `colors.textOnDeep` (10.17:1) or `colors.textOnDeepMuted`
   *          (8.41:1); never `textPrimary`, which is 1.03:1 on Indigo.
   * `outline` Transparent with a hairline edge — provisional/pending content
   *          that must not look finished (see ./content-status-note.tsx).
   */
  variant?: PlateVariant;
  elevated?: boolean;
  /** Adds surveyor registration brackets. For hero/feature plates only. */
  cornerMarks?: boolean;
  /** Removes internal padding, for plates whose child manages its own inset. */
  flush?: boolean;
  style?: StyleProp<ViewStyle>;
};

// ── THE PLATE ────────────────────────────────────────────────────────────
//
// BADAWI's one surface primitive. Replaces the previous `Card`, whose single
// Ecru-fill variant is what made every screen read as the same beige row
// repeated — a plate now has to choose a ground, and that choice carries
// meaning (floating over terrain, grouped, emphasised, or provisional).
//
// A plate is "paper laid on the page": generous radius, a real hairline edge,
// and a soft wide shadow rather than the tight dark shadow of a UI card.
export function Plate({
  variant = 'paper',
  elevated = false,
  cornerMarks = false,
  flush = false,
  style,
  children,
  ...props
}: PlateProps) {
  return (
    <View
      {...props}
      style={[
        styles.base,
        !flush && styles.padded,
        VARIANT_STYLE[variant],
        elevated && variant !== 'outline' && elevation.low,
        style,
      ]}>
      {children}
      {cornerMarks && (
        <CornerMarks ground={variant === 'deep' ? 'onDeep' : 'light'} inset={10} arm={12} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.lg,
    gap: spacing.sm,
    overflow: 'hidden',
    position: 'relative',
  },
  padded: {
    padding: spacing.lg,
  },
  paper: {
    backgroundColor: colors.background,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.rule,
  },
  warm: {
    backgroundColor: colors.surfaceWarm,
  },
  deep: {
    backgroundColor: colors.surfaceDeep,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderStyle: 'dashed',
    borderColor: colors.rule,
  },
});

// Border colours carry the notebook layer's line weight rather than a solid
// edge, so a plate reads as drawn rather than boxed.
const VARIANT_STYLE: Record<PlateVariant, StyleProp<ViewStyle>> = {
  paper: [styles.paper, { borderColor: withOpacity(colors.rule, lineOpacity.hairline) }],
  warm: styles.warm,
  deep: styles.deep,
  outline: [styles.outline, { borderColor: withOpacity(colors.rule, lineOpacity.strong) }],
};

/**
 * Composes a locked palette hex with an alpha channel. This does NOT introduce
 * a new palette colour — it is the same value rendered translucently, exactly
 * as `opacity` would, and is used only for line-work (borders/rules) where a
 * separate View with an `opacity` prop would be wasteful.
 */
function withOpacity(hex: string, opacity: number): string {
  const alpha = Math.round(Math.min(Math.max(opacity, 0), 1) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${alpha}`;
}

export { withOpacity };
