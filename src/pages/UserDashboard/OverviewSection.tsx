// Icons
import { CalendarIcon } from '@/icons';

// Constants
import { PROGRESS_LEAVE_ITEMS } from '@/__mocks__';

// Mocks
import { mockPaySlipData } from '@/__mocks__';

// Components
import { Button, OverviewCard, Progress } from '@/components';

const OverviewSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-[64px]">
      {/* Available Leave Days */}
      <OverviewCard title="Available Leave Days">
        <div className="flex flex-col gap-7">
          {PROGRESS_LEAVE_ITEMS.map(({ key, title, value }) => (
            <Progress
              key={key}
              aria-label={`Progress ${value}`}
              value={value}
              indicatorContent={title}
            />
          ))}
        </div>
      </OverviewCard>

      {/* Birthdays */}
      <OverviewCard title="Birthdays">
        <div className="flex flex-col gap-[14px]">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-[30px] py-3 bg-blue-light rounded-regular"
            >
              <div className="flex items-center gap-6">
                <CalendarIcon
                  width={22}
                  height={25}
                  style={{ fill: 'black' }}
                  className="text-black-default"
                />
                <span className="text-lg text-gray-steel">
                  Biruk Kidan's Day - April 25th
                </span>
              </div>
              <Button
                size="sm"
                variant="secondary"
                className="w-[182px] rounded-regular text-base"
              >
                Send Wishes
              </Button>
            </div>
          ))}
        </div>
      </OverviewCard>

      {/* Pay Slip Breakdown */}
      <OverviewCard title="April Pay Slip Breakdown">
        <div className="grid grid-cols-4 text-lg bg-blue-light text-gray-steel px-7 py-4 rounded-regular">
          <div>Earnings</div>
          <div>Amount</div>
          <div>Deductions</div>
          <div>Total</div>
        </div>

        {mockPaySlipData.map((row) => (
          <div
            key={row.type}
            className="grid grid-cols-4 text-lg bg-blue-light text-gray-steel px-7 py-4 rounded-regular mt-3"
          >
            <div>{row.type}</div>
            <div>{row.amount}</div>
            <div>{row.deductions}</div>
            <div>{row.total}</div>
          </div>
        ))}
      </OverviewCard>
    </div>
  );
};

export default OverviewSection;
