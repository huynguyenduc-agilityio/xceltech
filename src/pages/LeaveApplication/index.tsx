// Constants
import { LEAVE_TILE_ITEMS, USER_PAGE } from '@/constants';

// Icons
import { BookIcon } from '@/icons';

// Components
import { Breadcrumb, Carousel } from '@/components';

import TableLeave from './TableLeave';

const BREADCRUMB_ITEMS = [
  { label: 'Dashboard', href: USER_PAGE.DASHBOARD },
  { label: 'Apply for Leave' },
];

const LeaveApplication = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center w-full px-[62px] py-8 bg-white">
        <Breadcrumb items={BREADCRUMB_ITEMS} />
      </div>

      <div className="bg-white p-12">
        <div className="flex items-center gap-4 mb-11">
          <BookIcon />
          <h2 className="text-2xl">Leave Application</h2>
        </div>

        <Carousel listContent={LEAVE_TILE_ITEMS} />

        <TableLeave />
      </div>
    </div>
  );
};

export default LeaveApplication;
