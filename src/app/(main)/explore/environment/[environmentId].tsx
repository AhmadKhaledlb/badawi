import { useLocalSearchParams } from 'expo-router';

import { RoutePlaceholder } from '@/components/route-placeholder';

export default function EnvironmentScreen() {
  const { environmentId } = useLocalSearchParams<{ environmentId: string }>();

  return (
    <RoutePlaceholder label="Environment" paramName="environmentId" paramValue={environmentId} />
  );
}
