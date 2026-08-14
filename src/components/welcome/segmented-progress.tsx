import { View } from 'react-native';
import { useCSSVariable } from 'uniwind';

interface SegmentedProgressProps {
  step: number;
  count?: number;
}

export function SegmentedProgress({ step, count = 3 }: SegmentedProgressProps) {
  const white = String(useCSSVariable('--color-white'));

  return (
    <View className="flex-row gap-2 mb-6">
      {Array.from({ length: count }, (_, i) => {
        const active = i === step;
        const filled = i <= step;
        return (
          <View
            key={i}
            className={`flex-1 h-[5px] rounded-full ${filled ? 'bg-primary' : 'bg-background-secondary'}`}
          >
            {active && (
              <View
                className="absolute right-0 w-[16px] h-[16px] rounded-full border-[3px]"
                style={{
                  top: -5.5,
                  backgroundColor: '#EDEF7E',
                  borderColor: white,
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}
