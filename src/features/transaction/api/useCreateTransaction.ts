import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';
import type { ExpenseCategory, TransactionType } from '../model/category';
import { transactionKeys } from './transactionKeys';

type CreateTransactionParams = {
  type: TransactionType;
  category: ExpenseCategory | null;
  amount: number;
  memo: string;
  occurredOn: string;
};

async function createTransaction({ occurredOn, ...params }: CreateTransactionParams) {
  const { error } = await supabase
    .from('transactions')
    .insert({ ...params, occurred_on: occurredOn });

  if (error) throw error;
}

/* 수입·지출·이체 기록 저장 */
export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: transactionKeys.all }),
  });
}
