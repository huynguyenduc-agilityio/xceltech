import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

// Components
import { Sidebar } from '@/components';
import HeaderLayout from './header';

const ConfirmDialog = lazy(() => import('@/components/ConfirmDialog'));

const AdminLayout = () => {
  return (
    <>
      <Sidebar>
        <main className="w-full ml-[359px] overflow-hidden bg-blue-light">
          <HeaderLayout />
          <div className="flex flex-col flex-1">
            <Outlet />
          </div>
        </main>
      </Sidebar>
      <ConfirmDialog />;
    </>
  );
};

export default AdminLayout;
