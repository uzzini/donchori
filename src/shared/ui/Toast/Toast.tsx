import { useEffect } from 'react';
import { CircleAlert, CircleCheck } from 'lucide-react';
import { useToastStore } from '@/stores/useToastStore';
import styles from './Toast.module.css';

const DURATION = 3000;

/* 하단 가운데 토스트 */
export default function Toast() {
  const toast = useToastStore((s) => s.toast);
  const open = useToastStore((s) => s.open);
  const hide = useToastStore((s) => s.hide);
  const clear = useToastStore((s) => s.clear);

  // 새 토스트가 뜰 때마다 타이머 다시 시작
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(hide, DURATION);
    return () => window.clearTimeout(timer);
  }, [toast, hide]);

  const Icon = toast?.tone === 'error' ? CircleAlert : CircleCheck;

  return (
    <div className={styles.viewport} role="status" aria-live="polite">
      {toast && (
        <p
          key={toast.id}
          className={styles.toast}
          data-open={open}
          onTransitionEnd={(e) => {
            if (!open && e.propertyName === 'opacity') clear();
          }}
        >
          <Icon size={18} strokeWidth={2} aria-hidden />
          {toast.message}
        </p>
      )}
    </div>
  );
}
