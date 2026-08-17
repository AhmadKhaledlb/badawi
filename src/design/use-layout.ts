import { useWindowDimensions } from 'react-native';

import { breakpoints, gutter, type BreakpointName } from './tokens/layout';

export type LayoutInfo = {
  /** Current viewport width in dp. */
  width: number;
  /** Resolved breakpoint bucket. */
  size: Exclude<BreakpointName, 'compact'> | 'compact';
  /** True on tablet-portrait and wider. */
  isMedium: boolean;
  /** True on desktop-width viewports. */
  isExpanded: boolean;
  /** Screen edge padding for this breakpoint. */
  gutter: number;
};

// Resolves responsive layout from the live viewport rather than from a
// platform check, so split-view, foldables, and a resized browser window all
// behave correctly (`badawi-visual-design`, "Responsive design"). Every screen
// reads its gutter and column decisions from here so the same viewport always
// produces the same composition.
export function useLayout(): LayoutInfo {
  const { width } = useWindowDimensions();

  const isExpanded = width >= breakpoints.expanded;
  const isMedium = width >= breakpoints.medium;

  return {
    width,
    size: isExpanded ? 'expanded' : isMedium ? 'medium' : 'compact',
    isMedium,
    isExpanded,
    gutter: isExpanded ? gutter.expanded : isMedium ? gutter.medium : gutter.compact,
  };
}
