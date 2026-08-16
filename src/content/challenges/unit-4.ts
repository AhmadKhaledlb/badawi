import type { Challenge } from '@/domain/challenge';
import { working } from '@/domain/content-status';

import { desertFoundationsPack } from '../packs';
import { challengeId, unitId as unitIdFor } from './ids';

const unitId = `${desertFoundationsPack.id}-unit-4`;

// Unit 4 — Orientation & Navigation (spec §8, Challenges 15–19).
export const unit4Challenges: Challenge[] = [
  {
    id: challengeId(15),
    unitId,
    name: working('Find Your Bearings'),
    order: 1,
    purpose: 'Develop practical cardinal-direction awareness.',
    objective: working('Establish the cardinal directions around you and connect them to the actual landscape.'),
    // Spec §8: "Prereq: Units 1–3." A Unit-level dependency, not a claim
    // that Challenges 1–14 must each individually be marked complete —
    // see Challenge.prerequisiteUnitIds.
    prerequisiteChallengeIds: [],
    prerequisiteUnitIds: [1, 2, 3].map(unitIdFor),
    competency: {
      primary: ['C3'],
      secondary: ['C1', 'C2', 'C5'],
      targetLevel: 'L2',
      demonstrationTypes: ['K', 'A', 'P'],
    },
    evidence: { methods: ['EVM4', 'EVM3'], strength: ['E2', 'E3'], verification: [] },
    regionKnowledge: { domains: ['RK1'], depth: [], integrationModes: [] },
    learningOutcomes: { primary: ['DLO4'], supporting: [] },
    completionCriteria:
      'Correctly establish cardinal directions using an appropriate tool and relate them to visible references.',
    safetyNote: 'Remain stationary or move only in a controlled area while using the device.',
    sourceRequirementsNote: 'Standard authoritative navigation references.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(16),
    unitId,
    name: working('Build a Mental Map'),
    order: 2,
    purpose: 'Develop spatial awareness without constant screen dependence.',
    objective: working('Choose useful reference points and build a simple mental picture of the area around you.'),
    prerequisiteChallengeIds: [challengeId(15)],
    competency: {
      primary: ['C1'],
      secondary: ['C2', 'C3'],
      targetLevel: 'L2–L3',
      demonstrationTypes: ['A', 'P'],
    },
    evidence: { methods: ['EVM2'], strength: ['E2'], verification: [] },
    regionKnowledge: { domains: ['RK1'], depth: ['R2'], integrationModes: [] },
    learningOutcomes: { primary: ['DLO4', 'DLO1'], supporting: [] },
    safetyNote: 'No requirement to climb higher ground for visibility.',
    sourceRequirementsNote: 'Mostly instructional.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(17),
    unitId,
    name: working('Map ↔ World'),
    order: 3,
    purpose: 'Teach the relationship between map representation and physical surroundings.',
    objective: working('Connect what a map shows with what you can actually see around you.'),
    prerequisiteChallengeIds: [15, 16].map(challengeId),
    competency: {
      primary: ['C3'],
      secondary: ['C1', 'C2'],
      targetLevel: 'L2',
      demonstrationTypes: ['K', 'A', 'P'],
    },
    evidence: { methods: ['EVM3'], strength: ['E2', 'E3'], verification: [] },
    regionKnowledge: { domains: ['RK1'], depth: ['R2', 'R3'], integrationModes: [] },
    learningOutcomes: { primary: ['DLO4'], supporting: [] },
    completionCriteria: 'Basic map-environment correspondence.',
    safetyNote: 'No route-following into uncontrolled terrain.',
    sourceRequirementsNote: 'Accurate/current geographic data in the eventual product.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(18),
    unitId,
    name: working('More Than One Way North'),
    order: 4,
    purpose: 'Compare orientation methods and teach reliability, assumptions, and limitations.',
    objective: working(
      'Compare more than one way of establishing direction and decide how much confidence each method deserves.'
    ),
    prerequisiteChallengeIds: [15, 16, 17].map(challengeId),
    competency: {
      primary: ['C2'],
      secondary: ['C1', 'C3', 'C5'],
      targetLevel: 'L2–L3',
      demonstrationTypes: ['K', 'A', 'P'],
    },
    evidence: { methods: ['EVM3', 'EVM4'], strength: ['E2', 'E3'], verification: [] },
    regionKnowledge: { domains: ['RK6'], depth: ['R2'], integrationModes: ['RI4', 'RI5'] },
    learningOutcomes: { primary: ['DLO4', 'DLO7'], supporting: [] },
    safetyNote: 'No sun-gazing. No unsafe night activity solely for Challenge completion.',
    sourceRequirementsNote:
      'HIGH — sun/celestial techniques and traditional navigation examples require rigorous verification and explicit limitations.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(19),
    unitId,
    name: working('Stay Oriented'),
    order: 5,
    purpose: 'Integrate Unit 4 into a controlled movement task.',
    objective: working(
      'Move through a short, safe area while maintaining awareness of your direction, reference points, and uncertainty.'
    ),
    prerequisiteChallengeIds: [15, 16, 17, 18].map(challengeId),
    prerequisiteNote: 'Unit 3 readiness check',
    competency: {
      primary: ['C3'],
      secondary: ['C1', 'C2', 'C5', 'C4'],
      targetLevel: 'C1 L3; C2 L2–L3; C3 L2; C5 L3',
      demonstrationTypes: ['A', 'P'],
    },
    evidence: { methods: ['EVM4', 'EVM3', 'EVM5'], strength: ['E3'], verification: [] },
    regionKnowledge: { domains: ['RK1'], depth: [], integrationModes: [] },
    learningOutcomes: { primary: ['DLO4', 'DLO5', 'DLO8'], supporting: [] },
    completionCriteria:
      'Initial orientation, reference-point use, periodic checking, appropriate response to uncertainty, and safe completion of controlled route.',
    safetyNote:
      'If genuinely uncertain about real location/safety, stop following Challenge logic and prioritize real-world safety procedures.',
    sourceRequirementsNote: 'Navigation procedures and lost-person guidance require strong authoritative sources.',
    researchStatus: 'RQ0',
  },
];
