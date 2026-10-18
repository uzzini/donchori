import type { ComponentProps } from 'react';
import { CircleAlert } from 'lucide-react';
import { formatAmountInput } from '@/shared/lib/formatAmount';
import styles from './AmountInput.module.css';

type AmountInputProps = Omit<ComponentProps<'input'>, 'value' | 'onChange'> & {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
};

/* 금액 입력 */
export default function AmountInput({
  id,
  label,
  value,
  onChange,
  error,
  className,
  ...inputProps
}: AmountInputProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={className ? `${styles.amount} ${className}` : styles.amount}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.field}>
        <input
          {...inputProps}
          id={id}
          className="amount"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="0"
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          value={value}
          onChange={(e) => onChange(formatAmountInput(e.target.value))}
        />
        <span aria-hidden>원</span>
      </div>
      {error && (
        <p id={errorId} className={styles.error}>
          <CircleAlert size={14} strokeWidth={2} aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}
