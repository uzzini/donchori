import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';
import Toast from '@/shared/ui/Toast/Toast';
import { useAuthStore } from '@/stores/useAuthStore';
import { useThemeStore, type ResolvedTheme } from '@/stores/useThemeStore';

const DARK_QUERY = '(prefers-color-scheme: dark)';
// iOS 상태바 색 = 페이지 배경색 (tokens.css의 --bg) 맞춤
const THEME_COLOR: Record<ResolvedTheme, string> = { light: '#faf8f2', dark: '#171513' };

function ThemeSync() {
  const theme = useThemeStore((s) => s.theme);
  const setResolvedTheme = useThemeStore((s) => s.setResolvedTheme);

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY);

    const apply = () => {
      const resolved: ResolvedTheme =
        theme === 'system' ? (media.matches ? 'dark' : 'light') : theme;
      document.documentElement.dataset.theme = resolved;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', THEME_COLOR[resolved]);
      setResolvedTheme(resolved);
    };

    apply();
    if (theme !== 'system') return;

    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [theme, setResolvedTheme]);

  return null;
}

// Supabase 세션 변화(로그인·로그아웃·토큰 갱신)를 스토어에 반영
function AuthSync() {
  const setSession = useAuthStore((s) => s.setSession);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));

    return () => subscription.unsubscribe();
  }, [setSession]);

  return null;
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeSync />
      <AuthSync />
      {children}
      <Toast />
    </QueryClientProvider>
  );
}
