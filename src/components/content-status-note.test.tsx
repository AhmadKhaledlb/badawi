import { render } from '@testing-library/react-native';

import type { ResearchQualityId } from '@/domain';

import { ContentStatusNote } from './content-status-note';

describe('ContentStatusNote', () => {
  it.each<[Exclude<ResearchQualityId, 'RQ4'>, string]>([
    ['RQ0', 'unresearched'],
    ['RQ1', 'research in progress'],
    ['RQ2', 'verified, pending review'],
    ['RQ3', 'reviewed, pending final approval'],
  ])('renders a pending note naming the area and the plain-language status for %s', async (status, label) => {
    const { getByText } = await render(<ContentStatusNote researchStatus={status} area="field" />);

    expect(getByText(new RegExp(`Field content .* has not yet been authored`))).toBeTruthy();
    expect(getByText(new RegExp(label))).toBeTruthy();
  });

  it('renders nothing once content reaches RQ4 (Production Approved)', async () => {
    const { queryByText, toJSON } = await render(
      <ContentStatusNote researchStatus="RQ4" area="field" />
    );

    expect(queryByText(/has not yet been authored/)).toBeNull();
    expect(toJSON()).toBeNull();
  });

  it('never renders the raw research-status code to the learner', async () => {
    const { queryByText } = await render(<ContentStatusNote researchStatus="RQ0" area="task" />);

    expect(queryByText(/\bRQ0\b/)).toBeNull();
  });
});
