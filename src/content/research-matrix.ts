import type { Challenge, ChallengeId } from '@/domain/challenge';
import type { ClaimClassId } from '@/domain/claim-class';
import {
  contentProductionStage,
  type ContentProductionStageId,
} from '@/domain/content-production-stage';
import type { RegionKnowledgeDomainId } from '@/domain/region-knowledge';
import type { ReviewCategoryId } from '@/domain/review-category';
import type { ResearchPriorityTierId } from '@/domain/research-priority';
import type { ResearchQualityId } from '@/domain/research-status';

import { challenges } from './challenges';
import { challengeId } from './challenges/ids';

// Phase 5D.1 — Research & Production Content Foundation.
//
// This is NOT the Research Matrix workstream itself (spec §15, item 1) —
// it is scaffolding that makes that workstream possible: for each of the
// 28 canonical Challenges, it mechanically derives what KIND of research/
// review that Challenge will need, from Challenge metadata already
// integrated and locked in Phase 5C.1 (regionKnowledge, safetyGateClass,
// competency, safetyNote, sourceRequirementsNote, researchStatus). Every
// field below is a pure function of that already-integrated data — nothing
// here is an independently researched fact, a new safety threshold, or a
// claim about the real world. A human research lead must still confirm/
// refine these flags once the actual Research Matrix workstream begins.
//
// Per CLAUDE.md and docs/curriculum/v1-curriculum-spec.md §16, an
// ambiguity is preserved rather than silently resolved wherever the spec
// does not give this file a mechanical basis to decide: the priority tier
// below only ever resolves to 'safety-critical', 'traditional-local-
// knowledge', or 'challenge-mechanics' — never 'supporting-regional-
// context' or 'optional-explore-more' (spec §11.9's 4th/5th tiers), because
// nothing in the integrated Challenge data distinguishes those two from
// ordinary Challenge-mechanics content at the per-Challenge level. That
// split remains a judgment call for the actual research workstream.
//
// 5D.1 refinement (research-priority fidelity), third pass. History:
// (1) an initial pass declined to hard-code a Critical/High/Medium
//     per-Challenge table — unverifiable against any document then
//     available in this repository.
// (2) the Master excerpt (2I.46, "V1 Research Matrix after Phase 2") was
//     supplied directly and added to docs/curriculum/v1-curriculum-spec.md
//     §11.10 (see that section and its §16.5 provenance note). That pass
//     also made an explicit Medium/High/Critical value OVERRIDE
//     `priorityTier`/`safetyCritical` inference — e.g. Challenge 3 became
//     'safety-critical' solely because it is Master-labeled "Medium".
// (3) THIS pass reverts that override. §11.10's Priority/Risk column is a
//     research-urgency rating, not a category assignment — nothing in the
//     supplied excerpt says a bare High/Critical value makes a Challenge
//     Safety-Critical, and using it that way put Challenges into that
//     category on a signal the Master never tied to it. `priorityTier` and
//     `safetyCritical` are now derived ONLY from locked signals that
//     actually say "safety" (Safety Gate Class, primary C5, the "Hard
//     gate" term, or a sourceRequirementsNote naming CC2 content) or
//     "traditional/local" (RI4, RK6, or the Master's own "High cultural"
//     qualifier — kept, because the Master explicitly ties THAT specific
//     value, not plain "High", to cultural content). `explicitSourceRequirementLevel`
//     (§8) and `explicitResearchMatrixPriority` (§11.10/2I.46) remain two
//     separate, always-preserved fields, exposed for transparency — never
//     used to redefine the broad category by themselves except where noted.

/** Per-Challenge priority tier this file can mechanically justify — see header. */
export type DerivedPriorityTierId = Extract<
  ResearchPriorityTierId,
  'safety-critical' | 'traditional-local-knowledge' | 'challenge-mechanics'
>;

