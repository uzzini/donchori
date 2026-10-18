import type { Session } from '@supabase/supabase-js';

export type Account = {
  nickname: string;
  email: string;
  hasPassword: boolean; // 이메일 가입 계정만 비밀번호 변경 노출
  joinedAt: string;
};

/* 세션에서 설정 화면에 보여 줄 계정 정보 추출 */
export function getAccount(session: Session | null): Account | null {
  const user = session?.user;
  if (!user) return null;

  const providers: string[] = user.app_metadata.providers ?? [
    user.app_metadata.provider ?? 'email',
  ];
  const hasPassword = providers.includes('email');
  const meta = user.user_metadata as { nickname?: string; full_name?: string; name?: string };

  return {
    nickname: meta.nickname ?? meta.full_name ?? meta.name ?? '돈초리',
    email: user.email ?? '',
    hasPassword,
    joinedAt: user.created_at,
  };
}
