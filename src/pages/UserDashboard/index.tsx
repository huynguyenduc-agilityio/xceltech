import { Link } from 'react-router-dom';

// Constants
import { USER_PAGE } from '@/constants';

// Hooks
import { useGetInfoUser } from '@/hooks';

// Utils
import { getInitialsAvatar } from '@/utils';

// Components
import { Avatar, Button } from '@/components';

import OverviewSection from './OverviewSection';
import QuickAction from './QuickAction';

const UserDashboard = () => {
  const { userInfo } = useGetInfoUser();

  const { firstName = '', lastName = '', avatar = '', job } = userInfo || {};

  return (
    <>
      <h1 className="text-2xl text-primary font-bold">Dashboard</h1>
      {/* Profile Section */}
      <div className="relative bg-blue-midnightAzure text-white mt-8 pl-[52px] py-[52px] flex items-center justify-between rounded-regular">
        <div className="flex items-center gap-9">
          <div className="w-[139px] h-[139px] p-2 rounded-full border-2 border-white">
            <Avatar
              src={avatar as string}
              fallback={getInitialsAvatar(`${firstName} ${lastName}`)}
              size="100%"
              className="text-2xl"
            />
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-3xl font-bold">
              {`${firstName} ${lastName}`}
            </span>
            <span className="text-2xl">{job?.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <Link to={USER_PAGE.PROFILE_EDIT}>
            <Button variant="secondary" className="w-[252px] h-[65px] text-xl">
              Edit Profile
            </Button>
          </Link>

          <img alt="profile-icon" src="/assets/images/arrow.webp" />
        </div>
      </div>

      {/* Quick Actions */}
      <QuickAction />

      {/* Grid Layout */}
      <OverviewSection />
    </>
  );
};

export default UserDashboard;
