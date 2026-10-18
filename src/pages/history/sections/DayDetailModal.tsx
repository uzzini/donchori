import dayjs from 'dayjs';
import {
  CATEGORY_META,
  TYPE_LABEL,
  type TransactionType,
} from '@/features/transaction/model/category';
import { categoryKeyOf, type Transaction } from '@/features/transaction/model/transaction';
import TransactionItem from '@/features/transaction/ui/TransactionItem';
import { dayLabel, sumByType } from '@/pages/home/lib/summarize';
import { formatWon } from '@/shared/lib/formatAmount';
import Modal from '@/shared/ui/Modal/Modal';
import styles from './DayDetailModal.module.css';

// 수입 → 지출 → 이체 순으로 묶음
const GROUP_ORDER: TransactionType[] = ['income', 'expense', 'transfer'];

type DayDetailModalProps = {
  date: string | null;
  transactions: Transaction[];
  onClose: () => void;
};

/* 달력에서 고른 날의 내역 */
export default function DayDetailModal({ date, transactions, onClose }: DayDetailModalProps) {
  const items = date ? transactions.filter((t) => t.occurredOn === date) : [];
  const { income, expense } = sumByType(items);

  const summary = [
    income > 0 && `수입 ${formatWon(income, { sign: '+' })}`,
    expense > 0 && `지출 ${formatWon(expense, { sign: '-' })}`,
  ]
    .filter(Boolean)
    .join(' · ');

  const groups = GROUP_ORDER.map((type) => ({
    type,
    items: items.filter((t) => t.type === type),
  })).filter((group) => group.items.length > 0);

  return (
    <Modal
      open={date !== null}
      onClose={onClose}
      title={date ? dayLabel(dayjs(date)) : ''}
      description={summary && <span className={styles.summary}>{summary}</span>}
    >
      {groups.length > 0 ? (
        <div className={styles.body}>
          {groups.map((group) => (
            <div key={group.type} className={styles.group}>
              <h3 className={styles.day}>{TYPE_LABEL[group.type]}</h3>
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
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>이 날은 기록한 내역이 없어요.</p>
      )}
    </Modal>
  );
}
