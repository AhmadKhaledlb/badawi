import { StyleSheet, Text, View } from 'react-native';

import { colors, lineOpacity, radii, spacing, typography } from '@/design/tokens';

import { withOpacity } from './plate';

type StatusPillProps = {
  label: string;
  /**
   * `neutral`  (default) — active/informative, e.g. a territory or unit tag.
   * `emphasis`            — Phase 5A: the "CONTINUE" / "ACTION NEEDED"
   *             treatment — filled Ink with Light text. Deliberately NOT a
   *             Clay/accent fill: Clay measures 4.39:1 on Light, just under
   *             the 4.5:1 AA floor for the pill's bold-caps label text at
   *             this size (src/design/tokens/colors.ts) — Clay stays a
   *             graphic-only accent (see `marker`), never a filled label
   *             background.
   * `muted`             — inactive, e.g. "Coming soon".
   * `onDeep`            — the same pill placed on an Indigo surface.
   *
   * There is deliberately no `success`/`warning`/`danger` tone and there
   * never will be. BADAWI does not colour-code outcomes: stopping,
   * postponing, or refusing must not read as failure, and completing must not
   * read as competence (docs/safety/README.md; docs/curriculum/README.md,
   * "Assessment Principles"). `emphasis` marks visual priority (what to look
   * at first), never a judgement about an outcome.
   */
  tone?: 'neutral' | 'emphasis' | 'muted' | 'onDeep';
  /**
   * Marks the pill as a plotted position on the map ("Active territory").
   * Renders an accent dot only — a GRAPHIC element at 6dp, never coloured
   * text, since Terracotta is 4.39:1 on Light Neutral and unfit for label
   * type (src/design/tokens/colors.ts).
   */
  marker?: boolean;
};

// A small measured label for qualitative, non-judgemental state — attempt
// outcomes, territory status, a safety-gate class tag.
export function StatusPill({ label, tone = 'neutral', marker = false }: StatusPillProps) {
  return (
    <View style={[styles.pill, TONE_SURFACE[tone]]}>
      {marker && <View style={styles.marker} />}
      <Text style={[styles.label, TONE_LABEL[tone]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderRadius: radii.pill,
    paddingVertical: spacing.xs + 1,
    paddingHorizontal: spacing.md,
    borderWidth: StyleSheet.hairlineWidth * 2,
  },
  neutral: {
    backgroundColor: colors.surfaceWarm,
    borderColor: 'transparent',
  },
  emphasis: {
    backgroundColor: colors.textPrimary,
    borderColor: 'transparent',
  },
  muted: {
    backgroundColor: 'transparent',
  },
  onDeep: {
    backgroundColor: 'transparent',
  },
  marker: {
    width: 6,
    height: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.accent,
  },
  label: {
    ...typography.label,
    color: colors.textPrimary,
    textTransform: 'uppercase',
  },
  labelEmphasis: {
    color: colors.textOnDeep,
  },
  labelMuted: {
    color: colors.textSecondary,
    opacity: 0.75,
  },
  labelOnDeep: {
    color: colors.textOnDeepMuted,
  },
});

const TONE_SURFACE = {
  neutral: styles.neutral,
  emphasis: styles.emphasis,
  muted: [styles.muted, { borderColor: withOpacity(colors.rule, lineOpacity.strong) }],
  onDeep: [styles.onDeep, { borderColor: withOpacity(colors.ruleOnDeep, lineOpacity.strong) }],
} as const;

const TONE_LABEL = {
  neutral: undefined,
  emphasis: styles.labelEmphasis,
  muted: styles.labelMuted,
  onDeep: styles.labelOnDeep,
} as const;
