import { useLocalSearchParams } from 'expo-router';

import { RoutePlaceholder } from '@/components/route-placeholder';

export default function UnitScreen() {
  const { unitId } = useLocalSearchParams<{ unitId: string }>();

  return <RoutePlaceholder label="Unit" paramName="unitId" paramValue={unitId} />;
}
