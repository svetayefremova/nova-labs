import { LinearGradient } from 'expo-linear-gradient';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, View } from 'react-native';
import Svg, { Defs, G, Line, Path, RadialGradient, Rect, Stop } from 'react-native-svg';
import { useCSSVariable } from 'uniwind';

import { Icon, type IconName, Text } from '@/src/components/ui';
import { useScanlineAnimation } from '@/src/helpers/use-scanline-animation';

const DEFAULT_SIZE = 248;
const VIEWBOX = 248;
const GRID = 31;

const svgFill = { position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0 };

const gridLines = (() => {
  const lines = [];
  for (let x = GRID; x < VIEWBOX; x += GRID)
    lines.push(<Line key={`x${x}`} x1={x} y1={0} x2={x} y2={VIEWBOX} />);
  for (let y = GRID; y < VIEWBOX; y += GRID)
    lines.push(<Line key={`y${y}`} x1={0} y1={y} x2={VIEWBOX} y2={y} />);
  return lines;
})();

interface ScanViewportProps {
  label?: string;
  icon?: IconName;
  animate?: boolean;
  size?: number;
}

export function ScanViewport({
  label,
  icon = 'body',
  animate = true,
  size = DEFAULT_SIZE,
}: ScanViewportProps) {
  const { t } = useTranslation();
  const translateY = useScanlineAnimation(size, animate);

  const yellow = String(useCSSVariable('--color-accent-yellow'));
  const glassFill = String(useCSSVariable('--color-glass-fill'));
  const glassBorder = String(useCSSVariable('--color-glass-border'));
  const gridLine = String(useCSSVariable('--color-grid-line'));

  const uid = useId().replace(/:/g, '');
  const gradientId = `corners-${uid}`;

  const scale = size / VIEWBOX;
  const borderRadius = Math.round(30 * scale);
  const iconSize = Math.round(118 * scale);
  const showHud = size >= DEFAULT_SIZE;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: glassBorder,
        backgroundColor: glassFill,
      }}
    >
      <Svg style={svgFill} width={size} height={size} viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}>
        <Defs>
          <RadialGradient id={gradientId} cx="50%" cy="50%" r="75%" gradientUnits="userSpaceOnUse">
            <Stop offset="30%" stopColor="white" stopOpacity="0" />
            <Stop offset="100%" stopColor="white" stopOpacity="0.15" />
          </RadialGradient>
        </Defs>
        <Rect width={VIEWBOX} height={VIEWBOX} fill={`url(#${gradientId})`} />
        <G stroke={gridLine} strokeWidth={1}>
          {gridLines}
        </G>
        <G stroke={yellow} strokeWidth={6} strokeLinecap="round" fill="none">
          <Path d="M34 56V34H56" />
          <Path d="M192 34H214V56" />
          <Path d="M214 192V214H192" />
          <Path d="M56 214H34V192" />
        </G>
      </Svg>

      <View className="absolute inset-0 items-center justify-center" pointerEvents="none">
        <Icon name={icon} size={iconSize} color={yellow} />
      </View>

      <Animated.View
        className="absolute left-4 right-4 top-[46%]"
        style={{ transform: [{ translateY }] }}
        pointerEvents="none"
      >
        <LinearGradient
          colors={['rgba(237,239,126,0)', yellow, 'rgba(237,239,126,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ height: 2, borderRadius: 2 }}
        />
      </Animated.View>

      {showHud && (
        <Text className="absolute right-4 top-[14px] font-sans-bold text-[9.5px] text-white/60">
          {t('welcome.hud_analyzing')}
        </Text>
      )}

      {showHud && label && (
        <View className="absolute left-4 bottom-[14px] flex-row items-center gap-[7px]">
          <View className="w-[7px] h-[7px] rounded-full" style={{ backgroundColor: yellow }} />
          <Text className="font-sans-bold text-[11px] text-white/90">{label}</Text>
        </View>
      )}
    </View>
  );
}
