import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import * as LabelPrimitive from '@radix-ui/react-label';

// Utils
import { cn } from '@/utils';

const labelVariants = cva(
  'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        primary: 'text-black-soft',
        secondary: 'text-primary font-bold',
      },
      size: {
        primary: 'text-xl',
        secondary: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'primary',
    },
  },
);

const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, variant, size, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant, size, className }))}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };
