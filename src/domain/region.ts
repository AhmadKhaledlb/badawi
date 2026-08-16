export type RegionId = string;

// docs/product/README.md, docs/architecture/README.md — top of the
// Region → Environment → Pack → Unit → Challenge hierarchy.
export type Region = {
  id: RegionId;
  name: string;
};
