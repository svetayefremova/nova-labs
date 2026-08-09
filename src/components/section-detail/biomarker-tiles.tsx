import { Pressable, View } from 'react-native';
import Svg, { Ellipse, Path } from 'react-native-svg';
import { useCSSVariable } from 'uniwind';

import { Text } from '@/src/components/ui';
import { SEVERITY } from '@/src/constants/severity';
import type { BiomarkerInfo, BiomarkerType } from '@/src/data/biomarkers-library';

function BrainIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M5 2.5C3 2.5 2 4 2 5.5C2 6.4 2.4 7 3 7.4C2.5 7.9 2.2 8.6 2.2 9.4C2.2 10.6 2.9 11.5 3.9 11.9C4 12.9 4.9 13.5 6 13.5C6.4 13.5 6.7 13.4 7 13.3C7.3 13.4 7.6 13.5 8 13.5L8 2.5C6.9 2.5 6 3.1 5.6 4C5.4 3.1 5 2.5 5 2.5Z M11 2.5C13 2.5 14 4 14 5.5C14 6.4 13.6 7 13 7.4C13.5 7.9 13.8 8.6 13.8 9.4C13.8 10.6 13.1 11.5 12.1 11.9C12 12.9 11.1 13.5 10 13.5C9.6 13.5 9.3 13.4 9 13.3L9 2.5C9.6 2.5 10.2 2.8 10.5 3.3C10.7 2.9 10.8 2.5 11 2.5Z"
        stroke={color}
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IronIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 1.5L8 11M5.5 4.5L8 7L10.5 4.5"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Ellipse cx="8" cy="12.5" rx="3.6" ry="1.4" stroke={color} strokeWidth="1.2" />
    </Svg>
  );
}

function FlowIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M2 6 Q4 3.5 6.5 6 T11 6 T14.5 6"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M2 10 Q4 7.5 6.5 10 T11 10 T14.5 10"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
    </Svg>
  );
}

function MrsIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M1.5 12 L4 12 L4.8 8 L5.6 10.5 L6.4 5 L7.2 11 L8 7 L8.8 12 L10 4 L11 12 L12 9 L13 12 L14.5 12"
        stroke={color}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

const ICONS = {
  volume: BrainIcon,
  iron: IronIcon,
  flow: FlowIcon,
  mrs: MrsIcon,
};

function Tile({
  info,
  isActive,
  onPress,
}: {
  info: BiomarkerInfo;
  isActive: boolean;
  onPress: () => void;
}) {
  const color = String(useCSSVariable(SEVERITY[info.severity].cssVar));
  const IconComp = ICONS[info.type];

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 rounded-[14px] p-3 overflow-hidden"
      style={{
        backgroundColor: isActive ? `${color}12` : 'rgba(0,0,0,0.02)',
        borderWidth: 1,
        borderColor: isActive ? `${color}88` : 'rgba(0,0,0,0.06)',
      }}
    >
      {/* Header row */}
      <View className="flex-row items-center justify-between mb-1">
        <View className="flex-row items-center gap-2">
          <IconComp color={color} />
          <Text
            variant="overline"
            className="uppercase"
            style={{
              color: isActive ? undefined : undefined,
              fontWeight: isActive ? '600' : '500',
            }}
          >
            {info.label}
          </Text>
        </View>
        {isActive && (
          <View
            className="w-[6px] h-[6px] rounded-full"
            style={{
              backgroundColor: color,
              shadowColor: color,
              shadowOpacity: 0.8,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 0 },
            }}
          />
        )}
      </View>

      {/* Value row */}
      <View className="flex-row items-baseline gap-1 mt-1">
        <Text className="text-[22px] leading-tight" style={{ color, letterSpacing: -0.6 }}>
          {info.value}
        </Text>
        <Text variant="caption" color="muted" className="text-[12px]">
          {info.unit}
        </Text>
      </View>

      {/* Sub-label */}
      <Text variant="caption" color="muted" className="text-[12px] mt-1 leading-tight">
        {info.sub}
      </Text>
    </Pressable>
  );
}

type Props = {
  biomarkers: BiomarkerInfo[];
  active: BiomarkerType;
  onSelect: (type: BiomarkerType) => void;
};

export function BiomarkerTiles({ biomarkers, active, onSelect }: Props) {
  const top = biomarkers.slice(0, 2);
  const bottom = biomarkers.slice(2, 4);

  return (
    <View className="gap-2">
      <View className="flex-row gap-2">
        {top.map((b) => (
          <Tile
            key={b.type}
            info={b}
            isActive={b.type === active}
            onPress={() => onSelect(b.type)}
          />
        ))}
      </View>
      <View className="flex-row gap-2">
        {bottom.map((b) => (
          <Tile
            key={b.type}
            info={b}
            isActive={b.type === active}
            onPress={() => onSelect(b.type)}
          />
        ))}
      </View>
    </View>
  );
}
