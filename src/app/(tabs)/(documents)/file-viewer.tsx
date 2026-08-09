import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import { Header } from '@/src/components/layout';

export default function FileViewerScreen() {
  const router = useRouter();
  const { uri } = useLocalSearchParams<{ uri: string; title: string }>();

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <Header onBack={() => router.back()} />,
        }}
      />
      <View style={{ flex: 1 }}>
        <WebView source={{ uri }} style={{ flex: 1 }} originWhitelist={['*']} />
      </View>
    </>
  );
}
