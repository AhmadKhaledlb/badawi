import type { PressableProps } from 'react-native';

import { TextLink } from '@/components/text-link';

type BackLinkProps = Omit<PressableProps, 'children' | 'style'>;

export function BackLink(props: BackLinkProps) {
  return <TextLink label="Back" {...props} />;
}
