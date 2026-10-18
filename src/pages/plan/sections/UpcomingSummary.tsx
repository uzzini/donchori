import type { PlannedExpense } from '@/features/plan/model/plannedExpense';
import SummaryCard, { SummaryText } from '../ui/SummaryCard';
import styles from './UpcomingSummary.module.css';

/* 예정 지출 요약: 아직 안 쓴 금액 합계 + 완료 진행률 */
export default function UpcomingSummary({ items }: { items: PlannedExpense[] }) {
  const doneCount = items.filter((item) => item.done).length;
  const remaining = items.reduce((sum, item) => (item.done ? sum : sum + item.amount), 0);
  const doneRate = items.length === 0 ? 0 : (doneCount / items.length) * 100;

  return (
    <SummaryCard label="적어 둔 예정 지출" amount={remaining}>
      <div
        className={styles.track}
        role="progressbar"
        aria-label="예정 지출 완료"
        aria-valuemin={0}
        aria-valuemax={items.length}
        aria-valuenow={doneCount}
      >
        <span className={styles.fill} style={{ width: `${doneRate}%` }} />
      </div>
      <SummaryText
        note={
          items.length === 0
            ? '곧 나갈 돈을 적어 두면 합계를 알려드려요.'
            : `${items.length}개 중 ${doneCount}개 완료 · ${items.length - doneCount}개 남았어요.`
        }
      />
    </SummaryCard>
  );
}
