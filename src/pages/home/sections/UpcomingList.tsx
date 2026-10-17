import { formatWon } from '@/shared/lib/formatAmount';
import type { UpcomingExpense } from '../mockData';
import styles from './UpcomingList.module.css';

/* 이번 달 예정 지출 목록 */
export default function UpcomingList({ items }: { items: UpcomingExpense[] }) {
  if (items.length === 0) {
    return <p className={styles.empty}>이번 달 남은 예정 지출이 없어요.</p>;
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <p className={styles.memo}>{item.memo}</p>
          <p className={`amount ${styles.amount}`}>{formatWon(item.amount)}</p>
        </li>
      ))}
    </ul>
  );
}
