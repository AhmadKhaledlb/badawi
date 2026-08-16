import { render, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';

import * as persistence from '@/persistence/progress-storage';

import { ProgressProvider, useProgress } from './progress-context';
import { createInitialProgressState, type ProgressState } from './progress-types';

function ProgressReader() {
  const { progress, isHydrated } = useProgress();
  return (
    <>
      <Text testID="hydrated">{String(isHydrated)}</Text>
      <Text testID="last-active">{progress.lastActiveChallengeId ?? 'none'}</Text>
    </>
  );
}

describe('ProgressProvider hydration', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('does not persist the default initial state over existing progress while hydration is pending', async () => {
    const existingProgress: ProgressState = {
      ...createInitialProgressState(),
      lastActiveChallengeId: 'challenge-placeholder-5',
      challenges: {
        'challenge-placeholder-5': { outcome: 'stopped', updatedAt: '2026-01-01T00:00:00.000Z' },
      },
    };

    let resolveLoad!: (state: ProgressState) => void;
    const pendingLoad = new Promise<ProgressState>((resolve) => {
      resolveLoad = resolve;
    });

    jest.spyOn(persistence, 'loadProgress').mockReturnValue(pendingLoad);
    const saveSpy = jest.spyOn(persistence, 'saveProgress').mockResolvedValue(undefined);

    const { getByTestId } = await render(
      <ProgressProvider>
        <ProgressReader />
      </ProgressProvider>
    );

    // The provider is rendering with the default initial state while
    // hydration is still pending — it must not have persisted that yet.
    expect(getByTestId('hydrated').props.children).toBe('false');
    expect(getByTestId('last-active').props.children).toBe('none');
    expect(saveSpy).not.toHaveBeenCalled();

    resolveLoad(existingProgress);

    await waitFor(() => expect(getByTestId('hydrated').props.children).toBe('true'));

    // The pre-existing persisted progress won — not the default.
    expect(getByTestId('last-active').props.children).toBe('challenge-placeholder-5');

    // No save call happened with the default (null) state at any point.
    expect(saveSpy).not.toHaveBeenCalledWith(
      expect.objectContaining({ lastActiveChallengeId: null })
    );

    // Once hydrated, saving does resume for genuine subsequent state.
    await waitFor(() => expect(saveSpy).toHaveBeenCalledWith(existingProgress));
  });
});
