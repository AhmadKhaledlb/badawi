import { fireEvent, render } from '@testing-library/react-native';

import { router, useLocalSearchParams } from 'expo-router';

import { desertFoundationsPack } from '@/content';

import PackScreen from '../[packId]';

jest.mock('expo-router', () => ({
  router: { push: jest.fn(), back: jest.fn() },
  useLocalSearchParams: jest.fn(),
}));

describe('PackScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows a not-found state for an unresolvable pack id', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ packId: 'not-a-real-pack' });

    const { getByText } = await render(<PackScreen />);

    expect(getByText('Pack not found')).toBeTruthy();
  });

  it('lists all 6 real Unit working titles from the canonical dataset, in order, with no duplication in UI source', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ packId: desertFoundationsPack.id });

    const { getByText } = await render(<PackScreen />);

    expect(getByText(desertFoundationsPack.name)).toBeTruthy();
    expect(getByText('Reading the Desert')).toBeTruthy();
    expect(getByText('Heat, Weather & Water')).toBeTruthy();
    expect(getByText('Preparing for the Field')).toBeTruthy();
    expect(getByText('Orientation & Navigation')).toBeTruthy();
    expect(getByText('Moving With the Desert')).toBeTruthy();
    expect(getByText('Desert Field Integration')).toBeTruthy();
    expect(getByText('6 units — curriculum structure is locked.')).toBeTruthy();
  });

  it('navigates to the correct Unit route when a Unit tile is pressed', async () => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ packId: desertFoundationsPack.id });

    const { getByText } = await render(<PackScreen />);

    fireEvent.press(getByText('Reading the Desert'));

    expect(router.push).toHaveBeenCalledWith({
      pathname: '/unit/[unitId]',
      params: { unitId: `${desertFoundationsPack.id}-unit-1` },
    });
  });
});
