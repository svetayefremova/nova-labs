import { useRouter } from 'expo-router';
import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';

import { Button, Icon, Text } from '@/src/components/ui';
import { GradientShell } from '@/src/components/welcome/gradient-shell';
import { ScanViewport } from '@/src/components/welcome/scan-viewport';
import { CONTENT_MAX_WIDTH, DESKTOP, TABLET } from '@/src/constants/layout';
import { shadows } from '@/src/constants/theme';

import { GradientColumn } from './gradient-column';
import { ScreenContent } from './screen-content';

type Props = {
  scanLabel?: string;
  showBack?: boolean;
  children: ReactNode;
};

export function AuthShell({ scanLabel, showBack = true, children }: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const yellow = String(useCSSVariable('--color-accent-yellow'));
  const mutedColor = String(useCSSVariable('--color-muted'));
  const white = String(useCSSVariable('--color-reverse'));

  if (width >= DESKTOP) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-5">
        <View
          className="flex-row overflow-hidden rounded-3xl w-full max-w-[1180px] h-[680px]"
          style={shadows.card}
        >
          <GradientColumn
            scanLabel={scanLabel}
            footer={
              <Text variant="caption" className="text-white/40">
                {t('welcome.footer')}
              </Text>
            }
          >
            <View className="gap-4">
              <Text
                variant="display"
                className="text-reverse text-[42px] leading-[48px]"
              >
                {t('welcome.headline')}
              </Text>
              <Text variant="body" className="text-reverse-muted leading-6">
                {t('welcome.subtitle')}
              </Text>
            </View>
          </GradientColumn>

          <View
            className="bg-surface items-center justify-center"
            style={{ width: '50%' }}
          >
            <View
              className="py-12"
              style={{
                width: '100%',
                maxWidth: CONTENT_MAX_WIDTH,
                paddingHorizontal: 40,
              }}
            >
              {showBack && (
                <Button
                  variant="ghost"
                  className="self-start mb-6 px-0"
                  onPress={() => router.back()}
                >
                  <Icon name="arrow-left" size={18} color={mutedColor} />
                  <Button.Label className="text-muted normal-case font-sans-bold text-[14px]">
                    {t('back')}
                  </Button.Label>
                </Button>
              )}

              {children}
            </View>
          </View>
        </View>
      </View>
    );
  }

  if (width >= TABLET) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8">
        <View
          className="w-full max-w-[520px] bg-surface rounded-3xl overflow-hidden"
          style={shadows.card}
        >
          <View className="h-[260px] overflow-hidden rounded-t-3xl">
            <GradientShell fullHeight>
              <View className="flex-1 flex-row items-center justify-between px-10">
                <View className="flex-1 gap-3 pr-6">
                  <View className="flex-row items-center gap-2">
                    <Icon name="reticle" size={28} color={yellow} />
                    <Text variant="title" color="reverse">
                      {t('app_name', 'Nova')}
                    </Text>
                  </View>
                  <Text
                    variant="display"
                    className="text-reverse text-[28px] leading-[34px]"
                  >
                    {t('welcome.headline')}
                  </Text>
                  <Text
                    variant="body"
                    className="text-reverse-muted text-[13px] leading-5"
                  >
                    {t('welcome.subtitle')}
                  </Text>
                </View>
                <ScanViewport icon="reticle" size={80} label={scanLabel} />
              </View>
            </GradientShell>
          </View>

          <View className="px-10 pt-8 pb-10">
            {showBack && (
              <Button
                variant="ghost"
                className="self-start mb-6 px-0"
                onPress={() => router.back()}
              >
                <Icon name="arrow-left" size={18} color={mutedColor} />
                <Button.Label className="text-muted normal-case font-sans-bold text-[14px]">
                  {t('back')}
                </Button.Label>
              </Button>
            )}

            {children}
          </View>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <GradientShell>
        <ScreenContent>
          <View className="relative flex-row items-center justify-center px-4 pt-1">
            <View className="flex-row items-center">
              <Icon name="reticle" size={36} color={yellow} />
              <Text variant="title" color="reverse">
                {t('app_name', 'Nova')}
              </Text>
            </View>
            {showBack && (
              <Button
                variant="ghost"
                className="absolute left-4 bg-white/20 rounded-full px-3 py-2"
                accessibilityLabel={t('back')}
                isIconOnly
                onPress={() => router.back()}
              >
                <Icon name="arrow-left" size={22} color={white} />
              </Button>
            )}
          </View>
          <View className="flex-1 items-center justify-center">
            <ScanViewport icon="reticle" size={120} label={scanLabel} />
          </View>
        </ScreenContent>

        <View
          className="bg-surface rounded-t-[36px] px-8 pt-8"
          style={{ paddingBottom: insets.bottom, ...shadows.sheet }}
        >
          <ScrollView
            bounces={false}
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="never"
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 8,
            }}
          >
            {children}
          </ScrollView>
        </View>
      </GradientShell>
    </KeyboardAvoidingView>
  );
}
