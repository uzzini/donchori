import { useLogout } from '@/features/auth/api/useLogout';
import { useAuthStore } from '@/stores/useAuthStore';
import { useThemeStore, type Theme } from '@/stores/useThemeStore';
import { useToastStore } from '@/stores/useToastStore';
import styles from './App.module.css';

const THEMES: { value: Theme; label: string }[] = [
  { value: 'light', label: '라이트' },
  { value: 'dark', label: '다크' },
  { value: 'system', label: '시스템' },
];

/* 초기 세팅 확인용 화면
 todo: 라우터 붙이면 페이지로 교체
*/
export default function App() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const email = useAuthStore((s) => s.session?.user.email);
  const showToast = useToastStore((s) => s.show);
  const logout = useLogout();

  const onLogout = () => {
    logout.mutate(undefined, {
      onError: () => showToast('로그아웃하지 못했어요. 잠시 후 다시 시도해 주세요.', 'error'),
    });
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>
          <img className={styles.logoLight} src="/logos/donchori-full-logo.webp" alt="돈초리" />
          <img className={styles.logoDark} src="/logos/donchori-full-logo-dark.webp" alt="" />
        </h1>
        <p className={styles.tagline}>맞아볼래?</p>

        <dl className={styles.summary}>
          <div>
            <dt>수입</dt>
            <dd className={`amount ${styles.income}`}>+1,250,000원</dd>
          </div>
          <div>
            <dt>지출</dt>
            <dd className={`amount ${styles.expense}`}>−384,200원</dd>
          </div>
        </dl>

        <div className={styles.themes} role="radiogroup" aria-label="테마">
          {THEMES.map((t) => (
            <button
              key={t.value}
              type="button"
              role="radio"
              aria-checked={theme === t.value}
              className={styles.themeButton}
              onClick={() => setTheme(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <button type="button" className={styles.primary}>
          기록하기
        </button>

        {/* 테스트용: 로그인 계정 확인 + 로그아웃 */}
        <div className={styles.account}>
          <span>{email}</span>
          <button
            type="button"
            className={styles.logout}
            disabled={logout.isPending}
            onClick={onLogout}
          >
            로그아웃
          </button>
        </div>
      </section>
    </main>
  );
}
