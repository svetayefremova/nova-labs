import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Card, Text } from '@/src/components/ui';
import { MODALITY_COLOR } from '@/src/constants/modality';
import { shadows } from '@/src/constants/theme';
import type { DicomSeries } from '@/src/types/domain';

type Props = {
  series: DicomSeries;
  onPress: () => void;
};

export function ImageCard({ series, onPress }: Props) {
  const { t } = useTranslation();
  const color = MODALITY_COLOR[series.modality];

  return (
    <Card
      onPress={onPress}
      accessibilityLabel={t('accessibility.series_label', {
        description: series.description,
        modality: series.modality,
      })}
      style={shadows.card}
    >
      <View className="rounded-xl mb-3 h-56 items-center justify-center overflow-hidden bg-viewer-bg">
        <View
          className="absolute top-3 left-3 px-2 py-1 rounded-md"
          style={{ backgroundColor: color + '26', borderWidth: 0.5, borderColor: color + '60' }}
        >
          <Text variant="badge" style={{ color }}>
            {series.modality}
          </Text>
        </View>

        <Text variant="display" className="opacity-10 text-white">
          {series.modality}
        </Text>
      </View>

      <Text variant="overline" color="muted">
        {series.region}
      </Text>
      <Text variant="label" className="mt-1" numberOfLines={1}>
        {series.description}
      </Text>
      <Text variant="caption" color="muted" className="mt-1">
        {t('image.caption', {
          date: series.date,
          seriesCount: series.seriesCount,
          sliceCount: series.sliceCount,
        })}
      </Text>
    </Card>
  );
}
