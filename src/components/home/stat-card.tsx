import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Icon, type IconName, Text } from '@/src/components/ui';

type Props = {
  icon: IconName;
  value: string;
  label: string;
};

export function StatCard({ icon, value, label }: Props) {
  const textColor = String(useCSSVariable('--color-text'));

  return (
    <View className="flex-1 rounded-[20px] px-3 pt-4 pb-4 gap-5 bg-white web:border-1 web:border-black/8">
      <View className="w-9 h-9 rounded-full bg-background items-center justify-center">
        <Icon name={icon} size={20} color={textColor} />
      </View>
      <View>
        <Text variant="caption" color="muted">
          {label}
        </Text>
        <Text variant="title" className="font-sans-bold">
          {value}
        </Text>
      </View>
    </View>
  );
}
