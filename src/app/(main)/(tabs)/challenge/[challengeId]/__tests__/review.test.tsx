import { render } from '@testing-library/react-native';

import { useLocalSearchParams } from 'expo-router';

import ReviewScreen from '../review';

let mockProgress: { challenges: Record<string, { outcome: string; updatedAt: string }> };
let mockIsHydrated: boolean;

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn(), replace: jest.fn() },
  useLocalSearchParams: jest.fn(),
}));

jest.mock('@/state/progress-context', () => ({
  useProgress: () => ({
    progress: mockProgress,
    isHydrated: mockIsHydrated,
    completeOnboarding: jest.fn(),
    acceptSafety: jest.fn(),
    recordChallengeAttempt: jest.fn(),
  }),
}));

describe('ChallengeReviewScreen', () => {
  beforeEach(() => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: 'desert-foundations-challenge-1' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing decisive while progress is not yet hydrated', async () => {
    mockIsHydrated = false;
    mockProgress = { challenges: {} };

    const { queryByText } = await render(<ReviewScreen />);

    expect(queryByText(/No attempt has been recorded/)).toBeNull();
    expect(queryByText(/Outcome:/)).toBeNull();
  });

  it('shows "no attempt recorded" when nothing is saved for this challenge', async () => {
    mockIsHydrated = true;
    mockProgress = { challenges: {} };

    const { getByText } = await render(<ReviewScreen />);

    expect(getByText('No attempt has been recorded yet for this challenge.')).toBeTruthy();
  });

  it.each([
    ['completed', 'Completed'],
    ['stopped', 'Stopped'],
    ['postponed', 'Postponed'],
    ['refused', 'Refused'],
  ])('renders the recorded "%s" outcome neutrally as "%s"', async (outcome, label) => {
    mockIsHydrated = true;
    mockProgress = {
      challenges: {
        'desert-foundations-challenge-1': { outcome, updatedAt: '2026-01-01T00:00:00.000Z' },
      },
    };

    const { getByText } = await render(<ReviewScreen />);

    expect(getByText(`Outcome: ${label}`)).toBeTruthy();
  });

  it('keeps the recorded outcome explicitly separate from any competency assessment', async () => {
    mockIsHydrated = true;
    mockProgress = {
      challenges: {
        'desert-foundations-challenge-1': { outcome: 'completed', updatedAt: '2026-01-01T00:00:00.000Z' },
      },
    };

    const { getByText, queryByText } = await render(<ReviewScreen />);

    expect(getByText(/not a competency assessment/)).toBeTruthy();
    expect(queryByText(/Demonstrated/)).toBeNull();
    expect(queryByText(/Developing/)).toBeNull();
  });

  it('shows a placeholder reflection note (research status RQ0) rather than inventing prompts', async () => {
    mockIsHydrated = true;
    mockProgress = {
      challenges: {
        'desert-foundations-challenge-1': { outcome: 'completed', updatedAt: '2026-01-01T00:00:00.000Z' },
      },
    };

    const { getByText } = await render(<ReviewScreen />);

    expect(
      getByText(/Reflection content for this challenge has not yet been authored or safety-reviewed/)
    ).toBeTruthy();
    expect(getByText(/unresearched/)).toBeTruthy();
  });
});
