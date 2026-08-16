---
name: badawi-screen-implementation
description: Use this skill whenever implementing or materially modifying an already-approved BADAWI screen, reusable visual component, navigation-related UI, responsive layout, visual state, interaction, accessibility behavior, or animation tied to approved UI. It translates approved BADAWI design and product decisions into production implementation without redesigning them. Trigger it any time you're about to write or materially change screen/component code in the BADAWI app — onboarding, home, region/environment/pack/unit/challenge screens, challenge preparation, Field Mode, post-attempt review, profile, safety acceptance, settings — even if the user just says "build the home screen" or "add the challenge card component" without naming the skill. Do not invoke merely because a task happens to touch a UI file in passing (e.g. a one-line copy fix or a non-visual bug fix).
---

# BADAWI Screen Implementation

## Purpose

Translate an already-approved BADAWI screen or flow into production implementation without redesigning it. This skill is an execution aid, not a design or product authority — it exists to keep implementation faithful to decisions that were already made elsewhere.

## Governance

This skill is subordinate to `CLAUDE.md`, the authoritative BADAWI documentation under `docs/`, approved Phase 5 decision records under `docs/decisions/`, and the current approved task. It does not restate that governance — it points to it. If anything in this skill ever appears to conflict with `CLAUDE.md` or an authoritative doc, `CLAUDE.md` wins; stop and surface the conflict rather than resolving it silently.

Nothing in this skill authorizes skipping the escalation rules in `CLAUDE.md`. When in doubt about whether something is a "routine implementation detail" or a "material change," treat it as material and ask.

## When to use / when not to

Use for: screens, reusable visual components, navigation-related UI, responsive layouts, visual states, interactions, accessibility behavior, and animations tied to approved UI.

Don't use for: a task that merely happens to touch a UI file (e.g. a copy typo, a non-visual logic fix) but doesn't materially shape a screen or component. Forcing every UI-adjacent diff through this workflow slows down trivial changes without adding safety.

## Required context

Before writing any implementation, read what's relevant to the task at hand:

- `CLAUDE.md` — governance and authority boundaries
- `docs/design/README.md` — Phase 3 design/UX decisions (navigation model, screen families, Field Mode constraints, design-token discipline)
- `docs/product/README.md` — Phase 1 product decisions (hierarchy, V1 scope, competency loop, what BADAWI is not)
- `docs/architecture/README.md` — Phase 4 architecture (layer boundaries, offline-first requirements, content model)
- `docs/decisions/README.md` — approved Phase 5 decisions that may refine or supersede the above
- `docs/safety/README.md` — where the screen touches safety-relevant content or flows
- Any approved screen specification or design reference for the specific screen/flow being built
- The existing codebase: design tokens, components, related screens, navigation patterns, motion patterns, accessibility conventions — whatever already exists to reuse

**If the app scaffold, design tokens, or component system don't exist yet** (true as of this writing — the repo currently holds only governance/spec docs, no application code), there is nothing to reuse yet. Building the first screen means also making foundational architecture and design-system choices. Those choices are "architecture or core system boundaries" and "UX or visual design" under `CLAUDE.md`'s authority boundaries — treat them as material and confirm the approach before committing to a scaffold, rather than inventing one silently because a screen needs somewhere to live.

## Workflow

### 1. Understand

Before touching any code, be able to state:
- what this screen/component does and why it exists
- where it sits in the user journey (`docs/product/README.md` core experience areas)
- the states it must support (loading, error, empty, offline, various content states)
- its interactions and navigation behavior
- any safety implications (does it gate progression, present safety content, sit in Field Mode?)
- the approved design intent for it (from a design reference, prior screens, or `docs/design/README.md`)

If any of these is genuinely unknown or ambiguous in a way that would change the outcome, that's a gap to raise, not a gap to fill in with a plausible guess. `CLAUDE.md` is explicit that unverified content and invented product behavior must not be fabricated.

### 2. Inspect

Look at what already exists before adding anything new: components, design tokens, typography, navigation patterns, assets, motion patterns, accessibility conventions, related screens already built. Reusing an established pattern is almost always right; introducing a parallel one "because it's easier this time" fragments the system and is explicitly against `CLAUDE.md`'s architecture rules.

### 3. Map

Translate the approved design into an implementation plan: screen structure, component hierarchy, state requirements, interactions, accessibility requirements, responsive behavior, and loading/error/empty/offline states where applicable. This is the point to catch "the spec doesn't actually say what happens here" before it becomes an improvised decision in code.

### 4. Implement

Build within the approved BADAWI architecture (`docs/architecture/README.md`) and design system (`docs/design/README.md`). Keep UI, domain logic, persistence, networking, auth, content, and analytics in their proper boundaries — a screen file is not the place for content data, business rules, or network calls to live.

The `frontend-design` skill, if available, can help with execution quality (polish, craft, technical animation implementation) — but it does not get to redefine BADAWI's approved design language, and neither does any other general-purpose skill or plugin. General UI conventions and industry defaults are subordinate to what's actually approved for BADAWI.

### 5. Verify

Before considering the work done, check:
- visual hierarchy matches the approved design intent
- design tokens are used consistently, not arbitrary one-off values
- interactions match the approved behavior
- accessibility (labels, focus order, contrast, touch targets, screen-reader behavior)
- responsiveness across relevant device sizes
- all required states are actually handled, not just the happy path
- product/curriculum behavior matches `docs/product/README.md`
- navigation matches the approved model — no silent fallback to a generic tab/dashboard structure
- no obvious performance problems
- no regression to screens/components this change touches or depends on

Distinguish, when reporting, between what was actually tested (e.g. run and observed) versus merely inspected by reading code — `CLAUDE.md` requires this distinction explicitly.

## Explicit boundaries

This skill does not authorize:
- redesigning an approved screen
- inventing missing product behavior
- introducing a new visual language
- adding unapproved gamification or engagement mechanics
- replacing BADAWI navigation with generic patterns
- introducing new fonts, color systems, icon systems, major interaction conventions, or production UI dependencies without the approval `CLAUDE.md` requires
- changing approved interaction meaning
- fabricating production content (safety, cultural, field, or curriculum content)
- overriding safety, security, privacy, cultural, product, curriculum, architecture, or governance requirements

## Escalation

Stop and escalate — per `CLAUDE.md`'s Working Protocol — when implementation would require a material change to product, design, architecture, safety, curriculum/content, cultural requirements, or dependency strategy. A missing or ambiguous authoritative requirement gets surfaced, not silently resolved.

## Output

For substantive implementation done under this skill, report:
- **Implemented** — what was built
- **Reused** — existing tokens/components/patterns leaned on
- **New components** — anything newly introduced, and why reuse wasn't possible
- **States handled** — which of loading/error/empty/offline/content states were covered
- **Accessibility** — what was addressed
- **Verification performed** — tested vs. inspected vs. unable to verify, per `CLAUDE.md`'s distinction
- **Deviations** — any place implementation diverged from the spec/reference, and why
- **Outstanding review or approval** — anything still needing design, product, safety, or cultural sign-off
