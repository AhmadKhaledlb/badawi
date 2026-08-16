import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

import { AppProviders } from './app-providers';

describe('AppProviders', () => {
  it('renders its children', async () => {
    const { getByText } = await render(
      <AppProviders>
        <Text>content</Text>
      </AppProviders>
    );

    expect(getByText('content')).toBeTruthy();
  });
});
