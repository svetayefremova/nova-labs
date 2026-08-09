import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Platform, ScrollView, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';

import { Header, PageWrapper, WebNav } from '@/src/components/layout';
import { NotificationCard, NotificationSectionHeader } from '@/src/components/notifications';
import { Button, Icon, Text } from '@/src/components/ui';
import { DESKTOP, TABLET } from '@/src/constants/layout';
import { NOTIFICATIONS_EARLIER, NOTIFICATIONS_NEW } from '@/src/data/mock-notifications';

export default function NotificationsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTabletOrDesktop = width >= TABLET;
  const isDesktop = width >= DESKTOP;
  const textColor = String(useCSSVariable('--color-text'));

  return (
    <View className="flex-1">
      {Platform.OS === 'web' ? (
        <WebNav />
      ) : (
        <Header
          onBack={() => router.back()}
          rightSlot={
            <Button
              variant="ghost"
              className="bg-white rounded-full px-4"
              onPress={() => {}}
              size="sm"
            >
              <Icon name="check-double" size={16} color={textColor} />
              <Button.Label className="text-text normal-case font-sans-bold text-[14px]">
                {t('notifications.mark_all_read')}
              </Button.Label>
            </Button>
          }
        />
      )}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 112 }}
        showsVerticalScrollIndicator={false}
      >
        <PageWrapper className="pt-6">
          <View className="px-5 pb-5 gap-1">
            <View className="flex-row items-center justify-between">
              <Text variant="heading">{t('notifications.title')}</Text>
              {isTabletOrDesktop && (
                <Button
                  variant="ghost"
                  className="bg-white rounded-full px-4"
                  onPress={() => {}}
                  size="sm"
                >
                  <Icon name="check-double" size={16} color={textColor} />
                  <Button.Label className="text-text normal-case font-sans-bold text-[14px]">
                    {t('notifications.mark_all_read')}
                  </Button.Label>
                </Button>
              )}
            </View>
            <Text variant="label" color="muted">
              {t('notifications.subtitle')}
            </Text>
          </View>

          <View style={isDesktop ? { width: '80%' } : undefined}>
            <NotificationSectionHeader label={t('notifications.section_new')} />
            {NOTIFICATIONS_NEW.map((item) => (
              <NotificationCard key={item.id} item={item} />
            ))}
            <NotificationSectionHeader label={t('notifications.section_earlier')} />
            {NOTIFICATIONS_EARLIER.map((item) => (
              <NotificationCard key={item.id} item={item} />
            ))}
          </View>
        </PageWrapper>
      </ScrollView>
    </View>
  );
}
