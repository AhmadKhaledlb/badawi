// docs/curriculum/v1-curriculum-spec.md §14 ("Locked vs Working vs
// Unverified") distinguishes three things Claude must not conflate:
//   1. LOCKED curriculum architecture/specification
//   2. WORKING learner-facing wording/titles — NOT final production copy
//   3. UNVERIFIED factual content requiring research/review
//
// This file only tackles (1) vs (2), at the field level. (3) is already
// tracked independently and per-Challenge via `researchStatus`
// (src/domain/research-status.ts, RQ0–RQ4) — that axis is orthogonal to
// this one and must stay that way: a field can be locked-and-unresearched,
// working-and-unresearched, etc. Do not use WorkingCopyText/LockedSpecText
// to infer anything about research readiness, and do not use
// researchStatus to infer anything about whether wording is final.

// A string that is WORKING curriculum copy: a title or learner-facing
// prompt wording the spec explicitly leaves for production writing to
// finalize (spec §14, "NOT FINAL — Learner-facing wording": "Challenge
// titles; Unit titles; exact prompts; ..."). At runtime this is just a
// string — existing rendering code needs no changes — but the brand means
// the type system, not only a comment, stops a value from being produced
// without going through `working()` below.
export type WorkingCopyText = string & { readonly __contentStatus: 'working' };

// A curriculum specification string: LOCKED in substance — the spec locks
// the existence and meaning of fields like a Challenge's Purpose or
// Completion Criteria as part of "the 28 Challenge purposes/specifications"
// (spec §14, "LOCKED — Curriculum architecture") — even though its exact
// English phrasing may still be tightened without changing what it
// specifies. This is deliberately a plain `string` alias, not a second
// brand: `WorkingCopyText` is the only type that needs the `working()`
// escape hatch, so anything NOT wrapped in it is, by construction, in this
// category. The alias exists purely so the field's declared type names
// its status instead of leaving that to a comment alone.
export type LockedSpecText = string;

// The only way to produce a `WorkingCopyText`. A bare string literal does
// not satisfy a `WorkingCopyText`-typed field, so adding a new
// working-copy field (or assigning one field's value to another) without
// going through this helper fails `tsc --noEmit` — see
// src/domain/content-status.test.ts for the regression check.
export function working(text: string): WorkingCopyText {
  return text as WorkingCopyText;
}
