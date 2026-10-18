import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import type { Transaction } from '@/features/transaction/model/transaction';
import { formatCompactWon, formatWon } from '@/shared/lib/formatAmount';
import { toMonthKey } from '@/shared/lib/month';
import { WEEKDAYS } from '@/shared/lib/weekday';
import { heatLevel, sumByDay, type DayTotal } from '../lib/dailyTotals';
import styles from './HistoryCalendar.module.css';

const DATE_FORMAT = 'YYYY-MM-DD';
const LEVELS = [1, 2, 3, 4];

type HistoryCalendarProps = {
  month: Dayjs;
  transactions: Transaction[];
  labelledBy: string;
  onSelect: (date: string) => void;
  onMonthMove: (offset: number) => void;
};

const dayAriaLabel = (d: Dayjs, total: DayTotal | undefined) => {
  const date = `${d.format('M월 D일')} ${WEEKDAYS[d.day()]}요일`;
  if (!total) return `${date}, 기록 없음`;
  const parts = [];
  if (total.income > 0) parts.push(`수입 ${formatWon(total.income)}`);
  if (total.expense > 0) parts.push(`지출 ${formatWon(total.expense)}`);
  if (parts.length === 0) parts.push(`이체 ${total.count}건`);
  return `${date}, ${parts.join(', ')}`;
};

/* 월별 내역 달력: 날짜별 수입·지출 + 지출 히트맵 */
export default function HistoryCalendar({
  month,
  transactions,
  labelledBy,
  onSelect,
  onMonthMove,
}: HistoryCalendarProps) {
  const today = dayjs().startOf('day');
  const monthKey = toMonthKey(month);

  const totals = useMemo(() => sumByDay(transactions), [transactions]);
  const maxExpense = Math.max(0, ...[...totals.values()].map((t) => t.expense));

  const [focused, setFocused] = useState<{ monthKey: string; date: string } | null>(null);
  const activeDate =
    focused?.monthKey === monthKey
      ? focused.date
      : (month.isSame(today, 'month') ? today : month).format(DATE_FORMAT);

  const gridRef = useRef<HTMLDivElement>(null);
  const shouldFocus = useRef(false);

  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${activeDate}"]`)?.focus();
  }, [activeDate]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const current = dayjs(activeDate);
    let target: Dayjs;
    switch (e.key) {
      case 'ArrowLeft':
        target = current.subtract(1, 'day');
        break;
      case 'ArrowRight':
        target = current.add(1, 'day');
        break;
      case 'ArrowUp':
        target = current.subtract(7, 'day');
        break;
      case 'ArrowDown':
        target = current.add(7, 'day');
        break;
      case 'Home':
        target = current.subtract(current.day(), 'day');
        if (!target.isSame(month, 'month')) target = month;
        break;
      case 'End':
        target = current.add(6 - current.day(), 'day');
        if (!target.isSame(month, 'month')) target = month.endOf('month').startOf('day');
        break;
      case 'PageUp':
        target = current.subtract(1, 'month');
        break;
      case 'PageDown':
        target = current.add(1, 'month');
        break;
      default:
        return;
    }
    e.preventDefault();

    // 미래 날짜로는 이동 불가
    if (target.isAfter(today, 'day')) {
      if (e.key !== 'End' && e.key !== 'PageDown') return;
      target = today;
    }
    const date = target.format(DATE_FORMAT);
    if (date === activeDate) return;

    shouldFocus.current = true;
    setFocused({ monthKey: toMonthKey(target), date });
    const offset = target.startOf('month').diff(month, 'month');
    if (offset !== 0) onMonthMove(offset);
  };

  const cells: (Dayjs | null)[] = [
    ...Array.from({ length: month.day() }, () => null),
    ...Array.from({ length: month.daysInMonth() }, (_, i) => month.date(i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));

  return (
    <div className={styles.card}>
      <div className={styles.weekdays} aria-hidden>
        {WEEKDAYS.map((w) => (
          <span key={w} className={styles.weekday}>
            {w}
          </span>
        ))}
      </div>

      <div
        ref={gridRef}
        className={styles.grid}
        role="grid"
        aria-labelledby={labelledBy}
        onKeyDown={onKeyDown}
      >
        {weeks.map((week, i) => (
          <div key={i} role="row" className={styles.row}>
            {week.map((d, j) => {
              if (!d) return <div key={`blank-${j}`} role="gridcell" />;

              const date = d.format(DATE_FORMAT);
              const total = totals.get(date);
              const level = heatLevel(total?.expense ?? 0, maxExpense);
              const transferOnly = total && total.income === 0 && total.expense === 0;

              return (
                <div key={date} role="gridcell" className={styles.slot}>
                  <button
                    type="button"
                    className={styles.cell}
                    style={{ '--level': level } as CSSProperties}
                    data-date={date}
                    tabIndex={date === activeDate ? 0 : -1}
                    disabled={d.isAfter(today, 'day')}
                    aria-label={dayAriaLabel(d, total)}
                    aria-current={d.isSame(today, 'day') ? 'date' : undefined}
                    onClick={() => {
                      setFocused({ monthKey, date });
                      onSelect(date);
                    }}
                  >
                    <span className={styles.date} data-weekday={d.day()}>
                      {d.date()}
                    </span>
                    {!!total?.income && (
                      <span className={`amount ${styles.inc}`}>
                        {formatCompactWon(total.income, { sign: '+' })}
                      </span>
                    )}
                    {!!total?.expense && (
                      <span className={`amount ${styles.exp}`}>
                        {formatCompactWon(total.expense, { sign: '-' })}
                      </span>
                    )}
                    {transferOnly && <span className={styles.dot} />}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className={styles.legend} aria-hidden>
        적게 쓴 날
        <span className={styles.swatches}>
          {LEVELS.map((level) => (
            <span
              key={level}
              className={styles.swatch}
              style={{ '--level': level } as CSSProperties}
            />
          ))}
        </span>
        많이 쓴 날
      </div>
    </div>
  );
}
