---
name: badawi-feature-verification
description: Use this skill after substantive BADAWI implementation and before PR handoff — it's the final BADAWI-specific verification gate that checks an implementation against BADAWI's approved product, design, architecture, curriculum/content, safety/cultural, security/privacy, mobile/offline, engineering, and repository requirements. Trigger it on phrases like "is this ready for a PR," "did I miss anything before I hand this off," "can you check this Field Mode change is safe to ship," or "review this before I open the pull request" — even without the word "verification." It complements, and does not replace, automated tests, Superpowers verification workflows, /code-review, /security-review, human review, content/research review, or safety/cultural approval. Skip it for genuinely trivial changes (an obvious documentation typo) where a full verification matrix adds no value, unless specifically requested.
---

# BADAWI Feature Verification

## Purpose

Provide the final BADAWI-specific verification gate after substantive implementation and before PR handoff. It determines whether an implementation satisfies BADAWI's approved product, design, architecture, curriculum/content, safety/cultural, security/privacy, mobile/offline, engineering, and repository requirements — the BADAWI-specific layer on top of, not instead of, the general-purpose checks below.

## Governance

This skill is subordinate to `CLAUDE.md`, authoritative BADAWI documentation under `docs/`, approved decisions (`docs/decisions/`), and the current approved task. It reports on conformance to those sources; it does not have authority to change them. If a verification finding conflicts with something locked, the locked requirement wins — the finding gets reported as a FAIL or an item requiring escalation, not quietly resolved.

## Complements, does not replace

This skill sits alongside, not in place of:
- automated tests
- Superpowers verification workflows
- `/code-review`
- `/security-review`
- human review
- required content/research review
- required safety/cultural approval

Running this skill is not a substitute for any of those, and passing this skill's checks does not mean those are no longer needed.

## When to use / when not to

Use after substantive BADAWI implementation, before final handoff or PR readiness.

Don't invoke for trivial changes where a full verification matrix would add no value — an obvious documentation typo, for instance — unless specifically requested. Running the full matrix on a one-line fix produces noise, not signal, and trains people to skim past the report instead of reading it.

## Verification principle

"Code written" is not the same as "verified." "Engineering complete" is not the same as "production ready." "PR ready" is not the same as "release ready." Keep these distinct throughout — collapsing them is exactly what this skill exists to prevent.

Never convert something not tested into a pass. If a check wasn't actually run, it isn't a PASS regardless of how likely it is to be fine.

## Verification matrix

Work through applicable areas proportionally to the change — not every area applies to every change, and forcing irrelevant checks wastes effort without adding rigor. Mark inapplicable areas NOT APPLICABLE rather than skipping them silently.

### A. Scope
- approved scope implemented
- no required scope missing
- no unapproved feature additions
- no unrelated refactors or accidental scope expansion

### B. Product
- intended product behavior
- navigation
- progression
- user journey
- BADAWI hierarchy (Region → Environment → Pack → Unit → Challenge)
- competency philosophy
- stopping/modifying/postponing/refusing behavior where relevant
- no unapproved gamification or engagement dark patterns

### C. Design & accessibility
- Phase 3 design fidelity
- established design-token usage
- component reuse
- visual hierarchy
- interaction fidelity
- required states
- responsive behavior
- accessibility
- motion behavior
- Field Mode design principles where relevant

### D. Architecture
- architectural boundaries
- state ownership
- persistence
- networking/API boundaries
- authentication/authorization
- schema conformity
- dependency discipline
- environment configuration
- error handling
- offline-first contract
- no duplicate systems or unjustified abstractions

### E. Curriculum & content
- Region → Environment → Pack → Unit → Challenge hierarchy preserved
- V1 scope preserved (Arabian Peninsula → Desert → Desert Foundations → 6 Units → 28 Challenges)
- learning arc preserved (READ → UNDERSTAND → PREPARE → ORIENT → MOVE → INTEGRATE)
- competency loop preserved (OBSERVE → REASON → ACT → ADAPT → REFLECT, with SAFETY surrounding it)
- competency levels preserved (Aware → Capable → Independent → Adaptive — no Expert level)
- content ordering/prerequisites preserved
- approved content only
- provenance and trust/review states preserved
- no silent substantive rewriting

### F. Safety & cultural
- safety warnings/gates preserved
- stop conditions preserved
- no pressure toward unsafe continuation
- no fabricated field guidance
- no fabricated citations or sources
- no unsupported cultural or tribal attribution
- no traditional knowledge incorrectly promoted to modern safety guidance
- required safety/cultural approval state preserved

