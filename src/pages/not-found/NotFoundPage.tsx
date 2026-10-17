import { Link, useNavigate } from 'react-router';
import { SearchX, Sprout } from 'lucide-react';
import buttonStyles from '@/shared/ui/Button/Button.module.css';
import { useAuthStore } from '@/stores/useAuthStore';
import styles from './NotFoundPage.module.css';

type NotFoundPageProps = {
  variant?: 'notFound' | 'preparing';
  title?: string; // preparing 전용 - 화면 이름
  layout?: 'shell' | 'standalone'; // standalone: AppLayout 밖(에러 화면)에서 로고와 함께 단독 표시
};

/* 404 Not Found 화면 */
export default function NotFoundPage({
  variant = 'notFound',
  title,
  layout = 'shell',
}: NotFoundPageProps) {
  const navigate = useNavigate();
  const session = useAuthStore((s) => s.session);

  const isPreparing = variant === 'preparing';
  const standalone = layout === 'standalone';
  const Icon = isPreparing ? Sprout : SearchX;

  // react-router가 history.state.idx에 앱 안에서 이동한 순서를 저장 (0이면 첫 진입)
  const historyIdx = (window.history.state as { idx?: number } | null)?.idx ?? 0;
  const canGoBack = !isPreparing && historyIdx > 0;

  // 단독 화면에서 세션이 없으면 홈 대신 로그인 화면으로 안내
  const toLogin = standalone && !session;

  const docTitle = isPreparing
    ? `${title ?? '준비 중'} · 돈초리`
    : '페이지를 찾을 수 없어요 · 돈초리';

  return (
    <main className={standalone ? `${styles.page} ${styles.standalone}` : styles.page}>
      <title>{docTitle}</title>

      {standalone && (
        <Link to="/" className={styles.brand} aria-label="돈초리 홈">
          <img
            className={`${styles.logo} ${styles.light}`}
            src="/logos/donchori-full-logo.webp"
            width={516}
            height={167}
            alt=""
          />
          <img
            className={`${styles.logo} ${styles.dark}`}
            src="/logos/donchori-full-logo-dark.webp"
            width={516}
            height={167}
            alt=""
          />
        </Link>
      )}

      <div className={styles.inner}>
        <div className={styles.badge}>
          <Icon size={28} strokeWidth={1.75} aria-hidden />
        </div>

        <p className={styles.eyebrow}>{isPreparing ? '준비 중' : '404'}</p>
        <header className={styles.header}>
          <h1 className={styles.title}>
            {isPreparing
              ? title
                ? `${title} 화면은 아직 준비 중이에요`
                : '아직 준비 중인 화면이에요'
              : '페이지를 찾을 수 없어요'}
          </h1>
          <p className={styles.desc}>
            {isPreparing ? (
              <>
                조금만 기다려 주세요.
                <br />
                그동안 홈에서 오늘 쓴 돈을 기록해 보세요.
              </>
            ) : (
              <>
                주소가 잘못됐거나 사라진 페이지예요.
                <br />
                홈에서 이번 달 예산부터 확인해 볼까요?
              </>
            )}
          </p>
        </header>

        <div className={styles.actions}>
          {canGoBack && (
            <button type="button" className={styles.secondary} onClick={() => navigate(-1)}>
              이전 페이지로
            </button>
          )}
          <Link
            to={toLogin ? '/login' : '/'}
            className={`${buttonStyles.primary} ${styles.primary}`}
          >
            {toLogin ? '로그인하러 가기' : '홈으로 가기'}
          </Link>
        </div>
      </div>
    </main>
  );
}
