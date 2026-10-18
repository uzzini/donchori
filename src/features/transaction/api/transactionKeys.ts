export const transactionKeys = {
  all: ['transactions'] as const,
  month: (monthKey: string) => [...transactionKeys.all, 'month', monthKey] as const,
  period: (from: string, to: string) => [...transactionKeys.all, 'period', from, to] as const,
};
