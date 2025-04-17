import { Link, useLocation } from 'react-router-dom';

// Constants
import { LEAVE_NAVIGATION } from '@/constants';

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

        return (
          <Link key={path} to={path} className="w-full">
            <Button
              className={cn(
                'w-full h-[70px]',
                isFocused && 'bg-secondary text-white',
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
