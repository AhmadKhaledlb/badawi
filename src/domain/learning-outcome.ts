// LOCKED — docs/curriculum/v1-curriculum-spec.md §5 ("Eight Desert
// Learning Outcomes"), derived from BADAWI Phase 2 Master Specification
// §2C. Scoped to the V1 Desert Pack; a future Pack's learning outcomes
// would be a separate set, not an extension of this one.
export type LearningOutcomeId =
  | 'DLO1'
  | 'DLO2'
  | 'DLO3'
  | 'DLO4'
  | 'DLO5'
  | 'DLO6'
  | 'DLO7'
  | 'DLO8';

export const DESERT_LEARNING_OUTCOMES: Record<
  LearningOutcomeId,
  { id: LearningOutcomeId; name: string }
> = {
  DLO1: { id: 'DLO1', name: 'Read the Desert Environment' },
  DLO2: { id: 'DLO2', name: 'Understand Desert Climate & Exposure' },
  DLO3: { id: 'DLO3', name: 'Understand Water in the Desert Landscape' },
  DLO4: { id: 'DLO4', name: 'Navigate & Maintain Environmental Orientation' },
  DLO5: { id: 'DLO5', name: 'Move, Prepare & Operate Safely in Desert Terrain' },
  DLO6: { id: 'DLO6', name: 'Observe Desert Life' },
  DLO7: { id: 'DLO7', name: 'Understand Human Desert Adaptation & Knowledge' },
  DLO8: { id: 'DLO8', name: 'Explore Responsibly, Assess Risk & Reflect' },
};
