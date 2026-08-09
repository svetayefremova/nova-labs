import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, ScrollView, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Header, PageWrapper } from '@/src/components/layout';
import { Card, Icon, Text } from '@/src/components/ui';
import { SEVERITY_BG_CLASS } from '@/src/constants/severity';
import { useFindings } from '@/src/hooks/use-findings';

export default function FindingDetailScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { findingId, sectionId } = useLocalSearchParams<{
    findingId: string;
    sectionId: string;
  }>();

  const { findings } = useFindings(sectionId ?? '');
  const finding = findings.find((f) => f.id === findingId) ?? findings[0];

  const reverseColor = String(useCSSVariable('--color-reverse'));

  return (
    <>
      <Stack.Screen options={{ header: () => <Header onBack={() => router.back()} /> }} />
      <ScrollView
        className="flex-1"
        contentContainerClassName={'pb-28'}
        showsVerticalScrollIndicator={false}
      >
        <PageWrapper className="pt-6">
          <View className="px-4 mb-4 gap-1">
            {finding.location && (
              <Text variant="overline" color="muted" className="text-[11px] font-sans-bold">
                {finding.location.toUpperCase()}
              </Text>
            )}
            <Text variant="heading" className="text-[28px] leading-[34px]">
              {finding.name}
            </Text>
            <View className="flex-row items-center gap-3 mt-1">
              <View className={`rounded-full px-3 py-1 ${SEVERITY_BG_CLASS[finding.severity]}`}>
                <Text className="text-[11px] font-sans-bold" color="reverse">
                  {t(`severity.${finding.severity}.label`).toUpperCase()}
                </Text>
              </View>
              {finding.meta && (
                <Text variant="caption" color="muted" className="font-sans-medium">
                  {finding.meta}
                </Text>
              )}
            </View>
          </View>

          {finding.keyImages && finding.keyImages.length > 0 && (
            <FlatList
              data={finding.keyImages}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, i) => String(i)}
              contentContainerClassName="px-4 gap-3 mb-4"
              renderItem={({ item }) => (
                <View className="w-64 h-64 rounded-3xl overflow-hidden bg-black">
                  <Image source={item} className="w-full h-full" resizeMode="cover" />
                </View>
              )}
            />
          )}

          <View className="px-4 gap-3">
            <Card className="web:-mx-3">
              <Text variant="overline" color="muted" className="text-[10px] font-sans-bold mb-3">
                {t('finding_detail.description')}
              </Text>
              <Text variant="body" className="leading-6">
                {finding.description}
              </Text>
            </Card>

            {finding.quantitative && finding.quantitative.length > 0 && (
              <Card className="web:border-1 web:border-black/8 web:mb-3">
                <Text variant="overline" color="muted" className="text-[10px] font-sans-bold mb-3">
                  {t('finding_detail.quantitative')}
                </Text>
                <View className="gap-3">
                  {finding.quantitative.map((row, i) => (
                    <View
                      key={i}
                      className="flex-row items-center justify-between border-b border-neutral-gray/[0.24] pb-3 last:border-0 last:pb-0"
                    >
                      <Text variant="body" color="muted" className="text-[14px]">
                        {row.label}
                      </Text>
                      <Text
                        className={`text-[14px] font-sans-bold${row.highlight ? ` text-severity-${finding.severity}` : ''}`}
                      >
                        {row.value}
                      </Text>
                    </View>
                  ))}
                </View>
              </Card>
            )}

            {finding.recommendation && (
              <View className="px-4 flex-row gap-3 rounded-2xl py-4 bg-primary/12">
                <View className="w-9 h-9 rounded-full bg-primary items-center justify-center shrink-0">
                  <Icon name="info" size={18} color={reverseColor} />
                </View>
                <View className="flex-1 gap-1">
                  <Text variant="subtitle" className="font-sans-bold">
                    {t('finding_detail.recommendation')}
                  </Text>
                  <Text variant="body">{finding.recommendation}</Text>
                </View>
              </View>
            )}
          </View>
        </PageWrapper>
      </ScrollView>
    </>
  );
}
