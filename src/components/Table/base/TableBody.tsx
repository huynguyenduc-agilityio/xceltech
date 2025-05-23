import * as React from 'react';
import { cn } from '@/utils';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0 text-lg', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

export { TableBody };
