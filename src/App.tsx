import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

// Routers
import { router } from '@/routers';

// Components
import { Fallback, Toast } from './components';

import './global.css';

const App = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <RouterProvider router={router} />
      <Toast />
    </Suspense>
  );
};

export default App;
