---
name: badawi-visual-design
description: The authoritative visual-design and art-direction instruction set for BADAWI V1 — logo/brand identity, app icon, illustration language, characters/companions, iconography, visual motifs, texture/depth, the Blueprint Map and other exploration surfaces, Pack/Unit/Challenge visual journeys, color application within the locked palette, typography direction, motion/animation language, component and screen composition, empty/loading/error/pending states, Profile/Settings visual treatment, onboarding art direction, and Field Mode visual (not behavioral) treatment. Use this skill any time visual/creative direction is being set or propagated — new screens, a redesign pass, logo/icon/illustration work, "make this feel less like a list," a motion pass, a component redesign — even if the user doesn't name the skill explicitly. This skill grants Claude broad creative authority over BADAWI's visual expression; it does NOT grant authority over curriculum, safety, architecture, or product/navigation meaning — those stay governed by CLAUDE.md and the other BADAWI skills exactly as before. Can also be invoked explicitly as /badawi-visual-design.
---

# BADAWI Visual Design

## Purpose

This is BADAWI's standing art-direction brief: the instruction set that lets Claude execute polished, distinctive, on-brand visual work across Phase 5D.2, 5D.3, and all later visual work without the human re-explaining the brand every time. It exists so visual decisions are made once, deliberately, and then reused — not re-litigated screen by screen.

## Governance

This skill sits inside `CLAUDE.md`'s governance, with one explicit, deliberate exception: `CLAUDE.md` normally requires approval before materially changing "UX or visual design." **This skill IS that approval, scoped specifically to visual expression.** It was granted explicitly and in writing by the project owner (see "Mandate" below) — it is not Claude assuming authority it wasn't given, and it does not extend to any other authority boundary in `CLAUDE.md`. Curriculum, safety, architecture, privacy, security, dependency, and product-meaning boundaries are completely unaffected by this skill and remain exactly as strict as `CLAUDE.md` states them.

If anything in this skill ever appears to conflict with `CLAUDE.md`'s non-visual boundaries (safety, curriculum, cultural governance, architecture), or with locked Phase 1–4 specifications, those win without exception — stop and surface the conflict rather than resolving it in this skill's favor. Visual authority is not a backdoor to product, safety, or curriculum authority.

## Mandate

**Claude owns the entire visual expression of BADAWI.** Within the boundaries below, Claude has broad creative authority over: logo, app mark, wordmark, app icon, favicon direction, brand identity, typography, color application (using the locked palette), illustration language, characters/companions, iconography, visual motifs, texture, depth, maps, exploration paths, cards, components, screen composition, transitions, animation, motion, micro-interactions, responsive behavior, empty/loading/error/pending visual states, Profile/Settings visual treatment, onboarding art direction, Unit/Challenge visual journeys, and Field Mode *visual* treatment (not its behavior — see "Field Mode").

This authority exists to produce a premium, distinctive, cohesive product — not to produce novelty for its own sake. Every visual decision should trace back to strengthening the brand target below or clarifying the product's real structure, not to "looking different."

## Locked boundaries — Claude may NOT redesign

These remain fully governed by `CLAUDE.md`, locked Phase 1–4 specifications, and the other BADAWI skills, regardless of anything in this skill:

- Region → Environment → Pack → Unit → Challenge hierarchy
- Arabian Peninsula → Desert → Desert Foundations as V1 scope
- the canonical 6 Units / 28 Challenges, their content, and their order
- curriculum architecture (competency framework, evidence model, learning arc, DLOs)
- safety doctrine and safety-critical content rules (`docs/safety/README.md`)
- Field Mode *behavioral* restrictions — see "Field Mode" below
- progress/outcome semantics (attempt outcomes are not competence)
- competency/assessment semantics (no Expert level, no numeric scoring)
- the research/content-authority system (RQ0–RQ4, WorkingCopyText/LockedSpecText, the research matrix)
- product meaning and navigation meaning (what a screen means, what an action does)
- the no-XP / no-streak / no-leaderboard / no-engagement-dark-pattern doctrine

Visual treatment of any of the above may change freely. What they *mean*, *contain*, or *do* may not, without the approval `CLAUDE.md` already requires for that separate boundary.

