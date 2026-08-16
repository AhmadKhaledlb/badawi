// LOCKED — docs/curriculum/v1-curriculum-spec.md §11.8 ("Minimum
// publication gate"), derived from BADAWI Phase 2 Master Specification
// §2I.44. These are the checks a Challenge's content must clear before it
// may be treated as RQ4 ("Production Approved") — see
// src/domain/research-status.ts. Extraction only: which of these apply to a
// given Challenge is a downstream research question, not decided here.
export type ReviewCategoryId =
  | 'claim-verification'
  | 'source-traceability'
  | 'regional-scope-validation'
  | 'safety-verification'
  | 'traditional-local-attribution'
  | 'visual-verification'
  | 'translation-verification'
  | 'required-expert-review'
  | 'review-date-assigned';

export type ReviewCategory = {
  id: ReviewCategoryId;
  label: string;
};

export const REVIEW_CATEGORIES: Record<ReviewCategoryId, ReviewCategory> = {
  'claim-verification': { id: 'claim-verification', label: 'Claim verification' },
  'source-traceability': { id: 'source-traceability', label: 'Source traceability' },
  'regional-scope-validation': { id: 'regional-scope-validation', label: 'Regional scope validation' },
  'safety-verification': { id: 'safety-verification', label: 'Safety verification (where applicable)' },
  'traditional-local-attribution': {
    id: 'traditional-local-attribution',
    label: 'Traditional/local attribution (where applicable)',
  },
  'visual-verification': { id: 'visual-verification', label: 'Visual verification' },
  'translation-verification': { id: 'translation-verification', label: 'Translation verification (if localized)' },
  'required-expert-review': { id: 'required-expert-review', label: 'Required expert review' },
  'review-date-assigned': { id: 'review-date-assigned', label: 'Review date assigned' },
};
