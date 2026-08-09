import { Pressable, View } from 'react-native';

import { Text } from '@/src/components/ui';
import type { QidoSeriesResult } from '@/src/types/dicomweb';

type Props = {
  item: QidoSeriesResult;
  isSelected: boolean;
  onPress: () => void;
};

export function SeriesListItem({ item, isSelected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-3 p-2 rounded-xl border web:transition-colors web:duration-200 ${isSelected ? 'border-primary bg-primary/10' : 'border-black/8 bg-white/60 web:hover:border-primary'}`}
    >
      <View className="w-10 h-10 bg-black rounded-lg" />
      <View className="flex-1">
        <Text variant="label" numberOfLines={1}>
          {item.description || item.modality}
        </Text>
        <Text variant="caption" color="muted" numberOfLines={1}>
          {item.instanceCount} images
        </Text>
      </View>
    </Pressable>
  );
}
