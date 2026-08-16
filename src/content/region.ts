import type { Region } from '@/domain/region';

// Locked V1 region — docs/product/README.md and docs/curriculum/README.md,
// "V1 Scope".
export const arabianPeninsulaRegion: Region = {
  id: 'arabian-peninsula',
  name: 'Arabian Peninsula',
};

export function findRegionById(id: string): Region | undefined {
  return arabianPeninsulaRegion.id === id ? arabianPeninsulaRegion : undefined;
}
