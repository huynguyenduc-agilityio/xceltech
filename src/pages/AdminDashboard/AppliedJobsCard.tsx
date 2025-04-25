import { OverviewCard } from '@/components';

// Constants
import { DASHBOARD_APPLY_JOBS } from '@/__mocks__';

const AppliedJobsCard = () => (
  <OverviewCard title="Applied Jobs">
    <div className="flex flex-col gap-[14px]">
      {DASHBOARD_APPLY_JOBS.map(({ id, title, image, company, date }) => (
        <div
          key={id}
          className="flex items-center justify-between px-[30px] py-3 h-[79px] bg-blue-light rounded-2xl"
        >
          <div className="flex items-center gap-6">
            <img src={image} alt={image} className="w-14 h-11" />
            <div>
              <p className="text-md font-bold">{title}</p>
              <span className="text-sm text-gray-steel">{company}</span>
            </div>
          </div>
          <p>{date}</p>
        </div>
      ))}
    </div>
  </OverviewCard>
);

export default AppliedJobsCard;
