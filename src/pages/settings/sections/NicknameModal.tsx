import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRound } from 'lucide-react';
import { useUpdateNickname } from '@/features/account/api/useUpdateNickname';
import { nicknameSchema, type NicknameFormValues } from '@/features/account/model/nicknameSchema';
import Button from '@/shared/ui/Button/Button';
import Modal from '@/shared/ui/Modal/Modal';
import TextField from '@/shared/ui/TextField/TextField';
import { useToastStore } from '@/stores/useToastStore';
import styles from './SettingsModal.module.css';

type NicknameModalProps = {
  open: boolean;
  nickname: string;
  onClose: () => void;
};

/* 닉네임 변경 */
export default function NicknameModal({ open, nickname, onClose }: NicknameModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="닉네임 변경">
      {open && <NicknameForm nickname={nickname} onClose={onClose} />}
    </Modal>
  );
}

function NicknameForm({ nickname, onClose }: { nickname: string; onClose: () => void }) {
  const showToast = useToastStore((s) => s.show);
  const updateNickname = useUpdateNickname();

  // 입력을 시작하면 실시간 검증
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<NicknameFormValues>({
    resolver: zodResolver(nicknameSchema),
    mode: 'onChange',
    defaultValues: { nickname },
  });

  const onSubmit = handleSubmit((values) => {
    // 앞뒤 공백만 바꾼 경우는 저장할 게 없으니 그냥 닫음
    if (values.nickname === nickname) return onClose();

    updateNickname.mutate(values.nickname, {
      onSuccess: () => {
        showToast('닉네임을 바꿨어요.');
        onClose();
      },
      onError: () => showToast('닉네임을 바꾸지 못했어요. 잠시 후 다시 시도해 주세요.', 'error'),
    });
  });

  return (
    <form className={styles.form} noValidate onSubmit={onSubmit}>
      <TextField
        id="settings-nickname"
        label="닉네임"
        icon={UserRound}
        maxLength={10}
        autoComplete="nickname"
        helper="한글, 영문, 숫자로 2~10자 입력해 주세요."
        error={errors.nickname?.message}
        {...register('nickname')}
      />
      <Button
        type="submit"
        className={styles.submit}
        disabled={!isDirty || !isValid || updateNickname.isPending}
      >
        닉네임 저장하기
      </Button>
    </form>
  );
}
