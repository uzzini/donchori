import dayjs, { type Dayjs } from 'dayjs';

// 월 키 형식 (URL 파라미터·쿼리 키 공용)
export const MONTH_KEY_FORMAT = 'YYYY-MM';

export const toMonthKey = (month: Dayjs) => month.format(MONTH_KEY_FORMAT);

/* 'YYYY-MM' */
export function parseMonthKey(key: string | null) {
  if (!key || !/^\d{4}-(0[1-9]|1[0-2])$/.test(key)) return null;
  return dayjs(`${key}-01`).startOf('month');
}

/* 월 범위 [그 달 1일, 다음 달 1일) — YYYY-MM-DD */
export function monthRange(monthKey: string) {
  const start = dayjs(`${monthKey}-01`);
  return { from: start.format('YYYY-MM-DD'), to: start.add(1, 'month').format('YYYY-MM-DD') };
}
