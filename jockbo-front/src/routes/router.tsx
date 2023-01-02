import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import ErrorPage from '../pages/ErrorPage';
import SearchPage from '../pages/SearchPage';
import TotalPage from '../pages/TotalPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/total',
        element: <TotalPage />,
      },
      // {
      //   path: 'search/:userId',
      //   element: <SearchPage />,
      // },
      // {
      //   path: 'search/:userId',
      //   element: <SearchPage />,
      // },
    ],
  },
]);
