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

/** The screen title. Fraunces 600. One per screen. */
export function ScreenHeading({ style, onDeep, ...props }: HeadingProps) {
  return (
    <Text
      accessibilityRole="header"
      {...props}
      style={[styles.screenHeading, onDeep && styles.onDeep, style]}
    />
  );
}

/** A section heading within a screen. Fraunces 600, smaller than the title. */
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
 * The pull-quote voice, in italic Fraunces. Reserved for a Unit's LOCKED
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
 * `accent` is permitted here and NOWHERE else in text, because both ordinal
 * sizes clear the WCAG large-text threshold: `md` is 20px Fraunces 700 and
 * `lg` is 40px Fraunces 700, and Terracotta on Light Neutral measures 4.39:1
 * — above the 3:1 required for text at ≥18.66px bold. Do not reuse this
 * escape hatch at body size.
 */
export function Ordinal({ value, size = 'md', onDeep, accent }: OrdinalProps) {
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
          accent && styles.ordinalAccent,
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
