import type { ResearchQualityId } from './research-status';

// Minimal extension over research-status.ts (RQ0–RQ4) for Phase 5D.1 — a
// production-lifecycle PRESENTATION of the same locked axis, not a new
// stored field. Two ideas from the task deliberately do NOT get their own
// stage here, because they are not variables of `researchStatus`:
//
// - "Curriculum specification complete" is true for all 28 Challenges
//   already (Phase 5C.1 fully integrated every locked Challenge field) —
//   a precondition, not a stage this axis moves through.
// - "Final learner-facing copy still pending" tracks WorkingCopyText vs
//   finalized copy (src/domain/content-status.ts), which is an ORTHOGONAL
//   axis to research/verification readiness and must stay that way (see
//   content-status.ts header). Every V1 Challenge's copy is WorkingCopyText
//   today, i.e. copy is pending at every stage below 'production-approved'
//   — spec §11.5 (RQ4) folds "final copy" into the same gate as research/
//   safety/cultural review, but this file keeps them conceptually distinct
//   per the task's explicit "do not conflate" instruction.
export type ContentProductionStageId =
  | 'research-needed'
  | 'research-in-progress'
  | 'claims-verified'
  | 'review-complete'
  | 'production-approved';

export type ContentProductionStage = {
  id: ContentProductionStageId;
  label: string;
  /** Whether learner-facing copy could plausibly be final at this stage — see file header. */
  copyCanBeFinal: boolean;
};

export const CONTENT_PRODUCTION_STAGES: Record<ContentProductionStageId, ContentProductionStage> = {
  'research-needed': { id: 'research-needed', label: 'Research Needed', copyCanBeFinal: false },
  'research-in-progress': { id: 'research-in-progress', label: 'Research In Progress', copyCanBeFinal: false },
  'claims-verified': { id: 'claims-verified', label: 'Factual Claims Verified', copyCanBeFinal: false },
  'review-complete': {
    id: 'review-complete',
    label: 'Required Safety/Cultural/Domain Review Complete',
    copyCanBeFinal: false,
  },
  'production-approved': { id: 'production-approved', label: 'Production Approved', copyCanBeFinal: true },
};

const STAGE_BY_RESEARCH_STATUS: Record<ResearchQualityId, ContentProductionStageId> = {
  RQ0: 'research-needed',
  RQ1: 'research-in-progress',
  RQ2: 'claims-verified',
  RQ3: 'review-complete',
  RQ4: 'production-approved',
};

export function contentProductionStage(researchStatus: ResearchQualityId): ContentProductionStage {
  return CONTENT_PRODUCTION_STAGES[STAGE_BY_RESEARCH_STATUS[researchStatus]];
}
