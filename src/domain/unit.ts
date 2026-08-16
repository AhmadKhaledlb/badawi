import type { CompetencyId } from './competency';
import type { LockedSpecText, WorkingCopyText } from './content-status';
import type { LearningOutcomeId } from './learning-outcome';
import type { PackId } from './pack';

export type UnitId = string;

// docs/curriculum/v1-curriculum-spec.md §6 ("The Six V1 Units"). See
// src/domain/content-status.ts for what WorkingCopyText/LockedSpecText mean.
export type Unit = {
  id: UnitId;
  packId: PackId;
  /**
   * WORKING learner-facing title (spec §14, "NOT FINAL — Learner-facing
   * wording": "Unit titles"). May be revised in production without
   * changing the Unit's locked educational purpose below. Must be built
   * with `working()`, not assigned a bare string literal.
   */
  name: WorkingCopyText;
  /** 1-based position of this unit within its pack. */
  order: number;
  /**
   * LOCKED — spec §6 core question, part of the Unit's specification
   * (spec §14, "LOCKED — Curriculum architecture": "the six Units").
   */
  coreQuestion: LockedSpecText;
  /** LOCKED — spec §6 purpose/transformation summary; see `coreQuestion`. */
  purpose: LockedSpecText;
  /** LOCKED — primary competency domains this Unit targets (spec §6). */
  primaryCompetencies: CompetencyId[];
  /** LOCKED — primary Desert Learning Outcomes this Unit targets (spec §6). */
  primaryLearningOutcomes: LearningOutcomeId[];
};
