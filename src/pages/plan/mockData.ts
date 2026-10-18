// todo: 기능 연결 시 삭제 (퍼블리싱용 목업)
import type { RecurringTransaction } from '@/features/recurring/model/recurring';

// 예정 지출: 기간 없이 적어 두는 위시리스트형 메모
export type PlannedExpense = {
  id: string;
  memo: string;
  amount: number;
  done: boolean; // 지출했으면 체크
};

export const MOCK_PLANNED: PlannedExpense[] = [
  { id: 'p1', memo: '에어팟 프로 교체', amount: 359_000, done: false },
  { id: 'p2', memo: '친구 결혼식 축의금', amount: 100_000, done: false },
  { id: 'p3', memo: '제주도 비행기표', amount: 128_000, done: false },
  { id: 'p4', memo: '자동차 보험 갱신', amount: 312_000, done: false },
  { id: 'p5', memo: '치과 스케일링', amount: 25_000, done: true },
  { id: 'p6', memo: '겨울 코트', amount: 189_000, done: true },
];

export const MOCK_RECURRING: RecurringTransaction[] = [
  { id: 'r1', type: 'income', category: null, amount: 3_200_000, memo: '월급', dayOfMonth: 25 },
  { id: 'r2', type: 'expense', category: 'living', amount: 550_000, memo: '월세', dayOfMonth: 1 },
  {
    id: 'r3',
    type: 'expense',
    category: 'living',
    amount: 59_000,
    memo: '휴대폰 요금',
    dayOfMonth: 15,
  },
  { id: 'r4', type: 'expense', category: 'etc', amount: 17_000, memo: '넷플릭스', dayOfMonth: 20 },
  {
    id: 'r5',
    type: 'expense',
    category: 'transport',
    amount: 62_000,
    memo: '교통 정기권',
    dayOfMonth: 5,
  },
  {
    id: 'r6',
    type: 'expense',
    category: 'social',
    amount: 30_000,
    memo: '독서 모임 회비',
    dayOfMonth: 28,
  },
  {
    id: 'r7',
    type: 'expense',
    category: 'shopping',
    amount: 9_900,
    memo: '쿠팡 와우',
    dayOfMonth: 22,
  },
  {
    id: 'r8',
    type: 'transfer',
    category: null,
    amount: 500_000,
    memo: '청년 적금',
    dayOfMonth: 26,
  },
];
