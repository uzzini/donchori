import { isAuthError, isAuthWeakPasswordError } from '@supabase/supabase-js';

type SignupErrorFeedback = {
  field?: 'email' | 'password'; // 있으면 해당 입력 아래, 없으면 토스트로 안내
  message: string;
};

const RETRY_MESSAGE = '가입하지 못했어요. 잠시 후 다시 시도해 주세요.';

/* 회원가입 실패 원인 → 사용자 안내 문구 */
export function getSignupErrorFeedback(error: unknown): SignupErrorFeedback {
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
    case 'user_already_exists':
    case 'email_exists':
      return { field: 'email', message: '이미 가입된 이메일이에요.' };
    case 'weak_password':
      return { field: 'password', message: '더 안전한 비밀번호를 입력해 주세요.' };
    case 'email_address_invalid':
      return {
        field: 'email',
        message: '사용할 수 없는 이메일이에요. 다른 이메일을 입력해 주세요.',
      };
    case 'over_request_rate_limit':
      return { message: '요청이 많아 잠시 쉬어가고 있어요. 잠시 후 다시 시도해 주세요.' };
    case 'signup_disabled':
    case 'email_provider_disabled':
      return { message: '지금은 이메일로 가입할 수 없어요. 잠시 후 다시 시도해 주세요.' };
    default:
      return { message: RETRY_MESSAGE };
  }
}
