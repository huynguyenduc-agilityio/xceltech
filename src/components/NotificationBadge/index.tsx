import { ReactNode } from 'react';
import { cn } from '@/utils';

export interface NotificationBadgeProps {
  count: number;
  icon?: ReactNode;
  className?: string;
}

const NotificationBadge = ({
  count,
  icon,
  className,
}: NotificationBadgeProps) => {
  if (count <= 0) return null;

  return icon ? (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full w-[53px] h-[53px] bg-primary',
        className,
      )}
    >
      {icon}
      <div className="absolute -top-0 -right-2">
        <div
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded-full border border-white bg-red-primary text-white text-xs font-bold shadow-md',
            !icon && className,
          )}
        >
          {count}
        </div>
      </div>
    </div>
  ) : (
    <div
      className={cn(
        'flex h-5 w-5 items-center justify-center rounded-full border border-white bg-red-primary text-white text-xs font-bold shadow-md',
        !icon && className,
      )}
    >
      {count}
    </div>
  );
};

export default NotificationBadge;
