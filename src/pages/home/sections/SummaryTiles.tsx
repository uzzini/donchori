import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { formatWon } from '@/shared/lib/formatAmount';
import styles from './SummaryTiles.module.css';

type SummaryTilesProps = {
  income: number;
  expense: number;
};

/* 이번 달 총 수입 / 총 지출 */
export default function SummaryTiles({ income, expense }: SummaryTilesProps) {
  return (
    <dl className={styles.card}>
      <div className={`${styles.stat} ${styles.income}`}>
        <dt>
          <span className={styles.chip}>
            <ArrowDownLeft size={14} strokeWidth={2.25} aria-hidden />
          </span>
          수입
        </dt>
        <dd className="amount">{formatWon(income)}</dd>
      </div>
      <div className={`${styles.stat} ${styles.expense}`}>
        <dt>
          <span className={styles.chip}>
            <ArrowUpRight size={14} strokeWidth={2.25} aria-hidden />
          </span>
          지출
        </dt>
        <dd className="amount">{formatWon(expense)}</dd>
      </div>
    </dl>
  );
}
