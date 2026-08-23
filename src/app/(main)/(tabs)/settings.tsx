import Constants from 'expo-constants';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Plate } from '@/components/plate';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { BodyText, Eyebrow } from '@/components/section-heading';
import { BadawiLockup } from '@/design/brand/wordmark';
import { HairlineRule } from '@/design/illustration/notebook';
import { colors, contentEnter, spacing, staggeredEnter, typography } from '@/design/tokens';

// ── SETTINGS — HONEST AND EMPTY ──────────────────────────────────────────
//
// No user-configurable setting exists yet in this app: no notification
// preferences, accounts, or sync options are implemented (src/state/ and
// src/persistence/ hold only onboarding/safety/attempt progress, none of it
// user-configurable).
//
// Rather than invent toggles to fill the screen, this states that plainly and
// shows only real, already-available build metadata. The redesign's job here
// was to make an intentionally empty screen look *composed* rather than
// unfinished — hence the brand lockup as a colophon — NOT to give it fake
// content (docs/design/README.md, "Product Fidelity").
export default function SettingsScreen() {
  const version = Constants.expoConfig?.version;

  return (
    <Screen measure="reading" backdropHeight={190}>
      <ScreenHeader title="Settings" onBack={() => router.back()} />

      <Animated.View entering={contentEnter}>
        <Plate variant="outline" style={styles.note}>
          <Eyebrow>Configuration</Eyebrow>
          <BodyText>No configurable settings are available in this version.</BodyText>
        </Plate>
      </Animated.View>

      <Animated.View entering={staggeredEnter(1)} style={styles.colophon}>
        <HairlineRule weight="faint" />
        <View style={styles.lockup}>
          <BadawiLockup size="sm" orientation="inline" />
        </View>
        {version && <Text style={styles.version}>{`BADAWI version ${version}`}</Text>}
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  note: {
    gap: spacing.sm,
  },
  colophon: {
    marginTop: spacing.xl,
    gap: spacing.lg,
  },
  lockup: {
    alignSelf: 'flex-start',
  },
  version: {
    ...typography.meta,
    color: colors.textSecondary,
  },
});
