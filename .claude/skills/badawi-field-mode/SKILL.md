---
name: badawi-field-mode
description: Use this skill whenever implementation work materially touches BADAWI Field Mode or any safety-critical user experience — entering, operating within, or exiting Field Mode; Field Mode navigation or interaction behavior; safety warnings; safety acceptance or acknowledgement; stop conditions; emergency/safety access; offline safety information; safety-critical failure states; connectivity-dependent behavior that could affect Field Mode; challenge behavior where stopping, modifying, postponing, or refusing is relevant; or the implementation of safety-critical content or its presentation (hydration, heat, navigation, shelter, weather, wildlife, hazards, emergency response, edible/unsafe materials, survival procedures). Trigger this even if the user just says "build the Field Mode screen," "add the safety acknowledgement step," "wire up offline caching for the challenge safety info," or "what happens if the phone loses signal mid-challenge" — they don't need to say "safety" or "Field Mode" by name. This is a constraint-and-verification skill, not a source of field-survival knowledge — it never treats Claude's own model knowledge as evidence that safety guidance is correct.
---

# BADAWI Field Mode & Safety Implementation

## Purpose

Govern implementation work that touches BADAWI Field Mode or any safety-critical experience, so that ordinary engineering convenience never quietly erodes the safety, offline, product, curriculum, or UX guarantees that were already locked elsewhere. This skill grants no new authority — it exists only to keep implementation faithful to decisions made by product, safety, and cultural governance.

## Governance

This skill is subordinate to `CLAUDE.md`, the locked Phase 1–4 specifications, approved Phase 5 decisions (`docs/decisions/`), and authoritative BADAWI safety documentation (`docs/safety/README.md`). It does not restate that authority — it points to it, and it never overrides it. If this skill's instructions ever appear to conflict with those sources, the sources win; stop and surface the conflict.

The reason this skill exists as a separate, stricter layer: Field Mode may be used by a real person in a real desert. A plausible-sounding UI decision, a "fail open" default, or a convenient shortcut around a safety gate has real-world consequences here in a way that most product surfaces don't. Treat that difference as real, not as an abstraction.

## When to use / when not to

Use for anything listed in the description above — Field Mode itself, safety warnings/acceptance/acknowledgement, stop conditions, emergency access, offline safety information, safety-critical failure states, connectivity-dependent behavior near Field Mode, challenge stop/modify/postpone/refuse behavior, and safety-critical content presentation.

Don't force this workflow onto changes that are safety-adjacent only in the loosest sense (e.g., a purely cosmetic tweak to a screen that happens to be reachable from Field Mode but touches no safety behavior, content, or state). Use judgment, but default to treating a change as in-scope if there's genuine doubt — the cost of the extra rigor is much lower than the cost of missing a real safety regression.

## Required context

Read what's relevant to the task before writing anything:

- `CLAUDE.md` — governance, authority boundaries, escalation rules
- `docs/safety/README.md` — safety doctrine, safety-critical content rules, research integrity, content trust states, Field Mode failure requirements, escalation triggers
- `docs/architecture/README.md` — offline-first architecture, failure handling, data/persistence ownership
- `docs/product/README.md` — product principles (competence over engagement, safety integrated into progression, no XP/streak pressure)
- `docs/curriculum/README.md` — competency loop (SAFETY surrounds OBSERVE→REASON→ACT→ADAPT→REFLECT), assessment principles, challenge integrity
- `docs/design/README.md` — Field Mode UX requirements (minimal interaction, low cognitive load, interruption tolerance, no decorative engagement)
- `docs/development/README.md` — verification honesty and quality-gate expectations
- `docs/decisions/README.md` — any approved Phase 5 decisions that refine or supersede the above
- Any approved screen/flow specification for the specific Field Mode or safety surface being built
- The existing codebase: safety-related components, content-trust/provenance fields already modeled, offline/sync infrastructure, existing Field Mode screens — whatever already exists to reuse

**If no Field Mode implementation or safety-content model exists yet**, there's nothing to extend, and the first version of it is itself an architecture and content-schema decision — both of which require approval under `CLAUDE.md`. Don't invent the shape of safety-critical data (trust states, provenance fields, offline-availability flags) silently just because a screen needs somewhere to read from.

## Workflow

### 1. Understand

State what the change actually does to the user's experience of safety: does it gate progression, present a warning, record acknowledgement, expose an emergency path, change what's available offline, or change what happens on failure? Vague understanding here compounds into vague safety behavior later.

### 2. Identify safety boundaries

Before planning implementation, name explicitly:
- which of the 15 principles below are load-bearing for this change (see "Safety principles")
- what must never happen regardless of technical failure (fabricated guidance, a bypassed acknowledgement, silently-online-only behavior where offline was guaranteed)
- what content in this change is safety-critical and therefore off-limits to author independently (see "Content authorship")
- what existing safety gate, stop condition, or offline guarantee this change is near, and confirm the change doesn't touch it in a way that wasn't asked for

### 3. Inspect

Look at what already exists: safety components, acknowledgement flows, offline caching/sync patterns, content-trust modeling, existing Field Mode screens. A parallel safety mechanism invented for convenience is a regression risk even if each piece looks fine in isolation — safety behavior needs to be uniform across the app, not screen-by-screen.

### 4. Plan

