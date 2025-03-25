// Constants
import { ADMIN_NAVIGATION_CONFIG } from '@/constants';

import NavItem from '../NavItem';

const NavCollapse = () => {
  return (
    <div className="grid gap-2 px-4">
      {ADMIN_NAVIGATION_CONFIG.map(({ title, navItem }) => (
        <div key={title}>
          <div className="flex flex-start ml-5 h-[30px]">
            <span className="text-base">{title}</span>
          </div>
          <div className="grid gap-[10px]">
            {navItem.map(({ title, icon, url }) => (
              <NavItem key={title} subTitle={title} url={url} icon={icon} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavCollapse;
