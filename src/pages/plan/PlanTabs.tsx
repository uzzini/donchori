import { useRef, type KeyboardEvent } from 'react';
import { PLAN_TABS, panelId, tabId, type PlanTab } from './lib/planTab';
import styles from './PlanTabs.module.css';

type PlanTabsProps = {
  value: PlanTab;
  onChange: (value: PlanTab) => void;
  counts: Record<PlanTab, number | undefined>; // 불러오는 중이면 undefined → 숫자 숨김
};

/* 계획 화면 탭 */
export default function PlanTabs({ value, onChange, counts }: PlanTabsProps) {
  const refs = useRef<Partial<Record<PlanTab, HTMLButtonElement | null>>>({});

  // 좌우 방향키로 탭 이동
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const index = PLAN_TABS.findIndex((t) => t.value === value);
    const step = e.key === 'ArrowRight' ? 1 : -1;
    const next = PLAN_TABS[(index + step + PLAN_TABS.length) % PLAN_TABS.length].value;
    onChange(next);
    refs.current[next]?.focus();
  };

  return (
    <div className={styles.tabs} role="tablist" aria-label="계획" onKeyDown={onKeyDown}>
      {PLAN_TABS.map((tab) => {
        const selected = tab.value === value;
        return (
          <button
            key={tab.value}
            ref={(el) => {
              refs.current[tab.value] = el;
            }}
            id={tabId(tab.value)}
            type="button"
            role="tab"
            className={styles.tab}
            aria-selected={selected}
            aria-controls={panelId(tab.value)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
            {counts[tab.value] !== undefined && (
              <span className={`amount ${styles.count}`}>
                {counts[tab.value]}
                <span className="sr-only">건</span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
