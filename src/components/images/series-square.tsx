import { Pressable, View } from 'react-native';

import { Text } from '@/src/components/ui';
import type { QidoSeriesResult } from '@/src/types/dicomweb';

type Props = {
  item: QidoSeriesResult;
  isSelected: boolean;
  onPress: () => void;
  size: number;
};

export function SeriesSquare({ item, isSelected, onPress, size }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{ width: size }}
      className="items-center"
    >
      <View
        style={{ width: size, height: size }}
        className={`bg-black rounded-lg w-full border ${isSelected ? 'border-2 border-accent-yellow' : 'border-white/20'}`}
      />
      <Text
        variant="caption"
        className={`text-center px-1 mt-1 ${isSelected ? 'text-white' : 'text-white/45'}`}
        numberOfLines={2}
      >
        {item.description || item.modality}
      </Text>
    </Pressable>
  );
}
