import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, useWindowDimensions, View } from 'react-native';

import { SectionCard } from '@/src/components/home/section-card';
import { StatusCard } from '@/src/components/home/status-card';
import { SummaryCard } from '@/src/components/home/summary-card';
import { PageWrapper } from '@/src/components/layout';
import { Text } from '@/src/components/ui';
import { DESKTOP, TABLET } from '@/src/constants/layout';
import { Routes } from '@/src/constants/routes';
import { PATIENT, useScanReports } from '@/src/hooks/use-scan-reports';

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const reports = useScanReports();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const report = reports[selectedIndex] ?? reports[0];
  const isTablet = width >= TABLET;
  const isDesktop = width >= DESKTOP;

  const totals = report.sections.reduce(
    (acc, s) => ({
      critical: acc.critical + s.counts.critical,
      benign: acc.benign + s.counts.benign,
      normal: acc.normal + s.counts.normal,
    }),
    { critical: 0, benign: 0, normal: 0 },
  );

  const sectionLabel =
    report.scanType === 'whole-body' ? t('section.organs') : t('section.regions');

  const sectionCardStyle = isDesktop
    ? ({ width: 'calc(33.33% - 8px)' } as object)
    : isTablet
      ? ({ width: 'calc(50% - 6px)' } as object)
      : undefined;

  const SectionCards = (
    <View className={isTablet ? 'flex-row flex-wrap gap-3' : 'gap-3'}>
      {report.sections.map((section) => (
        <View key={section.id} style={sectionCardStyle}>
          <SectionCard
            name={section.name}
            subtitle={section.subtitle}
            counts={section.counts}
            scanType={report.scanType}
            oncoRads={section.oncoRads}
            onPress={() =>
              router.push({
                pathname: Routes.sectionDetail as '/',
                params: { id: section.id },
              })
            }
          />
        </View>
      ))}
    </View>
  );

  if (isDesktop) {
    return (
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-28"
        showsVerticalScrollIndicator={false}
      >
        <PageWrapper className="pt-6 px-4">
          <View className="mb-6 gap-1">
            <Text variant="heading">{t('header.home.title')}</Text>
            <Text variant="label" color="muted">
              {t('header.home.subtitle')}
            </Text>
          </View>

          <View className="flex-1 mb-6">
            <SummaryCard
              patientName={PATIENT.patientName}
              mrn={PATIENT.mrn}
              age={PATIENT.age}
              scanInfo={report.scanInfo}
              totals={totals}
              activeIndex={selectedIndex}
              onSelect={setSelectedIndex}
              onProfilePress={() => router.push(Routes.overview)}
            />
          </View>
          <View className="gap-3 mb-6 max-w-[360px]">
            <StatusCard totals={totals} region={report.region} scanType={report.scanType} />
          </View>

          <Text variant="subtitle" color="muted" className="mb-3">
            {sectionLabel}
          </Text>
          {SectionCards}
          <Text variant="caption" color="muted" className="text-center px-2 mt-6">
            {t('scan.disclaimer')}
          </Text>
        </PageWrapper>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName={'pb-28'}
      showsVerticalScrollIndicator={false}
    >
      <PageWrapper className="pt-6">
        <View className="px-4 mb-5 gap-1">
          <Text variant="heading">{t('header.home.title')}</Text>
          <Text variant="label" color="muted">
            {t('header.home.subtitle')}
          </Text>
        </View>

        <View className="px-4 mb-5">
          <SummaryCard
            patientName={PATIENT.patientName}
            mrn={PATIENT.mrn}
            age={PATIENT.age}
            scanInfo={report.scanInfo}
            totals={totals}
            activeIndex={selectedIndex}
            onSelect={setSelectedIndex}
            onProfilePress={() => router.push(Routes.overview)}
          />
        </View>

        <View className="px-4 mb-5">
          <StatusCard totals={totals} region={report.region} scanType={report.scanType} />
        </View>

        <View className="px-4 mb-3">
          <Text variant="subtitle" color="muted">
            {sectionLabel}
          </Text>
        </View>

        <View className="px-4 mb-4">{SectionCards}</View>

        <View className="p-4">
          <Text variant="caption" color="muted" className="text-center px-2">
            {t('scan.disclaimer')}
          </Text>
        </View>
      </PageWrapper>
    </ScrollView>
  );
}
