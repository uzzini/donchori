import type { ReactNode } from 'react';
import styles from './AuthLayout.module.css';

type AuthLayoutProps = {
  titleId: string;
  title: ReactNode;
  subtitle: ReactNode;
  longForm?: boolean; // 폼이 긴 화면: 1024px 미만에선 아이콘·겹치는 나뭇잎을 숨기고, 이상에선 브랜드 고정
  children: ReactNode;
};

/* 인증 화면 공통 레이아웃: 배경 장식 + 브랜드 + 폼 카드 */
export default function AuthLayout({
  titleId,
  title,
  subtitle,
  longForm = false,
  children,
}: AuthLayoutProps) {
  const icons = (
    <>
      <img
        className={`${styles.icon} ${styles.light}`}
        src="/icons/donchori-icon.png"
        width={240}
        height={240}
        alt=""
      />
      <img
        className={`${styles.icon} ${styles.dark}`}
        src="/icons/donchori-icon-dark.png"
        width={240}
        height={240}
        alt=""
      />
    </>
  );

  return (
    <main className={longForm ? `${styles.page} ${styles.longForm}` : styles.page}>
      {/* 배경 장식: 모서리 곡선 + 흩날리는 나뭇잎 */}
      <div className={styles.deco} aria-hidden>
        <div className={`${styles.corner} ${styles.cornerTL}`}>
          <span className={`${styles.blob} ${styles.blobTL}`} />
          <span className={`${styles.leaf} ${styles.leafA}`} />
          <span className={`${styles.leaf} ${styles.leafB}`} />
        </div>
        <div className={`${styles.corner} ${styles.cornerBL}`}>
          <span className={`${styles.blob} ${styles.blobBL}`} />
          <span className={`${styles.leaf} ${styles.leafC}`} />
        </div>
        <div className={`${styles.corner} ${styles.cornerBR}`}>
          <span className={`${styles.blob} ${styles.blobBR}`} />
          <span className={`${styles.leaf} ${styles.leafD}`} />
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.brand}>
          {longForm ? <div className={styles.icons}>{icons}</div> : icons}
          <div className={styles.brandText}>
            <h1>
              <img
                className={`${styles.logo} ${styles.light}`}
                src="/logos/donchori-logo.svg"
                width={300}
                height={134}
                alt="돈초리"
              />
              <img
                className={`${styles.logo} ${styles.dark}`}
                src="/logos/donchori-logo-dark.svg"
                width={300}
                height={134}
                alt=""
              />
            </h1>
            <p className={styles.tagline}>맞아볼래?</p>
          </div>
        </div>

        <section className={styles.panel} aria-labelledby={titleId}>
          <div className={styles.card}>
            <header className={styles.header}>
              <h2 id={titleId} className={styles.title}>
                {title}
              </h2>
              <p className={styles.subtitle}>{subtitle}</p>
            </header>

            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
