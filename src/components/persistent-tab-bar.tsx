import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { withOpacity } from '@/components/plate';
import { HazardStripe } from '@/components/hazard-stripe';
import { TabBarIcon, type TabName } from '@/components/tab-bar-icon';
import { colors, fontFamily } from '@/design/tokens';

const INACTIVE_TINT = withOpacity(colors.textPrimary, 0.4);

const TABS: { name: TabName; label: string; href: '/home' | '/explore' | '/progress' | '/profile' }[] = [
  { name: 'home', label: 'Home', href: '/home' },
  { name: 'explore', label: 'Explore', href: '/explore' },
  { name: 'progress', label: 'Progress', href: '/progress' },
  { name: 'profile', label: 'Profile', href: '/profile' },
];

// Which primary destination a given pathname belongs to. The learning
// hierarchy (Region → Environment → Pack → Unit → Challenge → Prepare/
// Review) all reads as "Explore" for tab-highlight purposes; Settings reads
// as "Profile". Field Mode is never routed through here at all (it renders
// outside this shell — see src/app/(main)/challenge/[challengeId]/field.tsx
// and (main)/(tabs)/_layout.tsx).
function activeTabFor(pathname: string): TabName {
  if (pathname.startsWith('/profile') || pathname.startsWith('/settings')) return 'profile';
  if (pathname.startsWith('/progress')) return 'progress';
  if (pathname.startsWith('/home')) return 'home';
  return 'explore';
}

// ── PERSISTENT PRIMARY NAVIGATION BAR ────────────────────────────────────
//
// Phase 5A correction: the approved design requires this bar to stay
// visible through the whole learning hierarchy (Region/Environment/Pack/
// Unit/Challenge Hub/Prepare/Review/Settings), not just on the four tab
// roots. React Navigation's `Tabs` primitive (used in the previous slice)
// keeps its bar visible only within a focused tab's OWN nested stack, which
// doesn't fit a single linear hierarchy reachable from multiple tabs — so
// this is a plain, always-rendered component inside a shared Stack
// (`(main)/(tabs)/_layout.tsx`), not `expo-router`'s `Tabs` layout.
//
// Tapping a tab uses `router.navigate`, which returns to that route if it's
// already in the stack rather than always pushing a new copy — a reasonable
// approximation of tab behaviour for a single shared stack, though it does
// not give each tab fully independent history the way real per-tab stacks
// would. Flagged as a known simplification, not silently perfected.
export function PersistentTabBar() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const active = activeTabFor(pathname);

  return (
    <View>
      <HazardStripe />
      <View style={[styles.bar, { paddingBottom: insets.bottom + 10 }]}>
        {TABS.map((tab) => {
          const focused = tab.name === active;
          const color = focused ? colors.textPrimary : INACTIVE_TINT;
          return (
            <Pressable
              key={tab.name}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={tab.label}
              hitSlop={6}
              onPress={() => router.navigate(tab.href)}
              style={styles.item}>
              <TabBarIcon name={tab.name} color={color} focused={focused} />
              <Text style={[styles.label, { color }]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    paddingTop: 10,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontFamily: fontFamily.textSemiBold,
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
