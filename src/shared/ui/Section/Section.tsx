import { useId, type ReactNode } from 'react';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import styles from './Section.module.css';

type SectionProps = {
  title: ReactNode;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
};

/* 제목이 있는 카드형 영역 */
export default function Section({ title, action, className, children }: SectionProps) {
  const titleId = useId();

  return (
    <section
      className={className ? `${styles.section} ${className}` : styles.section}
      aria-labelledby={titleId}
    >
      <header className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        {action}
      </header>
      {children}
    </section>
  );
}

/* 제목 오른쪽 '전체보기' 같은 이동 링크 */
export function SectionLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className={styles.link}>
      {children}
      <ChevronRight size={16} strokeWidth={2} aria-hidden />
    </Link>
  );
}
