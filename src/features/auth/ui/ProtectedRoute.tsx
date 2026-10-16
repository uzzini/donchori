import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/stores/useAuthStore';

/* 로그인해야 들어갈 수 있는 화면, 세션이 없으면 로그인 화면 이동 */
export default function ProtectedRoute() {
  const session = useAuthStore((s) => s.session);
  const initialized = useAuthStore((s) => s.initialized);

  // 저장된 세션을 복원하는 동안엔 로그인 화면이 깜빡이지 않게 비워 둠
  if (!initialized) return null;
  if (!session) return <Navigate to="/login" replace />;

  return <Outlet />;
}
