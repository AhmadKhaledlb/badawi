import type { Challenge } from '@/domain/challenge';
import { working } from '@/domain/content-status';

import { desertFoundationsPack } from '../packs';
import { challengeId, unitId as unitIdFor } from './ids';

const unitId = `${desertFoundationsPack.id}-unit-6`;

// Unit 6 — Desert Field Integration (spec §8, Challenges 25–28).
export const unit6Challenges: Challenge[] = [
  {
    id: challengeId(25),
    unitId,
    name: working('Read the Situation'),
    order: 1,
    purpose: "Test independent environmental assessment at the Pack's intended C1 ceiling.",
    objective: working(
      "Assess today's environment independently and decide what information matters for the activity ahead."
    ),
    // Spec §8: "Prereq: Units 1–5." A Unit-level dependency, not a claim
    // that Challenges 1–24 must each individually be marked complete —
    // see Challenge.prerequisiteUnitIds.
    prerequisiteChallengeIds: [],
    prerequisiteUnitIds: [1, 2, 3, 4, 5].map(unitIdFor),
    competency: {
      primary: ['C1'],
      secondary: ['C2', 'C5'],
      targetLevel: 'C1 L3; C2/C5 introductory L3',
      demonstrationTypes: ['A'],
    },
    evidence: { methods: ['EVM2', 'EVM3'], strength: ['E3'], verification: [] },
    regionKnowledge: {
      domains: [],
      depth: ['R3'],
      integrationModes: [],
      note: 'applicable domains',
    },
    learningOutcomes: { primary: ['DLO1', 'DLO2', 'DLO8'], supporting: [] },
    completionCriteria:
      'Independently selects relevant observations, prioritizes them, recognizes uncertainty, avoids unsupported claims.',
    safetyNote:
      'If conditions exceed scope, integration activity stops/reschedules/relocates; appropriate cancellation does not fail this Challenge.',
    sourceRequirementsNote: 'Mostly inherited.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(26),
    unitId,
    name: working('Make the Plan'),
    order: 2,
    purpose: 'Integrate preparation, navigation, movement, risk, and stewardship into one learner-generated field plan.',
    objective: working('Turn your environmental assessment into a short, realistic plan for the field activity.'),
    prerequisiteChallengeIds: [challengeId(25)],
    competency: {
      primary: ['C2'],
      secondary: ['C3', 'C4', 'C5'],
      targetLevel: 'C2 L3; C3/C4 L2; C5 L3',
      demonstrationTypes: ['A'],
    },
    evidence: { methods: ['EVM3'], strength: ['E2', 'E3'], verification: [] },
    regionKnowledge: { domains: ['RK7'], depth: [], integrationModes: [], note: 'RK7 + relevant context' },
    learningOutcomes: { primary: ['DLO4', 'DLO5', 'DLO8'], supporting: [] },
    completionCriteria:
      'Plan is coherent, scoped, connected to the actual assessment, and explicit about uncertainty/stop-change criteria.',
    safetyNote: 'BADAWI may reject plans outside V1 field boundaries.',
    sourceRequirementsNote: 'No major new content.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(27),
    unitId,
    name: working('The Field Challenge'),
    order: 3,
    purpose: 'Practical culmination of the V1 Desert Pack.',
    objective: working(
      'Complete a short controlled desert activity using your own observation, preparation, orientation, movement, adaptation, and safety decisions.'
    ),
    prerequisiteChallengeIds: [25, 26].map(challengeId),
    prerequisiteNote: 'final readiness check',
    competency: {
      primary: ['C3', 'C1', 'C2'],
      secondary: ['C4', 'C5', 'C6'],
      targetLevel: 'C1 L3; C2 L3 where appropriate; C3 L2; C4 L2; C5 L3; C6 supporting L2–L3',
      demonstrationTypes: ['A', 'P'],
    },
    evidence: { methods: ['EVM2', 'EVM3', 'EVM4'], strength: ['E3'], verification: [] },
    regionKnowledge: { domains: [], depth: ['R2', 'R3'], integrationModes: [], note: 'contextual R2–R3' },
    learningOutcomes: {
      primary: ['DLO1', 'DLO4', 'DLO5', 'DLO8'],
      supporting: ['DLO2', 'DLO3', 'DLO6', 'DLO7'],
    },
    completionCriteria:
      'Sufficiently demonstrates environmental assessment, orientation maintenance, safe movement, at least one relevant decision, appropriate response to change/uncertainty, stewardship, and completion or appropriate early termination.',
    safetyNote:
      "Not a survival test, race, endurance event, unsupported navigation, remote expedition, or test of bravado — a bounded demonstration of foundational desert competence. Material unsafe actions can block full safety status even if the destination is reached.",
    safetyGateClass: 'SG2',
    sourceRequirementsNote:
      'HIGH — inherits the strongest verification requirements from all embedded safety, navigation, environmental, and local-knowledge content.',
    specialRubric: [
      {
        id: 'FC1',
        label: 'Environmental Assessment',
        question: 'Did the learner identify important conditions affecting the activity?',
      },
      {
        id: 'FC2',
        label: 'Plan & Decision Quality',
        question: 'Did the plan logically respond to those conditions?',
      },
      {
        id: 'FC3',
        label: 'Orientation & Field Execution',
        question: 'Did the learner maintain appropriate orientation and carry out the bounded field task competently?',
      },
      {
        id: 'FC4',
        label: 'Safety, Limits & Stewardship',
        question: 'Did the learner remain within boundaries and respond appropriately to change?',
        safetyCritical: true,
      },
      {
        id: 'FC5',
        label: 'Adaptation',
        question: 'When conditions/assumptions changed, did the learner reassess rather than blindly continue?',
      },
    ],
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(28),
    unitId,
    name: working('Read It Again'),
    order: 4,
    purpose: 'Close the Pack by measuring transformation, transfer, and self-awareness rather than another knowledge quiz.',
    objective: working(
      'Look back at how you approached the desert before BADAWI and explain how your observation, decisions, and limits have changed.'
    ),
    prerequisiteChallengeIds: [challengeId(27)],
    prerequisiteNote: 'including a safely terminated attempt where relevant',
    competency: {
      primary: ['C6'],
      secondary: ['C1', 'C2', 'C4', 'C5'],
      targetLevel: 'C6 L2–L3',
      demonstrationTypes: ['K', 'A'],
    },
    evidence: { methods: ['EVM5'], strength: ['E2', 'E3'], verification: [] },
    regionKnowledge: { domains: [], depth: [], integrationModes: [], note: 'applicable domains' },
    learningOutcomes: { primary: ['DLO8'], supporting: [] },
    completionCriteria:
      'Genuine before/after comparison, evidence-based reflection, awareness of mistakes/uncertainty, transfer of the BADAWI process, and appropriate recognition of limits.',
    safetyNote:
      'System feedback must avoid unsupported wording like "You are now desert-ready" — prefer accurate, scoped completion wording; final learner-facing wording is a later production/UX task.',
    specialRubric: [
      { id: 'FR1', label: 'Evidence-Based Reflection', question: 'Are specific experiences referenced rather than generic statements?' },
      { id: 'FR2', label: 'Self-Correction', question: 'Does the learner recognize changed assumptions/mistakes?' },
      { id: 'FR3', label: 'Uncertainty & Limits', question: 'Does the learner identify what remains unknown or inappropriate to attempt?' },
      { id: 'FR4', label: 'Transfer', question: 'Does the learner explain how to approach a new desert context?' },
      { id: 'FR5', label: 'Integration', question: 'Does the learner connect multiple BADAWI concepts rather than one isolated Challenge?' },
    ],
    researchStatus: 'RQ0',
  },
];
