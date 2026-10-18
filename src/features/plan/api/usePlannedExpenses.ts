import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { toMonthKey } from '@/shared/lib/month';
import { supabase } from '@/shared/lib/supabase';
import type { PlannedExpense } from '../model/plannedExpense';
import { plannedKeys } from './plannedKeys';

async function fetchPlannedExpenses(monthKey: string) {
  const monthStart = dayjs(`${monthKey}-01`).toISOString();
  const { data, error } = await supabase
    .from('planned_expenses')
    .select('id, memo, amount, done')
    .or(`done.eq.false,done_at.gte.${monthStart}`)
    .order('done_at', { ascending: false, nullsFirst: true })
    .order('created_at', { ascending: false })
    .returns<PlannedExpense[]>();

  if (error) throw error;

  return data;
}

/* 예정 지출: 남은 것 전부 + 이번 달에 완료한 것 */
export function usePlannedExpenses<T = PlannedExpense[]>(select?: (items: PlannedExpense[]) => T) {
  const monthKey = toMonthKey(dayjs());

  return useQuery({
    queryKey: plannedKeys.month(monthKey),
    queryFn: () => fetchPlannedExpenses(monthKey),
    select,
  });
}
