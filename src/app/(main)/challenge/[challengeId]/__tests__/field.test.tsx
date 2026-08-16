import { fireEvent, render } from '@testing-library/react-native';

import { Redirect, router, Stack, useLocalSearchParams } from 'expo-router';
import { BackHandler } from 'react-native';

import FieldScreen from '../field';

const mockRecordChallengeAttempt = jest.fn();
let mockProgress: { safetyAcceptedAt: string | null };
let mockIsHydrated: boolean;

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn(), replace: jest.fn() },
  useLocalSearchParams: jest.fn(),
  Redirect: jest.fn(() => null),
  Stack: { Screen: jest.fn(() => null) },
}));

jest.mock('@/state/progress-context', () => ({
  useProgress: () => ({
    progress: mockProgress,
    isHydrated: mockIsHydrated,
    completeOnboarding: jest.fn(),
    acceptSafety: jest.fn(),
    recordChallengeAttempt: mockRecordChallengeAttempt,
  }),
}));

describe('ChallengeFieldScreen (Field Mode)', () => {
  beforeEach(() => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ challengeId: 'desert-foundations-challenge-1' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('makes no gate decision while progress is not yet hydrated', async () => {
    mockIsHydrated = false;
    mockProgress = { safetyAcceptedAt: null };

    await render(<FieldScreen />);

    expect(Redirect).not.toHaveBeenCalled();
  });

  it('redirects to safety acceptance, with a returnTo back to this challenge, when safety has not been accepted', async () => {
    mockIsHydrated = true;
    mockProgress = { safetyAcceptedAt: null };

    await render(<FieldScreen />);

    expect(Redirect).toHaveBeenCalledTimes(1);
    expect((Redirect as jest.Mock).mock.calls[0][0]).toEqual(
      expect.objectContaining({
        href: {
          pathname: '/safety/acceptance',
          params: { returnTo: '/challenge/desert-foundations-challenge-1/field' },
        },
      })
    );
  });

  it('renders the Field Mode shell (no fabricated field content) once safety is accepted', async () => {
    mockIsHydrated = true;
    mockProgress = { safetyAcceptedAt: '2026-01-01T00:00:00.000Z' };

    const { getByText } = await render(<FieldScreen />);

    expect(Redirect).not.toHaveBeenCalled();
    expect(getByText('Field Mode')).toBeTruthy();
    expect(getByText(/has not yet been authored/)).toBeTruthy();
  });

  it('records a "completed" outcome and moves to review when Complete is pressed', async () => {
    mockIsHydrated = true;
    mockProgress = { safetyAcceptedAt: '2026-01-01T00:00:00.000Z' };

    const { getByText } = await render(<FieldScreen />);

    fireEvent.press(getByText('Complete'));

    expect(mockRecordChallengeAttempt).toHaveBeenCalledWith('desert-foundations-challenge-1', 'completed');
    expect(router.replace).toHaveBeenCalledWith({
      pathname: '/challenge/[challengeId]/review',
      params: { challengeId: 'desert-foundations-challenge-1' },
    });
  });

  it('records a "stopped" outcome — not a failure — and moves to review when Stop is pressed', async () => {
    mockIsHydrated = true;
    mockProgress = { safetyAcceptedAt: '2026-01-01T00:00:00.000Z' };

    const { getByText } = await render(<FieldScreen />);

    fireEvent.press(getByText('Stop'));

    expect(mockRecordChallengeAttempt).toHaveBeenCalledWith('desert-foundations-challenge-1', 'stopped');
    expect(router.replace).toHaveBeenCalledWith({
      pathname: '/challenge/[challengeId]/review',
      params: { challengeId: 'desert-foundations-challenge-1' },
    });
  });

  it('does not render a generic Back affordance in Field Mode', async () => {
    mockIsHydrated = true;
    mockProgress = { safetyAcceptedAt: '2026-01-01T00:00:00.000Z' };

    const { queryByText } = await render(<FieldScreen />);

    expect(queryByText('Back')).toBeNull();
  });

  describe('generic back prevention (navigation configuration)', () => {
    it('disables the native-stack swipe-back gesture while Field Mode is active', async () => {
      mockIsHydrated = true;
      mockProgress = { safetyAcceptedAt: '2026-01-01T00:00:00.000Z' };

      await render(<FieldScreen />);

      expect(Stack.Screen).toHaveBeenCalledTimes(1);
      expect((Stack.Screen as unknown as jest.Mock).mock.calls[0][0]).toEqual(
        expect.objectContaining({ options: expect.objectContaining({ gestureEnabled: false }) })
      );
    });

    it('does not touch gesture configuration before Field Mode is actually active (not hydrated)', async () => {
      mockIsHydrated = false;
      mockProgress = { safetyAcceptedAt: null };

      await render(<FieldScreen />);

      expect(Stack.Screen).not.toHaveBeenCalled();
    });

    it('registers an Android hardware-back handler that swallows the event while Field Mode is active', async () => {
      mockIsHydrated = true;
      mockProgress = { safetyAcceptedAt: '2026-01-01T00:00:00.000Z' };
      const addListenerSpy = jest.spyOn(BackHandler, 'addEventListener');

      await render(<FieldScreen />);

      expect(addListenerSpy).toHaveBeenCalledWith('hardwareBackPress', expect.any(Function));
      const handler = addListenerSpy.mock.calls[0][1];
      // Returning true tells React Native the press was handled — i.e. no
      // default "pop the screen" behavior occurs.
      expect(handler(undefined as never)).toBe(true);
    });

    it('does not register a hardware-back handler before Field Mode is actually active (safety not yet accepted)', async () => {
      mockIsHydrated = true;
      mockProgress = { safetyAcceptedAt: null };
      const addListenerSpy = jest.spyOn(BackHandler, 'addEventListener');

      await render(<FieldScreen />);

      expect(addListenerSpy).not.toHaveBeenCalled();
    });
  });
});
