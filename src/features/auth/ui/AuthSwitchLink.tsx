import { Link } from 'react-router';
import styles from './AuthSwitchLink.module.css';

type AuthSwitchLinkProps = {
  message: string;
  to: string;
  label: string;
};

/* 로그인 ↔ 회원가입 전환 안내 */
export default function AuthSwitchLink({ message, to, label }: AuthSwitchLinkProps) {
  return (
    <p className={styles.switch}>
      {message}
      <Link to={to} className={styles.link}>
        {label}
      </Link>
    </p>
  );
}
