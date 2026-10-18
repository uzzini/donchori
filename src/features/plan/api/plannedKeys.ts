export const plannedKeys = {
  all: ['planned-expenses'] as const,
  // 달이 바뀌면 지난달에 체크한 항목이 빠지도록 월별로 캐시
  month: (monthKey: string) => [...plannedKeys.all, 'month', monthKey] as const,
};
