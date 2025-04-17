import { OverviewCard, Progress } from '@/components';

// Constants
import { DASHBOARD_PAYROLLS } from '@/constants';

// Utils
import { cn } from '@/utils';

const PayrollsCard = () => (
  <OverviewCard title="April Payrolls">
    <div className="flex flex-col gap-[14px]">
      {DASHBOARD_PAYROLLS.map(({ id, image, name, salary, status, value }) => (
        <div
          key={id}
          className="flex items-center justify-between px-[30px] py-3 bg-blue-light rounded-regular"
        >
          <div className="flex items-center gap-6">
            <img src={image} alt={name} className="w-[52px] h-[49px]" />
            <div>
              <p className="text-md font-bold">{name}</p>
              <span className="text-sm font-bold text-gray-steel">
                Applied for : {salary}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 w-[169px]">
            <p className="text-xs font-bold">{status}</p>
            <Progress
              value={value}
              className={cn(
                'h-4 rounded-2xl bg-secondary',
                status === 'Paid' && 'bg-green-primary',
              )}
              indicatorClass="bg-black-default"
            />
          </div>
        </div>
      ))}
    </div>
  </OverviewCard>
);

export default PayrollsCard;
