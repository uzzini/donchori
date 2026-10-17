import { useState, type ChangeEvent, type CSSProperties } from 'react';
import dayjs from 'dayjs';
import { PenLine } from 'lucide-react';
import Button from '@/shared/ui/Button/Button';
import DatePicker from '@/shared/ui/DatePicker/DatePicker';
import TextField from '@/shared/ui/TextField/TextField';
import {
  CATEGORY_META,
  EXPENSE_CATEGORIES,
  type CategoryKey,
  type TransactionType,
} from '../model/category';
import styles from './RecordForm.module.css';

const TYPES: { value: TransactionType; label: string }[] = [
  { value: 'expense', label: '지출' },
  { value: 'income', label: '수입' },
  { value: 'transfer', label: '이체' },
];

// 카테고리는 지출만 (수입·이체는 금액·날짜·메모만)
const CATEGORIES: Record<TransactionType, CategoryKey[]> = {
  expense: EXPENSE_CATEGORIES,
  income: [],
  transfer: [],
};

const MEMO_PLACEHOLDER: Record<TransactionType, string> = {
  expense: '어디에 썼나요?',
  income: '어디서 들어왔나요?',
  transfer: '어디로 보냈나요?',
};

type RecordFormProps = {
  idPrefix: string; // 한 화면에 여러 개 둘 때 id 충돌 방지
};

/* 수입·지출·이체 기록 입력 카드
 todo: react-hook-form + 저장 API 연결
*/
export default function RecordForm({ idPrefix }: RecordFormProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [date, setDate] = useState(() => dayjs().format('YYYY-MM-DD'));

  const typeLabel = TYPES.find((t) => t.value === type)!.label;
  const categories = CATEGORIES[type];

  const onTypeChange = (next: TransactionType) => {
    setType(next);
    setCategory(null);
  };

  // 숫자만 남기고 천 단위 콤마
  const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 12);
    setAmount(digits ? Number(digits).toLocaleString('ko-KR') : '');
  };

  return (
    <form className={styles.form} noValidate onSubmit={(e) => e.preventDefault()}>
      <div className={styles.tabs} role="radiogroup" aria-label="기록 유형">
        {TYPES.map((t) => (
          <label key={t.value} className={styles.tab}>
            <input
              type="radio"
              name={`${idPrefix}-type`}
              value={t.value}
              checked={type === t.value}
              onChange={() => onTypeChange(t.value)}
            />
            {t.label}
          </label>
        ))}
      </div>

      <div className={`${styles.amount} ${styles[type]}`}>
        <label htmlFor={`${idPrefix}-amount`} className={styles.label}>
          {typeLabel} 금액
        </label>
        <div className={styles.amountField}>
          <input
            id={`${idPrefix}-amount`}
            className="amount"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="0"
            value={amount}
            onChange={onAmountChange}
          />
          <span aria-hidden>원</span>
        </div>
      </div>

      {categories.length > 0 && (
        <fieldset className={styles.fieldset}>
          <legend className={styles.label}>카테고리</legend>
          <div className={styles.chips}>
            {categories.map((key) => {
              const { label, icon: Icon, color } = CATEGORY_META[key];
              return (
                <label
                  key={key}
                  className={styles.chip}
                  style={{ '--cat-color': color } as CSSProperties}
                >
                  <input
                    type="radio"
                    name={`${idPrefix}-category`}
                    value={key}
                    checked={category === key}
                    onChange={() => setCategory(key)}
                  />
                  <Icon size={16} strokeWidth={2} aria-hidden />
                  {label}
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className={styles.row}>
        <DatePicker id={`${idPrefix}-date`} label="날짜" value={date} onChange={setDate} />
        <TextField
          id={`${idPrefix}-memo`}
          label="메모"
          icon={PenLine}
          type="text"
          maxLength={50}
          placeholder={MEMO_PLACEHOLDER[type]}
        />
      </div>

      <Button type="submit" disabled={amount === ''}>
        기록하기
      </Button>
    </form>
  );
}
