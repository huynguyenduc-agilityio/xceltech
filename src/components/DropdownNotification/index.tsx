import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

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

// Utils
import { formatDate } from '@/utils';

// Constants
import { MESSAGES, USER_PAGE } from '@/constants';

const DropdownNotification = () => {
  const { isNotificationLoading, notifications } = useGetNotifications();
  const navigate = useNavigate();

  const renderListNotification = useMemo(() => {
    return notifications?.length ? (
      notifications?.map(({ id, message, createdAt }) => (
        <DropdownMenuItem
          key={id}
          className="flex justify-between p-4 border-b"
          onClick={() => navigate(`${USER_PAGE.LEAVE_RECALL}/${id}`)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-md text-slate-500 truncate max-w-[350px]">
              {message}
            </p>
            <p className="text-slate-500">{formatDate(new Date(createdAt))}</p>
          </div>
        </DropdownMenuItem>
      ))
    ) : (
      <DropdownMenuItem className="flex justify-between p-4 border-b">
        <div className="flex w-full justify-between items-center flex-col gap-2">
          <p className="text-md text-black-default truncate max-w-[350px]">
            {MESSAGES.COMMON.EMPTY_DATA}
          </p>
        </div>
      </DropdownMenuItem>
    );
  }, [navigate, notifications]);

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
        {isNotificationLoading ? <Fallback /> : renderListNotification}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownNotification;
