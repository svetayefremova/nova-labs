import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Line, Path, Text as SvgText } from 'react-native-svg';
import { useCSSVariable } from 'uniwind';

const FONT = 'Nunito_700Bold';

const vTicks = Array.from({ length: 21 }, (_, k) => {
  const y = 92 + k * 19.7;
  const long = k % 5 === 0;
  return <Line key={`v${k}`} x1={26} y1={y} x2={26 + (long ? 16 : 9)} y2={y} />;
});

const hTicks = Array.from({ length: 16 }, (_, k) => {
  const x = 64 + k * 18.3;
  const long = k % 5 === 0;
  return (
    <Line key={`h${k}`} x1={x} y1={556} x2={x} y2={556 - (long ? 15 : 8)} />
  );
});

interface ScanBackdropProps {
  fullHeight?: boolean;
}

export function ScanBackdrop({ fullHeight = false }: ScanBackdropProps) {
  const yellow = String(useCSSVariable('--color-accent-yellow'));

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        !fullHeight && { height: '60%' },
        { pointerEvents: 'none' },
      ]}
    >
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 390 620"
        preserveAspectRatio="xMidYMid slice"
        pointerEvents="none"
      >
        <G stroke="rgba(255,255,255,0.14)" strokeWidth={1.2}>
          <Line x1={26} y1={92} x2={26} y2={486} />
          {vTicks}
          <Line x1={64} y1={556} x2={338} y2={556} />
          {hTicks}
        </G>

        <G
          stroke="rgba(255,255,255,0.13)"
          strokeWidth={1.2}
          strokeDasharray="3 7"
          fill="none"
        >
          <Circle cx={356} cy={118} r={44} />
          <Circle cx={356} cy={118} r={78} />
          <Circle cx={356} cy={118} r={112} />
          <Circle cx={40} cy={512} r={34} />
          <Circle cx={40} cy={512} r={62} />
        </G>

        <G
          stroke="rgba(255,255,255,0.20)"
          strokeWidth={1.3}
          strokeLinecap="round"
          fill="none"
        >
          <Path d="M318 196h22M329 185v22" />
          <Path d="M58 150h18M67 141v18" />
          <Path d="M300 470h16M308 462v16" />
        </G>

        <G
          fill="rgba(255,255,255,0.34)"
          fontFamily={FONT}
          fontSize={13}
          letterSpacing={1}
        >
          <SvgText x={195} y={86} textAnchor="middle">
            A
          </SvgText>
          <SvgText x={195} y={566} textAnchor="middle">
            P
          </SvgText>
          <SvgText x={14} y={304}>
            R
          </SvgText>
          <SvgText x={368} y={304} textAnchor="end">
            L
          </SvgText>
        </G>

        <G
          fill="rgba(255,255,255,0.30)"
          fontFamily={FONT}
          fontSize={10.5}
          letterSpacing={1.2}
        >
          <SvgText x={44} y={98}>
            SE 04 · IM 18
          </SvgText>
          <SvgText x={346} y={540} textAnchor="end">
            512 × 512 · 1.0mm
          </SvgText>
        </G>

        <G stroke={yellow} fill="none" opacity={0.55}>
          <Circle
            cx={300}
            cy={362}
            r={13}
            strokeWidth={1.4}
            strokeDasharray="2.5 4"
          />
          <Path
            d="M300 344v-12M300 380v12M282 362h-12M318 362h12"
            strokeWidth={1.3}
            strokeLinecap="round"
          />
          <Path d="M311 351l16-12" strokeWidth={1.2} />
        </G>
        <SvgText
          x={374}
          y={333}
          textAnchor="end"
          fill={yellow}
          opacity={0.7}
          fontFamily={FONT}
          fontSize={10}
          letterSpacing={1}
        >
          FINDING
        </SvgText>
      </Svg>
    </View>
  );
}
