import { cn } from 'heroui-native';
import { type ReactNode } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';

type Props = {
  children: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export function PageWrapper({ children, className, style }: Props) {
  return (
    <View
      className={cn('w-full max-w-[1180px] self-center', className)}
      style={style}
    >
      {children}
    </View>
  );
}
