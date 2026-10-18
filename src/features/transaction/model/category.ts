import {
  ArrowLeftRight,
  Bus,
  Ellipsis,
  House,
  ShoppingBag,
  Users,
  UtensilsCrossed,
  Wallet,
  type LucideIcon,
} from 'lucide-react';

export const TRANSACTION_TYPES = ['expense', 'income', 'transfer'] as const;

export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export const TYPE_LABEL: Record<TransactionType, string> = {
  expense: '지출',
  income: '수입',
  transfer: '이체',
};

export const EXPENSE_CATEGORIES = [
  'living',
  'food',
  'transport',
  'shopping',
  'social',
  'etc',
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

// 아이콘으로 표시할 수 있는 분류: 지출 카테고리 + 수입·이체
export type CategoryKey = ExpenseCategory | 'income' | 'transfer';

type CategoryMeta = {
  label: string;
  icon: LucideIcon;
  color: string; // CSS 색상값 (토큰 변수)
};

export const CATEGORY_META: Record<CategoryKey, CategoryMeta> = {
  living: { label: '생활', icon: House, color: 'var(--cat-living)' },
  food: { label: '식비', icon: UtensilsCrossed, color: 'var(--cat-food)' },
  transport: { label: '교통', icon: Bus, color: 'var(--cat-transport)' },
  shopping: { label: '쇼핑', icon: ShoppingBag, color: 'var(--cat-shopping)' },
  social: { label: '만남', icon: Users, color: 'var(--cat-social)' },
  etc: { label: '기타', icon: Ellipsis, color: 'var(--cat-etc)' },
  income: { label: '수입', icon: Wallet, color: 'var(--income)' },
  transfer: { label: '이체', icon: ArrowLeftRight, color: 'var(--text-tertiary)' },
};
