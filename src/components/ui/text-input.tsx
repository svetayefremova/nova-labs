import type { ReactNode } from 'react';
import { useState } from 'react';
import type { TextInputProps as RNTextInputProps } from 'react-native';
import { TextInput as RNTextInput, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Text } from './text';

const inputConfigByType = {
  text: {
    keyboardType: 'default',
    autoCapitalize: 'sentences',
    autoComplete: 'off',
  },
  email: {
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoComplete: 'email',
  },
  password: {
    keyboardType: 'default',
    autoCapitalize: 'none',
    autoComplete: 'password',
  },
  phone: {
    keyboardType: 'phone-pad',
    autoCapitalize: 'none',
    autoComplete: 'tel',
  },
} as const;

type InputType = keyof typeof inputConfigByType;

type Props = {
  label?: string;
  type?: InputType;
  rightSlot?: ReactNode;
} & Pick<
  RNTextInputProps,
  | 'value'
  | 'onChangeText'
  | 'placeholder'
  | 'secureTextEntry'
  | 'className'
  | 'placeholderTextColor'
>;

export function TextInput({
  label,
  type = 'text',
  rightSlot,
  className,
  ...textInputProps
}: Props) {
  const [focused, setFocused] = useState(false);
  const textColor = String(useCSSVariable('--color-text'));
  const placeholderColor = `${textColor}40`;

  const isPassword = type === 'password';
  const config = inputConfigByType[type];

  const input = (
    <RNTextInput
      secureTextEntry={isPassword}
      {...config}
      {...textInputProps}
      className={
        label ? 'text-text h-8 p-0 text-[16px] web:outline-none' : className
      }
      placeholderTextColor={placeholderColor}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );

  if (!label) return input;

  return (
    <View
      className={`flex-row items-center rounded-2xl px-3 pt-2 pb-1 border ${focused ? 'border-primary bg-white' : 'border-transparent bg-background/70'}`}
    >
      <View className="flex-1">
        <Text className="text-[10px] font-sans-semibold text-muted uppercase">
          {label}
        </Text>
        {input}
      </View>
      {rightSlot && <View className="ml-1 justify-center">{rightSlot}</View>}
    </View>
  );
}
