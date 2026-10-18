import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { PenLine } from 'lucide-react';
import { TYPE_LABEL, type TransactionType } from '@/features/transaction/model/category';
import CategoryChips from '@/features/transaction/ui/CategoryChips';
import TypeTabs from '@/features/transaction/ui/TypeTabs';
import { formatAmountInput, parseAmount } from '@/shared/lib/formatAmount';
import AmountInput from '@/shared/ui/AmountInput/AmountInput';
import Button from '@/shared/ui/Button/Button';
import TextField from '@/shared/ui/TextField/TextField';
import { useToastStore } from '@/stores/useToastStore';
import { useSaveRecurring } from '../api/useSaveRecurring';
import { recurringName, type RecurringTransaction } from '../model/recurring';
import { recurringSchema, type RecurringFormValues } from '../model/recurringSchema';
import DayOfMonthPicker from './DayOfMonthPicker';
import styles from './RecurringForm.module.css';

const MEMO_PLACEHOLDER: Record<TransactionType, string> = {
  expense: '월세, 보험료, 통신비…',
  income: '월급, 용돈…',
  transfer: '적금, 저축 통장…',
};

type RecurringFormProps = {
  idPrefix: string; // 한 화면에 여러 개 둘 때 id 충돌 방지
  initial?: RecurringTransaction;
  onDone?: () => void;
};

const toFormValues = (item?: RecurringTransaction): RecurringFormValues =>
  item
    ? {
        type: item.type,
        amount: formatAmountInput(String(item.amount)),
        category: item.category,
        dayOfMonth: item.dayOfMonth,
        memo: item.memo,
      }
    : { type: 'expense', amount: '', category: null, dayOfMonth: dayjs().date(), memo: '' };

/* 반복 거래 등록·수정 */
export default function RecurringForm({ idPrefix, initial, onDone }: RecurringFormProps) {
  const showToast = useToastStore((s) => s.show);
  const saveRecurring = useSaveRecurring();
  const isEdit = initial !== undefined;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RecurringFormValues>({
    resolver: zodResolver(recurringSchema),
    defaultValues: toFormValues(initial),
  });

  const [type, amount, category] = useWatch({ control, name: ['type', 'amount', 'category'] });
  const isFilled = amount !== '' && (type !== 'expense' || category !== null);

  const onSubmit = handleSubmit((values) => {
    saveRecurring.mutate(
      {
        id: initial?.id,
        type: values.type,
        category: values.type === 'expense' ? values.category : null,
        amount: parseAmount(values.amount),
        memo: values.memo,
        dayOfMonth: values.dayOfMonth,
      },
      {
        onSuccess: () => {
          showToast(`${recurringName(values)} 거래를 ${isEdit ? '수정' : '등록'}했어요.`);
          if (!isEdit) reset({ ...values, amount: '', category: null, memo: '' });
          onDone?.();
        },
        onError: () =>
          showToast(
            `반복 거래를 ${isEdit ? '수정' : '등록'}하지 못했어요. 잠시 후 다시 시도해 주세요.`,
            'error',
          ),
      },
    );
  });

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
            error={errors.amount?.message}
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
              error={errors.category?.message}
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
          error={errors.memo?.message}
          {...register('memo')}
        />
      </div>

      <Button type="submit" disabled={!isFilled || saveRecurring.isPending}>
        {isEdit ? '변경 내용 저장하기' : '반복 거래 등록하기'}
      </Button>
    </form>
  );
}
