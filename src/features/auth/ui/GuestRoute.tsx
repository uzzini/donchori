import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/stores/useAuthStore';

/* 로그인 전에 보이는 화면(로그인·회원가입), 세션이 있으면 메인 이동 */
export default function GuestRoute() {
  const session = useAuthStore((s) => s.session);
  const initialized = useAuthStore((s) => s.initialized);

  if (!initialized) return null;
  if (session) return <Navigate to="/" replace />;

  return <Outlet />;
}
