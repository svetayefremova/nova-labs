import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Button, Icon, Text } from '@/src/components/ui';
import { shadows } from '@/src/constants/theme';
import type { OncoRadsScore } from '@/src/types/domain';

type Props = {
  sectionName?: string;
  oncoRads?: OncoRadsScore;
};

export function DangerZoneCard({ sectionName, oncoRads }: Props) {
  const router = useRouter();
  const { t } = useTranslation();
  const reverseColor = String(useCSSVariable('--color-reverse'));
  const normalColor = String(useCSSVariable('--color-severity-normal'));
  const lowColor = String(useCSSVariable('--color-severity-low'));
  const benignColor = String(useCSSVariable('--color-severity-benign'));
  const criticalColor = String(useCSSVariable('--color-severity-critical'));
  const criticalDarkColor = String(useCSSVariable('--color-accent-red-dark'));

  const scoreColors: Record<OncoRadsScore, string> = {
    1: normalColor,
    2: lowColor,
    3: benignColor,
    4: criticalColor,
    5: criticalDarkColor,
  };

  const scoreColor = oncoRads ? scoreColors[oncoRads] : null;
  const oncoRadsLabel = oncoRads ? t(`onco_rads.${oncoRads}`) : null;

  return (
    <View className="rounded-[20px] bg-white px-4 py-4 gap-4" style={shadows.card}>
      <Text variant="caption" color="muted" className="uppercase">
        {t('profile.stat_danger_zone')}
      </Text>

      <View className="flex-row items-center gap-3">
        <View className="w-12 h-12 rounded-full bg-background items-center justify-center">
          <Text variant="caption" className="font-sans-bold text-center" numberOfLines={2}>
            {sectionName ?? '—'}
          </Text>
        </View>

        <View className="flex-1">
          <Text variant="title" className="font-sans-bold">
            {sectionName ?? '—'}
          </Text>
          {oncoRadsLabel ? (
            <Text variant="caption" color="muted">
              {oncoRadsLabel} · {t('profile.flagged_today')}
            </Text>
          ) : null}
        </View>

        {oncoRads && scoreColor ? (
          <View className="px-3 py-2 rounded-full" style={{ backgroundColor: scoreColor }}>
            <Text variant="label" color="reverse" className="font-sans-bold">
              OR-{oncoRads}
            </Text>
          </View>
        ) : null}
      </View>

      <View className="flex-row gap-3">
        <Button variant="primary" className="flex-1" onPress={() => router.push('/(tabs)/(home)')}>
          <Button.Label className="text-white">{t('profile.review_findings')}</Button.Label>
          <Icon name="arrow-right" size={18} color={reverseColor} />
        </Button>
        <Pressable
          className="flex-1 bg-background rounded-full items-center justify-center py-3 active:opacity-70"
          onPress={() => router.push('/(tabs)/(images)')}
        >
          <Text variant="body" className="font-sans-semibold">
            {t('profile.review_images')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
