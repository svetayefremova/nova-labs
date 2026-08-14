import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';

import notFoundIllustration from '@/assets/images/not_found.png';
import { Select, Text } from '@/src/components/ui';
import { type Severity } from '@/src/constants/severity';
import type { Finding } from '@/src/types/domain';

import { FindingRow } from './finding-row';

export function FindingsList({
  findings,
  sectionId,
}: {
  findings: Finding[];
  sectionId: string;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all');

  const filterOptions = useMemo(
    () => [
      { value: 'all', label: t('common.all') },
      { value: 'critical', label: t('severity.critical.label') },
      { value: 'benign', label: t('severity.benign.label') },
      { value: 'normal', label: t('severity.normal.label') },
    ],
    [t],
  );

  const filtered = useMemo(
    () =>
      severityFilter === 'all'
        ? findings
        : findings.filter((f) => f.severity === severityFilter),
    [findings, severityFilter],
  );

  return (
    <>
      <View className="px-4 mb-3 flex-row items-center justify-between">
        <Text variant="subtitle" color="muted">
          {t('scan.findings_header')}
        </Text>
        <Select
          options={filterOptions}
          value={severityFilter}
          onValueChange={(v) => setSeverityFilter(v as Severity | 'all')}
          placeholder={t('common.all')}
        />
      </View>
      {filtered.length === 0 ? (
        <View className="px-4 pb-10 items-center gap-2">
          <View className="w-full h-[200px] md:h-[400px]">
            <Image
              source={notFoundIllustration}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
              accessible={false}
            />
          </View>
          <Text variant="subtitle" className="font-sans-bold">
            {t('findings.empty_title')}
          </Text>
          <Text variant="body" color="muted" className="text-center">
            {t('findings.empty_subtitle', {
              severity:
                severityFilter === 'all'
                  ? ''
                  : t(`severity.${severityFilter}.label`).toLowerCase(),
            })}
          </Text>
        </View>
      ) : (
        <View className="px-4 md:gap-3 md:pb-2 lg:grid-cols-3">
          {filtered.map((finding) => (
            <View key={finding.id} className="mb-3 md:mb-0">
              <FindingRow
                finding={finding}
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/(home)/finding-detail',
                    params: { findingId: finding.id, sectionId },
                  })
                }
              />
            </View>
          ))}
        </View>
      )}
    </>
  );
}
