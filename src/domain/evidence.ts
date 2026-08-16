// LOCKED — docs/curriculum/v1-curriculum-spec.md §3 ("Evidence &
// Verification"), derived from BADAWI Phase 2 Master Specification §2A.5.
export type EvidenceMethodId = 'EVM1' | 'EVM2' | 'EVM3' | 'EVM4' | 'EVM5';

export type EvidenceStrengthId = 'E1' | 'E2' | 'E3';

export type VerificationModeId = 'V1' | 'V2' | 'V3';

export const EVIDENCE_METHODS: Record<EvidenceMethodId, string> = {
  EVM1: 'Knowledge Response',
  EVM2: 'Observation Record',
  EVM3: 'Decision & Reasoning Record',
  EVM4: 'Performance Evidence',
  EVM5: 'Reflection Record',
};

export const EVIDENCE_STRENGTHS: Record<EvidenceStrengthId, string> = {
  E1: 'Indicative Evidence',
  E2: 'Applied Evidence',
  E3: 'Demonstrated Evidence',
};

export const VERIFICATION_MODES: Record<VerificationModeId, string> = {
  V1: 'Self-Recorded',
  V2: 'Evidence-Supported',
  V3: 'System-Assessed',
};

// Per-Challenge locked evidence mapping (spec §3, §8). Describes what
// evidence a Challenge is designed to collect and how strong that evidence
// is expected to be — it is not a record of evidence a learner has
// actually submitted, and no assessment/scoring engine reads or writes
// this at runtime yet.
export type EvidenceMapping = {
  methods: EvidenceMethodId[];
  /** Usually one value; some Challenges specify a range (e.g. E2–E3). */
  strength: EvidenceStrengthId[];
  /**
   * An explicit Verification Mode is only stated for a minority of the 28
   * Challenges in the spec (most give Evidence Method/Strength without a
   * separate Verification line). An empty array means "not specified by
   * the spec for this Challenge", not "none" — it is left empty rather
   * than defaulted, per the "do not invent missing mappings" rule.
   */
  verification: VerificationModeId[];
};
