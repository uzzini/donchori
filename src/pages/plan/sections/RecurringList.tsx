import dayjs from 'dayjs';
import type { RecurringTransaction } from '@/features/recurring/model/recurring';
import { CATEGORY_META } from '@/features/transaction/model/category';
import { categoryKeyOf } from '@/features/transaction/model/transaction';
import TransactionItem from '@/features/transaction/ui/TransactionItem';
import Section from '@/shared/ui/Section/Section';
import styles from './RecurringList.module.css';

type RecurringListProps = {
  items: RecurringTransaction[];
  className?: string;
};

type Row = RecurringTransaction & { day: number };

/* 반복 거래 목록: 이번 달 다가오는 거래 + 지난 거래 */
export default function RecurringList({ items, className }: RecurringListProps) {
  const today = dayjs();
  const lastDay = today.daysInMonth();

  const rows: Row[] = items
    .map((item) => ({ ...item, day: Math.min(item.dayOfMonth, lastDay) }))
    .sort((a, b) => a.day - b.day);
  const upcoming = rows.filter((row) => row.day >= today.date());
  const past = rows.filter((row) => row.day < today.date());

  const dDay = (day: number) => (day === today.date() ? '오늘' : `${day - today.date()}일 뒤`);

  const group = (title: string, list: Row[], withDDay: boolean) =>
    list.length > 0 && (
      <div className={styles.group}>
        <h3 className={styles.groupTitle}>{title}</h3>
        <ul>
          {list.map((row) => {
            const category = categoryKeyOf(row);
            const { label } = CATEGORY_META[category];
            const meta = [`매달 ${row.dayOfMonth}일`, label, withDDay && dDay(row.day)]
              .filter(Boolean)
              .join(' · ');
            return (
              <li key={row.id}>
                <TransactionItem
                  type={row.type}
                  category={category}
                  title={row.memo || label}
                  meta={meta}
                  amount={row.amount}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );

  return (
    <Section
      title="반복 거래"
      className={className}
      action={
        items.length > 0 && <span className={`amount ${styles.count}`}>{items.length}건</span>
      }
    >
      {items.length === 0 ? (
        <p className={styles.empty}>
          등록한 반복 거래가 없어요.
          <br />
          매달 나가는 돈을 기록해 보세요.
        </p>
      ) : (
        <>
          {group('이번 달 다가오는 거래', upcoming, true)}
          {group('이번 달 지난 거래', past, false)}
        </>
      )}
    </Section>
  );
}
