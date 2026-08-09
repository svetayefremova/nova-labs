import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, useWindowDimensions, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Header, PageWrapper } from '@/src/components/layout';
import { BiomarkerTiles } from '@/src/components/section-detail/biomarker-tiles';
import { FindingsList } from '@/src/components/section-detail/findings-list';
import { OncoRadsProgression } from '@/src/components/section-detail/onco-rads-progression';
import { RegionAnalysis } from '@/src/components/section-detail/region-analysis';
import { TrendChart } from '@/src/components/section-detail/trend-chart';
import { Card, Icon, Text } from '@/src/components/ui';
import { DESKTOP } from '@/src/constants/layout';
import { ORGAN_IMAGES } from '@/src/constants/organ-images';
import { highestSeverity, SEVERITY } from '@/src/constants/severity';
import { shadows } from '@/src/constants/theme';
import { biomarkersForSection, type BiomarkerType } from '@/src/data/biomarkers-library';
import { computeRisk, tierKey } from '@/src/helpers/risk';
import { useFindings } from '@/src/hooks/use-findings';

export default function SectionDetailScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();

  const { section, scanType, regionIndex, findings } = useFindings(id ?? '');
  const severity = highestSeverity(section.counts);
  const accentColor = String(useCSSVariable(SEVERITY[severity].cssVar));
  const reverseColor = String(useCSSVariable('--color-reverse'));
  const orColors: Record<number, string> = {
    1: String(useCSSVariable('--color-severity-normal')),
    2: String(useCSSVariable('--color-severity-low')),
    3: String(useCSSVariable('--color-severity-benign')),
    4: String(useCSSVariable('--color-severity-critical')),
    5: String(useCSSVariable('--color-accent-red-dark')),
  };
  const totalFindings = section.counts.critical + section.counts.benign + section.counts.normal;
  const riskScore = computeRisk(section.counts);

  const biomarkers = biomarkersForSection(section.id, regionIndex - 1);
  const [activeBiomarker, setActiveBiomarker] = useState<BiomarkerType>('volume');
  const activeRegions = biomarkers.find((b) => b.type === activeBiomarker)?.regions ?? [];

  const isDesktop = width >= DESKTOP;

  const wholeBodyStatusCard = ORGAN_IMAGES[section.id] ? (
    <Card style={shadows.card}>
      <View className="flex-row items-center">
        <View className="flex-1">
          <View className="flex-row items-start justify-between mb-4">
            <Text variant="overline" color="muted">
              {t('scan.overall_status')}
            </Text>
          </View>

          {section.oncoRads && (
            <View
              className="self-start rounded-xl px-4 py-2 mb-2"
              style={{ backgroundColor: orColors[section.oncoRads] }}
            >
              <Text
                className="font-sans-bold"
                style={{ color: reverseColor, fontSize: 18, letterSpacing: -0.3 }}
              >
                OR-{section.oncoRads}
              </Text>
            </View>
          )}

          <Text
            variant="title"
            className="font-sans-bold"
            style={{ fontSize: 24, letterSpacing: -0.5 }}
          >
            {t('scan.findings', { count: totalFindings })}
          </Text>

          {section.oncoRads && (
            <Text variant="body" color="muted">
              {t(`onco_rads.${section.oncoRads}`)}
            </Text>
          )}
        </View>
        <View
          className="rounded-2xl bg-surface-subtle items-center justify-center"
          style={{ width: 120, height: 120 }}
        >
          <Image
            source={ORGAN_IMAGES[section.id]}
            style={{
              width: 120,
              height: 120,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.2,
              shadowRadius: 10,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    </Card>
  ) : null;

  const nonWholeBodyStatusCard = (
    <Card style={shadows.card}>
      <View className="flex-row items-center">
        <View className="flex-1">
          <Text variant="overline" color="muted" className="mb-4">
            {t('scan.overall_status')}
          </Text>

          <View
            className="self-start rounded-xl px-4 py-2 mb-2"
            style={{ backgroundColor: accentColor }}
          >
            <Text
              className="font-sans-bold"
              style={{ color: reverseColor, fontSize: 18, letterSpacing: -0.3 }}
            >
              {riskScore}%
            </Text>
          </View>

          <Text
            variant="title"
            className="font-sans-bold"
            style={{ fontSize: 24, letterSpacing: -0.5 }}
          >
            {t('scan.findings', { count: totalFindings })}
          </Text>
          <Text variant="body" color="muted">
            {t(tierKey(riskScore))}
          </Text>
        </View>

        <View
          className="rounded-2xl bg-surface-subtle items-center justify-center"
          style={{ width: 120, height: 120 }}
        >
          <Image
            source={ORGAN_IMAGES.brain}
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
          />
        </View>
      </View>
    </Card>
  );

  const statusCard = scanType === 'whole-body' ? wholeBodyStatusCard : nonWholeBodyStatusCard;

  const recommendationBanner = scanType === 'whole-body' && section.recommendation && (
    <View className="flex-row gap-3 rounded-2xl p-4 bg-primary/12">
      <View
        className="rounded-full bg-primary items-center justify-center"
        style={{ width: 32, height: 32 }}
      >
        <Icon name="info" size={16} color={reverseColor} />
      </View>
      <View className="flex-1 gap-1">
        <Text variant="subtitle" className="font-sans-bold">
          {t('onco_rads.recommendation')}
        </Text>
        <Text variant="body">{section.recommendation}</Text>
      </View>
    </View>
  );

  const analyticsPanel =
    scanType === 'whole-body' ? (
      section.oncoRadsHistory ? (
        <Card style={shadows.card}>
          <OncoRadsProgression history={section.oncoRadsHistory} current={section.oncoRads!} />
        </Card>
      ) : null
    ) : (
      <Card style={shadows.card}>
        <BiomarkerTiles
          biomarkers={biomarkers}
          active={activeBiomarker}
          onSelect={setActiveBiomarker}
        />
        <View className="my-4" />
        <TrendChart
          info={biomarkers.find((b) => b.type === activeBiomarker)!}
          accentColor={accentColor}
        />
        <View className="my-4" />
        <RegionAnalysis regions={activeRegions} />
      </Card>
    );

  if (isDesktop) {
    return (
      <>
        <Stack.Screen options={{ header: () => <Header onBack={() => router.back()} /> }} />
        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-20"
          showsVerticalScrollIndicator={false}
        >
          <PageWrapper className="pt-6">
            <View className="px-4 mb-6 gap-1">
              <Text variant="heading">{section.name}</Text>
              <Text variant="label" color="muted">
                {section.subtitle}
              </Text>
            </View>

            <View className="flex-row items-start gap-6 px-4">
              <View style={{ width: 380 }} className="gap-5">
                {statusCard}
                {recommendationBanner}
                {analyticsPanel}
              </View>

              <View className="flex-1">
                <FindingsList findings={findings} sectionId={section.id} />
              </View>
            </View>
          </PageWrapper>
        </ScrollView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <Header onBack={() => router.back()} />,
        }}
      />
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-28"
        showsVerticalScrollIndicator={false}
      >
        <PageWrapper className="pt-6">
          <View className="px-4 mb-5 gap-1">
            <Text variant="heading">{section.name}</Text>
            <Text variant="label" color="muted">
              {section.subtitle}
            </Text>
          </View>

          <View className="px-4 mb-5">{statusCard}</View>

          {recommendationBanner && <View className="px-4 mb-5">{recommendationBanner}</View>}

          {scanType !== 'whole-body' && (
            <View className="px-4 mb-3">
              <Text variant="subtitle" color="muted">
                {t('section.region_analysis')}
              </Text>
            </View>
          )}

          {analyticsPanel && <View className="px-4 mb-5">{analyticsPanel}</View>}

          <FindingsList findings={findings} sectionId={section.id} />
        </PageWrapper>
      </ScrollView>
    </>
  );
}