If `badawi-field-mode` applies to the change, use or consider that skill as part of this verification rather than re-deriving its checks from scratch.

### G. Security & privacy
- no secrets exposed
- no inappropriate logging
- no unnecessary user data collection
- no unapproved analytics/tracking
- no weakened authentication or authorization
- appropriate runtime input validation
- no insecure shortcuts
- no unapproved paid/external services or production dependencies
- no secret-bearing or sensitive files accidentally included

Use `/security-review` where the change warrants dedicated security review — this skill's own security check is a BADAWI-specific pass, not a substitute for that deeper review.

### H. Engineering
- type checking
- linting
- formatting
- unit/integration tests
- regression tests
- build/runtime checks
- error/failure-state behavior
- performance sanity checks

Use Superpowers workflows where appropriate. Use `/code-review` where appropriate before final handoff.

### I. Mobile & offline
- mobile runtime behavior
- lifecycle/interruption behavior
- device permissions
- network transitions
- offline launch/use
- persistence/recovery
- reconnection
- device-size/responsive behavior
- physical-device testing requirements

If something requires simulator, emulator, physical-device, real-world, or controlled field testing, report that requirement explicitly rather than treating code inspection as a substitute for it.

### J. Repository & documentation
- correct task branch
- intended diff only
- no debug artifacts
- no unintended generated files
- no secret-bearing files
- relevant documentation current
- decision record created/updated where required
- known technical debt explicitly recorded where appropriate
- working-tree state understood
- no direct-to-main workflow violation

## Verification states

Resolve every relevant item to exactly one of:

- **PASS** — verified successfully
- **FAIL** — verified and incorrect, or requirement not satisfied
- **NOT TESTED** — applicable verification was not performed
- **NOT APPLICABLE** — genuinely irrelevant to this change
- **HUMAN REVIEW REQUIRED** — cannot be reliably established by Claude and needs human judgment
- **BLOCKED** — a prerequisite or unresolved issue prevents verification

Never represent NOT TESTED, HUMAN REVIEW REQUIRED, or BLOCKED as PASS. The distinction only does its job if it's kept honest even when a PASS would be more convenient to report.

## Stop conditions

Do not report PR readiness when:
- any critical applicable requirement FAILS
- a critical requirement remains BLOCKED
- required safety/content/cultural review is unresolved
- required security/privacy issue is unresolved
- the implementation materially conflicts with authoritative BADAWI requirements
- critical testing required for engineering confidence has not been performed

Routine non-critical human review may remain outstanding while engineering work is otherwise PR-ready — that's normal and should be reported clearly, not treated as a blocker on its own.

## Output format

Produce a concise BADAWI Verification Report using this structure:

```
Overall engineering status: PASS / FAIL / BLOCKED

Scope:
Product:
Design & Accessibility:
Architecture:
Curriculum & Content:
Safety & Cultural:
Security & Privacy:
Engineering checks:
Mobile & Offline:
Repository & Documentation:

Not tested:
Human reviews required:
Known limitations:
Outstanding approvals:
Working-tree state:

PR readiness: READY / NOT READY
Release readiness: READY / NOT READY / OUT OF SCOPE FOR THIS VERIFICATION
```

For every meaningful FAIL, BLOCKED, NOT TESTED, or HUMAN REVIEW REQUIRED item, state why — a bare label without a reason isn't useful to whoever reads the report next.

## Interactions with other BADAWI skills

- `badawi-screen-implementation` may provide the implementation workflow for approved UI work.
- `badawi-content-integration` may provide content-specific integration checks.
- `badawi-field-mode` provides stricter Field Mode and safety-critical implementation checks.

This skill is the final BADAWI-specific engineering verification layer; it does not replace those specialized procedures when they apply — use their checks as inputs to the relevant matrix sections above rather than duplicating the work.

All BADAWI skills, including this one, remain subordinate to `CLAUDE.md`, authoritative BADAWI documentation, approved decisions, and the current approved task.

## Authority boundaries

This skill may identify failures, inconsistencies, missing tests, missing approvals, or governance conflicts, and may recommend fixes.

It does not authorize:
- changing locked requirements
- weakening tests to obtain PASS
- changing safety/content trust state
- bypassing human review
- merging into main
- altering governance
- fabricating test results
- claiming something was tested when it was not

A verification report is a diagnostic artifact, not an approval mechanism — it can tell you what's true, but it can't make something ready that isn't.
