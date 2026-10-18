import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getSavedEmail, setSavedEmail } from '@/features/auth/model/savedEmail';
import { supabase } from '@/shared/lib/supabase';
import { useAuthStore } from '@/stores/useAuthStore';

async function deleteAccount() {
  // 계정과 함께 모든 기록이 on delete cascade로 지워짐
  const { error } = await supabase.rpc('delete_account');
  if (error) throw error;

  // 서버 세션은 계정과 함께 사라졌으므로 이 기기의 세션만 정리
  await supabase.auth.signOut({ scope: 'local' });
}

/* 회원 탈퇴 */
export function useDeleteAccount() {
  const queryClient = useQueryClient();
  const email = useAuthStore((s) => s.session?.user.email);

  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.clear();
      // '아이디 저장'으로 남겨 둔 이메일이 탈퇴한 계정이면 지움
      if (email && getSavedEmail() === email) setSavedEmail(null);
    },
  });
}
