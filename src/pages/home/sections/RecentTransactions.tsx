import { CATEGORY_META } from '@/features/transaction/model/category';
import TransactionItem from '@/features/transaction/ui/TransactionItem';
import Section, { SectionLink } from '@/shared/ui/Section/Section';
import type { Transaction } from '../mockData';
import styles from './RecentTransactions.module.css';

type RecentTransactionsProps = {
  groups: { label: string; items: Transaction[] }[];
};

/* 최근 내역 */
export default function RecentTransactions({ groups }: RecentTransactionsProps) {
  const hasItems = groups.some((group) => group.items.length > 0);

  return (
    <Section title="최근 내역" action={<SectionLink to="/history">전체보기</SectionLink>}>
      {hasItems ? (
        groups.map((group) => (
          <div key={group.label} className={styles.group}>
            <h3 className={styles.day}>{group.label}</h3>
            {group.items.length === 0 ? (
              <p className={styles.none}>기록이 없어요.</p>
            ) : (
              <ul>
                {group.items.map((item) => (
                  <li key={item.id}>
                    <TransactionItem
                      type={item.type}
                      category={item.category}
                      title={item.title}
                      meta={`${CATEGORY_META[item.category].label} · ${item.time}`}
                      amount={item.amount}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      ) : (
        <p className={styles.empty}>
          최근에 기록한 내역이 없어요.
          <br />
          오늘 쓴 돈부터 남겨 볼까요?
        </p>
      )}
    </Section>
  );
}
