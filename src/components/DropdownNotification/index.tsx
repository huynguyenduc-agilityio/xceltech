// Icons
import { BellIcon } from '@/icons';

// Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../common/DropdownMenu';
import Fallback from '../Fallback';
import { Button } from '../common';

// Hooks
import { useGetNotifications } from '@/hooks';
import { formatDate } from '@/utils';

const DropdownNotification = () => {
  const { isNotificationLoading, notifications } = useGetNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          title="Dropdown Notification"
          className="relative flex items-center justify-center rounded-full w-[53px] h-[53px] bg-primary"
        >
          <BellIcon className="text-white w-6 h-6" />

          {Number(notifications?.length) > 0 && (
            <div className="absolute -top-0 -right-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-white bg-red-primary text-white text-xs font-bold shadow-md">
                {notifications?.length}
              </div>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 bg-white">
        <DropdownMenuLabel className="flex text-lg items-center justify-center p-4 border-b">
          Recall Notification
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isNotificationLoading ? (
          <Fallback />
        ) : (
          notifications?.map(({ id, message, createdAt }) => (
            <DropdownMenuItem
              key={id}
              className="flex justify-between p-4 border-b"
            >
              <div className="flex flex-col gap-2">
                <p className="text-md text-slate-500 truncate max-w-[350px]">
                  {message}
                </p>
                <p className="text-slate-500">
                  {formatDate(new Date(createdAt))}
                </p>
              </div>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownNotification;
