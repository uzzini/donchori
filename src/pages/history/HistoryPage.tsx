import { useId, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { sumByType } from '@/pages/home/lib/summarize';
import SummaryTiles from '@/pages/home/sections/SummaryTiles';
import { useMonthParam } from '@/shared/hooks/useMonthParam';
import { MOCK_TRANSACTIONS } from './lib/mockTransactions';
import DayDetailModal from './sections/DayDetailModal';
import HistoryCalendar from './sections/HistoryCalendar';
import HistorySearch from './sections/HistorySearch';
import styles from './HistoryPage.module.css';

/* 내역: 월별 달력 + 검색 */
export default function HistoryPage() {
  const { month, monthKey, isCurrent, move } = useMonthParam();
  const titleId = useId();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // todo: 데이터 연결 시 useMonthTransactions(monthKey)로 교체
  const transactions = useMemo(
    () => MOCK_TRANSACTIONS.filter((t) => t.occurredOn.startsWith(monthKey)),
    [monthKey],
  );
  const totals = sumByType(transactions);

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

          <SummaryTiles {...totals} />

          <HistoryCalendar
            month={month}
            transactions={transactions}
            labelledBy={titleId}
            onSelect={setSelectedDate}
            onMonthMove={move}
          />
        </div>

        {/* todo: 데이터 연결 시 기간 검색 쿼리로 교체 */}
        <HistorySearch transactions={MOCK_TRANSACTIONS} />
      </div>

      <DayDetailModal
        date={selectedDate}
        transactions={transactions}
        onClose={() => setSelectedDate(null)}
      />
    </main>
  );
}
