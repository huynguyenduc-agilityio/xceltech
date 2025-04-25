import { Button, OverviewCard } from '@/components';

// Constants
import { DASHBOARD_EMPLOYEES } from '@/__mocks__';

// Icons
import { DownloadIcon, EyeIcon } from '@/icons';

const EmployeesCard = () => (
  <OverviewCard title="Employees">
    <div className="flex flex-col gap-[14px]">
      {DASHBOARD_EMPLOYEES.map(({ id, image, name, role }) => (
        <div
          key={id}
          className="flex items-center justify-between px-[30px] py-3 bg-blue-light rounded-regular"
        >
          <div className="flex items-center gap-6">
            <img src={image} alt={name} className="w-[52px] h-[49px]" />
            <div>
              <p className="text-md font-bold">{name}</p>
              <span className="text-sm font-bold text-gray-steel">
                Role : {role}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-7">
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs font-bold">View</p>
              <Button
                aria-label="View"
                size="sm"
                variant="secondary"
                className="w-9 h-8 rounded-md text-base bg-green-primary"
              >
                <EyeIcon />
              </Button>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs font-bold">Download</p>
              <Button
                aria-label="Download"
                size="sm"
                variant="secondary"
                className="w-9 h-8 rounded-md text-base bg-primary"
              >
                <DownloadIcon />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </OverviewCard>
);

export default EmployeesCard;
