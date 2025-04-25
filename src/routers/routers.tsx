import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

// Constants
import {
  ADMIN_PAGE,
  AUTHENTICATION_PAGE,
  RoleAuthentication,
  USER_PAGE,
} from '@/constants';

// Routers
import { AuthorizeRoute } from './authorizeRoute';
import { DynamicAuthorizeRoute } from './dynamicAuthorizeRoute';

// Lazy Layout
const AdminLayout = lazy(() => import('@/layouts/AdminLayout'));
const LeaveLayout = lazy(() => import('@/layouts/LeaveLayout'));
const UserLayout = lazy(() => import('@/layouts/UserLayout'));

// Lazy Pages
const ActivateAccount = lazy(() => import('@/pages/ActivateAccount'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
const LeaveApplication = lazy(() => import('@/pages/LeaveApplication'));
const AdminSignIn = lazy(() => import('@/pages/AdminSignIn'));
const UpdateProfile = lazy(() => import('@/pages/UpdateProfile'));
const UserDashboard = lazy(() => import('@/pages/UserDashboard'));
const UserSignIn = lazy(() => import('@/pages/UserSignIn'));
const UserSignUp = lazy(() => import('@/pages/UserSignUp'));
const LeaveRequest = lazy(() => import('@/pages/LeaveRequest'));
const AdminLeave = lazy(() => import('@/pages/AdminLeave'));
const LeaveHistory = lazy(() => import('@/pages/LeaveHistory'));
const AdminLeaveRecall = lazy(() => import('@/pages/AdminLeaveRecall'));
const LeaveRecall = lazy(() => import('@/pages/LeaveRecall'));
const InternalServerError = lazy(() => import('@/pages/InternalServerError'));

export const AUTH_ROUTES: RouteObject[] = [
  { path: AUTHENTICATION_PAGE.USER_SIGN_IN, element: <UserSignIn /> },
  { path: AUTHENTICATION_PAGE.ADMIN_SIGN_IN, element: <AdminSignIn /> },
  { path: AUTHENTICATION_PAGE.SIGN_UP, element: <UserSignUp /> },
  { path: AUTHENTICATION_PAGE.ACTIVATE, element: <ActivateAccount /> },
];

export const USER_ROUTES: RouteObject[] = [
  {
    path: USER_PAGE.ROOT,
    element: <DynamicAuthorizeRoute />,
    errorElement: <InternalServerError path={USER_PAGE.DASHBOARD} />,
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
    errorElement: <InternalServerError path={ADMIN_PAGE.DASHBOARD} />,
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
