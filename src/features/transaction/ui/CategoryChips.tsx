import type { CSSProperties } from 'react';
import { CircleAlert } from 'lucide-react';
import { CATEGORY_META, EXPENSE_CATEGORIES, type ExpenseCategory } from '../model/category';
import styles from './CategoryChips.module.css';

type CategoryChipsProps = {
  name: string;
  value: ExpenseCategory | null;
  onChange: (value: ExpenseCategory) => void;
  error?: string;
};

/* 지출 카테고리 선택 칩 */
export default function CategoryChips({ name, value, onChange, error }: CategoryChipsProps) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.label}>카테고리</legend>
      <div className={styles.chips}>
        {EXPENSE_CATEGORIES.map((key) => {
          const { label, icon: Icon, color } = CATEGORY_META[key];
          return (
            <label
              key={key}
              className={styles.chip}
              style={{ '--cat-color': color } as CSSProperties}
            >
              <input
                type="radio"
                name={name}
                value={key}
                checked={value === key}
                onChange={() => onChange(key)}
              />
              <Icon size={16} strokeWidth={2} aria-hidden />
              {label}
            </label>
          );
        })}
      </div>
      {error && (
        <p className={styles.error}>
          <CircleAlert size={14} strokeWidth={2} aria-hidden />
          {error}
        </p>
      )}
    </fieldset>
  );
}
