# BADAWI Design System & UX

This document summarizes the locked BADAWI Phase 3 design and UX decisions that implementation must preserve.

## Design Direction

BADAWI V1 should feel:

- illustrated
- animated where appropriate
- tactile
- rounded
- exploratory
- field-aware
- visually distinct from generic learning dashboards

The approved visual direction draws from exploration and outdoor-education references rather than conventional enterprise or LMS interfaces.

## Locked Color Palette

Phase 5A renamed the Phase 3 palette to match the approved BADAWI App v2 design system and added four new colors extending the green and clay ranges. No Phase 3 hex value changed — only the names did (old name in parentheses):

| Name | Hex |
|------|---------|
| Sage (Sage Green) | #838E6C |
| Bone (Ecru) | #EAE2CD |
| Clay (Terracotta) | #B95730 |
| Night (Indigo) | #353C56 |
| Light (Light Neutral) | #F7F8F0 |
| Ink (Brown) | #3F3B32 |
| Deep Sage (Olive) | #646D3E |
| Shade Sage *(new)* | #4A5230 |
| Dry Sage *(new)* | #A8B08F |
| Pale Sage *(new)* | #C6CDB2 |
| Sun Clay *(new)* | #D9A06B |

This is a locked palette, not a locked assignment. No color above has an approved semantic role (e.g. "primary," "background," "error," "success") unless that role is separately documented elsewhere. Do not assign semantic meaning to an individual color based on this list alone. The four new colors in particular have no approved semantic role yet — that is deferred to the shared-component implementation step.

No accessibility contrast pairing among these colors has been verified except where explicitly stated below. Do not state or assume WCAG (or other) contrast compliance for any combination of these colors until contrast has been explicitly checked and documented. The full measured matrix for the original seven, and the measured contrast for the four new colors, is documented in `src/design/tokens/palette.ts` and `src/design/tokens/colors.ts`.

## Approved Semantic Color Roles

The following semantic color role assignments are approved for BADAWI V1:

| Role | Color | Hex |
|------|-------|---------|
| App background | Light | #F7F8F0 |
| Primary text | Ink | #3F3B32 |
| Secondary/deep text | Night | #353C56 |
| Warm surface | Bone | #EAE2CD |

