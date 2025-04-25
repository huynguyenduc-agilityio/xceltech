import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Constants
import { AUTHENTICATION_PAGE, IMAGES } from '@/constants';

// Stores
import { useUserActions } from '@/stores';

// Hooks
import { useGetInfoUser } from '@/hooks';

// Utils
import { getInitialsAvatar } from '@/utils';

// Icons
import { LogoIcon, LogoutIcon } from '@/icons';

// Component
import NavCollapse from './NavCollapse';
import { Avatar } from '../common';

const Sidebar = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { userInfo } = useGetInfoUser();
  const { clearUser } = useUserActions();

  const { firstName = '', lastName = '', avatar, role } = userInfo || {};

  const handleClickLogoutBtn = () => {
    clearUser();
    navigate(AUTHENTICATION_PAGE.ADMIN_SIGN_IN);
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Navbar */}
      <nav className="flex flex-col justify-between fixed h-screen w-[359px] pt-[18px] overflow-y-auto transition-all duration-300 bg-blue-deepest text-white">
        <div>
          <LogoIcon />

          <div className="flex items-center mt-[47px] mb-[44px] px-4">
            <div className="w-[112px] h-[112px] p-2 rounded-full border-2 border-white">
              <Avatar
                src={avatar as string}
                fallback={getInitialsAvatar(`${firstName} ${lastName}`)}
                size="100%"
              />
            </div>
            <div className="flex flex-col ml-[22px]">
              <span className="text-xl font-bold">
                {firstName} {lastName}
              </span>
              <span className="text-sm">{role}</span>
            </div>
          </div>

          <NavCollapse />
          <div className="mt-12 mb-3 px-4">
            <button
              className="flex items-center justify-center py-4 bg-red-600 rounded-[14px] w-full"
              onClick={handleClickLogoutBtn}
            >
              <LogoutIcon className="mr-3" />
              <p className="text-md font-bold">Logout</p>
            </button>
          </div>
        </div>

        <img src={IMAGES.FOOTER_NAV} alt="Footer Nav" />
      </nav>

      {/* Body Content */}
      {children}
    </div>
  );
};

export default Sidebar;
