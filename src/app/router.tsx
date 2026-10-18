import { createBrowserRouter } from 'react-router';
import AppLayout from '@/app/AppLayout';
import GuestRoute from '@/features/auth/ui/GuestRoute';
import ProtectedRoute from '@/features/auth/ui/ProtectedRoute';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import NotFoundPage from '@/pages/not-found/NotFoundPage';
import PlanPage from '@/pages/plan/PlanPage';
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
          // todo: 내역·설정 화면 만들면 준비 중 화면 교체
          { path: '/history', element: <NotFoundPage variant="preparing" title="내역" /> },
          { path: '/plan', element: <PlanPage /> },
          { path: '/settings', element: <NotFoundPage variant="preparing" title="설정" /> },
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
