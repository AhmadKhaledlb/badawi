import { render } from '@testing-library/react-native';

import { Redirect } from 'expo-router';

import Index from '../index';

const mockUseProgress = jest.fn();

jest.mock('expo-router', () => ({
  Redirect: jest.fn(() => null),
}));

jest.mock('@/state/progress-context', () => ({
  useProgress: () => mockUseProgress(),
}));

describe('Index (root entry routing)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not redirect while progress is not yet hydrated', async () => {
    mockUseProgress.mockReturnValue({
      progress: { onboardingCompletedAt: null },
      isHydrated: false,
    });

    await render(<Index />);

    // No decision — good or bad — was made from the unhydrated default state.
    expect(Redirect).not.toHaveBeenCalled();
  });

  it('redirects to /welcome once hydrated with onboarding not completed', async () => {
    mockUseProgress.mockReturnValue({
      progress: { onboardingCompletedAt: null },
      isHydrated: true,
    });

    await render(<Index />);

    expect(Redirect).toHaveBeenCalledTimes(1);
    expect((Redirect as jest.Mock).mock.calls[0][0]).toEqual(
      expect.objectContaining({ href: '/welcome' })
    );
  });

  it('redirects to /home once hydrated with onboarding completed', async () => {
    mockUseProgress.mockReturnValue({
      progress: { onboardingCompletedAt: '2026-01-01T00:00:00.000Z' },
      isHydrated: true,
    });

    await render(<Index />);

    expect(Redirect).toHaveBeenCalledTimes(1);
    expect((Redirect as jest.Mock).mock.calls[0][0]).toEqual(
      expect.objectContaining({ href: '/home' })
    );
  });
});
