import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { CalendarDays, ChevronDown, Search, SearchX, X } from 'lucide-react';
import { CATEGORY_META } from '@/features/transaction/model/category';
import { categoryKeyOf, type Transaction } from '@/features/transaction/model/transaction';
import CategoryFilterChips, {
  type CategoryFilter,
} from '@/features/transaction/ui/CategoryFilterChips';
import TransactionItem from '@/features/transaction/ui/TransactionItem';
import { groupRecent } from '@/pages/home/lib/summarize';
import TextField from '@/shared/ui/TextField/TextField';
import { formatPeriodShort, PERIOD_LABEL, presetPeriod, type Period } from '../lib/period';
import { searchTransactions } from '../lib/searchTransactions';
import PeriodSheet from './PeriodSheet';
import styles from './HistorySearch.module.css';

const PAGE_SIZE = 5;
const DEBOUNCE_MS = 250;

type HistorySearchProps = {
  transactions: Transaction[];
};

/* 내역 검색: 메모 · 기간 · 카테고리 */
export default function HistorySearch({ transactions }: HistorySearchProps) {
  const [q, setQ] = useState('');
  const [keyword, setKeyword] = useState('');
  const [period, setPeriod] = useState<Period>(() => presetPeriod('1m'));
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [periodOpen, setPeriodOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const timer = setTimeout(() => setKeyword(q.trim().toLowerCase()), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [q]);

  const filterKey = `${keyword}|${period.from}|${period.to}|${category}`;
  const results = useMemo(
    () =>
      searchTransactions(transactions, { q: keyword, from: period.from, to: period.to, category }),
    [transactions, keyword, period.from, period.to, category],
  );

  const [paging, setPaging] = useState({ key: filterKey, count: PAGE_SIZE });
  const visible = paging.key === filterKey ? paging.count : PAGE_SIZE;
  const groups = groupRecent(results, visible);

  // 더보기 후 새로 붙은 첫 항목으로 포커스
  const listRef = useRef<HTMLDivElement>(null);
  const focusIndex = useRef<number | null>(null);

  useEffect(() => {
    if (focusIndex.current === null) return;
    listRef.current?.querySelectorAll<HTMLLIElement>('li')[focusIndex.current]?.focus();
    focusIndex.current = null;
  }, [visible]);

  const onMore = () => {
    focusIndex.current = visible;
    setPaging({ key: filterKey, count: visible + PAGE_SIZE });
  };

  const isFiltered = q.trim() !== '' || period.preset !== '1m' || category !== 'all';

  const onReset = () => {
    setQ('');
    setKeyword('');
    setPeriod(presetPeriod('1m'));
    setCategory('all');
  };

  const periodLabel =
    period.preset === 'custom' ? formatPeriodShort(period) : `최근 ${PERIOD_LABEL[period.preset]}`;

  return (
    <section className={styles.search} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        전체 내역 조회
      </h2>

      <div className={styles.filters}>
        <div className={styles.row}>
          <div className={styles.searchField}>
            <TextField
              id="history-q"
              label="메모 검색"
              hideLabel
              icon={Search}
              type="search"
              placeholder="메모한 내용으로 검색"
              enterKeyHint="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              trailing={
                q ? (
                  <button
                    type="button"
                    className={styles.clear}
                    aria-label="검색어 지우기"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setQ('');
                      document.getElementById('history-q')?.focus();
                    }}
                  >
                    <X size={16} strokeWidth={2} aria-hidden />
                  </button>
                ) : undefined
              }
            />
          </div>
          <button
            type="button"
            className={styles.period}
            data-active={period.preset !== '1m' || undefined}
            aria-haspopup="dialog"
            onClick={() => setPeriodOpen(true)}
          >
            <CalendarDays size={16} strokeWidth={2} aria-hidden />
            <span className="sr-only">조회 기간 </span>
            {periodLabel}
            <ChevronDown size={16} strokeWidth={2} aria-hidden />
          </button>
        </div>
        <CategoryFilterChips
          name="history-category"
          value={category}
          onChange={setCategory}
          hideLabel
        />
      </div>

      <div className={styles.card}>
        <div className={styles.resultHeader}>
          <p className={styles.count} aria-live="polite">
            검색 결과 <strong>{results.length}건</strong>
          </p>
          {isFiltered && (
            <button type="button" className={styles.reset} onClick={onReset}>
              초기화
            </button>
          )}
        </div>

        <div key={filterKey} ref={listRef} className={styles.results}>
          {results.length > 0 ? (
            <>
              {groups.map((group) => (
                <div key={group.label} className={styles.group}>
                  <h3 className={styles.day}>{group.label}</h3>
                  <ul>
                    {group.items.map((item) => {
                      const itemCategory = categoryKeyOf(item);
                      const { label } = CATEGORY_META[itemCategory];
                      return (
                        <li key={item.id} tabIndex={-1}>
                          <TransactionItem
                            type={item.type}
                            category={itemCategory}
                            title={item.memo || label}
                            meta={label}
                            amount={item.amount}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              {visible < results.length && (
                <button type="button" className={styles.more} onClick={onMore}>
                  더보기 ({visible}/{results.length})
                </button>
              )}
            </>
          ) : (
            <div className={styles.empty}>
              <SearchX size={32} strokeWidth={1.75} aria-hidden />
              <p className={styles.emptyTitle}>조건에 맞는 내역이 없어요.</p>
              <p className={styles.emptyHint}>기간을 늘리거나 카테고리를 '전체'로 바꿔 보세요.</p>
              <button
                type="button"
                className={`${styles.more} ${styles.emptyReset}`}
                onClick={onReset}
              >
                필터 초기화
              </button>
            </div>
          )}
        </div>
      </div>

      <PeriodSheet
        open={periodOpen}
        value={period}
        onApply={(next) => {
          setPeriod(next);
          setPeriodOpen(false);
        }}
        onClose={() => setPeriodOpen(false)}
      />
    </section>
  );
}
