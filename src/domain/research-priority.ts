// LOCKED — docs/curriculum/v1-curriculum-spec.md §11.9 ("V1 research
// priority order"), derived from BADAWI Phase 2 Master Specification
// §2I.45. This is the full 5-tier global sequencing for the Research
// Matrix workstream (spec §15, item 1). It is NOT a per-Challenge field —
// see src/content/research-matrix.ts for what can and cannot be
// mechanically derived per Challenge from this order.
export type ResearchPriorityTierId =
  | 'safety-critical'
  | 'traditional-local-knowledge'
  | 'challenge-mechanics'
  | 'supporting-regional-context'
  | 'optional-explore-more';

export type ResearchPriorityTier = {
  id: ResearchPriorityTierId;
  order: number;
  label: string;
  description: string;
};

export const RESEARCH_PRIORITY_ORDER: ResearchPriorityTier[] = [
  {
    id: 'safety-critical',
    order: 1,
    label: 'Safety-Critical',
    description: 'Heat, weather, water, floods/runoff, navigation, symptoms, stopping/escalation.',
  },
  {
    id: 'traditional-local-knowledge',
    order: 2,
    label: 'Traditional/Local Knowledge',
    description: 'Careful sourcing, possibly external contributors.',
  },
  {
    id: 'challenge-mechanics',
    order: 3,
    label: 'Challenge Mechanics',
    description: 'Scientific/environmental claims required for activities.',
  },
  {
    id: 'supporting-regional-context',
    order: 4,
    label: 'Supporting Regional Context',
    description: 'Geography, ecology, history.',
  },
  {
    id: 'optional-explore-more',
    order: 5,
    label: 'Optional Explore-More Content',
    description: 'Only after core is sound.',
  },
];
