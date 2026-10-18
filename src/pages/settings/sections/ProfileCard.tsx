import { Pencil } from 'lucide-react';
import styles from './ProfileCard.module.css';

type ProfileCardProps = {
  nickname: string;
  onEditNickname: () => void;
};

/* 프로필: 닉네임 + 수정 버튼 */
export default function ProfileCard({ nickname, onEditNickname }: ProfileCardProps) {
  return (
    <section className={styles.card} aria-label="프로필">
      <h2 className={styles.name}>
        <span className={styles.nickname}>{nickname}</span>
        <span className={styles.suffix}>님</span>
      </h2>
      <button
        type="button"
        className={styles.edit}
        aria-label="닉네임 수정"
        title="닉네임 수정"
        aria-haspopup="dialog"
        onClick={onEditNickname}
      >
        <Pencil size={14} strokeWidth={2} aria-hidden />
      </button>
    </section>
  );
}
