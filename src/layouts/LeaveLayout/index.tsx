import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

// Components
import { LeaveNavbar, Sidebar } from '@/components';
import HeaderLayout from './header';

// Icons
import { BookIcon } from '@/icons';

const ConfirmDialog = lazy(() => import('@/components/ConfirmDialog'));

const LeaveLayout = () => {
  return (
    <>
      <Sidebar>
        <main className="w-full ml-[359px] overflow-hidden bg-blue-light">
          <HeaderLayout />
          <div className="flex flex-col flex-1 px-12">
            <div className="flex items-center gap-3">
              <BookIcon />
              <h1 className="text-xl font-bold">Leave Management</h1>
            </div>
            <LeaveNavbar />
            <Outlet />
          </div>
        </main>
      </Sidebar>
      <ConfirmDialog />
    </>
  );
};

export default LeaveLayout;
