import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/utils';

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorContent?: React.ReactNode;
  indicatorClass?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, indicatorContent, indicatorClass, ...props }, ref) => (
  <div className="flex flex-col flex-1 w-full">
    {indicatorContent}
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-7 w-full overflow-hidden rounded-[3px] bg-backgroundGray',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'h-full flex-1 transition-all rounded-[3px] bg-primary',
          indicatorClass,
        )}
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  </div>
));
Progress.displayName = 'Progress';

export { Progress };
