// Components
import AppliedJobsCard from './AppliedJobsCard';
import EmployeesCard from './EmployeesCard';
import CandidatesCard from './CandidatesCard';
import PayrollsCard from './PayrollsCard';

const OverviewDashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-[64px]">
    <AppliedJobsCard />

    <EmployeesCard />

    <CandidatesCard />

    <PayrollsCard />
  </div>
);

export default OverviewDashboard;
