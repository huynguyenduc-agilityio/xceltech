import * as React from 'react';

import { cn } from '@/utils';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  isInvalid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isInvalid, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-regular bg-blue-light px-5 py-4 text-lg text-black-smoky placeholder:text-gray-soft outline-none resize-none disabled:cursor-not-allowed disabled:opacity-50',
          isInvalid && 'bg-red-100',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
