import type { PropsWithChildren } from 'react';

// App-level provider composition boundary. Currently composes no provider:
// BADAWI V1 is light-mode only (see docs/design/README.md, "Appearance
// Mode"), so the inherited system-color-scheme ThemeProvider has been
// removed, and no other app-level provider (state/auth/persistence/
// analytics) exists yet. Kept as the established boundary for when one is
// needed, without adding a speculative provider now.
export function AppProviders({ children }: PropsWithChildren) {
  return <>{children}</>;
}