Map the change to: states required (including failure states), what must remain accessible offline, what acknowledgement/gate behavior is involved, what content this touches and its current trust/provenance state, and what happens on each failure mode (no connectivity, missing content, corrupted state, unavailable device capability, sync failure). If the plan requires guessing at any of these, that's the point to escalate, not the point to proceed on a reasonable-sounding assumption.

### 5. Implement

Build within the approved architecture and design system. Preserve every applicable principle in "Safety principles" below — they're constraints on the implementation, not aspirational guidelines to balance against convenience, aesthetics, or friction reduction.

### 6. Verify

Check what's applicable to the change:
- offline behavior (does required safety information actually remain available with no connection?)
- connectivity loss mid-flow (not just app-launch-while-offline)
- malformed or missing data
- unavailable services/device capabilities
- persistence and recovery across interruption
- warning and stop-condition preservation (they still fire, still block, still require acknowledgement)
- accessibility
- navigation restrictions specific to Field Mode
- safety-content provenance/trust state (is anything being treated as more verified than it actually is?)
- unintended pressure toward continuing a challenge (does any UI element, copy, or timing nudge someone to keep going when stopping is the competent choice?)
- regression against approved Field Mode behavior elsewhere in the app

If something can't actually be exercised yet (no device to test on, no way to simulate connectivity loss in this environment, etc.), say so plainly. Report it as unverified — never as passed, and never blur "I read the code and it looks right" into "I tested this."

### 7. Safety self-review

Before reporting, re-read the "Safety principles" list against the actual diff, not against your intent. It's easy to preserve a principle in the parts of the code you were focused on and quietly violate it in a part you weren't — e.g., a retry/fallback path added for robustness that ends up serving stale or fabricated content when sync fails. Look specifically for failure paths and edge cases, since that's where safety regressions hide.

### 8. Report

Use the "Output" format below.

## Safety principles

These are constraints, not suggestions — implementation should treat a conflict between "ship this faster/smoother" and any of these as already resolved in the principle's favor.

1. **Field Mode safety requirements are constraints, not suggestions.**
2. **Preserve offline-first behavior and offline access to required safety information** wherever the approved architecture requires them.
3. **Fail safely.** Missing connectivity, unavailable services, malformed data, failed synchronization, or other technical failures must never cause fabricated guidance, removal of required safety information, or unsafe continuation. Prefer safe degradation over false continuity.
4. **Never weaken warnings, safety gates, stop conditions, acknowledgement requirements, or emergency access** for convenience, engagement, aesthetics, conversion, or reduced friction.
5. **Never independently author authoritative field-safety guidance.** Hydration, heat, navigation, shelter, weather, wildlife, hazards, emergency response, edible/unsafe materials, survival procedures, and similar safety-critical content must come from approved BADAWI content/research sources or remain clearly identified development placeholders.
6. **Model-generated content is never verified merely because it was generated confidently or reads plausibly.** Confidence is not evidence.
7. **Preserve the distinction between engineering readiness, content/research readiness, and safety/cultural approval.** A feature can be technically done and still blocked.
8. **Difficulty increases through independence and integration, not increased danger.**
9. **Stopping, modifying, postponing, or refusing a challenge may demonstrate competence** and must not be automatically treated as failure.
10. **Do not introduce gamification, streak pressure, XP pressure, countdown pressure, shame, or other mechanics that could encourage unsafe continuation** — including subtle versions of these (a progress bar that implies "almost there" during a stop-worthy moment counts).
11. **Preserve locked Field Mode UX behavior** — minimal distraction, and any approved navigation restrictions — from the approved BADAWI specifications.
12. **Safety-critical failure states must be explicit and recoverable where possible**, not silent or dead-ended.
13. **Never silently substitute online-only behavior for an approved offline guarantee**, even temporarily or as a fallback.
14. **Do not redesign safety language, hierarchy, interaction patterns, or Field Mode behavior without explicit approval.**
15. **If implementation reveals ambiguity or conflict in a safety-critical requirement, stop and escalate rather than choosing an interpretation autonomously.**

## Content authorship

This skill implements delivery systems for BADAWI knowledge; it is not itself a source of that knowledge. Never treat Claude's own model knowledge — however confident or plausible — as evidence that field-safety, historical, or cultural guidance is correct, safe, or authentic. Safety-critical content must come from an approved BADAWI source or be a clearly marked placeholder. This applies as much to a quick "reasonable-sounding" line of copy as to a full guidance section — there's no size threshold below which independently authored safety content becomes acceptable.

## Escalation

Stop and escalate, per `CLAUDE.md` and `docs/safety/README.md`, on:
- missing safety-critical information needed to proceed
- conflicting safety guidance across sources
- any pressure (explicit or implied by the task) to weaken a safety control
- a requirement that would reward or encourage unnecessary physical risk
- uncertain provenance or trust state for safety-critical content
- any material architecture, product, design, curriculum, or cultural change implied by the work
- genuine ambiguity in a safety-critical requirement

Do not fill these gaps with plausible invention, even temporarily.

## Output

Report:
- **Implemented** — what was built
- **Safety principles engaged** — which of the 15 were load-bearing for this change and how each was preserved
- **States handled** — including failure/degraded states specifically
- **Verification performed** — for each applicable check in "Verify," state tested-and-passed, inspected-but-not-executed, or unable-to-test; never claim tested when it was only inspected
- **Content provenance** — for any safety-critical content touched, its source/placeholder status and trust state
- **Deviations** — anywhere implementation diverged from the spec/reference, and why
- **Outstanding review or approval** — anything still needing safety, content/research, cultural, or product sign-off before this could ship
