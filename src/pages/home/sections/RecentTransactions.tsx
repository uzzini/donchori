import { CATEGORY_META } from '@/features/transaction/model/category';
import { categoryKeyOf } from '@/features/transaction/model/transaction';
import TransactionItem from '@/features/transaction/ui/TransactionItem';
import Section, { SectionLink } from '@/shared/ui/Section/Section';
import type { RecentGroup } from '../lib/summarize';
import styles from './RecentTransactions.module.css';

type RecentTransactionsProps = {
  groups: RecentGroup[];
  isCurrent: boolean;
};

/* 최근 내역 */
export default function RecentTransactions({ groups, isCurrent }: RecentTransactionsProps) {
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
                {group.items.map((item) => {
                  const category = categoryKeyOf(item);
                  const { label } = CATEGORY_META[category];
                  return (
                    <li key={item.id}>
                      <TransactionItem
                        type={item.type}
                        category={category}
                        title={item.memo || label}
                        meta={label}
                        amount={item.amount}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))
      ) : (
        <p className={styles.empty}>
          {isCurrent ? (
            <>
              최근에 기록한 내역이 없어요.
              <br />
              오늘 쓴 돈부터 남겨 볼까요?
            </>
          ) : (
            '이 달에 기록한 내역이 없어요.'
          )}
        </p>
      )}
    </Section>
  );
}
