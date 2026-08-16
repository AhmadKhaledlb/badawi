import type { ChallengeId } from '@/domain/challenge';

import type { ChallengeAttemptOutcome, ProgressState } from './progress-types';

export type ProgressAction =
  | { type: 'HYDRATE'; state: ProgressState }
  | { type: 'COMPLETE_ONBOARDING'; occurredAt: string }
  | { type: 'ACCEPT_SAFETY'; occurredAt: string }
  | {
      type: 'RECORD_CHALLENGE_ATTEMPT';
      challengeId: ChallengeId;
      outcome: ChallengeAttemptOutcome;
      occurredAt: string;
    };

// Pure by design — callers supply `occurredAt` rather than the reducer
// reading the clock, so transitions stay trivially testable.
export function progressReducer(state: ProgressState, action: ProgressAction): ProgressState {
  switch (action.type) {
    case 'HYDRATE':
      return action.state;

    case 'COMPLETE_ONBOARDING':
      return state.onboardingCompletedAt
        ? state
        : { ...state, onboardingCompletedAt: action.occurredAt };

    case 'ACCEPT_SAFETY':
      return state.safetyAcceptedAt ? state : { ...state, safetyAcceptedAt: action.occurredAt };

    case 'RECORD_CHALLENGE_ATTEMPT':
      return {
        ...state,
        lastActiveChallengeId: action.challengeId,
        challenges: {
          ...state.challenges,
          [action.challengeId]: { outcome: action.outcome, updatedAt: action.occurredAt },
        },
      };

    default:
      return state;
  }
}
