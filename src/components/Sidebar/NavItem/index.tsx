import { ComponentType, SVGProps } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Utils
import { cn } from '@/utils';

type TNavItemProps = {
  subTitle: string;
  url: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const NavItem = ({ subTitle, url, icon: Icon }: TNavItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDefaultFocused = location.pathname === '/';
  const isFocused = location.pathname.includes(url);
  const isDisabled = url !== 'leave-management' && url !== 'dashboard';

  const linkClasses = cn(
    'flex items-center w-full gap-3 px-5 py-4 rounded-[14px] rounded-lg transition-colors',
    url ? 'cursor-pointer' : 'cursor-not-allowed',
    (isDefaultFocused || isFocused) && url
      ? 'bg-secondary text-black-default'
      : 'hover:bg-gray-ash',
  );

  return (
    <button
      title={subTitle}
      className={linkClasses}
      disabled={isDisabled}
      onClick={() => navigate(url)}
    >
      <div className="w-10">
        <Icon
          className={cn(
            (isDefaultFocused || isFocused) && url
              ? 'text-black'
              : 'text-white',
          )}
        />
      </div>
      <span className="text-md">{subTitle}</span>
    </button>
  );
};

export default NavItem;