Content authorship boundaries from `CLAUDE.md` and `badawi-content-integration` are fully in force here too: this skill authorizes *visual* creativity, not license to invent survival guidance, safety thresholds, historical claims, or traditional/cultural content. See "Illustration" and "Characters" below for how this applies specifically to imagery.

## Brand target

BADAWI should feel: premium, adventurous, exploratory, tactile, illustrated, atmospheric, warm, contemporary, calm, sophisticated, field-aware, distinctive.

BADAWI should NOT feel: childish, corporate SaaS, a generic LMS, or a travel-booking app.

Hold every visual decision — a component, a screen, an animation — against this list. If it reads as a settings screen, a course-catalog card, or a checkout flow, it has drifted from the brand target regardless of how clean the code is.

## Logo / brand system

Claude must create an original BADAWI identity — not simply typeset the word "BADAWI" in a nice font. Draw logo/mark concepts from abstract ideas: horizon, terrain, path, movement, orientation, observation, stars, sun, shelter, landscape, exploration. Geometric/abstract marks built from these ideas are encouraged.

**Do NOT fabricate or imitate tribal, Bedouin, indigenous, or culturally specific symbols merely for aesthetic effect.** This is not a stylistic preference — it is `docs/curriculum/v1-curriculum-spec.md` §12's traditional-knowledge governance and `CLAUDE.md`'s cultural-representation rules applying to the brand mark exactly as they apply to any other BADAWI content. An abstract horizon/path/star mark is safe; a stylized version of a specific textile pattern, tent shape, or ornamental motif is not, unless that specific representation has gone through the cultural review those documents require.

The identity system should cover: a primary logo, a compact app mark (small-space use — tab icons, favicons, watermarks), a wordmark treatment, an app-icon concept, and explicit guidance for light-background/single-color use.

## Illustration

Original, culturally-neutral environmental illustration is encouraged: dunes, rock formations, horizons, desert layers, sun/moon/stars, wind forms, tracks, navigation abstractions, vegetation silhouettes, water/runoff abstractions, terrain maps, environmental scenes.

Prefer editable vector/SVG or code-generated (View/shape composition, or a lightweight vector library if one is introduced deliberately — see "Dependencies") assets over raster imagery where practical, so illustrations stay themeable and lightweight.

Two hard rules carried over from `docs/safety/README.md` and the curriculum spec, because illustration is still content:
- **Never depict factual survival instructions through decoration.** An illustration must not function as de facto field guidance (e.g., a "how to find water" diagram) — that is exactly the kind of unverified safety content `CLAUDE.md` forbids fabricating, whether it's written or drawn.
- **Never fabricate traditional practices or authentic cultural representation.** Abstract/environmental imagery is safe territory; anything that reads as depicting a specific cultural practice, dress, or artifact is not, absent independent cultural approval.

## Characters

An original recurring companion/character system is allowed if it genuinely strengthens the product (e.g., orienting a learner through Field Mode calmly, marking progress non-numerically) — not as decoration for its own sake. Any character must:

- be original, not derivative of an existing property or a real community's imagery
- be culturally neutral unless authentic representation has been independently approved (this skill does not grant that approval)
- never pretend to represent a Bedouin/tribal community, and never wear invented "traditional" dress or symbols
- serve an actual product or brand role — introduce one only when it has a job to do

## Blueprint Map

The Blueprint Map must actually feel spatial and exploratory — it must not degrade into a list of horizontal rows (the direction the Phase 5B/5C shell defaulted to under time pressure, and the specific failure mode to design away from).

Compose it from an appropriate combination of: terrain/environment-layer backdrops, destination nodes, connecting paths, depth (layering, parallax, elevation), and a clear locked/future-territory treatment. Arabian Peninsula remains the active V1 territory; other regions stay visibly "coming soon" without inventing specific unsupported region names or content (`docs/design/README.md` already establishes this — this skill governs *how it looks*, not *whether it exists*).

## Pack / Unit / Challenge

Do not represent the learning journey primarily as settings-style list rows. Units should feel like stages in an expedition/journey; Challenges should feel like connected experiences within those stages — use spatial progression, visual nodes, scenes, destination framing, maps, or layered cards, choosing whichever approach actually serves a given screen rather than forcing one pattern everywhere.

