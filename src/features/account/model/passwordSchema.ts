import { z } from 'zod';
import { passwordRule } from '@/features/auth/model/fieldRules';

/* 비밀번호 변경 폼 검증 규칙 */
export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, '현재 비밀번호를 입력해 주세요.'),
    password: passwordRule,
    passwordConfirm: z.string(),
  })
  .refine((values) => values.password !== values.currentPassword, {
    path: ['password'],
    message: '현재 비밀번호와 다른 비밀번호를 입력해 주세요.',
  })
  .refine((values) => values.password === values.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않아요.',
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;
