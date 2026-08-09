import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Line, Svg } from 'react-native-svg';
import { useCSSVariable } from 'uniwind';

import { Card, Icon, Text } from '@/src/components/ui';
import { highestSeverity, type Severity } from '@/src/constants/severity';
import { shadows } from '@/src/constants/theme';
import { seededRand } from '@/src/helpers/seeded-rand';
import type { ScanType, SeverityCounts } from '@/src/types/domain';

type Props = { totals: SeverityCounts; region: string; scanType: ScanType };

const ORDER: Severity[] = ['critical', 'benign', 'normal'];
const ICON_SIZE = 40;
const labTotal_BY_TYPE: Record<ScanType, number> = { brain: 40, 'whole-body': 60 };
const CX = 50;
const CY = 50;
const INNER_R = 24;
const MAX_LEN = 22;

export function StatusCard({ totals, region, scanType }: Props) {
  const labTotal = labTotal_BY_TYPE[scanType];
  const { t } = useTranslation();
  const severity = highestSeverity(totals);
  const tested = totals.critical + totals.benign + totals.normal;

  const textColor = String(useCSSVariable('--color-text'));
  const criticalColor = String(useCSSVariable('--color-severity-critical'));
  const benignColor = String(useCSSVariable('--color-severity-benign'));
  const normalColor = String(useCSSVariable('--color-severity-normal'));
  const grayColor = String(useCSSVariable('--color-neutral-gray'));

  const colorMap: Record<Severity, string> = {
    critical: criticalColor,
    benign: benignColor,
    normal: normalColor,
  };

  const rand = seededRand(7);
  const ticks: { color: string; lengthPct: number }[] = [];

  const makeTick = (color: string) => ({
    color,
    lengthPct: 1,
  });

  ORDER.forEach((key) => {
    for (let k = 0; k < totals[key]; k++) {
      ticks.push(makeTick(colorMap[key]));
    }
  });

  for (let i = ticks.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [ticks[i], ticks[j]] = [ticks[j], ticks[i]];
  }

  for (let k = 0; k < labTotal - tested; k++) {
    ticks.push(makeTick(grayColor));
  }

  return (
    <View className="flex-row gap-3">
      {/* Status card */}
      <Card className="flex-1 justify-between gap-3" style={shadows.card}>
        <View className="flex-1">
          <View
            className="rounded-full bg-background items-center justify-center"
            style={{ width: ICON_SIZE, height: ICON_SIZE }}
          >
            <Icon name="status" size={20} color={textColor} />
          </View>
          <Text variant="overline" color="muted" className="mt-4">
            {t('scan.overall_status')}
          </Text>
          <Text variant="subtitle" className="font-sans-bold mt-1">
            {t(`scan.status.${severity}`)}
          </Text>
        </View>

        <View>
          {ORDER.map((key, i) => (
            <View key={key} className={`flex-row items-center gap-3 py-1`}>
              <View
                style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colorMap[key] }}
              />
              <Text variant="caption" className="flex-1 font-sans-semibold">
                {t(`severity.${key}.label`)}
              </Text>
              <Text variant="body" className="font-sans-bold">
                {totals[key]}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      <Card className="flex-1" style={shadows.card}>
        <View className="flex-row items-center justify-between">
          <View
            className="rounded-full bg-background items-center justify-center"
            style={{ width: ICON_SIZE, height: ICON_SIZE }}
          >
            <Icon name="bar-chart" size={20} color={textColor} />
          </View>
          <View className="flex-row items-baseline gap-1">
            <Text variant="body" className="font-sans-semibold" style={{ fontSize: 18 }}>
              {tested}
            </Text>
            <Text variant="caption" color="muted">
              / {labTotal}
            </Text>
          </View>
        </View>

        <View className="mt-4 items-center justify-center">
          <Svg viewBox="0 0 100 100" width={140} height={140}>
            {ticks.map((tick, i) => {
              const angle = (i / labTotal) * Math.PI * 2 - Math.PI / 2;
              const outerR = INNER_R + tick.lengthPct * MAX_LEN;
              const x1 = CX + Math.cos(angle) * INNER_R;
              const y1 = CY + Math.sin(angle) * INNER_R;
              const x2 = CX + Math.cos(angle) * outerR;
              const y2 = CY + Math.sin(angle) * outerR;
              return (
                <Line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={tick.color}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
              );
            })}
          </Svg>
        </View>

        <View className="flex-row mt-2">
          <Text variant="caption" className="font-sans-bold">
            {region}
          </Text>
        </View>
      </Card>
    </View>
  );
}
