import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Icon, Text } from '@/src/components/ui';
import { GradientShell } from '@/src/components/welcome/gradient-shell';
import { ScanViewport } from '@/src/components/welcome/scan-viewport';

type Props = {
  scanLabel?: string;
  scanSize?: number;
  children?: ReactNode;
  footer?: ReactNode;
};

export function GradientColumn({
  scanLabel,
  scanSize = 120,
  children,
  footer,
}: Props) {
  const { t } = useTranslation();
  const yellow = String(useCSSVariable('--color-accent-yellow'));

  return (
    <View style={{ width: '50%' }}>
      <GradientShell fullHeight>
        <View className="flex-1 items-center justify-center">
          <View className="flex-1 py-12 px-10 justify-between w-full max-w-[520px]">
            <View className="flex-row items-center gap-2">
              <Icon name="reticle" size={36} color={yellow} />
              <Text variant="title" color="reverse">
                {t('app_name', 'Nova')}
              </Text>
            </View>

            <View className="items-start gap-8">
              <ScanViewport icon="reticle" size={scanSize} label={scanLabel} />
              {children}
            </View>

            {footer ?? <View />}
          </View>
        </View>
      </GradientShell>
    </View>
  );
}
