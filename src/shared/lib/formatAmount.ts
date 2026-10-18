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

// 소수 첫째 자리까지, '.0'은 생략 (12.0 → '12', 3.25 → '3.3')
const formatOneDecimal = (value: number) => formatter.format(Math.round(value * 10) / 10);

/* 금액 → 좁은 칸용 짧은 표기 ('1.5억' / '123만' / '+12만' / '−3.3만' / '9,500') */
export function formatCompactWon(value: number, { sign }: FormatWonOptions = {}) {
  const abs = Math.abs(value);
  const body =
    abs >= 1e8
      ? `${formatOneDecimal(abs / 1e8)}억`
      : abs >= 1e6
        ? `${formatter.format(Math.round(abs / 1e4))}만`
        : abs >= 1e4
          ? `${formatOneDecimal(abs / 1e4)}만`
          : formatter.format(abs);

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
