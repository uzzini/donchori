import dayjs from 'dayjs';

export const PERIOD_PRESETS = ['1m', '3m', '6m', 'custom'] as const;

export type PeriodPreset = (typeof PERIOD_PRESETS)[number];

export type Period = { preset: PeriodPreset; from: string; to: string }; // YYYY-MM-DD

export const PERIOD_LABEL: Record<PeriodPreset, string> = {
  '1m': '1개월',
  '3m': '3개월',
  '6m': '6개월',
  custom: '직접 설정',
};

const MONTHS = { '1m': 1, '3m': 3, '6m': 6 } as const;

/* 프리셋 기간: N개월 전 다음 날 ~ 오늘 */
export function presetPeriod(preset: Exclude<PeriodPreset, 'custom'>): Period {
  const today = dayjs();
  return {
    preset,
    from: today.subtract(MONTHS[preset], 'month').add(1, 'day').format('YYYY-MM-DD'),
    to: today.format('YYYY-MM-DD'),
  };
}

/* 'M월 D일 ~ M월 D일' (연도가 다르면 'YYYY.M.D ~ YYYY.M.D') */
export function formatPeriod({ from, to }: Period) {
  const start = dayjs(from);
  const end = dayjs(to);
  const format = start.isSame(end, 'year') ? 'M월 D일' : 'YYYY.M.D';
  return `${start.format(format)} ~ ${end.format(format)}`;
}

/* 버튼용 짧은 표기: 'M.D ~ M.D' (연도가 다르면 'YY.M.D ~ YY.M.D') */
export function formatPeriodShort({ from, to }: Period) {
  const start = dayjs(from);
  const end = dayjs(to);
  const format = start.isSame(end, 'year') ? 'M.D' : 'YY.M.D';
  return `${start.format(format)} ~ ${end.format(format)}`;
}
