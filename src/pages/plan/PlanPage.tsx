import { useSearchParams } from 'react-router';
import RecurringForm from '@/features/recurring/ui/RecurringForm';
import Section from '@/shared/ui/Section/Section';
import { MOCK_PLANNED, MOCK_RECURRING } from './mockData';
import { panelId, tabId, type PlanTab } from './lib/planTab';
import PlanTabs from './PlanTabs';
import RecurringList from './sections/RecurringList';
import RecurringSummary from './sections/RecurringSummary';
import UpcomingChecklist from './sections/UpcomingChecklist';
import UpcomingSummary from './sections/UpcomingSummary';
import styles from './PlanPage.module.css';

/* 계획: 예정 지출 / 반복 거래 탭 (?tab=recurring) */
export default function PlanPage() {
  const [params, setParams] = useSearchParams();
  const tab: PlanTab = params.get('tab') === 'recurring' ? 'recurring' : 'upcoming';

  const onTabChange = (next: PlanTab) =>
    setParams(next === 'upcoming' ? {} : { tab: next }, { replace: true });

  // todo: 목업 → 실제 데이터 연결
  const planned = MOCK_PLANNED;
  const recurring = MOCK_RECURRING;

  return (
    <main className={styles.page}>
      <title>계획 · 돈초리</title>

      <h1 className="sr-only">계획</h1>

      <PlanTabs
        value={tab}
        onChange={onTabChange}
        counts={{ upcoming: planned.filter((p) => !p.done).length, recurring: recurring.length }}
      />

      <div
        key={tab}
        id={panelId(tab)}
        role="tabpanel"
        aria-labelledby={tabId(tab)}
        className={styles.panel}
      >
        {tab === 'upcoming' ? (
          <>
            <div className={`${styles.summary} ${styles.sticky}`}>
              <UpcomingSummary items={planned} />
            </div>
            <UpcomingChecklist items={planned} className={styles.list} />
          </>
        ) : (
          <>
            <div className={styles.summary}>
              <RecurringSummary items={recurring} />
            </div>
            <RecurringList items={recurring} className={styles.list} />
            <Section title="반복 거래 등록" className={styles.form}>
              <RecurringForm idPrefix="recurring" />
            </Section>
          </>
        )}
      </div>
    </main>
  );
}
