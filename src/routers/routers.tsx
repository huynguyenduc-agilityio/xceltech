import { Navigate, RouteObject } from 'react-router-dom';

// Constants
import { ADMIN_PAGE, AUTHENTICATION_PAGE, USER_PAGE } from '@/constants';

// Layouts
import { AdminLayout, UserLayout } from '@/layouts';

// Pages
import {
  ActivateAccount,
  UpdateProfile,
  UserDashboard,
  UserSignIn,
  UserSignUp,
} from '@/pages';

// Component
import { AuthorizeRoute } from './components/authorizeRoute';

export const AUTH_ROUTES: RouteObject[] = [
  { path: AUTHENTICATION_PAGE.USER_SIGN_IN, element: <UserSignIn /> },
  { path: AUTHENTICATION_PAGE.ADMIN_SIGN_IN, element: <></> },
  { path: AUTHENTICATION_PAGE.SIGN_UP, element: <UserSignUp /> },
  { path: AUTHENTICATION_PAGE.ACTIVATE, element: <ActivateAccount /> },
];

export const USER_ROUTES: RouteObject[] = [
  {
    path: USER_PAGE.ROOT,
    element: <AuthorizeRoute redirectPath={AUTHENTICATION_PAGE.USER_SIGN_IN} />,
    children: [
      {
        path: USER_PAGE.ROOT,
        element: <UserLayout />,
        children: [
          { path: USER_PAGE.DASHBOARD, element: <UserDashboard /> },
          { path: USER_PAGE.PROFILE_EDIT, element: <UpdateProfile /> },
        ],
      },
    ],
  },
];

export const ADMIN_ROUTES: RouteObject[] = [
  {
    path: ADMIN_PAGE.ROOT,
    element: (
      <AuthorizeRoute
        redirectPath={AUTHENTICATION_PAGE.ADMIN_SIGN_IN}
        allowedRoles="admin"
      />
    ),
    children: [
      {
        path: ADMIN_PAGE.ROOT,
        element: <AdminLayout />,
        children: [
          { path: ADMIN_PAGE.DASHBOARD, element: <></> },
          { path: ADMIN_PAGE.LEAVE_MANAGEMENT, element: <></> },
        ],
      },
    ],
  },
];

export const DEFAULT_ROUTE: RouteObject = {
  path: '/',
  element: <AuthorizeRoute redirectPath={AUTHENTICATION_PAGE.USER_SIGN_IN} />,
  children: [
    { path: '/', element: <Navigate to={USER_PAGE.DASHBOARD} replace /> },
  ],
};
