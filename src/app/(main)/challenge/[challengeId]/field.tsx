import { useLocalSearchParams } from 'expo-router';

import { RoutePlaceholder } from '@/components/route-placeholder';

export default function ChallengeFieldScreen() {
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();

  return <RoutePlaceholder label="Field Mode" paramName="challengeId" paramValue={challengeId} />;
}
