import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import type { IconName } from '@/src/components/ui';
import { Card, Icon, Text } from '@/src/components/ui';
import type { Notification, NotificationType } from '@/src/data/mock-notifications';

const TYPE_CONFIG: Record<NotificationType, { label: string; icon: IconName }> = {
  critical: {
    label: 'CRITICAL FINDING',
    icon: 'warning-triangle',
  },
  study: {
    label: 'STUDY READY',
    icon: 'images',
  },
  document: {
    label: 'DOCUMENT ADDED',
    icon: 'documents',
  },
  'care-team': {
    label: 'CARE TEAM',
    icon: 'patient',
  },
  appointment: {
    label: 'APPOINTMENT',
    icon: 'calendar',
  },
  security: {
    label: 'SECURITY',
    icon: 'shield',
  },
};

export function NotificationCard({ item }: { item: Notification }) {
  const config = TYPE_CONFIG[item.type];
  const textColor = String(useCSSVariable('--color-text'));

  return (
    <Card
      className={`mx-5 mb-3 ${item.unread ? 'native:bg-white/60 web:bg-primary/8' : 'bg-white web:border-1 web:border-black/8'}`}
    >
      <View className="flex-row gap-3">
        <View className="w-11 h-11 rounded-full items-center justify-center shrink-0 bg-neutral-gray/[0.24]">
          <Icon name={config.icon} size={20} color={textColor} />
        </View>
        <View className="flex-1 gap-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-[10px] font-sans-bold text-muted">{config.label}</Text>
            <View className="flex-row items-center gap-2">
              <Text className="text-[12px] text-muted font-sans-medium">{item.time}</Text>
              {item.unread && <View className="w-2 h-2 rounded-full bg-primary" />}
            </View>
          </View>
          <Text className="text-[15px] font-sans-bold text-text leading-5">{item.title}</Text>
          <Text className="text-[13px] text-muted font-sans-medium leading-5">
            {item.body}
          </Text>
        </View>
      </View>
    </Card>
  );
}
