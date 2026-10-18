import { Check, Trash2 } from 'lucide-react';
import { useDeletePlannedExpense } from '@/features/plan/api/useDeletePlannedExpense';
import { useTogglePlannedExpense } from '@/features/plan/api/useTogglePlannedExpense';
import type { PlannedExpense } from '@/features/plan/model/plannedExpense';
import { formatWon } from '@/shared/lib/formatAmount';
import Section from '@/shared/ui/Section/Section';
import { useToastStore } from '@/stores/useToastStore';
import UpcomingComposer from './UpcomingComposer';
import styles from './UpcomingChecklist.module.css';

type UpcomingChecklistProps = {
  items: PlannedExpense[];
  className?: string;
};

function ChecklistItem({ item }: { item: PlannedExpense }) {
  const showToast = useToastStore((s) => s.show);
  const togglePlanned = useTogglePlannedExpense();
  const deletePlanned = useDeletePlannedExpense();

  const onToggle = (done: boolean) =>
    togglePlanned.mutate(
      { id: item.id, done },
      {
        onError: () =>
          showToast('체크 상태를 저장하지 못했어요. 잠시 후 다시 시도해 주세요.', 'error'),
      },
    );

  const onDelete = () =>
    deletePlanned.mutate(item.id, {
      onSuccess: () => showToast(`'${item.memo}' 예정 지출을 삭제했어요.`),
      onError: () =>
        showToast('예정 지출을 삭제하지 못했어요. 잠시 후 다시 시도해 주세요.', 'error'),
    });

  return (
    <li className={styles.item}>
      <label className={styles.check}>
        <input type="checkbox" checked={item.done} onChange={(e) => onToggle(e.target.checked)} />
        <span className={styles.box} aria-hidden>
          <Check size={14} strokeWidth={3} />
        </span>
        <span className={styles.memo}>{item.memo}</span>
        <span className={`amount ${styles.amount}`}>{formatWon(item.amount)}</span>
      </label>
      <button
        type="button"
        className={styles.delete}
        aria-label={`${item.memo} 삭제`}
        title="삭제"
        onClick={onDelete}
      >
        <Trash2 size={16} strokeWidth={1.75} aria-hidden />
      </button>
    </li>
  );
}

/* 예정 지출 체크리스트: 추가 + 남은 항목 + 완료 항목 */
export default function UpcomingChecklist({ items, className }: UpcomingChecklistProps) {
  const todo = items.filter((item) => !item.done);
  const done = items.filter((item) => item.done);

  return (
    <Section
      title="예정 지출"
      className={className}
      action={
        items.length > 0 && (
          <span className={`amount ${styles.count}`}>
            {done.length}/{items.length} 완료
          </span>
        )
      }
    >
      <UpcomingComposer />

      {items.length === 0 ? (
        <p className={styles.empty}>
          아직 적어 둔 예정 지출이 없어요.
          <br />곧 나갈 돈을 미리 메모해 두세요.
        </p>
      ) : (
        <div className={styles.body}>
          {todo.length > 0 ? (
            <ul className={styles.list}>
              {todo.map((item) => (
                <ChecklistItem key={item.id} item={item} />
              ))}
            </ul>
          ) : (
            <div className={styles.allDone}>
              <span className={styles.coin} aria-hidden>
                <img
                  className={styles.light}
                  src="/icons/coin-icon.svg"
                  width={576}
                  height={588}
                  alt=""
                />
                <img
                  className={styles.dark}
                  src="/icons/coin-dark-icon.svg"
                  width={576}
                  height={588}
                  alt=""
                />
              </span>
              <p>적어 둔 예정 지출을 모두 마쳤어요!</p>
            </div>
          )}
          {done.length > 0 && (
            <div className={styles.group}>
              <h3 className={styles.groupTitle}>완료 {done.length}</h3>
              <ul className={styles.list}>
                {done.map((item) => (
                  <ChecklistItem key={item.id} item={item} />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Section>
  );
}
