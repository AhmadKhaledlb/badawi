import AsyncStorage from '@react-native-async-storage/async-storage';

import { createInitialProgressState, PROGRESS_SCHEMA_VERSION, type ProgressState } from '@/state/progress-types';

import { loadProgress, PROGRESS_STORAGE_KEY, saveProgress } from './progress-storage';

describe('progress persistence', () => {
  afterEach(async () => {
    await AsyncStorage.clear();
  });

  it('loadProgress returns a fresh initial state when nothing is stored', async () => {
    const result = await loadProgress();
    expect(result).toEqual(createInitialProgressState());
  });

  it('round-trips a saved progress state', async () => {
    const state: ProgressState = {
      schemaVersion: PROGRESS_SCHEMA_VERSION,
      onboardingCompletedAt: '2026-01-01T00:00:00.000Z',
      safetyAcceptedAt: '2026-01-01T00:00:00.000Z',
      lastActiveChallengeId: 'challenge-placeholder-3',
      challenges: {
        'challenge-placeholder-3': { outcome: 'stopped', updatedAt: '2026-01-02T00:00:00.000Z' },
      },
    };

    await saveProgress(state);
    const loaded = await loadProgress();

    expect(loaded).toEqual(state);
  });

  it('recovers a fresh initial state if the stored value is not valid JSON', async () => {
    await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, 'this is not json{{{');

    const result = await loadProgress();

    expect(result).toEqual(createInitialProgressState());
  });

  it('recovers a fresh initial state if the stored value is valid JSON but the wrong shape', async () => {
    await AsyncStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify({ some: 'unrelated data' }));

    const result = await loadProgress();

    expect(result).toEqual(createInitialProgressState());
  });

  it('recovers a fresh initial state if the stored schema version is unrecognized', async () => {
    await AsyncStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({ ...createInitialProgressState(), schemaVersion: 999 })
    );

    const result = await loadProgress();

    expect(result).toEqual(createInitialProgressState());
  });

  it('does not throw even if the storage read itself fails', async () => {
    const getItemSpy = jest
      .spyOn(AsyncStorage, 'getItem')
      .mockRejectedValueOnce(new Error('storage unavailable'));

    await expect(loadProgress()).resolves.toEqual(createInitialProgressState());

    getItemSpy.mockRestore();
  });
});
