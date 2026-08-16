import type { ChallengeAttemptOutcome } from '@/state';

// Neutral, non-judgmental labels for a recorded attempt outcome — shared
// by every screen that displays one, so the wording (and the "stopping is
// not failure" framing behind it) stays in exactly one place.
// docs/safety/README.md: stopping, modifying, postponing, or refusing a
// challenge may demonstrate competence and must never read as failure.
// This is ONLY what happened during an attempt — never a competency claim.
export const OUTCOME_LABELS: Record<ChallengeAttemptOutcome, string> = {
  completed: 'Completed',
  stopped: 'Stopped',
  postponed: 'Postponed',
  refused: 'Refused',
};
