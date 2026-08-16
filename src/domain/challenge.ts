import type { CompetencyMapping } from './competency';
import type { LockedSpecText, WorkingCopyText } from './content-status';
import type { EvidenceMapping } from './evidence';
import type { LearningOutcomeId } from './learning-outcome';
import type { RegionKnowledgeMapping } from './region-knowledge';
import type { ResearchQualityId } from './research-status';
import type { SafetyGateClassId } from './safety';
import type { UnitId } from './unit';

export type ChallengeId = string;

export type ChallengeLearningOutcomes = {
  primary: LearningOutcomeId[];
  /** DLOs the spec lists as "supporting" rather than primary for this Challenge. */
  supporting: LearningOutcomeId[];
};

// A single locked rubric dimension from a Challenge's special rubric (only
// Challenge 27 and Challenge 28 have one — spec §8, "2G.23"/"2G.24").
export type ChallengeRubricDimension = {
  id: string;
  label: string;
  question: string;
  /** True only where the spec marks the dimension safety-critical/non-compensatory. */
  safetyCritical?: boolean;
};

// docs/curriculum/v1-curriculum-spec.md §8 ("All 28 Challenges"). Field-
// level provenance notes below point at that document's section numbers,
// which in turn trace back to the BADAWI Phase 2 Master Specification. See
// src/domain/content-status.ts for what WorkingCopyText/LockedSpecText mean,
// and note `researchStatus` at the bottom is a SEPARATE, orthogonal axis
// (unverified-factual-content readiness, not copy finality).
export type Challenge = {
  id: ChallengeId;
  unitId: UnitId;
  /**
   * WORKING learner-facing title (spec §14, "NOT FINAL — Learner-facing
   * wording": "Challenge titles") — not final production wording. Must be
   * built with `working()`, not assigned a bare string literal.
   */
  name: WorkingCopyText;
  /** 1-based position of this challenge within its unit. */
  order: number;
  /**
   * LOCKED — spec §8 "Purpose", part of the Challenge's specification
   * (spec §14, "LOCKED — Curriculum architecture": "the 28 Challenge
   * purposes/specifications"). Internal/curriculum-team-facing, not shown
   * to the learner verbatim.
   */
  purpose: LockedSpecText;
  /**
   * WORKING learner-facing prompt wording — spec §8 explicitly labels this
   * the "Learner-facing objective" (spec §14, "NOT FINAL — Learner-facing
   * wording": "exact prompts"). Must be built with `working()`.
   */
  objective: WorkingCopyText;
  /**
   * Other Challenges (by id) the spec names individually as preceding this
   * one. Deliberately does NOT include every Challenge inside a Unit-level
   * prerequisite (e.g. "Units 1–3") — see `prerequisiteUnitIds`. Expanding
   * a Unit-level dependency into an exhaustive per-Challenge list would
   * assert an atomic "every prior Challenge individually complete" gate
   * that the spec does not establish (spec §6, "No artificial
   * prerequisites"; spec §16).
   */
  prerequisiteChallengeIds: ChallengeId[];
  /**
   * Unit(s) the spec names as a whole prerequisite (e.g. Challenge 15's
   * "Prereq: Units 1–3"). A Unit-level dependency, not a claim that every
   * Challenge inside that Unit must individually be marked complete —
   * exact runtime prerequisite/gating rules are not locked by the spec.
   */
  prerequisiteUnitIds?: UnitId[];
  /**
   * Verbatim qualifier the spec adds beyond a clean Challenge/Unit
   * reference (e.g. "+ Unit 3 readiness check", "+ final readiness
   * check"). Left unset when the spec's prerequisite statement reduces
   * cleanly to `prerequisiteChallengeIds`/`prerequisiteUnitIds` alone.
   */
  prerequisiteNote?: string;
  /** LOCKED — spec §2, §8. */
  competency: CompetencyMapping;
  /** LOCKED — spec §3, §8. */
  evidence: EvidenceMapping;
  /** LOCKED — spec §4, §8. */
  regionKnowledge: RegionKnowledgeMapping;
  /** LOCKED — spec §5, §8. */
  learningOutcomes: ChallengeLearningOutcomes;
  /**
   * LOCKED — spec §8 "Completion" criteria, part of the locked assessment
   * model (spec §14, §9). Internal, not learner-facing feedback copy.
   * Optional: 4 of the 28 Challenges (6, 8, 16, 18) have no explicit
   * completion-criteria statement in the spec, and none is invented here.
   */
  completionCriteria?: LockedSpecText;
  /**
   * LOCKED — spec §8 "Safety" note, describing a rule from the locked
   * safety framework (spec §10, §14). This is NOT approved learner-facing
   * safety-message wording (that remains unauthored pending the Safety
   * Verification workstream, spec §15) — it must not be rendered to
   * learners as-is.
   */
  safetyNote: LockedSpecText;
  /**
   * LOCKED where set. The spec only explicitly assigns a Safety Gate
   * Class to Challenge 27 (SG2); the remaining Challenges are left
   * unassigned here rather than inferring SG0/SG1 per Challenge, which
   * the spec does not do individually (spec §10.3).
   */
  safetyGateClass?: SafetyGateClassId;
  /**
   * Verbatim-derived "Source requirements" note from spec §8. Not a coded
   * enum: the spec's wording ranges from a bare level word ("Minimal",
   * "HIGH") to a full sentence describing the kind of source needed.
   */
  sourceRequirementsNote?: LockedSpecText;
  /** Only populated for Challenge 27 and Challenge 28 (spec §8, §9). */
  specialRubric?: ChallengeRubricDimension[];
  /**
   * Combined research/content-production status (spec §11.5, RQ0–RQ4).
   * Every V1 Challenge is RQ0 as of this implementation: the Research
   * Matrix workstream (spec §15, item 1) has not yet run for any of them.
   * This is the UNVERIFIED-factual-content axis (spec §14) — independent
   * of whether a field above is WorkingCopyText or LockedSpecText.
   */
  researchStatus: ResearchQualityId;
};
