import { cn } from 'heroui-native';
import { Platform, Pressable, View, type ViewStyle } from 'react-native';

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
};

type Props =
  | (BaseProps & { onPress: () => void; accessibilityLabel: string })
  | (BaseProps & { onPress?: never; accessibilityLabel?: string });

export function Card({ children, onPress, accessibilityLabel, className, style }: Props) {
  const outerClass = cn('rounded-[24px] bg-white', className);

  const body = (
    <View className="overflow-hidden rounded-[24px] flex-1 flex-col px-4 pt-4 pb-5">
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className={cn(
          outerClass,
          Platform.OS === 'web' &&
            'border border-black/8 web:hover:shadow-xl web:hover:shadow-primary/4 web:transition-shadow web:duration-200',
        )}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) => [style, pressed ? { transform: [{ scale: 0.985 }] } : undefined]}
      >
        {body}
      </Pressable>
    );
  }

  return (
    <View className={outerClass} style={[style]}>
      {body}
    </View>
  );
}
