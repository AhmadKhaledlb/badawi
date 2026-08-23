# BADAWI Curriculum & Learning System

This document summarizes the locked BADAWI Phase 2 curriculum decisions that implementation must preserve.

## Curriculum Hierarchy

Region → Environment → Pack → Unit → Challenge

## V1 Curriculum Scope

- Region: Arabian Peninsula
- Environment: Desert
- Pack: Desert Foundations
- Units: 6
- Challenges: 28

## V1 Learning Arc

READ → UNDERSTAND → PREPARE → ORIENT → MOVE → INTEGRATE

### Unit → Arc Stage Mapping (locked)

Phase 5A locks the following 1:1 mapping between the six V1 Units (`src/content/units.ts`, ordered 1–6) and the six arc stages above, for presentation purposes (e.g. Home's progress treatment):

| Unit order | Unit | Arc stage |
|---|---|---|
| 1 | Reading the Desert | READ |
| 2 | Heat, Weather & Water | UNDERSTAND |
| 3 | Preparing for the Field | PREPARE |
| 4 | Orientation & Navigation | ORIENT |
| 5 | Moving With the Desert | MOVE |
| 6 | Desert Field Integration | INTEGRATE |

This is an intentional, approved decision, not an implementation inference — treat `Unit.order` as authoritative for deriving a Unit's arc stage rather than re-deriving it per screen. No new field was added to the `Unit` domain type to store this: the mapping is positional (`order` 1–6 ↔ stage 1–6) and this table is the single documented source of that positional meaning, so implementation doesn't need — and must not add — a duplicate `arcStage` field on `Unit` just to re-express what `order` already encodes.

## Core Competency Loop

OBSERVE → REASON → ACT → ADAPT → REFLECT

SAFETY surrounds the entire competency loop.

## Competency Domains

- Environmental Observation & Awareness
- Environmental Reasoning & Decision-Making
- Practical Field Capability
- Adaptation & Problem-Solving
- Safety & Risk Management
- Reflection & Transfer

## Competency Levels

Aware → Capable → Independent → Adaptive

There is no Expert level.

## Assessment Principles

- Public learner assessment should not collapse competence into a simplistic numeric score.
- Assessment must reflect BADAWI's competency framework and challenge intent.
- Stopping, modifying, postponing, or refusing can demonstrate sound judgment and competence.
- Completion alone does not equal competence.
- Progression must not reward unsafe persistence.
- Difficulty increases through greater independence, integration, and judgment rather than greater danger.

## Challenge Integrity

Claude must not autonomously:

- merge or split challenges
- change challenge order where progression matters
- alter prerequisites
- change competency mappings
- replace BADAWI's assessment philosophy with conventional course scoring
- add an Expert level
- rewrite substantive learning or safety meaning
- hard-code assumptions that break the established hierarchy

## Reflection & Transfer

Reflection is part of the learning system, not decorative post-completion content.

Implementation must preserve the relationship between:

- field attempt
- observation
- reasoning
- action
- adaptation
- reflection
- future transfer

## Content Governance

Curriculum content may carry research, provenance, safety, cultural, and verification requirements.

Engineering completion does not imply curriculum/content approval.

If implementation reveals an ambiguity that would materially change learning progression, competency meaning, assessment, or safety, escalate rather than inventing a curriculum decision.