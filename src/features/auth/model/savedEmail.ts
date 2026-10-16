const SAVED_EMAIL_KEY = 'donchori-saved-email';

/* '아이디 저장'으로 저장해 둔 이메일, 없으면 빈 문자열 */
export function getSavedEmail(): string {
  try {
    return localStorage.getItem(SAVED_EMAIL_KEY) ?? '';
  } catch {
    return '';
  }
}

export function setSavedEmail(email: string | null) {
  try {
    if (email) localStorage.setItem(SAVED_EMAIL_KEY, email);
    else localStorage.removeItem(SAVED_EMAIL_KEY);
  } catch {
    // 저장소를 못 쓰는 환경(사생활 보호 모드 등)에선 저장하지 않고 넘어감
  }
}
