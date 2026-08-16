// LOCKED — docs/curriculum/v1-curriculum-spec.md §4 ("Region Knowledge
// Structures"), derived from BADAWI Phase 2 Master Specification §2B.
// These are internal knowledge domains, not learner-facing Units — do not
// surface them as a standalone "culture" or "plants and animals" section.
export type RegionKnowledgeDomainId = 'RK1' | 'RK2' | 'RK3' | 'RK4' | 'RK5' | 'RK6' | 'RK7';

export type RegionKnowledgeDepthId = 'R1' | 'R2' | 'R3';

export type RegionKnowledgeIntegrationModeId = 'RI1' | 'RI2' | 'RI3' | 'RI4' | 'RI5';

export const REGION_KNOWLEDGE_DOMAINS: Record<
  RegionKnowledgeDomainId,
  { id: RegionKnowledgeDomainId; name: string; coreQuestion: string }
> = {
  RK1: { id: 'RK1', name: 'Physical Geography & Landscapes', coreQuestion: 'Where am I?' },
  RK2: {
    id: 'RK2',
    name: 'Climate, Weather & Seasonal Patterns',
    coreQuestion: 'What forces shape this place?',
  },
  RK3: {
    id: 'RK3',
    name: 'Water & Natural Resources',
    coreQuestion: 'How are essential resources distributed?',
  },
  RK4: { id: 'RK4', name: 'Ecology, Flora & Fauna', coreQuestion: 'What lives here and why?' },
  RK5: {
    id: 'RK5',
    name: 'Human Adaptation & Ways of Life',
    coreQuestion: 'How have people lived with these environments?',
  },
  RK6: {
    id: 'RK6',
    name: 'Cultural Landscape, Heritage & Local Knowledge',
    coreQuestion: 'What knowledge and meaning are connected to this place?',
  },
  RK7: {
    id: 'RK7',
    name: 'Stewardship & Responsible Exploration',
    coreQuestion: 'How should I interact with this place responsibly?',
  },
};

export const REGION_KNOWLEDGE_DEPTHS: Record<
  RegionKnowledgeDepthId,
  { id: RegionKnowledgeDepthId; name: string; learnerStatement: string }
> = {
  R1: {
    id: 'R1',
    name: 'Orientation',
    learnerStatement: 'I know where I am and what kind of place this is.',
  },
  R2: {
    id: 'R2',
    name: 'Contextual Understanding',
    learnerStatement: 'I understand why things here are the way they are.',
  },
  R3: {
    id: 'R3',
    name: 'Applied Regional Understanding',
    learnerStatement: 'I can use regional context to interpret what I encounter.',
  },
};

export const REGION_KNOWLEDGE_INTEGRATION_MODES: Record<
  RegionKnowledgeIntegrationModeId,
  { id: RegionKnowledgeIntegrationModeId; name: string; purpose: string }
> = {
  RI1: { id: 'RI1', name: 'Essential Context', purpose: 'Know this before acting.' },
  RI2: { id: 'RI2', name: 'Observation Prompt', purpose: 'Now look for it.' },
  RI3: { id: 'RI3', name: 'Contextual Reveal', purpose: 'Here is why what you just saw matters.' },
  RI4: {
    id: 'RI4',
    name: 'Local / Traditional Knowledge Connection',
    purpose: 'Connect experience to documented place-based knowledge.',
  },
  RI5: {
    id: 'RI5',
    name: 'Regional / Environmental Comparison',
    purpose: 'This works here; what changes elsewhere?',
  },
};

// Per-Challenge locked Region Knowledge mapping (spec §4.5, §8).
export type RegionKnowledgeMapping = {
  domains: RegionKnowledgeDomainId[];
  depth: RegionKnowledgeDepthId[];
  integrationModes: RegionKnowledgeIntegrationModeId[];
  /**
   * Freeform note for spec text that does not reduce cleanly to the coded
   * domains above (e.g. Challenge 26's "RK7 + relevant context"). Left
   * unset rather than guessed when the spec is precise.
   */
  note?: string;
};
