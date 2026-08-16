import type { Challenge } from '@/domain/challenge';
import type { UnitId } from '@/domain/unit';

import { challenges } from './challenges';
import { desertEnvironment } from './environments';
import { desertFoundationsPack } from './packs';
import { arabianPeninsulaRegion } from './region';
import { units, V1_UNIT_COUNT } from './units';
import { unresolvedChallengePlaceholders, V1_CHALLENGE_COUNT } from './unresolved-challenge-placeholders';

export type V1IntegrityResult = {
  valid: boolean;
  errors: string[];
};

// A real, curriculum-assigned Challenge must reference an existing Unit.
export function challengeReferencesValidUnit(
  challenge: Challenge,
  validUnitIds: Set<UnitId>
): boolean {
  return validUnitIds.has(challenge.unitId);
}

// Lightweight structural check that the V1 content tree matches the locked
// hierarchy shape (docs/product/README.md, docs/architecture/README.md).
// This checks structure only — it says nothing about curriculum, safety,
// or cultural content correctness, and it does not assume any per-unit
// challenge distribution (none is authoritative yet).
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

  if (unresolvedChallengePlaceholders.length !== V1_CHALLENGE_COUNT) {
    errors.push(
      `Expected ${V1_CHALLENGE_COUNT} unresolved challenge placeholders, found ${unresolvedChallengePlaceholders.length}.`
    );
  }

  const unitIds = new Set(units.map((unit) => unit.id));
  for (const challenge of challenges) {
    if (!challengeReferencesValidUnit(challenge, unitIds)) {
      errors.push(`Challenge "${challenge.id}" references unknown unit "${challenge.unitId}".`);
    }
  }

  return { valid: errors.length === 0, errors };
}
