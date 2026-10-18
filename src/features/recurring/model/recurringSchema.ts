import { z } from 'zod';
import { EXPENSE_CATEGORIES, TRANSACTION_TYPES } from '@/features/transaction/model/category';

/* 반복 거래 폼 검증 규칙 */
export const recurringSchema = z
  .object({
    type: z.enum(TRANSACTION_TYPES),
    amount: z.string().min(1, '금액을 입력해 주세요.'),
    category: z.enum(EXPENSE_CATEGORIES).nullable(),
    dayOfMonth: z.number().int().min(1).max(31),
    memo: z.string().trim().max(50, '메모는 50자까지 쓸 수 있어요.'),
  })
  .refine((v) => v.type !== 'expense' || v.category !== null, {
    message: '카테고리를 골라 주세요.',
    path: ['category'],
  });

export type RecurringFormValues = z.infer<typeof recurringSchema>;
