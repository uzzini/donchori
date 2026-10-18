import { useId, useState } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { CalendarClock, ChevronRight, Pencil } from 'lucide-react';
import BudgetForm from '@/features/budget/ui/BudgetForm';
import type { UpcomingExpense } from '@/features/plan/api/useUpcomingExpenses';
import { formatWon } from '@/shared/lib/formatAmount';
import { toMonthKey } from '@/shared/lib/month';
import Modal from '@/shared/ui/Modal/Modal';
import { SectionLink } from '@/shared/ui/Section/Section';
import UpcomingList from './UpcomingList';
import styles from './BudgetCard.module.css';

type BudgetCardProps = {
  month: Dayjs;
  isCurrent: boolean; // 이번 달인지, 지난 달이면 하루 사용 가능 금액·예정 지출 숨김
  budget: number | null; // null이면 예산 미설정
  spent: number;
  upcoming: UpcomingExpense[]; // 아직 지출하지 않은 예정 지출
};

/* 월 예산: 남은 예산 + 사용률 + 하루 사용 가능 금액 + 예정 지출 목록 모달 + 예산 등록·수정 */
export default function BudgetCard({ month, isCurrent, budget, spent, upcoming }: BudgetCardProps) {
  const titleId = useId();
  const [upcomingOpen, setUpcomingOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);

  const monthName = isCurrent ? '이번 달' : month.format('M월');
  const upcomingTotal = upcoming.reduce((sum, item) => sum + item.amount, 0);

  const head = (label: string) => (
    <div className={styles.head}>
      <div className={styles.title}>
        <h2 id={titleId} className={styles.label}>
          {label}
        </h2>
        {budget !== null && (
          <button
            type="button"
            className={styles.edit}
            aria-label={`${monthName} 예산 수정`}
            title="예산 수정"
            aria-haspopup="dialog"
            onClick={() => setBudgetOpen(true)}
          >
            <Pencil size={14} strokeWidth={2} aria-hidden />
          </button>
        )}
      </div>
      {isCurrent && (
        <button
          type="button"
          className={styles.upcoming}
          aria-haspopup="dialog"
          onClick={() => setUpcomingOpen(true)}
        >
          <CalendarClock size={16} strokeWidth={2} aria-hidden />
          예정 지출
        </button>
      )}
    </div>
  );

  const modals = (
    <>
      <Modal
        open={upcomingOpen}
        onClose={() => setUpcomingOpen(false)}
        title="남은 예정 지출"
        description={
          upcoming.length > 0 && (
            <span className="amount">
              {upcoming.length}건 · 총 {formatWon(upcomingTotal)}
            </span>
          )
        }
      >
        <UpcomingList items={upcoming} />
        <div className={styles.manage}>
          <SectionLink to="/plan">계획에서 관리하기</SectionLink>
        </div>
      </Modal>

      <Modal
        open={budgetOpen}
        onClose={() => setBudgetOpen(false)}
        title={`${month.format('YYYY년 M월')} 예산`}
        description="한 달 동안 쓸 돈을 정해 주세요."
      >
        {budgetOpen && (
          <BudgetForm
            monthKey={toMonthKey(month)}
            initialAmount={budget}
            onDone={() => setBudgetOpen(false)}
          />
        )}
      </Modal>
    </>
  );

  const coin = (
    <span className={styles.coin} aria-hidden>
      <img className={styles.light} src="/icons/coin-icon.svg" width={576} height={588} alt="" />
      <img
        className={styles.dark}
        src="/icons/coin-dark-icon.svg"
        width={576}
        height={588}
        alt=""
      />
    </span>
  );

  // 예산 미설정
  if (budget === null) {
    return (
      <section className={styles.card} aria-labelledby={titleId}>
        {head(`${monthName} 예산이 비어 있어요`)}

        <div className={styles.headline}>
          <button
            type="button"
            className={styles.register}
            aria-haspopup="dialog"
            onClick={() => setBudgetOpen(true)}
          >
            예산 등록하기
            <ChevronRight size={24} strokeWidth={2.5} aria-hidden />
          </button>
        </div>

        <div className={styles.meter}>
          <div className={`${styles.track} ${styles.emptyTrack}`} aria-hidden />
          <div className={styles.meterRow}>
            <div className={styles.meterText}>
              <p>한 달에 쓸 돈을 정해 두면</p>
              <p className={styles.daily}>
                <strong>하루에 쓸 금액</strong>을 알려드려요.
              </p>
            </div>
            {coin}
          </div>
        </div>

        {modals}
      </section>
    );
  }

  const today = dayjs();
  const remaining = budget - spent;
  const isOver = remaining < 0;
  const usedRate = Math.min((spent / budget) * 100, 100);
  const daysLeft = today.daysInMonth() - today.date() + 1; // 오늘 포함
  const daily = Math.max(Math.floor(remaining / daysLeft), 0);

  const dailyText = () => {
    if (!isCurrent) {
      return isOver ? (
        <strong className="amount">{formatWon(-remaining)} 넘게 썼어요.</strong>
      ) : (
        <>
          <strong className="amount">{formatWon(remaining)}</strong> 남기고 마감했어요!
        </>
      );
    }
    if (isOver) return <strong>회초리 맞기 전에 카드는 내려놔요!</strong>;
    return (
      <>
        남은 {daysLeft}일 동안 하루 <strong className="amount">{formatWon(daily)}</strong>씩 쓸 수
        있어요.
      </>
    );
  };

  return (
    <section
      className={isOver ? `${styles.card} ${styles.over}` : styles.card}
      aria-labelledby={titleId}
    >
      {head(isOver ? `${monthName} 예산 초과` : `${monthName} 남은 예산`)}

      <p className={`amount ${styles.headline}`}>
        {isOver && '−'}
        {Math.abs(remaining).toLocaleString('ko-KR')}
        <span className={styles.unit}>원</span>
      </p>

      <div className={styles.meter}>
        <div className={styles.track} aria-hidden>
          <span className={styles.fill} style={{ width: `${usedRate}%` }} />
        </div>
        <div className={styles.meterRow}>
          <div className={styles.meterText}>
            <p className="amount">
              {formatWon(budget)} 중 {formatWon(spent)} 썼어요.
            </p>
            <p className={styles.daily}>{dailyText()}</p>
          </div>
          {coin}
        </div>
      </div>

      {modals}
    </section>
  );
}
