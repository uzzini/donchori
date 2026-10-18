import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';
import { plannedKeys } from './plannedKeys';

type CreatePlannedExpenseParams = {
  memo: string;
  amount: number;
};

async function createPlannedExpense(params: CreatePlannedExpenseParams) {
  const { error } = await supabase.from('planned_expenses').insert(params);

  if (error) throw error;
}

/* 예정 지출 추가 */
export function useCreatePlannedExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlannedExpense,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: plannedKeys.all }),
  });
}
