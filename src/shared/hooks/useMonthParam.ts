import { useSearchParams } from 'react-router';
import dayjs from 'dayjs';
import { parseMonthKey, toMonthKey } from '@/shared/lib/month';

/* 보고 있는 달 (?month=YYYY-MM, 홈·내역 공용) */
export function useMonthParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const thisMonth = dayjs().startOf('month');

  const parsed = parseMonthKey(searchParams.get('month'));
  const month = parsed && !parsed.isAfter(thisMonth) ? parsed : thisMonth;
  const isCurrent = month.isSame(thisMonth, 'month');

  const move = (offset: number) => {
    const next = month.add(offset, 'month');
    // 이번 달은 파라미터 없이 '/'
    setSearchParams(next.isSame(thisMonth, 'month') ? {} : { month: toMonthKey(next) });
  };

  return { month, monthKey: toMonthKey(month), isCurrent, move };
}
