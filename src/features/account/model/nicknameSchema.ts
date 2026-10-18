import { z } from 'zod';
import { nicknameRule } from '@/features/auth/model/fieldRules';

/* 닉네임 변경 폼 검증 규칙 */
export const nicknameSchema = z.object({ nickname: nicknameRule });

export type NicknameFormValues = z.infer<typeof nicknameSchema>;
