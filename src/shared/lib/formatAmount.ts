const formatter = new Intl.NumberFormat('ko-KR');

type FormatWonOptions = {
  sign?: '+' | '-'; // 수입·지출 부호 표시
};

/* 금액 → '1,234원' / '+1,234원' / '−1,234원' */
export function formatWon(value: number, { sign }: FormatWonOptions = {}) {
  const body = `${formatter.format(Math.abs(value))}원`;

  if (sign === '+') return `+${body}`;
  if (sign === '-') return `−${body}`;
  return body;
}

/* 금액 입력값 → 숫자만 남기고 천 단위 콤마 ('0012a34' → '1,234', 최대 12자리) */
export function formatAmountInput(value: string) {
  const digits = value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 12);
  return digits ? formatter.format(Number(digits)) : '';
}

/* 콤마 들어간 금액 입력값 → 숫자 ('1,234' → 1234) */
export function parseAmount(value: string) {
  return Number(value.replace(/\D/g, ''));
}
