import DatePicker from '@/shared/ui/DatePicker/DatePicker';
import { PERIOD_LABEL, PERIOD_PRESETS, presetPeriod, type Period } from '../lib/period';
import styles from './PeriodFilter.module.css';

type PeriodFilterProps = {
  name: string;
  value: Period;
  onChange: (value: Period) => void;
};

/* 기간 선택: 이번 달·1·3·6개월 프리셋 / 직접 설정 */
export default function PeriodFilter({ name, value, onChange }: PeriodFilterProps) {
  // 시작일이 종료일보다 늦으면 서로 바꿈
  const onRangeChange = (from: string, to: string) =>
    onChange(from > to ? { preset: 'custom', from: to, to: from } : { preset: 'custom', from, to });

  return (
    <fieldset className={styles.fieldset}>
      <legend className="sr-only">기간</legend>
      <div className={styles.tabs}>
        {PERIOD_PRESETS.map((preset) => (
          <label key={preset} className={styles.tab}>
            <input
              type="radio"
              name={name}
              value={preset}
              checked={value.preset === preset}
              onChange={() =>
                onChange(preset === 'custom' ? { ...value, preset } : presetPeriod(preset))
              }
            />
            {PERIOD_LABEL[preset]}
          </label>
        ))}
      </div>

      {value.preset === 'custom' && (
        <div className={styles.custom}>
          <DatePicker
            id={`${name}-from`}
            label="시작일"
            value={value.from}
            onChange={(from) => onRangeChange(from, value.to)}
          />
          <DatePicker
            id={`${name}-to`}
            label="종료일"
            value={value.to}
            onChange={(to) => onRangeChange(value.from, to)}
          />
        </div>
      )}
    </fieldset>
  );
}
