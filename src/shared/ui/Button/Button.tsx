import type { ComponentProps } from 'react';
import styles from './Button.module.css';

/* 기본(primary) 버튼 */
export default function Button({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button className={className ? `${styles.primary} ${className}` : styles.primary} {...props} />
  );
}
