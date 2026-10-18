import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { usePlannedExpenses } from '@/features/plan/api/usePlannedExpenses';
import { useRecurringTransactions } from '@/features/recurring/api/useRecurringTransactions';
import type { RecurringTransaction } from '@/features/recurring/model/recurring';
import RecurringForm from '@/features/recurring/ui/RecurringForm';
import Button from '@/shared/ui/Button/Button';
import Section from '@/shared/ui/Section/Section';
import { panelId, tabId, type PlanTab } from './lib/planTab';
import PlanTabs from './PlanTabs';
import RecurringEditModal from './sections/RecurringEditModal';
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

  const plannedQuery = usePlannedExpenses();
  const planned = plannedQuery.data ?? [];
  const recurringQuery = useRecurringTransactions();
  const recurring = recurringQuery.data ?? [];
  const [editing, setEditing] = useState<RecurringTransaction | null>(null);

  const skeleton = (height: number, className: string) => (
    <div className={`${styles.skeleton} ${className}`} style={{ height }} aria-hidden />
  );

  const loadError = (name: string, retry: () => void) => (
    <div className={`${styles.error} ${styles.summary}`} role="alert">
      <p>
        {name} 불러오지 못했어요.
        <br />
        잠시 후 다시 시도해 주세요.
      </p>
      <Button type="button" className={styles.retry} onClick={retry}>
        다시 불러오기
      </Button>
    </div>
  );

  return (
    <main className={styles.page}>
      <title>계획 · 돈초리</title>

      <h1 className="sr-only">계획</h1>

      <PlanTabs
        value={tab}
        onChange={onTabChange}
        counts={{
          upcoming: plannedQuery.data?.filter((p) => !p.done).length,
          recurring: recurringQuery.data?.length,
        }}
      />

      <div
        key={tab}
        id={panelId(tab)}
        role="tabpanel"
        aria-labelledby={tabId(tab)}
        className={styles.panel}
      >
        {tab === 'upcoming' ? (
          plannedQuery.isError ? (
            loadError('예정 지출을', () => plannedQuery.refetch())
          ) : plannedQuery.isPending ? (
            <>
              {skeleton(152, styles.summary)}
              {skeleton(420, styles.list)}
            </>
          ) : (
            <>
              <div className={`${styles.summary} ${styles.sticky}`}>
                <UpcomingSummary items={planned} />
              </div>
              <UpcomingChecklist items={planned} className={styles.list} />
            </>
          )
        ) : (
          <>
            {recurringQuery.isError ? (
              loadError('반복 거래를', () => recurringQuery.refetch())
            ) : recurringQuery.isPending ? (
              <>
                {skeleton(208, styles.summary)}
                {skeleton(360, styles.list)}
              </>
            ) : (
              <>
                <div className={styles.summary}>
                  <RecurringSummary items={recurring} />
                </div>
                <RecurringList items={recurring} onSelect={setEditing} className={styles.list} />
              </>
            )}
            <Section title="반복 거래 등록" className={styles.form}>
              <RecurringForm idPrefix="recurring" />
            </Section>
          </>
        )}
      </div>

      <RecurringEditModal item={editing} onClose={() => setEditing(null)} />
    </main>
  );
}
