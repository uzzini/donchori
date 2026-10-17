import { useState } from 'react';
import dayjs from 'dayjs';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { WEEKDAYS } from '@/shared/lib/weekday';
import Calendar, { CalendarNav } from '@/shared/ui/Calendar/Calendar';
import Modal from '@/shared/ui/Modal/Modal';
import styles from './DatePicker.module.css';

type DatePickerProps = {
  id: string;
  label: string;
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
};

export default function DatePicker({ id, label, value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(() => dayjs(value).startOf('month'));
  const date = dayjs(value);

  const onOpen = () => {
    setMonth(date.startOf('month'));
    setOpen(true);
  };

  return (
    <div className={styles.group}>
      <span id={`${id}-label`} className={styles.label}>
        {label}
      </span>
      <button
        id={id}
        type="button"
        className={styles.field}
        aria-labelledby={`${id}-label ${id}`}
        aria-haspopup="dialog"
        onClick={onOpen}
      >
        <CalendarDays className={styles.icon} size={18} strokeWidth={2} aria-hidden />
        <span className={styles.value}>
          {date.format('YYYY년 M월 D일')} ({WEEKDAYS[date.day()]})
        </span>
        <ChevronDown className={styles.icon} size={18} strokeWidth={2} aria-hidden />
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="날짜 선택"
        header={<CalendarNav month={month} onMonthChange={setMonth} />}
      >
        <Calendar
          month={month}
          value={value}
          onChange={(next) => {
            onChange(next);
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
