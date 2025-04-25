import OverviewSection from './OverviewSection';
import QuickAction from './QuickAction';
import ProfileSection from './ProfileSection';

const UserDashboard = () => {
  return (
    <>
      <h1 className="text-2xl text-primary font-bold">Dashboard</h1>
      {/* Profile Section */}
      <ProfileSection />

      {/* Quick Actions */}
      <QuickAction />

      {/* Grid Layout */}
      <OverviewSection />
    </>
  );
};

export default UserDashboard;
