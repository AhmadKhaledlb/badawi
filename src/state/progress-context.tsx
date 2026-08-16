import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';

import type { ChallengeId } from '@/domain/challenge';
import { loadProgress, saveProgress } from '@/persistence/progress-storage';

import { progressReducer } from './progress-reducer';
import {
  createInitialProgressState,
  type ChallengeAttemptOutcome,
  type ProgressState,
} from './progress-types';

type ProgressContextValue = {
  progress: ProgressState;
  /** False until the persisted state has been loaded (or found absent). */
  isHydrated: boolean;
  completeOnboarding: () => void;
  acceptSafety: () => void;
  recordChallengeAttempt: (challengeId: ChallengeId, outcome: ChallengeAttemptOutcome) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: PropsWithChildren) {
  const [progress, dispatch] = useReducer(progressReducer, undefined, createInitialProgressState);
  const [isHydrated, setIsHydrated] = useState(false);

  // A ref, not the `isHydrated` state value, guards persistence below.
  // It is set synchronously the instant hydration resolves, so the guard
  // can never be stale — it doesn't depend on whether the HYDRATE dispatch
  // and setIsHydrated happen to be batched into the same render.
  const hasHydratedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    loadProgress()
      .then((state) => {
        if (cancelled) return;
        hasHydratedRef.current = true;
        dispatch({ type: 'HYDRATE', state });
        setIsHydrated(true);
      })
      .catch((error) => {
        if (cancelled) return;
        // loadProgress() itself already falls back to the initial state on
        // any read/parse/validation failure and should not normally
        // reject — this is defense in depth. Progress is already the
        // valid initial state from useReducer's lazy init, so there is
        // nothing to dispatch; only unblock persistence.
        console.warn('BADAWI: failed to hydrate progress; using initial state', error);
        hasHydratedRef.current = true;
        setIsHydrated(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // Guards against persisting the in-memory default state over
    // existing saved progress before hydration has actually completed.
    if (!hasHydratedRef.current) return;

    saveProgress(progress).catch((error) => {
      console.warn('BADAWI: failed to persist progress', error);
    });
  }, [progress]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      isHydrated,
      completeOnboarding: () =>
        dispatch({ type: 'COMPLETE_ONBOARDING', occurredAt: new Date().toISOString() }),
      acceptSafety: () =>
        dispatch({ type: 'ACCEPT_SAFETY', occurredAt: new Date().toISOString() }),
      recordChallengeAttempt: (challengeId, outcome) =>
        dispatch({
          type: 'RECORD_CHALLENGE_ATTEMPT',
          challengeId,
          outcome,
          occurredAt: new Date().toISOString(),
        }),
    }),
    [progress, isHydrated]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
