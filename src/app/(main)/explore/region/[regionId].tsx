import { useLocalSearchParams } from 'expo-router';

import { RoutePlaceholder } from '@/components/route-placeholder';

export default function RegionScreen() {
  const { regionId } = useLocalSearchParams<{ regionId: string }>();

  return <RoutePlaceholder label="Region" paramName="regionId" paramValue={regionId} />;
}
