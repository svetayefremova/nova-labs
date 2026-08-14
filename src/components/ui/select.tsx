import { Select as HeroSelect } from 'heroui-native';
import React from 'react';
import { Platform, View } from 'react-native';
import { useCSSVariable } from 'uniwind';

import { Text } from './text';

type Option = { value: string; label: string };

type Props = {
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
};

const WebSelectTag = 'select' as unknown as React.ComponentType<
  React.HTMLProps<HTMLSelectElement>
>;
const WebOptionTag = 'option' as unknown as React.ComponentType<
  React.HTMLProps<HTMLOptionElement>
>;

export function Select({ options, value, onValueChange, placeholder }: Props) {
  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? placeholder ?? '';
  const textColor = String(useCSSVariable('--color-text'));

  if (Platform.OS === 'web') {
    return (
      <View
        style={{
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <WebSelectTag
          value={value}
          onChange={(e) =>
            onValueChange(
              (e as React.ChangeEvent<HTMLSelectElement>).target.value,
            )
          }
          style={{
            border: 'none',
            background: 'transparent',
            fontSize: 12,
            fontWeight: '500',
            color: textColor,
            cursor: 'pointer',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        >
          {options.map((opt) => (
            <WebOptionTag key={opt.value} value={opt.value}>
              {opt.label}
            </WebOptionTag>
          ))}
        </WebSelectTag>
      </View>
    );
  }

  return (
    <HeroSelect
      presentation="bottom-sheet"
      onValueChange={(opt) => onValueChange((opt as { value: string }).value)}
    >
      <HeroSelect.Trigger
        variant="unstyled"
        className="flex-row items-center gap-1 px-3 py-2"
      >
        <Text variant="caption" className="font-sans-medium">
          {selectedLabel}
        </Text>
        <HeroSelect.TriggerIndicator
          iconProps={{ size: 16, color: textColor }}
        />
      </HeroSelect.Trigger>
      <HeroSelect.Portal>
        <HeroSelect.Overlay />
        <HeroSelect.Content presentation="bottom-sheet" snapPoints={['35%']}>
          {options.map((opt) => (
            <HeroSelect.Item
              key={opt.value}
              value={opt.value}
              label={opt.label}
            >
              {({ isSelected }) => (
                <View className="flex-row items-center justify-between flex-1 px-1 py-1">
                  <Text variant="body">{opt.label}</Text>
                  {isSelected ? (
                    <HeroSelect.ItemIndicator
                      iconProps={{ size: 16, color: textColor }}
                    />
                  ) : null}
                </View>
              )}
            </HeroSelect.Item>
          ))}
        </HeroSelect.Content>
      </HeroSelect.Portal>
    </HeroSelect>
  );
}
