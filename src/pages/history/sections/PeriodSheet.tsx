import { useState } from 'react';
import Button from '@/shared/ui/Button/Button';
import Modal from '@/shared/ui/Modal/Modal';
import { formatPeriod, type Period } from '../lib/period';
import PeriodFilter from './PeriodFilter';
import styles from './PeriodSheet.module.css';

type PeriodSheetProps = {
  open: boolean;
  value: Period;
  onApply: (value: Period) => void;
  onClose: () => void;
};

/* 조회 기간 선택 시트 */
export default function PeriodSheet({ open, value, onApply, onClose }: PeriodSheetProps) {
  const [draft, setDraft] = useState(value);
  const [wasOpen, setWasOpen] = useState(open);

  // 열릴 때마다 현재 적용된 기간에서 시작
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setDraft(value);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        <>
          조회 기간
          <span className={styles.range}>{formatPeriod(draft)}</span>
        </>
      }
    >
      <div className={styles.body}>
        <PeriodFilter name="history-period" value={draft} onChange={setDraft} />
        <Button type="button" onClick={() => onApply(draft)}>
          이 기간으로 조회하기
        </Button>
      </div>
    </Modal>
  );
}
