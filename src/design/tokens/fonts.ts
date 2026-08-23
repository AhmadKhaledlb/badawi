// Per-weight subpath imports — NOT the package root.
//
// This matters a lot. `@expo-google-fonts/<family>`'s root index re-exports
// every weight it ships, and each of those is a `require()` of a .ttf asset.
// Metro cannot tree-shake a required asset, so importing from the package root
// bundles ALL weights it ships whether or not they are used.
//
// Measured on this project with `npx expo export --platform web`:
//   package-root imports  →  36 .ttf files, ~3.7 MB of fonts in the bundle
//   subpath imports       →   6 .ttf files, ~0.6 MB
//
// That is a ~3.1 MB saving on every install and every web load, for zero
// visual difference. If a new weight is ever needed, add another subpath
// import here — never widen these back to the package root.
import { Alegreya_400Regular_Italic } from '@expo-google-fonts/alegreya/400Regular_Italic';
import { FamiljenGrotesk_400Regular } from '@expo-google-fonts/familjen-grotesk/400Regular';
import { FamiljenGrotesk_500Medium } from '@expo-google-fonts/familjen-grotesk/500Medium';
import { FamiljenGrotesk_600SemiBold } from '@expo-google-fonts/familjen-grotesk/600SemiBold';
import { YoungSerif_400Regular } from '@expo-google-fonts/young-serif/400Regular';

// The exact set of font faces BADAWI bundles — see the direction and cost
// rationale in ./typography.ts.
//
// All three families are SIL Open Font License 1.1 (Young Serif © Vietnam
// Type Institute; Familjen Grotesk © Ken Barber / Speak Type; Alegreya ©
// Juan Pablo del Peral / Huerta Tipográfica). The .ttf files are bundled into
// the app binary, so no network request is made at runtime — required for
// BADAWI's offline-first guarantee (docs/architecture/README.md).
//
// Young Serif ships exactly one weight/style (400 Regular — no italic face
// exists in the family at all). Familjen Grotesk and Alegreya both ship
// italic faces, but only the weights actually used by the approved Phase 5A
// design are bundled here — see ./typography.ts for how each face is
// assigned to a token.
//
// The keys here are the strings `fontFamily` resolves against, and must stay
// exactly in sync with `fontFamily` in ./typography.ts.
export const brandFontAssets = {
  YoungSerif_400Regular,
  FamiljenGrotesk_400Regular,
  FamiljenGrotesk_500Medium,
  FamiljenGrotesk_600SemiBold,
  Alegreya_400Regular_Italic,
} as const;
