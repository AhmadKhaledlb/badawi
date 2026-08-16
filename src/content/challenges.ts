import type { Challenge } from '@/domain/challenge';

import { unit1Challenges } from './challenges/unit-1';
import { unit2Challenges } from './challenges/unit-2';
import { unit3Challenges } from './challenges/unit-3';
import { unit4Challenges } from './challenges/unit-4';
import { unit5Challenges } from './challenges/unit-5';
import { unit6Challenges } from './challenges/unit-6';

// The authoritative 28 V1 Challenges — docs/curriculum/v1-curriculum-spec.md
// §8 ("All 28 Challenges"), itself a derived implementation reference over
// the locked BADAWI Phase 2 Master Specification (§2F). Each Challenge
// belongs to exactly one Unit (src/domain/challenge.ts) and preserves the
// spec's Unit assignment and within-unit ordering exactly.
export const V1_CHALLENGE_COUNT = 28;

export const challenges: Challenge[] = [
  ...unit1Challenges,
  ...unit2Challenges,
  ...unit3Challenges,
  ...unit4Challenges,
  ...unit5Challenges,
  ...unit6Challenges,
];

export function findChallengeById(id: string): Challenge | undefined {
  return challenges.find((challenge) => challenge.id === id);
}

export function findChallengesForUnit(unitId: string): Challenge[] {
  return challenges.filter((challenge) => challenge.unitId === unitId).sort((a, b) => a.order - b.order);
}
