import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaInsetsContext, useSafeAreaInsets } from 'react-native-safe-area-context';

import { PersistentTabBar } from '@/components/persistent-tab-bar';

// ── PRIMARY NAVIGATION SHELL ─────────────────────────────────────────────
//
// Phase 5A correction: the approved persistent Home / Explore / Progress /
// Profile bar must stay visible through normal navigation — Region,
// Environment, Pack, Unit, Challenge Hub, Prepare, Review, and Settings all
// live inside this `(tabs)` group now (moved here from the plain `(main)`
// level in the previous slice) so they render inside this shared Stack,
// below the always-mounted `PersistentTabBar`. The
// Region → Environment → Pack → Unit → Challenge hierarchy itself is
// unchanged — only which layout renders around it changed.
//
// Field Mode (`(main)/challenge/[challengeId]/field.tsx`) is deliberately
// NOT inside `(tabs)` — it stays a sibling of this group under `(main)`, so
// navigating to it pushes a full-screen route in the ROOT stack that covers
// this entire shell, bar included. That is what "no bottom navigation in
// Field Mode" actually means structurally, not a visual toggle.
//
// The Stack's own content area overrides its safe-area bottom inset to 0
// via `SafeAreaInsetsContext`, since `PersistentTabBar` (a sibling here, not
// inside the Stack) is now the real bottom edge screens sit above — without
// this, every screen's own `SafeAreaView` (src/components/screen.tsx) would
// add the device's raw home-indicator inset a second time, leaving a dead
// gap above the bar. `PersistentTabBar` keeps the real inset for its own
// bottom padding.
export default function MainShellLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <SafeAreaInsetsContext.Provider value={{ ...insets, bottom: 0 }}>
        <View style={styles.stackArea}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </SafeAreaInsetsContext.Provider>
      <PersistentTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  stackArea: {
    flex: 1,
  },
});
