import { useState, type FormEvent } from 'react';
import { formatAmountInput, parseAmount } from '@/shared/lib/formatAmount';
import AmountInput from '@/shared/ui/AmountInput/AmountInput';
import Button from '@/shared/ui/Button/Button';
import { useToastStore } from '@/stores/useToastStore';
import { useSaveBudget } from '../api/useSaveBudget';
import styles from './BudgetForm.module.css';

type BudgetFormProps = {
  monthKey: string;
  initialAmount: number | null;
  onDone: () => void;
};

/* 월 예산 등록·수정 */
export default function BudgetForm({ monthKey, initialAmount, onDone }: BudgetFormProps) {
  const showToast = useToastStore((s) => s.show);
  const saveBudget = useSaveBudget();
  const [amount, setAmount] = useState(() =>
    initialAmount === null ? '' : formatAmountInput(String(initialAmount)),
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveBudget.mutate(
      { monthKey, amount: parseAmount(amount) },
      {
        onSuccess: () => {
          showToast(initialAmount === null ? '예산을 등록했어요.' : '예산을 수정했어요.');
          onDone();
        },
        onError: () => showToast('예산을 저장하지 못했어요. 잠시 후 다시 시도해 주세요.', 'error'),
      },
    );
  };

  return (
    <form className={styles.form} noValidate onSubmit={onSubmit}>
      <AmountInput id="budget-amount" label="한 달 예산" value={amount} onChange={setAmount} />
      <Button type="submit" disabled={amount === '' || saveBudget.isPending}>
        {initialAmount === null ? '예산 등록하기' : '예산 저장하기'}
      </Button>
    </form>
  );
}
