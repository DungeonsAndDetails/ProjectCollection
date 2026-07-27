import { createBrowserRouter } from 'react-router-dom';
import ShellLayout from './layouts/ShellLayout';
import HomePage from '../pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ShellLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);
