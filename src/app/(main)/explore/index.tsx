import { Redirect } from 'expo-router';

// No screen links here — the real exploration journey goes Home →
// /explore/region/[regionId] → /explore/environment/[environmentId]
// directly (docs/design/README.md, "Navigation Model"). This bare index
// exists only because Expo Router requires it for the `explore/` folder;
// a stray deep link here is sent to the real Blueprint Map instead of a
// generic placeholder screen.
export default function ExploreScreen() {
  return <Redirect href="/home" />;
}
