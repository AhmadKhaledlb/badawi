import { useLocalSearchParams } from 'expo-router';

import { RoutePlaceholder } from '@/components/route-placeholder';

export default function ChallengeScreen() {
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();

  return <RoutePlaceholder label="Challenge" paramName="challengeId" paramValue={challengeId} />;
}
