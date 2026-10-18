import { useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { getAccount } from './lib/account';
import AccountSection from './sections/AccountSection';
import NicknameModal from './sections/NicknameModal';
import PasswordModal from './sections/PasswordModal';
import ProfileCard from './sections/ProfileCard';
import ThemeSection from './sections/ThemeSection';
import WithdrawModal from './sections/WithdrawModal';
import styles from './SettingsPage.module.css';

type Dialog = 'nickname' | 'password' | 'withdraw' | null;

/* 설정: 프로필 · 계정 정보 · 화면 테마 · 회원 탈퇴 */
export default function SettingsPage() {
  const session = useAuthStore((s) => s.session);
  const account = getAccount(session);
  const [dialog, setDialog] = useState<Dialog>(null);
  const close = () => setDialog(null);

  if (!account) return null;

  return (
    <main className={styles.page}>
      <title>설정 · 돈초리</title>

      <h1 className="sr-only">설정</h1>

      <div className={styles.grid}>
        <div className={styles.column}>
          <ProfileCard nickname={account.nickname} onEditNickname={() => setDialog('nickname')} />
          <AccountSection account={account} onChangePassword={() => setDialog('password')} />
        </div>
        <div className={styles.column}>
          <ThemeSection />
        </div>
      </div>

      <button type="button" className={styles.withdraw} onClick={() => setDialog('withdraw')}>
        회원 탈퇴
      </button>

      <NicknameModal open={dialog === 'nickname'} nickname={account.nickname} onClose={close} />
      {account.hasPassword && <PasswordModal open={dialog === 'password'} onClose={close} />}
      <WithdrawModal open={dialog === 'withdraw'} nickname={account.nickname} onClose={close} />
    </main>
  );
}
