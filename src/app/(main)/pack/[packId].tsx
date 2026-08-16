import { useLocalSearchParams } from 'expo-router';

import { RoutePlaceholder } from '@/components/route-placeholder';

export default function PackScreen() {
  const { packId } = useLocalSearchParams<{ packId: string }>();

  return <RoutePlaceholder label="Pack" paramName="packId" paramValue={packId} />;
}
