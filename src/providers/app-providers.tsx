import type { PropsWithChildren } from 'react';

import { ProgressProvider } from '@/state/progress-context';

// App-level provider composition boundary. Composes the durable local
// progress state (src/state/, src/persistence/) — see
// docs/architecture/README.md, "Data & Persistence". No other app-level
// provider (auth/analytics/etc.) exists yet; add here only when one is
// genuinely needed, not speculatively.
export function AppProviders({ children }: PropsWithChildren) {
  return <ProgressProvider>{children}</ProgressProvider>;
}
