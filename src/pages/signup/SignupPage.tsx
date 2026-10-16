import { EyeOff, Lock, Mail, User } from 'lucide-react';
import { Link } from 'react-router';
import login from '@/pages/login/LoginPage.module.css';
import styles from './SignupPage.module.css';

/* 회원가입 화면 */
export default function SignupPage() {
  return (
    <main className={`${login.page} ${styles.page}`}>
      {/* 배경 장식: 모서리 곡선 + 흩날리는 나뭇잎 */}
      <div className={login.deco} aria-hidden>
        <div className={`${login.corner} ${login.cornerTL}`}>
          <span className={`${login.blob} ${login.blobTL}`} />
          <span className={`${login.leaf} ${login.leafA}`} />
          <span className={`${login.leaf} ${login.leafB} ${styles.leafB}`} />
        </div>
        <div className={`${login.corner} ${login.cornerBL}`}>
          <span className={`${login.blob} ${login.blobBL}`} />
          <span className={`${login.leaf} ${login.leafC}`} />
        </div>
        <div className={`${login.corner} ${login.cornerBR}`}>
          <span className={`${login.blob} ${login.blobBR}`} />
          <span className={`${login.leaf} ${login.leafD}`} />
        </div>
      </div>

      <div className={login.inner}>
        <div className={`${login.brand} ${styles.brand}`}>
          <div className={styles.icons}>
            <img
              className={`${login.icon} ${login.light}`}
              src="/icons/donchori-icon.png"
              width={240}
              height={240}
              alt=""
            />
            <img
              className={`${login.icon} ${login.dark}`}
              src="/icons/donchori-icon-dark.png"
              width={240}
              height={240}
              alt=""
            />
          </div>
          <div className={login.brandText}>
            <h1>
              <img
                className={`${login.logo} ${login.light}`}
                src="/logos/donchori-logo.svg"
                width={300}
                height={134}
                alt="돈초리"
              />
              <img
                className={`${login.logo} ${login.dark}`}
                src="/logos/donchori-logo-dark.svg"
                width={300}
                height={134}
                alt=""
              />
            </h1>
            <p className={login.tagline}>맞아볼래?</p>
          </div>
        </div>

        <section className={login.panel} aria-labelledby="signup-title">
          <div className={login.card}>
            <header className={login.header}>
              <h2 id="signup-title" className={login.title}>
                시작해요!
              </h2>
              <p className={login.subtitle}>
                지금 계정을 만들고,
                <br />내 지출에 회초리를 들어보세요.
              </p>
            </header>

            <form className={`${login.form} ${styles.form}`} noValidate>
              <div className={styles.groups}>
                <div className={styles.group}>
                  <label htmlFor="signup-nickname" className={styles.label}>
                    닉네임
                  </label>
                  <div className={login.field}>
                    <User className={login.fieldIcon} size={18} strokeWidth={2} aria-hidden />
                    <input
                      id="signup-nickname"
                      name="nickname"
                      type="text"
                      autoComplete="nickname"
                      maxLength={10}
                      placeholder="2~10자"
                      aria-describedby="signup-nickname-helper"
                    />
                  </div>
                  <p id="signup-nickname-helper" className={styles.helper}>
                    한글, 영문, 숫자를 쓸 수 있어요.
                  </p>
                </div>

                <div className={styles.group}>
                  <label htmlFor="signup-email" className={styles.label}>
                    이메일
                  </label>
                  <div className={login.field}>
                    <Mail className={login.fieldIcon} size={18} strokeWidth={2} aria-hidden />
                    <input
                      id="signup-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      autoCapitalize="none"
                      spellCheck={false}
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div className={styles.group}>
                  <label htmlFor="signup-password" className={styles.label}>
                    비밀번호
                  </label>
                  <div className={login.field}>
                    <Lock className={login.fieldIcon} size={18} strokeWidth={2} aria-hidden />
                    <input
                      id="signup-password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="영문, 숫자, 기호 포함 8자 이상"
                    />
                    <button type="button" className={login.eyeButton} aria-label="비밀번호 보기">
                      <EyeOff size={18} strokeWidth={2} aria-hidden />
                    </button>
                  </div>
                </div>

                <div className={styles.group}>
                  <label htmlFor="signup-password-confirm" className={styles.label}>
                    비밀번호 확인
                  </label>
                  <div className={login.field}>
                    <Lock className={login.fieldIcon} size={18} strokeWidth={2} aria-hidden />
                    <input
                      id="signup-password-confirm"
                      name="passwordConfirm"
                      type="password"
                      autoComplete="new-password"
                      placeholder="비밀번호 재입력"
                    />
                    <button
                      type="button"
                      className={login.eyeButton}
                      aria-label="비밀번호 확인 보기"
                    >
                      <EyeOff size={18} strokeWidth={2} aria-hidden />
                    </button>
                  </div>
                </div>
              </div>

              <button type="submit" className={login.primary}>
                가입하기
              </button>
            </form>

            <p className={login.signup}>
              이미 계정이 있으신가요?
              <Link to="/login" className={login.signupLink}>
                로그인
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
