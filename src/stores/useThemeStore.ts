import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system'; // 사용자가 고른 테마
export type ResolvedTheme = 'light' | 'dark'; // 실제 화면에 적용된 테마

type ThemeState = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  setResolvedTheme: (resolved: ResolvedTheme) => void;
};

// index.html 인라인 스크립트가 이미 data-theme을 light/dark로 넣어 둔 상태에서 시작
const initialResolved: ResolvedTheme =
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

/**
 * 테마 상태
 * 선택값(theme)만 localStorage('donchori-theme')에 저장
 * resolvedTheme는 ThemeSync가 매번 계산
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      resolvedTheme: initialResolved,
      setTheme: (theme) => set({ theme }),
      setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
    }),
    {
      name: 'donchori-theme',
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
