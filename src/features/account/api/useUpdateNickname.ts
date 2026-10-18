import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';

async function updateNickname(nickname: string) {
  // 성공하면 AuthSync가 USER_UPDATED 세션을 받아 화면에 바로 반영
  const { error } = await supabase.auth.updateUser({ data: { nickname } });

  if (error) throw error;
}

/* 닉네임 변경 */
export function useUpdateNickname() {
  return useMutation({ mutationFn: updateNickname });
}
