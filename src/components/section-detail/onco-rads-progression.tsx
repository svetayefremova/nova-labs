import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type LayoutChangeEvent, View } from 'react-native';
import { Circle, Line, Path, Svg, Text as SvgText } from 'react-native-svg';
import { useCSSVariable } from 'uniwind';

import { Text } from '@/src/components/ui';
import type { OncoRadsScore } from '@/src/types/domain';

type Props = { history: OncoRadsScore[]; current: OncoRadsScore };

const TIME_LABELS = ['-18m', '-12m', '-6m', '-3m', 'Now'];
const OR_LABELS: OncoRadsScore[] = [5, 4, 3, 2, 1];
const PADDING_LEFT = 28;
const PADDING_RIGHT = 16;
const PADDING_TOP = 8;
const PADDING_BOTTOM = 16;
const ROW_H = 20;
const CHART_H = OR_LABELS.length * ROW_H;
const SVG_H = CHART_H + PADDING_TOP + PADDING_BOTTOM;

export function OncoRadsProgression({ history, current }: Props) {
  const { t } = useTranslation();
  const [width, setWidth] = useState(0);

  const normalColor = String(useCSSVariable('--color-severity-normal'));
  const lowColor = String(useCSSVariable('--color-severity-low'));
  const benignColor = String(useCSSVariable('--color-severity-benign'));
  const criticalColor = String(useCSSVariable('--color-severity-critical'));
  const criticalDarkColor = String(useCSSVariable('--color-accent-red-dark'));
  const mutedColor = String(useCSSVariable('--color-muted'));
  const borderColor = String(useCSSVariable('--color-surface-border'));

  const scoreColors: Record<OncoRadsScore, string> = {
    1: normalColor,
    2: lowColor,
    3: benignColor,
    4: criticalColor,
    5: criticalDarkColor,
  };

  const chartW = width - PADDING_LEFT - PADDING_RIGHT;
  const colW = chartW / (TIME_LABELS.length - 1);

  const xAt = (i: number) => PADDING_LEFT + i * colW;
  const yAt = (score: OncoRadsScore) => PADDING_TOP + OR_LABELS.indexOf(score) * ROW_H + ROW_H / 2;

  function onLayout(e: LayoutChangeEvent) {
    const w = e.nativeEvent.layout.width;
    if (w !== width) setWidth(w);
  }

  return (
    <View className="gap-2">
      <Text variant="caption" color="muted">
        {t('onco_rads.progression')}
      </Text>

      <View style={{ height: SVG_H }} onLayout={onLayout}>
        {width > 0 && (
          <Svg width={width} height={SVG_H}>
            {/* Grid rows */}
            {OR_LABELS.map((score, i) => {
              const y = PADDING_TOP + i * ROW_H + ROW_H / 2;
              return (
                <Line
                  key={score}
                  x1={PADDING_LEFT}
                  y1={y}
                  x2={width - PADDING_RIGHT}
                  y2={y}
                  stroke={borderColor}
                  strokeWidth={1}
                />
              );
            })}

            {/* Grid columns — 2 subdivisions between each time label */}
            {Array.from({ length: (TIME_LABELS.length - 1) * 2 + 1 }, (_, i) => {
              const x = PADDING_LEFT + (i / 2) * colW;
              return (
                <Line
                  key={i}
                  x1={x}
                  y1={PADDING_TOP + ROW_H / 2}
                  x2={x}
                  y2={PADDING_TOP + CHART_H - ROW_H / 2}
                  stroke={borderColor}
                  strokeWidth={1}
                />
              );
            })}

            {/* Y axis labels */}
            {OR_LABELS.map((score, i) => {
              const y = PADDING_TOP + i * ROW_H + ROW_H / 2;
              return (
                <SvgText
                  key={score}
                  x={PADDING_LEFT - 16}
                  y={y + 4}
                  textAnchor="end"
                  fontSize={10}
                  fill={mutedColor}
                >
                  {score}
                </SvgText>
              );
            })}

            {/* X axis labels */}
            {TIME_LABELS.map((label, i) => (
              <SvgText
                key={label}
                x={xAt(i)}
                y={SVG_H - 6}
                textAnchor="middle"
                fontSize={10}
                fill={mutedColor}
              >
                {label}
              </SvgText>
            ))}

            {/* Connecting curves */}
            {history.map((score, i) => {
              if (i === 0) return null;
              const prev = history[i - 1];
              const x1 = xAt(i - 1);
              const y1 = yAt(prev);
              const x2 = xAt(i);
              const y2 = yAt(score);
              const cx = (x1 + x2) / 2;
              return (
                <Path
                  key={i}
                  d={`M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`}
                  stroke={scoreColors[score]}
                  strokeWidth={2}
                  strokeLinecap="round"
                  fill="none"
                />
              );
            })}

            {/* Data points */}
            {history.map((score, i) => {
              const isLast = i === history.length - 1;
              return (
                <Circle
                  key={i}
                  cx={xAt(i)}
                  cy={yAt(score)}
                  r={isLast ? 6 : 4}
                  fill={scoreColors[score]}
                  stroke="white"
                  strokeWidth={isLast ? 2 : 1.5}
                />
              );
            })}
          </Svg>
        )}
      </View>
    </View>
  );
}
