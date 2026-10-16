import { EyeOff, Lock } from 'lucide-react';
import TextField, { type TextFieldProps } from './TextField';
import styles from './TextField.module.css';

type PasswordFieldProps = Omit<TextFieldProps, 'type' | 'icon' | 'trailing'>;

/* 비밀번호 입력 + 보기 버튼 */
export default function PasswordField({ label, ...props }: PasswordFieldProps) {
  return (
    <TextField
      label={label}
      icon={Lock}
      type="password"
      trailing={
        <button type="button" className={styles.eyeButton} aria-label={`${label} 보기`}>
          <EyeOff size={18} strokeWidth={2} aria-hidden />
        </button>
      }
      {...props}
    />
  );
}
