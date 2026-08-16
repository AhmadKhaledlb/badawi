import type { ChallengeId } from '@/domain/challenge';

// Bumped whenever the persisted shape changes. There is only one version
// so far, so there is nothing to migrate yet — see progress-storage.ts.
export const PROGRESS_SCHEMA_VERSION = 1;

// docs/curriculum/README.md, "Assessment Principles": stopping, modifying,
// postponing, or refusing a challenge CAN demonstrate sound judgment and
// competence depending on context — they do not automatically equal
// competence, and neither does completion alone. These values record only
// what happened during an attempt (its outcome/disposition); they are NOT
// a competence assessment, score, or pass/fail result. BADAWI's locked
// competency framework (Aware/Capable/Independent/Adaptive across the
// competency domains) is a separate concept and is not modeled here —
// nothing in this file computes or represents competence.
// ("Modifying" a challenge is not represented as its own outcome yet: the
// docs describe it narratively but don't establish whether it is a
// distinct outcome or a qualifier on another one, so it is deferred
// rather than guessed.)
export const CHALLENGE_ATTEMPT_OUTCOMES = ['completed', 'stopped', 'postponed', 'refused'] as const;
export type ChallengeAttemptOutcome = (typeof CHALLENGE_ATTEMPT_OUTCOMES)[number];

// The absence of an entry for a given challenge means "not yet attempted" —
// there is no separate "not started" outcome.
export type ChallengeProgress = {
  outcome: ChallengeAttemptOutcome;
  updatedAt: string;
};

export type ProgressState = {
  schemaVersion: typeof PROGRESS_SCHEMA_VERSION;
  onboardingCompletedAt: string | null;
  safetyAcceptedAt: string | null;
  /** Last challenge the learner engaged with — a bookmark, not a gate. */
  lastActiveChallengeId: ChallengeId | null;
  challenges: Record<ChallengeId, ChallengeProgress>;
};

export function createInitialProgressState(): ProgressState {
  return {
    schemaVersion: PROGRESS_SCHEMA_VERSION,
    onboardingCompletedAt: null,
    safetyAcceptedAt: null,
    lastActiveChallengeId: null,
    challenges: {},
  };
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === 'string';
}

function isValidChallengeProgress(value: unknown): value is ChallengeProgress {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;

  return (
    CHALLENGE_ATTEMPT_OUTCOMES.includes(candidate.outcome as ChallengeAttemptOutcome) &&
    typeof candidate.updatedAt === 'string'
  );
}

// Structural shape/version check for data coming out of persistence, which
// may be missing, corrupted, or from an unrecognized schema version. This
// is intentionally a small hand-written guard, not a generalized schema
// validation framework.
export function isValidProgressState(value: unknown): value is ProgressState {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;

  if (candidate.schemaVersion !== PROGRESS_SCHEMA_VERSION) return false;
  if (!isNullableString(candidate.onboardingCompletedAt)) return false;
  if (!isNullableString(candidate.safetyAcceptedAt)) return false;
  if (!isNullableString(candidate.lastActiveChallengeId)) return false;
  if (typeof candidate.challenges !== 'object' || candidate.challenges === null) return false;

  return Object.values(candidate.challenges as Record<string, unknown>).every(
    isValidChallengeProgress
  );
}
