import { cn } from 'heroui-native';
import {
  type AccessibilityRole,
  Text as RNText,
  type TextProps as RNTextProps,
} from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

const textStyles = tv({
  base: 'font-sans',
  variants: {
    variant: {
      display:
        'text-[34px] font-sans-extrabold leading-[1.1] tracking-[-1.8px]',
      heading: 'text-[30px] font-sans-extrabold leading-[1.1]',
      title: 'text-[24px]  font-sans-bold',
      subtitle: 'text-[20px] font-sans-semibold',
      body: 'text-[16px] font-sans',
      label: 'text-[16px] font-sans-semibold',
      caption: 'text-[14px] font-sans',
      badge: 'text-[12px] font-sans-semibold',
      overline: 'text-[10px] font-sans uppercase tracking-[1.4px]',
    },
    color: {
      default: 'text-text',
      muted: 'text-muted',
      primary: 'text-foreground',
      reverse: 'text-reverse',
      'reverse-muted': 'text-reverse-muted',
      critical: 'text-severity-critical',
      benign: 'text-severity-benign',
      normal: 'text-severity-normal',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'default',
  },
});

type TextVariants = VariantProps<typeof textStyles>;

type Props = RNTextProps &
  TextVariants & {
    className?: string;
    /** Heading level (1–6) announced by screen readers. Only meaningful when
     *  variant is "display" or "heading" (accessibilityRole="header"). */
    'aria-level'?: 1 | 2 | 3 | 4 | 5 | 6;
  };

const HEADER_VARIANTS = new Set<TextVariants['variant']>([
  'display',
  'heading',
]);

function defaultRoleForVariant(
  variant: TextVariants['variant'],
): AccessibilityRole {
  return HEADER_VARIANTS.has(variant) ? 'header' : 'text';
}

export function Text({
  variant,
  color,
  className,
  accessibilityRole,
  ...props
}: Props) {
  return (
    <RNText
      className={cn(textStyles({ variant, color }), className)}
      accessibilityRole={accessibilityRole ?? defaultRoleForVariant(variant)}
      maxFontSizeMultiplier={1.5}
      {...props}
    />
  );
}
