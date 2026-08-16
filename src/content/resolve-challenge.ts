import { findChallengeById } from './challenges';
import { findUnresolvedChallengePlaceholderById } from './unresolved-challenge-placeholders';

export type ResolvedChallenge = {
  id: string;
  name: string;
  /** True when this came from the unresolved staging list, not a real Challenge. */
  isPlaceholder: boolean;
};

// Resolves a challengeId against real, curriculum-assigned Challenges
// first, falling back to the unresolved structural placeholders (see
// unresolved-challenge-placeholders.ts). Returns undefined if the id
// matches neither. Used by every challenge-journey screen so each can
// honestly distinguish authored content from a structural placeholder.
export function resolveChallenge(id: string): ResolvedChallenge | undefined {
  const challenge = findChallengeById(id);
  if (challenge) {
    return { id: challenge.id, name: challenge.name, isPlaceholder: false };
  }

  const placeholder = findUnresolvedChallengePlaceholderById(id);
  if (placeholder) {
    return { id: placeholder.id, name: placeholder.name, isPlaceholder: true };
  }

  return undefined;
}
