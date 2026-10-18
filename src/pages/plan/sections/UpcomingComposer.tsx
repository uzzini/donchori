import { useRef, useState, type FormEvent } from 'react';
import { Coins, PenLine, Plus } from 'lucide-react';
import { useCreatePlannedExpense } from '@/features/plan/api/useCreatePlannedExpense';
import { formatAmountInput, parseAmount } from '@/shared/lib/formatAmount';
import TextField from '@/shared/ui/TextField/TextField';
import { useToastStore } from '@/stores/useToastStore';
import styles from './UpcomingComposer.module.css';

/* 예정 지출 한 줄 추가 (메모 · 금액) */
export default function UpcomingComposer() {
  const showToast = useToastStore((s) => s.show);
  const createPlanned = useCreatePlannedExpense();
  const memoRef = useRef<HTMLInputElement>(null);
  const [memo, setMemo] = useState('');
  const [amount, setAmount] = useState('');

  const isFilled = memo.trim() !== '' && amount !== '';

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFilled || createPlanned.isPending) return;

    const trimmed = memo.trim();
    createPlanned.mutate(
      { memo: trimmed, amount: parseAmount(amount) },
      {
        onSuccess: () => {
          showToast(`'${trimmed}' 예정 지출을 추가했어요.`);
          setMemo('');
          setAmount('');
          memoRef.current?.focus();
        },
        onError: () =>
          showToast('예정 지출을 추가하지 못했어요. 잠시 후 다시 시도해 주세요.', 'error'),
      },
    );
  };

  return (
    <form className={styles.form} noValidate onSubmit={onSubmit}>
      <TextField
        ref={memoRef}
        id="planned-memo"
        label="메모"
        hideLabel
        icon={PenLine}
        type="text"
        maxLength={50}
        placeholder="무엇에 지출이 생길 예정인가요?"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <div className={styles.row}>
        <TextField
          id="planned-amount"
          label="예상 금액"
          hideLabel
          icon={Coins}
          className="amount"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="예상 금액"
          value={amount}
          onChange={(e) => setAmount(formatAmountInput(e.target.value))}
          trailing={<span className={styles.unit}>원</span>}
        />
        <button
          type="submit"
          className={styles.add}
          disabled={!isFilled || createPlanned.isPending}
        >
          <Plus size={18} strokeWidth={2.25} aria-hidden />
          추가하기
        </button>
      </div>
    </form>
  );
}
