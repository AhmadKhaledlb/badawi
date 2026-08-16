// LOCKED — docs/curriculum/v1-curriculum-spec.md §2 ("Competency
// Framework"), derived from BADAWI Phase 2 Master Specification §2A.
// There is no "Expert" level and none may be added (CLAUDE.md,
// "Governance Protection"; spec §2.3).
export type CompetencyId = 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6';

export type CompetencyLevel = 'L1' | 'L2' | 'L3' | 'L4';

// K = Knowledge, A = Application, P = Performance (spec §2.4).
export type DemonstrationType = 'K' | 'A' | 'P';

export type CompetencyDomain = {
  id: CompetencyId;
  name: string;
  coreQuestion: string;
};

export const COMPETENCY_DOMAINS: Record<CompetencyId, CompetencyDomain> = {
  C1: {
    id: 'C1',
    name: 'Environmental Observation & Awareness',
    coreQuestion: 'Can the learner notice what matters?',
  },
  C2: {
    id: 'C2',
    name: 'Environmental Reasoning & Decision-Making',
    coreQuestion: 'Can the learner interpret what they observe and make sensible decisions?',
  },
  C3: {
    id: 'C3',
    name: 'Practical Field Capability',
    coreQuestion: 'Can the learner actually do things appropriately?',
  },
  C4: {
    id: 'C4',
    name: 'Adaptation & Problem-Solving',
    coreQuestion:
      "Can the learner respond when circumstances change or the first approach doesn't work?",
  },
  C5: {
    id: 'C5',
    name: 'Safety & Risk Management',
    coreQuestion: 'Can the learner recognize limits and behave responsibly?',
  },
  C6: {
    id: 'C6',
    name: 'Reflection & Transfer',
    coreQuestion: 'Can the learner understand what they learned and carry it forward?',
  },
};

export type CompetencyLevelInfo = {
  id: CompetencyLevel;
  name: string;
  learnerStatement: string;
};

// No "Expert" tier — see file header.
export const COMPETENCY_LEVELS: Record<CompetencyLevel, CompetencyLevelInfo> = {
  L1: { id: 'L1', name: 'Aware', learnerStatement: 'I can recognize it.' },
  L2: { id: 'L2', name: 'Capable', learnerStatement: 'I can apply it.' },
  L3: { id: 'L3', name: 'Independent', learnerStatement: 'I can assess, decide, and act.' },
  L4: { id: 'L4', name: 'Adaptive', learnerStatement: 'I can adjust and transfer it.' },
};

export const DEMONSTRATION_TYPES: Record<DemonstrationType, string> = {
  K: 'Knowledge — I understand.',
  A: 'Application — I can use what I know.',
  P: 'Performance — I can perform the relevant action.',
};

// Per-Challenge locked competency mapping (spec §2.5, §8). This is the
// curriculum's TARGET mapping — it is not a record of what any learner has
// actually demonstrated. BADAWI does not compute or store assessed
// competency anywhere in this codebase; runtime attempt outcomes/progress
// (src/state/progress-types.ts) are a deliberately separate concept and
// must stay that way (CLAUDE.md; spec §9.5, "Competency-level earning").
export type CompetencyMapping = {
  primary: CompetencyId[];
  secondary: CompetencyId[];
  /**
   * Verbatim-derived target-level statement from spec §8. Kept as text
   * rather than a structured per-competency level map: the spec expresses
   * target levels inconsistently across the 28 Challenges (some give one
   * level for the whole Challenge, others break levels out per
   * competency), and forcing uniform structure here would fabricate
   * precision the spec does not provide.
   */
  targetLevel: string;
  demonstrationTypes: DemonstrationType[];
};
