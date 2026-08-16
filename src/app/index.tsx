import { Redirect } from 'expo-router';

import { useProgress } from '@/state/progress-context';

// Entry routing only — reads existing persisted onboarding-completion
// state to decide where "/" lands. This is not a progression/auth guard:
// no challenge/unit unlocking or safety gating happens here.
// docs/product/README.md, "Core Experience Areas".
export default function Index() {
  const { progress, isHydrated } = useProgress();

  // Hydration is a quick local read; render nothing rather than decide
  // from the still-default in-memory state, so a returning user with
  // completed onboarding isn't briefly (and incorrectly) sent to /welcome.
  if (!isHydrated) {
    return null;
  }

  return <Redirect href={progress.onboardingCompletedAt ? '/home' : '/welcome'} />;
}
