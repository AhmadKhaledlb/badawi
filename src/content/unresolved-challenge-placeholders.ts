// BADAWI V1 locks the COUNT of challenges (28) — docs/product/README.md
// and docs/curriculum/README.md, "V1 Scope" — but does NOT document
// individual challenge names or which Unit each challenge belongs to.
//
// This is intentionally NOT a `Challenge` (src/domain/challenge.ts): a
// real Challenge always belongs to exactly one Unit, and assigning a
// unitId here would fabricate curriculum structure that isn't authorized.
// These are unresolved staging placeholders only — unmistakably not real
// curriculum content, and not assigned to any Unit.
//
// When curriculum content is authored, each placeholder should be
// replaced by a real `Challenge` (with an authoritative unitId, name, and
// order) pushed into `challenges` in challenges.ts — not "resolved" by
// inventing a unit mapping here.
export type UnresolvedChallengePlaceholder = {
  id: string;
  name: string;
};

export const V1_CHALLENGE_COUNT = 28;

export const unresolvedChallengePlaceholders: UnresolvedChallengePlaceholder[] = Array.from(
  { length: V1_CHALLENGE_COUNT },
  (_, index) => {
    const number = index + 1;
    return {
      id: `challenge-placeholder-${number}`,
      name: `Unresolved challenge placeholder ${number} (awaiting curriculum unit assignment)`,
    };
  }
);

export function findUnresolvedChallengePlaceholderById(
  id: string
): UnresolvedChallengePlaceholder | undefined {
  return unresolvedChallengePlaceholders.find((placeholder) => placeholder.id === id);
}
