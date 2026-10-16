import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';
import { setSavedEmail } from '../model/savedEmail';

type LoginParams = {
  email: string;
  password: string;
  rememberEmail: boolean;
};

async function signIn({ email, password }: LoginParams) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw error;

  return data;
}

/* 이메일 로그인 */
export function useLogin() {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (_data, { email, rememberEmail }) => {
      setSavedEmail(rememberEmail ? email : null);
    },
  });
}
