import type { ExpenseCategory, TransactionType } from '@/features/transaction/model/category';

export type RecurringTransaction = {
  id: string;
  type: TransactionType;
  category: ExpenseCategory | null;
  amount: number;
  memo: string;
  dayOfMonth: number; // 매달 반복일
};
