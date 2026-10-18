import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';
import { toTransaction, type TransactionRow } from '../model/transaction';
import { transactionKeys } from './transactionKeys';

async function fetchPeriodTransactions(from: string, to: string) {
  const { data, error } = await supabase
    .from('transactions')
    .select('id, type, category, amount, memo, occurred_on')
    .gte('occurred_on', from)
    .lte('occurred_on', to)
    .order('occurred_on', { ascending: false })
    .order('created_at', { ascending: false })
    .returns<TransactionRow[]>();

  if (error) throw error;

  return data.map(toTransaction);
}

/* 기간 [from, to] 거래 기록 (최신순) */
export function usePeriodTransactions(from: string, to: string) {
  return useQuery({
    queryKey: transactionKeys.period(from, to),
    queryFn: () => fetchPeriodTransactions(from, to),
    placeholderData: keepPreviousData, // 기간을 바꾸는 동안 이전 결과 잠깐 유지
  });
}
