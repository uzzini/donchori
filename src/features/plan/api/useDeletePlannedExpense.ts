import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';
import type { PlannedExpense } from '../model/plannedExpense';
import { plannedKeys } from './plannedKeys';

async function deletePlannedExpense(id: string) {
  const { error } = await supabase.from('planned_expenses').delete().eq('id', id);

  if (error) throw error;
}

/* 예정 지출 삭제 */
export function useDeletePlannedExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlannedExpense,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: plannedKeys.all });
      const previous = queryClient.getQueriesData<PlannedExpense[]>({ queryKey: plannedKeys.all });
      queryClient.setQueriesData<PlannedExpense[]>({ queryKey: plannedKeys.all }, (items) =>
        items?.filter((item) => item.id !== id),
      );
      return { previous };
    },
    onError: (_error, _id, context) =>
      context?.previous.forEach(([key, data]) => queryClient.setQueryData(key, data)),
    onSettled: () => queryClient.invalidateQueries({ queryKey: plannedKeys.all }),
  });
}
