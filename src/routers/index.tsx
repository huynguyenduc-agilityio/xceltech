import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import {
  ADMIN_ROUTES,
  AUTH_ROUTES,
  DEFAULT_ROUTE,
  USER_ROUTES,
} from './routers';

const NotFound = lazy(() => import('@/pages/NotFound'));

export const router = createBrowserRouter([
  DEFAULT_ROUTE,
  ...AUTH_ROUTES,
  ...USER_ROUTES,
  ...ADMIN_ROUTES,
  {
    path: '*',
    element: <NotFound />,
  },
]);
