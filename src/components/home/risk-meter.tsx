import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type LayoutChangeEvent, View } from 'react-native';
import { Circle, ClipPath, Defs, FeDropShadow, Filter, G, Rect, Svg } from 'react-native-svg';
import { useCSSVariable } from 'uniwind';

import { Icon, Text } from '@/src/components/ui';
import { computeRisk, tierKey } from '@/src/helpers/risk';
import type { SeverityCounts } from '@/src/types/domain';

type Props = {
  counts: SeverityCounts;
};

const CIRCLE_R = 8;
const BAR_H = 8;
const SHADOW_PAD = 6;
const SVG_H = CIRCLE_R * 2 + SHADOW_PAD * 2;
const SEP = 2;

export function RiskMeter({ counts }: Props) {
  const { t } = useTranslation();
  const [trackWidth, setTrackWidth] = useState(0);

  const normalColor = String(useCSSVariable('--color-severity-normal'));
  const benignColor = String(useCSSVariable('--color-severity-benign'));
  const criticalColor = String(useCSSVariable('--color-severity-critical'));
  const surfaceColor = String(useCSSVariable('--color-surface'));
  const textColor = String(useCSSVariable('--color-text'));

  const score = computeRisk(counts);
  const total = counts.critical + counts.benign + counts.normal;

  const circleColor = score <= 33 ? normalColor : score <= 66 ? benignColor : criticalColor;

  const markerX = trackWidth > 0 ? (score / 100) * trackWidth : 0;
  const barY = SHADOW_PAD + CIRCLE_R - BAR_H / 2;

  const coloredW = trackWidth - SEP * 2;
  const s1 = coloredW * 0.33;
  const s2 = coloredW * 0.34;
  const s3 = coloredW * 0.33;

  function onLayout(e: LayoutChangeEvent) {
    const w = e.nativeEvent.layout.width;
    if (w !== trackWidth) setTrackWidth(w);
  }

  return (
    <View className="gap-1">
      <View className="flex-row items-end justify-between">
        <Text variant="body" className="font-sans-bold" style={{ color: textColor }}>
          {t(tierKey(score))}
        </Text>
        <View className="flex-row items-end gap-1">
          {counts.critical > 0 && (
            <View
              className="flex-row items-center rounded-full bg-neutral-gray/24 px-2 py-1"
              style={{ gap: 4 }}
            >
              <Icon name="trend" size={14} color={textColor} />
              <Text variant="caption" className="font-sans-bold" style={{ color: textColor }}>
                +{counts.critical}%
              </Text>
            </View>
          )}
          <Text
            variant="subtitle"
            className="font-sans-bold"
            style={{ color: textColor, fontSize: 20 }}
          >
            {score}%
          </Text>
        </View>
      </View>

      <View style={{ height: SVG_H }} onLayout={onLayout}>
        {trackWidth > 0 && (
          <Svg width={trackWidth} height={SVG_H}>
            <Defs>
              <ClipPath id="bar-clip">
                <Rect
                  x={0}
                  y={barY}
                  width={trackWidth}
                  height={BAR_H}
                  rx={BAR_H / 2}
                  ry={BAR_H / 2}
                />
              </ClipPath>
              <Filter id="circle-shadow" x="-40%" y="-40%" width="180%" height="180%">
                <FeDropShadow dx={0} dy={1} stdDeviation={3} floodColor="rgba(0,0,0,0.25)" />
              </Filter>
            </Defs>

            {/* Segmented bar clipped to rounded rect */}
            <G clipPath="url(#bar-clip)">
              <Rect x={0} y={barY} width={s1} height={BAR_H} fill={normalColor} />
              <Rect x={s1} y={barY} width={SEP} height={BAR_H} fill={surfaceColor} />
              <Rect x={s1 + SEP} y={barY} width={s2} height={BAR_H} fill={benignColor} />
              <Rect x={s1 + SEP + s2} y={barY} width={SEP} height={BAR_H} fill={surfaceColor} />
              <Rect
                x={s1 + SEP + s2 + SEP}
                y={barY}
                width={s3}
                height={BAR_H}
                fill={criticalColor}
              />
            </G>

            {/* Circle marker */}
            <Circle
              cx={markerX}
              cy={SHADOW_PAD + CIRCLE_R}
              r={CIRCLE_R}
              fill={circleColor}
              stroke="white"
              strokeWidth={2}
              filter="url(#circle-shadow)"
            />
          </Svg>
        )}
      </View>

      <Text variant="caption" color="muted">
        {t('scan.findings', { count: total })}
      </Text>
    </View>
  );
}
