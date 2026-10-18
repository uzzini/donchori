import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { monthRange } from '@/shared/lib/month';
import { supabase } from '@/shared/lib/supabase';
import { toTransaction, type TransactionRow } from '../model/transaction';
import { transactionKeys } from './transactionKeys';

async function fetchMonthTransactions(monthKey: string) {
  const { from, to } = monthRange(monthKey);
  const { data, error } = await supabase
    .from('transactions')
    .select('id, type, category, amount, memo, occurred_on')
    .gte('occurred_on', from)
    .lt('occurred_on', to)
    .order('occurred_on', { ascending: false })
    .order('created_at', { ascending: false })
    .returns<TransactionRow[]>();

  if (error) throw error;

  return data.map(toTransaction);
}

/* 한 달치 거래 기록 (최신순) */
export function useMonthTransactions(monthKey: string) {
  return useQuery({
    queryKey: transactionKeys.month(monthKey),
    queryFn: () => fetchMonthTransactions(monthKey),
    placeholderData: keepPreviousData, // 월 이동 중엔 이전 달 화면 잠깐 유지
  });
}
