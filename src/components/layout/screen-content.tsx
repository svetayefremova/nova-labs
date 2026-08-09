import { Platform, View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = ViewProps & { extraTopPadding?: number };

export function ScreenContent({ style, extraTopPadding = 0, ...props }: Props) {
  const insets = useSafeAreaInsets();
  const webExtra = Platform.OS === 'web' ? 24 : 0;

  return (
    <View
      style={[{ flex: 1, paddingTop: insets.top + webExtra + extraTopPadding }, style]}
      {...props}
    />
  );
}
