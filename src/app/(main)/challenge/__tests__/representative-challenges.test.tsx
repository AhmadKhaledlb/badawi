import { render } from '@testing-library/react-native';

import { useLocalSearchParams } from 'expo-router';

import { desertFoundationsPack } from '@/content';

import ChallengeScreen from '../[challengeId]';
import FieldScreen from '../[challengeId]/field';
import PrepareScreen from '../[challengeId]/prepare';
import ReviewScreen from '../[challengeId]/review';

// 5C.3 end-to-end verification: exercises the full Challenge → Preparation
// → Field Mode → Review chain for four representative Challenges spanning
// the Pack (an early one, a mid-Pack one with a cross-Unit prerequisite,
// the SG2-gated final field Challenge, and the final reflection
// Challenge). Per-screen unit tests elsewhere already cover Challenge 1
// and Challenge 27 individually; this file's job is specifically to catch
// a dataset regression that breaks rendering for a Challenge nothing else
// exercises through the actual screens (e.g. Challenge 28, which has no
// `sourceRequirementsNote` and is never otherwise screen-tested, and
// Challenge 15, whose prerequisite spans three whole Units).
jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn(), replace: jest.fn() },
  useLocalSearchParams: jest.fn(),
  Redirect: jest.fn(() => null),
  Stack: { Screen: jest.fn(() => null) },
}));

jest.mock('@/state/progress-context', () => ({
  useProgress: () => ({
    progress: { challenges: {}, safetyAcceptedAt: '2026-01-01T00:00:00.000Z' },
    isHydrated: true,
    completeOnboarding: jest.fn(),
    acceptSafety: jest.fn(),
    recordChallengeAttempt: jest.fn(),
  }),
}));

const id = (n: number) => `${desertFoundationsPack.id}-challenge-${n}`;

describe.each([
  { n: 1, title: 'First Read' },
  { n: 15, title: 'Find Your Bearings' },
  { n: 27, title: 'The Field Challenge' },
  { n: 28, title: 'Read It Again' },
])('Challenge $n ($title) renders through the full screen chain', ({ n, title }) => {
  beforeEach(() => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: id(n) });
  });

  it('Challenge screen shows the real title and a working Continue action', async () => {
    const { getByText } = await render(<ChallengeScreen />);
    expect(getByText(title)).toBeTruthy();
    expect(getByText('Continue to Preparation')).toBeTruthy();
  });

  it('Preparation screen shows the real title and preserves Continue/Postpone/Refuse', async () => {
    const { getByText } = await render(<PrepareScreen />);
    expect(getByText(`Prepare: ${title}`)).toBeTruthy();
    expect(getByText('Continue to Field Mode')).toBeTruthy();
    expect(getByText('Postpone')).toBeTruthy();
    expect(getByText('Refuse')).toBeTruthy();
  });

  it('Field Mode shows the real Challenge identity with Complete/Stop as the only exits', async () => {
    const { getByText, queryByText } = await render(<FieldScreen />);
    expect(getByText('Field Mode')).toBeTruthy();
    expect(getByText(title)).toBeTruthy();
    expect(getByText('Complete')).toBeTruthy();
    expect(getByText('Stop')).toBeTruthy();
    expect(queryByText('Back')).toBeNull();
  });

  it('Review screen shows the real title', async () => {
    const { getByText } = await render(<ReviewScreen />);
    expect(getByText(`Review: ${title}`)).toBeTruthy();
  });
});

describe('Challenge-specific fidelity among the four representative Challenges', () => {
  it('shows the SG2 safety-gate label only for Challenge 27', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: id(27) });
    const gated = await render(<ChallengeScreen />);
    expect(gated.getByText(/Curriculum safety gate: Enhanced Field Gate/)).toBeTruthy();
  });

  it.each([1, 15, 28])('shows no safety-gate label for ungated Challenge %i', async (n) => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: id(n) });
    const { queryByText } = await render(<ChallengeScreen />);
    expect(queryByText(/Curriculum safety gate:/)).toBeNull();
  });

  it("resolves Challenge 15's cross-Unit prerequisite (Units 1–3) to real Unit titles, not individual Challenge ids", async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: id(15) });
    const { getByText } = await render(<ChallengeScreen />);
    expect(
      getByText(
        'Builds on: Reading the Desert, Heat, Weather & Water, Preparing for the Field. This is curriculum context, not a requirement to proceed.'
      )
    ).toBeTruthy();
  });
});
