import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  MOCK_BUDGET,
  MOCK_RECENT,
  MOCK_SUMMARY,
  MOCK_TOP_CATEGORIES,
  MOCK_UPCOMING,
} from './mockData';
import BudgetCard from './sections/BudgetCard';
import QuickRecord from './sections/QuickRecord';
import RecentTransactions from './sections/RecentTransactions';
import SummaryTiles from './sections/SummaryTiles';
import TopCategories from './sections/TopCategories';
import styles from './HomePage.module.css';

/* 홈: 월별 대시보드 */
export default function HomePage() {
  const month = dayjs();

  return (
    <main className={styles.page}>
      {/* todo: 월 이동 연결 */}
      <div className={styles.month}>
        <button type="button" className={styles.iconButton} aria-label="이전 달" title="이전 달">
          <ChevronLeft size={20} strokeWidth={2} aria-hidden />
        </button>
        <h1 className={styles.monthLabel}>{month.format('YYYY년 M월')}</h1>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="다음 달"
          title="다음 달"
          disabled
        >
          <ChevronRight size={20} strokeWidth={2} aria-hidden />
        </button>
      </div>

      <div className={styles.grid}>
        <div className={styles.column}>
          <BudgetCard budget={MOCK_BUDGET} spent={MOCK_SUMMARY.expense} upcoming={MOCK_UPCOMING} />
          {/* todo: 퍼블리싱 확인용, 데이터 연결 시 MOCK_BUDGET 하나로 분기 */}
          <BudgetCard budget={null} spent={MOCK_SUMMARY.expense} upcoming={MOCK_UPCOMING} />
          <SummaryTiles {...MOCK_SUMMARY} />
          <QuickRecord />
        </div>
        <div className={styles.column}>
          <RecentTransactions groups={MOCK_RECENT} />
          <TopCategories items={MOCK_TOP_CATEGORIES} />
        </div>
      </div>
    </main>
  );
}
