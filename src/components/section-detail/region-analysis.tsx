import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Text } from '@/src/components/ui';
import { SEVERITY } from '@/src/constants/severity';
import type { RegionReading } from '@/src/types/domain';

function RegionRow({ region }: { region: RegionReading }) {
  const color = String(useCSSVariable(SEVERITY[region.severity].cssVar));

  return (
    <View>
      <View className="flex-row items-center justify-between mb-1">
        <Text variant="label" className="font-sans-medium">
          {region.name}
        </Text>
        <Text variant="caption" style={{ color }}>
          {region.label}
        </Text>
      </View>
      <View className="h-[4px] rounded-full bg-neutral-gray/[0.24] overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{ width: `${region.pct}%`, backgroundColor: color }}
        />
      </View>
    </View>
  );
}

type Props = {
  regions: RegionReading[];
};

export function RegionAnalysis({ regions }: Props) {
  return (
    <View className="gap-3">
      {regions.map((r) => (
        <RegionRow key={r.name} region={r} />
      ))}
    </View>
  );
}
