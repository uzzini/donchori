import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getPasswordChangeErrorFeedback } from '@/features/account/api/getPasswordChangeErrorFeedback';
import { useChangePassword } from '@/features/account/api/useChangePassword';
import { passwordSchema, type PasswordFormValues } from '@/features/account/model/passwordSchema';
import Button from '@/shared/ui/Button/Button';
import Modal from '@/shared/ui/Modal/Modal';
import PasswordField from '@/shared/ui/TextField/PasswordField';
import { useToastStore } from '@/stores/useToastStore';
import styles from './SettingsModal.module.css';

type PasswordModalProps = {
  open: boolean;
  onClose: () => void;
};

const DEFAULT_VALUES: PasswordFormValues = {
  currentPassword: '',
  password: '',
  passwordConfirm: '',
};

/* 비밀번호 변경 (이메일 계정 전용) */
export default function PasswordModal({ open, onClose }: PasswordModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="비밀번호 변경">
      {open && <PasswordForm onClose={onClose} />}
    </Modal>
  );
}

function PasswordForm({ onClose }: { onClose: () => void }) {
  const showToast = useToastStore((s) => s.show);
  const changePassword = useChangePassword();

  // 입력을 시작한 필드부터 실시간 검증
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    getFieldState,
    setError,
    formState: { errors, isValid },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
    defaultValues: DEFAULT_VALUES,
  });

  // 비교 대상이 바뀌면 이미 입력한 필드도 다시 검증
  const revalidate = (name: 'password' | 'passwordConfirm') => {
    if (getValues(name) || getFieldState(name).invalid) trigger(name);
  };

  const onSubmit = handleSubmit(({ currentPassword, password }) => {
    changePassword.mutate(
      { currentPassword, password },
      {
        onSuccess: () => {
          showToast('비밀번호를 바꿨어요.');
          onClose();
        },
        onError: (error) => {
          const { field, message } = getPasswordChangeErrorFeedback(error);
          if (field) setError(field, { message }, { shouldFocus: true });
          else showToast(message, 'error');
        },
      },
    );
  });

  return (
    <form className={styles.form} noValidate onSubmit={onSubmit}>
      <PasswordField
        id="settings-password-current"
        label="현재 비밀번호"
        autoComplete="current-password"
        error={errors.currentPassword?.message}
        {...register('currentPassword', { onChange: () => revalidate('password') })}
      />
      <PasswordField
        id="settings-password-new"
        label="새 비밀번호"
        autoComplete="new-password"
        helper="영문, 숫자, 기호를 포함해 8자 이상 입력해 주세요."
        error={errors.password?.message}
        {...register('password', { onChange: () => revalidate('passwordConfirm') })}
      />
      <PasswordField
        id="settings-password-confirm"
        label="새 비밀번호 확인"
        autoComplete="new-password"
        error={errors.passwordConfirm?.message}
        {...register('passwordConfirm')}
      />
      <Button
        type="submit"
        className={styles.submit}
        disabled={!isValid || changePassword.isPending}
      >
        비밀번호 변경하기
      </Button>
    </form>
  );
}
