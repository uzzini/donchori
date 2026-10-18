import dayjs from 'dayjs';
import { ChevronRight } from 'lucide-react';
import Section from '@/shared/ui/Section/Section';
import type { Account } from '../lib/account';
import styles from './AccountSection.module.css';

type AccountSectionProps = {
  account: Account;
  onChangePassword: () => void;
};

/* 계정 정보 조회 + 비밀번호 변경(이메일 계정만 해당) */
export default function AccountSection({ account, onChangePassword }: AccountSectionProps) {
  return (
    <Section title="계정 정보">
      <dl className={styles.list}>
        <div className={styles.row}>
          <dt>이메일</dt>
          <dd>{account.email}</dd>
        </div>
        <div className={styles.row}>
          <dt>가입일</dt>
          <dd className="amount">{dayjs(account.joinedAt).format('YYYY.MM.DD')}</dd>
        </div>
        {account.hasPassword && (
          <div className={styles.row}>
            <dt>비밀번호</dt>
            <dd>
              <button
                type="button"
                className={styles.change}
                aria-label="비밀번호 변경"
                aria-haspopup="dialog"
                onClick={onChangePassword}
              >
                변경
                <ChevronRight size={16} strokeWidth={2} aria-hidden />
              </button>
            </dd>
          </div>
        )}
      </dl>
    </Section>
  );
}
