import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Text } from '@/src/components/ui';
import type { OncoRadsScore, SeverityCounts } from '@/src/types/domain';

type Props = { score: OncoRadsScore; counts: SeverityCounts };

const SCORES: OncoRadsScore[] = [1, 2, 3, 4, 5];

export function OncoRads({ score, counts }: Props) {
  const { t } = useTranslation();

  const normalColor = String(useCSSVariable('--color-severity-normal'));
  const lowColor = String(useCSSVariable('--color-severity-low'));
  const benignColor = String(useCSSVariable('--color-severity-benign'));
  const criticalColor = String(useCSSVariable('--color-severity-critical'));
  const criticalDarkColor = String(useCSSVariable('--color-accent-red-dark'));
  const grayColor = String(useCSSVariable('--color-neutral-gray'));
  const textColor = String(useCSSVariable('--color-text'));

  const total = counts.critical + counts.benign + counts.normal;

  const scoreColors: Record<OncoRadsScore, string> = {
    1: normalColor,
    2: lowColor,
    3: benignColor,
    4: criticalColor,
    5: criticalDarkColor,
  };

  return (
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <Text variant="body" className="font-sans-bold">
          {t(`onco_rads.${score}`)}
        </Text>
        <Text
          variant="subtitle"
          className="font-sans-bold"
          style={{ color: textColor, fontSize: 20 }}
        >
          OR-{score}
        </Text>
      </View>
      <View className="flex-row gap-1">
        {SCORES.map((s) => {
          const active = s === score;
          return (
            <View
              key={s}
              className="flex-1 rounded-full items-center justify-center"
              style={{
                height: 20,
                backgroundColor: active ? scoreColors[s] : grayColor,
                opacity: active ? 1 : 0.28,
              }}
            >
              <Text
                variant="caption"
                style={{
                  fontSize: 10,
                  color: active ? '#fffffe' : '#1c1c1c',
                  fontWeight: '700',
                }}
              >
                OR-{s}
              </Text>
            </View>
          );
        })}
      </View>

      <Text variant="caption" color="muted">
        {t('scan.findings', { count: total })}
      </Text>
    </View>
  );
}
