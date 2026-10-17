import { useEffect, useId, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
};

/* 모바일 바텀시트 / 600px 이상 가운데 다이얼로그 */
export default function Modal({ open, onClose, title, description, header, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      // 패널 바깥(배경) 클릭 시 닫기
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.panel}>
        <header className={styles.header}>
          {header ? (
            <div className={styles.custom}>
              <h2 id={titleId} className="sr-only">
                {title}
              </h2>
              {header}
            </div>
          ) : (
            <div className={styles.heading}>
              <h2 id={titleId} className={styles.title}>
                {title}
              </h2>
              {description && <p className={styles.description}>{description}</p>}
            </div>
          )}
          <button type="button" className={styles.close} aria-label="닫기" onClick={onClose}>
            <X size={20} strokeWidth={2} aria-hidden />
          </button>
        </header>
        {children}
      </div>
    </dialog>
  );
}
