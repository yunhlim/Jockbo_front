import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import ErrorPage from './pages/ErrorPage';
import SearchPage from './pages/SearchPage';
import TotalPage from './pages/TotalPage';

const router = createBrowserRouter([
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
