import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Card, Icon, Text } from '@/src/components/ui';
import type { OncoRadsScore, ScanType, SeverityCounts } from '@/src/types/domain';

import { OncoRads } from './onco-rads';
import { RiskMeter } from './risk-meter';

type Props = {
  name: string;
  subtitle: string;
  counts: SeverityCounts;
  scanType: ScanType;
  oncoRads?: OncoRadsScore;
  onPress: () => void;
};

export function SectionCard({ name, subtitle, counts, scanType, oncoRads, onPress }: Props) {
  const { t } = useTranslation();
  const mutedColor = String(useCSSVariable('--color-muted'));

  return (
    <Card onPress={onPress} accessibilityLabel={t('accessibility.section_label', { name })}>
      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-1 min-w-0">
          <Text variant="title" style={{ fontSize: 24, fontWeight: '800', letterSpacing: -0.5 }}>
            {name}
          </Text>
          <Text variant="caption" color="muted" className="web:pb-2">
            {subtitle}
          </Text>
        </View>
        <View className="w-10 h-10 rounded-full border border-surface-border items-center justify-center">
          <Icon name="chevron-right" size={18} color={mutedColor} />
        </View>
      </View>

      <View className="mt-auto pt-4 mt-4 border-t border-surface-border">
        {scanType === 'brain' ? (
          <RiskMeter counts={counts} />
        ) : oncoRads ? (
          <OncoRads score={oncoRads} counts={counts} />
        ) : null}
      </View>
    </Card>
  );
}
