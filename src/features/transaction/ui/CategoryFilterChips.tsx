import { useEffect, useRef, type CSSProperties } from 'react';
import { LayoutGrid } from 'lucide-react';
import { CATEGORY_META, EXPENSE_CATEGORIES, type CategoryKey } from '../model/category';
import styles from './CategoryFilterChips.module.css';

export type CategoryFilter = 'all' | CategoryKey;

const OPTIONS: CategoryFilter[] = ['all', 'income', ...EXPENSE_CATEGORIES, 'transfer'];

type CategoryFilterChipsProps = {
  name: string;
  value: CategoryFilter;
  onChange: (value: CategoryFilter) => void;
  hideLabel?: boolean;
};

/* 내역 필터용 카테고리 칩*/
export default function CategoryFilterChips({
  name,
  value,
  onChange,
  hideLabel = false,
}: CategoryFilterChipsProps) {
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chipsRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      const atEdge = e.deltaY < 0 ? el.scrollLeft <= 0 : el.scrollLeft >= max - 1;
      if (max <= 0 || atEdge) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <fieldset className={styles.fieldset}>
      <legend className={hideLabel ? 'sr-only' : styles.label}>카테고리</legend>
      <div ref={chipsRef} className={styles.chips}>
        {OPTIONS.map((key) => {
          const meta = key === 'all' ? null : CATEGORY_META[key];
          const Icon = meta?.icon ?? LayoutGrid;
          return (
            <label
              key={key}
              className={styles.chip}
              style={{ '--cat-color': meta?.color ?? 'var(--text)' } as CSSProperties}
            >
              <input
                type="radio"
                name={name}
                value={key}
                checked={value === key}
                onChange={() => onChange(key)}
              />
              <Icon size={16} strokeWidth={2} aria-hidden />
              {meta?.label ?? '전체'}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
