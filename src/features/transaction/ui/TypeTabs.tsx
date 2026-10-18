import { TRANSACTION_TYPES, TYPE_LABEL, type TransactionType } from '../model/category';
import styles from './TypeTabs.module.css';

type TypeTabsProps = {
  name: string;
  value: TransactionType;
  onChange: (value: TransactionType) => void;
};

/* 지출 / 수입 / 이체 선택 탭 */
export default function TypeTabs({ name, value, onChange }: TypeTabsProps) {
  return (
    <div className={styles.tabs} role="radiogroup" aria-label="기록 유형">
      {TRANSACTION_TYPES.map((type) => (
        <label key={type} className={styles.tab}>
          <input
            type="radio"
            name={name}
            value={type}
            checked={value === type}
            onChange={() => onChange(type)}
          />
          {TYPE_LABEL[type]}
        </label>
      ))}
    </div>
  );
}
