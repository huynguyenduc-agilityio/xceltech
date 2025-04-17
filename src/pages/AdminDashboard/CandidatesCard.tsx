import { Button, OverviewCard } from '@/components';

// Constants
import { DASHBOARD_CANDIDATES } from '@/constants';

// Icons
import { EyeIcon } from '@/icons';

const CandidatesCard = () => (
  <OverviewCard title="Candidates">
    <div className="flex flex-col gap-[14px]">
      {DASHBOARD_CANDIDATES.map(({ id, image, name, job }) => (
        <div
          key={id}
          className="flex items-center justify-between px-[30px] py-3 bg-blue-light rounded-regular"
        >
          <div className="flex items-center gap-6">
            <img src={image} alt={name} className="w-[52px] h-[49px]" />
            <div>
              <p className="text-md font-abril">{name}</p>
              <span className="text-sm text-gray-steel">
                Applied for : <span className="font-bold">{job}</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs font-bold">View</p>
            <Button
              size="sm"
              variant="secondary"
              className="w-9 h-9 rounded-[20px] text-base bg-green-primary"
            >
              <EyeIcon />
            </Button>
          </div>
        </div>
      ))}
    </div>
  </OverviewCard>
);

export default CandidatesCard;
