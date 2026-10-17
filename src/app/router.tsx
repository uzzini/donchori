import { createBrowserRouter } from 'react-router';
import AppLayout from '@/app/AppLayout';
import GuestRoute from '@/features/auth/ui/GuestRoute';
import ProtectedRoute from '@/features/auth/ui/ProtectedRoute';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import SignupPage from '@/pages/signup/SignupPage';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        // todo: 내역·계획·설정 화면 추가
        children: [{ path: '/', element: <HomePage /> }],
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
