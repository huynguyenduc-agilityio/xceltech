import * as React from 'react';
import { cn } from '@/utils';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('text-lg font-bold', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

export { TableHeader };
