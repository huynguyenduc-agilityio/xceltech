import * as React from 'react';
import isEqual from 'react-fast-compare';

import { cn } from '@/utils';

const TableHeaderComponent = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('text-lg font-bold', className)} {...props} />
));
TableHeaderComponent.displayName = 'TableHeader';

const TableHeader = React.memo(TableHeaderComponent, isEqual);

export { TableHeader };
