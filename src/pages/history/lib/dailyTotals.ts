import type { Transaction } from '@/features/transaction/model/transaction';

export type DayTotal = { income: number; expense: number; count: number };

/* 날짜별 수입·지출 합계 (이체는 합계 제외) */
export function sumByDay(transactions: Transaction[]) {
  const totals = new Map<string, DayTotal>();
  for (const t of transactions) {
    const day = totals.get(t.occurredOn) ?? { income: 0, expense: 0, count: 0 };
    if (t.type === 'income') day.income += t.amount;
    if (t.type === 'expense') day.expense += t.amount;
    day.count += 1;
    totals.set(t.occurredOn, day);
  }
  return totals;
}

/* 그 달 하루 최대 지출 대비 단계 0~4 */
export function heatLevel(expense: number, max: number) {
  if (expense <= 0 || max <= 0) return 0;
  const ratio = expense / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}
