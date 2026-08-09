import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

import { useScanReports } from '@/src/hooks/use-scan-reports';

import { Text } from '../ui';
import { ScanStripCard } from './scan-strip-card';

type Props = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ScansStrip({ activeIndex, onSelect }: Props) {
  const reports = useScanReports();
  const { t } = useTranslation();

  return (
    <View className="relative">
      <View className="px-4 mb-2 ml-1">
        <Text variant="overline" className="font-sans-bold">
          {t('scan.studies_label')}
        </Text>
      </View>
      {/* Pill strip container */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-1 pb-2 px-4 gap-2"
      >
        {reports.map((report, i) => (
          <ScanStripCard
            key={report.id}
            series={report}
            counts={report.sections.reduce(
              (acc, s) => ({
                critical: acc.critical + s.counts.critical,
                benign: acc.benign + s.counts.benign,
                normal: acc.normal + s.counts.normal,
              }),
              { critical: 0, benign: 0, normal: 0 },
            )}
            isActive={i === activeIndex}
            onPress={() => onSelect(i)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
