import type { CSSProperties } from 'react';
import { CATEGORY_META, type CategoryKey } from '../model/category';
import styles from './CategoryIcon.module.css';

type CategoryIconProps = {
  category: CategoryKey;
  size?: 'sm' | 'md';
};

const PLAIN = new Set<CategoryKey>(['income', 'transfer']);

/* 카테고리 색 원형 배경 + 아이콘 */
export default function CategoryIcon({ category, size = 'md' }: CategoryIconProps) {
  const { icon: Icon, color } = CATEGORY_META[category];

  return (
    <span
      className={`${styles.icon} ${styles[size]}${PLAIN.has(category) ? ` ${styles.plain}` : ''}`}
      style={{ '--cat-color': color } as CSSProperties}
      aria-hidden
    >
      <Icon size={size === 'sm' ? 16 : 20} strokeWidth={1.75} />
    </span>
  );
}
