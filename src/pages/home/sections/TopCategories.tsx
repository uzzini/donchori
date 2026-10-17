import { CATEGORY_META, type ExpenseCategory } from '@/features/transaction/model/category';
import CategoryIcon from '@/features/transaction/ui/CategoryIcon';
import { formatWon } from '@/shared/lib/formatAmount';
import Section from '@/shared/ui/Section/Section';
import styles from './TopCategories.module.css';

type TopCategoriesProps = {
  items: { category: ExpenseCategory; amount: number }[]; // 금액 내림차순
};

const RADIUS = 50;
const STROKE = 14;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 2; // 조각 사이 간격

/* 많이 쓴 곳: 카테고리별 지출 비율 도넛 + 목록 */
export default function TopCategories({ items }: TopCategoriesProps) {
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  let offset = 0;
  const rows = items.map((item) => {
    const length = total === 0 ? 0 : (item.amount / total) * CIRCUMFERENCE;
    const row = {
      ...item,
      ...CATEGORY_META[item.category],
      rate: total === 0 ? 0 : Math.round((item.amount / total) * 100),
      dash: `${Math.max(length - GAP, 0.5)} ${CIRCUMFERENCE}`,
      offset: -offset,
    };
    offset += length;
    return row;
  });

  return (
    <Section title="많이 쓴 곳">
      {total === 0 ? (
        <p className={styles.empty}>이번 달 지출 기록이 아직 없어요.</p>
      ) : (
        <div className={styles.body}>
          <div className={styles.chart} aria-hidden>
            <svg viewBox="0 0 120 120">
              {rows.map((row) => (
                <circle
                  key={row.category}
                  cx="60"
                  cy="60"
                  r={RADIUS}
                  fill="none"
                  stroke={row.color}
                  strokeWidth={STROKE}
                  strokeDasharray={row.dash}
                  strokeDashoffset={row.offset}
                >
                  <title>{`${row.label} ${row.rate}% · ${formatWon(row.amount)}`}</title>
                </circle>
              ))}
            </svg>
            <div className={styles.center}>
              <span>총 지출</span>
              <strong className="amount">{formatWon(total)}</strong>
            </div>
          </div>

          <ol className={styles.list}>
            {rows.map((row) => (
              <li key={row.category} className={styles.item}>
                <CategoryIcon category={row.category} size="sm" />
                <span className={styles.label}>{row.label}</span>
                <span className={`amount ${styles.rate}`}>{row.rate}%</span>
                <span className={`amount ${styles.amount}`}>{formatWon(row.amount)}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </Section>
  );
}
