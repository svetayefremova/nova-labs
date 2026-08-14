import type { ButtonRootProps } from 'heroui-native';
import { Button as HeroButton, cn, Spinner } from 'heroui-native';
import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { tv, type VariantProps } from 'tailwind-variants';
import { useCSSVariable } from 'uniwind';

const buttonStyles = tv({
  slots: {
    root: 'rounded-full px-8 gap-2',
    label: 'font-sans-semibold text-center flex-shrink',
    spinnerColorVar: '',
  },
  variants: {
    variant: {
      // Solid teal fill — primary CTA
      primary: {
        root: 'bg-primary',
        label: 'text-primary-foreground text-body',
        spinnerColorVar: '--color-primary-foreground',
      },
      // Outlined teal — secondary / cancel-adjacent actions
      secondary: {
        root: 'bg-transparent border border-primary',
        label: 'text-primary text-body',
        spinnerColorVar: '--color-primary',
      },
      // No border, background color — low-emphasis inline action
      tertiary: {
        root: 'bg-background',
        label: 'text-primary text-body',
        spinnerColorVar: '--color-primary',
      },
      // Text-only — back / inline / low-emphasis actions
      ghost: {
        root: 'bg-transparent',
        label: 'text-foreground/55 uppercase text-label',
        spinnerColorVar: '--color-foreground',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type ButtonVariants = VariantProps<typeof buttonStyles>;

type BaseProps = Omit<
  ButtonRootProps,
  'className' | 'variant' | 'feedbackVariant' | 'animation'
> &
  ButtonVariants & {
    className?: string;
    isLoading?: boolean;
    children?: React.ReactNode;
  };

// accessibilityLabel is required for icon-only buttons (no visible text label)
type RootProps =
  | (BaseProps & { isIconOnly: true; accessibilityLabel: string })
  | (BaseProps & { isIconOnly?: false });

type HeroLabelProps = React.ComponentProps<typeof HeroButton.Label>;

type LabelProps = HeroLabelProps & {
  className?: string;
  children?: React.ReactNode;
};

const ButtonContext = createContext<{
  variant?: ButtonVariants['variant'];
} | null>(null);
const useButtonContext = () => useContext(ButtonContext) ?? {};

export function Button({
  variant,
  className,
  children,
  isLoading = false,
  ...props
}: RootProps) {
  const { t } = useTranslation();
  const { root, spinnerColorVar } = buttonStyles({ variant });
  const spinnerColor = String(useCSSVariable(spinnerColorVar()));

  return (
    <ButtonContext.Provider value={{ variant }}>
      <HeroButton
        feedbackVariant="none"
        accessibilityRole="button"
        className={cn(root(), props.isIconOnly && 'px-0', className)}
        {...props}
        accessibilityState={{
          disabled: !!props.isDisabled,
          busy: isLoading,
          ...props.accessibilityState,
        }}
      >
        {isLoading ? (
          <Spinner
            color={spinnerColor}
            accessibilityLabel={t('accessability.loading')}
          />
        ) : (
          children
        )}
      </HeroButton>
    </ButtonContext.Provider>
  );
}

function ButtonLabel({ className, children }: LabelProps) {
  const { variant } = useButtonContext();
  const { label } = buttonStyles({ variant });

  return (
    <HeroButton.Label className={cn(label(), className)}>
      {children}
    </HeroButton.Label>
  );
}

Button.Label = ButtonLabel;
