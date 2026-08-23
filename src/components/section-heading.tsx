import { StyleSheet, Text, View, type TextProps } from 'react-native';

import { colors, typography } from '@/design/tokens';

type HeadingProps = TextProps & { children: string; onDeep?: boolean };

// ── THE TYPE COMPONENTS ──────────────────────────────────────────────────
//
// Every piece of text in BADAWI goes through one of these, so the type scale
// (src/design/tokens/typography.ts) is actually enforced rather than being a
// file screens are free to ignore. The `onDeep` flag on each one switches to
// the verified light-on-Indigo pairing instead of leaving each screen to
// remember that Brown on Indigo is 1.03:1.

/** The screen title. Young Serif. One per screen. */
export function ScreenHeading({ style, onDeep, ...props }: HeadingProps) {
  return (
    <Text
      accessibilityRole="header"
      {...props}
      style={[styles.screenHeading, onDeep && styles.onDeep, style]}
    />
  );
}

/** A section heading within a screen. Young Serif, smaller than the title. */
export function SectionTitle({ style, onDeep, ...props }: HeadingProps) {
  return (
    <Text
      accessibilityRole="header"
      {...props}
      style={[styles.sectionTitle, onDeep && styles.onDeep, style]}
    />
  );
}

/**
 * The letterspaced survey label — the notebook layer's voice. Used for
 * breadcrumbs, section kickers, and territory/state labels.
 */
export function Eyebrow({ style, onDeep, ...props }: HeadingProps) {
  return <Text {...props} style={[styles.eyebrow, onDeep && styles.onDeepMuted, style]} />;
}

/**
 * The pull-quote voice, in italic Alegreya. Reserved for a Unit's LOCKED
 * `coreQuestion` — the italic serif deliberately marks it as quoted
 * specification framing rather than an instruction to the learner
 * (docs/curriculum/v1-curriculum-spec.md §14).
 */
export function PullQuote({ style, onDeep, ...props }: HeadingProps) {
  return <Text {...props} style={[styles.pullQuote, onDeep && styles.onDeep, style]} />;
}

/** Standard reading text. */
export function BodyText({ style, onDeep, ...props }: HeadingProps) {
  return <Text {...props} style={[styles.body, onDeep && styles.onDeepMuted, style]} />;
}

/** Secondary/annotation text — captions, curriculum context, provenance notes. */
export function MetaText({ style, onDeep, ...props }: HeadingProps) {
  return <Text {...props} style={[styles.meta, onDeep && styles.onDeepMuted, style]} />;
}

type OrdinalProps = {
  value: number;
  /** `lg` is the station ordinal drawn into a hero; `md` sits inside a marker. */
  size?: 'md' | 'lg';
  onDeep?: boolean;
  /** Renders in the accent role. GRAPHIC-SCALE ONLY — see below. */
  accent?: boolean;
};

/**
 * A drawn ordinal — a Unit's or Challenge's position, treated as map
 * typography rather than body copy.
 *
 * `accent` is permitted here and NOWHERE else in text, but ONLY at `lg`
 * (40px) — the sole size that reliably clears the WCAG large-text
 * threshold now that the display voice is Young Serif, which ships no bold
 * weight at all (src/design/tokens/typography.ts). "Large text" requires
 * either ≥24px regular or ≥18.66px bold; `lg` clears the former on point
 * size alone, but `md` (20px) clears neither now that bold isn't
 * available, so it would need the full 4.5:1 normal-text threshold —
 * Terracotta-on-Light-Neutral measures 4.39:1, just under that bar. Rather
 * than trust every call site to know this, the component itself ignores
 * `accent` at `md` and always renders `textPrimary` (10.43:1) there; `lg`
 * still honors it. Do not reuse this escape hatch at body size.
 */
export function Ordinal({ value, size = 'md', onDeep, accent }: OrdinalProps) {
  const accentEligible = accent && size === 'lg';
  return (
    <View style={styles.ordinalWrap}>
      <Text
        // The ordinal duplicates position information already carried by the
        // adjacent title and list order, so it is decorative to a screen
        // reader and would otherwise be announced as a bare number.
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[
          size === 'lg' ? styles.ordinalLarge : styles.ordinal,
          onDeep && styles.onDeep,
          accentEligible && styles.ordinalAccent,
        ]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenHeading: {
    ...typography.title,
    color: colors.textPrimary,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  eyebrow: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  pullQuote: {
    ...typography.quote,
    color: colors.textPrimary,
  },
  body: {
    ...typography.body,
    color: colors.textSecondary,
  },
  meta: {
    ...typography.meta,
    color: colors.textSecondary,
  },
  ordinalWrap: {
    justifyContent: 'center',
  },
  ordinal: {
    ...typography.numeral,
    color: colors.textPrimary,
  },
  ordinalLarge: {
    ...typography.numeralLarge,
    color: colors.textPrimary,
  },
  ordinalAccent: {
    color: colors.accent,
  },
  onDeep: {
    color: colors.textOnDeep,
  },
  onDeepMuted: {
    color: colors.textOnDeepMuted,
  },
});
