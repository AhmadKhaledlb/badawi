import type { Challenge } from '@/domain/challenge';
import type { UnitId } from '@/domain/unit';

import { challenges, V1_CHALLENGE_COUNT } from './challenges';
import { desertEnvironment } from './environments';
import { desertFoundationsPack } from './packs';
import { arabianPeninsulaRegion } from './region';
import { units, V1_UNIT_COUNT } from './units';

export type V1IntegrityResult = {
  valid: boolean;
  errors: string[];
};

// A Challenge must reference an existing Unit.
export function challengeReferencesValidUnit(
  challenge: Challenge,
  validUnitIds: Set<UnitId>
): boolean {
  return validUnitIds.has(challenge.unitId);
}

// docs/curriculum/v1-curriculum-spec.md §6 — the locked per-Unit Challenge
// distribution (5, 5, 4, 5, 5, 4 = 28), in Unit order.
const EXPECTED_CHALLENGES_PER_UNIT = [5, 5, 4, 5, 5, 4];

// Structural check that the V1 content tree matches the locked hierarchy
// shape and the authoritative curriculum spec (docs/curriculum/v1-curriculum-spec.md,
// itself derived from the locked BADAWI Phase 2 Master Specification). This
// checks structure only — it says nothing about curriculum, safety, or
// cultural content correctness (those remain separate readiness states;
// see the badawi-content-integration skill).
export function checkV1Integrity(): V1IntegrityResult {
  const errors: string[] = [];

  if (desertEnvironment.regionId !== arabianPeninsulaRegion.id) {
    errors.push('Desert environment does not belong to the Arabian Peninsula region.');
  }

  if (desertFoundationsPack.environmentId !== desertEnvironment.id) {
    errors.push('Desert Foundations pack does not belong to the Desert environment.');
  }

  if (units.length !== V1_UNIT_COUNT) {
    errors.push(`Expected ${V1_UNIT_COUNT} units, found ${units.length}.`);
  }

  for (const unit of units) {
    if (unit.packId !== desertFoundationsPack.id) {
      errors.push(`Unit "${unit.id}" does not belong to the Desert Foundations pack.`);
    }
  }

  const unitOrders = units.map((unit) => unit.order).sort((a, b) => a - b);
  const expectedUnitOrders = Array.from({ length: V1_UNIT_COUNT }, (_, index) => index + 1);
  if (JSON.stringify(unitOrders) !== JSON.stringify(expectedUnitOrders)) {
    errors.push(`Unit orders are not a contiguous 1..${V1_UNIT_COUNT} sequence.`);
  }

  if (challenges.length !== V1_CHALLENGE_COUNT) {
    errors.push(`Expected ${V1_CHALLENGE_COUNT} challenges, found ${challenges.length}.`);
  }

  const challengeIds = new Set(challenges.map((challenge) => challenge.id));
  if (challengeIds.size !== challenges.length) {
    errors.push('Challenge ids are not unique.');
  }

  const unitIds = new Set(units.map((unit) => unit.id));
  for (const challenge of challenges) {
    if (!challengeReferencesValidUnit(challenge, unitIds)) {
      errors.push(`Challenge "${challenge.id}" references unknown unit "${challenge.unitId}".`);
    }
  }

  const sortedUnits = [...units].sort((a, b) => a.order - b.order);
  sortedUnits.forEach((unit, index) => {
    const unitChallenges = challenges
      .filter((challenge) => challenge.unitId === unit.id)
      .sort((a, b) => a.order - b.order);

    const expectedCount = EXPECTED_CHALLENGES_PER_UNIT[index];
    if (unitChallenges.length !== expectedCount) {
      errors.push(
        `Unit "${unit.id}" expected ${expectedCount} challenges, found ${unitChallenges.length}.`
      );
    }

    const orders = unitChallenges.map((challenge) => challenge.order);
    const expectedOrders = Array.from({ length: unitChallenges.length }, (_, i) => i + 1);
    if (JSON.stringify(orders) !== JSON.stringify(expectedOrders)) {
      errors.push(`Unit "${unit.id}" challenge orders are not a contiguous 1..n sequence.`);
    }
  });

  for (const challenge of challenges) {
    for (const prerequisiteId of challenge.prerequisiteChallengeIds) {
      if (!challengeIds.has(prerequisiteId)) {
        errors.push(
          `Challenge "${challenge.id}" references unknown prerequisite "${prerequisiteId}".`
        );
      }
    }

    for (const prerequisiteUnitId of challenge.prerequisiteUnitIds ?? []) {
      if (!unitIds.has(prerequisiteUnitId)) {
        errors.push(
          `Challenge "${challenge.id}" references unknown prerequisite unit "${prerequisiteUnitId}".`
        );
      }
    }
  }

  return { valid: errors.length === 0, errors };
}
