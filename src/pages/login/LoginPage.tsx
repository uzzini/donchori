import { Check, Mail } from 'lucide-react';
import googleLogo from '@/assets/icons/google.svg';
import AuthLayout from '@/features/auth/ui/AuthLayout';
import AuthSwitchLink from '@/features/auth/ui/AuthSwitchLink';
import Button from '@/shared/ui/Button/Button';
import PasswordField from '@/shared/ui/TextField/PasswordField';
import TextField from '@/shared/ui/TextField/TextField';
import styles from './LoginPage.module.css';

/* 로그인 화면 */
export default function LoginPage() {
  return (
    <AuthLayout
      titleId="login-title"
      title="반가워요!"
      subtitle={
        <>
          지금 로그인하고,
          <br />내 지출에 회초리를 들어보세요.
        </>
      }
    >
      <form className={styles.form} noValidate>
        <div className={styles.fields}>
          <TextField
            id="login-id"
            label="이메일"
            icon={Mail}
            hideLabel
            name="username"
            type="text"
            inputMode="email"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="이메일"
          />

          <PasswordField
            id="login-password"
            label="비밀번호"
            hideLabel
            name="password"
            autoComplete="current-password"
            placeholder="비밀번호"
          />
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

        <Button type="submit">로그인</Button>
      </form>

      <div className={styles.divider}>또는</div>

      <button type="button" className={styles.google}>
        <img src={googleLogo} width={20} height={20} alt="" />
        Google로 로그인
      </button>

      <AuthSwitchLink message="아직 계정이 없으신가요?" to="/signup" label="회원가입" />
    </AuthLayout>
  );
}