The underlying data and hierarchy (which Units, which Challenges, their order, their prerequisites) come from `src/content/` and `src/domain/` unchanged — see "Locked boundaries" above. This section governs how that structure is *presented*, not what it *is*.

## Color

The locked palette (`docs/design/README.md`) is unchanged by this skill:

| Name | Hex |
|------|---------|
| Sage Green | #838E6C |
| Ecru | #EAE2CD |
| Terracotta | #B95730 |
| Indigo | #353C56 |
| Light Neutral | #F7F8F0 |
| Brown | #3F3B32 |
| Olive | #646D3E |

Four semantic roles are already approved and contrast-verified (App background = Light Neutral, Primary text = Brown, Secondary/deep text = Indigo, Warm surface = Ecru) — see `docs/design/README.md` for the exact verified pairings. The palette should feel fully utilized and deliberate, not mostly beige: Sage Green, Terracotta, and Olive currently have no approved semantic role, and BADAWI V1 has so far used only the four roles above out of caution.

**This skill authorizes Claude to define the implementation-level semantic roles needed for coherent design** (e.g., an accent role, a Field Mode treatment, a map-depth role), provided that, every time a new role is introduced:
1. the underlying palette hex values themselves are never changed,
2. contrast is actually checked for any new text/background pairing (state the ratio, don't assume it),
3. the role and its rationale are documented in code (a comment at the definition site, matching the existing token-file convention) and called out in the completion report,
4. no role implies safety/status semantics that don't exist elsewhere (e.g., don't invent a "danger red" — BADAWI has no error/warning color, and outcome/status presentation must stay qualitative and neutral per `CLAUDE.md`).

## Typography

Claude owns the typography direction. Choose a distinctive, high-quality type system suitable for Expo/React Native — editorial/adventure-oriented rather than SaaS/system-default — rather than defaulting to the platform system font forever. Keep the dependency footprint lightweight (a single well-chosen variable font family, loaded via `expo-font`, is preferable to multiple large families) and document the choice and its licensing in the completion report. Introducing a font is a production dependency exactly like any other — see `CLAUDE.md`'s dependency rules and state the cost (bundle size, load behavior) plainly.

## Motion

Claude owns the motion language: purposeful page transitions, node/path reveals on the map, environmental movement (subtle, ambient — not busy), card interactions, micro-interactions, and progress transitions. `react-native-reanimated` is already a project dependency and should be the default tool.

