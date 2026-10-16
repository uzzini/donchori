import { createBrowserRouter } from 'react-router';
import App from '@/app/App';
import GuestRoute from '@/features/auth/ui/GuestRoute';
import ProtectedRoute from '@/features/auth/ui/ProtectedRoute';
import LoginPage from '@/pages/login/LoginPage';
import SignupPage from '@/pages/signup/SignupPage';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [{ path: '/', element: <App /> }],
  },
  {
    element: <GuestRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
    ],
  },
]);
