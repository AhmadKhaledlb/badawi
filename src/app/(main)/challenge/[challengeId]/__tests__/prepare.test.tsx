import { fireEvent, render } from '@testing-library/react-native';

import { router, useLocalSearchParams } from 'expo-router';

import PrepareScreen from '../prepare';

const mockRecordChallengeAttempt = jest.fn();

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
  useLocalSearchParams: jest.fn(),
}));

jest.mock('@/state/progress-context', () => ({
  useProgress: () => ({
    progress: {},
    isHydrated: true,
    completeOnboarding: jest.fn(),
    acceptSafety: jest.fn(),
    recordChallengeAttempt: mockRecordChallengeAttempt,
  }),
}));

describe('ChallengePrepareScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows a not-found state for an unresolvable challenge id, with no attempt recorded', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: 'not-a-real-challenge' });

    const { getByText } = await render(<PrepareScreen />);

    expect(getByText('Challenge not found')).toBeTruthy();
    expect(mockRecordChallengeAttempt).not.toHaveBeenCalled();
  });

  it("shows the real Challenge's working objective and an honest, RQ0-aware pending note", async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: 'desert-foundations-challenge-1' });

    const { getByText } = await render(<PrepareScreen />);

    expect(getByText('Prepare: First Read')).toBeTruthy();
    expect(getByText(/Slow down and read your surroundings/)).toBeTruthy();
    expect(getByText(/Preparation content for this challenge has not yet been authored/)).toBeTruthy();
  });

  it('shows the curriculum safety-gate note only for a Challenge that carries one (Challenge 27)', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: 'desert-foundations-challenge-27' });

    const { getByText } = await render(<PrepareScreen />);

    expect(getByText(/Curriculum safety gate: Enhanced Field Gate/)).toBeTruthy();
  });

  it('records a "postponed" outcome — not a failure — and returns, when Postpone is pressed', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: 'desert-foundations-challenge-1' });

    const { getByText } = await render(<PrepareScreen />);

    fireEvent.press(getByText('Postpone'));

    expect(mockRecordChallengeAttempt).toHaveBeenCalledWith('desert-foundations-challenge-1', 'postponed');
    expect(router.back).toHaveBeenCalledTimes(1);
  });

  it('records a "refused" outcome — not a failure — and returns, when Refuse is pressed', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: 'desert-foundations-challenge-1' });

    const { getByText } = await render(<PrepareScreen />);

    fireEvent.press(getByText('Refuse'));

    expect(mockRecordChallengeAttempt).toHaveBeenCalledWith('desert-foundations-challenge-1', 'refused');
    expect(router.back).toHaveBeenCalledTimes(1);
  });

  it('navigates to Field Mode when Continue is pressed, without recording an outcome', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: 'desert-foundations-challenge-1' });

    const { getByText } = await render(<PrepareScreen />);

    fireEvent.press(getByText('Continue to Field Mode'));

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/challenge/[challengeId]/field',
      params: { challengeId: 'desert-foundations-challenge-1' },
    });
    expect(mockRecordChallengeAttempt).not.toHaveBeenCalled();
  });
});
