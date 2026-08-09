import { useState } from 'react';
import { type LayoutChangeEvent, View } from 'react-native';
import { Circle, Line, Path, Svg, Text as SvgText } from 'react-native-svg';
import { useCSSVariable } from 'uniwind';

import { Text } from '@/src/components/ui';
import { type BiomarkerInfo, TREND_MONTHS } from '@/src/data/biomarkers-library';

const PADDING_LEFT = 28;
const PADDING_RIGHT = 16;
const PADDING_TOP = 8;
const PADDING_BOTTOM = 28;
const CHART_H = 120;
const SVG_H = CHART_H + PADDING_TOP + PADDING_BOTTOM;

type Props = {
  info: BiomarkerInfo;
  accentColor: string;
};

export function TrendChart({ info, accentColor }: Props) {
  const [width, setWidth] = useState(0);
  const mutedColor = String(useCSSVariable('--color-muted'));
  const borderColor = String(useCSSVariable('--color-surface-border'));

  const chartW = width - PADDING_LEFT - PADDING_RIGHT;
  const range = info.yMax - info.yMin;

  function toX(i: number) {
    return PADDING_LEFT + (i / (info.trend.length - 1)) * chartW;
  }

  function toY(v: number) {
    return PADDING_TOP + CHART_H - ((v - info.yMin) / range) * CHART_H;
  }

  function onLayout(e: LayoutChangeEvent) {
    const w = e.nativeEvent.layout.width;
    if (w !== width) setWidth(w);
  }

  const colW = chartW / (TREND_MONTHS.length - 1);

  return (
    <View className="gap-2">
      <Text variant="caption" color="muted">
        {info.chartTitle}
      </Text>

      <View style={{ height: SVG_H }} onLayout={onLayout}>
        {width > 0 && (
          <Svg width={width} height={SVG_H}>
            {/* Horizontal grid lines at y ticks */}
            {info.yTicks.map((tick) => {
              const y = toY(tick);
              return (
                <Line
                  key={tick}
                  x1={PADDING_LEFT}
                  y1={y}
                  x2={width - PADDING_RIGHT}
                  y2={y}
                  stroke={borderColor}
                  strokeWidth={1}
                />
              );
            })}

            {/* Vertical grid columns with subdivisions */}
            {Array.from({ length: (TREND_MONTHS.length - 1) * 2 + 1 }, (_, i) => {
              const x = PADDING_LEFT + (i / 2) * colW;
              return (
                <Line
                  key={i}
                  x1={x}
                  y1={PADDING_TOP}
                  x2={x}
                  y2={PADDING_TOP + CHART_H}
                  stroke={borderColor}
                  strokeWidth={1}
                />
              );
            })}

            {/* Y axis labels */}
            {info.yTicks.map((tick) => (
              <SvgText
                key={tick}
                x={PADDING_LEFT - 12}
                y={toY(tick) + 4}
                textAnchor="end"
                fontSize={10}
                fill={mutedColor}
              >
                {info.formatY(tick)}
              </SvgText>
            ))}

            {/* X axis labels */}
            {TREND_MONTHS.map((label, i) => (
              <SvgText
                key={label}
                x={toX(i)}
                y={SVG_H - 6}
                textAnchor="middle"
                fontSize={10}
                fill={mutedColor}
              >
                {label}
              </SvgText>
            ))}

            {/* Connecting curves */}
            {info.trend.map((v, i) => {
              if (i === 0) return null;
              const x1 = toX(i - 1);
              const y1 = toY(info.trend[i - 1]);
              const x2 = toX(i);
              const y2 = toY(v);
              const cx = (x1 + x2) / 2;
              return (
                <Path
                  key={i}
                  d={`M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`}
                  stroke={accentColor}
                  strokeWidth={2}
                  strokeLinecap="round"
                  fill="none"
                />
              );
            })}

            {/* Data points */}
            {info.trend.map((v, i) => {
              const isLast = i === info.trend.length - 1;
              return (
                <Circle
                  key={i}
                  cx={toX(i)}
                  cy={toY(v)}
                  r={isLast ? 6 : 4}
                  fill={accentColor}
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
