import { useParams } from 'react-router-dom';

// Constants
import { LEAVE_TYPE_FORM, USER_PAGE } from '@/constants';

// Hooks
import { useGetLeave } from '@/hooks';

// Components
import { Breadcrumb, Fallback, LeaveForm } from '@/components';

const LeaveRequest = () => {
  const { param: leaveType = '', id } = useParams();
  const { leave: leaveDetail, isLeaveLoading } = useGetLeave(id);

  const {
    type,
    startDate,
    endDate,
    durations,
    resumptionDate,
    reason,
    reliefOfficer,
  } = leaveDetail || {};

  const BREADCRUMB_ITEMS = [
    { label: 'Dashboard', href: USER_PAGE.DASHBOARD },
    { label: 'Apply for Leave', href: USER_PAGE.LEAVE },
    { label: `${LEAVE_TYPE_FORM[leaveType.toUpperCase()]} Leave` },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center w-full px-[62px] py-8 bg-white">
        <Breadcrumb items={BREADCRUMB_ITEMS} />
      </div>
      <div className="px-[217px] mt-[18px]">
        {isLeaveLoading ? (
          <Fallback />
        ) : (
          <LeaveForm
            initialValues={
              leaveDetail
                ? {
                    type,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    durations,
                    resumptionDate: new Date(resumptionDate),
                    reason,
                    reliefOfficer,
                  }
                : {}
            }
          />
        )}
      </div>
    </div>
  );
};

export default LeaveRequest;
