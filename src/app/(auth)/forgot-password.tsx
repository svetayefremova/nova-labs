import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { AuthShell } from '@/src/components/layout';
import { Button, Icon, Text, TextInput } from '@/src/components/ui';

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const white = String(useCSSVariable('--color-reverse'));

  const [email, setEmail] = useState('');

  return (
    <AuthShell>
      <Text variant="overline" color="primary" className="font-sans-bold">
        {t('forgot_password.eyebrow')}
      </Text>
      <Text variant="display" className="text-[38px] leading-[44px] mt-2">
        {t('forgot_password.title')}
      </Text>
      <Text variant="body" color="muted" className="font-sans-medium leading-6 mt-2">
        {t('forgot_password.subtitle')}
      </Text>

      <View className="mt-6">
        <TextInput
          type="email"
          label={t('forgot_password.email')}
          value={email}
          onChangeText={setEmail}
          placeholder={t('forgot_password.email_placeholder')}
        />
      </View>

      <View className="items-center mt-6">
        <Button size="lg" onPress={() => {}}>
          <Button.Label className="text-reverse font-sans-bold text-lg">
            {t('forgot_password.cta')}
          </Button.Label>
          <Icon name="arrow-forward" size={20} color={white} />
        </Button>
      </View>

      <View className="flex-row items-center justify-center gap-1 mt-3">
        <Text variant="body" color="muted" className="text-[14px]">
          {t('forgot_password.remembered')}
        </Text>
        <Button variant="ghost" onPress={() => router.back()}>
          <Button.Label className="text-primary normal-case font-sans-bold text-[14px]">
            {t('forgot_password.back_to_sign_in')}
          </Button.Label>
        </Button>
      </View>
    </AuthShell>
  );
}
