// LOCKED — docs/curriculum/v1-curriculum-spec.md §11.1 ("Seven Claim
// Classes"), derived from BADAWI Phase 2 Master Specification §2I. These
// classify the KIND of factual claim a piece of curriculum content makes —
// used to decide verification standard (spec §11.3) before any claim ships.
// This file only extracts the reference taxonomy; it does not itself
// research or assert that any claim is true.
export type ClaimClassId = 'CC1' | 'CC2' | 'CC3' | 'CC4' | 'CC5' | 'CC6' | 'CC7';

export type ClaimClass = {
  id: ClaimClassId;
  name: string;
  scope: string;
};

export const CLAIM_CLASSES: Record<ClaimClassId, ClaimClass> = {
  CC1: {
    id: 'CC1',
    name: 'Scientific/Environmental',
    scope: 'Climate, weather, geology, hydrology, ecology, animal behavior, plant biology, astronomy.',
  },
  CC2: {
    id: 'CC2',
    name: 'Health/Medical/Human Performance',
    scope:
      'Heat illness, hydration, exertion, sun exposure, symptoms, physiological responses. One of the strictest standards.',
  },
  CC3: {
    id: 'CC3',
    name: 'Operational Safety',
    scope: 'Behavior-changing instructions (stop/enter/technique-appropriate). Very high verification standard.',
  },
  CC4: {
    id: 'CC4',
    name: 'Geographic/Regional',
    scope: 'Locations, landforms, environmental distribution, named places, boundaries.',
  },
  CC5: {
    id: 'CC5',
    name: 'Historical/Cultural',
    scope: 'Past practices, livelihoods, routes, settlement, material culture, terminology, heritage.',
  },
  CC6: {
    id: 'CC6',
    name: 'Traditional/Local/Community Knowledge',
    scope: 'Claims attributed to a specific community/tribe/tradition — further governed by spec §12 (2J).',
  },
  CC7: {
    id: 'CC7',
    name: 'Current Local/Regulatory',
    scope: 'Closures, permissions, protected-area rules, weather restrictions, laws — requires freshness controls.',
  },
};
