import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { AuthShell } from '@/src/components/layout';
import { Button, Checkbox, Icon, Text, TextInput } from '@/src/components/ui';

export default function CreateAccountScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const mutedColor = String(useCSSVariable('--color-muted'));
  const white = String(useCSSVariable('--color-reverse'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <AuthShell scanLabel={t('create_account.hud_label')}>
      <Text variant="overline" color="primary" className="font-sans-bold">
        {t('create_account.eyebrow')}
      </Text>
      <Text variant="display" className="text-[38px] leading-[44px] mt-2">
        {t('create_account.title')}
      </Text>

      <View className="gap-3 mt-6">
        <TextInput
          type="email"
          label={t('create_account.email')}
          value={email}
          onChangeText={setEmail}
          placeholder={t('create_account.email_placeholder')}
        />
        <View className="gap-1">
          <TextInput
            type="password"
            label={t('create_account.password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder={t('create_account.password_placeholder')}
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
          <Text variant="body" color="muted" className="text-[12px] px-1">
            {t('create_account.password_hint')}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-3 mt-6">
        <Checkbox
          checked={agreed}
          onPress={() => setAgreed((v) => !v)}
          accessibilityLabel={t('create_account.terms_agree')}
        />
        <Text variant="body" color="muted" className="flex-1 text-[14px] leading-5">
          {t('create_account.terms_agree')}{' '}
          <Text className="text-[14px] font-sans-bold text-primary">
            {t('create_account.terms')}
          </Text>{' '}
          {t('create_account.terms_and')}{' '}
          <Text className="text-[14px] font-sans-bold text-primary">
            {t('create_account.privacy')}
          </Text>
        </Text>
      </View>

      <View className="items-center mt-6">
        <Button size="lg" isDisabled={!agreed} onPress={() => router.push('/(auth)/confirm-email')}>
          <Button.Label className="text-reverse font-sans-bold text-lg">
            {t('create_account.cta')}
          </Button.Label>
          <Icon name="arrow-forward" size={20} color={white} />
        </Button>
      </View>

      <View className="flex-row items-center justify-center gap-1 mt-3">
        <Text variant="body" color="muted" className="text-[14px]">
          {t('create_account.have_account')}
        </Text>
        <Button variant="ghost" onPress={() => router.push('/(auth)/sign-in')}>
          <Button.Label className="text-primary normal-case font-sans-bold text-[14px]">
            {t('create_account.sign_in')}
          </Button.Label>
        </Button>
      </View>
    </AuthShell>
  );
}
