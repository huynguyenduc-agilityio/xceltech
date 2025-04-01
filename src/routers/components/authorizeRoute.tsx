import { Navigate, Outlet } from 'react-router-dom';

// Stores
import { useUser } from '@/stores';

interface AuthorizeRouteProps {
  redirectPath: string;
  allowedRoles?: 'admin' | 'user';
}

export const AuthorizeRoute = ({
  redirectPath,
  allowedRoles,
}: AuthorizeRouteProps) => {
  const authUser = useUser();

  if (!authUser) {
    return <Navigate to={redirectPath} replace />;
  }

  if (allowedRoles && authUser.user.id) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
