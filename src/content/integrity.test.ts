import type { Challenge } from '@/domain/challenge';

import { challenges } from './challenges';
import { desertEnvironment } from './environments';
import { challengeReferencesValidUnit, checkV1Integrity } from './integrity';
import { desertFoundationsPack } from './packs';
import { arabianPeninsulaRegion } from './region';
import { units, V1_UNIT_COUNT } from './units';
import { unresolvedChallengePlaceholders, V1_CHALLENGE_COUNT } from './unresolved-challenge-placeholders';

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

  it('has exactly 28 unresolved challenge placeholders, unassigned to any unit', () => {
    expect(unresolvedChallengePlaceholders).toHaveLength(V1_CHALLENGE_COUNT);
    expect(new Set(unresolvedChallengePlaceholders.map((placeholder) => placeholder.id)).size).toBe(
      unresolvedChallengePlaceholders.length
    );

    for (const placeholder of unresolvedChallengePlaceholders) {
      expect(placeholder).not.toHaveProperty('unitId');
    }
  });

  it('has no real challenges yet, since no unit assignment is authoritative', () => {
    expect(challenges).toEqual([]);
  });

  it('rejects a real challenge whose unitId does not reference a valid unit', () => {
    const validUnitIds = new Set(units.map((unit) => unit.id));

    const validChallenge: Challenge = {
      id: 'example-challenge',
      unitId: units[0].id,
      name: 'Example',
      order: 1,
    };
    const invalidChallenge: Challenge = {
      id: 'example-challenge',
      unitId: 'not-a-real-unit',
      name: 'Example',
      order: 1,
    };

    expect(challengeReferencesValidUnit(validChallenge, validUnitIds)).toBe(true);
    expect(challengeReferencesValidUnit(invalidChallenge, validUnitIds)).toBe(false);
  });
});
