import type {
  CategoryKey,
  ExpenseCategory,
  TransactionType,
} from '@/features/transaction/model/category';

/* 퍼블리싱용 임시 데이터
 todo: API 연동 시 쿼리 훅으로 교체
*/

export type Transaction = {
  id: string;
  type: TransactionType;
  category: CategoryKey;
  title: string;
  time: string;
  amount: number;
};

export type UpcomingExpense = {
  id: string;
  memo: string;
  amount: number;
};

export const MOCK_SUMMARY = {
  income: 2_850_000,
  expense: 384_200,
};

// null이면 예산 미설정
export const MOCK_BUDGET: number | null = 1_000_000;

export const MOCK_UPCOMING: UpcomingExpense[] = [
  { id: 'u1', memo: '넷플릭스', amount: 17_000 },
  { id: 'u2', memo: '통신비', amount: 55_000 },
  { id: 'u3', memo: '헬스장', amount: 69_000 },
];

export const MOCK_TOP_CATEGORIES: { category: ExpenseCategory; amount: number }[] = [
  { category: 'food', amount: 142_300 },
  { category: 'shopping', amount: 89_000 },
  { category: 'living', amount: 64_500 },
  { category: 'social', amount: 48_000 },
  { category: 'transport', amount: 27_400 },
  { category: 'etc', amount: 13_000 },
];

export const MOCK_RECENT: { label: string; items: Transaction[] }[] = [
  {
    label: '오늘',
    items: [
      {
        id: 't1',
        type: 'expense',
        category: 'food',
        title: '점심 김치찌개',
        time: '12:40',
        amount: 9_500,
      },
      {
        id: 't2',
        type: 'expense',
        category: 'transport',
        title: '지하철',
        time: '08:52',
        amount: 1_550,
      },
      {
        id: 't3',
        type: 'transfer',
        category: 'transfer',
        title: '적금 이체',
        time: '08:00',
        amount: 300_000,
      },
    ],
  },
  {
    label: '어제',
    items: [
      {
        id: 't4',
        type: 'expense',
        category: 'social',
        title: '대학 동기 저녁',
        time: '20:15',
        amount: 32_000,
      },
      {
        id: 't5',
        type: 'expense',
        category: 'shopping',
        title: '무신사',
        time: '15:03',
        amount: 59_000,
      },
      {
        id: 't6',
        type: 'income',
        category: 'income',
        title: '중고거래 판매',
        time: '11:20',
        amount: 25_000,
      },
    ],
  },
];
