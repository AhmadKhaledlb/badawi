import type { Challenge } from '@/domain/challenge';

import { challenges, V1_CHALLENGE_COUNT } from './challenges';
import { desertEnvironment } from './environments';
import { challengeReferencesValidUnit, checkV1Integrity } from './integrity';
import { desertFoundationsPack } from './packs';
import { arabianPeninsulaRegion } from './region';
import { units, V1_UNIT_COUNT } from './units';

describe('V1 content structure', () => {
  it('passes structural integrity checks with no errors', () => {
    const result = checkV1Integrity();

    expect(result.errors).toEqual([]);
    expect(result.valid).toBe(true);
  });

  it('forms the approved region → environment → pack chain', () => {
    expect(arabianPeninsulaRegion.name).toBe('Arabian Peninsula');
    expect(desertEnvironment.name).toBe('Desert');
    expect(desertEnvironment.regionId).toBe(arabianPeninsulaRegion.id);
    expect(desertFoundationsPack.name).toBe('Desert Foundations');
    expect(desertFoundationsPack.environmentId).toBe(desertEnvironment.id);
  });

  it('has exactly 6 units, all belonging to the Desert Foundations pack', () => {
    expect(units).toHaveLength(V1_UNIT_COUNT);
    expect(units.every((unit) => unit.packId === desertFoundationsPack.id)).toBe(true);
  });

  it('gives every unit a unique, contiguous 1-based order', () => {
    expect(new Set(units.map((unit) => unit.id)).size).toBe(units.length);

    const orders = units.map((unit) => unit.order).sort((a, b) => a - b);
    expect(orders).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('has exactly 28 challenges, each assigned to exactly one unit', () => {
    expect(challenges).toHaveLength(V1_CHALLENGE_COUNT);
    expect(new Set(challenges.map((challenge) => challenge.id)).size).toBe(challenges.length);

    const unitIds = new Set(units.map((unit) => unit.id));
    for (const challenge of challenges) {
      expect(unitIds.has(challenge.unitId)).toBe(true);
    }
  });

  it('distributes the 28 challenges across units exactly as the spec locks: 5,5,4,5,5,4', () => {
    const sortedUnits = [...units].sort((a, b) => a.order - b.order);
    const counts = sortedUnits.map(
      (unit) => challenges.filter((challenge) => challenge.unitId === unit.id).length
    );

    expect(counts).toEqual([5, 5, 4, 5, 5, 4]);
  });

  it('gives every challenge a unique, contiguous 1-based order within its unit', () => {
    for (const unit of units) {
      const unitChallenges = challenges
        .filter((challenge) => challenge.unitId === unit.id)
        .sort((a, b) => a.order - b.order);

      expect(unitChallenges.map((challenge) => challenge.order)).toEqual(
        Array.from({ length: unitChallenges.length }, (_, index) => index + 1)
      );
    }
  });

  it('resolves every prerequisite reference to a real challenge id', () => {
    const challengeIds = new Set(challenges.map((challenge) => challenge.id));

    for (const challenge of challenges) {
      for (const prerequisiteId of challenge.prerequisiteChallengeIds) {
        expect(challengeIds.has(prerequisiteId)).toBe(true);
      }
    }
  });

  it('resolves every prerequisite unit reference to a real unit id', () => {
    const unitIds = new Set(units.map((unit) => unit.id));

    for (const challenge of challenges) {
      for (const prerequisiteUnitId of challenge.prerequisiteUnitIds ?? []) {
        expect(unitIds.has(prerequisiteUnitId)).toBe(true);
      }
    }
  });

  it('never lists a challenge as its own prerequisite', () => {
    for (const challenge of challenges) {
      expect(challenge.prerequisiteChallengeIds).not.toContain(challenge.id);
    }
  });

  it('rejects a challenge whose unitId does not reference a valid unit', () => {
    const validUnitIds = new Set(units.map((unit) => unit.id));

    const validChallenge: Challenge = {
      ...challenges[0],
      unitId: units[0].id,
    };
    const invalidChallenge: Challenge = {
      ...challenges[0],
      unitId: 'not-a-real-unit',
    };

    expect(challengeReferencesValidUnit(validChallenge, validUnitIds)).toBe(true);
    expect(challengeReferencesValidUnit(invalidChallenge, validUnitIds)).toBe(false);
  });
});
