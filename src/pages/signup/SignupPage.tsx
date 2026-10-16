import { Mail, User } from 'lucide-react';
import AuthLayout from '@/features/auth/ui/AuthLayout';
import AuthSwitchLink from '@/features/auth/ui/AuthSwitchLink';
import Button from '@/shared/ui/Button/Button';
import PasswordField from '@/shared/ui/TextField/PasswordField';
import TextField from '@/shared/ui/TextField/TextField';
import styles from './SignupPage.module.css';

/* 회원가입 화면 */
export default function SignupPage() {
  return (
    <AuthLayout
      titleId="signup-title"
      title="시작해요!"
      subtitle={
        <>
          지금 계정을 만들고,
          <br />내 지출에 회초리를 들어보세요.
        </>
      }
      longForm
    >
      <form className={styles.form} noValidate>
        <div className={styles.groups}>
          <TextField
            id="signup-nickname"
            label="닉네임"
            icon={User}
            helper="한글, 영문, 숫자를 쓸 수 있어요."
            name="nickname"
            type="text"
            autoComplete="nickname"
            maxLength={10}
            placeholder="2~10자"
          />

          <TextField
            id="signup-email"
            label="이메일"
            icon={Mail}
            name="email"
            type="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="example@email.com"
          />

          <PasswordField
            id="signup-password"
            label="비밀번호"
            name="password"
            autoComplete="new-password"
            placeholder="영문, 숫자, 기호 포함 8자 이상"
          />

          <PasswordField
            id="signup-password-confirm"
            label="비밀번호 확인"
            name="passwordConfirm"
            autoComplete="new-password"
            placeholder="비밀번호 재입력"
          />
        </div>

        <Button type="submit">가입하기</Button>
      </form>

      <AuthSwitchLink message="이미 계정이 있으신가요?" to="/login" label="로그인" />
    </AuthLayout>
  );
}
