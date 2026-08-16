// LOCKED — docs/curriculum/v1-curriculum-spec.md §10 ("Safety
// Architecture"), derived from BADAWI Phase 2 Master Specification §2H.
// This models the CLASS of field-safety gate a Challenge requires, not any
// specific threshold, symptom wording, or gating UI/logic — those remain
// intentionally unresolved production dependencies (spec §10.11, §15).
export type SafetyGateClassId = 'SG0' | 'SG1' | 'SG2';

export const SAFETY_GATE_CLASSES: Record<SafetyGateClassId, string> = {
  SG0: 'No field safety gate required',
  SG1: 'Standard Field Gate',
  SG2: 'Enhanced Field Gate',
};
