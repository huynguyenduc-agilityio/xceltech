import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

// Components
import { Navbar } from '@/components';

const ConfirmDialog = lazy(() => import('@/components/ConfirmDialog'));

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-14 bg-blue-light">
        <Outlet />
      </main>
      <ConfirmDialog />
    </>
  );
};

export default UserLayout;
