import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';
import type { Transaction } from '../model/transaction';
import { transactionKeys } from './transactionKeys';

type SaveTransactionParams = Omit<Transaction, 'id' | 'recurringId'> & {
  id?: string;
};

async function saveTransaction({ id, occurredOn, ...params }: SaveTransactionParams) {
  const row = { ...params, occurred_on: occurredOn };
  const { error } = id
    ? await supabase.from('transactions').update(row).eq('id', id)
    : await supabase.from('transactions').insert(row);

  if (error) throw error;
}

/* 수입·지출·이체 기록 저장·수정 */
export function useSaveTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveTransaction,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: transactionKeys.all }),
  });
}
