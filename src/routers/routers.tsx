import { Navigate, RouteObject } from 'react-router-dom';

// Constants
import {
  ADMIN_PAGE,
  AUTHENTICATION_PAGE,
  RoleAuthentication,
  USER_PAGE,
} from '@/constants';

// Layouts
import { AdminLayout, LeaveLayout, UserLayout } from '@/layouts';

// Pages
import {
  ActivateAccount,
  AdminDashboard,
  LeaveApplication,
  AdminSignIn,
  UpdateProfile,
  UserDashboard,
  UserSignIn,
  UserSignUp,
  LeaveRequest,
  AdminLeave,
  LeaveHistory,
  AdminLeaveRecall,
  LeaveRecall,
} from '@/pages';

// Component
import { AuthorizeRoute } from './components/authorizeRoute';

export const AUTH_ROUTES: RouteObject[] = [
  { path: AUTHENTICATION_PAGE.USER_SIGN_IN, element: <UserSignIn /> },
  { path: AUTHENTICATION_PAGE.ADMIN_SIGN_IN, element: <AdminSignIn /> },
  { path: AUTHENTICATION_PAGE.SIGN_UP, element: <UserSignUp /> },
  { path: AUTHENTICATION_PAGE.ACTIVATE, element: <ActivateAccount /> },
];

export const USER_ROUTES: RouteObject[] = [
  {
    path: USER_PAGE.ROOT,
    element: (
      <AuthorizeRoute
        redirectPath={AUTHENTICATION_PAGE.USER_SIGN_IN}
        allowedRoles={
          RoleAuthentication.Employee || RoleAuthentication.Candidate
        }
      />
    ),
    children: [
      {
        path: USER_PAGE.ROOT,
        element: <UserLayout />,
        children: [
          { path: USER_PAGE.DASHBOARD, element: <UserDashboard /> },
          { path: USER_PAGE.PROFILE_EDIT, element: <UpdateProfile /> },
          { path: USER_PAGE.LEAVE, element: <LeaveApplication /> },
          { path: `${USER_PAGE.LEAVE}/:param`, element: <LeaveRequest /> },
          { path: `${USER_PAGE.LEAVE}/:param/:id`, element: <LeaveRequest /> },
          { path: `${USER_PAGE.LEAVE_RECALL}/:id`, element: <LeaveRecall /> },
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
        allowedRoles={RoleAuthentication.Admin}
      />
    ),
    children: [
      {
        path: ADMIN_PAGE.ROOT,
        element: <AdminLayout />,
        children: [{ path: ADMIN_PAGE.DASHBOARD, element: <AdminDashboard /> }],
      },
      {
        path: ADMIN_PAGE.ROOT,
        element: <LeaveLayout />,
        children: [
          { path: ADMIN_PAGE.LEAVE_MANAGEMENT, element: <AdminLeave /> },
          { path: ADMIN_PAGE.LEAVE_HISTORY, element: <LeaveHistory /> },
          { path: ADMIN_PAGE.LEAVE_RECALL, element: <AdminLeaveRecall /> },
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
