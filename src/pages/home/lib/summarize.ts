import dayjs from 'dayjs';
import type { ExpenseCategory } from '@/features/transaction/model/category';
import type { Transaction } from '@/features/transaction/model/transaction';
import { WEEKDAYS } from '@/shared/lib/weekday';

export type RecentGroup = { label: string; items: Transaction[] };

/* 총 수입 / 총 지출 (이체는 제외) */
export function sumByType(transactions: Transaction[]) {
  let income = 0;
  let expense = 0;
  for (const t of transactions) {
    if (t.type === 'income') income += t.amount;
    if (t.type === 'expense') expense += t.amount;
  }
  return { income, expense };
}

/* 카테고리별 지출 합계: 금액 내림차순 */
export function sumByCategory(transactions: Transaction[]) {
  const totals = new Map<ExpenseCategory, number>();
  for (const t of transactions) {
    if (t.type !== 'expense' || !t.category) continue;
    totals.set(t.category, (totals.get(t.category) ?? 0) + t.amount);
  }
  return [...totals]
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
}

/* 날짜 → '오늘' / '어제' / 'M월 D일 ( )' */
export const dayLabel = (date: dayjs.Dayjs) => {
  const today = dayjs();
  if (date.isSame(today, 'day')) return '오늘';
  if (date.isSame(today.subtract(1, 'day'), 'day')) return '어제';
  return `${date.format('M월 D일')} (${WEEKDAYS[date.day()]})`;
};

/* 최신 거래 limit건을 날짜별로 묶음 */
export function groupRecent(transactions: Transaction[], limit: number): RecentGroup[] {
  const groups: (RecentGroup & { key: string })[] = [];
  for (const t of transactions.slice(0, limit)) {
    const last = groups.at(-1);
    if (last?.key === t.occurredOn) last.items.push(t);
    else groups.push({ key: t.occurredOn, label: dayLabel(dayjs(t.occurredOn)), items: [t] });
  }
  return groups;
}
