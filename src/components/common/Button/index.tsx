import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';
import { LoaderCircleIcon } from 'lucide-react';

const buttonVariants = cva(
  'font-productsans inline-flex items-center justify-center whitespace-nowrap rounded-[14px] text-lg font-bold ring-offset-background transition-all duration-300 ease-in-out outline-none focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white',
        outline: 'border-[3px] border-primary text-primary bg-background',
        secondary: 'bg-secondary text-black-default hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-[70px] py-6',
        sm: 'h-10 rounded-[23px]',
        md: 'h-14 py-5',
        lg: 'h-[61px] rounded-md',
        fit: 'w-fit h-fit',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loaderSize?: number;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      disabled = false,
      loaderSize = 14,
      children,
      ...props
    },
    ref,
  ) => {
    const ComponentTag = asChild ? Slot : 'button';
    const isDisabled = disabled || isLoading;

    return (
      <ComponentTag
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={!asChild && isDisabled}
        {...props}
      >
        {isLoading ? (
          <LoaderCircleIcon
            data-testid="loader-button"
            size={loaderSize}
            strokeWidth={3}
            strokeLinecap="square"
            className="w-6 h-6 animate-spin"
          />
        ) : (
          children
        )}
      </ComponentTag>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
