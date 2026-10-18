import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';
import type { PlannedExpense } from '../model/plannedExpense';
import { plannedKeys } from './plannedKeys';

type TogglePlannedExpenseParams = {
  id: string;
  done: boolean;
};

async function togglePlannedExpense({ id, done }: TogglePlannedExpenseParams) {
  const { error } = await supabase
    .from('planned_expenses')
    .update({ done, done_at: done ? new Date().toISOString() : null })
    .eq('id', id);

  if (error) throw error;
}

/* 예정 지출 완료 체크·해제 */
export function useTogglePlannedExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePlannedExpense,
    onMutate: async ({ id, done }) => {
      await queryClient.cancelQueries({ queryKey: plannedKeys.all });
      const previous = queryClient.getQueriesData<PlannedExpense[]>({ queryKey: plannedKeys.all });
      queryClient.setQueriesData<PlannedExpense[]>({ queryKey: plannedKeys.all }, (items) =>
        items?.map((item) => (item.id === id ? { ...item, done } : item)),
      );
      return { previous };
    },
    onError: (_error, _params, context) =>
      context?.previous.forEach(([key, data]) => queryClient.setQueryData(key, data)),
    onSettled: () => queryClient.invalidateQueries({ queryKey: plannedKeys.all }),
  });
}
