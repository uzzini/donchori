import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';
import { recurringKeys } from './recurringKeys';

async function deleteRecurring(id: string) {
  const { error } = await supabase.from('recurring_transactions').delete().eq('id', id);

  if (error) throw error;
}

/* 반복 거래 삭제 */
export function useDeleteRecurring() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecurring,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: recurringKeys.all }),
  });
}
