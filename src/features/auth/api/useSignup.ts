import { useMutation } from '@tanstack/react-query';
import { AuthError } from '@supabase/supabase-js';
import { supabase } from '@/shared/lib/supabase';

type SignupParams = {
  nickname: string;
  email: string;
  password: string;
};

async function signUp({ nickname, email, password }: SignupParams) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { nickname },
      emailRedirectTo: `${window.location.origin}/login`,
    },
  });

  if (error) throw error;

  if (data.user?.identities?.length === 0) {
    throw new AuthError('User already registered', 422, 'user_already_exists');
  }

  return data;
}

/* 회원가입 */
export function useSignup() {
  return useMutation({ mutationFn: signUp });
}
