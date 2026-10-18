import { CATEGORY_META, type ExpenseCategory } from '@/features/transaction/model/category';
import type { RecurringTransaction } from '@/features/recurring/model/recurring';
import { formatWon } from '@/shared/lib/formatAmount';
import SummaryCard, { SummaryText } from '../ui/SummaryCard';
import styles from './RecurringSummary.module.css';

const sumOf = (items: RecurringTransaction[]) => items.reduce((sum, item) => sum + item.amount, 0);

/* 반복 거래 요약: 매달 고정 지출 + 카테고리 비율 막대 + 고정 수입·이체 */
export default function RecurringSummary({ items }: { items: RecurringTransaction[] }) {
  const expenses = items.filter((item) => item.type === 'expense');
  const expenseTotal = sumOf(expenses);
  const incomeTotal = sumOf(items.filter((item) => item.type === 'income'));
  const transferTotal = sumOf(items.filter((item) => item.type === 'transfer'));
  const left = incomeTotal - expenseTotal - transferTotal; // 매달 자유롭게 쓸 수 있는 돈

  const byCategory = new Map<ExpenseCategory, number>();
  for (const item of expenses) {
    const key = item.category ?? 'etc';
    byCategory.set(key, (byCategory.get(key) ?? 0) + item.amount);
  }
  const rows = [...byCategory]
    .sort((a, b) => b[1] - a[1])
    .map(([category, amount]) => ({
      category,
      ...CATEGORY_META[category],
      amount,
      rate: (amount / expenseTotal) * 100,
    }));

  const highlight = () =>
    left < 0 ? (
      <strong>고정 지출·이체가 수입보다 {formatWon(-left)} 많아요.</strong>
    ) : (
      <>
        고정 지출·이체를 빼면 매달 <strong>{formatWon(left)}</strong>이 남아요.
      </>
    );

  return (
    <SummaryCard label="매달 나가는 고정 지출" amount={expenseTotal}>
      {rows.length === 0 ? (
        <div className={`${styles.bar} ${styles.empty}`} aria-hidden />
      ) : (
        <>
          <div className={styles.bar} aria-hidden>
            {rows.map((row) => (
              <span
                key={row.category}
                style={{ flexGrow: row.rate, background: row.color }}
                title={`${row.label} ${formatWon(row.amount)}`}
              />
            ))}
          </div>
          <ul className={styles.legend}>
            {rows.map((row) => (
              <li key={row.category}>
                <span className={styles.dot} style={{ background: row.color }} aria-hidden />
                {row.label}
                <span className="amount">{Math.round(row.rate)}%</span>
              </li>
            ))}
          </ul>
        </>
      )}
      <SummaryText
        note={`고정 수입 ${formatWon(incomeTotal)} · 고정 이체 ${formatWon(transferTotal)}`}
        highlight={incomeTotal > 0 && highlight()}
      />
    </SummaryCard>
  );
}
