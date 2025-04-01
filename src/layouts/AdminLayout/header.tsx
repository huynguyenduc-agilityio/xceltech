import { Button, NotificationBadge, SearchBar } from '@/components';
import { BellIcon, HamburgerIcon, MailIcon, WrenchIcon } from '@/icons';

interface HeaderProps {
  onChange?: (value: string) => void;
}

const HeaderLayout = ({ onChange }: HeaderProps) => {
  const handleSearch = (value: string) => {
    onChange?.(value);
  };

  return (
    <div className="flex w-full items-center justify-between px-[47px] py-[60px]">
      <Button variant="ghost" size="icon" aria-label="toggle menu">
        <HamburgerIcon />
      </Button>
      <SearchBar onChange={handleSearch} />
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
