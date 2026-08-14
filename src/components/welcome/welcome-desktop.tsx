import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Button, Icon, type IconName, Text } from '@/src/components/ui';

import { GradientShell } from './gradient-shell';
import { ScanViewport } from './scan-viewport';

const FEATURES: { icon: IconName; titleKey: string; bodyKey: string }[] = [
  {
    icon: 'lungs',
    titleKey: 'onboarding.step1_title',
    bodyKey: 'onboarding.step1_body',
  },
  {
    icon: 'brain',
    titleKey: 'onboarding.step2_title',
    bodyKey: 'onboarding.step2_body',
  },
  {
    icon: 'stethoscope',
    titleKey: 'onboarding.step3_title',
    bodyKey: 'onboarding.step3_body',
  },
];

function FeatureRow({ icon, titleKey, bodyKey }: (typeof FEATURES)[number]) {
  const { t } = useTranslation();
  const iconColor = String(useCSSVariable('--color-foreground'));

  return (
    <View className="flex-row gap-4 items-start">
      <View className="w-12 h-12 rounded-2xl bg-primary-foreground items-center justify-center shrink-0">
        <Icon name={icon} size={22} color={iconColor} />
      </View>
      <View className="flex-1 gap-1">
        <Text variant="label" className="font-sans-bold">
          {t(titleKey).replace('\n', ' ')}
        </Text>
        <Text variant="body" color="muted">
          {t(bodyKey)}
        </Text>
      </View>
    </View>
  );
}

export function WelcomeDesktop() {
  const { t } = useTranslation();
  const router = useRouter();
  const yellow = String(useCSSVariable('--color-accent-yellow'));
  const white = String(useCSSVariable('--color-reverse'));

  return (
    <View className="flex-1 bg-background items-center justify-center">
      <View
        className="flex-row overflow-hidden rounded-3xl"
        style={{ width: '100%', maxWidth: 1180, height: 680 }}
      >
        {/* Left — gradient panel */}
        <View style={{ width: '50%' }}>
          <GradientShell fullHeight>
            <View className="flex-1 px-10 py-10 justify-between">
              <View className="flex-row items-center gap-2">
                <Icon name="reticle" size={36} color={yellow} />
                <Text variant="title" color="reverse">
                  {t('app_name', 'Nova')}
                </Text>
              </View>

              <View className="items-center">
                <ScanViewport size={280} label={t('welcome.hud_whole_body')} />
              </View>

              <View className="gap-4">
                <Text
                  variant="overline"
                  className="text-white/60 font-sans-bold"
                >
                  {t('splash.tagline')}
                </Text>
                <Text
                  variant="display"
                  className="text-reverse text-[42px] leading-[48px]"
                >
                  {t('welcome.headline')}
                </Text>
                <Text variant="body" className="text-reverse-muted leading-6">
                  {t('welcome.subtitle')}
                </Text>
                <Text variant="caption" className="text-white/40 mt-4">
                  {t('welcome.footer')}
                </Text>
              </View>
            </View>
          </GradientShell>
        </View>

        {/* Right — white panel */}
        <View
          className="bg-surface justify-center px-14 py-12 gap-8"
          style={{ width: '50%' }}
        >
          <View className="gap-6">
            <Text variant="overline" color="primary" className="font-sans-bold">
              {t('welcome.eyebrow')}
            </Text>

            <View className="gap-6">
              {FEATURES.map((f) => (
                <FeatureRow key={f.titleKey} {...f} />
              ))}
            </View>
          </View>

          <View className="flex-row gap-3">
            <Button
              className="flex-1"
              onPress={() => router.push('/(auth)/create-account')}
            >
              <Button.Label className="text-reverse font-sans-bold text-base">
                {t('onboarding.create_account')}
              </Button.Label>
              <Icon name="arrow-forward" size={18} color={white} />
            </Button>

            <Button
              variant="ghost"
              className="flex-1"
              onPress={() => router.push('/(auth)/sign-in')}
            >
              <Button.Label className="text-muted normal-case font-sans-bold text-base">
                {t('welcome.login')}
              </Button.Label>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
