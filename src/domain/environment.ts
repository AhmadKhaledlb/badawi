import type { RegionId } from './region';

export type EnvironmentId = string;

export type Environment = {
  id: EnvironmentId;
  regionId: RegionId;
  name: string;
};
