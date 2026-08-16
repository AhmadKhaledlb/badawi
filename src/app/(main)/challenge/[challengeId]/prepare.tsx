import { useLocalSearchParams } from 'expo-router';

import { RoutePlaceholder } from '@/components/route-placeholder';

export default function ChallengePrepareScreen() {
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();

  return (
    <RoutePlaceholder label="Challenge Prepare" paramName="challengeId" paramValue={challengeId} />
  );
}
