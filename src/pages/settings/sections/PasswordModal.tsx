import type { FormEvent } from 'react';
import Button from '@/shared/ui/Button/Button';
import Modal from '@/shared/ui/Modal/Modal';
import PasswordField from '@/shared/ui/TextField/PasswordField';
import styles from './SettingsModal.module.css';

type PasswordModalProps = {
  open: boolean;
  onClose: () => void;
};

/* 비밀번호 변경 (이메일 계정 전용) */
export default function PasswordModal({ open, onClose }: PasswordModalProps) {
  // todo: 비밀번호 변경 연동
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="비밀번호 변경">
      {open && (
        <form className={styles.form} noValidate onSubmit={onSubmit}>
          <PasswordField
            id="settings-password-current"
            label="현재 비밀번호"
            autoComplete="current-password"
          />
          <PasswordField
            id="settings-password-new"
            label="새 비밀번호"
            autoComplete="new-password"
            helper="영문, 숫자, 기호를 포함해 8자 이상 입력해 주세요."
          />
          <PasswordField
            id="settings-password-confirm"
            label="새 비밀번호 확인"
            autoComplete="new-password"
          />
          <Button type="submit" className={styles.submit}>
            비밀번호 변경하기
          </Button>
        </form>
      )}
    </Modal>
  );
}
