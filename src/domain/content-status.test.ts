import { working, type WorkingCopyText } from './content-status';

describe('content status — locked vs working copy distinction', () => {
  it('working() returns the string unchanged at runtime, so existing UI can render it as-is', () => {
    expect(working('First Read')).toBe('First Read');
    expect(typeof working('First Read')).toBe('string');
  });

  it('requires the working() helper to produce a WorkingCopyText (regression-checked by `npx tsc --noEmit`)', () => {
    // @ts-expect-error a bare string literal must not satisfy WorkingCopyText directly —
    // if this line stops erroring, the brand has been silently weakened and this test
    // will fail type-checking (an unused @ts-expect-error is itself a compile error).
    const notWrapped: WorkingCopyText = 'First Read';

    expect(typeof notWrapped).toBe('string');
  });
});
