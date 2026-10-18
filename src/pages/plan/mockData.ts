// todo: 기능 연결 시 삭제 (퍼블리싱용 목업)

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
