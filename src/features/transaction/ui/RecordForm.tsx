import type { CSSProperties } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { CircleAlert, PenLine } from 'lucide-react';
import { parseAmount } from '@/shared/lib/formatAmount';
import AmountInput from '@/shared/ui/AmountInput/AmountInput';
import Button from '@/shared/ui/Button/Button';
import DatePicker from '@/shared/ui/DatePicker/DatePicker';
import TextField from '@/shared/ui/TextField/TextField';
import { useToastStore } from '@/stores/useToastStore';
import { useCreateTransaction } from '../api/useCreateTransaction';
import { CATEGORY_META, EXPENSE_CATEGORIES, type TransactionType } from '../model/category';
import { recordSchema, type RecordFormValues } from '../model/recordSchema';
import styles from './RecordForm.module.css';

const TYPES: { value: TransactionType; label: string }[] = [
  { value: 'expense', label: '지출' },
  { value: 'income', label: '수입' },
  { value: 'transfer', label: '이체' },
];

const MEMO_PLACEHOLDER: Record<TransactionType, string> = {
  expense: '어디에 썼나요?',
  income: '어디서 들어왔나요?',
  transfer: '어디로 보냈나요?',
};

const today = () => dayjs().format('YYYY-MM-DD');

type RecordFormProps = {
  idPrefix: string; // 한 화면에 여러 개 둘 때 id 충돌 방지
};

/* 수입·지출·이체 기록 입력 카드 */
export default function RecordForm({ idPrefix }: RecordFormProps) {
  const showToast = useToastStore((s) => s.show);
  const createTransaction = useCreateTransaction();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RecordFormValues>({
    resolver: zodResolver(recordSchema),
    defaultValues: { type: 'expense', amount: '', category: null, date: today(), memo: '' },
  });

  const [type, amount, category] = useWatch({ control, name: ['type', 'amount', 'category'] });
  const typeLabel = TYPES.find((t) => t.value === type)!.label;
  const isFilled = amount !== '' && (type !== 'expense' || category !== null);

  const onSubmit = handleSubmit((values) => {
    createTransaction.mutate(
      {
        type: values.type,
        category: values.type === 'expense' ? values.category : null,
        amount: parseAmount(values.amount),
        memo: values.memo,
        occurredOn: values.date,
      },
      {
        onSuccess: () => {
          showToast(`${typeLabel} ${values.amount}원을 기록했어요.`);
          reset({ ...values, amount: '', category: null, memo: '' });
        },
        onError: () => showToast('기록하지 못했어요. 잠시 후 다시 시도해 주세요.', 'error'),
      },
    );
  });

  return (
    <form className={styles.form} noValidate onSubmit={onSubmit}>
      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <div className={styles.tabs} role="radiogroup" aria-label="기록 유형">
            {TYPES.map((t) => (
              <label key={t.value} className={styles.tab}>
                <input
                  type="radio"
                  name={`${idPrefix}-type`}
                  value={t.value}
                  checked={field.value === t.value}
                  onChange={() => {
                    field.onChange(t.value);
                    setValue('category', null);
                  }}
                />
                {t.label}
              </label>
            ))}
          </div>
        )}
      />

      <Controller
        control={control}
        name="amount"
        render={({ field: { ref, value, onChange, onBlur } }) => (
          <AmountInput
            ref={ref}
            id={`${idPrefix}-amount`}
            label={`${typeLabel} 금액`}
            className={styles[type]}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.amount?.message}
          />
        )}
      />

      {/* 카테고리는 지출만 (수입·이체는 금액·날짜·메모만) */}
      {type === 'expense' && (
        <fieldset className={styles.fieldset}>
          <legend className={styles.label}>카테고리</legend>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
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
                        name={`${idPrefix}-category`}
                        value={key}
                        checked={field.value === key}
                        onChange={() => field.onChange(key)}
                      />
                      <Icon size={16} strokeWidth={2} aria-hidden />
                      {label}
                    </label>
                  );
                })}
              </div>
            )}
          />
          {errors.category && (
            <p className={styles.error}>
              <CircleAlert size={14} strokeWidth={2} aria-hidden />
              {errors.category.message}
            </p>
          )}
        </fieldset>
      )}

      <div className={styles.row}>
        <Controller
          control={control}
          name="date"
          render={({ field: { value, onChange } }) => (
            <DatePicker id={`${idPrefix}-date`} label="날짜" value={value} onChange={onChange} />
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

      <Button type="submit" disabled={!isFilled || createTransaction.isPending}>
        기록하기
      </Button>
    </form>
  );
}
