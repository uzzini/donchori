import { useMutation } from '@tanstack/react-query';
import { AuthError } from '@supabase/supabase-js';
import { supabase } from '@/shared/lib/supabase';
import { useAuthStore } from '@/stores/useAuthStore';

type ChangePasswordParams = {
  currentPassword: string;
  password: string;
};

/* 비밀번호 변경 (현재 비밀번호 먼저 확인) */
export function useChangePassword() {
  const email = useAuthStore((s) => s.session?.user.email);

  return useMutation({
    mutationFn: async ({ currentPassword, password }: ChangePasswordParams) => {
      if (!email) throw new AuthError('Auth session missing', 400, 'session_not_found');

      // updateUser는 현재 비밀번호를 묻지 않아서, 같은 계정으로 다시 로그인해 확인
      const verified = await supabase.auth.signInWithPassword({ email, password: currentPassword });
      if (verified.error) throw verified.error;

      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
    },
  });
}
