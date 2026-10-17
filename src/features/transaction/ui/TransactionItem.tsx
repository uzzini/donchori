import { formatWon } from '@/shared/lib/formatAmount';
import type { CategoryKey, TransactionType } from '../model/category';
import CategoryIcon from './CategoryIcon';
import styles from './TransactionItem.module.css';

type TransactionItemProps = {
  type: TransactionType;
  category: CategoryKey;
  title: string; // 메모 또는 거래처
  meta: string; // 카테고리 · 시간 등 보조 정보
  amount: number;
};

const SIGN = { income: '+', expense: '-', transfer: undefined } as const;

/* 거래 내역 */
export default function TransactionItem({
  type,
  category,
  title,
  meta,
  amount,
}: TransactionItemProps) {
  return (
    <div className={styles.item}>
      <CategoryIcon category={category} />
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        <p className={styles.meta}>{meta}</p>
      </div>
      <p className={`amount ${styles.amount} ${styles[type]}`}>
        {formatWon(amount, { sign: SIGN[type] })}
      </p>
    </div>
  );
}
