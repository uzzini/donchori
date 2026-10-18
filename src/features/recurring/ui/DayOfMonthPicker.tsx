import { useState } from 'react';
import { CalendarSync, ChevronDown } from 'lucide-react';
import Modal from '@/shared/ui/Modal/Modal';
import fieldStyles from '@/shared/ui/DatePicker/DatePicker.module.css';
import styles from './DayOfMonthPicker.module.css';

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

type DayOfMonthPickerProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
};

/* 매달 반복일 선택 */
export default function DayOfMonthPicker({ id, label, value, onChange }: DayOfMonthPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={fieldStyles.group}>
      <span id={`${id}-label`} className={fieldStyles.label}>
        {label}
      </span>
      <button
        id={id}
        type="button"
        className={fieldStyles.field}
        aria-labelledby={`${id}-label ${id}`}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <CalendarSync className={fieldStyles.icon} size={18} strokeWidth={2} aria-hidden />
        <span className={fieldStyles.value}>매달 {value}일</span>
        <ChevronDown className={fieldStyles.icon} size={18} strokeWidth={2} aria-hidden />
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="반복일 선택">
        <div className={styles.grid} role="radiogroup" aria-label="매달 반복일">
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              role="radio"
              aria-checked={day === value}
              className={styles.day}
              onClick={() => {
                onChange(day);
                setOpen(false);
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
