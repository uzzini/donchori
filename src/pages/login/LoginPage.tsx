import { Check, EyeOff, Lock, User } from 'lucide-react';
import { Link } from 'react-router';
import googleLogo from '@/assets/icons/google.svg';
import styles from './LoginPage.module.css';

/* 로그인 화면 */
export default function LoginPage() {
  return (
    <main className={styles.page}>
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

        <section className={styles.panel} aria-labelledby="login-title">
          <div className={styles.card}>
            <header className={styles.header}>
              <h2 id="login-title" className={styles.title}>
                반가워요!
              </h2>
              <p className={styles.subtitle}>
                지금 로그인하고,
                <br />내 지출에 회초리를 들어보세요.
              </p>
            </header>

            <form className={styles.form} noValidate>
              <div className={styles.fields}>
                <div className={styles.field}>
                  <label htmlFor="login-id" className="sr-only">
                    이메일 또는 아이디
                  </label>
                  <User className={styles.fieldIcon} size={18} strokeWidth={2} aria-hidden />
                  <input
                    id="login-id"
                    name="username"
                    type="text"
                    inputMode="email"
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="이메일"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="login-password" className="sr-only">
                    비밀번호
                  </label>
                  <Lock className={styles.fieldIcon} size={18} strokeWidth={2} aria-hidden />
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="비밀번호"
                  />
                  <button type="button" className={styles.eyeButton} aria-label="비밀번호 보기">
                    <EyeOff size={18} strokeWidth={2} aria-hidden />
                  </button>
                </div>
              </div>

              <div className={styles.options}>
                <label className={styles.remember}>
                  <span className={styles.checkbox}>
                    <input type="checkbox" name="rememberId" />
                    <Check size={12} strokeWidth={2} aria-hidden />
                  </span>
                  아이디 저장
                </label>
                <a href="#" className={styles.forgot}>
                  비밀번호를 잊으셨나요?
                </a>
              </div>

              <button type="submit" className={styles.primary}>
                로그인
              </button>
            </form>

            <div className={styles.divider}>또는</div>

            <button type="button" className={styles.google}>
              <img src={googleLogo} width={20} height={20} alt="" />
              Google로 로그인
            </button>

            <p className={styles.signup}>
              아직 계정이 없으신가요?
              <Link to="/signup" className={styles.signupLink}>
                회원가입
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
