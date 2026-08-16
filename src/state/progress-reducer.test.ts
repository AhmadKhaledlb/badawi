import { progressReducer } from './progress-reducer';
import { createInitialProgressState, type ProgressState } from './progress-types';

describe('progressReducer', () => {
  it('HYDRATE replaces the entire state', () => {
    const hydrated: ProgressState = {
      ...createInitialProgressState(),
      onboardingCompletedAt: '2026-01-01T00:00:00.000Z',
    };

    const result = progressReducer(createInitialProgressState(), { type: 'HYDRATE', state: hydrated });

    expect(result).toBe(hydrated);
  });

  it('COMPLETE_ONBOARDING records the completion time', () => {
    const result = progressReducer(createInitialProgressState(), {
      type: 'COMPLETE_ONBOARDING',
      occurredAt: '2026-01-01T00:00:00.000Z',
    });

    expect(result.onboardingCompletedAt).toBe('2026-01-01T00:00:00.000Z');
  });

  it('COMPLETE_ONBOARDING is idempotent — it does not overwrite an existing completion time', () => {
    const alreadyCompleted: ProgressState = {
      ...createInitialProgressState(),
      onboardingCompletedAt: '2026-01-01T00:00:00.000Z',
    };

    const result = progressReducer(alreadyCompleted, {
      type: 'COMPLETE_ONBOARDING',
      occurredAt: '2026-06-01T00:00:00.000Z',
    });

    expect(result.onboardingCompletedAt).toBe('2026-01-01T00:00:00.000Z');
  });

  it('ACCEPT_SAFETY records the acceptance time and is idempotent', () => {
    const first = progressReducer(createInitialProgressState(), {
      type: 'ACCEPT_SAFETY',
      occurredAt: '2026-01-01T00:00:00.000Z',
    });
    expect(first.safetyAcceptedAt).toBe('2026-01-01T00:00:00.000Z');

    const second = progressReducer(first, {
      type: 'ACCEPT_SAFETY',
      occurredAt: '2026-06-01T00:00:00.000Z',
    });
    expect(second.safetyAcceptedAt).toBe('2026-01-01T00:00:00.000Z');
  });

  it.each(['completed', 'stopped', 'postponed', 'refused'] as const)(
    'RECORD_CHALLENGE_ATTEMPT records a "%s" outcome without treating it as a competence assessment',
    (outcome) => {
      const result = progressReducer(createInitialProgressState(), {
        type: 'RECORD_CHALLENGE_ATTEMPT',
        challengeId: 'challenge-1',
        outcome,
        occurredAt: '2026-01-01T00:00:00.000Z',
      });

      expect(result.challenges['challenge-1']).toEqual({
        outcome,
        updatedAt: '2026-01-01T00:00:00.000Z',
      });
      // No pass/fail/score/competence field exists anywhere on the stored record.
      expect(Object.keys(result.challenges['challenge-1'])).toEqual(['outcome', 'updatedAt']);
    }
  );

  it('RECORD_CHALLENGE_ATTEMPT updates lastActiveChallengeId', () => {
    const result = progressReducer(createInitialProgressState(), {
      type: 'RECORD_CHALLENGE_ATTEMPT',
      challengeId: 'challenge-7',
      outcome: 'stopped',
      occurredAt: '2026-01-01T00:00:00.000Z',
    });

    expect(result.lastActiveChallengeId).toBe('challenge-7');
  });

  it('a later RECORD_CHALLENGE_ATTEMPT for the same challenge replaces its prior outcome (e.g. postponed → completed)', () => {
    const postponed = progressReducer(createInitialProgressState(), {
      type: 'RECORD_CHALLENGE_ATTEMPT',
      challengeId: 'challenge-1',
      outcome: 'postponed',
      occurredAt: '2026-01-01T00:00:00.000Z',
    });

    const completed = progressReducer(postponed, {
      type: 'RECORD_CHALLENGE_ATTEMPT',
      challengeId: 'challenge-1',
      outcome: 'completed',
      occurredAt: '2026-02-01T00:00:00.000Z',
    });

    expect(completed.challenges['challenge-1']).toEqual({
      outcome: 'completed',
      updatedAt: '2026-02-01T00:00:00.000Z',
    });
  });

  it('recording an attempt for one challenge does not affect another challenge already recorded', () => {
    const first = progressReducer(createInitialProgressState(), {
      type: 'RECORD_CHALLENGE_ATTEMPT',
      challengeId: 'challenge-1',
      outcome: 'completed',
      occurredAt: '2026-01-01T00:00:00.000Z',
    });

    const second = progressReducer(first, {
      type: 'RECORD_CHALLENGE_ATTEMPT',
      challengeId: 'challenge-2',
      outcome: 'refused',
      occurredAt: '2026-01-02T00:00:00.000Z',
    });

    expect(second.challenges['challenge-1']).toEqual({
      outcome: 'completed',
      updatedAt: '2026-01-01T00:00:00.000Z',
    });
    expect(second.challenges['challenge-2']).toEqual({
      outcome: 'refused',
      updatedAt: '2026-01-02T00:00:00.000Z',
    });
  });
});
