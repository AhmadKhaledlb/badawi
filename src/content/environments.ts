import type { Environment } from '@/domain/environment';

import { arabianPeninsulaRegion } from './region';

// Locked V1 environment — docs/product/README.md and
// docs/curriculum/README.md, "V1 Scope".
export const desertEnvironment: Environment = {
  id: 'desert',
  regionId: arabianPeninsulaRegion.id,
  name: 'Desert',
};

export function findEnvironmentById(id: string): Environment | undefined {
  return desertEnvironment.id === id ? desertEnvironment : undefined;
}
