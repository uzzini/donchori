import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';
import { toRecurringTransaction, type RecurringTransactionRow } from '../model/recurring';
import { recurringKeys } from './recurringKeys';

async function fetchRecurringTransactions() {
  const { data, error } = await supabase
    .from('recurring_transactions')
    .select('id, type, category, amount, memo, day_of_month')
    .order('day_of_month')
    .order('created_at')
    .returns<RecurringTransactionRow[]>();

  if (error) throw error;

  return data.map(toRecurringTransaction);
}

/* 반복 거래 전체 (반복일순) */
export function useRecurringTransactions() {
  return useQuery({
    queryKey: recurringKeys.all,
    queryFn: fetchRecurringTransactions,
  });
}
