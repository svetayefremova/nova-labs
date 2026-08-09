import { View } from 'react-native';

import { Text } from '@/src/components/ui';

export function NotificationSectionHeader({ label }: { label: string }) {
  return (
    <View className="px-5 py-3">
      <Text className="text-[13px] font-sans-bold text-muted uppercase">{label}</Text>
    </View>
  );
}
