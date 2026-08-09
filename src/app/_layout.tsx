import '@/src/global.css';
import '@/src/i18n';

import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { type HeroUINativeConfig, HeroUINativeProvider } from 'heroui-native';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Uniwind, useCSSVariable } from 'uniwind';

import { UserProfileProvider } from '@/src/hooks/use-user-profile';

ExpoSplashScreen.preventAutoHideAsync();
Uniwind.setTheme('light');

const config: HeroUINativeConfig = {
  textProps: {
    allowFontScaling: true,
    maxFontSizeMultiplier: 1.5,
  },
  devInfo: {
    stylingPrinciples: false,
  },
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  const background = String(useCSSVariable('--color-background'));
  const white = String(useCSSVariable('--color-white'));

  useEffect(() => {
    if (fontsLoaded) {
      ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView className="flex-1">
      <KeyboardProvider>
        <SafeAreaProvider>
          <UserProfileProvider>
            <HeroUINativeProvider config={config}>
              <Stack
                screenOptions={{
                  contentStyle: {
                    backgroundColor: Platform.OS === 'web' ? white : background,
                  },
                  animation: 'none',
                }}
              >
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                  name="notifications"
                  options={{ headerShown: false }}
                />
              </Stack>
              <StatusBar style="auto" />
            </HeroUINativeProvider>
          </UserProfileProvider>
        </SafeAreaProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
