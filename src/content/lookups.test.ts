import {
  arabianPeninsulaRegion,
  desertEnvironment,
  desertFoundationsPack,
  findEnvironmentById,
  findPackById,
  findRegionById,
  findUnitById,
  findUnitsForPack,
  units,
  V1_UNIT_COUNT,
} from './index';

describe('content lookup helpers', () => {
  it('findRegionById finds the V1 region by id and returns undefined otherwise', () => {
    expect(findRegionById(arabianPeninsulaRegion.id)).toBe(arabianPeninsulaRegion);
    expect(findRegionById('not-a-real-region')).toBeUndefined();
  });

  it('findEnvironmentById finds the V1 environment by id and returns undefined otherwise', () => {
    expect(findEnvironmentById(desertEnvironment.id)).toBe(desertEnvironment);
    expect(findEnvironmentById('not-a-real-environment')).toBeUndefined();
  });

  it('findPackById finds the V1 pack by id and returns undefined otherwise', () => {
    expect(findPackById(desertFoundationsPack.id)).toBe(desertFoundationsPack);
    expect(findPackById('not-a-real-pack')).toBeUndefined();
  });

  it('findUnitsForPack returns exactly the units belonging to the given pack', () => {
    const result = findUnitsForPack(desertFoundationsPack.id);

    expect(result).toHaveLength(V1_UNIT_COUNT);
    expect(result).toEqual(units);
  });

  it('findUnitsForPack returns an empty array for an unrecognized pack', () => {
    expect(findUnitsForPack('not-a-real-pack')).toEqual([]);
  });

  it('findUnitById finds a known unit by id and returns undefined otherwise', () => {
    const [firstUnit] = units;

    expect(findUnitById(firstUnit.id)).toBe(firstUnit);
    expect(findUnitById('not-a-real-unit')).toBeUndefined();
  });
});
