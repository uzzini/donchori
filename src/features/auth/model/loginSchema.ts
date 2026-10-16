import { z } from 'zod';

/* 로그인 폼 검증 규칙 */
export const loginSchema = z.object({
  email: z.string().trim().pipe(z.email('이메일 형식이 올바르지 않아요.')),
  password: z.string().min(1, '비밀번호를 입력해 주세요.'),
  rememberEmail: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
