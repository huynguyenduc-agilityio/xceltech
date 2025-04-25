import { Navigate, Outlet } from 'react-router-dom';

// Stores
import { useUser } from '@/stores';

// Constants
import { RoleAuthentication } from '@/constants';

interface AuthorizeRouteProps {
  redirectPath: string;
  allowedRoles?: RoleAuthentication;
}

export const AuthorizeRoute = ({
  redirectPath,
  allowedRoles,
}: AuthorizeRouteProps) => {
  const authUser = useUser();

  if (!authUser) {
    return <Navigate to={redirectPath} replace />;
  }

  if (allowedRoles !== authUser.user.role && authUser.user.id) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
