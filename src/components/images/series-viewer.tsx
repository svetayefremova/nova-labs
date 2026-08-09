import { View } from 'react-native';

type Props = {
  className?: string;
};

// Placeholder for the DICOM viewer — renders a black square until the
// real viewer (cornerstone + WADO instance loading) is wired up.
export function SeriesViewer({ className }: Props) {
  return (
    <View className={className}>
      <View className="flex-1 aspect-square max-h-[420px] bg-black rounded-lg" />
    </View>
  );
}
