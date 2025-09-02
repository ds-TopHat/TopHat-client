import { createBrowserRouter } from 'react-router-dom';
import Error from '@pages/error/Error';

import GlobalLayout from './Layout';
import { routePath } from './routePath';
import { protectedRoutes, publicRoutes } from './globalRoutes';
import { ProtectedRoute } from './protectedRoute';

export const router = createBrowserRouter([
  {
    path: routePath.HOME,
    element: <GlobalLayout />,
    children: [
      ...publicRoutes,
      {
        element: <ProtectedRoute />,
        children: protectedRoutes,
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
]);
