import { Check } from 'lucide-react';
import Section from '@/shared/ui/Section/Section';
import { useThemeStore, type Theme } from '@/stores/useThemeStore';
import styles from './ThemeSection.module.css';

const OPTIONS: { value: Theme; label: string }[] = [
  { value: 'light', label: '라이트' },
  { value: 'dark', label: '다크' },
  { value: 'system', label: '시스템 설정' },
];

/* 미리보기 창: 상단 바 + 카드 두 줄 + 강조 버튼 */
function Preview() {
  return (
    <span className={styles.window}>
      <span className={styles.bar} />
      <span className={styles.line} />
      <span className={`${styles.line} ${styles.short}`} />
      <span className={styles.pill} />
    </span>
  );
}

/* 화면 테마: 라이트 / 다크 / 시스템 설정 */
export default function ThemeSection() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  return (
    <Section title="화면 테마">
      <div className={styles.options} role="radiogroup" aria-label="화면 테마">
        {OPTIONS.map((option) => (
          <label key={option.value} className={styles.option}>
            <input
              type="radio"
              name="theme"
              className="sr-only"
              value={option.value}
              checked={theme === option.value}
              onChange={() => setTheme(option.value)}
            />
            <span className={`${styles.preview} ${styles[option.value]}`} aria-hidden>
              {option.value === 'system' ? (
                <>
                  <span className={`${styles.half} ${styles.light}`}>
                    <Preview />
                  </span>
                  <span className={`${styles.half} ${styles.dark}`}>
                    <Preview />
                  </span>
                </>
              ) : (
                <Preview />
              )}
              <span className={styles.check}>
                <Check size={12} strokeWidth={3} />
              </span>
            </span>
            <span className={styles.label}>{option.label}</span>
          </label>
        ))}
      </div>
    </Section>
  );
}
