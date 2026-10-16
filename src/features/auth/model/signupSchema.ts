import { z } from 'zod';

// 완성형 한글만 허용(자음·모음 단독 불가)
const NICKNAME_PATTERN = /^[가-힣a-zA-Z0-9]{2,10}$/;
// 키보드 기호(ASCII 특수문자)
const SYMBOL_PATTERN = /[!-/:-@[-`{-~]/;

const PASSWORD_MESSAGE = '비밀번호는 영문, 숫자, 기호를 포함해 8자 이상 입력해 주세요.';

/* 회원가입 폼 검증 규칙 */
export const signupSchema = z
  .object({
    nickname: z
      .string()
      .trim()
      .regex(NICKNAME_PATTERN, '닉네임은 한글, 영문, 숫자로 2~10자 입력해 주세요.'),
    email: z.string().trim().pipe(z.email('이메일 형식이 올바르지 않아요.')),
    password: z
      .string()
      .min(8, PASSWORD_MESSAGE)
      .regex(/[A-Za-z]/, PASSWORD_MESSAGE)
      .regex(/[0-9]/, PASSWORD_MESSAGE)
      .regex(SYMBOL_PATTERN, PASSWORD_MESSAGE),
    passwordConfirm: z.string(),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않아요.',
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
