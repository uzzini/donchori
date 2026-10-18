import type { CategoryKey, ExpenseCategory, TransactionType } from './category';

export type Transaction = {
  id: string;
  type: TransactionType;
  category: ExpenseCategory | null;
  amount: number;
  memo: string;
  occurredOn: string;
};

// transactions 테이블 행
export type TransactionRow = {
  id: string;
  type: TransactionType;
  category: ExpenseCategory | null;
  amount: number;
  memo: string;
  occurred_on: string;
};

export const toTransaction = (row: TransactionRow): Transaction => ({
  id: row.id,
  type: row.type,
  category: row.category,
  amount: row.amount,
  memo: row.memo,
  occurredOn: row.occurred_on,
});

/* 아이콘·라벨로 쓸 분류: 지출은 카테고리, 수입·이체는 유형 */
export const categoryKeyOf = (t: Pick<Transaction, 'type' | 'category'>): CategoryKey =>
  t.type === 'expense' ? (t.category ?? 'etc') : t.type;
