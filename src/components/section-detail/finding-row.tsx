import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Card, Icon, Text } from '@/src/components/ui';
import { SEVERITY_BG_CLASS } from '@/src/constants/severity';
import type { Finding } from '@/src/types/domain';

type Props = {
  finding: Finding;
  onPress: () => void;
};

export function FindingRow({ finding, onPress }: Props) {
  const { t } = useTranslation();
  const mutedColor = String(useCSSVariable('--color-muted'));

  return (
    <Card onPress={onPress} accessibilityLabel={finding.name}>
      <View className="flex-row items-center gap-3">
        <View className={`w-2 h-2 rounded-full shrink-0 ${SEVERITY_BG_CLASS[finding.severity]}`} />
        <View className="flex-1 min-w-0 gap-1">
          <View className="flex-row items-center gap-2">
            <Text variant="caption" className="font-sans-bold text-[11px]" color={finding.severity}>
              {t(`severity.${finding.severity}.label`).toUpperCase()}
            </Text>
            {finding.meta && (
              <Text variant="caption" className="text-[11px]" color="muted">
                · {finding.meta}
              </Text>
            )}
          </View>
          <Text variant="label" className="font-sans-bold" numberOfLines={1}>
            {finding.name}
          </Text>
        </View>
        <View className="w-10 h-10 rounded-full border border-surface-border items-center justify-center">
          <Icon name="chevron-right" size={18} color={mutedColor} />
        </View>
      </View>
    </Card>
  );
}
