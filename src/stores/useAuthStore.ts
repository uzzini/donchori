import type { Session } from '@supabase/supabase-js';
import { create } from 'zustand';

type AuthState = {
  session: Session | null;
  initialized: boolean;
  setSession: (session: Session | null) => void;
};

/**
 * 로그인 세션 상태
 * 세션 자체는 Supabase가 localStorage에 저장·갱신하고, 여기선 AuthSync가 받아 온 값만 들고 있음
 */
export const useAuthStore = create<AuthState>()((set) => ({
  session: null,
  initialized: false,
  setSession: (session) => set({ session, initialized: true }),
}));
