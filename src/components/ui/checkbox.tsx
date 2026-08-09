import { Pressable, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Icon } from './icon';

type Props = {
  checked: boolean;
  onPress: () => void;
  accessibilityLabel?: string;
};

export function Checkbox({ checked, onPress, accessibilityLabel }: Props) {
  const primary = String(useCSSVariable('--color-primary'));
  const white = String(useCSSVariable('--color-reverse'));
  const neutralGray = String(useCSSVariable('--color-neutral-gray'));

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={accessibilityLabel}
    >
      <View
        className="w-6 h-6 rounded-md items-center justify-center border-2"
        style={{
          borderColor: checked ? primary : neutralGray,
          backgroundColor: checked ? primary : 'transparent',
        }}
      >
        {checked && <Icon name="check" size={14} color={white} />}
      </View>
    </Pressable>
  );
}
