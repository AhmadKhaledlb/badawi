import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';

import { pressedSurfaceStyle } from '@/components/press-feedback';
import { colors, elevation, radii, spacing, touchTarget, typography } from '@/design/tokens';

type ActionButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  /**
   * `primary`   filled Ecru — the forward action on a screen.
   * `secondary` hairline-outlined — a peer action of equal validity, not a
   *             lesser one. Used for Postpone/Refuse, which must never read
   *             as failure (docs/safety/README.md).
   * `deep`      filled Indigo with light text — reserved for the single
   *             highest-emphasis action on an illustrated hero.
   * `field`     the Field Mode control. See the note below — this variant is
   *             the ONLY one used in Field Mode, and both Complete and Stop
   *             use it identically.
   */
  variant?: 'primary' | 'secondary' | 'deep' | 'field';
  /** A short trailing hint (e.g. a step count). Never used in Field Mode. */
  hint?: string;
};

// ── THE ACTION BUTTON ────────────────────────────────────────────────────
//
// One button component for the whole app so emphasis is a deliberate choice
// from a fixed set rather than an ad hoc style per screen.
//
// ── FIELD MODE EQUALITY (LOCKED) ─────────────────────────────────────────
// The `field` variant exists specifically so Field Mode's two exits cannot
// drift apart. Complete and Stop both render `variant="field"` with no
// modifier, no icon, no hint, and no ordering emphasis, which means they are
// byte-for-byte identical apart from their label.
//
// This is a locked safety requirement, not a style preference: stopping,
// modifying, postponing, or refusing a challenge can demonstrate competence,
// so Stop must never be presented as the lesser or "failure" option
// (docs/safety/README.md; CLAUDE.md, "Product and Curriculum Fidelity").
// If you are tempted to make one of them primary and the other secondary —
// don't. That is the exact regression this variant prevents.
//
// `field` is also sized to `touchTarget.fieldControl` (72dp) rather than the
// 48dp minimum, because it is operated outdoors, possibly one-handed or
// gloved, under cognitive load.
export function ActionButton({
  label,
  variant = 'primary',
  hint,
  disabled,
  ...props
}: ActionButtonProps) {
  const isField = variant === 'field';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled) }}
      disabled={disabled}
      hitSlop={spacing.xs}
      {...props}
      style={({ pressed }) => [
        styles.button,
        isField ? styles.field : styles.standard,
        VARIANT_SURFACE[variant],
        // Field controls get flat, non-scaling feedback: a scale animation on
        // one control and not the other would break the equality above, and
        // "bouncier" feedback subtly invites pressing.
        pressed && (isField ? styles.fieldPressed : pressedSurfaceStyle),
        disabled && styles.disabled,
      ]}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, VARIANT_LABEL[variant], isField && styles.fieldLabel]}>
          {label}
        </Text>
        {hint && !isField && <Text style={[styles.hint, VARIANT_LABEL[variant]]}>{hint}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  standard: {
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.xl,
    minHeight: touchTarget.minimum,
  },
  field: {
    // Deliberately much larger than the standard control.
    minHeight: touchTarget.fieldControl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.md,
    width: '100%',
  },
  fieldPressed: {
    opacity: 0.82,
  },
  primary: {
    backgroundColor: colors.surfaceWarm,
    ...elevation.low,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.textSecondary,
  },
  deep: {
    backgroundColor: colors.surfaceDeep,
    ...elevation.medium,
  },
  fieldSurface: {
    backgroundColor: colors.surfaceWarm,
    borderWidth: 1.5,
    borderColor: colors.textPrimary,
  },
  disabled: {
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  label: {
    ...typography.bodyEmphasis,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  fieldLabel: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  hint: {
    ...typography.meta,
    opacity: 0.7,
  },
  labelOnDeep: {
    color: colors.textOnDeep,
  },
  labelSecondary: {
    color: colors.textSecondary,
  },
});

const VARIANT_SURFACE = {
  primary: styles.primary,
  secondary: styles.secondary,
  deep: styles.deep,
  field: styles.fieldSurface,
} as const;

const VARIANT_LABEL = {
  primary: undefined,
  secondary: styles.labelSecondary,
  deep: styles.labelOnDeep,
  field: undefined,
} as const;
