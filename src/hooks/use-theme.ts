import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// react-native can report 'unspecified' on some platforms; default to light.
export function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === 'unspecified' ? 'light' : scheme;

  return Colors[theme];
}
