import { Avatar, Button } from '@/components';
import OverviewSection from './OverviewSection';
import QuickAction from './QuickAction';

const UserDashboard = () => {
  return (
    <>
      <h1 className="text-2xl text-primary font-bold">Dashboard</h1>
      {/* Profile Section */}
      {/* TODO: Get Profile User */}
      <div className="relative bg-blue-midnightAzure text-white mt-8 pl-[52px] py-[52px] flex items-center justify-between rounded-regular">
        <div className="flex items-center gap-9">
          <div className="w-[139px] h-[139px] p-2 rounded-full border-2 border-white">
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvtXo0VK1WnuWrlK1tOXQizpHNhvqSJ9hUnQ&s"
              size="100%"
            />
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-3xl font-bold">Redwan husein</span>
            <span className="text-2xl">UI / UX Designer & UX Writer</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <Button variant="secondary" className="w-[252px] h-[65px] text-xl">
            Edit Profile
          </Button>
          <img src="/public/assets/images/arrow.webp" />
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
