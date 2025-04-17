import { cn } from '@/utils';

import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './base';

export interface ActionsDropdownProps {
  children: React.ReactNode;
  items: { label: string; onClick?: () => void; disabled?: boolean }[];
  className?: string;
  itemClassName?: string;
}

const ActionsDropdown = ({
  children,
  items,
  className,
  itemClassName,
}: ActionsDropdownProps) => {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className={cn(className)}>
        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={item.onClick}
            disabled={item.disabled}
            className={cn(itemClassName)}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
};

export default ActionsDropdown;
