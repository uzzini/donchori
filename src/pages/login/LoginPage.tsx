import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Mail } from 'lucide-react';
import googleLogo from '@/assets/icons/google.svg';
import { getLoginErrorFeedback } from '@/features/auth/api/getLoginErrorFeedback';
import { useLogin } from '@/features/auth/api/useLogin';
import { loginSchema, type LoginFormValues } from '@/features/auth/model/loginSchema';
import { getSavedEmail } from '@/features/auth/model/savedEmail';
import AuthLayout from '@/features/auth/ui/AuthLayout';
import AuthSwitchLink from '@/features/auth/ui/AuthSwitchLink';
import Button from '@/shared/ui/Button/Button';
import PasswordField from '@/shared/ui/TextField/PasswordField';
import TextField from '@/shared/ui/TextField/TextField';
import { useToastStore } from '@/stores/useToastStore';
import styles from './LoginPage.module.css';

/* 로그인 화면 */
export default function LoginPage() {
  const showToast = useToastStore((s) => s.show);
  const login = useLogin();

  // 저장해 둔 이메일이 있으면 채우고 '아이디 저장'도 체크된 채로 시작
  const [defaultValues] = useState<LoginFormValues>(() => {
    const savedEmail = getSavedEmail();
    return { email: savedEmail, password: '', rememberEmail: savedEmail !== '' };
  });

  // 형식 검증은 제출 때 한 번, 그 뒤로는 고치는 즉시 재검증
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const [email, password] = useWatch({ control, name: ['email', 'password'] });
  const isFilled = email.trim() !== '' && password !== '';

  const onSubmit = handleSubmit((values) => {
    login.mutate(values, {
      onError: (error) => {
        const { field, message } = getLoginErrorFeedback(error);
        if (field) setError(field, { message }, { shouldFocus: true });
        else showToast(message, 'error');
      },
    });
  });

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
      <form className={styles.form} noValidate onSubmit={onSubmit}>
        <div className={styles.fields}>
          <TextField
            id="login-id"
            label="이메일"
            icon={Mail}
            hideLabel
            error={errors.email?.message}
            type="text"
            inputMode="email"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="이메일"
            {...register('email')}
          />

          <PasswordField
            id="login-password"
            label="비밀번호"
            hideLabel
            error={errors.password?.message}
            autoComplete="current-password"
            placeholder="비밀번호"
            {...register('password')}
          />
        </div>

        <div className={styles.options}>
          <label className={styles.remember}>
            <span className={styles.checkbox}>
              <input type="checkbox" {...register('rememberEmail')} />
              <Check size={12} strokeWidth={2} aria-hidden />
            </span>
            아이디 저장
          </label>
          <a href="#" className={styles.forgot}>
            비밀번호를 잊으셨나요?
          </a>
        </div>

        <Button type="submit" disabled={!isFilled || login.isPending}>
          로그인
        </Button>
      </form>

      <div className={styles.divider}>또는</div>

      {/* todo: 구글 로그인 연동 */}
      <button type="button" className={styles.google}>
        <img src={googleLogo} width={20} height={20} alt="" />
        Google로 로그인
      </button>

      <AuthSwitchLink message="아직 계정이 없으신가요?" to="/signup" label="회원가입" />
    </AuthLayout>
  );
}
