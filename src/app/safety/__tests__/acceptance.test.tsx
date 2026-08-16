import { fireEvent, render } from '@testing-library/react-native';

import { router, useLocalSearchParams } from 'expo-router';

import SafetyAcceptanceScreen from '../acceptance';

const mockAcceptSafety = jest.fn();

jest.mock('expo-router', () => ({
  router: { replace: jest.fn() },
  useLocalSearchParams: jest.fn(),
}));

jest.mock('@/state/progress-context', () => ({
  useProgress: () => ({
    progress: {},
    isHydrated: true,
    completeOnboarding: jest.fn(),
    acceptSafety: mockAcceptSafety,
    recordChallengeAttempt: jest.fn(),
  }),
}));

describe('SafetyAcceptanceScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not fabricate safety copy — states the content is pending', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({});

    const { getByText } = await render(<SafetyAcceptanceScreen />);

    expect(
      getByText(/Safety acceptance content has not yet been authored or approved/)
    ).toBeTruthy();
  });

  it('records acceptance and returns to the requested destination when provided', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      returnTo: '/challenge/challenge-placeholder-1/field',
    });

    const { getByText } = await render(<SafetyAcceptanceScreen />);

    fireEvent.press(getByText('Continue'));

    expect(mockAcceptSafety).toHaveBeenCalledTimes(1);
    expect(router.replace).toHaveBeenCalledWith('/challenge/challenge-placeholder-1/field');
  });

  it('falls back to /home when no returnTo destination is provided', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({});

    const { getByText } = await render(<SafetyAcceptanceScreen />);

    fireEvent.press(getByText('Continue'));

    expect(mockAcceptSafety).toHaveBeenCalledTimes(1);
    expect(router.replace).toHaveBeenCalledWith('/home');
  });

  it('names the real Challenge and makes explicit that this generic acceptance is not challenge-specific verification', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      returnTo: '/challenge/desert-foundations-challenge-1/field',
      challengeId: 'desert-foundations-challenge-1',
    });

    const { getByText } = await render(<SafetyAcceptanceScreen />);

    expect(getByText(/You are about to enter Field Mode for: First Read/)).toBeTruthy();
    expect(
      getByText(/does not mean the field or safety content for this specific challenge has been/)
    ).toBeTruthy();
  });

  it('shows no challenge-specific caveat when no challengeId is provided', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ returnTo: '/home' });

    const { queryByText } = await render(<SafetyAcceptanceScreen />);

    expect(queryByText(/You are about to enter Field Mode for:/)).toBeNull();
  });
});
