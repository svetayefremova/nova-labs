import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Card, Icon, Text } from '@/src/components/ui';
import type { Document } from '@/src/types/domain';

type Props = {
  document: Document;
  onPress: () => void;
};

export function DocumentRow({ document, onPress }: Props) {
  const { t } = useTranslation();
  const mutedColor = String(useCSSVariable('--color-muted'));

  return (
    <Card onPress={onPress} accessibilityLabel={document.title}>
      <View className="flex-row items-center justify-between gap-3">
        <View className="w-8 h-8 rounded-xl bg-black/[0.04] items-center justify-center shrink-0">
          <Text variant="overline" color="muted">
            {t('document.pdf')}
          </Text>
        </View>
        <View className="flex-1 min-w-0">
          <Text variant="overline" color="muted">
            {document.type}
          </Text>
          <Text variant="label" className="mt-1" numberOfLines={2}>
            {document.title}
          </Text>
          <Text variant="caption" color="muted" className="mt-1">
            {document.date} · {document.size}
          </Text>
        </View>
        <View className="w-10 h-10 rounded-full border border-surface-border items-center justify-center">
          <Icon name="chevron-right" size={18} color={mutedColor} />
        </View>
      </View>
    </Card>
  );
}
