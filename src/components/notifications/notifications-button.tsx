import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Icon } from '@/src/components/ui';

type Props = {
  onPrimary?: boolean;
};

export function NotificationsButton({ onPrimary }: Props) {
  const { t } = useTranslation();
  const defaultColor = String(useCSSVariable('--color-text'));
  const reverseColor = String(useCSSVariable('--color-reverse'));
  const color = onPrimary ? reverseColor : defaultColor;
  // TODO: replace with real data source
  const hasNotifications = true;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t('accessibility.notifications')}
      className={`w-12 h-12 rounded-full items-center justify-center relative ${onPrimary ? 'bg-white/20' : 'bg-white'}`}
      onPress={() => router.push('/notifications')}
    >
      <Icon name="bell" size={24} color={color} />
      {hasNotifications && (
        <View className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent-red-dark" />
      )}
    </Pressable>
  );
}
