// Per-weight subpath imports — NOT the package root.
//
// This matters a lot. `@expo-google-fonts/<family>`'s root index re-exports
// every weight it ships, and each of those is a `require()` of a .ttf asset.
// Metro cannot tree-shake a required asset, so importing from the package root
// bundles ALL 18 weights per family whether or not they are used.
//
// Measured on this project with `npx expo export --platform web`:
//   package-root imports  →  36 .ttf files, ~3.7 MB of fonts in the bundle
//   subpath imports       →   6 .ttf files, ~0.6 MB
//
// That is a ~3.1 MB saving on every install and every web load, for zero
// visual difference. If a new weight is ever needed, add another subpath
// import here — never widen these back to the package root.
import { Archivo_400Regular } from '@expo-google-fonts/archivo/400Regular';
import { Archivo_600SemiBold } from '@expo-google-fonts/archivo/600SemiBold';
import { Archivo_700Bold } from '@expo-google-fonts/archivo/700Bold';
import { Fraunces_400Regular_Italic } from '@expo-google-fonts/fraunces/400Regular_Italic';
import { Fraunces_600SemiBold } from '@expo-google-fonts/fraunces/600SemiBold';
import { Fraunces_700Bold } from '@expo-google-fonts/fraunces/700Bold';

// The exact set of font faces BADAWI bundles — see the direction and cost
// rationale in ./typography.ts.
//
// Both families are SIL Open Font License 1.1 (Fraunces © Undercase Type;
// Archivo © Omnibus-Type). The .ttf files are bundled into the app binary, so
// no network request is made at runtime — required for BADAWI's offline-first
// guarantee (docs/architecture/README.md).
//
// The keys here are the strings `fontFamily` resolves against, and must stay
// exactly in sync with `fontFamily` in ./typography.ts.
export const brandFontAssets = {
  Fraunces_400Regular_Italic,
  Fraunces_600SemiBold,
  Fraunces_700Bold,
  Archivo_400Regular,
  Archivo_600SemiBold,
  Archivo_700Bold,
} as const;
