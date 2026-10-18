import { useId, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMonthTransactions } from '@/features/transaction/api/useMonthTransactions';
import type { Transaction } from '@/features/transaction/model/transaction';
import { sumByType } from '@/pages/home/lib/summarize';
import SummaryTiles from '@/pages/home/sections/SummaryTiles';
import { useMonthParam } from '@/shared/hooks/useMonthParam';
import Button from '@/shared/ui/Button/Button';
import DayDetailModal from './sections/DayDetailModal';
import HistoryCalendar from './sections/HistoryCalendar';
import HistorySearch from './sections/HistorySearch';
import TransactionEditModal from './sections/TransactionEditModal';
import styles from './HistoryPage.module.css';

/* 내역: 월별 달력 + 검색 */
export default function HistoryPage() {
  const { month, monthKey, isCurrent, move } = useMonthParam();
  const titleId = useId();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const query = useMonthTransactions(monthKey);
  const transactions = useMemo(() => query.data ?? [], [query.data]);
  const totals = sumByType(transactions);
  const monthName = isCurrent ? '이번 달' : month.format('M월');

  const skeleton = (height: number) => (
    <div className={styles.skeleton} style={{ height }} aria-hidden />
  );

  return (
    <main className={styles.page}>
      <title>내역 · 돈초리</title>

      <div className={styles.grid}>
        <div className={styles.overview}>
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
            <h1 id={titleId} className={styles.monthLabel} aria-live="polite">
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

          {query.isError ? (
            <div className={styles.error} role="alert">
              <p>
                {monthName} 내역을 불러오지 못했어요.
                <br />
                잠시 후 다시 시도해 주세요.
              </p>
              <Button type="button" className={styles.retry} onClick={() => query.refetch()}>
                다시 불러오기
              </Button>
            </div>
          ) : query.isPending ? (
            <>
              {skeleton(88)}
              {skeleton(440)}
            </>
          ) : (
            <div
              className={
                query.isPlaceholderData ? `${styles.content} ${styles.switching}` : styles.content
              }
              aria-busy={query.isPlaceholderData}
            >
              <SummaryTiles {...totals} />

              <HistoryCalendar
                month={month}
                transactions={transactions}
                labelledBy={titleId}
                onSelect={setSelectedDate}
                onMonthMove={move}
              />
            </div>
          )}
        </div>

        <HistorySearch onSelect={setEditing} />
      </div>

      <DayDetailModal
        date={selectedDate}
        transactions={transactions}
        onSelect={setEditing}
        onClose={() => setSelectedDate(null)}
      />

      <TransactionEditModal item={editing} onClose={() => setEditing(null)} />
    </main>
  );
}
