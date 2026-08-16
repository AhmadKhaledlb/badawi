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

The following Phase 3 color palette is locked:

| Name | Hex |
|------|---------|
| Sage Green | #838E6C |
| Ecru | #EAE2CD |
| Terracotta | #B95730 |
| Indigo | #353C56 |
| Light Neutral | #F7F8F0 |
| Brown | #3F3B32 |
| Olive | #646D3E |

This is a locked palette, not a locked assignment. No color above has an approved semantic role (e.g. "primary," "background," "error," "success") unless that role is separately documented elsewhere. Do not assign semantic meaning to an individual color based on this list alone.

No accessibility contrast pairing among these colors has been verified. Do not state or assume WCAG (or other) contrast compliance for any combination of these colors until contrast has been explicitly checked and documented.

## Approved Semantic Color Roles

The following semantic color role assignments are approved for BADAWI V1:

| Role | Color | Hex |
|------|-------|---------|
| App background | Light Neutral | #F7F8F0 |
| Primary text | Brown | #3F3B32 |
| Secondary/deep text | Indigo | #353C56 |
| Warm surface | Ecru | #EAE2CD |

Sage Green (#838E6C), Terracotta (#B95730), and Olive (#646D3E) remain locked palette colors with no approved semantic role. Do not assign them a semantic role (accent, action, success, warning, error, or otherwise) without separate approval.

### Verified Contrast Basis

The following contrast ratios have been verified for the four semantic assignments above:

- Brown / Light Neutral ≈ 10.43:1
- Indigo / Light Neutral ≈ 10.17:1
- Brown / Ecru ≈ 8.63:1
- Indigo / Ecru ≈ 8.41:1

All four combinations exceed the WCAG 2.x AAA 7:1 contrast threshold for normal text.

This result applies only to these specific verified combinations. Do not generalize this accessibility claim to any other palette combination — no other combination of palette colors has been contrast-verified.

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

## Navigation Model

Implementation must preserve the approved exploratory navigation model, including:

- Blueprint Map
- visible locked regions marked as coming soon
- Arabian Peninsula as the active V1 region
- Desert as the active V1 environment
- Desert Foundations as the active V1 pack

Claude must not replace this with a generic dashboard or tab structure merely because it is faster to build.

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

Beyond the locked color palette and visual principles above, the repository does not currently contain sufficiently authoritative locked implementation values for:

- typography/font families
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