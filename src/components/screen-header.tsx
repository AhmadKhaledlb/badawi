import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { RoundIconButton } from '@/components/round-icon-button';
import { Eyebrow, ScreenHeading } from '@/components/section-heading';
import { TextLink } from '@/components/text-link';
import { HairlineRule } from '@/design/illustration/notebook';
import { contentEnter, spacing } from '@/design/tokens';

type ScreenHeaderProps = {
  title: string;
  /**
   * Omit to render NO back affordance at all. Field Mode relies on this:
   * it has no generic Back by locked requirement — Complete and Stop are its
   * only exits (docs/safety/README.md).
   */
  onBack?: () => void;
  /**
   * A breadcrumb trail through the locked hierarchy, e.g.
   * ['Arabian Peninsula', 'Desert']. Rendered as a survey label joined by
   * middots. Do NOT include the screen's own title — several screen tests
   * assert a title appears exactly once, and duplicating it here would break
   * them as well as being redundant to a screen reader.
   */
  trail?: string[];
  /** A single trailing action (e.g. Settings from Profile). */
  action?: { label: string; onPress: () => void };
  /** Draws the measured rule under the header. Off for headers over a hero window. */
  rule?: boolean;
};

// The header every screen shares: an optional plotted return path, a
// hierarchy trail, the title, and a measured rule — the notebook layer
// applied to navigation, replacing the previous bare "Back" text + oversized
// heading pairing.
export function ScreenHeader({
  title,
  onBack,
  trail,
  action,
  rule = true,
}: ScreenHeaderProps) {
  return (
    <Animated.View entering={contentEnter} style={styles.container}>
      {(onBack || action) && (
        <View style={styles.topRow}>
          {onBack ? (
            <RoundIconButton icon="chevronLeft" accessibilityLabel="Back" onPress={onBack} />
          ) : (
            <View />
          )}
          {action && <TextLink label={action.label} onPress={action.onPress} />}
        </View>
      )}
      {trail && trail.length > 0 && <Eyebrow>{trail.join('  ·  ')}</Eyebrow>}
      <ScreenHeading>{title}</ScreenHeading>
      {rule && <HairlineRule weight="hairline" style={styles.rule} />}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 34,
  },
  rule: {
    marginTop: spacing.sm,
  },
});
