import { Pressable, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Icon, type IconName } from './icon';

type Props = {
  name: IconName;
  onPress?: () => void;
  accessibilityLabel?: string;
  border?: boolean;
  size?: 'sm' | 'md';
  color?: string;
  className?: string;
};

export function IconButton({
  name,
  onPress,
  accessibilityLabel,
  border = false,
  size = 'md',
  color: colorProp,
  className,
}: Props) {
  const defaultColor = String(useCSSVariable('--color-text'));
  const color = colorProp ?? defaultColor;
  const sizeClass = size === 'sm' ? 'w-10 h-10' : 'w-12 h-12';
  const iconSize = size === 'sm' ? 20 : 24;
  const borderClass = border ? ' border border-black/10' : '';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={accessibilityLabel}
      className={`${sizeClass} rounded-full bg-white items-center justify-center${borderClass} ${className ?? ''}`}
      style={({ pressed }) => [pressed && { opacity: 0.7, transform: [{ scale: 0.95 }] }]}
    >
      <View pointerEvents="none">
        <Icon name={name} size={iconSize} color={color} />
      </View>
    </Pressable>
  );
}
