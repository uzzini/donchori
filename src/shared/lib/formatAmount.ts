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
