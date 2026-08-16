import type { Pack } from '@/domain/pack';

import { desertEnvironment } from './environments';

// Locked V1 pack — docs/product/README.md and docs/curriculum/README.md,
// "V1 Scope".
export const desertFoundationsPack: Pack = {
  id: 'desert-foundations',
  environmentId: desertEnvironment.id,
  name: 'Desert Foundations',
};
