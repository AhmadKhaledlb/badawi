import { fireEvent, render } from '@testing-library/react-native';

import { router, useLocalSearchParams } from 'expo-router';

import { desertFoundationsPack } from '@/content';

import UnitScreen from '../[unitId]';

const unit1Id = `${desertFoundationsPack.id}-unit-1`;
const challenge1Id = `${desertFoundationsPack.id}-challenge-1`;

let mockProgress: { challenges: Record<string, { outcome: string; updatedAt: string }> };

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
  useLocalSearchParams: jest.fn(),
}));

jest.mock('@/state/progress-context', () => ({
  useProgress: () => ({
    progress: mockProgress,
    isHydrated: true,
    completeOnboarding: jest.fn(),
    acceptSafety: jest.fn(),
    recordChallengeAttempt: jest.fn(),
  }),
}));

describe('UnitScreen', () => {
  beforeEach(() => {
    mockProgress = { challenges: {} };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows a not-found state for an unresolvable unit id', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ unitId: 'not-a-real-unit' });

    const { getByText } = await render(<UnitScreen />);

    expect(getByText('Unit not found')).toBeTruthy();
  });

  it("lists Unit 1's 5 real Challenges in canonical order, with the Unit's title and locked core question/purpose", async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ unitId: unit1Id });

    const { getByText } = await render(<UnitScreen />);

    expect(getByText('Reading the Desert')).toBeTruthy();
    expect(getByText('What am I actually looking at?')).toBeTruthy();
    expect(getByText(/Establish desert literacy/)).toBeTruthy();
    expect(getByText('5 challenges in this unit.')).toBeTruthy();

    const expectedOrder = [
      'First Read',
      'Not All Desert Is the Same',
      'Read the Invisible',
      'The Desert Is Alive',
      'Read Before You Move',
    ];
    for (const title of expectedOrder) {
      expect(getByText(title)).toBeTruthy();
    }
  });

  it('navigates to the correct Challenge route when a Challenge tile is pressed', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ unitId: unit1Id });

    const { getByText } = await render(<UnitScreen />);

    fireEvent.press(getByText('First Read'));

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/challenge/[challengeId]',
      params: { challengeId: challenge1Id },
    });
  });

  it('shows the recorded attempt outcome as the tile subtitle only for attempted Challenges', async () => {
    mockProgress = {
      challenges: {
        [challenge1Id]: { outcome: 'completed', updatedAt: '2026-01-01T00:00:00.000Z' },
      },
    };
    (useLocalSearchParams as jest.Mock).mockReturnValue({ unitId: unit1Id });

    const { getByText, queryByText } = await render(<UnitScreen />);

    expect(getByText('Completed')).toBeTruthy();
    // Challenge 2 has no recorded attempt, so no outcome subtitle for it —
    // and progress does not disable/gate navigation to it.
    expect(getByText('Not All Desert Is the Same')).toBeTruthy();
    expect(queryByText('Stopped')).toBeNull();
    expect(queryByText('Postponed')).toBeNull();
  });

  it('always navigates to every Challenge regardless of recorded progress (no hard progression gate)', async () => {
    mockProgress = { challenges: {} };
    (useLocalSearchParams as jest.Mock).mockReturnValue({ unitId: unit1Id });

    const { getByText } = await render(<UnitScreen />);

    fireEvent.press(getByText('Read Before You Move'));

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/challenge/[challengeId]',
      params: { challengeId: `${desertFoundationsPack.id}-challenge-5` },
    });
  });
});
