import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMonthBudget } from '@/features/budget/api/useMonthBudget';
import { useUpcomingExpenses } from '@/features/plan/api/useUpcomingExpenses';
import { useMonthTransactions } from '@/features/transaction/api/useMonthTransactions';
import Button from '@/shared/ui/Button/Button';
import Section from '@/shared/ui/Section/Section';
import { groupRecent, sumByCategory, sumByType } from './lib/summarize';
import { useMonthParam } from './lib/useMonthParam';
import BudgetCard from './sections/BudgetCard';
import QuickRecord from './sections/QuickRecord';
import RecentTransactions from './sections/RecentTransactions';
import SummaryTiles from './sections/SummaryTiles';
import TopCategories from './sections/TopCategories';
import styles from './HomePage.module.css';

const RECENT_LIMIT = 8;

/* 홈: 월별 대시보드 */
export default function HomePage() {
  const { month, monthKey, isCurrent, move } = useMonthParam();
  const monthName = isCurrent ? '이번 달' : month.format('M월');

  const transactions = useMonthTransactions(monthKey);
  const budget = useMonthBudget(monthKey);
  const upcoming = useUpcomingExpenses();

  const summary = useMemo(() => {
    const list = transactions.data ?? [];
    return {
      totals: sumByType(list),
      categories: sumByCategory(list),
      recent: groupRecent(list, RECENT_LIMIT),
    };
  }, [transactions.data]);

  const isPending = transactions.isPending || budget.isPending;
  const isError = transactions.isError || budget.isError;
  const isSwitching = transactions.isPlaceholderData || budget.isPlaceholderData;

  const retry = () => {
    if (transactions.isError) transactions.refetch();
    if (budget.isError) budget.refetch();
  };

  const loadError = (
    <div className={styles.error} role="alert">
      <p>
        {monthName} 가계부를 불러오지 못했어요.
        <br />
        잠시 후 다시 시도해 주세요.
      </p>
      <Button type="button" className={styles.retry} onClick={retry}>
        다시 불러오기
      </Button>
    </div>
  );

  const sectionError = <p className={styles.sectionError}>내역을 불러오지 못했어요.</p>;

  const skeleton = (height: number) => (
    <div className={styles.skeleton} style={{ height }} aria-hidden />
  );

  return (
    <main className={styles.page}>
      <div className={styles.month}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="이전 달"
          title="이전 달"
          onClick={() => move(-1)}
        >
          <ChevronLeft size={20} strokeWidth={2} aria-hidden />
        </button>
        <h1 className={styles.monthLabel} aria-live="polite">
          {month.format('YYYY년 M월')}
        </h1>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="다음 달"
          title="다음 달"
          disabled={isCurrent}
          onClick={() => move(1)}
        >
          <ChevronRight size={20} strokeWidth={2} aria-hidden />
        </button>
      </div>

      <div
        className={isSwitching ? `${styles.grid} ${styles.switching}` : styles.grid}
        aria-busy={isPending || isSwitching}
      >
        <div className={styles.column}>
          {isError ? (
            loadError
          ) : isPending ? (
            <>
              {skeleton(232)}
              {skeleton(88)}
            </>
          ) : (
            <>
              <BudgetCard
                month={month}
                isCurrent={isCurrent}
                budget={budget.data ?? null}
                spent={summary.totals.expense}
                upcoming={(isCurrent && upcoming.data) || []}
              />
              <SummaryTiles {...summary.totals} />
            </>
          )}
          <QuickRecord />
        </div>
        <div className={styles.column}>
          {isError ? (
            <>
              <Section title="최근 내역">{sectionError}</Section>
              <Section title="많이 쓴 곳">{sectionError}</Section>
            </>
          ) : isPending ? (
            <>
              {skeleton(320)}
              {skeleton(240)}
            </>
          ) : (
            <>
              <RecentTransactions groups={summary.recent} isCurrent={isCurrent} />
              <TopCategories items={summary.categories} monthName={monthName} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
