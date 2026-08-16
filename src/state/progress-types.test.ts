import {
  createInitialProgressState,
  isValidProgressState,
  PROGRESS_SCHEMA_VERSION,
} from './progress-types';

describe('createInitialProgressState', () => {
  it('returns a fresh, empty progress state', () => {
    expect(createInitialProgressState()).toEqual({
      schemaVersion: PROGRESS_SCHEMA_VERSION,
      onboardingCompletedAt: null,
      safetyAcceptedAt: null,
      lastActiveChallengeId: null,
      challenges: {},
    });
  });
});

describe('isValidProgressState', () => {
  it('accepts a freshly created initial state', () => {
    expect(isValidProgressState(createInitialProgressState())).toBe(true);
  });

  it('accepts a populated, well-formed state', () => {
    expect(
      isValidProgressState({
        schemaVersion: PROGRESS_SCHEMA_VERSION,
        onboardingCompletedAt: '2026-01-01T00:00:00.000Z',
        safetyAcceptedAt: null,
        lastActiveChallengeId: 'challenge-placeholder-1',
        challenges: {
          'challenge-placeholder-1': { outcome: 'completed', updatedAt: '2026-01-01T00:00:00.000Z' },
        },
      })
    ).toBe(true);
  });

  it.each([
    ['null', null],
    ['a string', 'not-an-object'],
    ['an array', []],
    ['missing schemaVersion', { ...createInitialProgressState(), schemaVersion: undefined }],
    ['wrong schemaVersion', { ...createInitialProgressState(), schemaVersion: 999 }],
    ['non-string onboardingCompletedAt', { ...createInitialProgressState(), onboardingCompletedAt: 123 }],
    ['non-object challenges', { ...createInitialProgressState(), challenges: 'nope' }],
    [
      'a challenge entry with an invalid outcome',
      {
        ...createInitialProgressState(),
        challenges: { 'challenge-1': { outcome: 'passed', updatedAt: '2026-01-01T00:00:00.000Z' } },
      },
    ],
    [
      'a challenge entry missing updatedAt',
      {
        ...createInitialProgressState(),
        challenges: { 'challenge-1': { outcome: 'completed' } },
      },
    ],
  ])('rejects %s', (_description, value) => {
    expect(isValidProgressState(value)).toBe(false);
  });
});
