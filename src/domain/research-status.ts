// LOCKED — docs/curriculum/v1-curriculum-spec.md §11.5 ("Research Quality
// status"), derived from BADAWI Phase 2 Master Specification §2I.43. Tracks
// combined research/content-production readiness for a Challenge's
// curriculum content. A Challenge cannot ship learner-facing content until
// RQ4 ("Production Approved").
export type ResearchQualityId = 'RQ0' | 'RQ1' | 'RQ2' | 'RQ3' | 'RQ4';

export const RESEARCH_QUALITY_STATUSES: Record<ResearchQualityId, string> = {
  RQ0: 'Unresearched',
  RQ1: 'Research in Progress',
  RQ2: 'Verified',
  RQ3: 'Reviewed',
  RQ4: 'Production Approved',
};
