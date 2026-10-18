import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useDeleteRecurring } from '@/features/recurring/api/useDeleteRecurring';
import { recurringName, type RecurringTransaction } from '@/features/recurring/model/recurring';
import RecurringForm from '@/features/recurring/ui/RecurringForm';
import Modal from '@/shared/ui/Modal/Modal';
import { useToastStore } from '@/stores/useToastStore';
import styles from './RecurringEditModal.module.css';

type RecurringEditModalProps = {
  item: RecurringTransaction | null;
  onClose: () => void;
};

/* 반복 거래 수정·삭제 */
export default function RecurringEditModal({ item, onClose }: RecurringEditModalProps) {
  return (
    <Modal open={item !== null} onClose={onClose} title="반복 거래 수정">
      {item && <EditBody key={item.id} item={item} onClose={onClose} />}
    </Modal>
  );
}

function EditBody({ item, onClose }: { item: RecurringTransaction; onClose: () => void }) {
  const showToast = useToastStore((s) => s.show);
  const deleteRecurring = useDeleteRecurring();
  const [confirming, setConfirming] = useState(false);

  const name = recurringName(item);

  const onDelete = () =>
    deleteRecurring.mutate(item.id, {
      onSuccess: () => {
        showToast(`${name} 거래를 삭제했어요.`);
        onClose();
      },
      onError: () =>
        showToast('반복 거래를 삭제하지 못했어요. 잠시 후 다시 시도해 주세요.', 'error'),
    });

  return (
    <div className={styles.body}>
      <RecurringForm idPrefix="recurring-edit" initial={item} onDone={onClose} />

      {confirming ? (
        <div className={styles.confirm} role="alert">
          <p>
            <strong>{name}</strong> 거래를 삭제할까요?
            <br />
            삭제하면 되돌릴 수 없어요.
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              autoFocus
              onClick={() => setConfirming(false)}
            >
              취소
            </button>
            <button
              type="button"
              className={styles.danger}
              disabled={deleteRecurring.isPending}
              onClick={onDelete}
            >
              삭제하기
            </button>
          </div>
        </div>
      ) : (
        <button type="button" className={styles.deleteLink} onClick={() => setConfirming(true)}>
          <Trash2 size={16} strokeWidth={2} aria-hidden />이 반복 거래 삭제
        </button>
      )}
    </div>
  );
}
