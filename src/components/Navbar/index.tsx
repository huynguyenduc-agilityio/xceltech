import { useState } from 'react';

// Constants
import { USER_NAVIGATION_CONFIG } from '@/constants';

const Navbar = () => {
  const [active, setActive] = useState('Dashboard');

  return (
    <nav className="h-[122px] bg-white flex items-end justify-between">
      {/* Left side */}
      <div className=""></div>

      {/* Center - Menu */}
      <div className="flex">
        {USER_NAVIGATION_CONFIG.map((item) => (
          <button
            key={item.title}
            onClick={() => setActive(item.title)}
            className={'relative w-[160px] py-[22px] text-lg'}
          >
            {item.title}
            {active === item.title && (
              <span className="absolute left-1/2 transform -translate-x-1/2 w-[160px] h-[5px] bg-secondary bottom-0 rounded-regular"></span>
            )}
          </button>
        ))}
      </div>

      {/* TODO: Right side*/}
      <div className="flex items-center space-x-7 pb-[22px]"></div>
    </nav>
  );
};

export default Navbar;
