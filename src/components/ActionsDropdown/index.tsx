import { ReactNode } from 'react';

import { cn } from '@/utils';

import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './base';

export interface ActionsDropdownProps {
  children: React.ReactNode;
  items: {
    key: string;
    label: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  }[];
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
            key={item.key}
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
