import { forwardRef, InputHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

// Utils
import { cn } from '@/utils';

const inputVariants = cva(
  'font-productsans flex w-full px-5 py-4 text-lg text-black-smoky placeholder:text-gray-soft outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-blue-light h-[54px]',
        secondary: 'h-[61px] rounded-md border-2 border-gray-muted',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  isInvalid?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { placeholder, className, variant, type, isInvalid = false, ...props },
    ref,
  ) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({ variant }),
          isInvalid && variant === 'primary' && 'bg-red-100',
          isInvalid && variant === 'secondary' && 'border-red-500',
          className,
        )}
        ref={ref}
        autoComplete="off"
        data-testid="input-element"
        placeholder={placeholder}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input, inputVariants };
