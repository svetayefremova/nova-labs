import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import type { BottomTabBarProps } from 'expo-router/build/react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';

import { Icon, type IconName } from '@/src/components/ui';

const TAB_CONFIG: Record<
  string,
  { labelKey: string; icon: IconName; href: string }
> = {
  '(home)': { labelKey: 'home', icon: 'home', href: '/(tabs)/(home)' },
  '(images)': { labelKey: 'images', icon: 'images', href: '/(tabs)/(images)' },
  '(documents)': {
    labelKey: 'documents',
    icon: 'documents',
    href: '/(tabs)/(documents)',
  },
};

const BUTTON_SIZE = 52;

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const textColor = String(useCSSVariable('--color-text'));
  const activeColor = String(useCSSVariable('--color-primary-foreground'));

  const [slideAnim] = useState(
    () => new Animated.Value(state.index * BUTTON_SIZE),
  );

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: state.index * BUTTON_SIZE,
      useNativeDriver: Platform.OS !== 'web',
      damping: 20,
      stiffness: 200,
      mass: 0.8,
    }).start();
  }, [state.index, slideAnim]);

  return (
    <View
      className="absolute left-0 right-0 z-40 items-center"
      style={{
        bottom: Math.max(insets.bottom + 8, 24),
        pointerEvents: 'box-none',
      }}
    >
      <View
        className="w-42 h-[60px] rounded-[28px]"
        accessibilityRole="tablist"
      >
        <View className="flex-1 rounded-[28px] overflow-hidden">
          <BlurView
            intensity={34}
            tint="dark"
            style={[
              {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              },
              Platform.OS === 'android' && {
                backgroundColor: 'rgba(0,0,0,0.5)',
              },
              Platform.OS === 'web' && { backgroundColor: 'rgba(0,0,0,0.34)' },
            ]}
          >
            <View style={{ flexDirection: 'row', position: 'relative' }}>
              <Animated.View
                style={{
                  position: 'absolute',
                  width: BUTTON_SIZE,
                  height: BUTTON_SIZE,
                  borderRadius: BUTTON_SIZE / 2,
                  backgroundColor: activeColor,
                  top: 0,
                  transform: [{ translateX: slideAnim }],
                }}
              />

              {state.routes.map((route, index) => {
                const focused = state.index === index;
                const tab = TAB_CONFIG[route.name];

                const onPress = () => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
                  if (!focused && !event.defaultPrevented) {
                    router.navigate(tab.href as '/');
                  }
                };

                return (
                  <Pressable
                    key={route.key}
                    onPress={onPress}
                    style={{
                      width: BUTTON_SIZE,
                      height: BUTTON_SIZE,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: focused }}
                    accessibilityLabel={tab ? t(tab.labelKey) : undefined}
                  >
                    {tab && (
                      <Icon
                        name={tab.icon}
                        size={24}
                        color={focused ? textColor : 'white'}
                      />
                    )}
                  </Pressable>
                );
              })}
            </View>
          </BlurView>
        </View>
      </View>
    </View>
  );
}
