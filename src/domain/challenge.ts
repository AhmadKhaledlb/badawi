import type { UnitId } from './unit';

export type ChallengeId = string;

export type Challenge = {
  id: ChallengeId;
  unitId: UnitId;
  name: string;
  /** 1-based position of this challenge within its unit. */
  order: number;
};
