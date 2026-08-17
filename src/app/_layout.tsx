import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AppProviders } from '@/providers/app-providers';
import { brandFontAssets } from '@/design/tokens';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // The brand typefaces are bundled with the app, so this resolves from local
  // assets with no network request — BADAWI's offline-first guarantee holds
  // even on a cold first launch (docs/architecture/README.md).
  const [fontsLoaded, fontError] = useFonts(brandFontAssets);

  // Hold the native splash until the faces resolve, so text never renders in
  // the platform fallback and then re-flows into Fraunces/Archivo mid-session.
  // `fontError` is treated as "proceed anyway": a font failure must never be
  // able to brick the app into a permanent splash screen. If it happens, every
  // size, weight and line-height in the type scale still applies and the app
  // degrades to the platform font (src/design/tokens/typography.ts).
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AppProviders>
      <AnimatedSplashOverlay />
      {/* Stack (not tabs) gives normal push/pop + native back-gesture
          behavior for the welcome → home → region → environment → pack
          journey. Header is hidden — BADAWI screens draw their own header
          from the design system (src/components/screen-header.tsx), which is
          what lets Field Mode omit a Back affordance entirely. */}
      <Stack screenOptions={{ headerShown: false }} />
    </AppProviders>
  );
}
