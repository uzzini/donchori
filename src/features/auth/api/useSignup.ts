import { useMutation } from '@tanstack/react-query';
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
    },
  });

  if (error) throw error;

  return data;
}

/* 회원가입 */
export function useSignup() {
  return useMutation({ mutationFn: signUp });
}
