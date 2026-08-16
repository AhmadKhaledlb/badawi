import { fireEvent, render } from '@testing-library/react-native';

import { router, useLocalSearchParams } from 'expo-router';

import { desertFoundationsPack } from '@/content';

import ChallengeScreen from '../[challengeId]';

const challengeId = (n: number) => `${desertFoundationsPack.id}-challenge-${n}`;

let mockProgress: { challenges: Record<string, { outcome: string; updatedAt: string }> };
let mockIsHydrated: boolean;

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
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

describe('ChallengeScreen', () => {
  beforeEach(() => {
    mockProgress = { challenges: {} };
    mockIsHydrated = true;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows a not-found state for an unresolvable challenge id', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: 'not-a-real-challenge' });

    const { getByText } = await render(<ChallengeScreen />);

    expect(getByText('Challenge not found')).toBeTruthy();
  });

  it("shows the real Challenge's working title, objective, and locked purpose, with no internal taxonomy codes", async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: challengeId(1) });

    const { getByText, queryByText } = await render(<ChallengeScreen />);

    expect(getByText('First Read')).toBeTruthy();
    expect(getByText(/Slow down and read your surroundings/)).toBeTruthy();
    expect(getByText(/observe before interpreting or acting/)).toBeTruthy();

    // No raw competency/evidence/RK taxonomy codes exposed to learners.
    expect(queryByText(/\bC1\b/)).toBeNull();
    expect(queryByText(/\bEVM2\b/)).toBeNull();
    expect(queryByText(/\bRK1\b/)).toBeNull();
    expect(queryByText(/\bRQ0\b/)).toBeNull();
  });

  it('has no prerequisite line for Challenge 1 (the Pack entry point)', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: challengeId(1) });

    const { queryByText } = await render(<ChallengeScreen />);

    expect(queryByText(/Builds on:/)).toBeNull();
  });

  it('shows resolved prerequisite Challenge titles for orientation only, not as a blocking gate', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: challengeId(2) });

    const { getByText } = await render(<ChallengeScreen />);

    expect(getByText(/Builds on: First Read/)).toBeTruthy();
    expect(getByText(/not a requirement to proceed/)).toBeTruthy();
    // "Continue to Preparation" remains present and enabled regardless.
    expect(getByText('Continue to Preparation')).toBeTruthy();
  });

  it('shows a resolved prerequisite Unit title (not every individual Challenge in that Unit) for a Unit-level prerequisite', async () => {
    // Challenge 6 ("Follow the Shade") depends on all of Unit 1, modeled
    // via prerequisiteUnitIds rather than 5 individual challenge ids.
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: challengeId(6) });

    const { getByText } = await render(<ChallengeScreen />);

    expect(getByText(/Builds on: Reading the Desert/)).toBeTruthy();
  });

  it('shows the curriculum safety-gate class only for a Challenge that carries one (Challenge 27)', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: challengeId(1) });
    const { queryByText: queryByTextCh1 } = await render(<ChallengeScreen />);
    expect(queryByTextCh1(/Curriculum safety gate:/)).toBeNull();

    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: challengeId(27) });
    const { getByText } = await render(<ChallengeScreen />);
    expect(getByText(/Curriculum safety gate: Enhanced Field Gate/)).toBeTruthy();
  });

  it('shows the last recorded attempt outcome and a link to the review, only when one exists', async () => {
    mockProgress = {
      challenges: {
        [challengeId(1)]: { outcome: 'stopped', updatedAt: '2026-01-01T00:00:00.000Z' },
      },
    };
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: challengeId(1) });

    const { getByText } = await render(<ChallengeScreen />);

    expect(getByText(/Last attempt: Stopped/)).toBeTruthy();
    expect(getByText('View last review')).toBeTruthy();
  });

  it('shows no last-attempt line when nothing has been recorded for this Challenge', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: challengeId(1) });

    const { queryByText } = await render(<ChallengeScreen />);

    expect(queryByText(/Last attempt:/)).toBeNull();
    expect(queryByText('View last review')).toBeNull();
  });

  it('navigates to Preparation when Continue is pressed', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: challengeId(1) });

    const { getByText } = await render(<ChallengeScreen />);

    fireEvent.press(getByText('Continue to Preparation'));

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/challenge/[challengeId]/prepare',
      params: { challengeId: challengeId(1) },
    });
  });
});
