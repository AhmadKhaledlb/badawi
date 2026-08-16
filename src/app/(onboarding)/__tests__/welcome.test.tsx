import { fireEvent, render } from '@testing-library/react-native';

import { router } from 'expo-router';

import WelcomeScreen from '../welcome';

const mockCompleteOnboarding = jest.fn();

jest.mock('expo-router', () => ({
  router: { replace: jest.fn() },
}));

jest.mock('@/state/progress-context', () => ({
  useProgress: () => ({
    progress: {},
    isHydrated: true,
    completeOnboarding: mockCompleteOnboarding,
    acceptSafety: jest.fn(),
    recordChallengeAttempt: jest.fn(),
  }),
}));

describe('WelcomeScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('completes onboarding and navigates to home when the CTA is pressed', async () => {
    const { getByText } = await render(<WelcomeScreen />);

    fireEvent.press(getByText('Get Started'));

    expect(mockCompleteOnboarding).toHaveBeenCalledTimes(1);
    expect(router.replace).toHaveBeenCalledWith('/home');
  });
});
