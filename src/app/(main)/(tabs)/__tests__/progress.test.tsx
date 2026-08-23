import AsyncStorage from '@react-native-async-storage/async-storage';
import { render } from '@testing-library/react-native';

import { challenges, findUnitById, units } from '@/content';
import { PROGRESS_STORAGE_KEY } from '@/persistence/progress-storage';
import { ProgressProvider } from '@/state/progress-context';
import { PROGRESS_SCHEMA_VERSION } from '@/state/progress-types';

import ProgressScreen from '../progress';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn(), navigate: jest.fn() },
}));

describe('ProgressScreen', () => {
  afterEach(async () => {
    await AsyncStorage.clear();
  });

  it('shows the honest empty state with no attempts recorded', async () => {
    const { findByText, getByText } = await render(
      <ProgressProvider>
        <ProgressScreen />
      </ProgressProvider>
    );

    expect(await findByText('No challenges attempted yet.')).toBeTruthy();
    // Every real Unit name renders in the journey list.
    for (const unit of units) {
      expect(getByText(unit.name)).toBeTruthy();
    }
    // Every real capability domain short label renders.
    expect(getByText('Observation')).toBeTruthy();
    expect(getByText('Safety')).toBeTruthy();
    expect(getByText('0 of 6 areas practiced through completed challenges.')).toBeTruthy();
  });

  it('shows real recorded activity and practiced capability areas', async () => {
    const first = challenges[0];
    await AsyncStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({
        schemaVersion: PROGRESS_SCHEMA_VERSION,
        onboardingCompletedAt: '2026-01-01T00:00:00.000Z',
        safetyAcceptedAt: null,
        lastActiveChallengeId: first.id,
        challenges: {
          [first.id]: { outcome: 'completed', updatedAt: '2026-01-02T00:00:00.000Z' },
        },
      })
    );

    const { findByText, getByText } = await render(
      <ProgressProvider>
        <ProgressScreen />
      </ProgressProvider>
    );

    const firstUnit = findUnitById(first.unitId);
    expect(await findByText(first.name)).toBeTruthy();
    expect(getByText(`Completed · ${firstUnit!.name}`)).toBeTruthy();
    expect(getByText('1 of 28')).toBeTruthy();
    // The first challenge's real primary competency domains are now
    // "Practiced" — confirms the union-of-completed-challenges computation
    // actually runs against seeded real progress, not just the empty path.
    const practicedCount = new Set(first.competency.primary).size;
    expect(
      getByText(`${practicedCount} of 6 areas practiced through completed challenges.`)
    ).toBeTruthy();
  });
});
