import { z } from 'zod';
import { EXPENSE_CATEGORIES, TRANSACTION_TYPES } from './category';

/* 기록 폼 검증 규칙 */
export const recordSchema = z
  .object({
    type: z.enum(TRANSACTION_TYPES),
    amount: z.string().min(1, '금액을 입력해 주세요.'),
    category: z.enum(EXPENSE_CATEGORIES).nullable(),
    date: z.string(),
    memo: z.string().trim().max(50, '메모는 50자까지 쓸 수 있어요.'),
  })
  .refine((v) => v.type !== 'expense' || v.category !== null, {
    message: '카테고리를 골라 주세요.',
    path: ['category'],
  });

export type RecordFormValues = z.infer<typeof recordSchema>;
