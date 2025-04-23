import { useDeferredValue } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Components
import { Button, NotificationBadge, SearchBar } from '@/components';

// Icons
import { BellIcon, HamburgerIcon, MailIcon, WrenchIcon } from '@/icons';

// Constants
import { ADMIN_PAGE } from '@/constants';

const HeaderLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const deferredQuery = useDeferredValue(searchParams.get('search'));
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      newSearchParams.set('search', value);
    } else {
      newSearchParams.delete('search');
    }

    setSearchParams(newSearchParams);
    navigate(`${ADMIN_PAGE.LEAVE_HISTORY}?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex w-full items-center justify-between px-[47px] py-[60px]">
      <Button variant="ghost" size="icon" aria-label="toggle menu">
        <HamburgerIcon />
      </Button>
      <SearchBar defaultValue={deferredQuery || ''} onChange={handleSearch} />
      <div className="flex items-center space-x-7">
        <NotificationBadge
          count={13}
          icon={<BellIcon className="text-white w-6 h-6" />}
        />
        <div className="flex items-center justify-center rounded-full w-[53px] h-[53px] bg-secondary">
          <WrenchIcon />
        </div>
        <NotificationBadge
          count={13}
          icon={<MailIcon className="text-white w-6 h-6" />}
          className="bg-green-primary"
        />
      </div>
    </div>
  );
};

export default HeaderLayout;
