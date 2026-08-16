import { unresolvedChallengePlaceholders } from './unresolved-challenge-placeholders';
import { resolveChallenge } from './resolve-challenge';

describe('resolveChallenge', () => {
  it('resolves a known unresolved-placeholder id and flags it as a placeholder', () => {
    const placeholder = unresolvedChallengePlaceholders[0];

    const result = resolveChallenge(placeholder.id);

    expect(result).toEqual({
      id: placeholder.id,
      name: placeholder.name,
      isPlaceholder: true,
    });
  });

  it('returns undefined for an id that matches neither a real challenge nor a placeholder', () => {
    expect(resolveChallenge('not-a-real-challenge-id')).toBeUndefined();
  });

  // No real (curriculum-assigned) Challenge exists yet — content/challenges.ts
  // is intentionally empty until a real challenge-to-unit mapping is
  // authored, so `isPlaceholder: false` cannot be exercised against real
  // data yet. This is a known, expected content gap, not a test gap.
});