Sage (#838E6C), Clay (#B95730), and Deep Sage (#646D3E) remain locked palette colors with no approved semantic role. Shade Sage, Dry Sage, Pale Sage, and Sun Clay (Phase 5A additions) likewise have no approved semantic role yet. Do not assign any of these a semantic role (accent, action, success, warning, error, or otherwise) without separate approval.

### Verified Contrast Basis

The following contrast ratios have been verified for the four semantic assignments above:

- Ink / Light ≈ 10.43:1
- Night / Light ≈ 10.17:1
- Ink / Bone ≈ 8.63:1
- Night / Bone ≈ 8.41:1

All four combinations exceed the WCAG 2.x AAA 7:1 contrast threshold for normal text.

This result applies only to these specific verified combinations. Do not generalize this accessibility claim to any other palette combination. The four Phase 5A additions have been measured against Ink/Night/Bone/Light (see `src/design/tokens/palette.ts`) but are not yet assigned to a semantic role, and no other combination of palette colors has been contrast-verified.

## Typography

Phase 5A locks the following typeface roles, superseding the earlier Phase 3 "not yet locked" status for typography/font families:

- **Young Serif** — display voice: titles, headings, station numerals. Upright only; the family has no bold, semibold, or italic face. Do not apply a synthetic italic to it.
- **Familjen Grotesk** — interface voice: body text, meta, captions, letterspaced labels, controls.
- **Alegreya Italic** — BADAWI's one real italic face, reserved for genuine accent/observational/quote roles only (isolated inline transliterated terms, the Unit `coreQuestion` pull-quote, and similar). Do not broaden it into a general-purpose italic stand-in for the display or interface voice.

All three are bundled offline via `expo-font` (`src/design/tokens/fonts.ts`); no network font fetch occurs at runtime. Exact weights bundled and per-token assignments are documented in `src/design/tokens/typography.ts`.

## Appearance Mode

BADAWI V1 currently uses the approved light visual system only. The application declares and renders a light appearance; it does not switch based on system dark-mode settings.

Dark mode is deferred, not rejected permanently. A BADAWI dark visual system has not been designed, accessibility-verified, or approved. No dark palette or derived dark colors exist, and none should be invented merely to preserve the previously inherited Expo-starter automatic dark-mode behavior. Dark mode will be reconsidered once a complete BADAWI dark theme is explicitly designed, accessibility-verified, and approved.

## Locked Visual Principles

The following Phase 3 visual principles are locked:

- earth tones rather than bright or artificial colors
- texture over flat design
- movement over static visuals, where appropriate
- real environments rather than artificial setups

## V1 Language

English only for V1.

Future localization, including Arabic and RTL support, should not be made unnecessarily difficult by implementation choices, but full localization is not part of V1 unless separately approved.

## Brand Identity

Phase 5A retires the procedural Waypoint mark. The approved identity is:

- the refined circular BADAWI "1A" mark
- approved wordmark and lockup treatments
- the slogan "LEARN THE LAND"

Approved raster assets are available at `assets/brand/v2/`. `src/design/brand/badawi-mark.tsx` renders the approved mark asset (`BadawiMark`'s `surface` prop selects the correctly-coloured file). `app.json`'s native app icon, Android adaptive icon, web favicon, and splash configuration all now reference mechanically-generated (resize + pad only, no redraw/recolour) v2-native derivatives in `assets/brand/v2/` — none of them reference the old Waypoint-derived files in `assets/brand/` any more, though those originals and their generator (`scripts/generate-brand-assets.js`, `src/design/brand/mark-geometry.ts`/`.json`) are kept until simulator verification confirms the migration. The Android adaptive icon's `monochromeImage` is intentionally unset for now — the approved mark is duotone and a monochrome/themed-icon variant has not been separately approved. `AnimatedSplashOverlay` (`src/components/animated-icon.tsx`) renders the full approved splash composition (`badawi-splash-light.png`) directly, edge-to-edge, as the JS-driven post-native-splash handoff. Do not reconstruct the retired Waypoint mark or introduce a substitute brand mark.

## Navigation Model

Phase 5A approves a persistent primary navigation bar — Home / Explore / Progress / Profile — shown in the approved BADAWI App v2 design. This supersedes the earlier Phase 3 rule that Claude must not replace the exploratory navigation model with a generic dashboard or tab structure; that rule no longer applies.

The tab bar is primary app navigation only. It does not flatten or replace BADAWI's information architecture: the Region → Environment → Pack → Unit → Challenge hierarchy remains fully intact and is navigated to beneath/through these four destinations. Preserve, at minimum:

- visible locked regions marked as coming soon
- Arabian Peninsula as the active V1 region
- Desert as the active V1 environment
- Desert Foundations as the active V1 pack

The exploratory/map presentation under Explore/Region is now implemented: Explore is a real, pannable/pinch-zoomable Natural Earth world map (`src/components/world-canvas.tsx`) with the Arabian Peninsula as the one active, reachable region; Region narrows to the five Desert-environment territory (`src/components/region-map.tsx`), with Desert as the one open, interactive marker and Wadi/Mountain/Coast/Oasis shown as real geographic references with a truthful "in research" status, never implying a route or content that does not exist. The retired "Blueprint Map" name refers to an earlier, superseded composition (see `src/app/(main)/(tabs)/home.tsx`'s own history note) and should not be used for the current Explore/Region implementation.

## Core Screen Families

The approved Phase 3 screen system includes:

- onboarding
- home
- region/environment exploration
- pack
- unit
- challenge
- challenge preparation
- Field Mode
- post-attempt review
- profile/achievements
- safety acceptance
- settings and supporting states where required

## Field Mode

Field Mode requires special treatment.

It must prioritize:

- minimal interaction
- clarity
- low cognitive load
- safety
- interruption tolerance
- offline reliability
- essential information over decorative engagement

Do not add unnecessary prompts, animations, or interaction density that could distract users in the field.

## Design-System Discipline

Once design tokens exist, use them consistently for:

- color
- typography
- spacing
- radii
- sizing
- elevation
- motion

Avoid arbitrary one-off values when an established token or component should be used.

Reusable visual patterns should become reusable components where appropriate, without overengineering the component system.

### Implementation-Level Tokens Not Yet Locked

Beyond the locked color palette, typography (see "Typography" above), and visual principles above, the repository does not currently contain sufficiently authoritative locked implementation values for:

- typography scale
- spacing scale
- radii
- sizing
- elevation/shadows
- motion durations/easing
- iconography
- detailed component specifications

These remain unspecified at the implementation-token level. Do not invent values in these areas and do not treat a placeholder, convenience, or starter-derived value as locked until it is explicitly approved.

## Fidelity vs Accessibility

Claude may make routine responsive or accessibility adjustments that preserve the intended experience.

Accessibility and safety take precedence over literal pixel fidelity where necessary.

Material changes to:

- interaction
- hierarchy
- screen meaning
- navigation
- visual language
- user journey

require approval.

## Placeholder Content

Development placeholders must be clearly identifiable as placeholders.

Do not generate culturally specific, safety-related, or field-instruction content merely to make a design look complete.

## Product Fidelity

Industry conventions do not override BADAWI's approved design.

Do not autonomously introduce:

- leaderboards
- XP systems
- streak pressure
- social feeds
- generic LMS patterns
- engagement dark patterns
- conventional travel-guide UI

unless explicitly approved.