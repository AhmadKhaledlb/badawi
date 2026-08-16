import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { AppProviders } from '@/providers/app-providers';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AppProviders>
      <AnimatedSplashOverlay />
      <Slot />
    </AppProviders>
  );
}
