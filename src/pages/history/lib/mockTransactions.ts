import dayjs from 'dayjs';
import type { ExpenseCategory, TransactionType } from '@/features/transaction/model/category';
import type { Transaction } from '@/features/transaction/model/transaction';

// [며칠 전, 유형, 카테고리, 금액, 메모]
type MockRow = [number, TransactionType, ExpenseCategory | null, number, string];

const ROWS: MockRow[] = [
  [0, 'expense', 'food', 32500, '점심 김치찌개'],
  [0, 'income', null, 120000, '중고거래 판매'],
  [1, 'expense', 'transport', 1450, '지하철'],
  [1, 'expense', 'food', 6800, '편의점 커피'],
  // 하루 5건 이상
  [2, 'expense', 'food', 9000, '아침 샌드위치'],
  [2, 'expense', 'transport', 2900, '버스'],
  [2, 'expense', 'food', 14000, '점심 회식'],
  [2, 'expense', 'shopping', 48900, '운동화'],
  [2, 'expense', 'social', 35000, '저녁 친구 모임'],
  [2, 'expense', 'living', 12300, '생활용품'],
  [4, 'transfer', null, 300000, '적금 이체'],
  [5, 'expense', 'living', 82000, '관리비'],
  [7, 'expense', 'social', 64000, '생일 선물'],
  [7, 'expense', 'food', 23000, '배달 치킨'],
  // 수입 · 지출 모두 백만 원 단위
  [8, 'income', null, 2500000, '프리랜서 외주 정산'],
  [8, 'expense', 'shopping', 1380000, '노트북 구매'],
  [9, 'income', null, 3200000, '월급'],
  [10, 'expense', 'food', 11000, '점심 백반'],
  [12, 'expense', 'transport', 4800, ''],
  [13, 'expense', 'shopping', 129000, '겨울 코트'],
  [16, 'transfer', null, 500000, '비상금 통장'],
  [19, 'expense', 'food', 7500, '카페 라떼'],
  [21, 'expense', 'living', 45000, '인터넷·통신비'],
  [24, 'expense', 'food', 18000, '마트 장보기'],
  [27, 'expense', 'social', 42000, '동창 모임'],
  [30, 'income', null, 3200000, '월급'],
  [31, 'expense', 'shopping', 23000, '책 구매'],
  [33, 'expense', 'food', 9500, '점심 국밥'],
  [36, 'expense', 'transport', 62000, '주유'],
  // 1억 이상
  [40, 'income', null, 150000000, '전세 보증금 반환'],
  [40, 'transfer', null, 100000000, '새 집 보증금 송금'],
  [41, 'expense', 'living', 350000, '이사 비용'],
  [45, 'expense', 'food', 27000, '배달 피자'],
  [50, 'expense', 'etc', 15000, '병원비'],
  [55, 'transfer', null, 300000, '적금 이체'],
  [58, 'expense', 'social', 88000, '결혼식 축의금'],
  [61, 'income', null, 3200000, '월급'],
  [64, 'expense', 'food', 12000, '점심 파스타'],
  [70, 'expense', 'shopping', 76000, '이어폰'],
  [77, 'expense', 'living', 82000, '관리비'],
  [84, 'expense', 'transport', 1450, '지하철'],
  [91, 'income', null, 3200000, '월급'],
  [95, 'expense', 'food', 34000, '가족 외식'],
  [103, 'expense', 'etc', 9900, '구독 서비스'],
  [110, 'expense', 'shopping', 230000, '청소기'],
  [118, 'transfer', null, 300000, '적금 이체'],
  [122, 'income', null, 3200000, '월급'],
  [126, 'expense', 'social', 54000, '회사 동료 저녁'],
  [133, 'expense', 'food', 8000, '카페'],
  [140, 'expense', 'living', 82000, '관리비'],
  [148, 'income', null, 450000, '프리랜스 작업비'],
  [152, 'income', null, 3200000, '월급'],
  [160, 'expense', 'transport', 120000, '기차표'],
  [171, 'expense', 'food', 16500, '점심 초밥'],
  [178, 'expense', 'shopping', 39000, '티셔츠'],
];

const today = dayjs();

/* 퍼블리싱용 목데이터: 오늘 기준 최근 6개월 (최신순) */
export const MOCK_TRANSACTIONS: Transaction[] = ROWS.map(
  ([daysAgo, type, category, amount, memo], i) => ({
    id: `mock-${i}`,
    type,
    category,
    amount,
    memo,
    occurredOn: today.subtract(daysAgo, 'day').format('YYYY-MM-DD'),
  }),
);
