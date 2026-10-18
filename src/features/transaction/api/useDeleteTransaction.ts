import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';
import { transactionKeys } from './transactionKeys';

async function deleteTransaction(id: string) {
  const { error } = await supabase.from('transactions').delete().eq('id', id);

  if (error) throw error;
}

/* 거래 기록 삭제 */
export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: transactionKeys.all }),
  });
}
