# BADAWI Decision Records

This directory records material approved implementation and architecture decisions made during Phase 5 and later development.

The purpose is to prevent BADAWI's implementation, documentation, and approved architecture from silently drifting apart.

## When to Create a Decision Record

Create a decision record when an approved decision materially affects areas such as:

- architecture
- persistent data models
- content schemas
- authentication or authorization
- offline architecture
- external services or providers
- major production dependencies
- privacy or data flows
- analytics
- deployment/infrastructure
- significant technical compromises
- changes to previously locked technical decisions

Do not create decision records for routine implementation details such as local variable names, minor component composition, ordinary styling adjustments, or other easily reversible engineering choices.

## Required Structure

Each decision record should contain:

1. Title
2. Status
3. Context
4. Decision
5. Rationale
6. Alternatives considered where relevant
7. Consequences and trade-offs
8. Affected systems or documentation
9. Follow-up obligations where applicable

## Status

Use clear states where appropriate, such as:

- Proposed
- Approved
- Superseded

A proposed record does not authorize implementation of a decision that requires approval.

## Numbering

Use sequential identifiers and descriptive filenames, for example:

`001-example-decision.md`

`002-example-decision.md`

Do not reuse an identifier.

## Superseding Decisions

Do not silently rewrite historical decisions to make the record appear as though the old decision never existed.

When a material approved decision changes:

- preserve the previous record
- mark it superseded where appropriate
- create or reference the replacement decision
- update affected authoritative documentation

## Relationship to Governance

Decision records cannot override higher-priority BADAWI governance, safety, security, privacy, or locked product requirements without explicit approval to reopen the relevant decision.

Claude may recommend that a decision record be created.

Claude may draft a proposed decision record.

Claude may not use a self-authored proposal as authorization for a material change.

## Technical Debt

Meaningful deliberate compromises may be recorded when they create future architectural obligations.

Do not turn this directory into a collection of trivial TODO items.

The goal is to preserve consequential engineering reasoning, not document every development choice.