export type ResearchMatrixEntry = {
  challengeId: ChallengeId;
  /** = Challenge.researchStatus (src/domain/research-status.ts). */
  currentResearchStatus: ResearchQualityId;
  /** Same status, presented as a production-lifecycle stage — see content-production-stage.ts. */
  productionStage: ContentProductionStageId;
  /** Derived from regionKnowledge domains + safety signals — see RK_TO_CLAIM_CLASS below. */
  claimClasses: ClaimClassId[];
  /**
   * True if: an explicit Safety Gate Class is set, C5 (Safety & Risk
   * Management) is a PRIMARY target competency, the Challenge's locked
   * safetyNote uses the spec's own "Hard gate" term (spec §10, e.g.
   * Challenge 8's flash-flood/wadi rule), or the Challenge's locked
   * sourceRequirementsNote explicitly names CC2-defining content (health/
   * exertion — see `needsHealthMedicalClaimClass` below, e.g. Challenge 7's
   * heat-physiology assessment and Challenge 22's pacing/exertion content)
   * — not a generic safety mention, which every Challenge has.
   */
  safetyCritical: boolean;
  /** True if regionKnowledge tags this Challenge RI4 (Local/Traditional Knowledge Connection) or RK6. */
  traditionalKnowledgeReviewNeeded: boolean;
  /** True if the Challenge has any mapped Region Knowledge domain or an unresolved RK note. */
  regionKnowledgeResearchNeeded: boolean;
  /** spec §11.9 order, narrowed to what's derivable per-Challenge — see DerivedPriorityTierId. */
  priorityTier: DerivedPriorityTierId;
  /** Subset of the spec §11.8 publication gate this file can justify per-Challenge; the rest (visual/translation/review-date) is workstream-level, not derivable here. */
  requiredReviewCategories: ReviewCategoryId[];
  /**
   * The literal leading qualifier word(s) this Challenge's own LOCKED
   * `sourceRequirementsNote` uses, where the spec's actual text opens with
   * one ("Minimal", "Low", "Low–moderate", or "HIGH" — verbatim, never
   * normalized/invented) — undefined where the spec gives no such word.
   * Deliberately a SEPARATE field from `priorityTier`: the tier is a
   * derived category/workstream grouping, this is the spec's own stated
   * word where one exists, and collapsing them would lose which is which.
   * This repository has never seen a "Critical" or "Medium" level in any
   * Challenge's locked source-requirements text — see file header.
   */
  explicitSourceRequirementLevel?: string;
  /**
   * The Priority/Risk value the Master's dedicated Research Matrix section
   * (docs/curriculum/v1-curriculum-spec.md §11.10, 2I.46) states by name
   * for this Challenge — a DIFFERENT axis from `explicitSourceRequirementLevel`
   * (§8's inline per-Challenge note). "High cultural" is kept as its own
   * literal value, distinct from "High" — never normalized together. Only
   * set for the 12 Challenges (3, 6, 7, 8, 9, 15–19, 22, 27) the Master
   * excerpt actually names; every other Challenge stays undefined rather
   * than getting an invented value.
   */
  explicitResearchMatrixPriority?: ExplicitResearchMatrixPriority;
};

export type ExplicitResearchMatrixPriority = 'Medium' | 'High' | 'Critical' | 'High cultural';

// docs/curriculum/v1-curriculum-spec.md §11.10 (2I.46) — reproduced exactly
// as the Master excerpt states it, expanded from the Master's "Ch15–19" 5-
// Challenge range entry to each of the 5 individual Challenge ids so every
// one of them preserves the explicit High navigation priority. No other
// Challenge gets a value here; see the type doc above.
const EXPLICIT_RESEARCH_MATRIX_PRIORITY: Record<string, ExplicitResearchMatrixPriority> = {
  [challengeId(3)]: 'Medium',
  [challengeId(6)]: 'High',
  [challengeId(7)]: 'Critical',
  [challengeId(8)]: 'Critical',
  [challengeId(9)]: 'High cultural',
  [challengeId(15)]: 'High',
  [challengeId(16)]: 'High',
  [challengeId(17)]: 'High',
  [challengeId(18)]: 'High',
  [challengeId(19)]: 'High',
  [challengeId(22)]: 'Critical',
  [challengeId(27)]: 'Critical',
};

const RK_TO_CLAIM_CLASS: Record<RegionKnowledgeDomainId, ClaimClassId> = {
  RK1: 'CC4', // Physical Geography & Landscapes -> Geographic/Regional
  RK2: 'CC1', // Climate, Weather & Seasonal Patterns -> Scientific/Environmental
  RK3: 'CC1', // Water & Natural Resources -> Scientific/Environmental
  RK4: 'CC1', // Ecology, Flora & Fauna -> Scientific/Environmental
  RK5: 'CC5', // Human Adaptation & Ways of Life -> Historical/Cultural
  RK6: 'CC6', // Cultural Landscape, Heritage & Local Knowledge -> Traditional/Local/Community Knowledge
  RK7: 'CC7', // Stewardship & Responsible Exploration -> Current Local/Regulatory
};

// spec §11.1 defines CC2's scope as "heat illness, hydration, exertion, sun
// exposure, symptoms, physiological responses." Rather than a broad keyword
// scan across every field of all 28 Challenges (rejected — the task
// explicitly warns against inferring CC2 broadly), this checks only for
// those exact CC2-defining terms inside a Challenge's own LOCKED
// sourceRequirementsNote. Currently true only for Challenge 7 ("...strong
// authoritative health/environment sources") and Challenge 22 ("Any
// health/exertion recommendation..."). Challenge 13's sourceRequirementsNote
// also contains "medical" ("Any numeric or medical claims..."), but that
// text is about numeric/equipment claims, not heat/exertion physiology —
// left unflagged for a human reviewer to confirm rather than auto-included.
function needsHealthMedicalClaimClass(challenge: Challenge): boolean {
  const note = challenge.sourceRequirementsNote ?? '';
  return /\bhealth\b|\bexertion\b/i.test(note);
}

function explicitResearchMatrixPriority(challenge: Challenge): ExplicitResearchMatrixPriority | undefined {
  return EXPLICIT_RESEARCH_MATRIX_PRIORITY[challenge.id];
}

