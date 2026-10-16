import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';

async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}

/* 로그아웃 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,
    // 다른 계정으로 로그인했을 때 이전 계정 데이터가 보이지 않도록 캐시 비움
    onSuccess: () => queryClient.clear(),
  });
}
