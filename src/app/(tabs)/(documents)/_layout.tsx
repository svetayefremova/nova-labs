import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Header } from '@/src/components/layout';

export default function DocumentsLayout() {
  const background = String(useCSSVariable('--color-background'));
  const white = String(useCSSVariable('--color-white'));

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: Platform.OS === 'web' ? white : background },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: Platform.OS === 'web' ? () => null : () => <Header />,
        }}
      />
      <Stack.Screen name="document-detail" options={{ headerShown: true }} />
      <Stack.Screen name="file-viewer" options={{ headerShown: true }} />
    </Stack>
  );
}
