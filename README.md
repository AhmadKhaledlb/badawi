# BADAWI

BADAWI is a real-world field-learning product: environmental understanding, practical field capability, reflection, and safe transfer of skill — not a tourism guide, entertainment app, or conventional gamified learning app.

V1 hierarchy: **Region → Environment → Pack → Unit → Challenge**, scoped to the Arabian Peninsula → Desert → Desert Foundations (6 Units, 28 Challenges). See `docs/product/README.md` for the full locked product specification.

This is the V1 application: Expo + React Native + Expo Router + TypeScript, offline-first (bundled fonts, bundled geography, locally persisted progress — no backend, no network dependency for core content).

## Prerequisites

- Node.js 20+ (developed against Node 24)
- npm (ships with Node)
- Expo Go, an iOS Simulator, or an Android Emulator for on-device/simulator running — the web target needs nothing extra

## Setup

```bash
npm install
```

## Running the app

```bash
npx expo start        # interactive: choose iOS simulator, Android emulator, web, or a device via Expo Go
npm run ios           # iOS simulator directly
npm run android       # Android emulator directly
npm run web           # web, via react-native-web
```

The app is light-mode only (`userInterfaceStyle: "light"` in `app.json`) — there is no dark theme to toggle.

## Quality checks

```bash
npx tsc --noEmit       # TypeScript
npm run lint           # expo lint (ESLint)
npm run test           # Jest + @testing-library/react-native
npm run test:watch     # Jest in watch mode
npx expo-doctor        # Expo/dependency health check
npx expo export --platform web   # production web bundle, catches Metro/bundling errors
```

All of the above should pass cleanly before a change is considered done.

## Project structure

```
src/app/          Expo Router routes (file-based). (main)/(tabs)/ holds the persistent-nav
                   shell (Home, Explore, Progress, Profile, and the Region → Environment →
                   Pack → Unit → Challenge hierarchy). Field Mode lives outside (tabs)/ by
                   design — see src/app/(main)/challenge/[challengeId]/field.tsx.
src/components/   Shared UI primitives (Screen, Plate, ScreenHeader, section-heading
                   typography components, press feedback, etc.)
src/design/       Design tokens (color/type/spacing/motion/radii), brand assets, and the
                   terrain/notebook illustration system
src/content/      Locked V1 curriculum data (region/environment/pack/units/challenges)
src/domain/       Domain types for the content/curriculum model
src/state/        App state (progress) and its reducer/types
src/persistence/  Local persistence (AsyncStorage-backed progress storage)
src/providers/    App-wide React context providers
docs/             Locked product, architecture, curriculum, safety, and design specifications
```

## Governance

Engineering work in this repository follows `CLAUDE.md` (agent governance) and `docs/development/README.md` (working/quality protocol). Notably: `main` is protected — substantive work happens on task branches, and only the human repository owner performs the final merge to `main`.

`docs/` is authoritative for product, architecture, curriculum, and safety decisions. If code and `docs/` ever conflict, that is a bug to surface, not to silently resolve in either direction.
