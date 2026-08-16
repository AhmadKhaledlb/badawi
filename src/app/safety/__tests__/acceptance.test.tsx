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
});
