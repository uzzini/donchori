import RecordForm from '@/features/transaction/ui/RecordForm';
import Section from '@/shared/ui/Section/Section';

/* 빠른 기록 */
export default function QuickRecord() {
  return (
    <Section title="빠른 기록">
      <RecordForm idPrefix="quick-record" />
    </Section>
  );
}
