import InfoTileList from './InfoTileList';
import OverviewDashboard from './OverviewDashboard';

const AdminDashboard = () => {
  return (
    <div className="px-12">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <InfoTileList />

      <OverviewDashboard />
    </div>
  );
};

export default AdminDashboard;
