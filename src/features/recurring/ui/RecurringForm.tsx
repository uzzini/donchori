import type { FormEvent } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import dayjs from 'dayjs';
import { PenLine } from 'lucide-react';
import {
  TYPE_LABEL,
  type ExpenseCategory,
  type TransactionType,
} from '@/features/transaction/model/category';
import CategoryChips from '@/features/transaction/ui/CategoryChips';
import TypeTabs from '@/features/transaction/ui/TypeTabs';
import AmountInput from '@/shared/ui/AmountInput/AmountInput';
import Button from '@/shared/ui/Button/Button';
import TextField from '@/shared/ui/TextField/TextField';
import DayOfMonthPicker from './DayOfMonthPicker';
import styles from './RecurringForm.module.css';

type RecurringFormValues = {
  type: TransactionType;
  amount: string;
  category: ExpenseCategory | null;
  dayOfMonth: number;
  memo: string;
};

const MEMO_PLACEHOLDER: Record<TransactionType, string> = {
  expense: '월세, 보험료, 통신비…',
  income: '월급, 용돈…',
  transfer: '적금, 저축 통장…',
};

/* 반복 거래 등록 */
export default function RecurringForm({ idPrefix }: { idPrefix: string }) {
  const { register, control, setValue } = useForm<RecurringFormValues>({
    defaultValues: {
      type: 'expense',
      amount: '',
      category: null,
      dayOfMonth: dayjs().date(),
      memo: '',
    },
  });

  const [type, amount, category] = useWatch({ control, name: ['type', 'amount', 'category'] });
  const isFilled = amount !== '' && (type !== 'expense' || category !== null);

  // todo: 반복 거래 저장 연결
  const onSubmit = (e: FormEvent) => e.preventDefault();

  return (
    <form className={styles.form} noValidate onSubmit={onSubmit}>
      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <TypeTabs
            name={`${idPrefix}-type`}
            value={field.value}
            onChange={(next) => {
              field.onChange(next);
              setValue('category', null);
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="amount"
        render={({ field: { ref, value, onChange, onBlur } }) => (
          <AmountInput
            ref={ref}
            id={`${idPrefix}-amount`}
            label={`매달 ${TYPE_LABEL[type]} 금액`}
            className={styles[type]}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      />

      {type === 'expense' && (
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <CategoryChips
              name={`${idPrefix}-category`}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      )}

      <div className={styles.row}>
        <Controller
          control={control}
          name="dayOfMonth"
          render={({ field: { value, onChange } }) => (
            <DayOfMonthPicker
              id={`${idPrefix}-day`}
              label="반복일"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <TextField
          id={`${idPrefix}-memo`}
          label="메모"
          icon={PenLine}
          type="text"
          maxLength={50}
          placeholder={MEMO_PLACEHOLDER[type]}
          {...register('memo')}
        />
      </div>

      <Button type="submit" disabled={!isFilled}>
        반복 거래 등록하기
      </Button>
    </form>
  );
}
