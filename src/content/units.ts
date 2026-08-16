import { working } from '@/domain/content-status';
import type { Unit } from '@/domain/unit';

import { desertFoundationsPack } from './packs';

// The authoritative V1 Desert Pack Units — docs/curriculum/v1-curriculum-spec.md
// §6 ("The Six V1 Units"), itself a derived implementation reference over
// the locked BADAWI Phase 2 Master Specification (§2D/§2E). `name` is
// WORKING learner-facing copy (spec §14) and may be revised in production
// without changing a Unit's locked educational purpose; `coreQuestion`,
// `purpose`, `primaryCompetencies`, and `primaryLearningOutcomes` are
// LOCKED curriculum architecture (see src/domain/content-status.ts).
export const V1_UNIT_COUNT = 6;

export const units: Unit[] = [
  {
    id: `${desertFoundationsPack.id}-unit-1`,
    packId: desertFoundationsPack.id,
    name: working('Reading the Desert'),
    order: 1,
    coreQuestion: 'What am I actually looking at?',
    purpose: 'Establish desert literacy and the habit of observing before acting.',
    primaryCompetencies: ['C1', 'C2', 'C5', 'C6'],
    primaryLearningOutcomes: ['DLO1'],
  },
  {
    id: `${desertFoundationsPack.id}-unit-2`,
    packId: desertFoundationsPack.id,
    name: working('Heat, Weather & Water'),
    order: 2,
    coreQuestion: 'What forces shape the desert, and what do they mean for me?',
    purpose:
      'Deepen reasoning about heat, solar exposure, wind, seasons, rain, wadis, water distribution, and traditional water management.',
    primaryCompetencies: ['C1', 'C2', 'C5'],
    primaryLearningOutcomes: ['DLO2', 'DLO3'],
  },
  {
    id: `${desertFoundationsPack.id}-unit-3`,
    packId: desertFoundationsPack.id,
    name: working('Preparing for the Field'),
    order: 3,
    coreQuestion: 'What should I decide before entering the desert?',
    purpose:
      'Treat preparation as environmental reasoning before entering the environment — not a gear-shopping exercise.',
    primaryCompetencies: ['C2', 'C3', 'C5'],
    primaryLearningOutcomes: ['DLO5', 'DLO8'],
  },
  {
    id: `${desertFoundationsPack.id}-unit-4`,
    packId: desertFoundationsPack.id,
    name: working('Orientation & Navigation'),
    order: 4,
    coreQuestion: 'Where am I, where am I going, and how do I keep knowing?',
    purpose:
      'Build cardinal-direction awareness, landmark/map/compass use, sun/celestial context, and recognition of when uncertainty means stop.',
    primaryCompetencies: ['C1', 'C2', 'C3', 'C5'],
    primaryLearningOutcomes: ['DLO4'],
  },
  {
    id: `${desertFoundationsPack.id}-unit-5`,
    packId: desertFoundationsPack.id,
    name: working('Moving With the Desert'),
    order: 5,
    coreQuestion: 'How should the environment change the way I move and act?',
    purpose:
      'Combine earlier knowledge into terrain, movement, pacing, effort, route choice, and adaptation, with lighter scaffolding.',
    primaryCompetencies: ['C1', 'C2', 'C3', 'C4', 'C5'],
    primaryLearningOutcomes: ['DLO5', 'DLO1'],
  },
  {
    id: `${desertFoundationsPack.id}-unit-6`,
    packId: desertFoundationsPack.id,
    name: working('Desert Field Integration'),
    order: 6,
    coreQuestion: 'Can I bring everything together?',
    purpose:
      "Integrate the Pack's competencies with minimal new content: observe, assess, prepare, orient, move, adapt, act responsibly, and reflect.",
    primaryCompetencies: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
    primaryLearningOutcomes: ['DLO1', 'DLO4', 'DLO5', 'DLO8'],
  },
];

export function findUnitsForPack(packId: string): Unit[] {
  return units.filter((unit) => unit.packId === packId);
}

export function findUnitById(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}
