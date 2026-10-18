import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useDeleteTransaction } from '@/features/transaction/api/useDeleteTransaction';
import { transactionName, type Transaction } from '@/features/transaction/model/transaction';
import RecordForm from '@/features/transaction/ui/RecordForm';
import Modal from '@/shared/ui/Modal/Modal';
import { useToastStore } from '@/stores/useToastStore';
import styles from './TransactionEditModal.module.css';

type TransactionEditModalProps = {
  item: Transaction | null;
  onClose: () => void;
};

/* 거래 내역 수정·삭제 */
export default function TransactionEditModal({ item, onClose }: TransactionEditModalProps) {
  return (
    <Modal open={item !== null} onClose={onClose} title="내역 수정">
      {item && <EditBody key={item.id} item={item} onClose={onClose} />}
    </Modal>
  );
}

function EditBody({ item, onClose }: { item: Transaction; onClose: () => void }) {
  const showToast = useToastStore((s) => s.show);
  const deleteTransaction = useDeleteTransaction();
  const [confirming, setConfirming] = useState(false);

  const name = transactionName(item);

  const onDelete = () =>
    deleteTransaction.mutate(item.id, {
      onSuccess: () => {
        showToast(`${name} 내역을 삭제했어요.`);
        onClose();
      },
      onError: () => showToast('내역을 삭제하지 못했어요. 잠시 후 다시 시도해 주세요.', 'error'),
    });

  return (
    <div className={styles.body}>
      <RecordForm idPrefix="record-edit" initial={item} onDone={onClose} />

      {confirming ? (
        <div className={styles.confirm} role="alert">
          <p>
            <strong>{name}</strong> 내역을 삭제할까요?
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
              disabled={deleteTransaction.isPending}
              onClick={onDelete}
            >
              삭제하기
            </button>
          </div>
        </div>
      ) : (
        <button type="button" className={styles.deleteLink} onClick={() => setConfirming(true)}>
          <Trash2 size={16} strokeWidth={2} aria-hidden />이 내역 삭제
        </button>
      )}
    </div>
  );
}
