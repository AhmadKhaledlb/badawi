# BADAWI Technical Architecture

This document summarizes the locked BADAWI Phase 4 technical architecture principles that implementation must preserve.

The detailed Phase 4 decisions and final cross-phase audit remain authoritative. If implementation reveals a conflict or missing material architectural decision, escalate rather than silently redesigning the system.

## Architectural Principle

BADAWI should use the simplest maintainable architecture that correctly supports the approved V1 while preserving the established product model and future extensibility where explicitly required.

Avoid both premature infrastructure and shortcuts that compromise correctness, safety, security, offline behavior, or maintainability.

## Application Architecture

BADAWI V1 is a mobile application built according to the approved React Native / Expo architecture.

Maintain clear boundaries between:

- presentation and UI
- navigation
- domain/business logic
- structured curriculum/content
- application and user state
- persistence
- networking/API access
- authentication and authorization
- analytics/observability
- platform-specific behavior

Do not allow screens or UI components to become the implicit home for unrelated domain, persistence, networking, or security logic.

## BADAWI Domain Model

The technical model must preserve:

Region → Environment → Pack → Unit → Challenge

V1 contains:

Arabian Peninsula → Desert → Desert Foundations → 6 Units → 28 Challenges

Build infrastructure appropriate to this V1 without hard-coding the application in ways that invalidate the established hierarchy.

## Offline-First Architecture

Offline behavior is a core architectural requirement for applicable BADAWI experiences, especially Field Mode.

Implementation must account for:

- required locally available content
- local progress/state persistence
- predictable synchronization
- network interruption
- recovery
- conflict handling where relevant
- protection against duplicate or corrupted state
- safe degraded behavior
- offline access to required safety information

A feature requiring offline support is not complete merely because it works while connected.

## Content Architecture

Curriculum, challenge, safety, cultural, and related structured content should flow through the approved content model and pipeline.

Do not scatter authoritative content throughout UI source files.

Content structures should support required:

- hierarchy
- validation
- relationships
- competency mapping
- safety metadata
- provenance/review metadata where applicable
- offline availability
- future maintainability

Material content-schema changes require approval.

## Data & Persistence

Persistent application and user state must have explicit ownership and sources of truth.

Claude must:

- preserve approved entity relationships
- distinguish durable state from temporary UI state
- use appropriate migrations for persistent schema evolution
- avoid destructive schema shortcuts
- validate consequential runtime data
- handle synchronization deliberately
- preserve data integrity across interruptions and failures

## Authentication & Authorization

Follow the approved Phase 4 authentication architecture.

Authentication and authorization are separate concerns.

Security-sensitive access must not rely solely on frontend visibility or client behavior.

Material changes to identity, sessions, authorization, credential storage, or account flows require approval.

## API & External Services

Use defined boundaries for network and external-service interactions.

Do not tightly couple core BADAWI domain logic to third-party SDKs without justification.

Material new providers, APIs, production dependencies, or vendor relationships require approval.

## Environment Separation

Maintain appropriate separation between development, testing/staging where applicable, and production.

Environment-specific configuration must use approved configuration mechanisms.

Never embed production credentials or secrets in source code.

## Failure Handling

Failures must be explicit and proportional to consequence.

Where appropriate:

- recover safely
- retry safely
- preserve state
- communicate actionable information
- log diagnostically without leaking sensitive data
- fail safely for safety-sensitive behavior

Do not silently swallow consequential failures.

## Mobile Constraints

Implementation must account for real mobile behavior where relevant, including:

- iOS behavior
- application lifecycle
- network transitions
- device permissions
- storage
- accessibility
- device sizes
- performance
- resource usage
- native dependency compatibility

Development-environment success alone does not establish production mobile correctness.

## Dependency Discipline

Prefer stable, maintained, documented, compatible technologies.

Avoid unnecessary dependencies and speculative abstractions.

Before introducing a material production dependency, evaluate necessity, maintenance, compatibility, security, privacy, permissions, native complexity, offline implications, licensing, vendor lock-in, performance, and cost.

## Architecture Changes

Claude may identify and recommend improvements to the locked architecture.

Claude may not silently implement material architectural deviations.

When a change appears necessary, document:

1. current approved decision
2. implementation problem
3. alternatives
4. recommendation
5. consequences
6. affected systems

Then obtain approval before proceeding.

Deliberately accepted architectural compromises should be recorded as meaningful technical debt rather than hidden or prematurely overengineered.