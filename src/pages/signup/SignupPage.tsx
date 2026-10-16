import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, User } from 'lucide-react';
import { getSignupErrorFeedback } from '@/features/auth/api/getSignupErrorFeedback';
import { useSignup } from '@/features/auth/api/useSignup';
import { signupSchema, type SignupFormValues } from '@/features/auth/model/signupSchema';
import AuthLayout from '@/features/auth/ui/AuthLayout';
import AuthSwitchLink from '@/features/auth/ui/AuthSwitchLink';
import Button from '@/shared/ui/Button/Button';
import PasswordField from '@/shared/ui/TextField/PasswordField';
import TextField from '@/shared/ui/TextField/TextField';
import { useToastStore } from '@/stores/useToastStore';
import styles from './SignupPage.module.css';

const DEFAULT_VALUES: SignupFormValues = {
  nickname: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

/* 회원가입 화면 */
export default function SignupPage() {
  const navigate = useNavigate();
  const showToast = useToastStore((s) => s.show);
  const signup = useSignup();

  // 입력을 시작한 필드부터 실시간 검증
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    getFieldState,
    setError,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = handleSubmit(({ nickname, email, password }) => {
    signup.mutate(
      { nickname, email, password },
      {
        onSuccess: () => {
          showToast('인증 메일을 보냈어요. 메일함을 확인해 주세요.');
          navigate('/login');
        },
        onError: (error) => {
          const { field, message } = getSignupErrorFeedback(error);
          if (field) setError(field, { message }, { shouldFocus: true });
          else showToast(message, 'error');
        },
      },
    );
  });

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
      <form className={styles.form} noValidate onSubmit={onSubmit}>
        <div className={styles.groups}>
          <TextField
            id="signup-nickname"
            label="닉네임"
            icon={User}
            helper="한글, 영문, 숫자를 쓸 수 있어요."
            error={errors.nickname?.message}
            type="text"
            autoComplete="nickname"
            maxLength={10}
            placeholder="2~10자"
            {...register('nickname')}
          />

          <TextField
            id="signup-email"
            label="이메일"
            icon={Mail}
            error={errors.email?.message}
            type="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="example@email.com"
            {...register('email')}
          />

          <PasswordField
            id="signup-password"
            label="비밀번호"
            error={errors.password?.message}
            autoComplete="new-password"
            placeholder="영문, 숫자, 기호 포함 8자 이상"
            {...register('password', {
              onChange: () => {
                if (getValues('passwordConfirm') || getFieldState('passwordConfirm').invalid) {
                  trigger('passwordConfirm');
                }
              },
            })}
          />

          <PasswordField
            id="signup-password-confirm"
            label="비밀번호 확인"
            error={errors.passwordConfirm?.message}
            autoComplete="new-password"
            placeholder="비밀번호 재입력"
            {...register('passwordConfirm')}
          />
        </div>

        <Button type="submit" disabled={!isValid || signup.isPending}>
          가입하기
        </Button>
      </form>

      <AuthSwitchLink message="이미 계정이 있으신가요?" to="/login" label="로그인" />
    </AuthLayout>
  );
}
