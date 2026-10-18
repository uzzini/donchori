import { createBrowserRouter } from 'react-router';
import AppLayout from '@/app/AppLayout';
import GuestRoute from '@/features/auth/ui/GuestRoute';
import ProtectedRoute from '@/features/auth/ui/ProtectedRoute';
import HistoryPage from '@/pages/history/HistoryPage';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import NotFoundPage from '@/pages/not-found/NotFoundPage';
import PlanPage from '@/pages/plan/PlanPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import SignupPage from '@/pages/signup/SignupPage';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        errorElement: <NotFoundPage layout="standalone" />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/history', element: <HistoryPage /> },
          { path: '/plan', element: <PlanPage /> },
          { path: '/settings', element: <SettingsPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
  {
    element: <GuestRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
    ],
  },
]);
