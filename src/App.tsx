import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

// Routers
import { router } from '@/routers';

// Components
import { Fallback, Toast } from './components';

import './global.css';

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Fallback />
        </div>
      }
    >
      <RouterProvider router={router} />
      <Toast />
    </Suspense>
  );
};

export default App;
