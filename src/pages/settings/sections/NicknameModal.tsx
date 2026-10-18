import type { FormEvent } from 'react';
import { UserRound } from 'lucide-react';
import Button from '@/shared/ui/Button/Button';
import Modal from '@/shared/ui/Modal/Modal';
import TextField from '@/shared/ui/TextField/TextField';
import styles from './SettingsModal.module.css';

type NicknameModalProps = {
  open: boolean;
  nickname: string;
  onClose: () => void;
};

/* 닉네임 변경 */
export default function NicknameModal({ open, nickname, onClose }: NicknameModalProps) {
  // todo: 닉네임 저장 연동
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="닉네임 변경">
      {open && (
        <form className={styles.form} noValidate onSubmit={onSubmit}>
          <TextField
            id="settings-nickname"
            label="닉네임"
            icon={UserRound}
            defaultValue={nickname}
            maxLength={10}
            autoComplete="nickname"
            helper="한글, 영문, 숫자로 2~10자 입력해 주세요."
          />
          <Button type="submit" className={styles.submit}>
            닉네임 저장하기
          </Button>
        </form>
      )}
    </Modal>
  );
}
