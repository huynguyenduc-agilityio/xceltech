import { Link, useLocation, useNavigate } from 'react-router-dom';

// Constants
import { AUTHENTICATION_PAGE, USER_NAVIGATION_CONFIG } from '@/constants';

// Icons
import { LogoutIcon, MailIcon } from '@/icons';

// Hooks
import { useGetInfoUser } from '@/hooks';

// Stores
import { useUserActions } from '@/stores';

// Components
import { Avatar, Button } from '../common';
import NotificationBadge from '../NotificationBadge';
import DropdownNotification from '../DropdownNotification';
import ActionsDropdown from '../ActionsDropdown';

// Utils
import { cn, getInitialsAvatar } from '@/utils';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useGetInfoUser();
  const { clearUser } = useUserActions();

  const { firstName = '', lastName = '', avatar = '' } = userInfo || {};

  const handleClickLogoutBtn = () => {
    clearUser();
    navigate(AUTHENTICATION_PAGE.USER_SIGN_IN);
  };

  return (
    <nav className="h-[122px] bg-white flex items-end justify-between px-[72px]">
      {/* Left side */}
      <div className=""></div>

      {/* Center - Menu */}
      <div className="flex">
        {USER_NAVIGATION_CONFIG.map((item) => {
          const isActive =
            location.pathname.split('/')[1] === item.path.split('/')[1];

          return (
            <Link key={item.title} to={item.path}>
              <button
                onClick={() => {
                  if (item.title === 'Dashboard') {
                    navigate(item.path);
                  }
                }}
                className={cn(
                  'relative w-[160px] py-[22px] text-lg',
                  !isActive && 'cursor-not-allowed',
                )}
                disabled={!isActive}
              >
                {item.title}
                {isActive && (
                  <span className="absolute left-1/2 transform -translate-x-1/2 w-[160px] h-[5px] bg-secondary bottom-0 rounded-regular" />
                )}
              </button>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center space-x-7 pb-[22px]">
        <DropdownNotification />
        <NotificationBadge
          count={13}
          icon={<MailIcon className="text-white w-6 h-6" />}
          className="bg-green-primary"
        />

        <ActionsDropdown
          items={[
            {
              key: 'logout',
              label: (
                <>
                  <LogoutIcon
                    width={16}
                    height={16}
                    className="mr-2 text-black-default text-md"
                  />
                  <p className="text-md font-bold">Logout</p>
                </>
              ),
              onClick: handleClickLogoutBtn,
            },
          ]}
          itemClassName="bg-white text-black-default border-b border-b-gray-200 hover:bg-gray-100"
        >
          <Button size="fit" value="ghost" className="rounded-full">
            <Avatar
              src={avatar as string}
              fallback={getInitialsAvatar(`${firstName} ${lastName}`)}
              size={53}
              fallbackClass="text-md"
            />
          </Button>
        </ActionsDropdown>
      </div>
    </nav>
  );
};

export default Navbar;
