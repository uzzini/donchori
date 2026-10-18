import dayjs from 'dayjs';

export const PERIOD_PRESETS = ['month', '1m', '3m', '6m', 'custom'] as const;

export type PeriodPreset = (typeof PERIOD_PRESETS)[number];

export type Period = { preset: PeriodPreset; from: string; to: string }; // YYYY-MM-DD

export const PERIOD_LABEL: Record<PeriodPreset, string> = {
  month: '이번 달',
  '1m': '1개월',
  '3m': '3개월',
  '6m': '6개월',
  custom: '직접 설정',
};

const MONTHS = { '1m': 1, '3m': 3, '6m': 6 } as const;

/* 프리셋 기간: 이번 달 1일 ~ 오늘 / N개월 전 다음 날 ~ 오늘 */
export function presetPeriod(preset: Exclude<PeriodPreset, 'custom'>): Period {
  const today = dayjs();
  const start =
    preset === 'month'
      ? today.startOf('month')
      : today.subtract(MONTHS[preset], 'month').add(1, 'day');
  return { preset, from: start.format('YYYY-MM-DD'), to: today.format('YYYY-MM-DD') };
}

/* 'M월 D일 ~ M월 D일' (연도가 다르면 'YYYY.M.D ~ YYYY.M.D') */
export function formatPeriod({ from, to }: Period) {
  const start = dayjs(from);
  const end = dayjs(to);
  const format = start.isSame(end, 'year') ? 'M월 D일' : 'YYYY.M.D';
  return `${start.format(format)} ~ ${end.format(format)}`;
}

/* 조회 기간 버튼 문구: '이번 달' / '최근 N개월' / 'M.D ~ M.D' */
export function periodButtonLabel(period: Period) {
  if (period.preset === 'custom') return formatPeriodShort(period);
  if (period.preset === 'month') return PERIOD_LABEL.month;
  return `최근 ${PERIOD_LABEL[period.preset]}`;
}

/* 버튼용 짧은 표기: 'M.D ~ M.D' (연도가 다르면 'YY.M.D ~ YY.M.D') */
export function formatPeriodShort({ from, to }: Period) {
  const start = dayjs(from);
  const end = dayjs(to);
  const format = start.isSame(end, 'year') ? 'M.D' : 'YY.M.D';
  return `${start.format(format)} ~ ${end.format(format)}`;
}
