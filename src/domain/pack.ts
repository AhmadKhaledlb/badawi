import type { EnvironmentId } from './environment';

export type PackId = string;

export type Pack = {
  id: PackId;
  environmentId: EnvironmentId;
  name: string;
};
