import { categoryKeyOf, type Transaction } from '@/features/transaction/model/transaction';
import type { CategoryFilter } from '@/features/transaction/ui/CategoryFilterChips';

export type SearchQuery = {
  q: string;
  from: string;
  to: string;
  category: CategoryFilter;
};

/* 기간·메모·카테고리로 거르고 최신순 정렬 */
export function searchTransactions(
  transactions: Transaction[],
  { q, from, to, category }: SearchQuery,
) {
  const keyword = q.trim().toLowerCase();
  return transactions
    .filter(
      (t) =>
        t.occurredOn >= from &&
        t.occurredOn <= to &&
        t.memo.toLowerCase().includes(keyword) &&
        (category === 'all' || categoryKeyOf(t) === category),
    )
    .sort((a, b) => b.occurredOn.localeCompare(a.occurredOn));
}
