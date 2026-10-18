import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/shared/lib/supabase';
import { useAuthStore } from '@/stores/useAuthStore';
import { budgetKeys } from './budgetKeys';

type SaveBudgetParams = {
  monthKey: string;
  amount: number;
};

/* 월 예산 등록·수정 */
export function useSaveBudget() {
  const queryClient = useQueryClient();
  const userId = useAuthStore((s) => s.session?.user.id);

  return useMutation({
    mutationFn: async ({ monthKey, amount }: SaveBudgetParams) => {
      const { error } = await supabase.from('budgets').upsert(
        {
          user_id: userId,
          month: `${monthKey}-01`,
          amount,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,month' },
      );

      if (error) throw error;
    },
    onSuccess: (_data, { monthKey }) =>
      queryClient.invalidateQueries({ queryKey: budgetKeys.month(monthKey) }),
  });
}
