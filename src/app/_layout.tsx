import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AppProviders } from '@/providers/app-providers';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AppProviders>
      <AnimatedSplashOverlay />
      {/* Stack (not tabs) gives normal push/pop + native back-gesture
          behavior for the welcome → home → region → environment → pack
          journey. Header is hidden — no header/back-chrome design is
          approved yet; each screen provides its own minimal BackLink. */}
      <Stack screenOptions={{ headerShown: false }} />
    </AppProviders>
  );
}
