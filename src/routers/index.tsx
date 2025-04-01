import { createBrowserRouter } from 'react-router-dom';

// Pages
import { NotFound } from '@/pages';

import {
  ADMIN_ROUTES,
  AUTH_ROUTES,
  DEFAULT_ROUTE,
  USER_ROUTES,
} from './routers';

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
