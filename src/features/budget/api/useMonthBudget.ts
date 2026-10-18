import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';
import { budgetKeys } from './budgetKeys';

async function fetchMonthBudget(monthKey: string) {
  const { data, error } = await supabase
    .from('budgets')
    .select('amount')
    .eq('month', `${monthKey}-01`)
    .maybeSingle<{ amount: number }>();

  if (error) throw error;

  return data?.amount ?? null;
}

/* 월 예산 금액 */
export function useMonthBudget(monthKey: string) {
  return useQuery({
    queryKey: budgetKeys.month(monthKey),
    queryFn: () => fetchMonthBudget(monthKey),
    placeholderData: keepPreviousData,
  });
}
