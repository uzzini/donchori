import { useState, type FormEvent } from 'react';
import { Coins, PenLine, Plus } from 'lucide-react';
import { formatAmountInput } from '@/shared/lib/formatAmount';
import TextField from '@/shared/ui/TextField/TextField';
import styles from './UpcomingComposer.module.css';

/* 예정 지출 한 줄 추가 (메모 · 금액) */
export default function UpcomingComposer() {
  const [memo, setMemo] = useState('');
  const [amount, setAmount] = useState('');

  // todo: 예정 지출 저장 연결
  const onSubmit = (e: FormEvent) => e.preventDefault();

  return (
    <form className={styles.form} noValidate onSubmit={onSubmit}>
      <TextField
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
        <button type="submit" className={styles.add} disabled={memo.trim() === '' || amount === ''}>
          <Plus size={18} strokeWidth={2.25} aria-hidden />
          추가하기
        </button>
      </div>
    </form>
  );
}
