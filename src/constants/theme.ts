// Structural theme primitives consumed by shared components.
// The Fonts mapping below is a temporary structural implementation value
// only — it is NOT the locked BADAWI design system (typography is not yet
// approved; see docs/design/README.md).
//
// The old light/dark Colors mapping that used to live here has been
// retired: BADAWI V1 is light-mode only (docs/design/README.md,
// "Appearance Mode"), and colors are now sourced from the approved
// semantic tokens in src/design/tokens/.
import '@/global.css';

import { Platform } from 'react-native';

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});
