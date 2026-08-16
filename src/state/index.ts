export {
  CHALLENGE_ATTEMPT_OUTCOMES,
  createInitialProgressState,
  isValidProgressState,
  PROGRESS_SCHEMA_VERSION,
} from './progress-types';
export type { ChallengeAttemptOutcome, ChallengeProgress, ProgressState } from './progress-types';

export { progressReducer } from './progress-reducer';
export type { ProgressAction } from './progress-reducer';

export { ProgressProvider, useProgress } from './progress-context';
