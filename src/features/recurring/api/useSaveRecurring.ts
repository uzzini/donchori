import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';
import { toRecurringTransactionRow, type RecurringTransactionInput } from '../model/recurring';
import { recurringKeys } from './recurringKeys';

type SaveRecurringParams = RecurringTransactionInput & {
  id?: string;
};

async function saveRecurring({ id, ...input }: SaveRecurringParams) {
  const row = toRecurringTransactionRow(input);
  const { error } = id
    ? await supabase
        .from('recurring_transactions')
        .update({ ...row, updated_at: new Date().toISOString() })
        .eq('id', id)
    : await supabase.from('recurring_transactions').insert(row);

  if (error) throw error;
}

/* 반복 거래 등록·수정 */
export function useSaveRecurring() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveRecurring,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: recurringKeys.all }),
  });
}
