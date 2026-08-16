import type { PackId } from './pack';

export type UnitId = string;

export type Unit = {
  id: UnitId;
  packId: PackId;
  name: string;
  /** 1-based position of this unit within its pack. */
  order: number;
};
