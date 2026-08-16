import type { Unit } from '@/domain/unit';

import { desertFoundationsPack } from './packs';

// The COUNT of units (6) is locked — docs/product/README.md and
// docs/curriculum/README.md, "V1 Scope". Individual unit names/topics are
// not documented anywhere in the repository, so these are clearly-labeled
// structural placeholders, not curriculum content. Replace the `name`
// values with approved unit names when curriculum content is authored.
export const V1_UNIT_COUNT = 6;

export const units: Unit[] = Array.from({ length: V1_UNIT_COUNT }, (_, index) => {
  const order = index + 1;
  return {
    id: `${desertFoundationsPack.id}-unit-${order}`,
    packId: desertFoundationsPack.id,
    name: `Unit ${order} (placeholder — name not yet authored)`,
    order,
  };
});

export function findUnitsForPack(packId: string): Unit[] {
  return units.filter((unit) => unit.packId === packId);
}
