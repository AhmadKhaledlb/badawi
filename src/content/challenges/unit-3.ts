import type { Challenge } from '@/domain/challenge';
import { working } from '@/domain/content-status';

import { desertFoundationsPack } from '../packs';
import { challengeId } from './ids';

const unitId = `${desertFoundationsPack.id}-unit-3`;

// Unit 3 — Preparing for the Field (spec §8, Challenges 11–14).
export const unit3Challenges: Challenge[] = [
  {
    id: challengeId(11),
    unitId,
    name: working('Start With the Mission'),
    order: 1,
    purpose: 'Teach that preparation begins with the objective and context, not a generic packing list.',
    objective: working('Define what you are actually trying to do before deciding what you need.'),
    // Spec §8: "Prereq: Challenges 1–10" — an explicit atomic list, not
    // Unit-level wording, so it is expanded in full here.
    prerequisiteChallengeIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(challengeId),
    competency: {
      primary: ['C2'],
      secondary: ['C5'],
      targetLevel: 'L2',
      demonstrationTypes: ['K', 'A'],
    },
    evidence: { methods: ['EVM3'], strength: ['E2'], verification: ['V1', 'V3'] },
    regionKnowledge: { domains: ['RK2', 'RK7'], depth: [], integrationModes: ['RI5'], note: 'RK2+RK7 where relevant' },
    learningOutcomes: { primary: ['DLO5', 'DLO8'], supporting: [] },
    completionCriteria: 'Demonstrate context-dependent preparation.',
    safetyNote: 'Do not normalize unsupported remote travel or imply more gear makes risky plans acceptable.',
    sourceRequirementsNote:
      'Low–moderate; specific equipment/safety recommendations must align with the safety framework.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(12),
    unitId,
    name: working('Build the Plan'),
    order: 2,
    purpose: 'Turn Unit 2 environmental knowledge into a basic field plan.',
    objective: working(
      'Create a simple plan for a safe, controlled desert activity using the conditions you expect to encounter.'
    ),
    prerequisiteChallengeIds: [challengeId(11)],
    competency: {
      primary: ['C2'],
      secondary: ['C5', 'C3'],
      targetLevel: 'L2',
      demonstrationTypes: ['A'],
    },
    evidence: { methods: ['EVM3'], strength: ['E2'], verification: [] },
    regionKnowledge: { domains: ['RK1', 'RK2', 'RK7'], depth: [], integrationModes: ['RI1'] },
    learningOutcomes: { primary: ['DLO5', 'DLO8'], supporting: ['DLO2'] },
    completionCriteria:
      'Plan connects conditions to preparation, has realistic scope, and contains at least one explicit stop/change criterion.',
    safetyNote:
      'Redirect obviously out-of-scope plans such as solo remote expeditions, extreme-weather outings, technical off-road travel, and unsupported overnight survival exercises.',
    sourceRequirementsNote:
      'Local access, closure, protected-area, weather, or legal guidance requires current verification in product implementation.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(13),
    unitId,
    name: working('Pack for a Reason'),
    order: 3,
    purpose: 'Teach functional equipment selection rather than gear accumulation.',
    objective: working(
      "Choose what you need based on what it does for the activity — not because it appears on a generic checklist."
    ),
    prerequisiteChallengeIds: [challengeId(12)],
    competency: {
      primary: ['C3'],
      secondary: ['C2', 'C5'],
      targetLevel: 'L2',
      demonstrationTypes: ['A', 'P'],
    },
    evidence: { methods: ['EVM4', 'EVM3'], strength: ['E2'], verification: [] },
    regionKnowledge: { domains: ['RK2'], depth: [], integrationModes: [], note: 'RK2 where exposure-related' },
    learningOutcomes: { primary: ['DLO5'], supporting: [] },
    completionCriteria:
      'Covers appropriate functional categories, explains why important items are present, and does not use irrelevant gear as a substitute for planning.',
    safetyNote: 'No weaponry, hazardous tools, medical interventions, or specialist equipment required for V1.',
    sourceRequirementsNote:
      'Any numeric or medical claims (sun protection, water quantity, emergency equipment) require authoritative safety sourcing.',
    researchStatus: 'RQ0',
  },
  {
    id: challengeId(14),
    unitId,
    name: working('The Final Check'),
    order: 4,
    purpose: 'Make preparation a go/no-go judgment, not a completed checklist.',
    objective: working(
      'Before you begin, decide whether your plan still makes sense under the conditions that actually exist now.'
    ),
    prerequisiteChallengeIds: [11, 12, 13].map(challengeId),
    competency: {
      primary: ['C5'],
      secondary: ['C2', 'C3'],
      targetLevel: 'C5 introductory L3',
      demonstrationTypes: ['A'],
    },
    evidence: { methods: ['EVM3'], strength: [], verification: [] },
    regionKnowledge: { domains: ['RK2', 'RK7'], depth: [], integrationModes: [] },
    learningOutcomes: { primary: ['DLO5', 'DLO8'], supporting: [] },
    completionCriteria: 'Demonstrates that plans remain revisable until the activity starts.',
    safetyNote: 'Completing a checklist never guarantees safety.',
    sourceRequirementsNote: 'Any objective safety gates must come from the safety framework, not invented thresholds.',
    researchStatus: 'RQ0',
  },
];
