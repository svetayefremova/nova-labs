import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { Image, Platform, useWindowDimensions, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { ScansStrip } from '@/src/components/home/scans-strip';
import { Icon, IconButton, Text } from '@/src/components/ui';
import { TABLET } from '@/src/constants/layout';
import type { SeverityCounts } from '@/src/types/domain';

type Props = {
  patientName: string;
  mrn: string;
  age: number;
  scanInfo: string;
  totals: SeverityCounts;
  activeIndex: number;
  onSelect: (index: number) => void;
  onProfilePress: () => void;
};

export function SummaryCard({
  patientName,
  mrn,
  age,
  activeIndex,
  onSelect,
  onProfilePress,
}: Props) {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const isTabletOrDesktop = width >= TABLET;
  const textColor = String(useCSSVariable('--color-text'));
  const borderColor = String(useCSSVariable('--color-background'));
  const primaryColor = String(useCSSVariable('--color-primary'));

  const profileSection = (
    <View className="px-4 pt-4 pb-4">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View
            className="flex-row items-center self-start rounded-full bg-accent-yellow px-2 py-1"
            style={{ gap: 6 }}
          >
            <Icon name="patient" size={16} color={textColor} />
            <Text
              variant="caption"
              className="text-[12px] font-sans-semibold"
              style={{ color: textColor }}
            >
              {mrn}
            </Text>
          </View>

          <Text variant="title" color="reverse" className="mt-1">
            {patientName}
          </Text>
          <Text variant="caption" color="reverse-muted">
            {t('scan.patient_age', { age })}
          </Text>
        </View>

        <IconButton
          name="arrow-right"
          size="sm"
          onPress={onProfilePress}
          accessibilityLabel="View profile"
        />
      </View>
    </View>
  );

  if (isTabletOrDesktop) {
    return (
      <>
        <View className="bg-primary rounded-[24px] overflow-hidden my-2">
          {profileSection}
          <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.3)' }} />
        </View>
        <View className="pt-3 pb-2 -ml-4">
          <ScansStrip activeIndex={activeIndex} onSelect={onSelect} />
        </View>
      </>
    );
  }

  return (
    <View className="bg-primary rounded-[24px] overflow-hidden mt-2 relative">
      <Image
        source={require('@/assets/images/male.png')}
        style={{
          position: 'absolute',
          right: -280,
          top: -10,
          width: '220%',
          height: '220%',
        }}
        resizeMode="contain"
      />
      <LinearGradient
        colors={['rgba(92,133,217,0)', 'rgba(92,133,217,0)', primaryColor]}
        locations={[0, 0.75, 1]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
        }}
      />

      <View className="px-4 pt-4 pb-10">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <View
              className="flex-row items-center self-start rounded-full bg-accent-yellow px-2 py-1"
              style={{ gap: 6 }}
            >
              <Icon name="patient" size={16} color={textColor} />
              <Text
                variant="caption"
                className="text-[12px] font-sans-semibold"
                style={{ color: textColor }}
              >
                {mrn}
              </Text>
            </View>

            <Text variant="title" color="reverse" className="mt-1">
              {patientName}
            </Text>
            <Text variant="caption" color="reverse-muted">
              {t('scan.patient_age', { age })}
            </Text>
          </View>

          <IconButton
            name="arrow-right"
            size="sm"
            onPress={onProfilePress}
            accessibilityLabel="View profile"
          />
        </View>
      </View>

      <BlurView
        intensity={25}
        tint="light"
        style={[
          {
            overflow: 'hidden',
            paddingTop: 12,
            paddingBottom: 8,
            backgroundColor: 'rgba(255, 255, 254, 0.50)',
            borderTopWidth: 1,
            borderColor: borderColor,
          },
          Platform.OS === 'android' && { backgroundColor: 'rgba(255,255,255,0.50)' },
        ]}
      >
        <ScansStrip activeIndex={activeIndex} onSelect={onSelect} />
      </BlurView>
    </View>
  );
}
