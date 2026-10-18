import { isAuthError, isAuthWeakPasswordError } from '@supabase/supabase-js';

type PasswordChangeErrorFeedback = {
  field?: 'currentPassword' | 'password';
  message: string;
};

const RETRY_MESSAGE = '비밀번호를 바꾸지 못했어요. 잠시 후 다시 시도해 주세요.';

/* 비밀번호 변경 실패 원인 → 사용자 안내 문구 */
export function getPasswordChangeErrorFeedback(error: unknown): PasswordChangeErrorFeedback {
  if (isAuthWeakPasswordError(error)) {
    return {
      field: 'password',
      message: error.reasons.includes('pwned')
        ? '유출된 적 있는 비밀번호예요. 다른 비밀번호를 입력해 주세요.'
        : '더 안전한 비밀번호를 입력해 주세요.',
    };
  }

  if (!isAuthError(error)) return { message: RETRY_MESSAGE };

  switch (error.code) {
    case 'invalid_credentials':
      return { field: 'currentPassword', message: '현재 비밀번호를 다시 확인해 주세요.' };
    case 'same_password':
      return { field: 'password', message: '현재 비밀번호와 다른 비밀번호를 입력해 주세요.' };
    case 'weak_password':
      return { field: 'password', message: '더 안전한 비밀번호를 입력해 주세요.' };
    case 'over_request_rate_limit':
      return { message: '요청이 많아 잠시 쉬어가고 있어요. 잠시 후 다시 시도해 주세요.' };
    default:
      return { message: RETRY_MESSAGE };
  }
}
