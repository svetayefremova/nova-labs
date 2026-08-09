import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { AuthShell } from '@/src/components/layout';
import { Button, Icon, Text, TextInput } from '@/src/components/ui';

export default function SignInScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const mutedColor = String(useCSSVariable('--color-muted'));
  const white = String(useCSSVariable('--color-reverse'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthShell>
      <Text variant="overline" color="primary" className="font-sans-bold">
        {t('sign_in.eyebrow')}
      </Text>
      <Text variant="display" className="text-[38px] leading-[44px] mt-2">
        {t('sign_in.title')}
      </Text>

      <View className="gap-3 mt-6">
        <TextInput
          type="email"
          label={t('sign_in.email')}
          value={email}
          onChangeText={setEmail}
          placeholder={t('sign_in.email_placeholder')}
        />
        <TextInput
          type="password"
          label={t('sign_in.password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholder={t('sign_in.password_placeholder')}
          rightSlot={
            <Button
              variant="ghost"
              isIconOnly
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
              onPress={() => setShowPassword((v) => !v)}
            >
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} color={mutedColor} />
            </Button>
          }
        />
      </View>

      <Button
        variant="ghost"
        className="self-end mt-1"
        onPress={() => router.push('/(auth)/forgot-password')}
      >
        <Button.Label className="text-primary normal-case font-sans-bold text-[14px]">
          {t('sign_in.forgot')}
        </Button.Label>
      </Button>

      <View className="items-center mt-4">
        <Button size="lg" onPress={() => router.replace('/(tabs)/(home)')}>
          <Button.Label className="text-reverse font-sans-bold text-lg">
            {t('sign_in.cta')}
          </Button.Label>
          <Icon name="arrow-forward" size={20} color={white} />
        </Button>
      </View>

      <View className="flex-row items-center justify-center gap-1 mt-3">
        <Text variant="body" color="muted" className="text-[14px]">
          {t('sign_in.no_account')}
        </Text>
        <Button variant="ghost" onPress={() => router.push('/(auth)/create-account')}>
          <Button.Label className="text-primary normal-case font-sans-bold text-[14px]">
            {t('sign_in.register')}
          </Button.Label>
        </Button>
      </View>
    </AuthShell>
  );
}
