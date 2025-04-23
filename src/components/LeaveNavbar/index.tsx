import { Link, useLocation } from 'react-router-dom';

// Constants
import { LEAVE_NAVIGATION, PATH_LEAVE } from '@/constants';

// Components
import { Button } from '@/components/common';

// Utils
import { cn } from '@/utils';

const LeaveNavbar = () => {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between px-4 py-2 w-full gap-8 mt-8">
      {LEAVE_NAVIGATION.map(({ path, title }) => {
        const isFocused = location.pathname.includes(path);
        const isDisabled =
          path !== PATH_LEAVE.LEAVE_RECALL && path !== PATH_LEAVE.LEAVE_HISTORY;

        return (
          <Link key={path} to={path} className="w-full">
            <Button
              disabled={isDisabled}
              className={cn(
                'w-full h-[70px]',
                isFocused && 'bg-secondary text-black',
              )}
              key={path}
            >
              {title}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
};

export default LeaveNavbar;
