import { useState } from 'react';
import { Check, CircleMinus } from 'lucide-react';
import Modal from '@/shared/ui/Modal/Modal';
import styles from './SettingsModal.module.css';

type WithdrawModalProps = {
  open: boolean;
  nickname: string;
  onClose: () => void;
};

const DELETED = ['모든 수입·지출 내역', '반복 거래와 예정 지출', '계정 정보'];

/* 회원 탈퇴: 삭제 항목 안내 + 확인 체크 후 활성화 */
export default function WithdrawModal({ open, nickname, onClose }: WithdrawModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="회원 탈퇴">
      {open && <WithdrawBody nickname={nickname} onClose={onClose} />}
    </Modal>
  );
}

function WithdrawBody({ nickname, onClose }: { nickname: string; onClose: () => void }) {
  const [agreed, setAgreed] = useState(false);

  // todo: 회원 탈퇴 연동
  const onWithdraw = () => onClose();

  return (
    <div className={styles.form}>
      <div className={styles.notice}>
        <p>
          <strong>{nickname}</strong>님의 기록이 모두 삭제돼요.
        </p>
        <ul>
          {DELETED.map((item) => (
            <li key={item}>
              <CircleMinus size={16} strokeWidth={2} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <label className={styles.agree}>
        <span className={styles.checkbox}>
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <Check size={12} strokeWidth={2} aria-hidden />
        </span>
        안내 내용을 확인했어요.
      </label>

      <div className={styles.actions}>
        <button type="button" className={styles.cancel} autoFocus onClick={onClose}>
          취소
        </button>
        <button type="button" className={styles.danger} disabled={!agreed} onClick={onWithdraw}>
          탈퇴하기
        </button>
      </div>
    </div>
  );
}
