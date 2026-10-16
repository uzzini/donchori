import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import TextField, { type TextFieldProps } from './TextField';
import styles from './TextField.module.css';

type PasswordFieldProps = Omit<TextFieldProps, 'type' | 'icon' | 'trailing'>;

/* 비밀번호 입력 + 보기/숨기기 버튼 */
export default function PasswordField({ id, label, ...props }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const EyeIcon = visible ? Eye : EyeOff;

  const toggle = () => {
    const input = document.getElementById(id);
    const focused = input instanceof HTMLInputElement && input === document.activeElement;
    const start = focused ? input.selectionStart : null;
    const end = focused ? input.selectionEnd : null;

    setVisible((v) => !v);

    if (focused && start !== null && end !== null) {
      requestAnimationFrame(() => input.setSelectionRange(start, end));
    }
  };

  return (
    <TextField
      id={id}
      label={label}
      icon={Lock}
      type={visible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          className={styles.eyeButton}
          aria-label={`${label} ${visible ? '숨기기' : '보기'}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={toggle}
        >
          <EyeIcon size={18} strokeWidth={2} aria-hidden />
        </button>
      }
      {...props}
    />
  );
}
