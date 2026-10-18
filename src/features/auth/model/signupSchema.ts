import { z } from 'zod';
import { nicknameRule, passwordRule } from './fieldRules';

/* 회원가입 폼 검증 규칙 */
export const signupSchema = z
  .object({
    nickname: nicknameRule,
    email: z.string().trim().pipe(z.email('이메일 형식이 올바르지 않아요.')),
    password: passwordRule,
    passwordConfirm: z.string(),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않아요.',
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
