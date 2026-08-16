import { desertFoundationsPack } from '../packs';

// Challenge ids are minted from the Master's own global 1–28 numbering
// (docs/curriculum/v1-curriculum-spec.md §8) so that prerequisite
// references map onto ids mechanically, with no renumbering invented.
export function challengeId(globalNumber: number): string {
  return `${desertFoundationsPack.id}-challenge-${globalNumber}`;
}

// Mirrors the id scheme in ../units.ts, for Challenges whose prerequisite
// is stated at the Unit level (e.g. "Units 1–3") rather than as
// individually named Challenges.
export function unitId(order: number): string {
  return `${desertFoundationsPack.id}-unit-${order}`;
}
