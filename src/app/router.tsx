import { createBrowserRouter } from 'react-router';
import App from '@/app/App';
import LoginPage from '@/pages/login/LoginPage';

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <LoginPage /> },
]);
