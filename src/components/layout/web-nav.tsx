import { type Href, router, useSegments } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';

import { NotificationsButton } from '@/src/components/notifications';
import { Icon, type IconName, Text } from '@/src/components/ui';
import { DESKTOP } from '@/src/constants/layout';
import { Routes } from '@/src/constants/routes';

import { PageWrapper } from './page-wrapper';

const NAV_ITEMS: { labelKey: string; icon: IconName; href: Href }[] = [
  { labelKey: 'home', icon: 'home', href: Routes.home },
  { labelKey: 'images', icon: 'images', href: Routes.images },
  { labelKey: 'documents', icon: 'documents', href: Routes.documents },
];

export function WebNav() {
  const { t } = useTranslation();
  const segments = useSegments();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isDesktop = width >= DESKTOP;
  const activeColor = String(useCSSVariable('--color-text'));
  const mutedColor = String(useCSSVariable('--color-muted'));

  const navItems = (
    <View className="flex-row items-center gap-1">
      {NAV_ITEMS.map((item) => {
        const segmentMap: Record<string, string> = {
          [Routes.home]: '(home)',
          [Routes.images]: '(images)',
          [Routes.documents]: '(documents)',
        };
        const isActive = segments.includes(segmentMap[String(item.href)] as never);

        return (
          <Pressable
            key={item.labelKey}
            onPress={() => router.navigate(item.href)}
            accessibilityRole="link"
            accessibilityLabel={t(item.labelKey)}
            accessibilityState={{ selected: isActive }}
            className="flex-row items-center gap-2 px-3 md:px-4 py-2 rounded-full pointer"
            style={({ hovered }: { pressed: boolean; hovered?: boolean }) => [
              isActive && { backgroundColor: '#ffffff' },
              !isActive && hovered && { backgroundColor: 'rgba(0,0,0,0.04)' },
            ]}
          >
            <Icon name={item.icon} size={18} color={isActive ? activeColor : mutedColor} />
            <Text
              variant="label"
              className="capitalize"
              style={{
                color: isActive ? activeColor : mutedColor,
                fontWeight: isActive ? '600' : '400',
              }}
            >
              {t(item.labelKey)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );

  return (
    <View
      className="bg-background border-b-1 border-background-secondary"
      style={{ paddingTop: insets.top }}
    >
      <PageWrapper className="py-2 px-4">
        <View className="flex-row items-center gap-6">
          <Pressable
            onPress={() => router.navigate(Routes.home)}
            accessibilityRole="link"
            accessibilityLabel="Nova Home"
            className="flex-row items-center gap-2 mr-4"
          >
            <Text variant="title">Nova</Text>
          </Pressable>
          {isDesktop ? <View className="flex-1">{navItems}</View> : <View className="flex-1" />}
          <NotificationsButton />
        </View>
        {!isDesktop && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            className="mt-1 pb-1 px-2 -mx-3"
          >
            {navItems}
          </ScrollView>
        )}
      </PageWrapper>
    </View>
  );
}
