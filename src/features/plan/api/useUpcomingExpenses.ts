import type { PlannedExpense } from '../model/plannedExpense';
import { usePlannedExpenses } from './usePlannedExpenses';

export type UpcomingExpense = Pick<PlannedExpense, 'id' | 'memo' | 'amount'>;

const selectUpcoming = (items: PlannedExpense[]): UpcomingExpense[] =>
  items.filter((item) => !item.done);

/* 아직 지출하지 않은 예정 지출 → 계획 화면과 캐시 공유 */
export function useUpcomingExpenses() {
  return usePlannedExpenses(selectUpcoming);
}
