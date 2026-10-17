import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WEEKDAYS } from '@/shared/lib/weekday';
import styles from './Calendar.module.css';

type CalendarNavProps = {
  month: Dayjs; // 보고 있는 달의 1일
  onMonthChange: (month: Dayjs) => void;
};

export function CalendarNav({ month, onMonthChange }: CalendarNavProps) {
  return (
    <div className={styles.nav}>
      <p className={styles.month} aria-live="polite">
        {month.format('YYYY년 M월')}
      </p>
      <button
        type="button"
        className={styles.navButton}
        aria-label="이전 달"
        onClick={() => onMonthChange(month.subtract(1, 'month'))}
      >
        <ChevronLeft size={20} strokeWidth={2} aria-hidden />
      </button>
      <button
        type="button"
        className={styles.navButton}
        aria-label="다음 달"
        onClick={() => onMonthChange(month.add(1, 'month'))}
      >
        <ChevronRight size={20} strokeWidth={2} aria-hidden />
      </button>
    </div>
  );
}

type CalendarProps = {
  month: Dayjs; // 보고 있는 달의 1일
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
};

/* 월 단위 날짜 선택 달력 */
export default function Calendar({ month, value, onChange }: CalendarProps) {
  const today = dayjs().format('YYYY-MM-DD');

  // 1일 앞은 빈칸으로 채워 요일 맞춤
  const blanks = month.day();
  const days = Array.from({ length: month.daysInMonth() }, (_, i) => month.date(i + 1));

  return (
    <div className={styles.grid}>
      {WEEKDAYS.map((w) => (
        <span key={w} className={styles.weekday} aria-hidden>
          {w}
        </span>
      ))}
      {Array.from({ length: blanks }, (_, i) => (
        <span key={`blank-${i}`} aria-hidden />
      ))}
      {days.map((d) => {
        const key = d.format('YYYY-MM-DD');
        return (
          <button
            key={key}
            type="button"
            className={styles.day}
            data-weekday={d.day()}
            aria-label={`${d.format('M월 D일')} ${WEEKDAYS[d.day()]}요일`}
            aria-pressed={key === value}
            aria-current={key === today ? 'date' : undefined}
            onClick={() => onChange(key)}
          >
            {d.date()}
          </button>
        );
      })}
    </div>
  );
}
