import { isAuthError } from '@supabase/supabase-js';

type LoginErrorFeedback = {
  field?: 'password'; // 있으면 해당 입력 아래, 없으면 토스트로 안내
  message: string;
};

const RETRY_MESSAGE = '로그인하지 못했어요. 잠시 후 다시 시도해 주세요.';

/* 로그인 실패 원인 → 사용자 안내 문구 */
export function getLoginErrorFeedback(error: unknown): LoginErrorFeedback {
  if (!isAuthError(error)) return { message: RETRY_MESSAGE };

  switch (error.code) {
    case 'invalid_credentials':
      return { field: 'password', message: '이메일 또는 비밀번호를 다시 확인해 주세요.' };
    case 'email_not_confirmed':
      return { message: '이메일 인증을 마친 뒤 로그인해 주세요.' };
    case 'over_request_rate_limit':
      return { message: '요청이 많아 잠시 쉬어가고 있어요. 잠시 후 다시 시도해 주세요.' };
    default:
      return { message: RETRY_MESSAGE };
  }
}
