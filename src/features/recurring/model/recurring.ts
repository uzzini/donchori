import {
  CATEGORY_META,
  type ExpenseCategory,
  type TransactionType,
} from '@/features/transaction/model/category';
import { categoryKeyOf } from '@/features/transaction/model/transaction';

export type RecurringTransaction = {
  id: string;
  type: TransactionType;
  category: ExpenseCategory | null;
  amount: number;
  memo: string;
  dayOfMonth: number; // 매달 반복일
};

// recurring_transactions 테이블 행
export type RecurringTransactionRow = {
  id: string;
  type: TransactionType;
  category: ExpenseCategory | null;
  amount: number;
  memo: string;
  day_of_month: number;
};

export const toRecurringTransaction = (row: RecurringTransactionRow): RecurringTransaction => ({
  id: row.id,
  type: row.type,
  category: row.category,
  amount: row.amount,
  memo: row.memo,
  dayOfMonth: row.day_of_month,
});

// 저장할 때 보내는 값 (id 제외)
export type RecurringTransactionInput = Omit<RecurringTransaction, 'id'>;

export const toRecurringTransactionRow = ({ dayOfMonth, ...input }: RecurringTransactionInput) => ({
  ...input,
  day_of_month: dayOfMonth,
});

/* 안내 문구용 이름 */
export const recurringName = (
  item: Pick<RecurringTransaction, 'type' | 'category' | 'memo' | 'dayOfMonth'>,
) => `매달 ${item.dayOfMonth}일 ${item.memo || CATEGORY_META[categoryKeyOf(item)].label}`;
