import { StyleSheet, Text, View } from 'react-native';

import { colors, fontFamily, radii, spacing } from '@/design/tokens';

import { BadawiMark } from './badawi-mark';

type WordmarkSize = 'sm' | 'md' | 'lg';

const WORDMARK_SIZE: Record<WordmarkSize, { fontSize: number; letterSpacing: number }> = {
  // Tracking widens with size: at display size the letterforms need air to
  // read as a mark rather than as a word; at small size tight tracking keeps
  // it from disintegrating.
  sm: { fontSize: 15, letterSpacing: 3.4 },
  md: { fontSize: 22, letterSpacing: 5.6 },
  lg: { fontSize: 34, letterSpacing: 9 },
};

const MARK_SIZE: Record<WordmarkSize, number> = { sm: 22, md: 32, lg: 62 };

type BadawiWordmarkProps = {
  size?: WordmarkSize;
  color?: string;
};

// ── BADAWI WORDMARK ──────────────────────────────────────────────────────
//
// "BADAWI" set in Young Serif (the brand display serif — see
// src/design/tokens/typography.ts) in all caps with size-dependent tracking.
//
// This is a TREATMENT of the name, not the identity on its own: the wordmark
// must not be used as the sole brand element in a primary placement (app
// icon, splash, Welcome). Those use `BadawiLockup`, which pairs it with the
// approved "1A" circular mark. The wordmark alone is for secondary
// placements — a screen header, a footer, a document byline.
//
// Letterspacing is applied via `letterSpacing` rather than by inserting
// spaces between characters, so the string stays a single accessible,
// selectable, screen-reader-correct word.
export function BadawiWordmark({ size = 'md', color = colors.textPrimary }: BadawiWordmarkProps) {
  const metrics = WORDMARK_SIZE[size];

  return (
    <Text
      accessibilityRole="header"
      style={[
        styles.wordmark,
        {
          color,
          fontSize: metrics.fontSize,
          // Trailing tracking is applied to the final glyph too, which
          // visually shifts the word left of true centre. Compensating here
          // keeps a centred lockup actually centred.
          marginRight: -metrics.letterSpacing,
          letterSpacing: metrics.letterSpacing,
          lineHeight: metrics.fontSize * 1.16,
        },
      ]}>
      BADAWI
    </Text>
  );
}

type LockupSurface = 'light' | 'deep';

const LOCKUP_TEXT_COLOR: Record<LockupSurface, string> = {
  light: colors.textPrimary,
  deep: colors.textOnDeep,
};

type BadawiLockupProps = {
  size?: WordmarkSize;
  /**
   * `stacked` (mark above wordmark) is the primary lockup — Welcome, splash,
   * any identity moment. `inline` (mark beside wordmark) is the horizontal
   * lockup for constrained bars and headers.
   */
  orientation?: 'stacked' | 'inline';
  /**
   * Which surface the lockup sits on — selects the correctly-coloured mark
   * asset (`BadawiMark`'s `surface`) and a matching text colour. `light`
   * (default) for background/surfaceWarm/Ecru grounds, `deep` for
   * `colors.surfaceDeep` (Night).
   */
  surface?: LockupSurface;
  /**
   * A short qualifying line beneath the wordmark, set as a survey label.
   * Intended for real scope/territory framing only — never marketing copy.
   */
  kicker?: string;
};

// ── PRIMARY LOCKUP ───────────────────────────────────────────────────────
//
// Clear space: keep a margin of at least 0.5 × the mark's height on all
// sides, free of type, imagery, and rules. `stacked` builds that in via its
// own gap; `inline` relies on the parent's padding.
//
// Minimum sizes: `stacked` at `sm` or larger; `inline` at `sm` or larger. Do
// not scale the lockup below `sm` — use a bare `BadawiMark` instead.
export function BadawiLockup({
  size = 'lg',
  orientation = 'stacked',
  surface = 'light',
  kicker,
}: BadawiLockupProps) {
  const markSize = MARK_SIZE[size];
  const color = LOCKUP_TEXT_COLOR[surface];

  return (
    <View style={orientation === 'stacked' ? styles.stacked : styles.inline}>
      <BadawiMark size={markSize} surface={surface} />
      <View style={orientation === 'stacked' ? styles.stackedType : styles.inlineType}>
        <BadawiWordmark size={size} color={color} />
        {kicker && (
          <View style={orientation === 'stacked' ? styles.kickerRow : undefined}>
            {orientation === 'stacked' && <View style={[styles.kickerRule, { backgroundColor: color }]} />}
            <Text style={[styles.kicker, { color }]}>{kicker}</Text>
            {orientation === 'stacked' && <View style={[styles.kickerRule, { backgroundColor: color }]} />}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wordmark: {
    fontFamily: fontFamily.displayBold,
    textAlign: 'center',
  },
  stacked: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  stackedType: {
    alignItems: 'center',
    gap: spacing.md,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  inlineType: {
    gap: 2,
  },
  kickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  // Flanking hairlines turn the kicker into a plotted caption rather than a
  // tagline — the "notebook" half of the visual language.
  kickerRule: {
    width: 22,
    height: StyleSheet.hairlineWidth * 2,
    opacity: 0.4,
    borderRadius: radii.xs,
  },
  kicker: {
    fontFamily: fontFamily.textBold,
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    opacity: 0.75,
  },
});
