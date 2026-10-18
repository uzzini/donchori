import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { supabase } from '@/shared/lib/supabase';

export type UpcomingExpense = {
  id: string;
  memo: string;
  amount: number;
  dueDate: string;
};

async function fetchUpcomingExpenses() {
  const today = dayjs();
  const { data, error } = await supabase
    .from('planned_expenses')
    .select('id, memo, amount, due_date')
    .gte('due_date', today.format('YYYY-MM-DD'))
    .lte('due_date', today.endOf('month').format('YYYY-MM-DD'))
    .order('due_date')
    .returns<{ id: string; memo: string; amount: number; due_date: string }[]>();

  if (error) throw error;

  return data.map((row): UpcomingExpense => ({
    id: row.id,
    memo: row.memo,
    amount: row.amount,
    dueDate: row.due_date,
  }));
}

/* 이번 달 남은 예정 지출 (오늘 포함 ~ 말일, 날짜순) */
export function useUpcomingExpenses({ enabled }: { enabled: boolean }) {
  return useQuery({
    queryKey: ['planned-expenses', 'upcoming', dayjs().format('YYYY-MM-DD')],
    queryFn: fetchUpcomingExpenses,
    enabled,
  });
}
