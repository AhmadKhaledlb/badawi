export { arabianPeninsulaRegion, findRegionById } from './region';
export { desertEnvironment, findEnvironmentById } from './environments';
export { desertFoundationsPack, findPackById } from './packs';
export { findUnitsForPack, units, V1_UNIT_COUNT } from './units';
export { challenges } from './challenges';
export {
  unresolvedChallengePlaceholders,
  V1_CHALLENGE_COUNT,
} from './unresolved-challenge-placeholders';
export type { UnresolvedChallengePlaceholder } from './unresolved-challenge-placeholders';
export { checkV1Integrity, challengeReferencesValidUnit } from './integrity';
export type { V1IntegrityResult } from './integrity';