// Deliberately does NOT read explicitResearchMatrixPriority (Medium/High/
// Critical). §11.10/2I.46 states a Priority/Risk value for research
// urgency, not a category assignment — nothing in the supplied excerpt
// says "this makes the Challenge Safety-Critical," and treating a bare
// High/Critical label as sufficient would put Challenges into the
// Safety-Critical category on a signal the Master never actually tied to
// that category (a prior pass of this file did this and was corrected —
// see the file header). safetyCritical/priorityTier are established only
// by locked signals that DO say "safety": an explicit Safety Gate Class,
// a PRIMARY C5 competency target, the spec's own "Hard gate" term, or a
// Challenge's own sourceRequirementsNote naming CC2-defining content.
function isSafetyCritical(challenge: Challenge): boolean {
  return (
    challenge.safetyGateClass !== undefined ||
    challenge.competency.primary.includes('C5') ||
    /hard gate/i.test(challenge.safetyNote) ||
    needsHealthMedicalClaimClass(challenge)
  );
}

// Matches only the leading qualifier words actually observed in this
// codebase's locked sourceRequirementsNote text (see file header) — never
// "Critical"/"Medium", which do not appear anywhere in the available spec.
const EXPLICIT_LEVEL_PATTERN = /^(HIGH|Minimal|Low(?:[–-]moderate)?)\b/;

function deriveExplicitSourceRequirementLevel(challenge: Challenge): string | undefined {
  const note = challenge.sourceRequirementsNote;
  if (!note) return undefined;
  return note.match(EXPLICIT_LEVEL_PATTERN)?.[1];
}

function isTraditionalKnowledgeSensitive(challenge: Challenge): boolean {
  // Only the "cultural"-QUALIFIED explicit value counts as its own
  // independent signal here — the Master explicitly ties Ch9's value to
  // culture by name ("High cultural"), unlike a bare "High"/"Critical",
  // which carries no category claim at all (see file header). Plain
  // "High" (e.g. Challenges 6, 15–19) must NOT reach this branch.
  return (
    explicitResearchMatrixPriority(challenge) === 'High cultural' ||
    challenge.regionKnowledge.integrationModes.includes('RI4') ||
    challenge.regionKnowledge.domains.includes('RK6')
  );
}

function needsRegionKnowledgeResearch(challenge: Challenge): boolean {
  return challenge.regionKnowledge.domains.length > 0 || challenge.regionKnowledge.note !== undefined;
}

function deriveClaimClasses(challenge: Challenge): ClaimClassId[] {
  const classes = new Set<ClaimClassId>();
  for (const domain of challenge.regionKnowledge.domains) {
    classes.add(RK_TO_CLAIM_CLASS[domain]);
  }
  if (isSafetyCritical(challenge)) {
    classes.add('CC3');
  }
  if (needsHealthMedicalClaimClass(challenge)) {
    classes.add('CC2');
  }
  return Array.from(classes);
}

function derivePriorityTier(challenge: Challenge): DerivedPriorityTierId {
  // spec §11.9 order: Safety-Critical (1) outranks Traditional/Local
  // Knowledge (2) outranks Challenge Mechanics (3).
  if (isSafetyCritical(challenge)) return 'safety-critical';
  if (isTraditionalKnowledgeSensitive(challenge)) return 'traditional-local-knowledge';
  return 'challenge-mechanics';
}

function deriveRequiredReviewCategories(challenge: Challenge): ReviewCategoryId[] {
  // Every V1 Challenge has a non-empty, LOCKED safetyNote (challenge.ts),
  // so baseline claim/source/regional/safety review + expert review apply
  // to all 28 — matching spec §10.8's "every field Challenge requires"
  // review set. Traditional/local attribution is added only where the
  // Challenge is actually tagged for it.
  const categories: ReviewCategoryId[] = [
    'claim-verification',
    'source-traceability',
    'regional-scope-validation',
    'safety-verification',
    'required-expert-review',
  ];
  if (isTraditionalKnowledgeSensitive(challenge)) {
    categories.push('traditional-local-attribution');
  }
  return categories;
}

function buildResearchMatrixEntry(challenge: Challenge): ResearchMatrixEntry {
  return {
    challengeId: challenge.id,
    currentResearchStatus: challenge.researchStatus,
    productionStage: contentProductionStage(challenge.researchStatus).id,
    claimClasses: deriveClaimClasses(challenge),
    safetyCritical: isSafetyCritical(challenge),
    traditionalKnowledgeReviewNeeded: isTraditionalKnowledgeSensitive(challenge),
    regionKnowledgeResearchNeeded: needsRegionKnowledgeResearch(challenge),
    priorityTier: derivePriorityTier(challenge),
    requiredReviewCategories: deriveRequiredReviewCategories(challenge),
    explicitSourceRequirementLevel: deriveExplicitSourceRequirementLevel(challenge),
    explicitResearchMatrixPriority: explicitResearchMatrixPriority(challenge),
  };
}

/** Canonical research matrix — one entry per V1 Challenge, in Challenge order. */
export const RESEARCH_MATRIX: ResearchMatrixEntry[] = challenges.map(buildResearchMatrixEntry);

export function findResearchMatrixEntry(challengeId: ChallengeId): ResearchMatrixEntry | undefined {
  return RESEARCH_MATRIX.find((entry) => entry.challengeId === challengeId);
}
