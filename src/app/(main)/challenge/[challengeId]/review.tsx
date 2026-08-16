import { useLocalSearchParams } from 'expo-router';

import { RoutePlaceholder } from '@/components/route-placeholder';

export default function ChallengeReviewScreen() {
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();

  return (
    <RoutePlaceholder label="Challenge Review" paramName="challengeId" paramValue={challengeId} />
  );
}
