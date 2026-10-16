import type { ComponentProps, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import styles from './TextField.module.css';

export type TextFieldProps = ComponentProps<'input'> & {
  id: string;
  label: string;
  icon: LucideIcon;
  hideLabel?: boolean; // 라벨을 화면에서 숨기고 스크린 리더용으로만 남김
  helper?: ReactNode; // 입력 아래 도움말, `${id}-helper` id로 입력과 aria-describedby 연결
  trailing?: ReactNode; // 입력 오른쪽 요소(비밀번호 보기 버튼 등)
};

/* 아이콘 + 입력 필드 */
export default function TextField({
  id,
  label,
  icon: Icon,
  hideLabel = false,
  helper,
  trailing,
  ...inputProps
}: TextFieldProps) {
  const helperId = helper ? `${id}-helper` : undefined;

  const field = (
    <div className={styles.field}>
      {hideLabel && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}
      <Icon className={styles.fieldIcon} size={18} strokeWidth={2} aria-hidden />
      <input id={id} aria-describedby={helperId} {...inputProps} />
      {trailing}
    </div>
  );

  const helperText = helper && (
    <p id={helperId} className={styles.helper}>
      {helper}
    </p>
  );

  // 숨김 라벨은 필드 안에 두고 그룹 래퍼 없이 렌더
  if (hideLabel) {
    return (
      <>
        {field}
        {helperText}
      </>
    );
  }

  return (
    <div className={styles.group}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {field}
      {helperText}
    </div>
  );
}
