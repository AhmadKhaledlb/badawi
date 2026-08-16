import type { Challenge } from '@/domain/challenge';
import { working } from '@/domain/content-status';

import { desertFoundationsPack } from '../packs';
import { challengeId, unitId as unitIdFor } from './ids';

const unitId = `${desertFoundationsPack.id}-unit-2`;

// Unit 2 — Heat, Weather & Water (spec §8, Challenges 6–10).
export const unit2Challenges: Challenge[] = [
  {
    id: challengeId(6),
    unitId,
    name: working('Follow the Shade'),
    order: 1,
    purpose: 'Extend Unit 1 shade observation into dynamic exposure understanding.',
    objective: working(
      'Observe how shade and exposure change, and explain why a place that is comfortable now may not remain comfortable later.'
    ),
    // Spec §8: "Prereq: Unit 1." A Unit-level dependency, not a claim that
    // Challenges 1–5 must each individually be marked complete — see
    // Challenge.prerequisiteUnitIds.
    prerequisiteChallengeIds: [],
    prerequisiteUnitIds: [unitIdFor(1)],
    competency: {
      primary: ['C1'],
      secondary: ['C2', 'C5'],
      targetLevel: 'L2',
      demonstrationTypes: ['A'],
    },
    evidence: { methods: ['EVM2', 'EVM3'], strength: ['E2'], verification: [] },
    regionKnowledge: { domains: ['RK2'], depth: ['R2'], integrationModes: ['RI2', 'RI3'] },
    learningOutcomes: { primary: ['DLO2'], supporting: [] },
    safetyNote:
      'Never remain in dangerous heat waiting for shade to move; separated observations only if naturally and safely present at the location.',
    sourceRequirementsNote:
      'Accurate solar/shade sources; do not hard-code local timing without verified calculation/data.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(7),
    unitId,
    name: working('Read the Conditions'),
    order: 2,
    purpose: 'Break the misconception that air temperature alone describes field conditions.',
    objective: working(
      'Assess a planned outdoor activity using several environmental and personal factors, not a single temperature number.'
    ),
    prerequisiteChallengeIds: [challengeId(6)],
    competency: {
      primary: ['C2'],
      secondary: ['C1', 'C5'],
      targetLevel: 'L2',
      demonstrationTypes: ['K', 'A'],
    },
    evidence: { methods: ['EVM1'], strength: ['E2'], verification: [] },
    regionKnowledge: { domains: ['RK2'], depth: ['R2'], integrationModes: ['RI1', 'RI5'] },
    learningOutcomes: { primary: ['DLO2'], supporting: [] },
    completionCriteria: 'Recognizes multiple interacting variables and identifies relevant risk factors.',
    safetyNote:
      'Medical symptoms/numerical thresholds must come from the verified safety implementation standard; passing an app assessment does not mean conditions are guaranteed safe.',
    sourceRequirementsNote:
      'HIGH — one of the most rigorously sourced Challenges in the Pack (strong authoritative health/environment sources).',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(8),
    unitId,
    name: working('Where Water Moves'),
    order: 3,
    purpose: 'Teach learners to read water movement — not to hunt for water.',
    objective: working(
      'Identify how terrain could influence where rainfall and runoff move through a desert landscape.'
    ),
    // Spec §8: "Prereq: Unit 1 + Challenges 6–7." The Challenges 6–7 part is
    // an explicit atomic reference; the "Unit 1" part is a Unit-level
    // dependency and is not flattened into Challenges 1–5 individually —
    // see Challenge.prerequisiteUnitIds.
    prerequisiteChallengeIds: [challengeId(6), challengeId(7)],
    prerequisiteUnitIds: [unitIdFor(1)],
    competency: {
      primary: ['C1'],
      secondary: ['C2', 'C5'],
      targetLevel: 'L2',
      demonstrationTypes: ['K', 'A'],
    },
    evidence: { methods: ['EVM2'], strength: ['E2'], verification: [] },
    regionKnowledge: { domains: ['RK1', 'RK3'], depth: ['R2'], integrationModes: ['RI1', 'RI2', 'RI3'] },
    learningOutcomes: { primary: ['DLO3'], supporting: ['DLO2'] },
    safetyNote:
      'Hard gate: never enter or remain in a drainage channel merely to complete this Challenge — read-from-safety only; must not direct the learner into a wadi, channel, drainage area, flood-prone depression, or watercourse.',
    sourceRequirementsNote: 'Strong hydrology + regional flash-flood sources.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(9),
    unitId,
    name: working('Water Shapes Life'),
    order: 4,
    purpose:
      'Connect water, vegetation, landscape, settlement, and human adaptation without implying vegetation means potable water.',
    objective: working(
      'Trace how water availability can influence where life and human activity concentrate in an arid landscape.'
    ),
    prerequisiteChallengeIds: [challengeId(8)],
    competency: {
      primary: ['C2'],
      secondary: ['C1', 'C6'],
      targetLevel: 'L2',
      demonstrationTypes: ['K', 'A'],
    },
    evidence: { methods: ['EVM2'], strength: ['E2'], verification: [] },
    regionKnowledge: {
      domains: ['RK3', 'RK4', 'RK5', 'RK6'],
      depth: ['R2'],
      integrationModes: ['RI2', 'RI3', 'RI4'],
    },
    learningOutcomes: { primary: ['DLO3'], supporting: ['DLO6', 'DLO7'] },
    completionCriteria: 'Connect at least three system components without unsupported "water finding" claims.',
    safetyNote: 'No sampling, tasting, entering, or drinking unknown water.',
    sourceRequirementsNote:
      'HIGH — traditional irrigation, oasis, well, settlement, or local-knowledge examples need exact geographic attribution and strong sourcing.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(10),
    unitId,
    name: working("Go / Change / Don't Go"),
    order: 5,
    purpose: 'Integrate Unit 2 into explicit safety judgment.',
    objective: working(
      'Use environmental conditions to decide whether a planned desert activity should go ahead, be changed, or be cancelled.'
    ),
    prerequisiteChallengeIds: [6, 7, 8, 9].map(challengeId),
    competency: {
      primary: ['C5'],
      secondary: ['C1', 'C2', 'C4'],
      targetLevel: 'C5 early L3; C2 L2–L3',
      demonstrationTypes: ['K', 'A'],
    },
    evidence: { methods: ['EVM3'], strength: ['E2'], verification: [] },
    regionKnowledge: { domains: ['RK2', 'RK3'], depth: ['R2', 'R3'], integrationModes: ['RI1', 'RI5'] },
    learningOutcomes: { primary: ['DLO2', 'DLO3'], supporting: ['DLO8'] },
    completionCriteria:
      'Demonstrates that temperature alone is insufficient, conditions interact, plans can change, cancelling is valid, and uncertainty matters.',
    safetyNote:
      'BADAWI must never say "Safe to go" — must use hedged language; final wording belongs to safety/UX implementation.',
    sourceRequirementsNote:
      'HIGH — risk logic and thresholds must derive from verified safety framework, not improvised rules.',
    researchStatus: 'RQ0',
  },
];
