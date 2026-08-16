import type { Challenge } from '@/domain/challenge';
import { working } from '@/domain/content-status';

import { desertFoundationsPack } from '../packs';
import { challengeId } from './ids';

const unitId = `${desertFoundationsPack.id}-unit-1`;

// Unit 1 — Reading the Desert (spec §8, Challenges 1–5).
export const unit1Challenges: Challenge[] = [
  {
    id: challengeId(1),
    unitId,
    name: working('First Read'),
    order: 1,
    purpose: "Introduce BADAWI's foundational field habit: observe before interpreting or acting.",
    objective: working(
      'Slow down and read your surroundings before doing anything else — record what you directly observe without yet explaining it.'
    ),
    prerequisiteChallengeIds: [],
    competency: {
      primary: ['C1'],
      secondary: ['C5', 'C6'],
      targetLevel: 'L1 → L2',
      demonstrationTypes: ['A'],
    },
    evidence: { methods: ['EVM2'], strength: ['E2'], verification: ['V1', 'V2'] },
    regionKnowledge: { domains: ['RK1'], depth: ['R1'], integrationModes: ['RI2'] },
    learningOutcomes: { primary: ['DLO1'], supporting: ['DLO8'] },
    completionCriteria:
      'Records the required observation categories, demonstrates the observation/interpretation distinction, completes the safety check, and submits a reflection.',
    safetyNote:
      'Explicit safe-location check gate before Field Mode; the Challenge does not proceed if the answer is No.',
    sourceRequirementsNote:
      'Minimal; regional examples or terminology used in teaching copy require normal research/source verification.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(2),
    unitId,
    name: working('Not All Desert Is the Same'),
    order: 2,
    purpose: 'Develop comparison and dismantle the mental model that desert means one uniform terrain type.',
    objective: working(
      'Compare two nearby areas and identify the differences that could matter if you needed to move through or interact with them.'
    ),
    prerequisiteChallengeIds: [challengeId(1)],
    competency: {
      primary: ['C1'],
      secondary: ['C2'],
      targetLevel: 'L2',
      demonstrationTypes: ['A'],
    },
    evidence: { methods: ['EVM2', 'EVM3'], strength: ['E2'], verification: ['V1', 'V2'] },
    regionKnowledge: { domains: ['RK1'], depth: ['R1', 'R2'], integrationModes: ['RI2', 'RI3'] },
    learningOutcomes: { primary: ['DLO1'], supporting: [] },
    completionCriteria:
      'Meaningful comparison with at least three relevant differences, plus basic reasoning linking environment to possible movement implications.',
    safetyNote:
      'No entering steep/unstable slopes, active dune vehicle areas, loose cliff edges, or hazardous surfaces; visual comparison from a safe point is valid.',
    sourceRequirementsNote: 'Regional landscape examples require authoritative geographic sources.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(3),
    unitId,
    name: working('Read the Invisible'),
    order: 3,
    purpose:
      'Teach the learner to infer environmental forces from observable effects while explicitly preserving uncertainty.',
    objective: working(
      'Look for evidence of forces you cannot directly see — especially sun, shade, and wind — and separate what you know from what you infer.'
    ),
    prerequisiteChallengeIds: [challengeId(1), challengeId(2)],
    competency: {
      primary: ['C1'],
      secondary: ['C2'],
      targetLevel: 'L2',
      demonstrationTypes: ['K', 'A'],
    },
    evidence: { methods: ['EVM2', 'EVM3'], strength: ['E2'], verification: [] },
    regionKnowledge: { domains: ['RK2'], depth: ['R1'], integrationModes: ['RI2'] },
    learningOutcomes: { primary: ['DLO1'], supporting: ['DLO2'] },
    completionCriteria:
      'At least three direct observations, a reasonable evidence/inference distinction, and appropriate use of uncertainty.',
    safetyNote:
      'No touching dangerously hot surfaces, entering blowing dust/sand, remaining exposed solely for comparison, or staring at the sun.',
    sourceRequirementsNote:
      'Scientific claims about wind-formed features, solar exposure, or dune morphology require verified sources before production copy.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(4),
    unitId,
    name: working('The Desert Is Alive'),
    order: 4,
    purpose: 'Develop ecological awareness without turning the Challenge into taxonomy or wildlife interference.',
    objective: working(
      'Find evidence that the desert is a living ecosystem without disturbing the plants, animals, or signs you encounter.'
    ),
    prerequisiteChallengeIds: [challengeId(1), challengeId(2), challengeId(3)],
    competency: {
      primary: ['C1'],
      secondary: ['C2', 'C5', 'C6'],
      targetLevel: 'L2',
      demonstrationTypes: ['A'],
    },
    evidence: { methods: ['EVM2'], strength: ['E2'], verification: [] },
    regionKnowledge: { domains: ['RK4', 'RK7'], depth: ['R1'], integrationModes: ['RI2', 'RI3'] },
    learningOutcomes: { primary: ['DLO6'], supporting: ['DLO1', 'DLO8'] },
    completionCriteria:
      'Multiple legitimate biological observations plus adherence to non-disturbance rules; correct species identification is not required.',
    safetyNote:
      'Absolute rules: no handling wildlife; no hands inside burrows/rocks; no handling droppings/carcasses; no eating/tasting plants; no approaching potentially dangerous animals.',
    sourceRequirementsNote:
      'Species-specific examples require authoritative ecological/conservation sources and correct geographic distribution.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(5),
    unitId,
    name: working('Read Before You Move'),
    order: 5,
    purpose: 'Integrate Unit 1 and reduce scaffolding.',
    objective: working(
      'Read a safe outdoor area independently and decide which observations would matter most before moving through it.'
    ),
    prerequisiteChallengeIds: [challengeId(1), challengeId(2), challengeId(3), challengeId(4)],
    competency: {
      primary: ['C1'],
      secondary: ['C2', 'C5', 'C6'],
      targetLevel: 'C1 early L3; others L2',
      demonstrationTypes: ['A'],
    },
    evidence: { methods: ['EVM2', 'EVM3', 'EVM5'], strength: ['E2'], verification: [] },
    regionKnowledge: {
      domains: ['RK1', 'RK2', 'RK4', 'RK7'],
      depth: ['R1', 'R2'],
      integrationModes: ['RI2', 'RI3'],
    },
    learningOutcomes: { primary: ['DLO1'], supporting: ['DLO8'] },
    completionCriteria:
      'Independent observation selection, prioritization, cautious reasoning, uncertainty awareness, and safety judgment.',
    safetyNote:
      'Only a safe, controlled amount of movement is required, if any — the core skill is reading before movement.',
    sourceRequirementsNote: 'Inherited from Unit 1 verified content.',
    researchStatus: 'RQ0',
  },
];
