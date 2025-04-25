import * as React from 'react';
import isEqual from 'react-fast-compare';

import { cn } from '@/utils';

const TableRowComponent = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      className,
    )}
    {...props}
  />
));
TableRowComponent.displayName = 'TableRow';

const TableRow = React.memo(TableRowComponent, isEqual);

export { TableRow };
