import { format, isValid, parse } from 'date-fns';
import { cn } from 'heroui-native';
import { Pressable } from 'react-native';

import { Text } from '@/src/components/ui';
import type { DicomSeries, SeverityCounts } from '@/src/types/domain';

type Props = {
  series: DicomSeries;
  counts: SeverityCounts;
  isActive: boolean;
  onPress: () => void;
};

export function ScanStripCard({ series, counts, isActive, onPress }: Props) {
  const total = counts.critical + counts.benign;
  const parsed = parse(series.date, 'd MMM yyyy', new Date());
  const valid = isValid(parsed);
  const day = valid ? format(parsed, 'd') : '—';
  const month = valid ? format(parsed, 'MMM') : '—';
  const year = valid ? format(parsed, 'yyyy') : '—';

  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={`${series.date}, ${total} findings`}
      className={cn(
        'rounded-[18px] py-2 px-6 items-center border-1 border-transparent',
        isActive
          ? 'bg-white web:border-primary web:bg-primary/10'
          : 'bg-background/70 web:border-black/8 web:bg-white/60 web:hover:border-primary web:transition-border web:duration-200',
      )}
    >
      <Text className={`font-sans-extrabold uppercase text-[12px] text-center text-text`}>
        {day} {month}
      </Text>
      <Text className={`text-[14px] text-center text-text/60 font-sans-semibold`}>{year}</Text>
    </Pressable>
  );
}
