import type { Challenge } from '@/domain/challenge';
import { working } from '@/domain/content-status';

import { desertFoundationsPack } from '../packs';
import { challengeId, unitId as unitIdFor } from './ids';

const unitId = `${desertFoundationsPack.id}-unit-5`;

// Unit 5 — Moving With the Desert (spec §8, Challenges 20–24).
export const unit5Challenges: Challenge[] = [
  {
    id: challengeId(20),
    unitId,
    name: working('Feel the Difference'),
    order: 1,
    purpose: 'Turn terrain knowledge into embodied understanding by comparing how safe terrain types affect movement.',
    objective: working('Compare how two safe terrain types change your effort, stability, pace, and attention.'),
    // Spec §8: "Prereq: Units 1–4." A Unit-level dependency, not a claim
    // that Challenges 1–19 must each individually be marked complete —
    // see Challenge.prerequisiteUnitIds.
    prerequisiteChallengeIds: [],
    prerequisiteUnitIds: [1, 2, 3, 4].map(unitIdFor),
    competency: {
      primary: ['C3'],
      secondary: ['C1', 'C2', 'C5'],
      targetLevel: 'C3 L2; C1 L3',
      demonstrationTypes: ['A', 'P'],
    },
    evidence: { methods: ['EVM4', 'EVM3'], strength: ['E3'], verification: [] },
    regionKnowledge: { domains: ['RK1'], depth: ['R2', 'R3'], integrationModes: ['RI2', 'RI3'] },
    learningOutcomes: { primary: ['DLO5', 'DLO1'], supporting: [] },
    completionCriteria: 'Recognizes that terrain changes movement cost and that this should affect route choice.',
    safetyNote:
      'No race, timed performance, endurance benchmark, or pressure to continue through discomfort. Substitute unsafe surfaces.',
    sourceRequirementsNote: 'Low except any specific biomechanical claims.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(21),
    unitId,
    name: working('Choose Your Line'),
    order: 2,
    purpose: 'Teach route choice as a trade-off rather than shortest-path selection.',
    objective: working(
      'Compare possible routes and choose one using terrain, exposure, effort, hazards, and environmental impact.'
    ),
    prerequisiteChallengeIds: [challengeId(20)],
    prerequisiteNote: 'Unit 4 orientation skills',
    competency: {
      primary: ['C2'],
      secondary: ['C1', 'C3', 'C5', 'C6'],
      targetLevel: 'C2 introductory L3; C3 L2',
      demonstrationTypes: ['A', 'P'],
    },
    evidence: { methods: ['EVM2', 'EVM3', 'EVM4'], strength: ['E2', 'E3'], verification: [] },
    regionKnowledge: { domains: ['RK1', 'RK7'], depth: ['R3'], integrationModes: [] },
    learningOutcomes: { primary: ['DLO5'], supporting: ['DLO1', 'DLO8'] },
    completionCriteria: 'Justified route choice using multiple factors rather than distance alone.',
    safetyNote:
      'All presented route alternatives must already fall within Challenge scope; learners never need to enter an obviously hazardous route to compare it.',
    sourceRequirementsNote: 'Environmental-impact claims align with Region Knowledge (RK7) + source standards.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(22),
    unitId,
    name: working('Pace the Desert'),
    order: 3,
    purpose: 'Teach pace as a decision responsive to terrain, exposure, effort, and objective rather than speed.',
    objective: working('Adjust your pace based on conditions and notice how pace changes effort and attention.'),
    prerequisiteChallengeIds: [20, 21].map(challengeId),
    competency: {
      primary: ['C3'],
      secondary: ['C2', 'C5'],
      targetLevel: 'C3 L2; C2 L2–L3',
      demonstrationTypes: ['A', 'P'],
    },
    evidence: { methods: ['EVM4', 'EVM3'], strength: ['E3'], verification: [] },
    regionKnowledge: { domains: ['RK1', 'RK2'], depth: [], integrationModes: [] },
    learningOutcomes: { primary: ['DLO5', 'DLO2'], supporting: [] },
    completionCriteria: 'Demonstrates that pace is an environmental decision, not a performance score.',
    safetyNote:
      'No fitness thresholds, heart-rate targets, speed goals, or endurance tests. The learner may stop at any time.',
    sourceRequirementsNote: 'Any health/exertion recommendation requires the safety framework.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(23),
    unitId,
    name: working('Change of Plan'),
    order: 4,
    purpose: 'Make adaptation explicit: the original plan is no longer the best plan.',
    objective: working(
      'Recognize a meaningful change in conditions and decide whether to continue, modify, reroute, or stop.'
    ),
    prerequisiteChallengeIds: [20, 21, 22].map(challengeId),
    prerequisiteNote: 'Unit 3 planning logic',
    competency: {
      primary: ['C4'],
      secondary: ['C2', 'C5', 'C6'],
      targetLevel: 'C4 L2; C2/C5 introductory L3',
      demonstrationTypes: ['A'],
    },
    evidence: { methods: ['EVM3', 'EVM5'], strength: ['E2', 'E3'], verification: [] },
    regionKnowledge: {
      domains: ['RK1', 'RK2', 'RK7'],
      depth: [],
      integrationModes: [],
      note: 'RK1/RK2/RK7 depending on scenario',
    },
    learningOutcomes: { primary: ['DLO5', 'DLO8'], supporting: [] },
    completionCriteria: 'Competence is appropriate adaptation, not persistence.',
    safetyNote:
      'Change is simulated or safely bounded. Never rely on actual dangerous deterioration as the teaching mechanism.',
    sourceRequirementsNote: 'Scenario risk content aligns with the safety framework.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(24),
    unitId,
    name: working('Move Without a Trace'),
    order: 5,
    purpose: 'Make stewardship operational rather than informational.',
    objective: working(
      'Complete a short movement activity while reducing unnecessary impact on the landscape and explaining the choices you make.'
    ),
    prerequisiteChallengeIds: [20, 21, 22, 23].map(challengeId),
    competency: {
      primary: ['C2', 'C5'],
      secondary: ['C3', 'C6'],
      targetLevel: 'L2–L3',
      demonstrationTypes: ['A', 'P'],
    },
    evidence: { methods: ['EVM3', 'EVM4', 'EVM5'], strength: ['E3'], verification: [] },
    regionKnowledge: { domains: ['RK7'], depth: ['R3'], integrationModes: [] },
    learningOutcomes: { primary: ['DLO8', 'DLO5'], supporting: [] },
    completionCriteria: 'Active stewardship choices during movement.',
    safetyNote:
      'Environmental protection never overrides immediate human safety. If avoiding an area creates danger, stop/redesign the activity.',
    sourceRequirementsNote:
      'Protected-area, archaeological, environmental, and access rules require authoritative/local verification.',
    researchStatus: 'RQ0',
  },
];
