import { Tabs, usePathname } from 'expo-router';
import { Platform, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { TabBar, WebNav } from '@/src/components/layout';

const HIDDEN_TAB_BAR_ROUTES = ['/update-profile'];

export default function TabLayout() {
  const white = String(useCSSVariable('--color-white'));
  const pathname = usePathname();
  const hideTabBar = HIDDEN_TAB_BAR_ROUTES.some((r) => pathname.endsWith(r));

  return (
    <View style={{ flex: 1, backgroundColor: Platform.OS === 'web' ? white : undefined }}>
      {Platform.OS === 'web' && <WebNav />}
      <Tabs
        initialRouteName="(home)"
        tabBar={Platform.OS === 'web' || hideTabBar ? () => null : (props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarStyle: { position: 'absolute' },
        }}
      >
        <Tabs.Screen name="(home)" />
        <Tabs.Screen name="(images)" />
        <Tabs.Screen name="(documents)" />
      </Tabs>
    </View>
  );
}
