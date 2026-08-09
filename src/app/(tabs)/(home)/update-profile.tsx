import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions, View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header, PageWrapper } from '@/src/components/layout';
import { Button, Text, TextInput } from '@/src/components/ui';
import { DESKTOP, TABLET } from '@/src/constants/layout';
import { useUserProfile } from '@/src/hooks/use-user-profile';

export default function UpdateProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTablet = width >= TABLET;
  const isDesktop = width >= DESKTOP;
  const cols = isDesktop ? 3 : isTablet ? 2 : 1;

  const { profile, updateProfile } = useUserProfile();

  const formik = useFormik({
    initialValues: { ...profile },
    onSubmit: (values) => {
      updateProfile(values);
      router.back();
    },
  });

  const fieldStyle =
    cols === 3
      ? ({ width: 'calc(33.33% - 8px)' } as object)
      : cols === 2
        ? ({ width: 'calc(50% - 6px)' } as object)
        : undefined;

  const Grid = ({ children }: { children: React.ReactNode }) =>
    cols > 1 ? (
      <View className="flex-row flex-wrap gap-3">{children}</View>
    ) : (
      <View className="gap-3">{children}</View>
    );

  const Field = ({
    label,
    value,
    onChange,
    placeholder,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
  }) => (
    <View style={fieldStyle}>
      <TextInput label={label} value={value} onChangeText={onChange} placeholder={placeholder} />
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ header: () => <Header onBack={() => router.back()} /> }} />
      <View className="flex-1 bg-white" collapsable={false}>
        <KeyboardAwareScrollView
          bottomOffset={120}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          alwaysBounceVertical={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
        >
          <PageWrapper className="pt-6 px-4">
            <View className="mb-5">
              <Text variant="heading">{t('profile.title')}</Text>
            </View>

            <View className="gap-4">
              <Text variant="subtitle" color="muted">
                {t('profile.section_personal')}
              </Text>
              <Grid>
                <Field
                  label={t('profile.first_name')}
                  value={formik.values.firstName}
                  onChange={formik.handleChange('firstName')}
                />
                <Field
                  label={t('profile.last_name')}
                  value={formik.values.lastName}
                  onChange={formik.handleChange('lastName')}
                />
                <Field
                  label={t('profile.dob')}
                  value={formik.values.dob}
                  onChange={formik.handleChange('dob')}
                  placeholder="MM/DD/YYYY"
                />
                <Field
                  label={t('profile.phone')}
                  value={formik.values.phone}
                  onChange={formik.handleChange('phone')}
                />
                <Field
                  label={t('profile.email')}
                  value={formik.values.email}
                  onChange={formik.handleChange('email')}
                />
              </Grid>

              <Text variant="subtitle" color="muted" className="mt-2">
                {t('profile.section_contact')}
              </Text>
              <Grid>
                <Field
                  label={t('profile.country')}
                  value={formik.values.country}
                  onChange={formik.handleChange('country')}
                />
                <Field
                  label={t('profile.address_line1')}
                  value={formik.values.addressLine1}
                  onChange={formik.handleChange('addressLine1')}
                />
                <Field
                  label={t('profile.address_line2')}
                  value={formik.values.addressLine2}
                  onChange={formik.handleChange('addressLine2')}
                />
                <Field
                  label={t('profile.city')}
                  value={formik.values.city}
                  onChange={formik.handleChange('city')}
                />
                <Field
                  label={t('profile.state')}
                  value={formik.values.state}
                  onChange={formik.handleChange('state')}
                />
                <Field
                  label={t('profile.postal_code')}
                  value={formik.values.postalCode}
                  onChange={formik.handleChange('postalCode')}
                />
              </Grid>

              <Text variant="caption" color="muted" className="text-center my-2 px-2">
                {t('profile.privacy_note')}
              </Text>
            </View>
          </PageWrapper>
        </KeyboardAwareScrollView>

        <KeyboardStickyView
          offset={{ closed: 0, opened: 0 }}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
        >
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.95)']}
            style={{
              paddingHorizontal: 16,
              paddingTop: 48,
              paddingBottom: insets.bottom + 16,
            }}
          >
            <PageWrapper className="items-center web:pb-6">
              <Button size="lg" onPress={() => formik.handleSubmit()}>
                <Button.Label className="text-reverse font-sans-bold">
                  {t('common.save')}
                </Button.Label>
              </Button>
            </PageWrapper>
          </LinearGradient>
        </KeyboardStickyView>
      </View>
    </>
  );
}
