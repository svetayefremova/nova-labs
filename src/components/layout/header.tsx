import { useRouter } from 'expo-router';
import { cn } from 'heroui-native';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';

import { NotificationsButton } from '@/src/components/notifications';
import { Button, Icon, IconButton, Text } from '@/src/components/ui';
import { Routes } from '@/src/constants/routes';

import { PageWrapper } from './page-wrapper';

type Props = {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  className?: string;
  onPrimary?: boolean;
  rightSlot?: ReactNode;
};

export function Header({
  title,
  subtitle,
  onBack,
  className,
  onPrimary,
  rightSlot,
}: Props) {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const reverseColor = String(useCSSVariable('--color-reverse'));
  const mutedColor = String(useCSSVariable('--color-muted'));

  const isChildScreen = !!onBack;

  if (Platform.OS === 'web' && isChildScreen) {
    return (
      <View className={cn('bg-white', className)}>
        <PageWrapper className="px-4">
          <Button variant="ghost" className="self-start px-0" onPress={onBack}>
            <Icon name="arrow-left" size={18} color={mutedColor} />
            <Button.Label className="text-muted normal-case font-sans-bold text-[14px]">
              {t('back')}
            </Button.Label>
          </Button>
          {title && (
            <Text variant="heading" className="mt-4">
              {title}
            </Text>
          )}
          {subtitle && (
            <Text variant="label" color="muted">
              {subtitle}
            </Text>
          )}
        </PageWrapper>
      </View>
    );
  }

  return (
    <View
      className={cn('bg-background pb-2', className)}
      style={{ paddingTop: insets.top + 16 }}
    >
      <PageWrapper className="px-4">
        <View className="flex-row items-center justify-between">
          {onBack ? (
            <IconButton
              name="arrow-left"
              onPress={onBack}
              accessibilityLabel={t('accessibility.go_back')}
              className={onPrimary ? 'bg-white/20' : ''}
              color={onPrimary ? reverseColor : undefined}
            />
          ) : (
            <Pressable
              onPress={() => router.navigate(Routes.home)}
              accessibilityRole="link"
              accessibilityLabel="Nova Home"
            >
              <Text variant="title">Nova</Text>
            </Pressable>
          )}
          <View className="ml-auto">
            {rightSlot ?? <NotificationsButton onPrimary={onPrimary} />}
          </View>
        </View>
        {title && (
          <Text variant="heading" className="mt-4">
            {title}
          </Text>
        )}
        {subtitle && (
          <Text variant="label" color="muted">
            {subtitle}
          </Text>
        )}
      </PageWrapper>
    </View>
  );
}
