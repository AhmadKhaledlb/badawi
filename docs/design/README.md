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