import { useId, type ReactNode } from 'react';
import styles from './SummaryCard.module.css';

type SummaryCardProps = {
  label: string;
  amount: number;
  children: ReactNode; // 금액 아래 막대 · 설명
};

/* 탭 상단 요약: 라벨 + 큰 금액 */
export default function SummaryCard({ label, amount, children }: SummaryCardProps) {
  const titleId = useId();

  return (
    <section className={styles.card} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.label}>
        {label}
      </h2>
      <p className={`amount ${styles.headline}`}>
        {amount.toLocaleString('ko-KR')}
        <span className={styles.unit}>원</span>
      </p>
      <div className={styles.body}>{children}</div>
    </section>
  );
}

type SummaryTextProps = {
  note: ReactNode; // 회색 보조 문구
  highlight?: ReactNode; // 강조 문구, <strong>은 포인트 색
};

/* 막대 아래 문구 */
export function SummaryText({ note, highlight }: SummaryTextProps) {
  return (
    <div className={styles.text}>
      <p className="amount">{note}</p>
      {highlight && <p className={`amount ${styles.highlight}`}>{highlight}</p>}
    </div>
  );
}
