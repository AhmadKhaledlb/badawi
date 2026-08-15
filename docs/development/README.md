# BADAWI Development & Quality Protocol

This document defines the working and quality protocol for implementation work on BADAWI.

## Standard Workflow

For substantive development work:

UNDERSTAND → INSPECT → PLAN → BRANCH → IMPLEMENT → VERIFY → SELF-REVIEW → COMMIT → REPORT → PR → HUMAN MERGE

Planning and verification depth should be proportional to the task.

## Before Implementation

Claude should:

1. understand the requested outcome
2. identify relevant locked requirements
3. inspect relevant existing code, documentation, schemas, tests, and dependencies
4. identify material ambiguity or governance boundaries
5. verify repository state
6. work from an appropriate task branch

Do not begin by creating new systems before checking whether the repository already contains an established solution.

## Scope Discipline

Stay within the approved task.

Do not perform unrelated refactors merely because cleaner code is possible.

Small changes necessary to safely complete the task may be included when clearly justified.

Meaningful unrelated improvements should be reported separately rather than silently added to scope.

## Git Workflow

`main` represents approved BADAWI state.

Substantive development must occur on task branches.

Use clear branch categories where appropriate:

- `feat/`
- `fix/`
- `refactor/`
- `test/`
- `docs/`
- `chore/`

Before committing:

- inspect repository status
- inspect the relevant diff
- ensure intended files only are staged
- check for secrets or accidental artifacts
- run applicable verification

Broad staging such as `git add .` is acceptable only after verifying that all affected files belong in the intended commit.

Claude may prepare or open a pull request after successful verification.

The human owner performs the final merge into `main`.

Squash merge is the BADAWI default.

## Quality Gates

Apply relevant gates proportionally to the change.

Applicable gates include:

- requirement fidelity
- type checking
- linting
- formatting
- automated tests
- regression checks
- mobile/runtime verification
- offline verification
- accessibility
- loading/error/failure states
- security and privacy
- safety/content integrity
- diff self-review
- repository hygiene
- documentation consistency

A critical applicable gate may not be silently skipped.

## Testing Principles

Prioritize meaningful coverage for:

- domain and business logic
- progression and state transitions
- persistence
- offline behavior
- synchronization
- content validation
- authentication and authorization
- safety-sensitive behavior
- critical user journeys
- regressions

Do not create low-value tests solely to increase a coverage percentage.

Where practical, a bug fix should include regression coverage demonstrating the corrected behavior.

## Verification Honesty

Never claim that something was tested when it was only inspected.

Clearly distinguish:

- tested and passed
- inspected but not executed
- unable to test
- requires simulator/emulator verification
- requires physical-device verification
- requires human review
- requires content/research review
- requires safety/cultural approval

Passing automated tests does not establish every form of readiness.

## Failure Handling During Development

Do not:

- hide failing tests
- suppress meaningful warnings without justification
- weaken requirements to make tests pass
- disable security controls
- leave abandoned implementation artifacts
- claim completion with unresolved critical failures

When an approach fails, recover safely and report material consequences.

## Performance

Avoid obvious mobile performance problems, including unnecessary rendering, excessive requests, oversized assets, blocking operations, and inappropriate resource use.

Measure before introducing complex performance architecture.

Do not prematurely optimize hypothetical bottlenecks.

## Stop & Escalate

Stop rather than guessing when encountering:

- conflicting authoritative requirements
- consequential product ambiguity
- material architecture changes
- missing safety-critical information
- questionable cultural or field content
- possible secret or sensitive-data exposure
- destructive or difficult-to-reverse operations
- substantial unexplained existing changes
- inability to verify a critical requirement
- missing required external credentials or services

Appropriate escalation is successful agent behavior.

## Completion Report

At the end of substantive implementation, report:

- branch
- implemented scope
- files/systems changed
- checks and tests executed
- results
- anything not verified
- known limitations
- outstanding approvals or reviews
- working-tree status

Do not hide unresolved risk or incomplete work.

## Definition of Complete

A development task is complete only when:

- the approved scope has been implemented
- applicable engineering gates have passed or are transparently reported
- the implementation has been self-reviewed
- relevant documentation is current
- the repository contains no unintended changes
- remaining non-engineering approval requirements are clearly identified

Engineering completion and production readiness are not necessarily the same state.