import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';

import { ScreenContent } from '@/src/components/layout';
import { Button, Icon, Text } from '@/src/components/ui';
import { GradientShell } from '@/src/components/welcome/gradient-shell';
import { ScanViewport } from '@/src/components/welcome/scan-viewport';
import { SegmentedProgress } from '@/src/components/welcome/segmented-progress';
import { shadows } from '@/src/constants/theme';

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);

  const yellow = String(useCSSVariable('--color-accent-yellow'));
  const white = String(useCSSVariable('--color-reverse'));

  const steps = [
    {
      icon: 'lungs' as const,
      label: t('onboarding.step1_label'),
      eyebrow: t('onboarding.step1_eyebrow'),
      title: t('onboarding.step1_title'),
      body: t('onboarding.step1_body'),
    },
    {
      icon: 'brain' as const,
      label: t('onboarding.step2_label'),
      eyebrow: t('onboarding.step2_eyebrow'),
      title: t('onboarding.step2_title'),
      body: t('onboarding.step2_body'),
    },
    {
      icon: 'stethoscope' as const,
      label: t('onboarding.step3_label'),
      eyebrow: t('onboarding.step3_eyebrow'),
      title: t('onboarding.step3_title'),
      body: t('onboarding.step3_body'),
    },
  ];

  const current = steps[step];
  const isFirst = step === 0;
  const isLast = step === steps.length - 1;

  const handleNext = () => {
    if (isLast) router.push('/(auth)/create-account');
    else setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);
  const handleSkip = () => router.replace('/(tabs)/(home)');

  return (
    <GradientShell>
      <ScreenContent>
        <View className="relative flex-row items-center justify-center px-4 pt-1">
          <View className="flex-row items-center">
            <Icon name="reticle" size={36} color={yellow} />
            <Text variant="title" color="reverse">
              {t('app_name', 'Nova')}
            </Text>
          </View>
          <Button
            variant="ghost"
            className="absolute left-4 bg-white/20 rounded-full px-3 py-2"
            accessibilityLabel={t('back')}
            isIconOnly
            onPress={isFirst ? () => router.back() : handleBack}
          >
            <Icon name="arrow-left" size={22} color={white} />
          </Button>
          <Button
            variant="ghost"
            className="absolute right-4 bg-white/20 rounded-full px-5 py-2"
            onPress={handleSkip}
          >
            <Button.Label className="text-reverse normal-case font-sans-bold text-[14px]">
              {t('onboarding.skip')}
            </Button.Label>
          </Button>
        </View>
        <View className="flex-1 items-center justify-center">
          <ScanViewport icon={current.icon} label={current.label} />
        </View>
      </ScreenContent>

      <View
        className="bg-surface rounded-t-[36px] px-8 pt-8"
        style={{ paddingBottom: insets.bottom + 24, ...shadows.sheet }}
      >
        <SegmentedProgress step={step} count={steps.length} />
        <Text variant="overline" color="primary" className="text-[12px] font-sans-bold">
          {current.eyebrow}
        </Text>
        <Text variant="display" className="text-[38px] leading-[44px] mt-4">
          {current.title}
        </Text>
        <Text variant="body" color="muted" className="font-sans-medium leading-6 mt-4">
          {current.body}
        </Text>

        <View className="flex-row items-center justify-between mt-6">
          {!isFirst && (
            <Button variant="ghost" onPress={handleBack}>
              <Button.Label className="text-muted normal-case font-sans-bold">
                {t('onboarding.back')}
              </Button.Label>
            </Button>
          )}
          {isFirst && <View />}

          {isLast ? (
            <Button size="lg" onPress={handleNext} className="h-14 px-6">
              <Button.Label className="text-reverse font-sans-bold text-lg">
                {t('onboarding.create_account')}
              </Button.Label>
              <Icon name="arrow-forward" size={18} color={white} />
            </Button>
          ) : (
            <Button
              isIconOnly
              accessibilityLabel={t('onboarding.next')}
              onPress={handleNext}
              className="w-14 h-14"
            >
              <Icon name="arrow-forward" size={20} color={white} />
            </Button>
          )}
        </View>
      </View>
    </GradientShell>
  );
}
