export { arabianPeninsulaRegion, findRegionById } from './region';
export { desertEnvironment, findEnvironmentById } from './environments';
export { desertFoundationsPack, findPackById } from './packs';
export { findUnitById, findUnitsForPack, units, V1_UNIT_COUNT } from './units';
export { challenges, findChallengeById } from './challenges';
export {
  findUnresolvedChallengePlaceholderById,
  unresolvedChallengePlaceholders,
  V1_CHALLENGE_COUNT,
} from './unresolved-challenge-placeholders';
export type { UnresolvedChallengePlaceholder } from './unresolved-challenge-placeholders';
export { resolveChallenge } from './resolve-challenge';
export type { ResolvedChallenge } from './resolve-challenge';
export { checkV1Integrity, challengeReferencesValidUnit } from './integrity';
export type { V1IntegrityResult } from './integrity';
