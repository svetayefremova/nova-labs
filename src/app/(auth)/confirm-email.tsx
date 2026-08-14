import { useRouter } from 'expo-router';
import { InputOTP, REGEXP_ONLY_DIGITS } from 'heroui-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { AuthShell } from '@/src/components/layout';
import { Button, Icon, Text } from '@/src/components/ui';

function OtpSlot({ index }: { index: number }) {
  return (
    <InputOTP.Slot
      index={index}
      className="border rounded-2xl border-neutral-gray shadow-none"
    />
  );
}

export default function ConfirmEmailScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const white = String(useCSSVariable('--color-reverse'));

  const [code, setCode] = useState('');

  return (
    <AuthShell scanLabel={t('confirm_email.hud_label')}>
      <Text variant="overline" color="primary" className="font-sans-bold">
        {t('confirm_email.eyebrow')}
      </Text>
      <Text variant="display" className="text-[38px] leading-[44px] mt-2">
        {t('confirm_email.title')}
      </Text>
      <Text
        variant="body"
        color="muted"
        className="font-sans-medium leading-6 mt-2"
      >
        {t('confirm_email.subtitle')}
      </Text>

      <View className="items-center mt-8" nativeID="otp-wrapper">
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={code}
          onChange={setCode}
          onComplete={setCode}
          animation={Platform.OS === 'web' ? 'disable-all' : undefined}
        >
          <InputOTP.Group>
            <OtpSlot index={0} />
            <OtpSlot index={1} />
            <OtpSlot index={2} />
          </InputOTP.Group>
          <InputOTP.Separator />
          <InputOTP.Group>
            <OtpSlot index={3} />
            <OtpSlot index={4} />
            <OtpSlot index={5} />
          </InputOTP.Group>
        </InputOTP>
      </View>

      <View className="items-center mt-8">
        <Button
          size="lg"
          isDisabled={code.length < 6}
          onPress={() => router.replace('/(tabs)/(home)')}
        >
          <Button.Label className="text-reverse font-sans-bold text-lg">
            {t('confirm_email.cta')}
          </Button.Label>
          <Icon name="arrow-forward" size={20} color={white} />
        </Button>
      </View>

      <View className="flex-row items-center justify-center gap-1 mt-3">
        <Text variant="body" color="muted" className="text-[14px]">
          {t('confirm_email.no_code')}
        </Text>
        <Button variant="ghost" onPress={() => router.back()}>
          <Button.Label className="text-primary normal-case font-sans-bold text-[14px]">
            {t('confirm_email.resend')}
          </Button.Label>
        </Button>
      </View>
    </AuthShell>
  );
}
