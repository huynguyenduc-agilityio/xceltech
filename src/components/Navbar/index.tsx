import { useState } from 'react';
import { Link } from 'react-router-dom';

// Constants
import { USER_NAVIGATION_CONFIG } from '@/constants';

// Icons
import { MailIcon } from '@/icons';

// Components
import { Avatar } from '../common';
import NotificationBadge from '../NotificationBadge';
import DropdownNotification from '../DropdownNotification';

// Utils
import { cn } from '@/utils';

const Navbar = () => {
  const [active, setActive] = useState('Dashboard');

  return (
    <nav className="h-[122px] bg-white flex items-end justify-between px-[72px]">
      {/* Left side */}
      <div className=""></div>

      {/* Center - Menu */}
      <div className="flex">
        {USER_NAVIGATION_CONFIG.map((item) => (
          <Link key={item.title} to={item.path}>
            <button
              onClick={() => setActive(item.title)}
              className={cn(
                'relative w-[160px] py-[22px] text-lg',
                item.title !== 'Dashboard' && 'cursor-not-allowed',
              )}
              disabled={item.title !== 'Dashboard'}
            >
              {item.title}
              {active === item.title && (
                <span className="absolute left-1/2 transform -translate-x-1/2 w-[160px] h-[5px] bg-secondary bottom-0 rounded-regular"></span>
              )}
            </button>
          </Link>
        ))}
      </div>

      {/* TODO: Right side*/}
      <div className="flex items-center space-x-7 pb-[22px]">
        <DropdownNotification />
        <NotificationBadge
          count={13}
          icon={<MailIcon className="text-white w-6 h-6" />}
          className="bg-green-primary"
        />
        {/* TODO: Get user */}
        <Avatar
          alt="avatar-user"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvtXo0VK1WnuWrlK1tOXQizpHNhvqSJ9hUnQ&s"
          size={53}
        />
      </div>
    </nav>
  );
};

export default Navbar;
