import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { AuthShell } from '@/src/components/layout';
import { Button, Icon, type IconName, Text } from '@/src/components/ui';
import { TABLET } from '@/src/constants/layout';

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
  const iconColor = String(useCSSVariable('--color-text-text'));

  return (
    <View className="flex-row gap-4 items-start">
      <View className="w-12 h-12 rounded-full bg-background items-center justify-center shrink-0">
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

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const white = String(useCSSVariable('--color-reverse'));

  const isTabletOrDesktop = width >= TABLET;

  return (
    <AuthShell showBack={false} scanLabel={t('welcome.hud_whole_body')}>
      {isTabletOrDesktop ? (
        <View className="gap-8">
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

          <View className="gap-3 items-center">
            <Button
              size="lg"
              onPress={() => router.push('/(auth)/create-account')}
            >
              <Button.Label className="text-reverse font-sans-bold text-lg">
                {t('onboarding.create_account')}
              </Button.Label>
              <Icon name="arrow-forward" size={18} color={white} />
            </Button>
            <Button
              variant="ghost"
              onPress={() => router.push('/(auth)/sign-in')}
            >
              <Button.Label className="text-muted normal-case font-sans-bold text-base">
                {t('welcome.login')}
              </Button.Label>
            </Button>
          </View>
        </View>
      ) : (
        <View>
          <Text
            variant="overline"
            color="primary"
            className="text-[12px] font-sans-bold"
          >
            {t('welcome.eyebrow')}
          </Text>
          <Text variant="display" className="text-[44px] leading-[44px] mt-4">
            {t('welcome.headline')}
          </Text>
          <Text
            variant="body"
            color="muted"
            className="font-sans-medium leading-6 mt-4"
          >
            {t('welcome.subtitle')}
          </Text>

          <Button
            size="lg"
            className="w-full mt-6"
            onPress={() => router.push('/(auth)/onboarding')}
          >
            <Button.Label className="text-reverse font-sans-bold text-lg">
              {t('welcome.cta')}
            </Button.Label>
            <Icon name="arrow-forward" size={20} color={white} />
          </Button>

          <Button
            variant="ghost"
            className="w-full mt-2"
            onPress={() => router.push('/(auth)/sign-in')}
          >
            <Button.Label className="text-muted normal-case font-sans-bold text-[16px]">
              {t('welcome.login')}
            </Button.Label>
          </Button>
        </View>
      )}
    </AuthShell>
  );
}
