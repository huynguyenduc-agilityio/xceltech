import { ReactNode } from 'react';

// Icons
import { LogoIcon, LogoutIcon } from '@/icons';

// Component
import NavCollapse from './NavCollapse';

const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      {/* Navbar */}
      <nav className="fixed h-screen w-[359px] pt-[18px] overflow-y-auto transition-all duration-300 bg-blue-deepest text-white">
        <LogoIcon />

        <div className="flex items-center mt-[47px] mb-[44px] px-4">
          <div className="w-[112px] h-[112px] p-2 rounded-full border-2 border-white">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvtXo0VK1WnuWrlK1tOXQizpHNhvqSJ9hUnQ&s"
              alt="John Carter"
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="flex flex-col ml-[22px]">
            <span className="text-xl font-bold">Aman admin</span>
            <span className="text-sm">Admin</span>
          </div>
        </div>

        <NavCollapse />
        <div className="mt-12 mb-3 px-4">
          <button className="flex items-center justify-center py-4 bg-red-primary rounded-[14px] w-full">
            <LogoutIcon className="mr-3" />
            <p className="text-md font-bold">Logout</p>
          </button>
        </div>

        <div>
          <img src="public/assets/images/footerNav.png" />
        </div>
      </nav>

      {/* Body Content */}
      <div className="ml-[359px] bg-blue-light">{children}</div>
    </div>
  );
};

export default Sidebar;