Do not overanimate — motion should clarify hierarchy and spatial relationships, not decorate for its own sake. Every animation must respect the OS reduced-motion setting (Reanimated's `ReduceMotion.System` on every entering/exiting animation, or equivalent) — this is not optional polish, it's an accessibility requirement already established in the current token layer (`src/design/tokens/motion.ts`).

## Field Mode

Field Mode gets its own, much calmer visual language than the exploration experience — this is a deliberate contrast, not an oversight. Whatever the rest of the app's motion/illustration/texture language becomes, Field Mode stays visually quiet.

Non-negotiable, unchanged by anything in this skill (these are `CLAUDE.md`/`docs/safety/README.md` behavioral requirements, not visual preferences):
- no generic Back affordance
- Complete and Stop remain the only exits, and remain equal visual weight — Stop must never read as the lesser or "failure" option
- Stop always visible/accessible
- low cognitive load, minimal interaction
- no distracting environmental motion or decorative animation
- no engagement pressure of any kind (no progress bars implying "almost there," no countdown framing, nothing that nudges continuation over stopping)

For the full behavioral (not visual) rule set, use `badawi-field-mode` alongside this skill — that skill owns Field Mode safety behavior; this skill owns only how the (unchanged) behavior is dressed.

## Responsive design

Mobile is primary. Tablet and web/desktop should use intentional max-width and layout composition (centered content columns, multi-column map/grid layouts where the canvas genuinely supports it) rather than stretching mobile-width rows across a wide viewport.

## Design process

When this skill is invoked for a visual task:

1. **Inspect existing visual implementation** — current tokens (`src/design/tokens/`), current shared components (`src/components/`), and the actual screens involved — before proposing anything new. Reuse what's already correct; don't rebuild what's working.
2. **Reject skeleton/list-based solutions** where the brand target calls for something spatial/illustrated/tactile instead. A plain vertical list of rows is very rarely the right answer for an exploration or journey surface in this product.
3. **Establish the concept before propagating it.** Do not apply a new visual grammar everywhere at once speculatively.
4. **Design representative screens first**, in this order, and get the grammar right on them before extending it: Welcome, Blueprint Map, Desert Foundations (Pack), Unit, Challenge, Field Mode.
5. **Reuse the chosen visual grammar** across the rest of the app once it's proven on the representative set — consistency matters more than novelty on every individual screen.
6. **Preserve functional code and domain logic** unless the visual implementation genuinely requires a change — a redesign is not license to touch `src/domain/`, `src/content/`, or state/persistence logic. If a visual concept seems to require a data/behavior change, treat that as a separate, flagged decision, not a silent side effect.
7. **Self-critique as a product designer, not just a developer.** Before calling the work done, ask honestly: does this look premium and distinctive, or does it look like a working prototype? Would this survive a design review at a studio that makes exploration/outdoor products? If the honest answer is "it's functional but generic," iterate before reporting completion.
8. **Run the app and visually verify representative screens where tooling allows** (e.g. `expo export --platform web`, a running dev server, or any available rendering/screenshot tool). State plainly which screens were actually visually observed versus only code-reviewed — do not claim a visual result was verified when it was only inspected in source, per `CLAUDE.md`'s testing-honesty requirement.
9. **Iterate if the result still resembles a developer skeleton.** "It renders without errors" is not the bar; "it matches the brand target" is.

## Dependencies

New visual dependencies (a font package, an SVG/vector library, an icon set, a lottie/animation library) are still production dependencies under `CLAUDE.md`'s dependency rules: state necessity, maintenance status, bundle-size/app-size impact, and licensing before adding one, and prefer the smallest option that does the job. This skill's creative authority does not waive that discipline — it just means the *visual direction* doesn't need separate sign-off the way a *new dependency* still does. Flag new dependencies clearly in the completion report even when the visual result they enable is otherwise fully within this skill's authority.

## Output

For substantive visual work done under this skill, report:

- **Concept** — the visual/brand idea being executed and why it fits the brand target
- **Implemented** — what was built, screen by screen
- **New visual-system elements** — logo/mark, illustration assets, characters, new semantic color roles, new typography, new motion patterns — and where each is defined
- **Reused** — existing tokens/components leaned on rather than rebuilt
- **Locked boundaries preserved** — an explicit confirmation that hierarchy, curriculum, safety doctrine, Field Mode behavior, and progress/competency semantics were not touched
- **Verification performed** — visually observed (state how) vs. code-inspected only vs. unable to verify, kept honest per `CLAUDE.md`
- **Dependencies added** — if any, with the cost stated
- **Outstanding review** — anything that would need real cultural/safety review before it could be treated as final (e.g., any character or mark a human should sanity-check against the cultural-representation rules)

## Interactions with other BADAWI skills

- `badawi-screen-implementation` still governs the mechanics of turning a visual decision into production code (state handling, accessibility wiring, architecture boundaries) — use it alongside this skill rather than instead of it. This skill sets the direction; that skill still applies its own verification checklist to the implementation.
- `badawi-field-mode` remains the authority on Field Mode's safety *behavior*; this skill only ever governs Field Mode's calmer *visual* treatment on top of that unchanged behavior.
- `badawi-content-integration` remains the authority whenever visual work touches actual content data, not just its presentation.
- `badawi-feature-verification`'s "Design & Accessibility" section is where visual work produced under this skill gets checked before PR handoff — treat that skill's checklist as the exit gate for work this skill produces.

All of these, including this skill, remain subordinate to `CLAUDE.md` outside the specific visual-authority exception stated in "Governance" above.

## Escalation

Stop and escalate rather than deciding alone when:
- a visual concept would require authentic representation of a real culture/community/tradition (this skill explicitly does not grant that approval)
- a visual idea starts to imply product, safety, or curriculum meaning that isn't already established (e.g., a map "unlock" animation that implies a progression gate the product doesn't actually have)
- a new production dependency is large, unmaintained, or has a real licensing/cost question
- the brand target and a specific locked constraint seem to genuinely conflict, and resolving it would require reinterpreting a locked decision rather than just designing within it
